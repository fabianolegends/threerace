import { readPriorityRegistrations, type PriorityRegistrationRecord } from "@/lib/priority-list-store";
import { PRIORITY_CATEGORIES } from "@/lib/priority-list-schema";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const HEADERS = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "X-Robots-Tag": "noindex, nofollow, noarchive, noimageindex",
};

function getAdminKey() {
  return process.env.THREERACE_PRIORITY_ADMIN_KEY?.trim() || "";
}

function isAuthorized(request: Request) {
  const configuredKey = getAdminKey();
  const key = new URL(request.url).searchParams.get("chave") || "";
  return Boolean(configuredKey) && key === configuredKey;
}

function categoryLabel(categoryId: string) {
  for (const format of PRIORITY_CATEGORIES) {
    for (const group of format.groups) {
      const category = group.options.find((option) => option.id === categoryId);
      if (category) return `${format.name} · ${group.name} · ${category.label}`;
    }
  }
  return categoryId;
}

function modalityLabel(modality: string) {
  return modality === "ultra" ? "Ultra" : modality === "sport" ? "Sport" : modality;
}

function escapeCsv(value: unknown) {
  const text = String(value ?? "");
  return /[";\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

function toCsv(records: PriorityRegistrationRecord[]) {
  const rows = [
    ["Data", "Nome completo", "E-mail", "Telefone", "Cidade", "País", "Modalidade", "Categoria", "Versão do consentimento"],
    ...records.map((record) => [
      record.submittedAt,
      record.fullName,
      record.email,
      record.phone,
      record.city,
      record.country,
      modalityLabel(record.modality),
      categoryLabel(record.category),
      record.consentVersion,
    ]),
  ];
  return `\uFEFF${rows.map((row) => row.map(escapeCsv).join(";")).join("\n")}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return new Response("Acesso restrito.", { status: 401, headers: HEADERS });
  }
  const modality = new URL(request.url).searchParams.get("modalidade");
  const records = await readPriorityRegistrations();
  const visibleRecords = modality === "ultra" || modality === "sport"
    ? records.filter((record) => record.modality === modality)
    : records;
  return new Response(toCsv(visibleRecords), {
    status: 200,
    headers: {
      ...HEADERS,
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="lista-prioritaria-threerace-brasil-${modality || "todos"}.csv"`,
    },
  });
}
