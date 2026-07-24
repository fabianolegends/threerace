"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { getSavedLanguage, saveLanguage, SiteLanguage } from "./site-language";

const logo = "/tr3-logo-new.svg";
const azimutMenuLogo = "/azimut-extremo-logo-white.svg";
const legendsLogo = "https://www.legendsbikerace.com.br/legends-logo-official.png";

const homeNavigation = {
  pt: ["EVENTOS", "NOSSA HISTÓRIA", "NOTÍCIAS", "COMUNIDADE TR3", "CONTATO"],
  es: ["EVENTOS", "NUESTRA HISTORIA", "NOTICIAS", "COMUNIDAD TR3", "CONTACTO"],
  en: ["EVENTS", "OUR HISTORY", "NEWS", "TR3 COMMUNITY", "CONTACT"],
} as const;

const languageFlags: Record<SiteLanguage, string> = { es: "🇪🇸", pt: "🇧🇷", en: "🇬🇧" };

const homeCopy = {
  pt: {
    menuOpen: "Abrir menu", menuClose: "Fechar menu", language: "Selecionar idioma",
    heroKicker: "THREERACE SPORTS · DESDE 2017", hero: ["UMA MARCA.", "DIFERENTES TERRITÓRIOS.", "EXPERIÊNCIAS QUE DEIXAM HISTÓRIAS."],
    heroText: "Esporte, território e experiência conectados em projetos autorais no Brasil e na América do Sul.",
    eventsCta: "CONHEÇA NOSSOS EVENTOS ↓", aboutCta: "CONHEÇA A THREERACE",
    next: "PRÓXIMOS DESAFIOS", open: "INSCRIÇÕES ABERTAS", placeUy: "ROCHA + LA PALOMA", countryUy: "URUGUAI · 2026",
    mtbDays: "MOUNTAIN BIKE · 3 DIAS", gravelStages: "GRAVEL · 2 ETAPAS",
    mtbDate: "30 OUT — 01 NOV · 2026", gravelDate: "31 OUT — 01 NOV · 2026",
    countdown: ["DIAS", "HORAS", "MIN"], sharedBy: "Organização compartilhada por Threerace Sports e Azimut Extremo",
    ecosystem: "ECOSSISTEMA THREERACE", calendar: ["UM CALENDÁRIO.", "DIFERENTES TERRITÓRIOS."],
    calendarText: "Projetos com identidades próprias, unidos pela mesma forma de criar esporte, comunidade e experiência.",
    eventStatus: ["INSCRIÇÕES ABERTAS", "INSCRIÇÕES ABERTAS", "SAVE THE DATE", "LANÇAMENTO EM BREVE"],
    eventDates: ["30 OUT — 01 NOV · 2026", "31 OUT — 01 NOV · 2026", "03 — 05 ABR · 2027", "EM DEFINIÇÃO"],
    eventPlaces: ["Rocha + La Paloma · Uruguai", "Rocha + La Paloma · Uruguai", "São Francisco de Paula · Brasil", "Serra Gaúcha · Brasil"],
    eventTexts: [
      "Três dias de mountain bike entre estradas rurais, natureza e o Atlântico uruguaio.",
      "Duas etapas e 183 quilômetros para descobrir o Uruguai por caminhos que só o gravel conecta.",
      "A história continua onde começou: mountain bike, natureza e uma comunidade internacional.",
      "Uma travessia por quatro destinos, criada para transformar o gravel em uma jornada pelo território.",
    ],
    historyLabel: "NOSSA HISTÓRIA", historyTitle: "NASCEMOS PARA CRIAR EXPERIÊNCIAS QUE PERMANECEM.",
    story: [
      "Desde 2017, a Threerace Sports desenvolve eventos de ciclismo que unem desafio esportivo, natureza, turismo e comunidade.",
      "A trajetória começou em São Francisco de Paula, passou por Garopaba e atravessou fronteiras. Cada edição ampliou nossa forma de entender o atleta, o destino e tudo o que existe entre a largada e a chegada.",
      "Hoje criamos projetos de mountain bike e gravel com identidades próprias e uma essência comum: organização, aventura e histórias reais.",
    ],
    timelineTitle: "UMA HISTÓRIA EM MOVIMENTO.",
    journalTitle: ["HISTÓRIAS,", "BASTIDORES E ROTAS."],
    journalText: "Notícias dos eventos, reconhecimentos de percurso e histórias de quem vive a Threerace.",
    readStory: "LEIA A HISTÓRIA ↗",
    newsDates: ["JUL · 2026", "JUL · 2026", "MAI · 2027"],
    newsTitles: ["La Paloma será a base da nova edição internacional da Threerace", "Dois dias para descobrir o Uruguai por novas linhas", "Quatro destinos. Uma travessia pela Serra Gaúcha"],
    newsTexts: ["Rocha recebe três dias de mountain bike, natureza e experiência internacional.", "Uma experiência de 183 km entre estradas rurais, vento, campos e litoral.", "Canela, São Francisco de Paula, Gramado e Nova Petrópolis conectadas pelo gravel."],
    manifestoTop: ["DA SERRA AO MAR.", "DO BRASIL AO URUGUAI."], manifesto: ["O DESTINO MUDA.", "A ESSÊNCIA CONTINUA."],
    community: "COMUNIDADE TR3", communityTitle: "RECEBA OS PRÓXIMOS DESAFIOS.", communityText: "Datas, inscrições e novidades em primeira mão.",
    name: "NOME", namePlaceholder: "Seu nome", interest: "INTERESSE", allEvents: "Todos os eventos", partnerships: "Parcerias", subscribe: "RECEBER NOVIDADES ↗",
    sent: "Conclua o envio no seu aplicativo de e-mail.", footerBrand: "EVENTOS, ESPORTE E EXPERIÊNCIAS QUE VÃO MAIS LONGE.",
    explore: "EXPLORE", footerEvents: "Eventos", footerAbout: "Sobre a TR3", contact: "FALE COM A THREERACE", region: "BRASIL · URUGUAI · AMÉRICA DO SUL",
  },
  es: {
    menuOpen: "Abrir menú", menuClose: "Cerrar menú", language: "Seleccionar idioma",
    heroKicker: "THREERACE SPORTS · DESDE 2017", hero: ["UNA MARCA.", "DIFERENTES TERRITORIOS.", "EXPERIENCIAS QUE DEJAN HISTORIAS."],
    heroText: "Deporte, territorio y experiencia conectados en proyectos propios en Brasil y América del Sur.",
    eventsCta: "CONOCE NUESTROS EVENTOS ↓", aboutCta: "CONOCE THREERACE",
    next: "PRÓXIMOS DESAFÍOS", open: "INSCRIPCIONES ABIERTAS", placeUy: "ROCHA + LA PALOMA", countryUy: "URUGUAY · 2026",
    mtbDays: "MOUNTAIN BIKE · 3 DÍAS", gravelStages: "GRAVEL · 2 ETAPAS",
    mtbDate: "30 OCT — 01 NOV · 2026", gravelDate: "31 OCT — 01 NOV · 2026",
    countdown: ["DÍAS", "HORAS", "MIN"], sharedBy: "Organización compartida por Threerace Sports y Azimut Extremo",
    ecosystem: "ECOSISTEMA THREERACE", calendar: ["UN CALENDARIO.", "DIFERENTES TERRITORIOS."],
    calendarText: "Proyectos con identidades propias, unidos por una misma forma de crear deporte, comunidad y experiencia.",
    eventStatus: ["INSCRIPCIONES ABIERTAS", "INSCRIPCIONES ABIERTAS", "RESERVA LA FECHA", "PRÓXIMAMENTE"],
    eventDates: ["30 OCT — 01 NOV · 2026", "31 OCT — 01 NOV · 2026", "03 — 05 ABR · 2027", "FECHA POR DEFINIR"],
    eventPlaces: ["Rocha + La Paloma · Uruguay", "Rocha + La Paloma · Uruguay", "São Francisco de Paula · Brasil", "Serra Gaúcha · Brasil"],
    eventTexts: [
      "Tres días de mountain bike entre caminos rurales, naturaleza y el Atlántico uruguayo.",
      "Dos etapas y 183 kilómetros para descubrir Uruguay por caminos que solo el gravel conecta.",
      "La historia continúa donde comenzó: mountain bike, naturaleza y una comunidad internacional.",
      "Una travesía por cuatro destinos, creada para transformar el gravel en un viaje por el territorio.",
    ],
    historyLabel: "NUESTRA HISTORIA", historyTitle: "NACIMOS PARA CREAR EXPERIENCIAS QUE PERMANECEN.",
    story: [
      "Desde 2017, Threerace Sports desarrolla eventos de ciclismo que unen desafío deportivo, naturaleza, turismo y comunidad.",
      "La trayectoria comenzó en São Francisco de Paula, pasó por Garopaba y cruzó fronteras. Cada edición amplió nuestra forma de entender al atleta, el destino y todo lo que existe entre la largada y la llegada.",
      "Hoy creamos proyectos de mountain bike y gravel con identidades propias y una esencia común: organización, aventura e historias reales.",
    ],
    timelineTitle: "UNA HISTORIA EN MOVIMIENTO.",
    journalTitle: ["HISTORIAS,", "BASTIDORES Y RUTAS."],
    journalText: "Noticias de los eventos, reconocimientos de recorridos e historias de quienes viven Threerace.",
    readStory: "LEE LA HISTORIA ↗",
    newsDates: ["JUL · 2026", "JUL · 2026", "MAY · 2027"],
    newsTitles: ["La Paloma será la base de la nueva edición internacional de Threerace", "Dos días para descubrir Uruguay por nuevas líneas", "Cuatro destinos. Una travesía por la Serra Gaúcha"],
    newsTexts: ["Rocha recibe tres días de mountain bike, naturaleza y experiencia internacional.", "Una experiencia de 183 km entre caminos rurales, viento, campos y costa.", "Canela, São Francisco de Paula, Gramado y Nova Petrópolis conectadas por el gravel."],
    manifestoTop: ["DE LA SIERRA AL MAR.", "DE BRASIL A URUGUAY."], manifesto: ["EL DESTINO CAMBIA.", "LA ESENCIA CONTINÚA."],
    community: "COMUNIDAD TR3", communityTitle: "RECIBE LOS PRÓXIMOS DESAFÍOS.", communityText: "Fechas, inscripciones y novedades de primera mano.",
    name: "NOMBRE", namePlaceholder: "Tu nombre", interest: "INTERÉS", allEvents: "Todos los eventos", partnerships: "Alianzas", subscribe: "RECIBIR NOVEDADES ↗",
    sent: "Completa el envío en tu aplicación de correo.", footerBrand: "EVENTOS, DEPORTE Y EXPERIENCIAS QUE LLEGAN MÁS LEJOS.",
    explore: "EXPLORA", footerEvents: "Eventos", footerAbout: "Sobre TR3", contact: "HABLA CON THREERACE", region: "BRASIL · URUGUAY · AMÉRICA DEL SUR",
  },
  en: {
    menuOpen: "Open menu", menuClose: "Close menu", language: "Select language",
    heroKicker: "THREERACE SPORTS · SINCE 2017", hero: ["ONE BRAND.", "DIFFERENT TERRITORIES.", "EXPERIENCES THAT LEAVE STORIES."],
    heroText: "Sport, territory and experience connected through original projects in Brazil and South America.",
    eventsCta: "DISCOVER OUR EVENTS ↓", aboutCta: "DISCOVER THREERACE",
    next: "NEXT CHALLENGES", open: "REGISTRATION OPEN", placeUy: "ROCHA + LA PALOMA", countryUy: "URUGUAY · 2026",
    mtbDays: "MOUNTAIN BIKE · 3 DAYS", gravelStages: "GRAVEL · 2 STAGES",
    mtbDate: "30 OCT — 01 NOV · 2026", gravelDate: "31 OCT — 01 NOV · 2026",
    countdown: ["DAYS", "HOURS", "MIN"], sharedBy: "Jointly organized by Threerace Sports and Azimut Extremo",
    ecosystem: "THREERACE ECOSYSTEM", calendar: ["ONE CALENDAR.", "DIFFERENT TERRITORIES."],
    calendarText: "Projects with their own identities, united by the same way of creating sport, community and experience.",
    eventStatus: ["REGISTRATION OPEN", "REGISTRATION OPEN", "SAVE THE DATE", "COMING SOON"],
    eventDates: ["30 OCT — 01 NOV · 2026", "31 OCT — 01 NOV · 2026", "03 — 05 APR · 2027", "DATE TO BE ANNOUNCED"],
    eventPlaces: ["Rocha + La Paloma · Uruguay", "Rocha + La Paloma · Uruguay", "São Francisco de Paula · Brazil", "Serra Gaúcha · Brazil"],
    eventTexts: [
      "Three days of mountain biking through rural roads, nature and Uruguay's Atlantic coast.",
      "Two stages and 183 kilometers to discover Uruguay along roads only gravel can connect.",
      "The story continues where it began: mountain bike, nature and an international community.",
      "A journey through four destinations, created to turn gravel into an experience across the territory.",
    ],
    historyLabel: "OUR HISTORY", historyTitle: "WE WERE BORN TO CREATE EXPERIENCES THAT LAST.",
    story: [
      "Since 2017, Threerace Sports has developed cycling events that bring together sporting challenge, nature, tourism and community.",
      "The journey began in São Francisco de Paula, moved through Garopaba and crossed borders. Each edition expanded how we understand the athlete, the destination and everything between the start and the finish.",
      "Today we create mountain bike and gravel projects with distinct identities and a shared essence: organization, adventure and real stories.",
    ],
    timelineTitle: "A STORY IN MOTION.",
    journalTitle: ["STORIES,", "BEHIND THE SCENES AND ROUTES."],
    journalText: "Event news, route scouting and stories from those who experience Threerace.",
    readStory: "READ THE STORY ↗",
    newsDates: ["JUL · 2026", "JUL · 2026", "MAY · 2027"],
    newsTitles: ["La Paloma will host Threerace's new international edition", "Two days to discover Uruguay along new lines", "Four destinations. A journey through Serra Gaúcha"],
    newsTexts: ["Rocha welcomes three days of mountain bike, nature and international experience.", "A 183 km experience across rural roads, wind, fields and coastline.", "Canela, São Francisco de Paula, Gramado and Nova Petrópolis connected by gravel."],
    manifestoTop: ["FROM THE MOUNTAINS TO THE SEA.", "FROM BRAZIL TO URUGUAY."], manifesto: ["THE DESTINATION CHANGES.", "THE ESSENCE REMAINS."],
    community: "TR3 COMMUNITY", communityTitle: "GET THE NEXT CHALLENGES.", communityText: "Dates, registration openings and news delivered first.",
    name: "NAME", namePlaceholder: "Your name", interest: "INTEREST", allEvents: "All events", partnerships: "Partnerships", subscribe: "GET UPDATES ↗",
    sent: "Complete the message in your email app.", footerBrand: "EVENTS, SPORT AND EXPERIENCES THAT GO FURTHER.",
    explore: "EXPLORE", footerEvents: "Events", footerAbout: "About TR3", contact: "CONTACT THREERACE", region: "BRAZIL · URUGUAY · SOUTH AMERICA",
  },
} as const;

