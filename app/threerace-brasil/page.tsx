"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import KitCollection from "./kit-collection";
import AccordionIcon from "./accordion-icon";
import CategoryTables from "./category-tables";
import PrioritySignup from "./priority-signup";
import RaceCountdown from "./race-countdown";
import RaceSchedule from "./race-schedule";
import RaceGallery from "./race-gallery";
import RegistrationInclusions from "./registration-inclusions";
import { EventVenue, RegulationDocument } from "./event-resources";
import { brasilEvent, information, raceFormats, registrationPrices, registrationPayment, registrationNotice, registrationBenefits, jerseyOption, courseNotice, expo, faqs } from "./content";
import "./brasil.css";

const number = (value: number) => value.toLocaleString("pt-BR");
const totalAscent = (stages: { ascent: number | null }[]) => stages.reduce<number | null>((total, stage) => total === null || stage.ascent === null ? null : total + stage.ascent, 0);
const ascentLabel = (ascent: number | null) => ascent === null ? "A confirmar" : `${number(ascent)} m`;
const currency = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const lotDate = (date: string) => date.split("-").reverse().join("/");

function RaceMetricIcon({ kind }: { kind: "distance" | "ascent" }) {
  return <svg className="brasil-choice-metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {kind === "distance" ? <><circle cx="5" cy="5" r="2" /><circle cx="19" cy="19" r="2" /><path d="M7 5h9a4 4 0 0 1 0 8H8a3 3 0 0 0 0 6h9" /></> : <><path d="m2 20 8-16 5 9 3-5 4 12H2Z" /><path d="m7 10 3 2 3-2" /></>}
  </svg>;
}

function PricesTable() {
  return <div className="brasil-panel-extra">
    <div className="brasil-table-scroll" role="region" aria-label="Valores das inscrições" tabIndex={0}>
      <table className="brasil-data-table brasil-price-table">
        <caption>Inscrição por atleta, sem a jersey opcional. Taxas já consideradas nos valores abaixo.</caption>
        <thead><tr><th scope="col">Modalidade e lote</th><th scope="col">Período ou limite</th><th scope="col">Pix <span>Taxa {registrationPayment.pixFeePercent}%</span></th><th scope="col">{registrationPayment.cardLabel} <span>Taxa {registrationPayment.feePercent}%</span></th></tr></thead>
        <tbody>{registrationPrices.map((price) => <tr key={`${price.format}-${price.lot}`} className={price.active ? "brasil-price-current" : undefined}>
          <th scope="row"><strong>{price.format}</strong><span>{price.lot}</span>{price.active ? <span className="brasil-price-current-badge">LOTE VIGENTE</span> : null}</th>
          <td className="brasil-price-period"><time dateTime={price.startDate}>{lotDate(price.startDate)}</time> a <time dateTime={price.endDate}>{lotDate(price.endDate)}</time><span>ou {price.vacancies} vagas</span></td>
          <td className="brasil-price-amount"><span className="brasil-price-mobile-label" aria-hidden="true">Pix · taxa 0%</span>{currency(price.price)}</td>
          <td className="brasil-price-amount"><span className="brasil-price-mobile-label" aria-hidden="true">{registrationPayment.cardLabel} · taxa {registrationPayment.feePercent}%</span>{currency(Math.round(price.price * (100 + registrationPayment.feePercent)) / 100)}</td>
        </tr>)}</tbody>
      </table>
    </div>
    <p className="brasil-payment-note">{registrationPayment.description}</p>
    <p className="brasil-content-note">{registrationNotice}</p>
    <p className="brasil-jersey-note">{jerseyOption.description}</p>
    <div className="brasil-registration-benefits">
      {registrationBenefits.map((group) => <section key={group.id} aria-labelledby={group.id}>
        <h4 id={group.id}>{group.title}</h4>
        <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>)}
    </div>
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
          <tbody>{format.stages.map((stage) => <tr key={stage.name}><th scope="row">{stage.date}</th><td>{stage.name}{"detail" in stage && <small className="brasil-course-detail">{stage.detail}</small>}</td><td>{stage.distance} km</td><td>{ascentLabel(stage.ascent)}</td></tr>)}</tbody>
          <tfoot><tr><th scope="row" colSpan={2}>Total {format.name}</th><td>{format.stages.reduce((total, stage) => total + stage.distance, 0)} km</td><td>{ascentLabel(totalAscent(format.stages))}</td></tr></tfoot>
        </table>
      </div>
      <p className="brasil-content-note">{format.note}</p>
    </div>)}
  </div>;
}

