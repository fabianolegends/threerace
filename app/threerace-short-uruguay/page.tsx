"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import LodgingDirectory from "../lodging-directory";
import { getSavedLanguage, saveLanguage } from "../site-language";

type Language = "es" | "pt" | "en";
type PanelKey = "event" | "registration" | "course" | "schedule" | "categories" | "kit" | "stay";
type IconKind = "event" | "registration" | "course" | "elevation" | "start" | "schedule" | "categories" | "kit" | "stay";

type ThreeraceShortUruguayPageProps = {
  initialLanguage?: Language;
  localized?: boolean;
};

const heroImage = "/imagem-hero.webp";
const tr3HeaderLogo = "/tr3-logo-display.webp";
const azimutHeaderLogo = "/azimut-extremo-logo-white.svg";
const tr3Logo = "/tr3-logo-display.webp";
const azimutUrl = "https://www.azimutextremo.com/";
const registrationUrl = "https://lolograste.uy/threerace-short-uruguay";
const whatsappUrl = "https://wa.me/5554992476721";
const eventStartTime = "2026-11-01T08:30:00-03:00";
const galleryImages = [
  "/tr3-gallery-01.svg",
  "/tr3-gallery-02.svg",
  "/tr3-gallery-03.svg",
  "/tr3-gallery-04.svg",
  "/tr3-gallery-05.svg",
  "/tr3-gallery-06.svg",
  "/tr3-gallery-07.svg",
  "/tr3-gallery-08.svg",
];
const supportImages = [
  { src: "/ministerio-turismo-uruguay.png", width: 866, height: 488, alt: "Ministerio de Turismo de Uruguay" },
  { src: "/support-rocha.png", width: 623, height: 230, alt: "Gobierno de Rocha" },
  { src: "/support-rocha-deportes.png", width: 661, height: 237, alt: "Dirección de Deportes de Rocha" },
  { src: "/support-la-paloma.png", width: 208, height: 261, alt: "Municipio de La Paloma" },
  { src: "/audencia-apart-hotel.svg", width: 220, height: 100, alt: "Audencia Apart Hotel" },
];

