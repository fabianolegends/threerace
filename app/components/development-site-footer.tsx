"use client";

import { usePathname } from "next/navigation";
import { GlobalSiteFooter } from "./global-site-footer";

export function DevelopmentSiteFooter() {
  const pathname = usePathname();

  if (pathname === "/threerace-brasil") {
    return <GlobalSiteFooter preview fixedLanguage="pt" />;
  }

  return <footer className="workspace-footer">
    <strong>THREERACE SPORTS</strong>
    <p>Ambiente de desenvolvimento da edição Brasil 2027.</p>
    <a href="mailto:inscricoes@threerace.com.br">inscricoes@threerace.com.br</a>
  </footer>;
}