function SocialIcon({ network }: { network: "instagram" | "facebook" | "youtube" | "whatsapp" }) {
  const paths = {
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" /></>,
    facebook: <path d="M14.5 8H17V4.3c-.43-.06-1.9-.18-3.58-.18-3.54 0-5.96 2.16-5.96 6.12V13H4v4.14h3.46V24h4.24v-6.86h3.54L15.8 13h-4.1v-2.35C11.7 9.45 12.02 8 14.5 8Z" fill="currentColor" stroke="none" />,
    youtube: <><path d="M22 8.1a3 3 0 0 0-2.1-2.12C18 5.5 12 5.5 12 5.5s-6 0-7.9.48A3 3 0 0 0 2 8.1 31 31 0 0 0 1.5 12 31 31 0 0 0 2 15.9a3 3 0 0 0 2.1 2.12c1.9.48 7.9.48 7.9.48s6 0 7.9-.48A3 3 0 0 0 22 15.9a31 31 0 0 0 .5-3.9 31 31 0 0 0-.5-3.9Z" /><path d="m10 15.2 5.2-3.2L10 8.8Z" fill="currentColor" stroke="none" /></>,
    whatsapp: <><path d="M20.5 11.6a8.5 8.5 0 0 1-12.55 7.47L3 20.5l1.47-4.8A8.5 8.5 0 1 1 20.5 11.6Z" /><path d="M8.2 7.4c.2-.45.42-.46.73-.47h.62c.2 0 .45.08.57.5l.72 1.75c.1.32.04.5-.12.73l-.52.67c-.18.2-.3.4-.12.7.18.3.8 1.3 1.72 2.1 1.18 1.03 2.17 1.35 2.48 1.5.3.15.5.12.68-.08l.9-1.05c.2-.25.42-.2.7-.1l1.85.87c.33.16.55.24.63.37.08.13.08.75-.18 1.48-.25.72-1.48 1.38-2.03 1.47-.52.08-1.2.12-1.93-.12-.45-.14-1.03-.34-1.77-.66-.78-.33-3.43-1.27-5.8-4.48-.67-.9-1.1-1.9-1.23-2.23-.13-.3-.02-1.43.2-1.9Z" fill="currentColor" stroke="none" /></>,
  };
  return <svg viewBox="0 0 24 24" aria-hidden="true">{paths[network]}</svg>;
}

