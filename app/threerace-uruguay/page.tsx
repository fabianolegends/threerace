"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { getSavedLanguage, saveLanguage } from "../site-language";
import LodgingDirectory from "../lodging-directory";

type Language = "es" | "pt" | "en";

const registrationUrl = "https://event.windfit.app/threerace-uruguay-2026";
const whatsappUrl = "https://wa.me/5554992476721";
const rulebookUrl =
  "https://drive.google.com/file/d/1dh3hxzVGxUYNoZLJfVRL6HxXr_CCEUVG/view?usp=sharing";
const certificatePtUrl =
  "https://drive.google.com/file/d/1nuGs03DI701-xhgBBbjSq5DmRH88CYSP/view?usp=drive_link";
const lodgingUrl = "https://www.escapatearocha.uy/alojamientos?localidad=4&page=4";
const azimutUrl = "https://www.azimutextremo.com/";

const copy = {
  es: {
    nav: ["Home", "Etapas", "Inscripción", "Información"],
    menu: "Abrir menú",
    close: "Cerrar menú",
    featured: "INSCRIPCIONES ABIERTAS · URUGUAY 2026",
    eyebrow: "ROCHA + LA PALOMA · URUGUAY",
    hero: "La próxima leyenda se escribe sobre dos ruedas.",
    subhero:
      "Tres días de MTB y gravel entre la sierra, el campo y el Atlántico uruguayo.",
    register: "INSCRIBIRME AHORA",
    seeEvents: "VER LOS EVENTOS",
    countdown: ["DÍAS", "HORAS", "MINUTOS"],
    eventLead: "Elige tu desafío",
    eventTitle: "Dos experiencias. Una misma llegada.",
    eventText:
      "Inscripciones activas para la edición internacional de Threerace Bike Ultramarathon. Elige tu modalidad y asegura tu lugar.",
    mtbTag: "MTB · STAGE RACE",
    mtbTitle: "Threerace Bike Ultramarathon",
    mtbDesc:
      "Una carrera por etapas diseñada para quienes buscan aventura, resistencia y puro mountain bike.",
    mtbMeta: ["30 OCT — 01 NOV", "3 DÍAS", "+140 KM"],
    mtbPrice: "USD 220",
    mtbPriceNote: "Inscripción individual",
    gravelTag: "GRAVEL EXPERIENCE",
    gravelTitle: "Gravel Experience Uruguay",
    gravelDesc:
      "Dos etapas de gravel y una travesía auténtica por los caminos de Rocha y La Paloma.",
    gravelMeta: ["31 OCT — 01 NOV", "2 ETAPAS", "173 KM"],
    gravelPrice: "USD 149 + 10%",
    gravelPriceNote: "Lote 01 hasta el 05/08 · solo 120 cupos",
    discover: "CONOCER EL EVENTO",
    information: "Todo lo que necesitas saber",
    informationText:
      "Información clara antes de iniciar tu inscripción. Los detalles esenciales están a un clic, sin perderte en menús largos.",
    infoCards: [
      ["ETAPAS", "Conoce el recorrido, las distancias y los tiempos de cada jornada."],
      ["CATEGORÍAS", "Consulta las categorías disponibles para MTB y Gravel."],
      ["ALOJAMIENTO", "Organiza tu estadía en Rocha y La Paloma con anticipación."],
      ["REGLAMENTO", "Revisa las reglas oficiales y prepárate para la línea de salida."],
    ],
    guideEyebrow: "GUÍA DEL ATLETA",
    guideTitle: "El recorrido comienza aquí.",
    guideText:
      "Una lectura rápida de cada modalidad para que elijas tu desafío con toda la información esencial en la pantalla.",
    stages: "ETAPAS",
    categories: "CATEGORÍAS",
    mtbStages: [
      ["ETAPA 01", "30 OCT · XCC", "ROCHA", "2 KM · 3 VUELTAS"],
      ["ETAPA 02", "31 OCT · XCM", "ROCHA", "82 KM · +1.600 M"],
      ["ETAPA 03", "01 NOV · XCM", "LA PALOMA", "45 KM · +600 M"],
    ],
    gravelStages: [
      ["ETAPA 01", "31 OCT · GRAVEL", "SALIDA ROCHA", "105 KM · LÍMITE 7 H"],
      ["ETAPA 02", "01 NOV · GRAVEL", "LA PALOMA", "68 KM · LÍMITE 4 H 40"],
    ],
    categoriesText:
      "La clasificación se define por modalidad. Revisa tu categoría antes de iniciar el proceso de inscripción.",
    categoryGroups: [
      ["MTB · SOLO MASCULINO", "Elite 19+ · Open 18–29 · A1 30–34 · A2 35–39 · B1 40–44 · B2 45–49 · C1 50–54 · C2 55–59 · D 60–64 · E 65+"],
      ["MTB · SOLO FEMENINO", "Elite 19+ · Open 18–29 · Master A 30–39 · Master B 40–49 · Master C 50+"],
      ["MTB · DUPLAS", "Masculino −79 · 80–99 · +100 · Mixta libre · Femenina libre"],
      ["GRAVEL EXPERIENCE", "Categorías únicas masculina y femenina"],
    ],
    rulebook: "VER REGLAMENTO",
    lodging: "VER ALOJAMIENTO",
    partners: ["ORGANIZACIÓN Y REALIZACIÓN", "OFFICIAL SPONSOR", "APOYAN"],
    included: "¿QUÉ INCLUYE TU INSCRIPCIÓN?",
    includedText:
      "Cada detalle fue pensado para que llegues a la salida concentrado en vivir la experiencia.",
    includes: [
      "Jersey Bioracer",
      "Camiseta casual",
      "Medias Threerace",
      "Medalla de FINISHER al completar el 75% del evento",
      "Placa personalizada",
      "Seguro del atleta",
      "Puntos de hidratación durante el recorrido",
      "Servicios médicos en el recorrido y atención básica en la arena",
      "Servicio mecánico básico: regulación e identificación de problemas",
      "Bike wash",
    ],
    planTag: "30 OCT — 01 NOV · 2026",
    planTitle: "Un destino. Tres días. Dos maneras de vivirlo.",
    planText:
      "Rocha y La Paloma reciben una edición que une atletas de Brasil, Uruguay, Argentina, Chile y Paraguay alrededor de la bicicleta.",
    planItems: [
      ["DÍA 01", "Bienvenida, acreditación y apertura de la experiencia."],
      ["DÍA 02", "MTB Stage Race y Gravel Experience · etapa 1."],
      ["DÍA 03", "Etapa final, celebración y llegada en La Paloma."],
    ],
    faqEyebrow: "PREGUNTAS FRECUENTES",
    faqTitle: "Antes de partir, resuelve tus dudas.",
    faqs: [
      [
        "¿Dónde hago mi inscripción?",
        "Las inscripciones se realizan en la plataforma WindFit. El botón de inscripción de esta página lleva directamente al proceso oficial.",
      ],
      [
        "¿Qué está incluido?",
        "El kit y los servicios varían según la modalidad, pero incluyen artículos oficiales, seguro del atleta, atención médica, mecánica básica y Bike Wash. Consulta cada evento antes de confirmar.",
      ],
      [
        "¿Puedo competir en Gravel?",
        "Sí. Gravel Experience tiene dos etapas, categorías únicas masculina y femenina y un máximo de 120 participantes.",
      ],
      [
        "¿Dónde puedo pedir ayuda?",
        "Habla con nuestro equipo por WhatsApp o escribe a inscricoes@threerace.com.br. Te orientamos antes de completar la inscripción.",
      ],
    ],
    faqCta: "HABLAR POR WHATSAPP",
    historyTitle: "¿YA CONOCES LA HISTORIA DE LA CARRERA?",
    history: "Threerace Sports fue creada en 2017 para asumir todos los eventos de carácter competitivo que, hasta ese momento, eran organizados por Ekonova Adventure.",
    historyDetail: "Con foco principal en eventos de mountain bike, la empresa se consolidó en el mercado al lanzar la Threerace Bike Ultramarathon, una ultramaratón de MTB que es referencia en América del Sur y uno de los eventos de Brasil con mayor proporción de atletas extranjeros.",
    discoverMore: "DESCUBRE MÁS",
    footer: "THREERACE SPORTS · HECHO PARA QUIENES VAN MÁS LEJOS",
    contact: "¿Necesitas ayuda?",
    email: "inscricoes@threerace.com.br",
    official: "Sitio oficial · Threerace Bike Ultramarathon Uruguay 2026",
  },
  pt: {
    nav: ["Home", "Etapas", "Inscrição", "Informações"],
    menu: "Abrir menu",
    close: "Fechar menu",
    featured: "INSCRIÇÕES ABERTAS · URUGUAI 2026",
    eyebrow: "ROCHA + LA PALOMA · URUGUAI",
    hero: "A próxima lenda se escreve sobre duas rodas.",
    subhero:
      "Três dias de MTB e gravel entre a serra, o campo e o Atlântico uruguaio.",
    register: "INSCREVA-SE AGORA",
    seeEvents: "VER OS EVENTOS",
    countdown: ["DIAS", "HORAS", "MINUTOS"],
    eventLead: "Escolha o seu desafio",
    eventTitle: "Duas experiências. Uma mesma chegada.",
    eventText:
      "Inscrições ativas para a edição internacional da Threerace Bike Ultramarathon. Escolha a sua modalidade e garanta sua vaga.",
    mtbTag: "MTB · STAGE RACE",
    mtbTitle: "Threerace Bike Ultramarathon",
    mtbDesc:
      "Uma corrida por etapas para quem busca aventura, resistência e mountain bike de verdade.",
    mtbMeta: ["30 OUT — 01 NOV", "3 DIAS", "+140 KM"],
    mtbPrice: "USD 220",
    mtbPriceNote: "Inscrição individual",
    gravelTag: "GRAVEL EXPERIENCE",
    gravelTitle: "Gravel Experience Uruguay",
    gravelDesc:
      "Duas etapas de gravel e uma travessia autêntica pelos caminhos de Rocha e La Paloma.",
    gravelMeta: ["31 OUT — 01 NOV", "2 ETAPAS", "173 KM"],
    gravelPrice: "USD 149 + 10%",
    gravelPriceNote: "Lote 01 até 05/08 · somente 120 vagas",
    discover: "CONHECER O EVENTO",
    information: "Tudo o que você precisa saber",
    informationText:
      "Informação clara antes de iniciar sua inscrição. Os detalhes essenciais estão a um clique, sem menus longos ou confusos.",
    infoCards: [
      ["ETAPAS", "Conheça o percurso, as distâncias e os horários de cada dia."],
      ["CATEGORIAS", "Confira as categorias disponíveis para MTB e Gravel."],
      ["HOSPEDAGEM", "Organize sua estadia em Rocha e La Paloma com antecedência."],
      ["REGULAMENTO", "Leia as regras oficiais e prepare-se para a linha de largada."],
    ],
    guideEyebrow: "GUIA DO ATLETA",
    guideTitle: "O percurso começa aqui.",
    guideText:
      "Uma leitura rápida de cada modalidade para você escolher o seu desafio com toda a informação essencial na tela.",
    stages: "ETAPAS",
    categories: "CATEGORIAS",
    mtbStages: [
      ["ETAPA 01", "30 OUT · XCC", "ROCHA", "2 KM · 3 VOLTAS"],
      ["ETAPA 02", "31 OUT · XCM", "ROCHA", "82 KM · +1.600 M"],
      ["ETAPA 03", "01 NOV · XCM", "LA PALOMA", "45 KM · +600 M"],
    ],
    gravelStages: [
      ["ETAPA 01", "31 OUT · GRAVEL", "LARGADA EM ROCHA", "105 KM · LIMITE 7 H"],
      ["ETAPA 02", "01 NOV · GRAVEL", "LA PALOMA", "68 KM · LIMITE 4 H 40"],
    ],
    categoriesText:
      "A classificação é definida por modalidade. Confira sua categoria antes de iniciar a inscrição.",
    categoryGroups: [
      ["MTB · SOLO MASCULINO", "Elite 19+ · Open 18–29 · A1 30–34 · A2 35–39 · B1 40–44 · B2 45–49 · C1 50–54 · C2 55–59 · D 60–64 · E 65+"],
      ["MTB · SOLO FEMININO", "Elite 19+ · Open 18–29 · Master A 30–39 · Master B 40–49 · Master C 50+"],
      ["MTB · DUPLAS", "Masculino −79 · 80–99 · +100 · Mista livre · Feminina livre"],
      ["GRAVEL EXPERIENCE", "Categorias únicas masculina e feminina"],
    ],
    rulebook: "VER REGULAMENTO",
    lodging: "VER HOSPEDAGEM",
    partners: ["ORGANIZAÇÃO E REALIZAÇÃO", "OFFICIAL SPONSOR", "APOIO"],
    included: "O QUE ESTÁ INCLUSO NA INSCRIÇÃO?",
    includedText:
      "Cada detalhe foi pensado para que você chegue à largada concentrado em viver a experiência.",
    includes: [
      "Jersey Bioracer",
      "Camiseta casual",
      "Meias Threerace",
      "Medalha FINISHER ao completar 75% do evento",
      "Placa personalizada",
      "Seguro do atleta",
      "Pontos de hidratação durante o percurso",
      "Serviços médicos no percurso e atendimento básico na arena",
      "Serviço mecânico básico: regulagem e identificação de problemas",
      "Bike wash",
    ],
    planTag: "30 OUT — 01 NOV · 2026",
    planTitle: "Um destino. Três dias. Duas formas de viver.",
    planText:
      "Rocha e La Paloma recebem uma edição que une atletas do Brasil, Uruguai, Argentina, Chile e Paraguai pela bicicleta.",
    planItems: [
      ["DIA 01", "Boas-vindas, credenciamento e abertura da experiência."],
      ["DIA 02", "MTB Stage Race e Gravel Experience · etapa 1."],
      ["DIA 03", "Etapa final, celebração e chegada em La Paloma."],
    ],
    faqEyebrow: "PERGUNTAS FREQUENTES",
    faqTitle: "Antes de partir, tire suas dúvidas.",
    faqs: [
      [
        "Onde faço a minha inscrição?",
        "As inscrições acontecem na plataforma WindFit. O botão de inscrição desta página leva diretamente ao processo oficial.",
      ],
      [
        "O que está incluso?",
        "O kit e os serviços variam conforme a modalidade, mas incluem itens oficiais, seguro do atleta, atendimento médico, mecânica básica e Bike Wash. Confira cada evento antes de confirmar.",
      ],
      [
        "Posso competir no Gravel?",
        "Sim. A Gravel Experience tem duas etapas, categorias únicas masculina e feminina e limite de 120 participantes.",
      ],
      [
        "Onde peço ajuda?",
        "Fale com nossa equipe pelo WhatsApp ou escreva para inscricoes@threerace.com.br. Nós orientamos você antes de finalizar a inscrição.",
      ],
    ],
    faqCta: "FALAR NO WHATSAPP",
    historyTitle: "JÁ CONHECE A HISTÓRIA DA PROVA?",
    history: "A Threerace Sports foi criada em 2017 para assumir todos os eventos de caráter competitivo que, até aquele momento, eram organizados pela Ekonova Adventure.",
    historyDetail: "Com foco principal em eventos de mountain bike, a empresa se consolidou no mercado ao lançar a Threerace Bike Ultramarathon, uma ultramaratona de MTB que é referência na América do Sul e um dos eventos do Brasil com maior proporção de atletas estrangeiros.",
    discoverMore: "DESCUBRA MAIS",
    footer: "THREERACE SPORTS · FEITO PARA QUEM VAI MAIS LONGE",
    contact: "Precisa de ajuda?",
    email: "inscricoes@threerace.com.br",
    official: "Site oficial · Threerace Bike Ultramarathon Uruguay 2026",
  },
  en: {
    nav: ["Home", "Stages", "Registration", "Information"],
    menu: "Open menu",
    close: "Close menu",
    featured: "REGISTRATION OPEN · URUGUAY 2026",
    eyebrow: "ROCHA + LA PALOMA · URUGUAY",
    hero: "The next legend is written on two wheels.",
    subhero:
      "Three days of MTB and gravel between Uruguay's hills, countryside and Atlantic coast.",
    register: "REGISTER NOW",
    seeEvents: "VIEW EVENTS",
    countdown: ["DAYS", "HOURS", "MINUTES"],
    eventLead: "Choose your challenge",
    eventTitle: "Two experiences. One finish line.",
    eventText:
      "Registration is open for the international edition of Threerace Bike Ultramarathon. Choose your format and secure your place.",
    mtbTag: "MTB · STAGE RACE",
    mtbTitle: "Threerace Bike Ultramarathon",
    mtbDesc:
      "A multi-stage race for riders searching for adventure, endurance and pure mountain bike.",
    mtbMeta: ["30 OCT — 01 NOV", "3 DAYS", "+140 KM"],
    mtbPrice: "USD 220",
    mtbPriceNote: "Individual registration",
    gravelTag: "GRAVEL EXPERIENCE",
    gravelTitle: "Gravel Experience Uruguay",
    gravelDesc:
      "Two gravel stages and an authentic ride across the roads of Rocha and La Paloma.",
    gravelMeta: ["31 OCT — 01 NOV", "2 STAGES", "173 KM"],
    gravelPrice: "USD 149 + 10%",
    gravelPriceNote: "Lot 01 through 25 JUL · only 120 places",
    discover: "DISCOVER THE EVENT",
    information: "Everything you need to know",
    informationText:
      "Clear information before you start your registration. Essential details are one click away, without long menus.",
    infoCards: [
      ["STAGES", "Explore the route, distance and time plan for every day."],
      ["CATEGORIES", "See the available MTB and Gravel categories."],
      ["ACCOMMODATION", "Plan your stay in Rocha and La Paloma in advance."],
      ["RULEBOOK", "Read the official rules and get ready for the start line."],
    ],
    guideEyebrow: "ATHLETE GUIDE",
    guideTitle: "The route starts here.",
    guideText:
      "A quick read of each format, so you can choose your challenge with the essential information on screen.",
    stages: "STAGES",
    categories: "CATEGORIES",
    mtbStages: [
      ["STAGE 01", "30 OCT · XCC", "ROCHA", "2 KM · 3 LAPS"],
      ["STAGE 02", "31 OCT · XCM", "ROCHA", "82 KM · +1,600 M"],
      ["STAGE 03", "01 NOV · XCM", "LA PALOMA", "45 KM · +600 M"],
    ],
    gravelStages: [
      ["STAGE 01", "31 OCT · GRAVEL", "START IN ROCHA", "105 KM · 7 H LIMIT"],
      ["STAGE 02", "01 NOV · GRAVEL", "LA PALOMA", "68 KM · 4 H 40 LIMIT"],
    ],
    categoriesText:
      "Classification is defined by format. Check your category before you start registration.",
    categoryGroups: [
      ["MTB · MEN SOLO", "Elite 19+ · Open 18–29 · A1 30–34 · A2 35–39 · B1 40–44 · B2 45–49 · C1 50–54 · C2 55–59 · D 60–64 · E 65+"],
      ["MTB · WOMEN SOLO", "Elite 19+ · Open 18–29 · Master A 30–39 · Master B 40–49 · Master C 50+"],
      ["MTB · PAIRS", "Men −79 · 80–99 · +100 · Mixed open · Women open"],
      ["GRAVEL EXPERIENCE", "Single men's and women's categories"],
    ],
    rulebook: "VIEW RULEBOOK",
    lodging: "VIEW ACCOMMODATION",
    partners: ["ORGANIZATION", "OFFICIAL SPONSOR", "SUPPORTERS"],
    included: "WHAT DOES YOUR REGISTRATION INCLUDE?",
    includedText:
      "Every detail is designed to let you arrive focused on the experience.",
    includes: [
      "Bioracer jersey",
      "Casual T-shirt",
      "Threerace socks",
      "FINISHER medal upon completing 75% of the event",
      "Personalized number plate",
      "Athlete insurance",
      "Hydration points along the course",
      "Medical services on course and basic care at the event arena",
      "Basic mechanical service: adjustment and problem identification",
      "Bike wash",
    ],
    planTag: "30 OCT — 01 NOV · 2026",
    planTitle: "One destination. Three days. Two ways to ride it.",
    planText:
      "Rocha and La Paloma welcome an edition that brings together athletes from Brazil, Uruguay, Argentina, Chile and Paraguay around the bicycle.",
    planItems: [
      ["DAY 01", "Welcome, race kit collection and opening of the experience."],
      ["DAY 02", "MTB Stage Race and Gravel Experience · stage 1."],
      ["DAY 03", "Final stage, celebration and finish in La Paloma."],
    ],
    faqEyebrow: "FREQUENTLY ASKED QUESTIONS",
    faqTitle: "Before you ride, get your questions answered.",
    faqs: [
      [
        "Where do I register?",
        "Registration takes place on the WindFit platform. The registration button on this page takes you directly to the official process.",
      ],
      [
        "What is included?",
        "The kit and services vary by format, but include official items, athlete insurance, medical service, basic mechanics and Bike Wash. Check each event before you confirm.",
      ],
      [
        "Can I race Gravel?",
        "Yes. Gravel Experience has two stages, single men's and women's categories and a maximum of 120 riders.",
      ],
      [
        "Where can I ask for help?",
        "Talk to our team on WhatsApp or email inscricoes@threerace.com.br. We will help before you complete registration.",
      ],
    ],
    faqCta: "CHAT ON WHATSAPP",
    historyTitle: "DO YOU KNOW THE STORY BEHIND THE RACE?",
    history: "Threerace Sports was created in 2017 to lead the competitive events that, until then, had been organized by Ekonova Adventure.",
    historyDetail: "Focused primarily on mountain bike events, the company established itself by launching Threerace Bike Ultramarathon, an MTB ultramarathon that has become a reference in South America and one of Brazil's events with the highest proportion of international athletes.",
    discoverMore: "DISCOVER MORE",
    footer: "THREERACE SPORTS · MADE FOR THOSE WHO GO FARTHER",
    contact: "Need help?",
    email: "inscricoes@threerace.com.br",
    official: "Official website · Threerace Bike Ultramarathon Uruguay 2026",
  },
} as const;

