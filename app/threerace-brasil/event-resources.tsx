import { brasilEvent, eventVenue } from "./content";

const regulationPath = "/brasil-2027/regulamento-threerace-2027-revisao-06.pdf";

export function RegulationDocument() {
  return <div className="brasil-panel-extra">
    <div className="brasil-regulation-card">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></svg>
      <div className="brasil-regulation-details">
        <span className="brasil-resource-label">PDF · 15 PÁGINAS</span>
        <h5>Regulamento Threerace Brasil 2027</h5>
        <p>Revisão 06 · 21 de setembro de 2026</p>
        <div className="brasil-resource-actions">
          <a className="button button-dark" href={regulationPath} target="_blank" rel="noreferrer">VISUALIZAR REGULAMENTO <span aria-hidden="true">↗</span></a>
          <a className="brasil-resource-download" href={regulationPath} download="regulamento-threerace-2027-revisao-06.pdf">BAIXAR PDF <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </div>
  </div>;
}

export function EventVenue() {
  return <div className="brasil-panel-extra">
    <div className="brasil-venue-card">
      <div className="brasil-venue-details">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
        <h5>Como chegar</h5>
        <address>{eventVenue.address}<br />{eventVenue.city}</address>
        <div className="brasil-resource-actions">
          <a className="button button-dark" href={eventVenue.directionsUrl} target="_blank" rel="noreferrer">COMO CHEGAR <span aria-hidden="true">↗</span></a>
          <a className="brasil-resource-download" href={eventVenue.mapsUrl} target="_blank" rel="noreferrer">ABRIR NO GOOGLE MAPS <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <iframe className="brasil-venue-map" title={`Mapa de localização do ${brasilEvent.venue}`} src={eventVenue.embedUrl} width="640" height="360" loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
    </div>
    <p className="brasil-content-note">As informações de hospedagem serão divulgadas em breve.</p>
  </div>;
}