const events = [
  {
    n: "01",
    name: "Threerace Bike Ultramarathon Uruguay",
    place: "Rocha + La Paloma · Uruguay",
    date: "30 OUT — 01 NOV · 2026",
    sport: "MTB STAGE RACE",
    status: "INSCRIÇÕES ABERTAS",
    text: "Três dias de mountain bike entre estradas rurais, natureza e o Atlântico uruguaio.",
    href: "/threerace-uruguay",
    img: "/event-threerace-uruguay.jpeg",
    position: "50% 44%",
    shared: true,
  },
  {
    n: "02",
    name: "Gravel Experience Uruguay",
    place: "Rocha + La Paloma · Uruguay",
    date: "31 OUT — 01 NOV · 2026",
    sport: "GRAVEL STAGE RACE",
    status: "INSCRIÇÕES ABERTAS",
    text: "Duas etapas e 183 quilômetros para descobrir o Uruguai por caminhos que só o gravel conecta.",
    href: "/gravel-experience-uruguay",
    img: "/gravel-experience-hero-v2.png?v=20260724",
    position: "78% center",
    shared: true,
  },
  {
    n: "03",
    name: "Threerace Bike Ultramarathon Brasil",
    place: "São Francisco de Paula · Brasil",
    date: "03 — 05 ABR · 2027",
    sport: "MTB STAGE RACE",
    status: "SAVE THE DATE",
    text: "A história continua onde começou: mountain bike, natureza e uma comunidade internacional.",
    href: "/threerace-brasil",
    img: "/event-threerace-brasil.jpeg",
    position: "60% center",
    saveDate: true,
  },
  {
    n: "04",
    name: "Legends Ultimate Gravel Race",
    place: "Serra Gaúcha · Brasil",
    date: "EM DEFINIÇÃO",
    sport: "GRAVEL STAGE RACE",
    status: "LANÇAMENTO EM BREVE",
    text: "Uma travessia por quatro destinos, criada para transformar o gravel em uma jornada pelo território.",
    href: "https://www.legendsbikerace.com.br",
    img: "/event-legends-v3.jpeg",
    position: "34% center",
    external: true,
    legends: true,
  },
];