const copy = {
  es: {
    nav: ["HOME", "RECORRIDO", "PROGRAMACIÓN", "INFORMACIÓN"],
    heroPlace: "LA PALOMA · ROCHA · URUGUAY",
    heroTitle: "THREERACE",
    heroSubtitle: "SHORT URUGUAY",
    actions: [
      ["INSCRIPCIONES", "LOTE 01 · USD 49"],
      ["RECORRIDO + DESNIVEL", "63 KM · +630 M"],
    ],
    countdown: ["DÍAS", "HORAS", "MINUTOS"],
    information: "INFORMACIÓN COMPLETA",
    panels: {
      event: "EL EVENTO",
      registration: "INSCRIPCIONES",
      course: "RECORRIDO",
      schedule: "PROGRAMACIÓN",
      categories: "CATEGORÍAS Y PREMIACIÓN",
      kit: "KIT Y SERVICIOS",
      stay: "HOSPEDAJE",
    },
    eventTitle: "THREERACE SHORT URUGUAY — LA PEDRERA 2026",
    eventParagraphs: [
      "Threerace Short Uruguay es una carrera de mountain bike de etapa única para quienes quieren vivir la experiencia Threerace en un solo día.",
      "La prueba se realizará el domingo 1.º de noviembre de 2026, junto a la programación de la tercera y última etapa de Threerace Bike Ultramarathon Uruguay, con salida en La Pedrera.",
      "Serán 63 kilómetros y 630 metros de desnivel positivo por los paisajes del departamento de Rocha. La Short tiene distancia, recorrido y salida propios dentro de la gran jornada final del evento.",
    ],
    registrationTitle: "INSCRIPCIONES",
    registrationLot: "LOTE 01",
    registrationPrice: "USD 49",
    factLabels: ["FECHA", "FORMATO", "DISTANCIA", "DESNIVEL"],
    factValues: ["01 NOV 2026", "MTB · ETAPA ÚNICA", "63 KM", "630 M+"],
    courseTitle: "UNA JORNADA. TODA LA EXPERIENCIA THREERACE.",
    courseText:
      "Un desafío de MTB con salida en La Pedrera, creado para combinar resistencia, aventura y los paisajes de Rocha en un recorrido de un solo día.",
    courseLabels: ["FECHA", "SALIDA", "DISTANCIA", "DESNIVEL", "FORMATO"],
    courseValues: ["Domingo · 01/11/2026", "La Pedrera · Rocha", "63 km", "630 m de desnivel positivo", "MTB · etapa única"],
    courseNote:
      "El trazado detallado, la superficie, los puntos de hidratación y el tiempo límite se incorporarán en una próxima actualización.",
    scheduleTitle: "ENTREGA DE KIT Y SALIDA",
    scheduleItems: [
      "Sábado · 31 de octubre · 16:00–19:00 · Entrega de kits en la Arena Threerace, en La Paloma.",
      "Domingo · 1 de noviembre · 07:00–07:45 · Entrega de kits en La Pedrera, lugar de salida.",
      "08:30 · Salida de Threerace Short Uruguay en La Pedrera.",
    ],
    categoriesTitle: "CATEGORÍAS",
    menTitle: "MASCULINA",
    womenTitle: "FEMENINA",
    menCategories: [["OPEN", "18–29"], ["MASTER A", "30–39"], ["MASTER B", "40–49"], ["MASTER C", "50–59"], ["MASTER D", "60+"]],
    womenCategories: [["OPEN", "18–29"], ["MASTER A", "30–39"], ["MASTER B", "40–49"], ["MASTER C", "50–59"]],
    categoryRule: "Las categorías con menos de 3 inscriptos serán incorporadas a la categoría anterior.",
    awardsTitle: "PREMIACIÓN",
    awardsText: "Medallas para los 3 primeros de cada categoría.",
    includedTitle: "INCLUIDO EN LA INSCRIPCIÓN",
    included: [
      "Camiseta casual alusiva al evento",
      "Medalla Finisher",
      "Placa personalizada",
      "Seguro del atleta",
      "Puntos de hidratación durante el recorrido",
      "Servicios médicos en el recorrido y atención básica gratuita en la arena",
      "Servicio mecánico básico: regulación e identificación de problemas",
      "Bike Wash",
    ],
    excludedTitle: "NO INCLUIDO EN LA INSCRIPCIÓN",
    excluded: [
      "Servicio de recuperación muscular",
      "Servicio mecánico completo",
      "Hospedaje o alimentación no descritos",
      "Cualquier desplazamiento o transfer",
      "Servicio de fotografía",
    ],
    kitNote:
      "La modalidad Short recibe los mismos servicios esenciales de la Ultramarathon, excepto el jersey de ciclismo.",
    stayIntro:
      "Consulta las opciones de hospedaje conveniadas para vivir el fin de semana Threerace en Rocha.",
    historyTitle: "UNA NUEVA FORMA DE VIVIR THREERACE URUGUAY",
    historyText:
      "La Short abre la jornada final a ciclistas que prefieren concentrar el desafío en un solo día, sin renunciar a la estructura, al territorio y a la atmósfera internacional de Threerace.",
    historyDetail:
      "La prueba comparte el domingo del evento con la Stage 03 de la Ultramarathon, pero tendrá su propia salida en La Pedrera y un recorrido de 63 km con 630 m de desnivel positivo.",
    discoverMore: "CONOCE THREERACE",
    partnerLabel: "PARTNER URUGUAY",
    partnerTitle: "CONOCE A LA EMPRESA ALIADA QUE ORGANIZA THREERACE EN URUGUAY",
    partnerCta: "VISITAR AZIMUT EXTREMO",
    kitShowcaseTitle: "TU KIT PARA VIVIR LA SHORT",
    kitShowcaseText: "Nueve beneficios y servicios para concentrarte en el recorrido.",
    kitExclusion: "La inscripción Short no incluye jersey de ciclismo.",
    organizers: "ORGANIZACIÓN Y REALIZACIÓN",
    partnerBrands: "MARCAS ASOCIADAS",
    supporters: "APOYAN",
    contactCta: "HABLAR CON LA ORGANIZACIÓN",
    menu: "Abrir menú",
    close: "Cerrar menú",
    navigationLabel: "Navegación principal",
    languageLabel: "Selector de idioma",
    highlightsLabel: "Datos destacados del evento",
    countdownLabel: "Cuenta regresiva para el evento",
    galleryLabel: "Galería de Threerace Short Uruguay",
    openSection: "Abrir sección",
    closeSection: "Cerrar sección",
    previousPhoto: "Foto anterior",
    nextPhoto: "Foto siguiente",
  },
  pt: {
    nav: ["HOME", "PERCURSO", "PROGRAMAÇÃO", "INFORMAÇÕES"],
    heroPlace: "LA PALOMA · ROCHA · URUGUAI",
    heroTitle: "THREERACE",
    heroSubtitle: "SHORT URUGUAY",
    actions: [
      ["INSCRIÇÕES", "LOTE 01 · USD 49"],
      ["PERCURSO + ELEVAÇÃO", "63 KM · +630 M"],
    ],
    countdown: ["DIAS", "HORAS", "MINUTOS"],
    information: "INFORMAÇÕES COMPLETAS",
    panels: {
      event: "O EVENTO",
      registration: "INSCRIÇÕES",
      course: "PERCURSO",
      schedule: "PROGRAMAÇÃO",
      categories: "CATEGORIAS E PREMIAÇÃO",
      kit: "KIT E SERVIÇOS",
      stay: "HOSPEDAGEM",
    },
    eventTitle: "THREERACE SHORT URUGUAY — LA PEDRERA 2026",
    eventParagraphs: [
      "A Threerace Short Uruguay é uma prova de mountain bike em etapa única para quem quer viver a experiência Threerace em um único dia.",
      "A prova acontecerá no domingo, 1º de novembro de 2026, junto à programação da terceira e última etapa da Threerace Bike Ultramarathon Uruguay, com largada em La Pedrera.",
      "Serão 63 quilômetros e 630 metros de elevação acumulada pelos cenários do departamento de Rocha. A Short terá distância, percurso e largada próprios dentro do grande dia final do evento.",
    ],
    registrationTitle: "INSCRIÇÕES",
    registrationLot: "LOTE 01",
    registrationPrice: "USD 49",
    factLabels: ["DATA", "FORMATO", "DISTÂNCIA", "ELEVAÇÃO"],
    factValues: ["01 NOV 2026", "MTB · ETAPA ÚNICA", "63 KM", "630 M+"],
    courseTitle: "UM DIA. TODA A EXPERIÊNCIA THREERACE.",
    courseText:
      "Um desafio de MTB com largada em La Pedrera, criado para reunir resistência, aventura e os cenários de Rocha em um percurso de um único dia.",
    courseLabels: ["DATA", "LARGADA", "DISTÂNCIA", "ELEVAÇÃO", "FORMATO"],
    courseValues: ["Domingo · 01/11/2026", "La Pedrera · Rocha", "63 km", "630 m de elevação acumulada", "MTB · etapa única"],
    courseNote:
      "O traçado detalhado, o tipo de piso, os pontos de hidratação e o tempo-limite serão incluídos em uma próxima atualização.",
    scheduleTitle: "ENTREGA DE KIT E LARGADA",
    scheduleItems: [
      "Sábado · 31 de outubro · 16:00–19:00 · Entrega de kits na Arena Threerace, em La Paloma.",
      "Domingo · 1º de novembro · 07:00–07:45 · Entrega de kits em La Pedrera, local da largada.",
      "08:30 · Largada da Threerace Short Uruguay em La Pedrera.",
    ],
    categoriesTitle: "CATEGORIAS",
    menTitle: "MASCULINA",
    womenTitle: "FEMININA",
    menCategories: [["OPEN", "18–29"], ["MASTER A", "30–39"], ["MASTER B", "40–49"], ["MASTER C", "50–59"], ["MASTER D", "60+"]],
    womenCategories: [["OPEN", "18–29"], ["MASTER A", "30–39"], ["MASTER B", "40–49"], ["MASTER C", "50–59"]],
    categoryRule: "Categorias com menos de 3 inscritos serão incorporadas à categoria anterior.",
    awardsTitle: "PREMIAÇÃO",
    awardsText: "Medalhas para os 3 primeiros colocados de cada categoria.",
    includedTitle: "INCLUÍDO NA INSCRIÇÃO",
    included: [
      "Camiseta casual alusiva ao evento",
      "Medalha Finisher",
      "Placa personalizada",
      "Seguro do atleta",
      "Pontos de hidratação durante o percurso",
      "Serviços médicos no percurso e atendimento básico gratuito na arena",
      "Serviço mecânico básico: regulagem e identificação de problemas",
      "Bike Wash",
    ],
    excludedTitle: "NÃO INCLUSO NA INSCRIÇÃO",
    excluded: [
      "Serviço de recuperação muscular",
      "Serviço mecânico completo",
      "Hospedagem ou alimentação não descritas",
      "Qualquer deslocamento ou transfer",
      "Serviço de fotografia",
    ],
    kitNote:
      "A modalidade Short recebe os mesmos serviços essenciais da Ultramarathon, exceto o jersey de ciclismo.",
    stayIntro:
      "Confira as hospedagens conveniadas para viver o fim de semana Threerace em Rocha.",
    historyTitle: "UMA NOVA FORMA DE VIVER A THREERACE URUGUAY",
    historyText:
      "A Short abre o dia final para ciclistas que preferem concentrar o desafio em uma única etapa, sem abrir mão da estrutura, do território e da atmosfera internacional da Threerace.",
    historyDetail:
      "A prova compartilha o domingo do evento com a Stage 03 da Ultramarathon, mas terá largada própria em La Pedrera e um percurso de 63 km com 630 m de elevação acumulada.",
    discoverMore: "CONHEÇA A THREERACE",
    partnerLabel: "PARCEIRO URUGUAY",
    partnerTitle: "CONHEÇA A EMPRESA PARCEIRA QUE ORGANIZA A THREERACE NO URUGUAI",
    partnerCta: "VISITAR AZIMUT EXTREMO",
    kitShowcaseTitle: "SEU KIT PARA VIVER A SHORT",
    kitShowcaseText: "Nove benefícios e serviços para você focar no percurso.",
    kitExclusion: "A inscrição Short não inclui jersey de ciclismo.",
    organizers: "ORGANIZAÇÃO E REALIZAÇÃO",
    partnerBrands: "MARCAS PARCEIRAS",
    supporters: "APOIO",
    contactCta: "FALAR COM A ORGANIZAÇÃO",
    menu: "Abrir menu",
    close: "Fechar menu",
    navigationLabel: "Navegação principal",
    languageLabel: "Seletor de idioma",
    highlightsLabel: "Destaques do evento",
    countdownLabel: "Contagem regressiva para o evento",
    galleryLabel: "Galeria da Threerace Short Uruguay",
    openSection: "Abrir seção",
    closeSection: "Fechar seção",
    previousPhoto: "Foto anterior",
    nextPhoto: "Próxima foto",
  },
  en: {
    nav: ["HOME", "COURSE", "SCHEDULE", "INFORMATION"],
    heroPlace: "LA PALOMA · ROCHA · URUGUAY",
    heroTitle: "THREERACE",
    heroSubtitle: "SHORT URUGUAY",
    actions: [
      ["REGISTRATION", "LOT 01 · USD 49"],
      ["COURSE + ELEVATION", "63 KM · +630 M"],
    ],
    countdown: ["DAYS", "HOURS", "MINUTES"],
    information: "COMPLETE INFORMATION",
    panels: {
      event: "THE EVENT",
      registration: "REGISTRATION",
      course: "COURSE",
      schedule: "SCHEDULE",
      categories: "CATEGORIES AND AWARDS",
      kit: "KIT AND SERVICES",
      stay: "ACCOMMODATION",
    },
    eventTitle: "THREERACE SHORT URUGUAY — LA PEDRERA 2026",
    eventParagraphs: [
      "Threerace Short Uruguay is a single-stage mountain bike race for riders who want to experience Threerace in one day.",
      "The race takes place on Sunday, November 1, 2026, alongside the third and final stage of Threerace Bike Ultramarathon Uruguay, starting in La Pedrera.",
      "The route covers 63 kilometres with 630 metres of elevation gain across the landscapes of Rocha. The Short has its own distance, course and start within the event's final day.",
    ],
    registrationTitle: "REGISTRATION",
    registrationLot: "BATCH 01",
    registrationPrice: "USD 49",
    factLabels: ["DATE", "FORMAT", "DISTANCE", "ELEVATION"],
    factValues: ["01 NOV 2026", "MTB · SINGLE STAGE", "63 KM", "630 M+"],
    courseTitle: "ONE DAY. THE FULL THREERACE EXPERIENCE.",
    courseText:
      "A one-day MTB challenge starting in La Pedrera, combining endurance, adventure and the landscapes of Rocha.",
    courseLabels: ["DATE", "START", "DISTANCE", "ELEVATION", "FORMAT"],
    courseValues: ["Sunday · Nov 1, 2026", "La Pedrera · Rocha", "63 km", "630 m elevation gain", "MTB · single-stage race"],
    courseNote:
      "Detailed routing, surface information, hydration points and the time limit will be added in a future update.",
    scheduleTitle: "KIT PICKUP AND START",
    scheduleItems: [
      "Saturday · October 31 · 16:00–19:00 · Kit pickup at the Threerace Arena in La Paloma.",
      "Sunday · November 1 · 07:00–07:45 · Kit pickup in La Pedrera, at the start venue.",
      "08:30 · Threerace Short Uruguay start in La Pedrera.",
    ],
    categoriesTitle: "CATEGORIES",
    menTitle: "MEN",
    womenTitle: "WOMEN",
    menCategories: [["OPEN", "18–29"], ["MASTER A", "30–39"], ["MASTER B", "40–49"], ["MASTER C", "50–59"], ["MASTER D", "60+"]],
    womenCategories: [["OPEN", "18–29"], ["MASTER A", "30–39"], ["MASTER B", "40–49"], ["MASTER C", "50–59"]],
    categoryRule: "Categories with fewer than 3 registered riders will be merged into the preceding category.",
    awardsTitle: "AWARDS",
    awardsText: "Medals for the top 3 finishers in each category.",
    includedTitle: "INCLUDED WITH REGISTRATION",
    included: [
      "Event casual shirt",
      "Finisher medal",
      "Personalised number plate",
      "Athlete insurance",
      "Hydration points along the course",
      "Medical services on course and free basic care at the event arena",
      "Basic mechanical service: adjustments and problem identification",
      "Bike Wash",
    ],
    excludedTitle: "NOT INCLUDED WITH REGISTRATION",
    excluded: [
      "Muscle recovery service",
      "Full mechanical service",
      "Accommodation or meals not described",
      "Any transportation or transfer",
      "Photography service",
    ],
    kitNote:
      "The Short format receives the Ultramarathon's essential services, except for the cycling jersey.",
    stayIntro:
      "Browse partner accommodation options for the Threerace weekend in Rocha.",
    historyTitle: "A NEW WAY TO EXPERIENCE THREERACE URUGUAY",
    historyText:
      "The Short opens the final day to riders who prefer a single-stage challenge without giving up Threerace's structure, territory and international atmosphere.",
    historyDetail:
      "It takes place on the same Sunday as Ultramarathon Stage 03, with its own start in La Pedrera and a 63 km course with 630 m of elevation gain.",
    discoverMore: "DISCOVER THREERACE",
    partnerLabel: "URUGUAY PARTNER",
    partnerTitle: "MEET THE PARTNER BEHIND THREERACE IN URUGUAY",
    partnerCta: "VISIT AZIMUT EXTREMO",
    kitShowcaseTitle: "YOUR KIT FOR THE SHORT",
    kitShowcaseText: "Nine benefits and services so you can focus on the ride.",
    kitExclusion: "Short registration does not include a cycling jersey.",
    organizers: "ORGANIZATION",
    partnerBrands: "PARTNER BRANDS",
    supporters: "SUPPORTERS",
    contactCta: "CONTACT THE ORGANIZERS",
    menu: "Open menu",
    close: "Close menu",
    navigationLabel: "Main navigation",
    languageLabel: "Language selector",
    highlightsLabel: "Event highlights",
    countdownLabel: "Countdown to the event",
    galleryLabel: "Threerace Short Uruguay gallery",
    openSection: "Open section",
    closeSection: "Close section",
    previousPhoto: "Previous photo",
    nextPhoto: "Next photo",
  },
} as const;

