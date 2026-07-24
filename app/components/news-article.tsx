"use client";

import { useEffect, useState } from "react";
import { detectInitialLanguage, saveLanguage, SiteLanguage } from "../site-language";

const logo = "/tr3-logo-new.svg";
const flags: Record<SiteLanguage, string> = { es: "🇪🇸", pt: "🇧🇷", en: "🇬🇧" };

type ArticleTranslation = {
  category: string;
  date: string;
  title: string;
  lead: string;
  sections: { title: string; paragraphs: string[] }[];
  facts: { label: string; value: string }[];
  back: string;
  factsTitle: string;
  cta: string;
  related: string;
};

type Article = {
  image: string;
  imagePosition: string;
  eventHref: string;
  translations: Record<SiteLanguage, ArticleTranslation>;
};

const articles: Record<string, Article> = {
  "threerace-uruguay-la-paloma": {
    image: "/home-hero-peloton.jpeg",
    imagePosition: "center 42%",
    eventHref: "/threerace-uruguay",
    translations: {
      pt: {
        category: "THREERACE URUGUAY", date: "JUL · 2026",
        title: "La Paloma será a base da nova edição internacional da Threerace",
        lead: "Entre o Atlântico, os caminhos rurais e a identidade de Rocha, a Threerace Bike Ultramarathon Uruguay inaugura um novo capítulo da história da TR3.",
        sections: [
          { title: "Uma prova construída para o território", paragraphs: ["Nos dias 30 e 31 de outubro e 1º de novembro de 2026, La Paloma será o centro de uma experiência de mountain bike em etapas. A programação combina percursos com características distintas, estratégia, resistência e a descoberta de uma das regiões mais emblemáticas do litoral uruguaio.", "Mais do que transferir um formato pronto, o projeto foi pensado a partir do lugar: estradas rurais, trechos costeiros, vento, natureza e a hospitalidade de Rocha passam a fazer parte da narrativa esportiva."] },
          { title: "Experiência internacional, operação local", paragraphs: ["A edição consolida a parceria entre a Threerace Sports e a Azimut Extremo. A experiência da TR3 na criação de provas com participação internacional se soma ao conhecimento territorial, esportivo e logístico da equipe uruguaia.", "Essa organização compartilhada aproxima Brasil e Uruguai e cria uma estrutura preparada para receber atletas de diferentes países, preservando a personalidade local do evento."] },
          { title: "Três dias para viver muito mais que uma chegada", paragraphs: ["A proposta reúne competição, turismo e comunidade. Cada etapa apresenta um desafio diferente, enquanto La Paloma funciona como ponto de encontro entre atletas, acompanhantes, organização e parceiros.", "A Threerace Uruguay nasce para quem entende que uma stage race não é apenas a soma dos quilômetros. É a sequência de decisões, paisagens, encontros e histórias que permanecem depois da linha de chegada."] },
        ],
        facts: [{ label: "DATA", value: "30 OUT — 01 NOV · 2026" }, { label: "BASE", value: "LA PALOMA · ROCHA" }, { label: "FORMATO", value: "MTB STAGE RACE · 3 DIAS" }, { label: "ORGANIZAÇÃO", value: "TR3 + AZIMUT EXTREMO" }],
        back: "VOLTAR ÀS NOTÍCIAS", factsTitle: "INFORMAÇÕES ESSENCIAIS", cta: "CONHEÇA O EVENTO ↗", related: "PRÓXIMO CAPÍTULO",
      },
      es: {
        category: "THREERACE URUGUAY", date: "JUL · 2026",
        title: "La Paloma será la base de la nueva edición internacional de Threerace",
        lead: "Entre el Atlántico, los caminos rurales y la identidad de Rocha, la Threerace Bike Ultramarathon Uruguay inaugura un nuevo capítulo en la historia de TR3.",
        sections: [
          { title: "Una prueba construida para el territorio", paragraphs: ["Los días 30 y 31 de octubre y 1.º de noviembre de 2026, La Paloma será el centro de una experiencia de mountain bike por etapas. La programación combina recorridos con características diferentes, estrategia, resistencia y el descubrimiento de una de las regiones más emblemáticas de la costa uruguaya.", "Más que trasladar un formato ya hecho, el proyecto fue pensado desde el lugar: caminos rurales, tramos costeros, viento, naturaleza y la hospitalidad de Rocha forman parte de la narrativa deportiva."] },
          { title: "Experiencia internacional, operación local", paragraphs: ["La edición consolida la alianza entre Threerace Sports y Azimut Extremo. La experiencia de TR3 creando pruebas con participación internacional se une al conocimiento territorial, deportivo y logístico del equipo uruguayo.", "Esta organización compartida acerca Brasil y Uruguay y crea una estructura preparada para recibir atletas de distintos países, preservando la personalidad local del evento."] },
          { title: "Tres días para vivir mucho más que una llegada", paragraphs: ["La propuesta reúne competencia, turismo y comunidad. Cada etapa presenta un desafío diferente, mientras La Paloma funciona como punto de encuentro entre atletas, acompañantes, organización y colaboradores.", "Threerace Uruguay nace para quienes entienden que una stage race no es solo la suma de kilómetros. Es la secuencia de decisiones, paisajes, encuentros e historias que permanecen después de la llegada."] },
        ],
        facts: [{ label: "FECHA", value: "30 OCT — 01 NOV · 2026" }, { label: "BASE", value: "LA PALOMA · ROCHA" }, { label: "FORMATO", value: "MTB STAGE RACE · 3 DÍAS" }, { label: "ORGANIZACIÓN", value: "TR3 + AZIMUT EXTREMO" }],
        back: "VOLVER A NOTICIAS", factsTitle: "INFORMACIÓN ESENCIAL", cta: "CONOCE EL EVENTO ↗", related: "PRÓXIMO CAPÍTULO",
      },
      en: {
        category: "THREERACE URUGUAY", date: "JUL · 2026",
        title: "La Paloma will host Threerace's new international edition",
        lead: "Between the Atlantic, rural roads and Rocha's identity, Threerace Bike Ultramarathon Uruguay opens a new chapter in the TR3 story.",
        sections: [
          { title: "A race shaped by its territory", paragraphs: ["On October 30 and 31 and November 1, 2026, La Paloma will become the center of a three-day mountain bike stage experience. The program combines distinct routes, strategy, endurance and the discovery of one of Uruguay's most emblematic coastal regions.", "Rather than transferring a ready-made format, the project was designed around the place itself: rural roads, coastal sections, wind, nature and Rocha's hospitality all become part of the sporting narrative."] },
          { title: "International experience, local operation", paragraphs: ["The edition consolidates the partnership between Threerace Sports and Azimut Extremo. TR3's experience in creating internationally attended races joins the Uruguayan team's territorial, sporting and logistical knowledge.", "This shared organization brings Brazil and Uruguay closer together and creates a structure prepared to welcome athletes from several countries while preserving the event's local personality."] },
          { title: "Three days that go far beyond the finish", paragraphs: ["The event brings competition, tourism and community together. Each stage presents a different challenge, while La Paloma becomes the meeting point for athletes, supporters, organizers and partners.", "Threerace Uruguay is for those who understand that a stage race is not merely the sum of its kilometers. It is a sequence of decisions, landscapes, encounters and stories that remain after the finish line."] },
        ],
        facts: [{ label: "DATE", value: "30 OCT — 01 NOV · 2026" }, { label: "BASE", value: "LA PALOMA · ROCHA" }, { label: "FORMAT", value: "MTB STAGE RACE · 3 DAYS" }, { label: "ORGANIZATION", value: "TR3 + AZIMUT EXTREMO" }],
        back: "BACK TO NEWS", factsTitle: "ESSENTIAL INFORMATION", cta: "DISCOVER THE EVENT ↗", related: "NEXT CHAPTER",
      },
    },
  },
  "gravel-experience-uruguay": {
    image: "/gravel-experience-hero-v2.png",
    imagePosition: "72% center",
    eventHref: "/gravel-experience-uruguay",
    translations: {
      pt: {
        category: "GRAVEL EXPERIENCE", date: "JUL · 2026",
        title: "Dois dias para descobrir o Uruguai por novas linhas",
        lead: "Uma experiência de 183 quilômetros criada para quem procura no gravel uma forma de explorar territórios, administrar o esforço e viver cada trecho com intensidade.",
        sections: [
          { title: "O gravel como forma de viajar", paragraphs: ["Integrada à programação da Threerace Uruguay, a Gravel Experience acontece nos dias 31 de outubro e 1º de novembro de 2026. São duas etapas — 115 km e 68 km — conectando caminhos rurais, terra, campos abertos e paisagens costeiras de Rocha.", "O objetivo não é apenas completar uma distância. É permitir que a bicicleta conduza o participante por mudanças de terreno, vento, silêncio e cenários que revelam o Uruguai de outra perspectiva."] },
          { title: "Estratégia em duas etapas", paragraphs: ["A primeira jornada concentra o maior volume e exige leitura de ritmo, alimentação e equipamento. No segundo dia, o corpo volta à estrada para uma etapa mais curta, mas marcada pelo acúmulo de esforço e pela necessidade de manter a consistência.", "Essa sequência transforma a prova em uma experiência completa: preparação, autonomia e capacidade de adaptação passam a ser tão importantes quanto a velocidade."] },
          { title: "Uma nova porta de entrada para a TR3", paragraphs: ["A Gravel Experience amplia o ecossistema da Threerace no Uruguai e conversa com ciclistas que desejam uma prova desafiadora, porém conectada à contemplação, ao turismo e à cultura gravel.", "Com organização compartilhada entre TR3 e Azimut Extremo, o evento leva para La Paloma uma proposta internacional construída com conhecimento local."] },
        ],
        facts: [{ label: "DATA", value: "31 OUT — 01 NOV · 2026" }, { label: "DISTÂNCIA", value: "183 KM" }, { label: "ETAPAS", value: "115 KM + 68 KM" }, { label: "BASE", value: "LA PALOMA · ROCHA" }],
        back: "VOLTAR ÀS NOTÍCIAS", factsTitle: "INFORMAÇÕES ESSENCIAIS", cta: "CONHEÇA O EVENTO ↗", related: "DUAS ETAPAS · UMA EXPERIÊNCIA",
      },
      es: {
        category: "GRAVEL EXPERIENCE", date: "JUL · 2026",
        title: "Dos días para descubrir Uruguay por nuevas líneas",
        lead: "Una experiencia de 183 kilómetros creada para quienes encuentran en el gravel una forma de explorar territorios, administrar el esfuerzo y vivir cada tramo con intensidad.",
        sections: [
          { title: "El gravel como forma de viajar", paragraphs: ["Integrada a la programación de Threerace Uruguay, Gravel Experience se realizará los días 31 de octubre y 1.º de noviembre de 2026. Son dos etapas —115 km y 68 km— que conectan caminos rurales, tierra, campos abiertos y paisajes costeros de Rocha.", "El objetivo no es solamente completar una distancia. Es permitir que la bicicleta conduzca al participante por cambios de terreno, viento, silencio y escenarios que revelan Uruguay desde otra perspectiva."] },
          { title: "Estrategia en dos etapas", paragraphs: ["La primera jornada concentra el mayor volumen y exige lectura de ritmo, alimentación y equipo. En el segundo día, el cuerpo vuelve al camino para una etapa más corta, marcada por el esfuerzo acumulado y la necesidad de mantener la consistencia.", "Esta secuencia transforma la prueba en una experiencia completa: preparación, autonomía y capacidad de adaptación son tan importantes como la velocidad."] },
          { title: "Una nueva puerta de entrada a TR3", paragraphs: ["Gravel Experience amplía el ecosistema de Threerace en Uruguay y dialoga con ciclistas que buscan una prueba desafiante, conectada con la contemplación, el turismo y la cultura gravel.", "Con organización compartida entre TR3 y Azimut Extremo, el evento lleva a La Paloma una propuesta internacional construida con conocimiento local."] },
        ],
        facts: [{ label: "FECHA", value: "31 OCT — 01 NOV · 2026" }, { label: "DISTANCIA", value: "183 KM" }, { label: "ETAPAS", value: "115 KM + 68 KM" }, { label: "BASE", value: "LA PALOMA · ROCHA" }],
        back: "VOLVER A NOTICIAS", factsTitle: "INFORMACIÓN ESENCIAL", cta: "CONOCE EL EVENTO ↗", related: "DOS ETAPAS · UNA EXPERIENCIA",
      },
      en: {
        category: "GRAVEL EXPERIENCE", date: "JUL · 2026",
        title: "Two days to discover Uruguay along new lines",
        lead: "A 183-kilometer experience for riders who see gravel as a way to explore territories, manage effort and live every section with intensity.",
        sections: [
          { title: "Gravel as a way to travel", paragraphs: ["Part of the Threerace Uruguay program, Gravel Experience takes place on October 31 and November 1, 2026. Two stages —115 km and 68 km— connect rural roads, dirt, open fields and Rocha's coastal landscapes.", "The goal is not simply to cover a distance. It is to let the bicycle guide each participant through changing terrain, wind, silence and scenery that reveal Uruguay from another perspective."] },
          { title: "Strategy across two stages", paragraphs: ["The first day carries the greatest volume and demands careful management of pace, nutrition and equipment. On day two, the body returns to the road for a shorter stage shaped by accumulated effort and the need for consistency.", "This sequence turns the race into a complete experience: preparation, autonomy and adaptability become as important as speed."] },
          { title: "A new gateway to TR3", paragraphs: ["Gravel Experience expands the Threerace ecosystem in Uruguay and speaks to cyclists seeking a demanding event connected to contemplation, tourism and gravel culture.", "Jointly organized by TR3 and Azimut Extremo, the event brings an international proposal built with local knowledge to La Paloma."] },
        ],
        facts: [{ label: "DATE", value: "31 OCT — 01 NOV · 2026" }, { label: "DISTANCE", value: "183 KM" }, { label: "STAGES", value: "115 KM + 68 KM" }, { label: "BASE", value: "LA PALOMA · ROCHA" }],
        back: "BACK TO NEWS", factsTitle: "ESSENTIAL INFORMATION", cta: "DISCOVER THE EVENT ↗", related: "TWO STAGES · ONE EXPERIENCE",
      },
    },
  },
  "legends-serra-gaucha": {
    image: "/event-legends-v3.jpeg",
    imagePosition: "center 40%",
    eventHref: "https://www.legendsbikerace.com.br",
    translations: {
      pt: {
        category: "LEGENDS ULTIMATE GRAVEL RACE", date: "LANÇAMENTO · 2026",
        title: "Quatro destinos. Uma travessia pela Serra Gaúcha",
        lead: "Canela, São Francisco de Paula, Gramado e Nova Petrópolis conectadas por uma stage race premium de gravel com 370,3 quilômetros e 6.302 metros de ascensão.",
        sections: [
          { title: "Uma história contínua em quatro etapas", paragraphs: ["A Legends Ultimate Gravel Race foi desenhada como uma travessia. Cada dia começa em uma nova cidade e revela estradas rurais, araucárias, vales, cânions, comunidades e diferentes leituras da Serra Gaúcha.", "As quatro etapas somam 370,3 quilômetros, aproximadamente 75% não pavimentados e 6.302 metros de ascensão. É uma jornada que exige preparação para dias consecutivos, autonomia e capacidade de administrar corpo, equipamento e estratégia."] },
          { title: "Competir ou experimentar", paragraphs: ["A modalidade Legends Gravel Race oferece tempo registrado, classificação por pontos, categorias e premiação. Já a Legends Experience abre a mesma jornada para MTB e E-bike, sem ranking e com foco no turismo e no desafio pessoal.", "Os dois formatos compartilham logística, segurança e o mesmo território. O que muda é o propósito com que cada participante escolhe viver a travessia."] },
          { title: "Tecnologia e estrutura sem retirar o protagonismo", paragraphs: ["A navegação será feita por GPX. Bagagens serão transportadas entre as cidades-base, enquanto bike wash, suporte mecânico, checkpoints, comunicação e resgate compõem a operação.", "O Legends Race Engine compara a atividade registrada no GPS com o percurso oficial, valida checkpoints digitais e organiza tempos e resultados. A tecnologia comprova a jornada; quem a constrói continua sendo o ciclista."] },
          { title: "Não é para todos", paragraphs: ["A primeira edição terá somente 100 vagas. A data oficial, os valores, os hotéis e a abertura das inscrições serão apresentados no lançamento.", "A Legends foi criada para ciclistas treinados que acreditam que a bicicleta é um passaporte para descobrir lugares, pessoas e histórias. Não é apenas uma prova. É uma experiência de território em quatro atos."] },
        ],
        facts: [{ label: "FORMATO", value: "4 ETAPAS · 4 CIDADES" }, { label: "DISTÂNCIA", value: "370,3 KM" }, { label: "ASCENSÃO", value: "6.302 M+" }, { label: "VAGAS", value: "100 PARTICIPANTES" }],
        back: "VOLTAR ÀS NOTÍCIAS", factsTitle: "A TRAVESSIA EM NÚMEROS", cta: "CONHEÇA A LEGENDS ↗", related: "NOT FOR EVERYONE · ONLY FOR LEGENDS",
      },
      es: {
        category: "LEGENDS ULTIMATE GRAVEL RACE", date: "LANZAMIENTO · 2026",
        title: "Cuatro destinos. Una travesía por la Serra Gaúcha",
        lead: "Canela, São Francisco de Paula, Gramado y Nova Petrópolis conectadas por una stage race premium de gravel con 370,3 kilómetros y 6.302 metros de ascenso.",
        sections: [
          { title: "Una historia continua en cuatro etapas", paragraphs: ["Legends Ultimate Gravel Race fue diseñada como una travesía. Cada día comienza en una nueva ciudad y revela caminos rurales, araucarias, valles, cañones, comunidades y distintas miradas sobre la Serra Gaúcha.", "Las cuatro etapas suman 370,3 kilómetros, aproximadamente 75% sin pavimentar y 6.302 metros de ascenso. Es una jornada que exige preparación para días consecutivos, autonomía y capacidad de administrar cuerpo, equipo y estrategia."] },
          { title: "Competir o experimentar", paragraphs: ["La modalidad Legends Gravel Race ofrece tiempos registrados, clasificación por puntos, categorías y premiación. Legends Experience abre la misma jornada para MTB y E-bike, sin ranking y con foco en turismo y desafío personal.", "Los dos formatos comparten logística, seguridad y el mismo territorio. Lo que cambia es el propósito con que cada participante elige vivir la travesía."] },
          { title: "Tecnología y estructura sin quitar protagonismo", paragraphs: ["La navegación será por GPX. El equipaje será transportado entre las ciudades-base, mientras bike wash, soporte mecánico, checkpoints, comunicación y rescate forman parte de la operación.", "Legends Race Engine compara la actividad registrada en el GPS con el recorrido oficial, valida checkpoints digitales y organiza tiempos y resultados. La tecnología comprueba el viaje; quien lo construye sigue siendo el ciclista."] },
          { title: "No es para todos", paragraphs: ["La primera edición tendrá solamente 100 plazas. La fecha oficial, los valores, los hoteles y la apertura de inscripciones serán presentados durante el lanzamiento.", "Legends fue creada para ciclistas entrenados que creen que la bicicleta es un pasaporte para descubrir lugares, personas e historias. No es solo una prueba. Es una experiencia de territorio en cuatro actos."] },
        ],
        facts: [{ label: "FORMATO", value: "4 ETAPAS · 4 CIUDADES" }, { label: "DISTANCIA", value: "370,3 KM" }, { label: "ASCENSO", value: "6.302 M+" }, { label: "PLAZAS", value: "100 PARTICIPANTES" }],
        back: "VOLVER A NOTICIAS", factsTitle: "LA TRAVESÍA EN NÚMEROS", cta: "CONOCE LEGENDS ↗", related: "NOT FOR EVERYONE · ONLY FOR LEGENDS",
      },
      en: {
        category: "LEGENDS ULTIMATE GRAVEL RACE", date: "LAUNCH · 2026",
        title: "Four destinations. One journey through Serra Gaúcha",
        lead: "Canela, São Francisco de Paula, Gramado and Nova Petrópolis connected by a premium gravel stage race covering 370.3 kilometers and 6,302 meters of climbing.",
        sections: [
          { title: "One continuous story across four stages", paragraphs: ["Legends Ultimate Gravel Race was designed as a journey. Each day begins in a new city and reveals rural roads, araucaria forests, valleys, canyons, communities and different ways of seeing Serra Gaúcha.", "The four stages total 370.3 kilometers, approximately 75% unpaved, and 6,302 meters of climbing. It demands preparation for consecutive days, autonomy and the ability to manage body, equipment and strategy."] },
          { title: "Race it or experience it", paragraphs: ["Legends Gravel Race offers official timing, points classification, age categories and awards. Legends Experience opens the same journey to MTB and E-bike riders without rankings, focusing on tourism and personal challenge.", "Both formats share the same logistics, safety structure and territory. What changes is the purpose each participant brings to the journey."] },
          { title: "Technology and support without taking away autonomy", paragraphs: ["Navigation will use GPX files. Luggage will be transported between base cities, while bike wash, mechanical assistance, checkpoints, communication and rescue form the operational structure.", "Legends Race Engine compares the GPS-recorded activity with the official route, validates digital checkpoints and organizes times and results. Technology verifies the journey; the cyclist is still the one who builds it."] },
          { title: "Not for everyone", paragraphs: ["The first edition will have only 100 places. The official date, pricing, hotels and registration opening will be announced at launch.", "Legends was created for trained cyclists who believe a bicycle is a passport to discover places, people and stories. It is more than a race. It is a four-act experience of territory."] },
        ],
        facts: [{ label: "FORMAT", value: "4 STAGES · 4 CITIES" }, { label: "DISTANCE", value: "370.3 KM" }, { label: "CLIMBING", value: "6,302 M+" }, { label: "FIELD", value: "100 PARTICIPANTS" }],
        back: "BACK TO NEWS", factsTitle: "THE JOURNEY IN NUMBERS", cta: "DISCOVER LEGENDS ↗", related: "NOT FOR EVERYONE · ONLY FOR LEGENDS",
      },
    },
  },
};