const heroImage = "/imagem-hero.webp";
const gravelImage = "/gravel-experience-hero-v2.png";
const tr3Logo = "/tr3-logo-new.svg";
const tr3HeaderLogo = "/tr3-logo-new.svg";
const azimutHeaderLogo = "/azimut-extremo-logo-white.svg";
const azimutLogo = "/azimut-extremo-logo.png";
const mainSponsorImage = "/partner-brands-row.png";
const supportImages = [
  "/ministerio-turismo-uruguay.png",
  "/support-rocha.png",
  "/support-rocha-deportes.png",
  "/support-la-paloma.png",
  "/audencia-apart-hotel.svg",
];
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
const editorialGalleryImages = [
  "/home-hero-peloton.jpeg",
  "/event-threerace-uruguay.jpeg",
  "/event-threerace-brasil.jpeg",
];

const officialInfo = {
  event: `THREERACE BIKE ULTRAMARATHON URUGUAY – LA PALOMA / ROCHA 2026

FECHA: 30 y 31 de octubre + 01 de noviembre de 2026
LUGAR: La Paloma / Rocha – Uruguay
BASE OFICIAL: La Paloma – Rocha – Uruguay
RECORRIDO: 3 días y más de 140 km de mountain bike por etapas

En 2026, Threerace Sports da un paso histórico en su trayectoria internacional con la realización de la Threerace Bike Ultramarathon Uruguay, teniendo como base oficial la ciudad de La Paloma, en el departamento de Rocha, uno de los destinos más emblemáticos del litoral uruguayo.

Esta edición marca también la consolidación de una importante alianza estratégica entre Threerace Sports y Azimut Extremo, empresa uruguaya que pasa a integrar oficialmente la organización y realización del evento en territorio uruguayo, habiendo adquirido el 50% de la operación de la Threerace Bike Ultramarathon Uruguay. Esta unión fortalece la presencia local de la prueba, amplía su capacidad operativa y conecta la experiencia internacional de Threerace con el conocimiento territorial, logístico y deportivo de Azimut Extremo en Uruguay.

Entre el mar, los caminos rurales, los paisajes naturales y la identidad única de la región, esta nueva edición nace con la propuesta de unir competición, turismo, aventura y experiencia internacional en un formato de MTB Stage Race de tres días.

La elección de La Paloma / Rocha representa la expansión de Threerace hacia un territorio con fuerte conexión con el ciclismo, la naturaleza y el turismo deportivo. La arena oficial frente al mar será el punto de encuentro de atletas, equipos, familias y público, creando una atmósfera única para vivir el mountain bike en su esencia.

Desde su primera edición, la Threerace Bike Ultramarathon ha atraído atletas de diversos países, con destaque para Uruguay, Argentina, Chile, Paraguay y Brasil, consolidándose como una de las pruebas de mountain bike por etapas más respetadas del sur del continente. Ahora, esta historia gana un nuevo capítulo en suelo uruguayo, con una operación binacional estructurada para fortalecer la marca, ampliar su alcance internacional y ofrecer una experiencia aún más sólida a los atletas.

Serán tres días de desafío, con etapas planificadas para valorar diferentes características del atleta: explosión, resistencia, estrategia, técnica y capacidad de superación. La programación prevé una primera etapa corta e intensa en La Paloma, una etapa reina con mayor distancia y altimetría en la región de Rocha, y una etapa final nuevamente con base en La Paloma, cerrando la experiencia en gran estilo junto al litoral.

La prueba mantiene el compromiso de Threerace con la calidad técnica, la seguridad, la organización y el respeto por el deporte. El evento será estructurado para ofrecer a los atletas una experiencia completa, con arena oficial, puntos de hidratación y alimentación, soporte médico, estructura de llegada, servicios para los competidores, premiaciones y toda la atmósfera que consagró a Threerace como una marca referente en el MTB endurance.

Más que una competición, la Threerace Bike Ultramarathon Uruguay será una jornada de superación, convivencia y conexión entre atletas de diferentes países, unidos por la pasión por el mountain bike, la aventura y el desafío de cruzar nuevos territorios.

En 2026, La Paloma y Rocha entran definitivamente en el mapa de las grandes experiencias de MTB Stage Race de América del Sur. Prepárate para vivir la nueva leyenda del mountain bike sudamericano.

Organización y realización: Threerace Sports & Azimut Extremo`,
  registration: `INSCRIPCIONES

LOTE 01 – USD 200 + tasas del sistema (10%)
Del 20/05/2026 al 05/06/2026 o hasta completar 100 inscripciones.

LOTE 02 – USD 220 + tasas del sistema (10%)
Del 06/06/2026 al 05/08/2026.

LOTE 03 – USD 240 + tasas del sistema (10%)
Del 06/08/2026 al 20/10/2026.

Los atletas que participaron en la Threerace Bike Ultramarathon de São Francisco de Paula tienen un cupón de 10% de descuento, que debe ser solicitado por correo electrónico: inscricoes@threerace.com.br.

Equipos con más de 10 integrantes deberán consultar condiciones especiales por correo electrónico: inscricoes@threerace.com.br.

El valor y la fecha de la inscripción serán considerados a partir de la fecha de confirmación del pago, que puede variar hasta 5 días después del pago, y no desde la fecha de registro. El comprobante de pago es un documento único y, en caso de duda, deberá ser presentado en la Secretaría de Carrera para el retiro del kit del atleta.

INCLUIDO EN LA INSCRIPCIÓN
• Camiseta casual alusiva al evento;
• Medias Threerace;
• Medalla de FINISHER, en caso de completar el 75% del evento;
• Placa personalizada;
• Seguro del atleta;
• Puntos de hidratación durante el recorrido de la prueba;
• Servicios médicos durante el recorrido y atención básica gratuita en la arena;
• Servicio mecánico básico: regulación e identificación de problemas;
• Bike wash.

NO INCLUIDO EN LA INSCRIPCIÓN
• Jersey de ciclismo Threerace;
• Servicio de recuperación muscular;
• Servicio mecánico completo;
• Hospedaje o alimentación no descritos;
• Cualquier traslado o transfer;
• Servicio de fotografía.`,
  categories: `INDIVIDUAL MASCULINO
• Elite 19+
• Open 18–29
• Master A1 30–34
• Master A2 35–39
• Master B1 40–44
• Master B2 45–49
• Master C1 50–54
• Master C2 55–59
• Master D 60–64
• Master E 65+
• PCD

INDIVIDUAL FEMENINO
• Elite Femenina – 19 años y más
• Open Femenina – 18 a 29 años
• Master A Femenina – 30 a 39 años
• Master B Femenina – 40 a 49 años
• Master C Femenina – 50 años y más

DUPLAS MASCULINAS
• Dupla Masculina -79
• Dupla Masculina 80–99
• Dupla Masculina +100

DUPLAS MIXTAS
• Dupla Mixta Libre

DUPLAS FEMENINAS
• Dupla Femenina Libre

En las categorías de duplas, la categoría es determinada por la suma de las edades de los dos atletas. En caso de que una categoría no posea un mínimo de tres atletas, será incorporada a la categoría anterior, conforme al reglamento.`,
  stages: `STAGE 01 – XCC
Fecha: 30/10/2026
Lugar de largada: Arena del evento / La Paloma

La primera etapa será disputada en formato XCC, con un recorrido aproximado de 2 km por vuelta. Los atletas deberán completar 3 vueltas ininterrumpidas al circuito, de acuerdo con la programación oficial. Las largadas serán organizadas por categoría, con un máximo de 15 atletas por salida, respetando el orden, horarios y criterios técnicos definidos por la organización.

STAGE 02 – ETAPA REINA XCM
Fecha: 31/10/2026
Lugar de largada: Ciudad de Rocha
Distancia: aproximadamente 82 km
Desnivel positivo: cerca de 1.600 m

La segunda etapa será la Etapa Reina de la competencia, disputada en formato XCM. Tendrá características de resistencia, navegación por caminos rurales, sectores técnicos, subidas exigentes y trechos de alta demanda física, representando el mayor desafío de la competencia.

STAGE 03 – ETAPA FINAL XCM
Fecha: 01/11/2026
Lugar de largada: Arena del evento / La Paloma
Distancia: aproximadamente 45 km
Desnivel positivo: cerca de 600 m

La tercera y última etapa será decisiva para la clasificación general de la Threerace Bike Ultramarathon Uruguay.

INFORMACIÓN GENERAL SOBRE LOS RECORRIDOS
Todos los recorridos se encuentran en proceso final de definición técnica, revisión logística y validación. Las distancias, altimetrías, lugares de paso, puntos de hidratación, horarios de largada, tiempos de corte y recorridos oficiales podrán sufrir ajustes por razones técnicas, climáticas, de seguridad, ambientales o por determinación de las autoridades competentes.

Los recorridos oficiales serán divulgados el día 30 de agosto de 2026 en las páginas web oficiales del evento, por Threerace Sports y Azimut Extremo.`,
  schedule: `JUEVES – 29/10/2026
16:00 – Apertura de la Arena Threerace Uruguay
16:00 a 21:00 – Entrega de kits

VIERNES – 30/10/2026 | STAGE 01 – XCC
09:00 – Apertura de la Arena Threerace Uruguay
09:00 a 11:00 – Entrega de kits
11:00 a 18:00 – Funcionamiento de la mecánica
12:00 a 18:00 – Funcionamiento del Bike Wash
12:00 – Primera largada XCC
19:00 – Publicación de resultados oficiales
19:00 – Premiación según reglamento – Stage 01
19:30 – Briefing online Stage 02 / Etapa Reina
19:30 – Cierre de la arena

SÁBADO – 31/10/2026 | STAGE 02 – ETAPA REINA
07:00 – Apertura de la Arena Threerace Uruguay en Rocha
07:00 a 18:00 – Funcionamiento de la mecánica
07:45 – Apertura de los portones para alineación
08:00 – Largada Stage 02 / Etapa Reina
10:00 a 18:00 – Funcionamiento del Bike Wash
18:00 – Publicación de resultados oficiales
18:00 – Premiación según reglamento – Stage 02
18:00 – Briefing online Stage 03 / Etapa Final
18:30 – Cierre de la arena

DOMINGO – 01/11/2026 | STAGE 03 – ETAPA FINAL
07:00 – Apertura de la Arena Threerace Uruguay
08:45 – Apertura de los portones para alineación
09:00 – Largada Stage 03 / Etapa Final
14:00 – Publicación de resultados oficiales
14:30 – Premiación Stage 03 / Final
14:30 – Premiación de las etapas y premiación General Ultra
15:00 – Cierre Threerace Bike Ultramarathon Uruguay 2026`,
  regulation: `REGLAMENTO THREERACE BIKE ULTRAMARATHON URUGUAY 2026

1. CICLISTAS
1.1 El atleta deberá presentar documento oficial de identificación con foto al retirar el kit o cuando sea solicitado.
1.2 La edad mínima de participación es de 19 años, cumplidos hasta el 31 de diciembre del año del evento.

2. CERTIFICADOS Y TÉRMINOS
2.1 La inscripción solo será confirmada después de recibido el certificado médico firmado y sellado. El documento original deberá ser entregado al retirar el kit; sin él, la inscripción será cancelada sin costo u obligación para el organizador.
2.2 Los ciclistas deben firmar y entregar el Término de Responsabilidad y de uso de imagen.
2.3 La organización podrá impedir la continuidad de un atleta por recomendación médica.
2.4 La prueba es una competencia de MTB de larga distancia organizada por Threerace Sports y Azimut Extremo.
2.5 El evento se realizará en Rocha, Uruguay, los días 30 y 31 de octubre y 01 de noviembre de 2026.
2.6 El evento es deportivo, competitivo y de resistencia, integrando atletas amateurs y profesionales.
2.7 La lectura y el cumplimiento de este reglamento son obligatorios.

3. BICICLETAS
3.1 Solo se permitirán bicicletas MTB en buenas condiciones y listas para competir.
3.2 La placa frontal deberá estar firmemente colocada y visible.
3.3 La placa no puede ser alterada.
3.4 La bicicleta debe estar en perfectas condiciones de seguridad.
3.5 Solo se permite propulsión por pedales, sin asistencia eléctrica o de otro tipo.
3.6 Cada piloto es responsable por el mantenimiento de su bicicleta y solo podrá recibir auxilio en puntos oficiales.
3.7 Reparaciones no generan prórroga del tiempo máximo.
3.8 No se permite cambiar el cuadro de la bicicleta durante los tres días.

4. CASCOS Y VESTIMENTA
4.1 El casco es obligatorio durante toda la conducción.
4.2 Los cascos deben cumplir las normas ANSI.
4.3 Es obligatorio usar vestimenta adecuada; no se permiten camisetas sin mangas tipo cavada.
4.4 Los dos integrantes de una dupla deben usar jerseys con características principales iguales.

5. DUPLAS PARTICIPANTES
5.1 Los integrantes deben permanecer juntos, con separación máxima de 2 minutos.
5.2 y 5.3 La separación podrá ser medida en cualquier punto y generar penalizaciones.
5.4 Se permite asistencia física entre compañeros: compartir agua, alimentación, piezas, mantenimiento, empujar o remolcar por contacto físico.
5.5 No se permite remolque mediante dispositivos mecánicos.
5.6 El atleta puede regresar por la ruta para reunirse con su compañero o alcanzar soporte técnico, sin poner otros atletas en riesgo.
5.7 Ninguna dupla puede recibir ayuda física de otro ciclista.
5.8 El tiempo considerado será el del segundo atleta en cruzar la llegada.

6. IDENTIFICACIÓN DEL CICLISTA
6.1 a 6.4 Los números deben permanecer visibles, fijados al frente, sin cortes, adhesivos o alteraciones y sin ocultar patrocinadores oficiales.

7. CATEGORÍAS
Las categorías oficiales son las publicadas en la pestaña Categorías. En duplas, la suma de las edades determina la categoría. Categorías con menos de tres atletas podrán ser incorporadas a la categoría anterior.

8. ETAPAS Y RECORRIDOS
8.1 Stage 1 – XCC: circuito aproximado de 2 a 2,5 km por vuelta.
8.2 Stage 2 – Ultramaratón: 82 km y 1.600 m de elevación acumulada.
8.3 Stage 3 – Ultramaratón: 45 km y 600 m de elevación acumulada.
8.4 La organización podrá modificar recorridos, distancias o altimetrías por clima, seguridad o logística.
8.5 Solo serán FINISHER los atletas que completen al menos 75% de las etapas dentro del tiempo límite.

9. REGLAMENTO XCC – STAGE 1
9.1 Circuito cerrado, aproximadamente 2 km por vuelta.
9.2 Máximo de 15 atletas por batería.
9.3 Las baterías serán formadas por atletas de la misma categoría.
9.4 Cada atleta deberá completar 3 vueltas.
9.5 Distancia total aproximada de 6 km, sujeta a ajustes técnicos.
9.6 y 9.7 El orden, composición e intervalos serán definidos y divulgados por la organización.
9.8 La participación en el Stage 1 es obligatoria, salvo excepción aprobada.
9.9 El tiempo será registrado desde la largada hasta el final de la tercera vuelta.
9.10 En duplas, vale el tiempo del integrante más lento.
9.11 El resultado podrá definir el orden de largada de las etapas siguientes.
9.12 El tiempo integrará la clasificación general acumulada.

10. INICIO DE LAS ETAPAS
10.1 El portón de alineamiento abre 20 minutos antes.
10.2 Las zonas de largada serán asignadas conforme a la clasificación general.
10.3 Las zonas cierran 5 minutos antes; atletas atrasados largarán al final.
10.4 Las duplas deben ingresar juntas y permanecer en la zona.

11. RECORRIDOS Y ETAPAS
11.1 a 11.7 Los atletas deben completar todo el recorrido oficial, seguir las instrucciones, retornar al punto exato si salieran de la ruta, no tomar atajos, no invadir propiedades cerradas y no divulgar coordenadas GPS durante la prueba.

12. EQUIPAMIENTO PROHIBIDO
12.1 La organización podrá prohibir equipos no esenciales a su criterio.

13. TIEMPO DE CARRERA
13.1 a 13.8 El tiempo de la dupla será el del segundo integrante. Cada atleta tendrá un único chip. El conteo empieza en el horario oficial; largadas tardías requieren autorización y no alteran el tiempo máximo. Quien no largue será DNS.

14. TIEMPO MÁXIMO
14.1 Los tiempos máximos serán definidos según distancia y terreno y comunicados en el briefing.
14.2 El límite será el mayor entre el tiempo anunciado y dos veces el tiempo del vencedor.
14.3 Se permite cruzar la llegada a pie llevando la bicicleta.
14.4 e 14.5 Podrán existir puntos de corte intermediarios e adicionais por seguridad.
14.6 Atletas que no puedan continuar serán transportados con sus bicicletas cuando sea posible.

15. PLACA DSQ
15.1 e 15.2 Quien no complete una etapa dentro del límite será DSQ, recibirá identificación diferenciada e poderá continuar, sin clasificación oficial en aquella etapa.

16. CANCELACIÓN DE ETAPA
16.1 a 16.4 La organización podrá cancelar una etapa por seguridad. La validez de resultados dependerá de cuántos atletas hayan finalizado; quienes abandonen antes de la cancelación serán DNF.

17. PREMIACIONES
17.1 Por etapa: medallas para las 3 duplas masculinas más rápidas, la dupla mixta, la dupla femenina, los 3 hombres solo y las 3 mujeres solo más rápidas.
17.2 General: trofeos del 1º al 5º de todas las categorías y medalla de participación para quienes concluyan.
17.3 Para subir al podio es obligatorio usar uniforme de ciclismo, mínimo jersey.

18. REGLAS DE TRÁNSITO
18.1 a 18.3 Las vías podrán permanecer abiertas. Las reglas de tránsito y las instrucciones de los staffs deben ser respetadas.

19. CHECK POINTS
19.1 a 19.3 Habrá puestos de control, inclusive ocultos. La falta de registro de paso podrá causar descalificación.

20. REGISTRO Y BRIEFING
20.1 a 20.4 El registro se realizará en lugar y horario divulgados. Atletas deben presentar identificación; no habrá cambio de categoría después del cierre. Habrá reunión informativa previa.

21. NUTRICIÓN E HIDRATACIÓN
21.1 El atleta es responsable por llevar agua y nutrición suficientes.
21.2 La organización proveerá agua en puntos oficiales exclusivamente para hidratación.

22. APOYO EXTERNO
22.1 No se permite asistencia externa.
22.2 Se permite drafting entre competidores.
22.3 No se permite drafting detrás de vehículos.
22.4 Vehículos no autorizados no pueden acompañar el recorrido.
22.5 No se permite acceso a áreas restringidas.
22.6 No se permite auxilio mecánico de terceros, empujar o remolcar, bajo pena de descalificación.

23. ASISTENCIA MÉDICA Y TÉCNICA
23.1 Habrá asistencia médica en puntos oficiales.
23.2 La asistencia técnica podrá ser ofrecida en zonas neutras; piezas podrán ser cobradas.

24. DESISTENCIAS
24.1 El atleta o dupla debe comunicar inmediatamente su desistência.
24.2 Operaciones de búsqueda causadas por falta de comunicación podrán ser cobradas al atleta.

25. MEDIO AMBIENTE Y ÉTICA
25.1 a 25.4 Es obligatorio respetar el medio ambiente. Está prohibido arrojar basura, atravesar áreas preservadas o fumar en la ruta.

26. RECLAMOS
26.1 a 26.5 Reclamos deben ser escritos, presentados hasta 30 minutos después de la llegada o de los resultados preliminares y acompañados de depósito de R$ 200,00, reembolsable si proceden.

27. DOPING
27.1 La organización podrá realizar controles antidoping y de sustancias ilegales.

28. PENALIDADES
28.1 y 28.2 Violaciones estarán sujetas a penalidades definidas por el comisario. Penalidades de tiempo serán añadidas al resultado de la etapa.

29. DISCRECIÓN DEL COMISARIO
29.1 La decisión del comisario es final en casos no previstos.
29.2 La prueba seguirá este reglamento y los reglamentos CBC y UCI.
29.3 El reglamento podrá ser alterado por el Director de Prueba o comisario cuando sea necesario.

30. QUINCE MINUTOS ANTES DE LA PRUEBA
30.1 Las zonas de largada serán asignadas conforme a la clasificación general.
30.2 Gestores y apoyadores no podrán permanecer en la zona después de la llamada de los equipos.

31. INSCRIPCIÓN, TRANSFERENCIA Y REEMBOLSO
31.1 La inscripción vale exclusivamente para esta edición y no puede ser transferida a otro año.
31.2 Transferencia por lesión comprobada será permitida hasta 60 días antes.
31.3 Transferencia a otro atleta tendrá multa de 20% sobre el lote vigente.
31.4 El consumidor podrá desistir dentro de 7 días del pago.
31.5 Cancelación por lesión comprobada podrá recibir reembolso de 50% si solicitada hasta 30 días después de confirmada la inscripción.
31.6 La tasa de conveniencia no es reembolsable.
31.7 Si un integrante de dupla cancela, el atleta remanente debe encontrar sustituto dentro de los plazos.
31.8 Después de 10/10/2026 no serán aceptados cambios de categoría o equipo.

Versión 01/2026. El reglamento oficial publicado y disponible en la Secretaría de Carrera es el documento final.`,
  lodging: `ALOJAMIENTO EN LA PALOMA

La Paloma ofrece hoteles, posadas, hostels, apartamentos y casas para diferentes perfiles de atletas y acompañantes. Recomendamos realizar la reserva con anticipación debido al movimiento del evento.

La lista actualizada de opciones de alojamiento está disponible en el portal oficial de turismo de Rocha.`,
} as const;

