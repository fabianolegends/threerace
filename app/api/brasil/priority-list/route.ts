export async function POST(): Promise<Response> {
  return Response.json(
    {
      ok: false,
      demo: true,
      error: "Esta é uma demonstração interna. Nenhum cadastro é recebido ou salvo.",
    },
    {
      status: 403,
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    },
  );
}
