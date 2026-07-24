export type SiteLanguage = "es" | "pt" | "en";

export const SITE_LANGUAGE_KEY = "threerace-language";

const SPANISH_SPEAKING_COUNTRIES = new Set([
  "AR",
  "BO",
  "CL",
  "CO",
  "CR",
  "CU",
  "DO",
  "EC",
  "ES",
  "GQ",
  "GT",
  "HN",
  "MX",
  "NI",
  "PA",
  "PE",
  "PR",
  "PY",
  "SV",
  "UY",
  "VE",
]);

function isSiteLanguage(value: string | null): value is SiteLanguage {
  return value === "es" || value === "pt" || value === "en";
}

export function getStoredLanguage(): SiteLanguage | null {
  if (typeof window === "undefined") return null;
  const saved = window.localStorage.getItem(SITE_LANGUAGE_KEY);
  return isSiteLanguage(saved) ? saved : null;
}

export function getSavedLanguage(fallback: SiteLanguage): SiteLanguage {
  return getStoredLanguage() ?? fallback;
}

function languageFromCountry(country: string | null): SiteLanguage | null {
  if (!country) return null;
  const normalizedCountry = country.toUpperCase();
  if (normalizedCountry === "BR") return "pt";
  if (SPANISH_SPEAKING_COUNTRIES.has(normalizedCountry)) return "es";
  return "en";
}

function languageFromBrowser(): SiteLanguage | null {
  if (typeof navigator === "undefined") return null;
  const browserLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const browserLanguage of browserLanguages) {
    const language = browserLanguage.toLowerCase().split("-")[0];
    if (language === "pt" || language === "es" || language === "en") {
      return language;
    }
  }

  return null;
}

export async function detectInitialLanguage(
  fallback: SiteLanguage
): Promise<SiteLanguage> {
  const stored = getStoredLanguage();
  if (stored) return stored;

  try {
    const response = await fetch("/api/locale", { cache: "no-store" });
    if (response.ok) {
      const data = (await response.json()) as { country?: string | null };
      const detected = languageFromCountry(data.country ?? null);
      if (detected) return detected;
    }
  } catch {
    // When geolocation is unavailable, use the browser language below.
  }

  return languageFromBrowser() ?? fallback;
}

export function saveLanguage(language: SiteLanguage) {
  window.localStorage.setItem(SITE_LANGUAGE_KEY, language);
  document.documentElement.lang = language === "pt" ? "pt-BR" : language;
}