export default function NewsArticle({ slug }: { slug: keyof typeof articles }) {
  const [language, setLanguage] = useState<SiteLanguage>("pt");
  const article = articles[slug];
  const t = article.translations[language];

  useEffect(() => {
    let active = true;
    void detectInitialLanguage("pt").then((detected) => {
      if (!active) return;
      setLanguage(detected);
      saveLanguage(detected);
    });
    return () => {
      active = false;
    };
  }, []);

  function selectLanguage(next: SiteLanguage) {
    setLanguage(next);
    saveLanguage(next);
  }

  return (
    <main className="news-article-page">
      <section className="news-article-hero" style={{ backgroundImage: `url(${article.image})`, backgroundPosition: article.imagePosition }}>
        <header className="site-header news-article-header">
          <a className="brand" href="/" aria-label="Threerace Sports"><img className="header-tr3-logo" src={logo} alt="Threerace Sports" /></a>
          <a className="news-back-top" href="/#historias">← {t.back}</a>
          <div className="language-switcher" aria-label="Language selector">
            {(["es", "pt", "en"] as SiteLanguage[]).map((code) => <button type="button" key={code} className={language === code ? "active" : ""} onClick={() => selectLanguage(code)} aria-label={code}>{flags[code]}</button>)}
          </div>
        </header>
        <div className="section-frame news-article-title">
          <p>{t.category}<span>{t.date}</span></p>
          <h1>{t.title}</h1>
          <strong>{t.lead}</strong>
        </div>
      </section>

      <article className="section-frame news-article-body">
        <div className="news-article-copy">
          {t.sections.map((section) => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
        </div>
        <aside>
          <p>{t.factsTitle}</p>
          {t.facts.map((fact) => <div key={fact.label}><span>{fact.label}</span><b>{fact.value}</b></div>)}
          <a className="button button-primary" href={article.eventHref} target={article.eventHref.startsWith("http") ? "_blank" : undefined} rel={article.eventHref.startsWith("http") ? "noreferrer" : undefined}>{t.cta}</a>
        </aside>
      </article>

      <section className="news-article-footer">
        <div className="section-frame"><p>{t.related}</p><a href="/#historias">{t.back} ↗</a></div>
      </section>
    </main>
  );
}
