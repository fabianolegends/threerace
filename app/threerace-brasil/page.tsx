"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import KitCollection from "./kit-collection";
import AccordionIcon from "./accordion-icon";
import { brasilEvent, information, raceFormats, registrationPrices, registrationNotice, courseNotice, schedule, scheduleNotice, expo, faqs } from "./content";
import "./brasil.css";

const number = (value: number) => value.toLocaleString("pt-BR");

function RaceMetricIcon({ kind }: { kind: "distance" | "ascent" }) {
  return <svg className="brasil-choice-metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {kind === "distance" ? <><circle cx="5" cy="5" r="2" /><circle cx="19" cy="19" r="2" /><path d="M7 5h9a4 4 0 0 1 0 8H8a3 3 0 0 0 0 6h9" /></> : <><path d="m2 20 8-16 5 9 3-5 4 12H2Z" /><path d="m7 10 3 2 3-2" /></>}
  </svg>;
}

function PricesTable() {
  return <div className="brasil-panel-extra">
    <div className="brasil-table-scroll" role="region" aria-label="Valores das inscrições" tabIndex={0}>
      <table className="brasil-data-table brasil-price-table">
        <caption>Camiseta dry e meia incluídas nas duas opções. Valores por atleta.</caption>
        <thead><tr><th scope="col">Modalidade e lote</th><th scope="col">Sem jersey</th><th scope="col">Com jersey</th></tr></thead>
        <tbody>{registrationPrices.map((price) => <tr key={`${price.format}-${price.lot}`}><th scope="row"><strong>{price.format}</strong><span>{price.lot}</span></th><td>R$ {price.withoutJersey}</td><td>R$ {price.withJersey}</td></tr>)}</tbody>
      </table>
    </div>
    <p className="brasil-content-note">{registrationNotice}</p>
  </div>;
}

function CourseTables() {
  return <div className="brasil-panel-extra">
    {raceFormats.map((format) => <div className="brasil-course-table" key={format.id}>
      <h4>{format.name} · {format.days}</h4>
      <p>{format.description}</p>
      <div className="brasil-table-scroll" role="region" aria-label={`Etapas previstas ${format.name}`} tabIndex={0}>
        <table className="brasil-data-table">
          <caption>{format.name} · {format.dates} · percursos previstos</caption>
          <thead><tr><th scope="col">Data</th><th scope="col">Etapa</th><th scope="col">Distância prevista</th><th scope="col">Subida acumulada prevista</th></tr></thead>
          <tbody>{format.stages.map((stage) => <tr key={stage.name}><th scope="row">{stage.date}</th><td>{stage.name}</td><td>{stage.distance} km</td><td>{number(stage.ascent)} m</td></tr>)}</tbody>
          <tfoot><tr><th scope="row" colSpan={2}>Total {format.name}</th><td>{format.stages.reduce((total, stage) => total + stage.distance, 0)} km</td><td>{number(format.stages.reduce((total, stage) => total + stage.ascent, 0))} m</td></tr></tfoot>
        </table>
      </div>
      <p className="brasil-content-note">{format.note}</p>
    </div>)}
  </div>;
}

