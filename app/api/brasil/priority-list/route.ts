import {
  PRIORITY_CONSENT_VERSION,
  validatePriorityRegistration,
} from "@/lib/priority-list-schema";
import { storePriorityRegistration } from "@/lib/priority-list-store";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 16 * 1024;
const RESPONSE_HEADERS = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

function errorResponse(status: number, error: string, errors?: Record<string, string>) {
  return Response.json({ ok: false, error, ...(errors ? { errors } : {}) }, {
    status,
    headers: RESPONSE_HEADERS,
  });
}

function expectedOrigin(request: Request): string {
  const configured = process.env.THREERACE_PRIORITY_ORIGIN;
  if (configured === undefined) return new URL(request.url).origin;
  const url = new URL(configured);
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username || url.password || url.pathname !== "/" || url.search || url.hash
  ) {
    throw new Error("Invalid configured origin");
  }
  return url.origin;
}

export async function POST(request: Request): Promise<Response> {
  // The public origin may differ from Next's internal URL behind a reverse proxy.
  // Use only explicit server configuration, never untrusted Host/Forwarded headers.
  let trustedOrigin: string;
  try {
    trustedOrigin = expectedOrigin(request);
  } catch {
    return errorResponse(503, "O cadastro está temporariamente indisponível. Tente novamente em instantes.");
  }
  if (
    request.headers.get("origin") !== trustedOrigin ||
    request.headers.get("sec-fetch-site") === "cross-site"
  ) {
    return errorResponse(403, "Abra o cadastro no site da Threerace para continuar.");
  }
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    return errorResponse(415, "Formato de envio inválido.");
  }
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (!Number.isFinite(declaredLength) || declaredLength < 0 || declaredLength > MAX_BODY_BYTES) {
    return errorResponse(413, "O cadastro excedeu o tamanho permitido.");
  }

  let input: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return errorResponse(400, "Preencha os dados do cadastro.");
    const chunks: Uint8Array[] = [];
    let receivedBytes = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        receivedBytes += value.byteLength;
        if (receivedBytes > MAX_BODY_BYTES) {
          await reader.cancel();
          return errorResponse(413, "O cadastro excedeu o tamanho permitido.");
        }
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return errorResponse(400, "Não foi possível ler o cadastro. Revise os dados e tente novamente.");
  }

  const validated = validatePriorityRegistration(input);
  if (!validated.ok) {
    return errorResponse(400, "Confira os campos indicados.", validated.errors);
  }
  try {
    await storePriorityRegistration(validated.data, PRIORITY_CONSENT_VERSION);
  } catch {
    // Do not log personal data, database paths, connection strings, or the submitted request.
    return errorResponse(503, "Não foi possível salvar seu cadastro agora. Tente novamente em instantes.");
  }

  // Identical for new and repeated emails, without disclosing whether someone is listed.
  return Response.json({ ok: true, message: "Seu interesse está registrado na lista prioritária." }, {
    status: 200,
    headers: RESPONSE_HEADERS,
  });
}