const news = [
  {
    category: "THREERACE URUGUAY",
    date: "JUL · 2026",
    title: "La Paloma será a base da nova edição internacional da Threerace",
    text: "Rocha recebe três dias de mountain bike, natureza e experiência internacional.",
    href: "/noticias/threerace-uruguay-la-paloma",
    img: "/event-threerace-uruguay.jpeg",
  },
  {
    category: "GRAVEL EXPERIENCE",
    date: "JUL · 2026",
    title: "Dois dias para descobrir o Uruguai por novas linhas",
    text: "Uma experiência de 183 km entre estradas rurais, vento, campos e litoral.",
    href: "/noticias/gravel-experience-uruguay",
    img: "/gravel-experience-hero-v2.png",
  },
  {
    category: "LEGENDS",
    date: "MAI · 2027",
    title: "Quatro destinos. Uma travessia pela Serra Gaúcha",
    text: "Canela, São Francisco de Paula, Gramado e Nova Petrópolis conectadas pelo gravel.",
    href: "/noticias/legends-serra-gaucha",
    img: "/event-legends-v3.jpeg",
    external: false,
  },
];

const timeline = [
  { year: "2017", events: ["TR3 São Francisco de Paula"] },
  { year: "2018", events: ["TR3 São Francisco de Paula", "Threerace Trail Run Series"] },
  { year: "2019", events: ["TR3 São Francisco de Paula", "Threerace Trail Run Series"] },
  { year: "2021", events: ["TR3 São Francisco de Paula"] },
  { year: "2022", events: ["TR3 São Francisco de Paula"] },
  { year: "2023", events: ["TR3 São Francisco de Paula", "TR3 Garopaba", "São Chico Adventure Festival"] },
  { year: "2024", events: ["TR3 Garopaba", "Legends Bike Race Laguna", "Legends Bike Race Torres", "São Chico Adventure Festival"] },
  { year: "2025", events: ["TR3 Garopaba", "Legends Bike Race Laguna", "Legends Bike Race Campos de Cima da Serra"] },
  { year: "2026", events: ["TR3 São Francisco de Paula"] },
];