function MedicalDocuments() {
  return <div className="brasil-panel-extra brasil-medical-links">
    <Link href="/threerace-brasil/documentos-medicos" className="brasil-medical-link">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3" /><rect x="9" y="2" width="6" height="4" rx="1" /><path d="M8 13h3l1.5-3 2 6 1.5-3h2" /></svg>
      <div><span>DECLARAÇÃO DE SAÚDE</span><strong>Informações médicas do atleta</strong><p>Preencha seus dados de saúde e o contato de emergência.</p><b>ACESSAR A ÁREA MÉDICA <span aria-hidden="true">↗</span></b></div>
    </Link>
    <a href="/brasil-2027/atestado-medico-threerace-brasil-2027.pdf" download="atestado-medico-threerace-brasil-2027.pdf" className="brasil-medical-link">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M12 11v7m-3-3 3 3 3-3" /></svg>
      <div><span>ATESTADO MÉDICO · ULTRA</span><strong>Modelo para levar ao médico</strong><p>Obrigatório para a Ultra, acompanhado da Declaração de Saúde.</p><b>BAIXAR MODELO PDF <span aria-hidden="true">↓</span></b></div>
    </a>
  </div>;
}

export default function Brasil() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState<string | null>(null);
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
    <section className="hero uruguay-event-hero" style={{ backgroundImage: "url(/brasil-2027/hero-pdl0485-sem-logo.webp)" }}>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Threerace Sports"><img className="header-tr3-logo" src="/tr3-logo-display.webp" alt="Threerace Sports" /></Link>
        <nav id="brasil-navigation" className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Navegação da edição Brasil">
          <a href="#evento" onClick={() => openSection("evento")}>O evento</a>
          <a href="#etapas" onClick={() => openSection("etapas")}>Etapas</a>
          <a href="#inscricoes" onClick={() => openSection("inscricoes")}>Inscrições</a>
          <a href="#kit" onClick={() => setMenuOpen(false)}>Kit 2027</a>
          <a href="#informacoes" onClick={() => setMenuOpen(false)}>Informações</a>
          <Link href="/threerace-brasil/documentos-medicos" onClick={() => setMenuOpen(false)}>Área médica</Link>
        </nav>
        <div className="header-actions"><span className="brasil-edition-tag">BRASIL / 2027</span><button className="menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="brasil-navigation" onClick={() => setMenuOpen(!menuOpen)}><span /><span /></button></div>
      </header>
      <div className="hero-content uruguay-title-block">
        <p className="brasil-anniversary-label">2017 — 2027 · 10 ANOS</p>
        <p className="location">{brasilEvent.location}</p>
        <h1>THREERACE<small>BIKE ULTRAMARATHON BRASIL</small></h1>
        <p className="brasil-hero-date">{brasilEvent.date}</p>
        <p className="brasil-hero-motto">MONTANHAS, PESSOAS, HISTÓRIAS.</p>
        <PrioritySignup />
      </div>
    </section>
    <section className="brasil-modalities" id="modalidades" aria-label="Modalidades da Threerace Brasil">
      <div className="section-frame brasil-modalities-inner">
        <div className="brasil-choice-grid">{raceFormats.map((format) => <article className={`brasil-choice-card brasil-choice-${format.id}`} key={format.id} aria-labelledby={`modalidade-${format.id}`}>
          <p className="brasil-choice-date">{format.dates} · 2027</p>
          <div className="brasil-choice-heading"><h2 id={`modalidade-${format.id}`}>{format.name}</h2><span>{format.stages.length} DIAS</span></div>
          <p className="brasil-choice-description">{format.id === "ultra" ? "3 etapas com percurso completo" : "2 etapas e percurso reduzido"}</p>
          <div className="brasil-choice-metrics"><div className="brasil-choice-value" role="group" aria-label="Distância prevista"><RaceMetricIcon kind="distance" /><strong>{format.stages.reduce((total, stage) => total + stage.distance, 0)}<small> km</small></strong></div><div className="brasil-choice-value" role="group" aria-label="Subida acumulada prevista"><RaceMetricIcon kind="ascent" />{totalAscent(format.stages) === null ? <strong className="brasil-choice-pending">A confirmar</strong> : <strong>{number(totalAscent(format.stages)!)}<small> m</small></strong>}</div></div>
          <div className="brasil-choice-actions"><a href="#etapas" aria-label={`Ver etapas da ${format.name}`} onClick={() => openSection("etapas")}>VER ETAPAS <span aria-hidden="true">↗</span></a><a href="#inscricoes" aria-label={`Valores e lotes da ${format.name}`} onClick={() => openSection("inscricoes")}>VALORES E LOTES <span aria-hidden="true">↗</span></a></div>
        </article>)}</div>
        <p className="brasil-content-note">{courseNotice}</p>
      </div>
    </section>
    <section className="original-information" id="informacoes"><div className="section-frame"><RaceCountdown /><h2>INFORMAÇÕES COMPLETAS</h2><div className="original-accordion">
      {information.map((section) => {
        const isOpen = openInfo === section.id;
        return <article key={section.id} id={section.id} className={isOpen ? "open" : ""}>
          <h3 className="brasil-accordion-heading"><button className="brasil-accordion-trigger" type="button" aria-expanded={isOpen} aria-controls={`painel-${section.id}`} onClick={() => setOpenInfo(isOpen ? null : section.id)}><span className="accordion-field-icon"><AccordionIcon section={section.id} /></span><span>{section.title}</span><span className="brasil-expand" aria-hidden="true">{isOpen ? "−" : "+"}</span></button></h3>
          <div id={`painel-${section.id}`} hidden={!isOpen} className="brasil-info-panel"><div className="official-copy"><h4>{section.heading}</h4>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>{section.id === "inscricoes" ? <PricesTable /> : section.id === "categorias" ? <CategoryTables /> : section.id === "etapas" ? <CourseTables /> : section.id === "programacao" ? <RaceSchedule /> : section.id === "documentacao" ? <MedicalDocuments /> : section.id === "regulamento" ? <RegulationDocument /> : section.id === "hospedagem" ? <EventVenue /> : null}</div>
        </article>;
      })}
    </div></div></section>
    <section className="original-about section-frame" id="historia"><div className="original-about-copy"><p className="section-label">NOSSA HISTÓRIA · 2017 — 2027</p><h2>DEZ ANOS DE MONTANHAS, PESSOAS E HISTÓRIAS.</h2><p>A Threerace constrói sua história desde 2017, reunindo pessoas em torno do mountain bike, da natureza e dos desafios por etapas.</p><p>Em 2026, voltamos a São Francisco de Paula, na Serra Gaúcha. Em 2027, seguimos na cidade para celebrar dez anos dessa trajetória, de 2 a 4 de abril. Um novo encontro para quem já faz parte da nossa história e para quem chega para pedalar com a gente.</p></div><div className="original-about-brand brasil-anniversary"><img src="/brasil-2027/selo-10-anos-alinhado.webp" width="900" height="900" alt="Selo Threerace: 10 anos, 2017–2027, com araucária em terracota e areia" loading="lazy" /></div></section>
    <RaceGallery />
    <RegistrationInclusions />
    <KitCollection />
    <section className="brasil-expo" id="expo">
      <div className="section-frame">
        <div className="brasil-expo-grid">
          <div className="brasil-expo-intro"><p className="section-label">CENTRO DE EVENTOS · SÃO FRANCISCO DE PAULA</p><h2>THREERACE<br />EXPO.</h2><p>Produtos, serviços e encontros em torno da bicicleta.</p></div>
          <div className="brasil-expo-copy">{expo.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<a className="button button-dark" href={brasilEvent.whatsapp} target="_blank" rel="noreferrer">CONSULTAR PARTICIPAÇÃO NA EXPO ↗</a></div>
          <figure className="brasil-expo-preview">
            <Image src="/brasil-2027/expo-centro-eventos-estudo.webp" width={1672} height={941} sizes="(max-width: 700px) 90vw, (max-width: 1100px) 40vw, 360px" alt="Estudo visual da Threerace Expo no Centro de Eventos, com credenciamento, estandes de bicicletas, palco e pórtico na identidade terracota e areia." />
            <figcaption>Estudo visual · Threerace Expo</figcaption>
          </figure>
        </div>
      </div>
    </section>
    <section className="original-partners brasil-partners" id="parceiros" aria-label="Organização e patrocínio">
      <div className="section-frame brasil-partners-grid">
        <div className="brasil-partner">
          <h2>ORGANIZAÇÃO</h2>
          <Link className="brasil-partner-logo brasil-partner-tr3" href="/" aria-label="TR3 · Threerace Sports">
            <Image src="/tr3-logo-display.webp" width={160} height={160} sizes="112px" alt="TR3 · Threerace Sports" />
          </Link>
        </div>
        <div className="brasil-partner">
          <h2>PATROCÍNIO</h2>
          <a className="brasil-partner-logo brasil-partner-prefeitura" href="https://www.saofranciscodepaula.rs.gov.br/portal/" target="_blank" rel="noreferrer" aria-label="Prefeitura Municipal de São Francisco de Paula · site oficial">
            <Image src="/brasil-2027/prefeitura-sao-francisco-de-paula-oficial.png" width={405} height={110} sizes="(max-width: 600px) 80vw, 360px" alt="Prefeitura Municipal de São Francisco de Paula" />
          </a>
        </div>
      </div>
    </section>
    <section className="brasil-faq section-frame" id="duvidas"><div><p className="section-label">PERGUNTAS FREQUENTES</p><h2>ANTES DA LARGADA.</h2><a className="button button-dark" href={brasilEvent.whatsapp} target="_blank" rel="noreferrer">FALAR COM A THREERACE ↗</a></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
    <section className="brasil-closing" id="encerramento"><div className="section-frame"><p className="section-label">SÃO FRANCISCO DE PAULA · RS</p><h2>O PRÓXIMO CAPÍTULO<br />COMEÇA AQUI.</h2><p>{brasilEvent.date}</p><a className="button button-primary" href="#informacoes">VER INFORMAÇÕES ↑</a></div></section>
  </main>;
}
