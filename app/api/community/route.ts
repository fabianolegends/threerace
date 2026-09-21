import { NextResponse } from "next/server";
// Never transmit test submissions from this development copy.
export async function POST() {
  return NextResponse.json({ error: "Cadastro desativado no ambiente de desenvolvimento." }, { status: 403 });
}
