"use client";
import { useSiteLanguage } from "../use-site-language";

export function GlobalTopButton() {
  const language = useSiteLanguage();
  const copy = { pt: ["Voltar ao topo", "TOPO"], es: ["Volver arriba", "ARRIBA"], en: ["Back to top", "TOP"] }[language];
  return <a className="global-top-button" href="#top" aria-label={copy[0]}><span aria-hidden="true">↑</span>{copy[1]}</a>;
}