export default function Brasil() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState<string | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const gallery = Array.from({ length: 8 }, (_, i) => `/tr3-gallery-${String(i + 1).padStart(2, "0")}.svg`);
  useEffect(() => {
    const syncHash = () => {
      const id = window.location.hash.slice(1);
      setOpenInfo(information.some((section) => section.id === id) ? id : null);
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);
  function openSection(id: string) { setOpenInfo(id); setMenuOpen(false); }

  return <main className="uruguay-event-page brasil-event-page" lang="pt-BR">
    <section className="hero uruguay-event-hero" style={{ backgroundImage: "url(/home-hero-peloton.jpeg)" }}>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Threerace Sports"><img className="header-tr3-logo" src="/tr3-logo-display.webp" alt="Threerace Sports" /></Link>
        <nav id="brasil-navigation" className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Navegação da edição Brasil">
          <a href="#evento" onClick={() => openSection("evento")}>O evento</a>
          <a href="#etapas" onClick={() => openSection("etapas")}>Etapas</a>
          <a href="#inscricoes" onClick={() => openSection("inscricoes")}>Inscrições</a>
          <a href="#kit" onClick={() => setMenuOpen(false)}>Kit 2027</a>
          <a href="#informacoes" onClick={() => setMenuOpen(false)}>Informações</a>
        </nav>
        <div className="header-actions"><span className="brasil-edition-tag">BRASIL / 2027</span><button className="menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="brasil-navigation" onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button></div>
      </header>
      <div className="hero-content uruguay-title-block">
        <p className="brasil-anniversary-label">2017 — 2027 · 10 ANOS</p>
        <p className="location">{brasilEvent.location}</p>
        <h1>THREERACE<small>BIKE ULTRAMARATHON BRASIL</small></h1>
        <p className="brasil-hero-date">{brasilEvent.date}</p>
        <p className="brasil-hero-motto">MONTANHAS, PESSOAS, HISTÓRIAS.</p>
        <p className="brasil-hero-statement">{brasilEvent.introduction}</p>
        <a className="brasil-hero-kit-link" href="#kit">CONHEÇA O KIT 2027 <span aria-hidden="true">↘</span></a>
      </div>
    </section>
    <section className="brasil-modalities" id="modalidades" aria-label="Modalidades da Threerace Brasil">
      <div className="section-frame brasil-modalities-inner">
        <div className="brasil-choice-grid">{raceFormats.map((format) => <article className={`brasil-choice-card brasil-choice-${format.id}`} key={format.id} aria-labelledby={`modalidade-${format.id}`}>
          <p className="brasil-choice-date">{format.dates} · 2027</p>
          <div className="brasil-choice-heading"><h2 id={`modalidade-${format.id}`}>{format.name}</h2><span>{format.stages.length} DIAS</span></div>
          <p className="brasil-choice-description">{format.id === "ultra" ? "3 etapas com percurso completo" : "2 etapas e percurso reduzido"}</p>
          <div className="brasil-choice-metrics"><div className="brasil-choice-value" role="group" aria-label="Distância prevista"><RaceMetricIcon kind="distance" /><strong>{format.stages.reduce((total, stage) => total + stage.distance, 0)}<small> km</small></strong></div><div className="brasil-choice-value" role="group" aria-label="Subida acumulada prevista"><RaceMetricIcon kind="ascent" /><strong>{number(format.stages.reduce((total, stage) => total + stage.ascent, 0))}<small> m</small></strong></div></div>
          <div className="brasil-choice-actions"><a href="#etapas" aria-label={`Ver etapas da ${format.name}`} onClick={() => openSection("etapas")}>VER ETAPAS <span aria-hidden="true">↗</span></a><a href="#inscricoes" aria-label={`Valores e lotes da ${format.name}`} onClick={() => openSection("inscricoes")}>VALORES E LOTES <span aria-hidden="true">↗</span></a></div>
        </article>)}</div>
        <p className="brasil-content-note">{courseNotice}</p>
      </div>
    </section>
    <section className="original-information" id="informacoes"><div className="section-frame"><h2>INFORMAÇÕES COMPLETAS</h2><div className="original-accordion">
      {information.map((section) => {
        const isOpen = openInfo === section.id;
        return <article key={section.id} id={section.id} className={isOpen ? "open" : ""}>
          <h3 className="brasil-accordion-heading"><button className="brasil-accordion-trigger" type="button" aria-expanded={isOpen} aria-controls={`painel-${section.id}`} onClick={() => setOpenInfo(isOpen ? null : section.id)}><span className="accordion-field-icon"><AccordionIcon section={section.id} /></span><span>{section.title}</span><span className="brasil-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span></button></h3>
          <div id={`painel-${section.id}`} hidden={!isOpen} className="brasil-info-panel"><div className="official-copy"><h4>{section.heading}</h4>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{section.id === "inscricoes" ? <PricesTable /> : section.id === "etapas" ? <CourseTables /> : null}</div>
        </article>;
      })}
    </div></div></section>
    <section className="original-about section-frame" id="historia"><div className="original-about-copy"><p className="section-label">NOSSA HISTÓRIA · 2017 — 2027</p><h2>DEZ ANOS DE MONTANHAS, PESSOAS E HISTÓRIAS.</h2><p>A Threerace constrói sua história desde 2017, reunindo pessoas em torno do mountain bike, da natureza e dos desafios por etapas.</p><p>Em 2026, voltamos a São Francisco de Paula, na Serra Gaúcha. Em 2027, seguimos na cidade para celebrar dez anos dessa trajetória, de 2 a 4 de abril. Um novo encontro para quem já faz parte da nossa história e para quem chega para pedalar com a gente.</p></div><div className="original-about-brand brasil-anniversary"><img src="/brasil-2027/selo-10-anos.webp" width="900" height="900" alt="Selo TR3 Threerace: 10 anos, 2017–2027, com araucária em terracota e areia" loading="lazy" /></div></section>
    <section className="brasil-gallery" aria-label="Galeria da história Threerace"><div className="section-frame brasil-gallery-heading"><p className="section-label">HISTÓRIAS EM IMAGENS</p><div><button type="button" aria-label="Foto anterior" disabled={galleryIndex === 0} onClick={() => setGalleryIndex(galleryIndex - 1)}>←</button><span aria-live="polite">{galleryIndex + 1} / {gallery.length}</span><button type="button" aria-label="Próxima foto" disabled={galleryIndex === gallery.length - 1} onClick={() => setGalleryIndex(galleryIndex + 1)}>→</button></div></div><figure><img src={gallery[galleryIndex]} alt={`Registro histórico da Threerace — imagem ${galleryIndex + 1}`} loading="lazy" /><figcaption>Acervo Threerace · edições anteriores</figcaption></figure></section>
    <section className="brasil-program" id="guia">
      <div className="section-frame">
        <p className="section-label">PROGRAMAÇÃO PREVISTA · BRASIL 2027</p>
        <h2>DA SEXTA AO DOMINGO.</h2>
        <div className="brasil-stage-grid">{schedule.map((day) => <article key={day.date}><span>{day.date}</span><h3>{day.title}</h3><p>{day.description}</p></article>)}</div>
        <p className="brasil-content-note">{scheduleNotice}</p>
      </div>
    </section>
    <KitCollection />
    <section className="brasil-expo" id="expo"><div className="section-frame brasil-expo-grid"><div><p className="section-label">CENTRO DE EVENTOS · SÃO FRANCISCO DE PAULA</p><h2>THREERACE<br />EXPO.</h2><p>Produtos, serviços e encontros em torno da bicicleta.</p></div><div>{expo.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<a className="button button-dark" href={brasilEvent.whatsapp} target="_blank" rel="noreferrer">CONSULTAR PARTICIPAÇÃO NA EXPO ↗</a></div></div></section>
    <section className="original-partners"><div className="section-frame"><div className="original-organizers brasil-organizer"><p>REALIZAÇÃO</p><img src="/tr3-logo-display.webp" alt="Threerace Sports" loading="lazy" /></div><p className="brasil-partners-note">Patrocinadores e apoiadores da edição Brasil serão anunciados em breve.</p></div></section>
    <section className="brasil-faq section-frame" id="duvidas"><div><p className="section-label">PERGUNTAS FREQUENTES</p><h2>ANTES DA LARGADA.</h2><a className="button button-dark" href={brasilEvent.whatsapp} target="_blank" rel="noreferrer">FALAR COM A THREERACE ↗</a></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
    <section className="brasil-closing" id="encerramento"><div className="section-frame"><p className="section-label">SÃO FRANCISCO DE PAULA · RS</p><h2>O PRÓXIMO CAPÍTULO<br />COMEÇA AQUI.</h2><p>{brasilEvent.date}</p><a className="button button-primary" href="#informacoes">VER INFORMAÇÕES ↑</a></div></section>
  </main>;
}