const officialInfoPt = {
  event: `THREERACE BIKE ULTRAMARATHON URUGUAY – LA PALOMA / ROCHA 2026

DATA: 30 e 31 de outubro + 01 de novembro de 2026
LOCAL: La Paloma / Rocha – Uruguai
BASE OFICIAL: La Paloma – Rocha – Uruguai
PERCURSO: 3 dias e mais de 140 km de mountain bike por etapas

Em 2026, a Threerace Sports dá um passo histórico em sua trajetória internacional com a realização da Threerace Bike Ultramarathon Uruguay, tendo como base oficial a cidade de La Paloma, no departamento de Rocha, um dos destinos mais emblemáticos do litoral uruguaio.

Esta edição marca também a consolidação de uma importante aliança estratégica entre a Threerace Sports e a Azimut Extremo, empresa uruguaia que passa a integrar oficialmente a organização e a realização do evento em território uruguaio, após adquirir 50% da operação da Threerace Bike Ultramarathon Uruguay. Essa união fortalece a presença local da prova, amplia sua capacidade operacional e conecta a experiência internacional da Threerace ao conhecimento territorial, logístico e esportivo da Azimut Extremo no Uruguai.

Entre o mar, as estradas rurais, as paisagens naturais e a identidade única da região, esta nova edição nasce com a proposta de unir competição, turismo, aventura e experiência internacional em um formato de MTB Stage Race de três dias.

A escolha de La Paloma / Rocha representa a expansão da Threerace para um território com forte conexão com o ciclismo, a natureza e o turismo esportivo. A arena oficial diante do mar será o ponto de encontro de atletas, equipes, famílias e público, criando uma atmosfera única para viver o mountain bike em sua essência.

Desde sua primeira edição, a Threerace Bike Ultramarathon atrai atletas de diversos países, com destaque para Uruguai, Argentina, Chile, Paraguai e Brasil, consolidando-se como uma das provas de mountain bike por etapas mais respeitadas do sul do continente. Agora, essa história ganha um novo capítulo em solo uruguaio, com uma operação binacional estruturada para fortalecer a marca, ampliar seu alcance internacional e oferecer uma experiência ainda mais sólida aos atletas.

Serão três dias de desafio, com etapas planejadas para valorizar diferentes características do atleta: explosão, resistência, estratégia, técnica e capacidade de superação. A programação prevê uma primeira etapa curta e intensa em La Paloma, uma etapa rainha com maior distância e altimetria na região de Rocha e uma etapa final novamente com base em La Paloma, encerrando a experiência em grande estilo junto ao litoral.

A prova mantém o compromisso da Threerace com a qualidade técnica, a segurança, a organização e o respeito pelo esporte. O evento será estruturado para oferecer aos atletas uma experiência completa, com arena oficial, pontos de hidratação e alimentação, suporte médico, estrutura de chegada, serviços aos competidores, premiações e toda a atmosfera que consagrou a Threerace como uma marca de referência no MTB endurance.

Mais do que uma competição, a Threerace Bike Ultramarathon Uruguay será uma jornada de superação, convivência e conexão entre atletas de diferentes países, unidos pela paixão pelo mountain bike, pela aventura e pelo desafio de cruzar novos territórios.

Em 2026, La Paloma e Rocha entram definitivamente no mapa das grandes experiências de MTB Stage Race da América do Sul. Prepare-se para viver a nova lenda do mountain bike sul-americano.

Organização e realização: Threerace Sports & Azimut Extremo`,
  registration: `INSCRIÇÕES

LOTE 01 – USD 200 + taxas do sistema (10%)
De 20/05/2026 a 05/06/2026 ou até completar 100 inscrições.

LOTE 02 – USD 220 + taxas do sistema (10%)
De 06/06/2026 a 05/08/2026.

LOTE 03 – USD 240 + taxas do sistema (10%)
De 06/08/2026 a 20/10/2026.

Os atletas que participaram da Threerace Bike Ultramarathon de São Francisco de Paula possuem um cupom de 10% de desconto, que deve ser solicitado pelo e-mail inscricoes@threerace.com.br.

Equipes com mais de 10 integrantes deverão consultar condições especiais pelo e-mail inscricoes@threerace.com.br.

O valor e a data da inscrição serão considerados a partir da confirmação do pagamento, que pode ocorrer até 5 dias depois do pagamento, e não da data do cadastro. O comprovante de pagamento é um documento único e, em caso de dúvida, deverá ser apresentado na Secretaria de Prova para a retirada do kit do atleta.

INCLUSO NA INSCRIÇÃO
• Camiseta casual alusiva ao evento;
• Meias Threerace;
• Medalha FINISHER, caso complete 75% do evento;
• Placa personalizada;
• Seguro do atleta;
• Pontos de hidratação durante o percurso;
• Serviços médicos no percurso e atendimento básico gratuito na arena;
• Serviço mecânico básico: regulagem e identificação de problemas;
• Bike wash.

NÃO INCLUSO NA INSCRIÇÃO
• Jersey de ciclismo Threerace;
• Serviço de recuperação muscular;
• Serviço mecânico completo;
• Hospedagem ou alimentação não descritas;
• Qualquer deslocamento ou transfer;
• Serviço de fotografia.`,
  categories: `INDIVIDUAL MASCULINO
• Elite 19+
• Open 18–29
• Master A1 30–34
• Master A2 35–39
• Master B1 40–44
• Master B2 45–49
• Master C1 50–54
• Master C2 55–59
• Master D 60–64
• Master E 65+
• PCD

INDIVIDUAL FEMININO
• Elite Feminina – 19 anos ou mais
• Open Feminina – 18 a 29 anos
• Master A Feminina – 30 a 39 anos
• Master B Feminina – 40 a 49 anos
• Master C Feminina – 50 anos ou mais

DUPLAS MASCULINAS
• Dupla Masculina -79
• Dupla Masculina 80–99
• Dupla Masculina +100

DUPLAS MISTAS
• Dupla Mista Livre

DUPLAS FEMININAS
• Dupla Feminina Livre

Nas categorias de duplas, a categoria é determinada pela soma das idades dos dois atletas. Caso uma categoria não tenha o mínimo de três atletas, será incorporada à categoria anterior, conforme o regulamento.`,
  stages: `STAGE 01 – XCC
Data: 30/10/2026
Local da largada: Arena do evento / La Paloma

A primeira etapa será disputada no formato XCC, em um percurso aproximado de 2 km por volta. Os atletas deverão completar 3 voltas ininterruptas no circuito, conforme a programação oficial. As largadas serão organizadas por categoria, com no máximo 15 atletas por bateria, respeitando a ordem, os horários e os critérios técnicos definidos pela organização.

STAGE 02 – ETAPA RAINHA XCM
Data: 31/10/2026
Local da largada: Cidade de Rocha
Distância: aproximadamente 82 km
Desnível positivo: cerca de 1.600 m

A segunda etapa será a Etapa Rainha da competição, disputada no formato XCM. Terá características de resistência, navegação por estradas rurais, setores técnicos, subidas exigentes e trechos de alta demanda física, representando o maior desafio da competição.

STAGE 03 – ETAPA FINAL XCM
Data: 01/11/2026
Local da largada: Arena do evento / La Paloma
Distância: aproximadamente 45 km
Desnível positivo: cerca de 600 m

A terceira e última etapa será decisiva para a classificação geral da Threerace Bike Ultramarathon Uruguay.

INFORMAÇÕES GERAIS SOBRE OS PERCURSOS
Todos os percursos estão em processo final de definição técnica, revisão logística e validação. Distâncias, altimetrias, locais de passagem, pontos de hidratação, horários de largada, tempos de corte e trajetos oficiais poderão sofrer ajustes por razões técnicas, climáticas, de segurança, ambientais ou por determinação das autoridades competentes.

Os percursos oficiais serão divulgados em 30 de agosto de 2026 nos canais oficiais do evento, pela Threerace Sports e pela Azimut Extremo.`,
  schedule: `QUINTA-FEIRA – 29/10/2026
16:00 – Abertura da Arena Threerace Uruguay
16:00 às 21:00 – Entrega de kits

SEXTA-FEIRA – 30/10/2026 | STAGE 01 – XCC
09:00 – Abertura da Arena Threerace Uruguay
09:00 às 11:00 – Entrega de kits
11:00 às 18:00 – Funcionamento da mecânica
12:00 às 18:00 – Funcionamento do Bike Wash
12:00 – Primeira largada XCC
19:00 – Publicação dos resultados oficiais
19:00 – Premiação conforme regulamento – Stage 01
19:30 – Briefing online Stage 02 / Etapa Rainha
19:30 – Fechamento da arena

SÁBADO – 31/10/2026 | STAGE 02 – ETAPA RAINHA
07:00 – Abertura da Arena Threerace Uruguay em Rocha
07:00 às 18:00 – Funcionamento da mecânica
07:45 – Abertura dos portões para alinhamento
08:00 – Largada Stage 02 / Etapa Rainha
10:00 às 18:00 – Funcionamento do Bike Wash
18:00 – Publicação dos resultados oficiais
18:00 – Premiação conforme regulamento – Stage 02
18:00 – Briefing online Stage 03 / Etapa Final
18:30 – Fechamento da arena

DOMINGO – 01/11/2026 | STAGE 03 – ETAPA FINAL
07:00 – Abertura da Arena Threerace Uruguay
08:45 – Abertura dos portões para alinhamento
09:00 – Largada Stage 03 / Etapa Final
14:00 – Publicação dos resultados oficiais
14:30 – Premiação Stage 03 / Final
14:30 – Premiação das etapas e premiação Geral Ultra
15:00 – Encerramento Threerace Bike Ultramarathon Uruguay 2026`,
  regulation: `REGULAMENTO THREERACE BIKE ULTRAMARATHON URUGUAY 2026

1. CICLISTAS
O atleta deverá apresentar documento oficial com foto. A idade mínima é de 19 anos, completos até 31 de dezembro do ano do evento.

2. CERTIFICADOS E TERMOS
A inscrição somente será confirmada após o recebimento do atestado médico assinado e carimbado. O original deverá ser entregue na retirada do kit. Os atletas deverão assinar o Termo de Responsabilidade e de uso de imagem. A organização poderá interromper a participação por recomendação médica. A prova é uma competição de MTB de longa distância organizada pela Threerace Sports e Azimut Extremo em Rocha, Uruguai, de 30 de outubro a 1º de novembro de 2026.

3. BICICLETAS
Somente bicicletas MTB em boas condições serão permitidas. A placa frontal deverá permanecer visível e sem alterações. A bicicleta deve ser movida exclusivamente por pedais, sem assistência elétrica. Cada atleta é responsável pela manutenção e somente poderá receber ajuda nos pontos oficiais. Não é permitido trocar o quadro durante os três dias.

4. CAPACETES E VESTUÁRIO
O capacete é obrigatório durante toda a condução e deve atender às normas ANSI. É obrigatório o uso de vestuário adequado. Integrantes de uma dupla devem usar jerseys com as mesmas características principais.

5. DUPLAS PARTICIPANTES
Os integrantes devem permanecer juntos, com separação máxima de 2 minutos. É permitida assistência física entre companheiros, mas não o reboque por dispositivos mecânicos nem ajuda física de outros ciclistas. O tempo considerado será o do segundo atleta a cruzar a chegada.

6. IDENTIFICAÇÃO DO CICLISTA
Os números devem permanecer visíveis e fixados na frente, sem cortes, adesivos, alterações ou ocultação de patrocinadores oficiais.

7. CATEGORIAS
As categorias oficiais são as publicadas na aba Categorias. Nas duplas, a soma das idades determina a categoria. Categorias com menos de três atletas poderão ser incorporadas à anterior.

8. ETAPAS E PERCURSOS
Stage 1: circuito XCC aproximado de 2 a 2,5 km por volta. Stage 2: 82 km e 1.600 m de elevação. Stage 3: 45 km e 600 m de elevação. A organização poderá modificar percursos por clima, segurança ou logística. Somente será FINISHER quem completar pelo menos 75% das etapas dentro do limite.

9. REGULAMENTO XCC – STAGE 1
Circuito fechado, máximo de 15 atletas por bateria e 3 voltas por atleta. A participação é obrigatória, salvo exceção autorizada. O tempo integra a classificação geral e, nas duplas, vale o tempo do integrante mais lento.

10. INÍCIO DAS ETAPAS
O portão de alinhamento abre 20 minutos antes. As zonas serão definidas pela classificação geral e fecham 5 minutos antes. Atletas atrasados largarão ao final; duplas devem entrar juntas.

11. PERCURSOS E ETAPAS
Os atletas devem completar todo o percurso oficial, seguir as instruções, retornar ao ponto exato se saírem da rota, não cortar caminho, não invadir propriedades fechadas e não divulgar coordenadas GPS durante a prova.

12. EQUIPAMENTO PROIBIDO
A organização poderá proibir equipamentos não essenciais a seu critério.

13. TEMPO DE PROVA
O tempo da dupla será o do segundo integrante. Cada atleta terá um chip. A contagem começa no horário oficial; largadas tardias exigem autorização e não alteram o tempo máximo. Quem não largar será DNS.

14. TEMPO MÁXIMO
Os limites serão definidos conforme distância e terreno e informados no briefing. Poderão existir pontos de corte. É permitido cruzar a chegada a pé conduzindo a bicicleta. Atletas sem condições de continuar serão transportados com suas bicicletas quando possível.

15. PLACA DSQ
Quem não completar uma etapa no limite será DSQ, receberá identificação diferenciada e poderá continuar, sem classificação oficial naquela etapa.

16. CANCELAMENTO DE ETAPA
A organização poderá cancelar uma etapa por segurança. A validade do resultado dependerá da quantidade de atletas que já tiver concluído; abandonos anteriores à interrupção serão DNF.

17. PREMIAÇÕES
Haverá premiação por etapa e na classificação geral conforme as categorias do regulamento. Para subir ao pódio é obrigatório utilizar uniforme de ciclismo, no mínimo jersey.

18. REGRAS DE TRÂNSITO
As vias poderão permanecer abertas. As leis de trânsito e as orientações da equipe devem ser respeitadas.

19. CHECK POINTS
Haverá postos de controle, inclusive ocultos. A ausência do registro de passagem poderá causar desclassificação.

20. REGISTRO E BRIEFING
O registro ocorrerá no local e horário divulgados. O atleta deverá apresentar identificação. Não haverá mudança de categoria após o encerramento. Haverá reunião informativa prévia.

21. NUTRIÇÃO E HIDRATAÇÃO
O atleta é responsável por levar água e nutrição suficientes. A organização fornecerá água nos pontos oficiais exclusivamente para hidratação.

22. APOIO EXTERNO
Não é permitida assistência externa, acompanhamento por veículos, drafting atrás de veículos ou ajuda mecânica de terceiros. O drafting entre competidores é permitido.

23. ASSISTÊNCIA MÉDICA E TÉCNICA
Haverá assistência médica em pontos oficiais. A assistência técnica poderá ser oferecida em zonas neutras; peças poderão ser cobradas.

24. DESISTÊNCIAS
O atleta ou dupla deve comunicar imediatamente a desistência. Operações de busca causadas pela falta de comunicação poderão ser cobradas.

25. MEIO AMBIENTE E ÉTICA
É obrigatório respeitar o meio ambiente. É proibido jogar lixo, atravessar áreas preservadas ou fumar no percurso.

26. RECLAMAÇÕES
Reclamações devem ser feitas por escrito em até 30 minutos após a chegada ou a publicação dos resultados preliminares e acompanhadas de depósito de R$ 200,00, reembolsável se forem aceitas.

27. DOPING
A organização poderá realizar controles antidoping e de substâncias ilegais.

28. PENALIDADES
As violações estarão sujeitas às penalidades definidas pelo comissário. Penalidades de tempo serão acrescentadas ao resultado da etapa.

29. DECISÃO DO COMISSÁRIO
A decisão do comissário é final nos casos não previstos. A prova seguirá este regulamento e os regulamentos CBC e UCI. O regulamento poderá ser alterado quando necessário.

30. QUINZE MINUTOS ANTES DA PROVA
As zonas de largada serão definidas pela classificação geral. Gestores e apoiadores deverão deixar a zona após a chamada das equipes.

31. INSCRIÇÃO, TRANSFERÊNCIA E REEMBOLSO
A inscrição vale somente para esta edição. Transferência por lesão comprovada será permitida até 60 dias antes. Transferência para outro atleta terá multa de 20% sobre o lote vigente. O consumidor poderá desistir em até 7 dias do pagamento. Cancelamento por lesão comprovada poderá receber reembolso de 50% nas condições previstas. A taxa de conveniência não é reembolsável. Após 10/10/2026 não serão aceitas mudanças de categoria ou equipe.

Versão 01/2026. O regulamento oficial publicado e disponível na Secretaria de Prova é o documento final.`,
  lodging: `HOSPEDAGEM EM LA PALOMA

La Paloma oferece hotéis, pousadas, hostels, apartamentos e casas para diferentes perfis de atletas e acompanhantes. Recomendamos reservar com antecedência devido ao movimento do evento.

A lista atualizada de opções de hospedagem está disponível no portal oficial de turismo de Rocha.`,
} as const;

