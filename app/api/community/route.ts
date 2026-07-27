import { NextRequest, NextResponse } from "next/server";

const BIP_LEADS_ENDPOINT = "https://api.bip.marketing/api/leads";
const ALLOWED_INTERESTS = new Set([
  "Todos os eventos",
  "Todos los eventos",
  "All events",
  "Mountain bike",
  "Gravel",
  "Parcerias",
  "Alianzas",
  "Partnerships",
]);

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.BIP_API_KEY;

  if (!apiKey) {
    console.error("BIP_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Serviço temporariamente indisponível." },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const interest =
      typeof body.interest === "string" && ALLOWED_INTERESTS.has(body.interest)
        ? body.interest
        : "Todos os eventos";
    const language = ["pt", "es", "en"].includes(body.language)
      ? body.language
      : "pt";

    if (name.length < 2 || name.length > 120 || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Preencha nome e e-mail válidos." },
        { status: 400 }
      );
    }

    const bipResponse = await fetch(BIP_LEADS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-bip-api-key": apiKey,
      },
      body: JSON.stringify({
        name,
        email,
        tags: ["Comunidade Threerace"],
        fields: [
          { key: "interesse", value: interest },
          { key: "idioma", value: language },
          { key: "origem", value: "threerace.com" },
        ],
        metadata: {
          source: "footer-community-form",
          consent: "newsletter-signup",
        },
      }),
      cache: "no-store",
    });

    if (!bipResponse.ok) {
      const details = await bipResponse.text();
      console.error("BIP lead upsert failed", bipResponse.status, details);
      return NextResponse.json(
        { error: "Não foi possível concluir o cadastro." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Newsletter registration failed", error);
    return NextResponse.json(
      { error: "Não foi possível concluir o cadastro." },
      { status: 500 }
    );
  }
}
