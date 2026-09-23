import type { SiteLanguage } from "../site-language";
import { componentText } from "./components-i18n";
import { getBrasilContent } from "./content-i18n";

const regulationPath = "/brasil-2027/regulamento-threerace-2027-revisao-08.pdf";

export function RegulationDocument({ locale = "pt" }: { locale?: SiteLanguage }) {
  const t = componentText(locale);
  return <div className="brasil-panel-extra">
    <div className="brasil-regulation-card">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></svg>
      <div className="brasil-regulation-details">
        <span className="brasil-resource-label">{t("PDF EM REVISÃO · 15 PÁGINAS")}</span>
        <h5>{t("Regulamento Threerace Brasil 2027")}</h5>
        <p>{t("Revisão 08 · 22 de setembro de 2026")}</p>
        {locale !== "pt" && <p lang={locale}>{locale === "es" ? "Documento original en portugués." : "Original document in Portuguese."}</p>}
        <div className="brasil-resource-actions">
          <a className="button button-dark" href={regulationPath} target="_blank" rel="noreferrer">{t("VISUALIZAR REGULAMENTO")} <span aria-hidden="true">↗</span></a>
          <a className="brasil-resource-download" href={regulationPath} download="regulamento-threerace-2027-revisao-08.pdf">{t("BAIXAR PDF")} <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </div>
    <p className="brasil-regulation-review"><strong>{t("Revisão da equipe:")}</strong>{" "}{t("o PDF ainda precisa refletir a sacochila incluída no kit e a regra de 75% para a medalha FINISHER. Falta definir se esse percentual considera distância ou etapas; o documento atual ainda exige concluir todas as etapas válidas.")}</p>
  </div>;
}

export function EventVenue({ locale = "pt" }: { locale?: SiteLanguage }) {
  const { brasilEvent, eventVenue } = getBrasilContent(locale);
  const t = componentText(locale);
  return <div className="brasil-panel-extra">
    <div className="brasil-venue-card">
      <div className="brasil-venue-details">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
        <h5>{t("Como chegar")}</h5>
        <address>{eventVenue.address}<br />{eventVenue.city}</address>
        <div className="brasil-resource-actions">
          <a className="button button-dark" href={eventVenue.directionsUrl} target="_blank" rel="noreferrer">{t("COMO CHEGAR")} <span aria-hidden="true">↗</span></a>
          <a className="brasil-resource-download" href={eventVenue.mapsUrl} target="_blank" rel="noreferrer">{t("ABRIR NO GOOGLE MAPS")} <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <iframe className="brasil-venue-map" title={t("Mapa de localização do {venue}", { venue: brasilEvent.venue })} src={`${eventVenue.embedUrl}&hl=${locale === "pt" ? "pt-BR" : locale}`} width="640" height="360" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
    </div>
    <p className="brasil-content-note">{t("As informações de hospedagem serão divulgadas em breve.")}</p>
  </div>;
}