function useCountdown(targetDate: string) {
  const target = useMemo(() => new Date(targetDate).getTime(), [targetDate]);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0 });
  useEffect(() => {
    const update = () => {
      const distance = Math.max(0, target - Date.now());
      setTime({
        days: Math.floor(distance / 86400000),
        hours: Math.floor((distance / 3600000) % 24),
        minutes: Math.floor((distance / 60000) % 60),
      });
    };
    update();
    const timer = window.setInterval(update, 60000);
    return () => window.clearInterval(timer);
  }, [target]);
  return time;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [sent, setSent] = useState(false);
  const [saveDateOpen, setSaveDateOpen] = useState(false);
  const [language, setLanguage] = useState<SiteLanguage>("pt");
  const mtbCountdown = useCountdown("2026-10-30T08:00:00-03:00");
  const gravelCountdown = useCountdown("2026-10-31T08:00:00-03:00");
  const t = homeCopy[language];
  const localizedEvents = events.map((event, index) => ({
    ...event,
    place: t.eventPlaces[index],
    date: t.eventDates[index],
    status: t.eventStatus[index],
    text: t.eventTexts[index],
  }));
  const localizedNews = news.map((item, index) => ({
    ...item,
    date: t.newsDates[index],
    title: t.newsTitles[index],
    text: t.newsTexts[index],
  }));

  useEffect(() => {
    const saved = getSavedLanguage("pt");
    setLanguage(saved);
    saveLanguage(saved);
  }, []);

  useEffect(() => {
    if (!saveDateOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSaveDateOpen(false);
    };
    document.body.classList.add("save-date-open");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("save-date-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [saveDateOpen]);

  function chooseLanguage(nextLanguage: SiteLanguage) {
    setLanguage(nextLanguage);
    saveLanguage(nextLanguage);
  }

  function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(t.community);
    const body = encodeURIComponent(
      `${t.name}: ${form.get("name")}\nE-mail: ${form.get("email")}\n${t.interest}: ${form.get("interest")}`
    );
    window.location.href = `mailto:inscricoes@threerace.com.br?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <main className="corporate-home">
      <section
        className="corporate-hero"
        style={{ backgroundImage: "url(/home-hero-peloton.jpeg)" }}
      >
        <header className="site-header corporate-header">
          <a className="brand" href="#top" aria-label="Threerace Sports">
            <img className="header-tr3-logo" src={logo} alt="Threerace Sports" />
          </a>
          <div className="corporate-header-actions">
            <nav className={menu ? "main-nav is-open" : "main-nav"} aria-label={homeNavigation[language].join(", ")}>
              {["#eventos", "#sobre", "#historias", "#comunidade", "#contato"].map((href, index) => (
                <a href={href} onClick={() => setMenu(false)} key={href}>{homeNavigation[language][index]}</a>
              ))}
            </nav>
            <div className="corporate-socials" aria-label="Social media">
              <a href="https://www.instagram.com/threeracesports/" target="_blank" rel="noreferrer" aria-label="Instagram"><SocialIcon network="instagram" /></a>
              <a href="https://www.facebook.com/threeracesports/" target="_blank" rel="noreferrer" aria-label="Facebook"><SocialIcon network="facebook" /></a>
              <a href="https://www.youtube.com/@threeracesports" target="_blank" rel="noreferrer" aria-label="YouTube"><SocialIcon network="youtube" /></a>
              <a href="https://wa.me/5554992476721" target="_blank" rel="noreferrer" aria-label="WhatsApp"><SocialIcon network="whatsapp" /></a>
            </div>
            <div className="language-switcher corporate-language-switcher" aria-label={t.language}>
              {(["es", "pt", "en"] as SiteLanguage[]).map((code) => (
                <button type="button" key={code} className={language === code ? "active" : ""} onClick={() => chooseLanguage(code)} aria-label={{ es: "Español", pt: "Português", en: "English" }[code]} aria-pressed={language === code}>
                  {languageFlags[code]}
                </button>
              ))}
            </div>
            <button className="menu-toggle" type="button" aria-label={menu ? t.menuClose : t.menuOpen} aria-expanded={menu} onClick={() => setMenu(!menu)}>
              <span /><span />
            </button>
          </div>
        </header>
        <div className="corporate-hero-content section-frame" id="top">
          <p className="kicker">{t.heroKicker}</p>
          <h1 className="corporate-title">{t.hero[0]}<br />{t.hero[1]}<br /><span>{t.hero[2]}</span></h1>
          <p className="hero-subtitle">{t.heroText}</p>
          <div className="corporate-hero-actions">
            <a className="button button-primary" href="#eventos">{t.eventsCta}</a>
            <a className="button button-ghost" href="#sobre">{t.aboutCta}</a>
          </div>
        </div>
      </section>

      <section className="next-event">
        <div className="section-frame next-events-shell">
          <div className="next-event-label"><span>{t.next}</span><b>{t.open}</b><small>{t.placeUy}<br />{t.countryUy}</small></div>
          <div className="next-event-list">
            <article className="next-event-row">
              <div className="next-event-main">
                <p>{t.mtbDays}</p>
                <h2>THREERACE BIKE<br />ULTRAMARATHON URUGUAY</h2>
                <div className="next-event-info-line">
                  <div className="next-event-organizers-mobile" aria-hidden="true">
                    <img src={logo} alt="" /><span>+</span><img src={azimutMenuLogo} alt="" />
                  </div>
                  <div className="next-event-meta"><span>{t.mtbDate}</span><span>MTB STAGE RACE</span></div>
                </div>
              </div>
              <div className="next-event-organizers" aria-label={t.sharedBy}>
                <img src={logo} alt="TR3" />
                <span>+</span>
                <img src={azimutMenuLogo} alt="Azimut Extremo" />
              </div>
              <div className="next-countdown" aria-label="Contagem regressiva Threerace Uruguay">
                <div><b>{mtbCountdown.days}</b><span>{t.countdown[0]}</span></div>
                <div><b>{String(mtbCountdown.hours).padStart(2, "0")}</b><span>{t.countdown[1]}</span></div>
                <div><b>{String(mtbCountdown.minutes).padStart(2, "0")}</b><span>{t.countdown[2]}</span></div>
              </div>
              <a className="next-event-link" href="/threerace-uruguay" aria-label="Conhecer Threerace Uruguay"><span aria-hidden="true">↗︎</span></a>
            </article>
            <article className="next-event-row">
              <div className="next-event-main">
                <p>{t.gravelStages}</p>
                <h2>GRAVEL<br />EXPERIENCE URUGUAY</h2>
                <div className="next-event-info-line">
                  <div className="next-event-organizers-mobile" aria-hidden="true">
                    <img src={logo} alt="" /><span>+</span><img src={azimutMenuLogo} alt="" />
                  </div>
                  <div className="next-event-meta"><span>{t.gravelDate}</span><span>183 KM</span></div>
                </div>
              </div>
              <div className="next-event-organizers" aria-label={t.sharedBy}>
                <img src={logo} alt="TR3" />
                <span>+</span>
                <img src={azimutMenuLogo} alt="Azimut Extremo" />
              </div>
              <div className="next-countdown" aria-label="Contagem regressiva Gravel Experience Uruguay">
                <div><b>{gravelCountdown.days}</b><span>{t.countdown[0]}</span></div>
                <div><b>{String(gravelCountdown.hours).padStart(2, "0")}</b><span>{t.countdown[1]}</span></div>
                <div><b>{String(gravelCountdown.minutes).padStart(2, "0")}</b><span>{t.countdown[2]}</span></div>
              </div>
              <a className="next-event-link" href="/gravel-experience-uruguay" aria-label="Conhecer Gravel Experience Uruguay"><span aria-hidden="true">↗︎</span></a>
            </article>
          </div>
        </div>
      </section>

      <section className="corporate-events" id="eventos">
        <div className="section-frame corporate-events-heading">
          <p className="section-label">{t.ecosystem}</p>
          <h2>{t.calendar[0]}<br />{t.calendar[1]}</h2>
          <p>{t.calendarText}</p>
        </div>
        <div className="event-directory">
          {localizedEvents.map((event) => (
            <a
              className="directory-card"
              href={event.saveDate ? "#save-the-date-sao-chico" : event.href}
              target={!event.saveDate && event.external ? "_blank" : undefined}
              rel={!event.saveDate && event.external ? "noreferrer" : undefined}
              onClick={event.saveDate ? (click) => { click.preventDefault(); setSaveDateOpen(true); } : undefined}
              aria-label={event.saveDate ? `${event.status}: ${event.name}` : undefined}
              key={event.name}
            >
              <img src={event.img} alt="" style={{ objectPosition: event.position }} />
              <div className="directory-overlay" />
              <span className="directory-number">{event.n}</span>
              <span className="directory-status">{event.status}</span>
              <div className="directory-copy">
                <p>{event.place}</p>
                <h3>{event.name}</h3>
                <b>{event.date}</b>
                <span className="directory-sport">{event.sport}</span>
                <div className="directory-description">
                  <div className="directory-organizers" aria-label={event.shared ? "Organização Threerace Sports e Azimut Extremo" : event.legends ? "Organização Threerace Sports e Legends Ultimate Gravel Race" : "Organização Threerace Sports"}>
                    <img src={logo} alt="TR3" />
                    {event.shared && <img src={azimutMenuLogo} alt="Azimut Extremo" />}
                    {event.legends && <img className="legends-card-logo" src={legendsLogo} alt="Legends Ultimate Gravel Race" />}
                  </div>
                  <small>{event.text}</small>
                </div>
              </div>
              <i>↗</i>
            </a>
          ))}
        </div>
      </section>

      {saveDateOpen && (
        <div className="save-date-modal" role="dialog" aria-modal="true" aria-label="Save the Date — Threerace São Chico" onClick={() => setSaveDateOpen(false)}>
          <div className="save-date-poster" onClick={(event) => event.stopPropagation()}>
            <img src="/event-threerace-brasil.jpeg" alt="Threerace Bike Ultramarathon Brasil em São Francisco de Paula" />
            <div className="save-date-poster-shade" />
            <button type="button" className="save-date-close" onClick={() => setSaveDateOpen(false)} aria-label={t.menuClose}>×</button>
            <div className="save-date-poster-copy">
              <p>SÃO FRANCISCO DE PAULA · BRASIL</p>
              <span>{t.eventStatus[2]}</span>
              <h2>THREERACE BIKE<br />ULTRAMARATHON BRASIL</h2>
              <b>{t.eventDates[2]}</b>
              <small>MTB STAGE RACE</small>
            </div>
          </div>
        </div>
      )}

      <section className="corporate-intro" id="sobre">
        <div className="section-frame corporate-intro-grid">
          <div><p className="section-label">{t.historyLabel}</p><h2>{t.historyTitle}</h2></div>
          <div className="corporate-story">
            {t.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
        <div className="section-frame tr3-timeline">
          <div className="tr3-timeline-heading">
            <p className="section-label">2017 — 2026</p>
            <h3>{t.timelineTitle}</h3>
          </div>
          <div className="tr3-timeline-list tr3-timeline-desktop">
            {timeline.map((item) => (
              <article className="tr3-timeline-item" key={item.year}>
                <time>{item.year}</time>
                <span className="tr3-timeline-dot" aria-hidden="true" />
                <ul>
                  {item.events.map((event) => <li key={event}>{event}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <div className="tr3-timeline-marquee" aria-label={t.timelineTitle}>
            <div className="tr3-timeline-marquee-content">
              {[0, 1].map((copy) => (
                <div className="tr3-timeline-marquee-group" aria-hidden={copy === 1} key={copy}>
                  {timeline.map((item) => (
                    <article className="tr3-timeline-item" key={`${copy}-${item.year}`}>
                      <time>{item.year}</time>
                      <span className="tr3-timeline-dot" aria-hidden="true" />
                      <ul>
                        {item.events.map((event) => <li key={event}>{event}</li>)}
                      </ul>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="journal-section" id="historias">
        <div className="section-frame journal-heading">
          <div><p className="section-label">TR3 JOURNAL</p><h2>{t.journalTitle[0]}<br />{t.journalTitle[1]}</h2></div>
          <p>{t.journalText}</p>
        </div>
        <div className="section-frame journal-grid">
          {localizedNews.map((item, index) => (
            <a className={index === 0 ? "journal-card journal-feature" : "journal-card"} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} key={item.title}>
              <div className="journal-image"><img src={item.img} alt="" /></div>
              <div className="journal-copy"><p>{item.category}<span>{item.date}</span></p><h3>{item.title}</h3><small>{item.text}</small><b>{t.readStory}</b></div>
            </a>
          ))}
        </div>
      </section>

      <section className="corporate-manifesto"><div className="section-frame"><p>{t.manifestoTop[0]}<br />{t.manifestoTop[1]}</p><h2>{t.manifesto[0]}<br />{t.manifesto[1]}</h2></div></section>

      <footer id="contato">
        <div className="footer-newsletter" id="comunidade">
          <div className="section-frame footer-newsletter-grid">
            <div>
              <p className="section-label">{t.community}</p>
              <h2>{t.communityTitle}</h2>
              <p>{t.communityText}</p>
            </div>
            <form onSubmit={submitNewsletter}>
              <label><span>{t.name}</span><input name="name" type="text" placeholder={t.namePlaceholder} required /></label>
              <label><span>E-MAIL</span><input name="email" type="email" placeholder="voce@email.com" required /></label>
              <label><span>{t.interest}</span><select key={language} name="interest" defaultValue={t.allEvents}><option>{t.allEvents}</option><option>Mountain bike</option><option>Gravel</option><option>{t.partnerships}</option></select></label>
              <button type="submit">{t.subscribe}</button>
              {sent && <p className="newsletter-success" role="status">{t.sent}</p>}
            </form>
          </div>
        </div>
        <div className="section-frame footer-top corporate-footer">
          <div className="footer-brand"><img className="footer-logo" src={logo} alt="Threerace Sports" /><p>{t.footerBrand}</p></div>
          <div className="footer-nav"><p>{t.explore}</p><a href="#eventos">{t.footerEvents}</a><a href="#historias">TR3 Journal</a><a href="#sobre">{t.footerAbout}</a></div>
          <div className="footer-contact"><p>{t.contact}</p><a href="mailto:inscricoes@threerace.com.br">inscricoes@threerace.com.br</a><a href="https://wa.me/5554992476721" target="_blank" rel="noreferrer">WhatsApp +55 54 99247-6721</a></div>
        </div>
        <div className="section-frame footer-bottom"><span>THREERACE SPORTS © 2026</span><span>{t.region}</span></div>
      </footer>
    </main>
  );
}
