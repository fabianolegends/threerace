"use client";

import { useSiteLanguage } from "../use-site-language";

export function SiteHtml({ children }: { children: React.ReactNode }) {
  const language = useSiteLanguage();
  return <html lang={language === "pt" ? "pt-BR" : language}>{children}</html>;
}