const officialInfoEn = {
  event: `THREERACE BIKE ULTRAMARATHON URUGUAY – LA PALOMA / ROCHA 2026

DATE: October 30 and 31 + November 1, 2026
LOCATION: La Paloma / Rocha – Uruguay
OFFICIAL BASE: La Paloma – Rocha – Uruguay
COURSE: 3 days and more than 140 km of stage mountain biking

In 2026, Threerace Sports takes a historic step in its international journey with Threerace Bike Ultramarathon Uruguay, officially based in La Paloma, Rocha, one of the most iconic destinations on the Uruguayan coast.

This edition also consolidates an important strategic alliance between Threerace Sports and Azimut Extremo. The Uruguayan company officially joins the organization and delivery of the event in Uruguay after acquiring 50% of the operation. This partnership strengthens the race locally, expands its operational capacity and connects Threerace's international experience with Azimut Extremo's territorial, logistical and sporting knowledge.

Between the ocean, rural roads, natural landscapes and the region's unique identity, the event brings competition, tourism, adventure and an international experience together in a three-day MTB Stage Race.

La Paloma / Rocha was chosen as a territory with a strong connection to cycling, nature and sports tourism. The official oceanfront arena will bring athletes, teams, families and spectators together in a unique mountain bike atmosphere.

Since its first edition, Threerace Bike Ultramarathon has attracted athletes from Uruguay, Argentina, Chile, Paraguay, Brazil and beyond, becoming one of the most respected stage mountain bike races in southern South America. This new chapter in Uruguay features a structured binational operation designed to strengthen the brand, expand its international reach and offer athletes an even more solid experience.

The three stages will test explosiveness, endurance, strategy, technique and resilience: a short and intense opener in La Paloma, a longer Queen Stage in Rocha and a final stage back in La Paloma by the coast.

The race maintains Threerace's commitment to technical quality, safety, organization and respect for the sport. The event includes an official arena, hydration and food stations, medical support, finish-line infrastructure, athlete services and awards.

More than a competition, Threerace Bike Ultramarathon Uruguay is a journey of resilience, community and connection between riders from different countries, united by mountain biking, adventure and new territories.

In 2026, La Paloma and Rocha enter the map of South America's great MTB Stage Race experiences. Get ready to live the new legend of South American mountain biking.

Organized and produced by: Threerace Sports & Azimut Extremo`,
  registration: `REGISTRATION

LOT 01 – USD 200 + system fees (10%)
From May 20 to June 5, 2026, or until 100 registrations are reached.

LOT 02 – USD 220 + system fees (10%)
From June 6 to August 5, 2026.

LOT 03 – USD 240 + system fees (10%)
From August 6 to October 20, 2026.

Athletes who participated in Threerace Bike Ultramarathon São Francisco de Paula are entitled to a 10% discount code, available by email at inscricoes@threerace.com.br.

Teams with more than 10 members should request special conditions at inscricoes@threerace.com.br.

The registration price and date are based on payment confirmation, which may occur up to 5 days after payment, not on the sign-up date. The payment receipt is unique proof and may be requested at Race Office during kit collection.

INCLUDED IN REGISTRATION
• Event casual T-shirt;
• Threerace socks;
• FINISHER medal upon completing 75% of the event;
• Personalized number plate;
• Athlete insurance;
• Hydration points along the course;
• Medical services on course and free basic care at the arena;
• Basic mechanical service: adjustment and problem identification;
• Bike wash.

NOT INCLUDED IN REGISTRATION
• Threerace cycling jersey;
• Muscle recovery service;
• Full mechanical service;
• Accommodation or meals not described;
• Transport or transfers;
• Photography service.`,
  categories: `MEN'S INDIVIDUAL
• Elite 19+
• Open 18–29
• Master A1 30–34
• Master A2 35–39
• Master B1 40–44
• Master B2 45–49
• Master C1 50–54
• Master C2 55–59
• Master D 60–64
• Master E 65+
• Para-cycling

WOMEN'S INDIVIDUAL
• Women's Elite – 19+
• Women's Open – 18 to 29
• Women's Master A – 30 to 39
• Women's Master B – 40 to 49
• Women's Master C – 50+

MEN'S PAIRS
• Men's Pair -79
• Men's Pair 80–99
• Men's Pair +100

MIXED PAIRS
• Mixed Pair Open

WOMEN'S PAIRS
• Women's Pair Open

For pair categories, the category is determined by the sum of both riders' ages. A category with fewer than three athletes may be merged into the preceding category, as defined in the rulebook.`,
  stages: `STAGE 01 – XCC
Date: October 30, 2026
Start: Event Arena / La Paloma

The first stage is an XCC race on an approximately 2 km lap. Athletes must complete 3 uninterrupted laps. Starts are organized by category, with a maximum of 15 riders per heat, following the official schedule and technical criteria.

STAGE 02 – XCM QUEEN STAGE
Date: October 31, 2026
Start: City of Rocha
Distance: approximately 82 km
Elevation gain: approximately 1,600 m

The second stage is the Queen Stage, an XCM endurance challenge across rural roads, technical sectors, demanding climbs and physically intense sections.

STAGE 03 – XCM FINAL STAGE
Date: November 1, 2026
Start: Event Arena / La Paloma
Distance: approximately 45 km
Elevation gain: approximately 600 m

The third and final stage will decide the overall classification of Threerace Bike Ultramarathon Uruguay.

GENERAL COURSE INFORMATION
All courses are undergoing final technical definition, logistical review and validation. Distances, elevation, passage points, hydration stations, start times, cut-off times and official routes may change for technical, weather, safety, environmental or authority-related reasons.

Official routes will be released on August 30, 2026 through the event's official channels by Threerace Sports and Azimut Extremo.`,
  schedule: `THURSDAY – OCTOBER 29, 2026
4:00 PM – Threerace Uruguay Arena opens
4:00 PM to 9:00 PM – Race kit collection

FRIDAY – OCTOBER 30, 2026 | STAGE 01 – XCC
9:00 AM – Arena opens
9:00 AM to 11:00 AM – Race kit collection
11:00 AM to 6:00 PM – Mechanical service
12:00 PM to 6:00 PM – Bike Wash
12:00 PM – First XCC start
7:00 PM – Official results
7:00 PM – Stage 01 awards according to the rulebook
7:30 PM – Online Stage 02 / Queen Stage briefing
7:30 PM – Arena closes

SATURDAY – OCTOBER 31, 2026 | STAGE 02 – QUEEN STAGE
7:00 AM – Threerace Uruguay Arena opens in Rocha
7:00 AM to 6:00 PM – Mechanical service
7:45 AM – Starting corrals open
8:00 AM – Stage 02 / Queen Stage start
10:00 AM to 6:00 PM – Bike Wash
6:00 PM – Official results and Stage 02 awards
6:00 PM – Online Stage 03 / Final Stage briefing
6:30 PM – Arena closes

SUNDAY – NOVEMBER 1, 2026 | STAGE 03 – FINAL STAGE
7:00 AM – Arena opens
8:45 AM – Starting corrals open
9:00 AM – Stage 03 / Final Stage start
2:00 PM – Official results
2:30 PM – Stage 03 / Final and Overall Ultra awards
3:00 PM – Threerace Bike Ultramarathon Uruguay 2026 closes`,
  regulation: `THREERACE BIKE ULTRAMARATHON URUGUAY 2026 RULEBOOK

1. RIDERS
Athletes must present official photo identification. Minimum age is 19, reached by December 31 of the event year.

2. CERTIFICATES AND WAIVERS
Registration is confirmed only after receipt of a signed and stamped medical certificate. The original must be delivered at kit collection. Riders must sign the Liability and Image Use Waiver. The organization may stop a rider on medical advice. The event is a long-distance MTB competition organized by Threerace Sports and Azimut Extremo in Rocha, Uruguay, from October 30 to November 1, 2026.

3. BICYCLES
Only race-ready MTB bicycles are allowed. The front plate must remain visible and unchanged. Bicycles must be pedal-powered, without electric assistance. Each rider is responsible for maintenance and may receive help only at official points. Frame changes are not allowed during the three days.

4. HELMETS AND CLOTHING
An ANSI-compliant helmet is mandatory while riding. Appropriate clothing is required. Pair partners must wear jerseys with the same main characteristics.

5. PAIRS
Partners must remain together, no more than 2 minutes apart. Physical assistance between partners is allowed, but mechanical towing and physical help from other riders are not. The pair's time is recorded when the second rider crosses the finish.

6. RIDER IDENTIFICATION
Numbers must remain visible and attached to the front, without cuts, stickers, alterations or covered official sponsors.

7. CATEGORIES
Official categories are listed under Categories. Pair categories are based on combined ages. Categories with fewer than three athletes may be merged into the preceding category.

8. STAGES AND COURSES
Stage 1: XCC circuit of approximately 2 to 2.5 km per lap. Stage 2: 82 km and 1,600 m elevation gain. Stage 3: 45 km and 600 m elevation gain. Routes may change for weather, safety or logistics. FINISHER status requires at least 75% of stages within the time limit.

9. XCC – STAGE 1
Closed circuit, maximum 15 riders per heat and 3 laps per athlete. Participation is mandatory unless expressly authorized. Time counts toward the overall result; for pairs, the slower rider's time applies.

10. STAGE STARTS
Starting corrals open 20 minutes before the start, are assigned by overall classification and close 5 minutes before. Late riders start at the back. Pair riders must enter together.

11. COURSES
Athletes must complete the full official course, follow instructions, return to the exact point if they leave the route, avoid shortcuts and closed property, and not publish GPS coordinates during the race.

12. PROHIBITED EQUIPMENT
The organization may prohibit non-essential equipment at its discretion.

13. RACE TIME
Pair time is recorded from the second partner. Each athlete has one chip. Timing starts at the official time; late starts require authorization and do not extend the limit. Failure to start is DNS.

14. MAXIMUM TIME
Limits are based on distance and terrain and announced at briefing. Intermediate cut-offs may apply. Riders may cross the finish on foot while carrying or pushing the bike. When possible, withdrawn riders and bicycles will be transported.

15. DSQ PLATE
A rider who misses a stage limit is DSQ, receives a different identification and may continue without an official result for that stage.

16. STAGE CANCELLATION
A stage may be cancelled for safety. Result validity depends on how many riders have finished; riders who withdrew before cancellation remain DNF.

17. AWARDS
Stage and overall awards follow the official categories and rulebook. Cycling clothing, at least a jersey, is mandatory on the podium.

18. TRAFFIC RULES
Roads may remain open. Traffic laws and staff instructions must be followed.

19. CHECK POINTS
Official and hidden checkpoints may be used. A missing passage record may result in disqualification.

20. REGISTRATION AND BRIEFING
Registration takes place at the announced location and time. Identification is required. Category changes are not allowed after closing. A pre-race briefing will be held.

21. NUTRITION AND HYDRATION
Athletes are responsible for carrying sufficient water and nutrition. The organization supplies water at official points for hydration only.

22. EXTERNAL SUPPORT
External assistance, accompanying vehicles, drafting behind vehicles and third-party mechanical aid are prohibited. Drafting between competitors is permitted.

23. MEDICAL AND TECHNICAL ASSISTANCE
Medical assistance is available at official points. Neutral technical support may be provided; parts may be charged.

24. WITHDRAWALS
The athlete or pair must immediately report withdrawal. Search operations caused by failure to report may be charged to the athlete.

25. ENVIRONMENT AND ETHICS
Athletes must respect the environment. Littering, crossing protected areas and smoking on course are prohibited.

26. PROTESTS
Protests must be submitted in writing within 30 minutes of finishing or preliminary results and accompanied by a BRL 200 deposit, refunded if upheld.

27. DOPING
The organization may conduct anti-doping and illegal-substance controls.

28. PENALTIES
Violations are subject to penalties decided by the commissaire. Time penalties are added to the stage result.

29. COMMISSAIRE'S DISCRETION
The commissaire's decision is final in unforeseen cases. The race follows this rulebook and CBC/UCI rules. Rules may be amended when necessary.

30. FIFTEEN MINUTES BEFORE THE RACE
Starting zones are assigned by overall classification. Managers and supporters must leave after team call-up.

31. REGISTRATION, TRANSFER AND REFUND
Registration applies only to this edition. Transfer due to documented injury is allowed up to 60 days before. Transfer to another athlete incurs a 20% fee based on the current lot. Consumers may cancel within 7 days of payment. Documented injury may qualify for a 50% refund under the stated conditions. Convenience fees are non-refundable. No category or team changes are accepted after October 10, 2026.

Version 01/2026. The official rulebook published and available at Race Office is the final document.`,
  lodging: `ACCOMMODATION IN LA PALOMA

La Paloma offers hotels, inns, hostels, apartments and houses for different athlete and companion profiles. We recommend booking early due to event demand.

The updated accommodation list is available through Rocha's official tourism portal.`,
} as const;