const panelKeys: PanelKey[] = ["event", "registration", "course", "schedule", "categories", "kit", "stay"];
const actionIcons: IconKind[] = ["registration", "course"];

function Icon({ kind }: { kind: IconKind }) {
  const paths: Record<IconKind, ReactNode> = {
    event: <><circle cx="24" cy="24" r="15" /><path d="M15 29c4-1 6-3 9-8 3 5 6 7 10 8M19 16l3-6M29 16l-3-6" /></>,
    registration: <><path d="M10 12h28v24H10zM16 18h16M16 24h10M16 30h7" /><path d="M14 8h20M14 40h20" /></>,
    course: <><path d="M8 35 17 9l9 26 6-18 8 18" /><circle cx="17" cy="9" r="3" /><circle cx="40" cy="35" r="3" /></>,
    elevation: <><path d="M6 38h36M10 34l9-15 7 9 8-17 6 23" /><path d="m33 9 2-5 4 4" /></>,
    start: <><path d="M10 41V8M10 10h25l-5 8 5 8H10" /><circle cx="10" cy="41" r="3" /></>,
    schedule: <><circle cx="24" cy="24" r="17" /><path d="M24 13v12l8 5M24 4v4M24 40v4M4 24h4M40 24h4" /></>,
    categories: <><circle cx="17" cy="17" r="6" /><circle cx="33" cy="18" r="5" /><path d="M7 39c1-8 5-12 10-12s9 4 10 12M26 30c2-3 4-5 7-5 5 0 8 5 9 12" /></>,
    kit: <><path d="m15 10 9-4 9 4 7 8-6 5v19H14V23l-6-5 7-8Z" /><path d="M20 8c0 4 8 4 8 0" /></>,
    stay: <><path d="M7 38h34M10 38V18h28v20M15 18v-7h18v7M15 27h7v7h-7M27 27h7v7h-7" /></>,
  };

  return <svg viewBox="0 0 48 48" aria-hidden="true">{paths[kind]}</svg>;
}

