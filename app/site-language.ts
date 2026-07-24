export type SiteLanguage = "es" | "pt" | "en";

export const SITE_LANGUAGE_KEY = "threerace-language";

export function getSavedLanguage(fallback: SiteLanguage): SiteLanguage {
  if (typeof window === "undefined") return fallback;
  const saved = window.localStorage.getItem(SITE_LANGUAGE_KEY);
  return saved === "es" || saved === "pt" || saved === "en" ? saved : fallback;
}

export function saveLanguage(language: SiteLanguage) {
  window.localStorage.setItem(SITE_LANGUAGE_KEY, language);
  document.documentElement.lang = language === "pt" ? "pt-BR" : language;
}