const officialInfoByLanguage = {
  es: officialInfo,
  pt: officialInfoPt,
  en: officialInfoEn,
} as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function ActionArrow({ direction }: { direction: "external" | "down" }) {
  return direction === "external"
    ? <svg aria-hidden="true" viewBox="0 0 32 32"><path d="M7 25 25 7M12 7h13v13" /></svg>
    : <svg aria-hidden="true" viewBox="0 0 32 32"><path d="M16 5v22M8 19l8 8 8-8" /></svg>;
}

function QuickIcon({ type }: { type: "registration" | "certificate" | "rulebook" }) {
  if (type === "registration") {
    return <svg viewBox="0 0 64 64" aria-hidden="true"><rect x="11" y="8" width="42" height="48" rx="5"/><circle cx="26" cy="25" r="7"/><path d="M16 45c2-7 7-10 10-10s8 3 10 10M40 20h7M40 29h7M40 38h7"/></svg>;
  }
  if (type === "certificate") {
    return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M19 12h26a5 5 0 0 1 5 5v35H14V17a5 5 0 0 1 5-5Z"/><path d="M25 12V8h14v4M32 25v16M24 33h16"/></svg>;
  }
  return <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M17 7h23l9 9v41H17Z"/><path d="M40 7v10h9M24 29h18M24 38h18M24 47h12"/></svg>;
}