function ActionArrow() {
  return <svg aria-hidden="true" viewBox="0 0 32 32"><path d="M16 5v22M8 19l8 8 8-8" /></svg>;
}

function CleanList({ children }: { children: ReactNode }) {
  return <ul className="gravel-clean-list">{children}</ul>;
}

function EventCountdown({
  labels,
  ariaLabel,
}: {
  labels: readonly string[];
  ariaLabel: string;
}) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setNow(Date.now()));
    const timer = window.setInterval(() => setNow(Date.now()), 30000);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, []);

  const target = new Date(eventStartTime).getTime();
  const remaining = now === null ? 0 : Math.max(0, target - now);
  const values = [
    Math.floor(remaining / 86400000),
    Math.floor((remaining / 3600000) % 24),
    Math.floor((remaining / 60000) % 60),
  ];

  return (
    <section className="countdown-section" aria-label={ariaLabel}>
      <div className="section-frame countdown-grid">
        {values.map((value, index) => (
          <div className="countdown-unit" key={labels[index]}>
            <b>{String(value).padStart(2, "0")}</b>
            <span>{labels[index]}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ThreeraceShortUruguayPage({
  initialLanguage = "pt",
  localized = false,
}: ThreeraceShortUruguayPageProps) {
  const router = useRouter();
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [openPanel, setOpenPanel] = useState<PanelKey | null>("event");
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryVisible, setGalleryVisible] = useState(3);
  const t = copy[language];

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const selected = localized ? initialLanguage : getSavedLanguage(initialLanguage);
      setLanguage(selected);
      saveLanguage(selected);
    });
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [initialLanguage, localized]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 580px)");
    const updateGallery = () => {
      const visible = media.matches ? 1 : 3;
      setGalleryVisible(visible);
      setGalleryIndex((current) => Math.min(current, galleryImages.length - visible));
    };
    const frame = window.requestAnimationFrame(updateGallery);
    media.addEventListener("change", updateGallery);
    return () => {
      window.cancelAnimationFrame(frame);
      media.removeEventListener("change", updateGallery);
    };
  }, []);

  const selectLanguage = (code: Language) => {
    setLanguage(code);
    saveLanguage(code);
    if (localized) router.push(`/${code}/threerace-short-uruguay`);
  };

  const openInformationPanel = (panel: PanelKey) => {
    setOpenPanel(panel);
    setMenuOpen(false);
  };

  const galleryLastIndex = Math.max(0, galleryImages.length - galleryVisible);

  const panelContent = (key: PanelKey) => {
    if (key === "event") {
      return (
        <div className="official-copy">
          <h4>{t.eventTitle}</h4>
          {t.eventParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="short-facts-grid">
            {t.factLabels.map((label, index) => (
              <article key={label}><span>{label}</span><strong>{t.factValues[index]}</strong></article>
            ))}
          </div>
        </div>
      );
    }

    if (key === "course") {
      return (
        <div className="official-copy">
          <h4>{t.courseTitle}</h4>
          <p>{t.courseText}</p>
          <div className="short-course-card">
            {t.courseLabels.map((label, index) => (
              <div key={label}><span>{label}</span><strong>{t.courseValues[index]}</strong></div>
            ))}
          </div>
          <p className="short-information-note">{t.courseNote}</p>
        </div>
      );
    }

    if (key === "registration") {
      return (
        <div className="official-copy short-registration-copy">
          <h4>{t.registrationTitle}</h4>
          <div className="short-registration-price">
            <span>{t.registrationLot}</span>
            <strong>{t.registrationPrice}</strong>
          </div>
          <div className="short-kit-columns">
            <section><h4>{t.includedTitle}</h4><CleanList>{t.included.map((item) => <li key={item}>{item}</li>)}</CleanList></section>
            <section><h4>{t.excludedTitle}</h4><CleanList>{t.excluded.map((item) => <li key={item}>{item}</li>)}</CleanList></section>
          </div>
        </div>
      );
    }

    if (key === "schedule") {
      return (
        <div className="official-copy">
          <div className="short-schedule-card">
            <h4>{t.scheduleTitle}</h4>
            <CleanList>{t.scheduleItems.map((item) => <li key={item}>{item}</li>)}</CleanList>
          </div>
        </div>
      );
    }

    if (key === "categories") {
      return (
        <div className="official-copy short-categories-copy">
          <h4>{t.categoriesTitle}</h4>
          <div className="short-categories-grid">
            <section>
              <h5>{t.menTitle}</h5>
              {t.menCategories.map(([name, ages]) => (
                <div className="short-category-row" key={name}>
                  <strong>{name}</strong>
                  <span>{ages}</span>
                </div>
              ))}
            </section>
            <section>
              <h5>{t.womenTitle}</h5>
              {t.womenCategories.map(([name, ages]) => (
                <div className="short-category-row" key={name}>
                  <strong>{name}</strong>
                  <span>{ages}</span>
                </div>
              ))}
            </section>
          </div>
          <p className="short-category-note">{t.categoryRule}</p>
          <div className="short-awards-card">
            <span>{t.awardsTitle}</span>
            <strong>{t.awardsText}</strong>
          </div>
        </div>
      );
    }

    if (key === "kit") {
      return (
        <div className="official-copy">
          <p>{t.kitNote}</p>
          <div className="short-kit-columns">
            <section><h4>{t.includedTitle}</h4><CleanList>{t.included.map((item) => <li key={item}>{item}</li>)}</CleanList></section>
            <section><h4>{t.excludedTitle}</h4><CleanList>{t.excluded.map((item) => <li key={item}>{item}</li>)}</CleanList></section>
          </div>
        </div>
      );
    }

    return (
      <div className="official-copy">
        <p>{t.stayIntro}</p>
        <LodgingDirectory language={language} />
      </div>
    );
  };

  return (
    <main className="uruguay-event-page short-event-page" lang={{ es: "es-UY", pt: "pt-BR", en: "en" }[language]}>
      <section className="hero uruguay-event-hero short-event-hero">
        <Image className="short-hero-background" src={heroImage} alt="" fill priority sizes="100vw" />
        <header className="site-header">
          <Link className="brand" href="/" aria-label="Threerace Sports">
            <Image className="header-tr3-logo" src={tr3HeaderLogo} alt="Threerace Sports" width={512} height={512} priority />
            <Image className="header-azimut-logo" src={azimutHeaderLogo} alt="Azimut Extremo" width={160} height={90} priority unoptimized />
          </Link>

          <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label={t.navigationLabel}>
            <Link href="/" onClick={() => setMenuOpen(false)}>{t.nav[0]}</Link>
            <a href="#course" onClick={() => openInformationPanel("course")}>{t.nav[1]}</a>
            <a href="#schedule" onClick={() => openInformationPanel("schedule")}>{t.nav[2]}</a>
            <a href="#information" onClick={() => setMenuOpen(false)}>{t.nav[3]}</a>
          </nav>

          <div className="header-actions">
            <div className="language-switcher" aria-label={t.languageLabel}>
              {(["es", "pt", "en"] as Language[]).map((code) => (
                <button key={code} className={language === code ? "active" : ""} type="button" onClick={() => selectLanguage(code)} aria-label={{ es: "Español", pt: "Português", en: "English" }[code]} aria-pressed={language === code}>
                  {{ es: "🇪🇸", pt: "🇧🇷", en: "🇬🇧" }[code]}
                </button>
              ))}
            </div>
            <button className="menu-toggle" type="button" aria-label={menuOpen ? t.close : t.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}><span /><span /></button>
          </div>
        </header>

        <div className="uruguay-title-block short-title-block" id="top">
          <p className="location">{t.heroPlace}</p>
          <h1>{t.heroTitle}<small>{t.heroSubtitle}</small></h1>
          <p className="short-hero-tagline">ONE DAY <span aria-hidden="true">—</span> ONE RIDE</p>
        </div>

        <section className="original-action-cards section-frame" aria-label={t.highlightsLabel}>
          {t.actions.map(([title, note], index) => (
            <a
              key={title}
              href={index === 0 ? registrationUrl : "#course"}
              target={index === 0 ? "_blank" : undefined}
              rel={index === 0 ? "noreferrer" : undefined}
              onClick={index === 0 ? undefined : () => openInformationPanel("course")}
            >
              <Icon kind={actionIcons[index]} />
              <b>{title}</b>
              <small>{note}</small>
              <i><ActionArrow /></i>
            </a>
          ))}
        </section>
      </section>

      <EventCountdown labels={t.countdown} ariaLabel={t.countdownLabel} />

      <section className="original-information" id="information">
        <div className="section-frame">
          <h2>{t.information}</h2>
          <div className="original-accordion">
            {panelKeys.map((key) => {
              const isOpen = openPanel === key;
              return (
                <article id={key} className={isOpen ? "open" : ""} key={key}>
                  <div className="accordion-trigger">
                    <span className="accordion-field-icon"><Icon kind={key} /></span>
                    <b>{t.panels[key]}</b>
                    <button id={`short-trigger-${key}`} type="button" onClick={() => setOpenPanel(isOpen ? null : key)} aria-expanded={isOpen} aria-controls={`short-info-${key}`} aria-label={`${isOpen ? t.closeSection : t.openSection}: ${t.panels[key]}`}><i>{isOpen ? "−" : "+"}</i></button>
                  </div>
                  <div className="original-accordion-content" id={`short-info-${key}`} role="region" aria-labelledby={`short-trigger-${key}`} aria-hidden={!isOpen}>
                    <div className="accordion-panel-inner">{isOpen ? panelContent(key) : null}</div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="original-about section-frame">
        <div className="original-about-copy">
          <h2>{t.historyTitle}</h2>
          <p>{t.historyText}</p>
          <p>{t.historyDetail}</p>
          <Link className="original-about-mobile-link" href="/">{t.discoverMore} +++</Link>
        </div>
        <div className="original-about-brand">
          <span><Image src={tr3Logo} alt="Threerace Sports" width={512} height={512} /></span>
          <Link className="original-about-desktop-link" href="/">{t.discoverMore} +++</Link>
        </div>
      </section>

      <section className="original-gallery" aria-label={t.galleryLabel}>
        <div className="original-gallery-viewport">
          <div className="original-gallery-track" style={{ transform: `translateX(-${galleryIndex * (100 / galleryVisible)}%)` }}>
            {galleryImages.map((image, index) => (
              <figure className="original-gallery-slide" key={image}>
                <Image src={image} alt={`Threerace Short Uruguay — ${index + 1}`} width={1440} height={960} sizes="(max-width: 580px) 100vw, 33vw" loading="lazy" unoptimized />
              </figure>
            ))}
          </div>
        </div>
        <button className="original-gallery-control original-gallery-prev" type="button" aria-label={t.previousPhoto} disabled={galleryIndex === 0} onClick={() => setGalleryIndex((current) => Math.max(0, current - 1))}>←</button>
        <button className="original-gallery-control original-gallery-next" type="button" aria-label={t.nextPhoto} disabled={galleryIndex === galleryLastIndex} onClick={() => setGalleryIndex((current) => Math.min(galleryLastIndex, current + 1))}>→</button>
        <span className="original-gallery-count" aria-hidden="true">{String(galleryIndex + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}</span>
      </section>

      <section className="azimut-feature">
        <a className="section-frame" href={azimutUrl} target="_blank" rel="noreferrer">
          <Image src="/azimut-extremo-logo.png" alt="Azimut Extremo Outdoor Adventures" width={363} height={354} />
          <div><p className="section-label">{t.partnerLabel}</p><h2>{t.partnerTitle}</h2><span>{t.partnerCta} ↗</span></div>
        </a>
      </section>

      <section className="original-kit short-kit-section" id="kit-showcase">
        <div className="section-frame short-kit-showcase">
          <div className="short-kit-heading"><p className="section-label">KIT SHORT</p><h2>{t.kitShowcaseTitle}</h2><p>{t.kitShowcaseText}</p></div>
          <div className="short-kit-grid">
            {t.included.map((item, index) => <article key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></article>)}
          </div>
          <p className="short-kit-exclusion">{t.kitExclusion}</p>
        </div>
      </section>

      <section className="original-partners" id="contact">
        <div className="section-frame">
          <div className="original-organizers"><p>{t.organizers}</p><Image src="/tr3-logo-display.webp" alt="Threerace Sports" width={512} height={512} /><Image src="/azimut-extremo-logo.png" alt="Azimut Extremo" width={363} height={354} /></div>
          <div className="original-main-sponsor"><p>OFFICIAL SPONSOR</p><Image src="/epic-bike-store.png" alt="Epic Bike Store" width={378} height={263} /></div>
          <div className="original-brands">
            <p>{t.partnerBrands}</p>
            <Image className="partner-brands-all" src="/partner-brands-row.png" alt="Orbea, Bioracer, 226ERS, Rudy Project, Shokz, DJI e Insta360" width={1364} height={112} />
            <div className="partner-brands-mobile" aria-hidden="true"><Image src="/partner-brands-mobile-1.svg" alt="" width={920} height={112} unoptimized /><Image src="/partner-brands-mobile-2.svg" alt="" width={920} height={112} unoptimized /></div>
          </div>
          <div className="original-support">
            <p>{t.supporters}</p>
            <div className="support-logo-row">
              <div className="support-logo-line support-logo-line-top">
                {supportImages.slice(0, 2).map((image) => <Image src={image.src} alt={image.alt} width={image.width} height={image.height} key={image.src} unoptimized={image.src.endsWith(".svg")} />)}
              </div>
              <div className="support-logo-line support-logo-line-bottom">
                {supportImages.slice(2).map((image) => <Image src={image.src} alt={image.alt} width={image.width} height={image.height} key={image.src} unoptimized={image.src.endsWith(".svg")} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <a className="mobile-register" href={whatsappUrl} target="_blank" rel="noreferrer">{t.contactCta} <span aria-hidden="true">↗</span></a>
    </main>
  );
}

export default function ThreeraceShortUruguay() {
  return <ThreeraceShortUruguayPage />;
}
