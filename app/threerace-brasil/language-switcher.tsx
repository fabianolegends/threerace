"use client";

import { useEffect } from "react";
import { saveLanguage, type SiteLanguage } from "../site-language";
import { brasilLocales, brasilPath } from "./localization";
import "./language-switcher.css";

export function BrasilLanguageSwitcher({ locale, medical = false }: { locale: SiteLanguage; medical?: boolean }) {
  useEffect(() => { saveLanguage(locale); }, [locale]);
  return <nav className="language-switcher corporate-language-switcher brasil-language-switcher" aria-label={{ pt: "Selecionar idioma", es: "Seleccionar idioma", en: "Select language" }[locale]}>
    {brasilLocales.map((code) => <a key={code} href={brasilPath(code, medical ? "/documentos-medicos" : "")} hrefLang={code} lang={code} className={locale === code ? "active" : ""} aria-current={locale === code ? "page" : undefined} aria-label={{ pt: "Português", es: "Español", en: "English" }[code]} onClick={(event) => {
      // Keep section links and campaign parameters when switching editions of this page.
      event.currentTarget.href = `${brasilPath(code, medical ? "/documentos-medicos" : "")}${window.location.search}${window.location.hash}`;
      saveLanguage(code);
    }}><span aria-hidden="true">{{ pt: "🇧🇷", es: "🇪🇸", en: "🇬🇧" }[code]}</span></a>)}
  </nav>;
}