type AccordionIconType = "event" | "registration" | "categories" | "stages" | "schedule" | "rulebook" | "lodging";

function AccordionIcon({ type }: { type: AccordionIconType }) {
  const paths: Record<AccordionIconType, ReactNode> = {
    event: <><circle cx="32" cy="32" r="19"/><path d="M20 38c5-1 8-4 11-10 4 6 7 9 13 10M25 22l3-7M39 22l-3-7"/></>,
    registration: <><rect x="14" y="10" width="36" height="44" rx="4"/><circle cx="27" cy="26" r="6"/><path d="M19 44c1-7 5-10 8-10s7 3 8 10M40 24h6M40 33h6M40 42h6"/></>,
    categories: <><path d="M12 20 32 10l20 10-20 10L12 20Zm0 12 20 10 20-10M12 43l20 10 20-10"/></>,
    stages: <><path d="M10 49h44M15 44l9-22 8 13 7-20 10 29"/><circle cx="24" cy="22" r="2"/><circle cx="39" cy="15" r="2"/></>,
    schedule: <><circle cx="32" cy="32" r="21"/><path d="M32 19v14l10 6M32 7v5M32 52v5M7 32h5M52 32h5"/></>,
    rulebook: <><path d="M16 8h24l9 9v39H16Z"/><path d="M40 8v10h9M23 29h19M23 38h19M23 47h12"/></>,
    lodging: <><path d="M10 49h44M14 49V22h36v27M20 22v-8h24v8M21 33h8v8h-8M35 33h8v8h-8"/></>,
  };
  return <span className="accordion-field-icon" aria-hidden="true"><svg viewBox="0 0 64 64">{paths[type]}</svg></span>;
}

