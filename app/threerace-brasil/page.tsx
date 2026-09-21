"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { brasilEvent, information, raceFormats, registrationPrices, registrationNotice, courseNotice, schedule, scheduleNotice, kit, expo, faqs } from "./content";
import "./brasil.css";

function DocumentIcon({ kind = "document" }: { kind?: string }) {
  return <svg viewBox="0 0 64 64" aria-hidden="true">
    {kind === "stages" ? <><path d="M8 50h48M12 45l12-27 10 18 9-23 10 32" /><circle cx="24" cy="18" r="3" /></> : kind === "event" ? <><circle cx="32" cy="32" r="22" /><path d="M32 18v16l11 6" /></> : <><path d="M17 7h23l9 9v41H17Z" /><path d="M40 7v10h9M24 29h18M24 38h18M24 47h12" /></>}
  </svg>;
}

const number = (value: number) => value.toLocaleString("pt-BR");

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
          <a href="#informacoes" onClick={() => setMenuOpen(false)}>Informações</a>
        </nav>
        <div className="header-actions"><span className="brasil-edition-tag">BRASIL / 2027</span><button className="menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="brasil-navigation" onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button></div>
      </header>
      <div className="hero-content uruguay-title-block">
        <p className="location">{brasilEvent.location}</p>
        <h1>THREERACE<small>BIKE ULTRAMARATHON BRASIL</small></h1>
        <p className="brasil-hero-date">{brasilEvent.date}</p>
        <p className="brasil-hero-statement">{brasilEvent.introduction}</p>
      </div>
      <section className="original-action-cards section-frame" aria-label="Acesso rápido">
        {[["inscricoes", "INSCRIÇÕES", "VALORES E LOTES"], ["documentacao", "DOCUMENTAÇÃO", "DISPONÍVEL EM BREVE"], ["regulamento", "REGULAMENTO", "EDIÇÃO BRASIL 2027"]].map(([id, title, note]) => <a key={id} href={`#${id}`} onClick={() => openSection(id)}><DocumentIcon /><b>{title}</b><small>{note}</small><i aria-hidden="true">↓</i></a>)}
      </section>
    </section>
    <section className="countdown-section" aria-label="Resumo da edição"><div className="section-frame countdown-grid brasil-facts"><div className="countdown-unit"><b>02–04</b><span>ABRIL DE 2027</span></div><div className="countdown-unit"><b>182 KM</b><span>ULTRA · 3 DIAS</span></div><div className="countdown-unit"><b>78 KM</b><span>SPORT · 2 DIAS</span></div></div></section>
    <section className="original-information" id="informacoes"><div className="section-frame"><h2>INFORMAÇÕES COMPLETAS</h2><div className="original-accordion">
      {information.map((section) => {
        const isOpen = openInfo === section.id;
        return <article key={section.id} id={section.id} className={isOpen ? "open" : ""}>
          <h3 className="brasil-accordion-heading"><button className="brasil-accordion-trigger" type="button" aria-expanded={isOpen} aria-controls={`painel-${section.id}`} onClick={() => setOpenInfo(isOpen ? null : section.id)}><span className="accordion-field-icon"><DocumentIcon kind={section.icon} /></span><span>{section.title}</span><span className="brasil-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span></button></h3>
          <div id={`painel-${section.id}`} hidden={!isOpen} className="brasil-info-panel"><div className="official-copy"><h4>{section.heading}</h4>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{section.id === "inscricoes" ? <PricesTable /> : section.id === "etapas" ? <CourseTables /> : null}</div>
        </article>;
      })}
    </div></div></section>
    <section className="original-about section-frame" id="historia"><div className="original-about-copy"><p className="section-label">DESDE 2017</p><h2>UMA PROVA FEITA DE TERRITÓRIO, PESSOAS E SUPERAÇÃO.</h2><p>A Threerace nasceu em São Francisco de Paula e transformou a Serra Gaúcha em ponto de encontro para atletas do Brasil e de outros países da América do Sul.</p><p>Em 2027, voltamos às origens para celebrar dez anos de mountain bike, natureza e comunidade.</p></div><div className="original-about-brand"><img src="/tr3-logo-display.webp" alt="Threerace Sports" loading="lazy" /></div></section>
    <section className="brasil-gallery" aria-label="Galeria da história Threerace"><div className="section-frame brasil-gallery-heading"><p className="section-label">HISTÓRIAS EM IMAGENS</p><div><button type="button" aria-label="Foto anterior" disabled={galleryIndex === 0} onClick={() => setGalleryIndex(galleryIndex - 1)}>←</button><span aria-live="polite">{galleryIndex + 1} / {gallery.length}</span><button type="button" aria-label="Próxima foto" disabled={galleryIndex === gallery.length - 1} onClick={() => setGalleryIndex(galleryIndex + 1)}>→</button></div></div><figure><img src={gallery[galleryIndex]} alt={`Registro histórico da Threerace — imagem ${galleryIndex + 1}`} loading="lazy" /><figcaption>Acervo Threerace · edições anteriores</figcaption></figure></section>
    <section className="brasil-program" id="guia">
      <div className="section-frame">
        <p className="section-label">GUIA DO ATLETA · BRASIL 2027</p>
        <h2>DOIS FORMATOS.<br />ESCOLHA SEU DESAFIO.</h2>
        <div className="brasil-format-grid">{raceFormats.map((format) => <article className="brasil-format-card" key={format.id}>
          <p className="section-label">{format.dates} · 2027</p><h3>{format.name}</h3><p className="brasil-format-days">{format.days}</p>
          <div className="brasil-format-metrics"><div><strong>{format.stages.reduce((total, stage) => total + stage.distance, 0)}<small> km</small></strong><span>distância prevista</span></div><div><strong>{number(format.stages.reduce((total, stage) => total + stage.ascent, 0))}<small> m</small></strong><span>subida acumulada prevista</span></div></div>
          <p>{format.description}</p><a href="#etapas" onClick={() => openSection("etapas")}>VER ETAPAS {format.name.toUpperCase()} ↑</a>
        </article>)}</div>
        <p className="brasil-content-note">{courseNotice}</p>
        <div className="brasil-schedule-heading"><p className="section-label">PROGRAMAÇÃO PREVISTA</p><h2>DA SEXTA AO DOMINGO.</h2></div>
        <div className="brasil-stage-grid">{schedule.map((day) => <article key={day.date}><span>{day.date}</span><h3>{day.title}</h3><p>{day.description}</p></article>)}</div>
        <p className="brasil-content-note">{scheduleNotice}</p>
      </div>
    </section>
    <section className="brasil-kit section-frame" id="kit">
      <div><p className="section-label">KIT DO ATLETA</p><h2>O QUE ESTÁ<br />INCLUÍDO.</h2></div>
      <div className="brasil-kit-copy"><p>Em todas as modalidades e lotes:</p><ul>{kit.included.map((item) => <li key={item}>{item}</li>)}</ul><p className="brasil-jersey-note">{kit.optional}</p><p className="brasil-content-note">{kit.notice}</p></div>
    </section>
    <section className="brasil-expo" id="expo"><div className="section-frame brasil-expo-grid"><div><p className="section-label">CENTRO DE EVENTOS · SÃO FRANCISCO DE PAULA</p><h2>THREERACE<br />EXPO.</h2><p>Produtos, serviços e encontros em torno da bicicleta.</p></div><div>{expo.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<a className="button button-dark" href={brasilEvent.whatsapp} target="_blank" rel="noreferrer">CONSULTAR PARTICIPAÇÃO NA EXPO ↗</a></div></div></section>
    <section className="original-partners"><div className="section-frame"><div className="original-organizers brasil-organizer"><p>REALIZAÇÃO</p><img src="/tr3-logo-display.webp" alt="Threerace Sports" loading="lazy" /></div><p className="brasil-partners-note">Patrocinadores e apoiadores da edição Brasil serão anunciados em breve.</p></div></section>
    <section className="brasil-faq section-frame" id="duvidas"><div><p className="section-label">PERGUNTAS FREQUENTES</p><h2>ANTES DA LARGADA.</h2><a className="button button-dark" href={brasilEvent.whatsapp} target="_blank" rel="noreferrer">FALAR COM A THREERACE ↗</a></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
    <section className="brasil-closing"><div className="section-frame"><p className="section-label">SÃO FRANCISCO DE PAULA · RS</p><h2>O PRÓXIMO CAPÍTULO<br />COMEÇA AQUI.</h2><p>{brasilEvent.date}</p><a className="button button-primary" href="#informacoes">VER INFORMAÇÕES ↑</a></div></section>
  </main>;
}
