import type { SiteLanguage } from "../site-language";

export const brasilLocales = ["pt", "es", "en"] as const;
export const brasilLanguageTags: Record<SiteLanguage, string> = { pt: "pt-BR", es: "es-UY", en: "en" };
export function brasilPath(locale: SiteLanguage, suffix = "") {
  return `${locale === "pt" ? "" : `/${locale}`}/threerace-brasil${suffix}`;
}
export function brasilAlternates(suffix = "") {
  return Object.fromEntries([
    ...brasilLocales.map((locale) => [brasilLanguageTags[locale], brasilPath(locale, suffix)]),
    ["x-default", brasilPath("pt", suffix)],
  ]);
}