function OfficialText({ text }: { text: string }) {
  return <div className="official-copy">{text.split("\n").map((line, index) => {
    const clean = line.trim();
    if (!clean) return <span className="copy-space" key={index} />;
    const heading = /^\d+\.\s/.test(clean) || (clean.length < 90 && clean === clean.toUpperCase() && !clean.startsWith("•"));
    return heading ? <h4 key={index}>{clean}</h4> : <p key={index}>{clean}</p>;
  })}</div>;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [guideMode, setGuideMode] = useState<"mtb" | "gravel">("mtb");
  const [openInfo, setOpenInfo] = useState<number | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryVisible, setGalleryVisible] = useState(3);
  const [now, setNow] = useState(() => Date.now());
  const t = copy[language];
  const info = officialInfoByLanguage[language];
  const countdown = useMemo(() => {
    const target = new Date("2026-10-30T07:00:00-03:00").getTime();
    const remaining = Math.max(0, target - now);
    return [
      Math.floor(remaining / 86400000),
      Math.floor((remaining / 3600000) % 24),
      Math.floor((remaining / 60000) % 60),
    ];
  }, [now]);
  const labels = {
    es: { register: "INSCRIPCIONES", registerNote: "PLATAFORMA WINDFIT", certificate: "CERTIFICADOS", certificateNote: "DOCUMENTACIÓN OBLIGATORIA", rulebook: "REGLAMENTO", rulebookNote: "REGLAMENTO 2026", stay: "ALOJAMIENTO", info: "INFORMACIÓN COMPLETA", program: "PROGRAMACIÓN", event: "EL EVENTO", stages: "ETAPAS", categories: "CATEGORÍAS", open: "Abrir", close: "Cerrar" },
    pt: { register: "INSCRIÇÕES", registerNote: "PLATAFORMA WINDFIT", certificate: "CERTIFICADOS", certificateNote: "DOCUMENTAÇÃO OBRIGATÓRIA", rulebook: "REGULAMENTO", rulebookNote: "REGULAMENTO 2026", stay: "HOSPEDAGEM", info: "INFORMAÇÕES COMPLETAS", program: "PROGRAMAÇÃO", event: "O EVENTO", stages: "ETAPAS", categories: "CATEGORIAS", open: "Abrir", close: "Fechar" },
    en: { register: "REGISTRATION", registerNote: "WINDFIT PLATFORM", certificate: "CERTIFICATES", certificateNote: "REQUIRED DOCUMENTATION", rulebook: "RULEBOOK", rulebookNote: "2026 RULEBOOK", stay: "ACCOMMODATION", info: "EVENT INFORMATION", program: "SCHEDULE", event: "THE EVENT", stages: "STAGES", categories: "CATEGORIES", open: "Open", close: "Close" },
  }[language];

  const navTargets = ["/", "#stages", registrationUrl, "#information"];

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const saved = getSavedLanguage("es");
    setLanguage(saved);
    saveLanguage(saved);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const updateGallery = () => {
      const visible = media.matches ? 1 : 3;
      setGalleryVisible(visible);
      setGalleryIndex((current) => Math.min(current, galleryImages.length - visible));
    };

    updateGallery();
    media.addEventListener("change", updateGallery);
    return () => media.removeEventListener("change", updateGallery);
  }, []);

  const galleryLastIndex = Math.max(0, galleryImages.length - galleryVisible);

  return (
    <main className="uruguay-event-page">
      <section className="hero uruguay-event-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-shade" />
        <header className="site-header">
          <a className="brand" href="#top" aria-label="Threerace Sports">
            <img className="header-tr3-logo" src={tr3HeaderLogo} alt="Threerace Sports" />
            <img className="header-azimut-logo" src={azimutHeaderLogo} alt="Azimut Extremo" />
          </a>

          <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
            {t.nav.map((item, index) => (
              <a key={item} href={navTargets[index]} onClick={closeMenu} target={index === 2 ? "_blank" : undefined} rel={index === 2 ? "noreferrer" : undefined}>
                {item}
              </a>
            ))}
            <a className="mobile-nav-cta" href={registrationUrl} target="_blank" rel="noreferrer">
              {t.register}
            </a>
          </nav>

          <div className="header-actions">
            <div className="language-switcher" aria-label="Language selector">
              {(["es", "pt", "en"] as Language[]).map((code) => (
                <button
                  key={code}
                  className={language === code ? "active" : ""}
                  type="button"
                  onClick={() => { setLanguage(code); saveLanguage(code); }}
                  aria-label={{ es: "Español", pt: "Português", en: "English" }[code]}
                  aria-pressed={language === code}
                >
                  {{ es: "🇪🇸", pt: "🇧🇷", en: "🇬🇧" }[code]}
                </button>
              ))}
            </div>
            <button
              className="menu-toggle"
              type="button"
              aria-label={menuOpen ? t.close : t.menu}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span />
              <span />
            </button>
          </div>
        </header>

        <div className="hero-content uruguay-title-block" id="top">
          <p className="location">{t.eyebrow}</p>
          <h1>
            THREERACE
            <small>BIKE ULTRAMARATHON URUGUAY</small>
          </h1>
        </div>

        <section className="original-action-cards section-frame" aria-label="Quick access">
        <a href={registrationUrl} target="_blank" rel="noreferrer">
          <QuickIcon type="registration"/><b>{labels.register}</b><small>{labels.registerNote}</small><i><ActionArrow direction="external" /></i>
        </a>
        <a
          href={language === "pt" ? certificatePtUrl : "#information"}
          target={language === "pt" ? "_blank" : undefined}
          rel={language === "pt" ? "noreferrer" : undefined}
        >
          <QuickIcon type="certificate"/><b>{labels.certificate}</b><small>{labels.certificateNote}</small><i><ActionArrow direction={language === "pt" ? "external" : "down"} /></i>
        </a>
        <a href={rulebookUrl} target="_blank" rel="noreferrer">
          <QuickIcon type="rulebook"/><b>{labels.rulebook}</b><small>{labels.rulebookNote}</small><i><ActionArrow direction="external" /></i>
        </a>
        </section>
      </section>

      <section className="countdown-section" aria-label="Countdown">
        <div className="section-frame countdown-grid">
          {countdown.map((value, index) => (
            <div className="countdown-unit" key={t.countdown[index]}>
              <b>{String(value).padStart(2, "0")}</b>
              <span>{t.countdown[index]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="original-information" id="information">
        <div className="section-frame">
          <h2>{labels.info}</h2>
          <div className="original-accordion">
            {[
              { title: labels.event, text: info.event, icon: "event" as const },
              { title: labels.register, text: info.registration, href: registrationUrl, action: labels.register, icon: "registration" as const },
              { title: labels.categories, text: info.categories, icon: "categories" as const },
              { title: labels.stages, text: info.stages, icon: "stages" as const },
              { title: labels.program, text: info.schedule, icon: "schedule" as const },
              { title: labels.rulebook, text: info.regulation, href: rulebookUrl, action: labels.rulebook, icon: "rulebook" as const },
              { title: labels.stay, text: info.lodging, href: lodgingUrl, action: labels.stay, icon: "lodging" as const },
            ].map(({ title, text, href, action, icon }, index) => {
              const isOpen = openInfo === index;
              return (
                <article className={isOpen ? "open" : ""} key={title}>
                  <div className="accordion-trigger">
                    <AccordionIcon type={icon} />
                    <b>{title}</b>
                    <button type="button" onClick={() => setOpenInfo(isOpen ? null : index)} aria-expanded={isOpen} aria-controls={`event-info-${index}`} aria-label={`${isOpen ? labels.close : labels.open} ${title}`}>
                      <i>{isOpen ? "−" : "+"}</i>
                    </button>
                  </div>
                  <div className="original-accordion-content" id={`event-info-${index}`}>
                    <div className="accordion-panel-inner">
                      {icon === "lodging" ? <LodgingDirectory language={language} /> : <OfficialText text={text} />}
                      {href && icon !== "lodging" && <a className="accordion-action" href={href} target="_blank" rel="noreferrer">{action} ↗</a>}
                    </div>
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
          <p>{t.history}</p>
          <p>{t.historyDetail}</p>
          <a className="original-about-mobile-link" href="/">{t.discoverMore} +++</a>
        </div>
        <div className="original-about-brand">
          <span><img src={tr3Logo} alt="Threerace Sports" /></span>
          <a className="original-about-desktop-link" href="/">{t.discoverMore} +++</a>
        </div>
      </section>

      <section className="original-gallery" aria-label="Galeria Threerace Bike Ultramarathon">
        <div className="original-gallery-viewport">
          <div
            className="original-gallery-track"
            style={{ transform: `translateX(-${galleryIndex * (100 / galleryVisible)}%)` }}
          >
            {galleryImages.map((image, index) => (
              <figure className="original-gallery-slide" key={image}>
                <img
                  src={image}
                  alt={`Threerace Bike Ultramarathon — foto ${index + 1}`}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </div>
        <button
          className="original-gallery-control original-gallery-prev"
          type="button"
          aria-label={language === "es" ? "Foto anterior" : language === "en" ? "Previous photo" : "Foto anterior"}
          disabled={galleryIndex === 0}
          onClick={() => setGalleryIndex((current) => Math.max(0, current - 1))}
        >
          ←
        </button>
        <button
          className="original-gallery-control original-gallery-next"
          type="button"
          aria-label={language === "es" ? "Foto siguiente" : language === "en" ? "Next photo" : "Próxima foto"}
          disabled={galleryIndex === galleryLastIndex}
          onClick={() => setGalleryIndex((current) => Math.min(galleryLastIndex, current + 1))}
        >
          →
        </button>
        <span className="original-gallery-count" aria-hidden="true">
          {String(galleryIndex + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
        </span>
      </section>

      <section className="azimut-feature">
        <a className="section-frame" href={azimutUrl} target="_blank" rel="noreferrer">
          <img src="/azimut-extremo-logo.png" alt="Azimut Extremo Outdoor Adventures" />
          <div>
            <p className="section-label">PARTNER URUGUAY</p>
            <h2>
              {language === "pt" ? <>CONHEÇA A EMPRESA PARCEIRA<br className="azimut-title-break" />QUE ORGANIZA A THREERACE<br className="azimut-title-break" />NO URUGUAI</> : language === "en" ? <>MEET THE PARTNER<br className="azimut-title-break" />BEHIND THREERACE<br className="azimut-title-break" />IN URUGUAY</> : <>CONOCE A LA EMPRESA<br className="azimut-title-break" />ALIADA QUE ORGANIZA<br className="azimut-title-break" />THREERACE EN URUGUAY</>}
            </h2>
            <span>{language === "pt" ? "VISITAR AZIMUT EXTREMO" : language === "en" ? "VISIT AZIMUT EXTREMO" : "VISITAR AZIMUT EXTREMO"} ↗</span>
          </div>
        </a>
      </section>

      <section className="original-kit">
        <div className="benefits-art-wrap">
          <img
            className="benefits-art"
            src="/threerace-benefits-vetor-premium-wide.png"
            alt="¿Qué incluye tu inscripción? Jersey Bioracer, camiseta casual, medias Threerace, medalla Finisher, placa personalizada, seguro, hidratación, servicios médicos, mecánica básica y bike wash."
          />
        </div>
      </section>

      <section className="original-partners">
        <div className="section-frame">
          <div className="original-organizers"><p>{t.partners[0]}</p><img src="/tr3-logo-new.svg" alt="Threerace Sports" /><img src="/azimut-extremo-logo.png" alt="Azimut Extremo" /></div>
          <div className="original-main-sponsor"><p>{t.partners[1]}</p><img src="/epic-bike-store.png" alt="Epic Bike Store" /></div>
          <div className="original-brands">
            <p>{language === "pt" ? "MARCAS PARCEIRAS" : language === "en" ? "PARTNER BRANDS" : "MARCAS ASOCIADAS"}</p>
            <img className="partner-brands-all" src="/partner-brands-row.png" alt="Orbea, Bioracer, 226ERS, Rudy Project, Shokz, DJI e Insta360" />
            <div className="partner-brands-mobile" aria-hidden="true">
              <img src="/partner-brands-mobile-1.svg" alt="" />
              <img src="/partner-brands-mobile-2.svg" alt="" />
            </div>
          </div>
          <div className="original-support">
            <p>{t.partners[2]}</p>
            <div className="support-logo-row">
              <div className="support-logo-line support-logo-line-top">
                {supportImages.slice(0, 2).map((image, index) => <img src={image} alt={`Event supporter ${index + 1}`} key={image} />)}
              </div>
              <div className="support-logo-line support-logo-line-bottom">
                {supportImages.slice(2).map((image, index) => <img src={image} alt={`Event supporter ${index + 3}`} key={image} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="events-section" id="events">
        <div className="section-frame section-heading split-heading">
          <div>
            <p className="section-label">{t.eventLead}</p>
            <h2>{t.eventTitle}</h2>
          </div>
          <p>{t.eventText}</p>
        </div>
        <div className="section-frame event-grid">
          <article className="event-card event-mtb" id="mtb">
            <div className="event-card-image" style={{ backgroundImage: `url(${heroImage})` }} />
            <div className="event-card-content">
              <p className="event-tag">{t.mtbTag}</p>
              <h3>{t.mtbTitle}</h3>
              <p className="event-description">{t.mtbDesc}</p>
              <div className="event-meta">
                {t.mtbMeta.map((detail) => <span key={detail}>{detail}</span>)}
              </div>
              <div className="event-bottom">
                <div>
                  <b>{t.mtbPrice}</b>
                  <small>{t.mtbPriceNote}</small>
                </div>
                <a href={registrationUrl} target="_blank" rel="noreferrer" aria-label={`${t.register} — ${t.mtbTitle}`}>
                  <Arrow />
                </a>
              </div>
            </div>
          </article>

          <article className="event-card event-gravel" id="gravel">
            <div className="event-card-image" style={{ backgroundImage: `url(${gravelImage})` }} />
            <div className="event-card-content">
              <p className="event-tag">{t.gravelTag}</p>
              <h3>{t.gravelTitle}</h3>
              <p className="event-description">{t.gravelDesc}</p>
              <div className="event-meta">
                {t.gravelMeta.map((detail) => <span key={detail}>{detail}</span>)}
              </div>
              <div className="event-bottom">
                <div>
                  <b>{t.gravelPrice}</b>
                  <small>{t.gravelPriceNote}</small>
                </div>
                <a href={registrationUrl} target="_blank" rel="noreferrer" aria-label={`${t.register} — ${t.gravelTitle}`}>
                  <Arrow />
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="gallery-section" aria-label="Threerace gallery">
        <div className="gallery-grid">
          {editorialGalleryImages.map((image, index) => (
            <figure className={`gallery-image image-${index + 1}`} key={image}>
              <img src={image} alt="Threerace Bike Ultramarathon" />
            </figure>
          ))}
        </div>
      </section>

      <section className="information-section" id="information">
        <div className="section-frame section-heading centered-heading">
          <p className="section-label">INFORMATION HUB</p>
          <h2>{t.information}</h2>
          <p>{t.informationText}</p>
        </div>
        <div className="section-frame info-grid">
          {t.infoCards.map(([title, text], index) => (
            <a
              className="info-card"
              href={["#guide", "#categories", lodgingUrl, rulebookUrl][index]}
              target={index > 1 ? "_blank" : undefined}
              rel={index > 1 ? "noreferrer" : undefined}
              key={title}
            >
              <span className="info-index">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="info-arrow"><Arrow /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="guide-section" id="guide">
        <div className="section-frame section-heading split-heading">
          <div>
            <p className="section-label">{t.guideEyebrow}</p>
            <h2>{t.guideTitle}</h2>
          </div>
          <p>{t.guideText}</p>
        </div>
        <div className="section-frame guide-tabs" role="tablist" aria-label="Event format">
          <button
            type="button"
            role="tab"
            aria-selected={guideMode === "mtb"}
            className={guideMode === "mtb" ? "active" : ""}
            onClick={() => setGuideMode("mtb")}
          >
            {t.mtbTag}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={guideMode === "gravel"}
            className={guideMode === "gravel" ? "active" : ""}
            onClick={() => setGuideMode("gravel")}
          >
            {t.gravelTag}
          </button>
        </div>
        <div className={guideMode === "gravel" ? "section-frame stage-grid two-stages" : "section-frame stage-grid"} role="tabpanel">
          {(guideMode === "mtb" ? t.mtbStages : t.gravelStages).map(([stage, date, place, detail]) => (
            <article className="stage-card" key={stage}>
              <p>{stage}</p>
              <h3>{date}</h3>
              <span>{place}</span>
              <b>{detail}</b>
            </article>
          ))}
        </div>
        <div className="section-frame categories-block" id="categories">
          <div>
            <p className="section-label">{t.categories}</p>
            <p>{t.categoriesText}</p>
          </div>
          <div className="category-list">
            {t.categoryGroups.map(([title, detail]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="section-frame guide-actions">
          <a className="button button-dark" href={rulebookUrl} target="_blank" rel="noreferrer">
            {t.rulebook} <Arrow />
          </a>
          <a className="button guide-lodging" href={lodgingUrl} target="_blank" rel="noreferrer">
            {t.lodging} <Arrow />
          </a>
        </div>
      </section>

      <section className="partners-section">
        <div className="section-frame partners-grid">
          <div className="partner-group organization-group">
            <p>{t.partners[0]}</p>
            <div className="organization-logos">
              <img src={azimutLogo} alt="Azimut Extremo" />
              <img src={tr3Logo} alt="Threerace Sports" />
            </div>
          </div>
          <div className="partner-group main-sponsor-group">
            <p>{t.partners[1]}</p>
            <img src={mainSponsorImage} alt="Official sponsor" />
          </div>
          <div className="partner-group support-group">
            <p>{t.partners[2]}</p>
            <div>
              {supportImages.map((image, index) => (
                <img src={image} alt={`Event supporter ${index + 1}`} key={image} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="plan-section">
        <div className="section-frame plan-grid">
          <div className="plan-intro">
            <p className="section-label">{t.planTag}</p>
            <h2>{t.planTitle}</h2>
            <p>{t.planText}</p>
          </div>
          <div className="plan-list">
            {t.planItems.map(([day, text]) => (
              <div className="plan-item" key={day}>
                <b>{day}</b>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section" id="faq">
        <div className="section-frame faq-grid">
          <div className="faq-intro">
            <p className="section-label">{t.faqEyebrow}</p>
            <h2>{t.faqTitle}</h2>
            <a className="button button-dark" href={whatsappUrl} target="_blank" rel="noreferrer">
              {t.faqCta} <Arrow />
            </a>
          </div>
          <div className="faq-list">
            {t.faqs.map(([question, answer], index) => {
              const isOpen = openFaq === index;
              return (
                <article className={isOpen ? "faq-item open" : "faq-item"} key={question}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? null : index)}>
                    <span>{question}</span>
                    <i>{isOpen ? "−" : "+"}</i>
                  </button>
                  <div className="faq-answer"><p>{answer}</p></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="history-section">
        <div className="section-frame history-content">
          <span className="brand-mark history-mark">TR<span>3</span></span>
          <p>{t.history}</p>
        </div>
      </section>

      <a className="mobile-register" href={registrationUrl} target="_blank" rel="noreferrer">
        {t.register} <Arrow />
      </a>
    </main>
  );
}
