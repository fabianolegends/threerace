import { locations } from "./locations";
import styles from "./schedule.module.css";

type Language = "pt" | "es" | "en";

const copy = {
  pt: {
    range: "às", map: "Ver no Google Maps",
    titles: [
      "QUINTA-FEIRA – 29/10/2026",
      "SEXTA-FEIRA – 30/10/2026 | STAGE 01 – XCC",
      "SÁBADO – 31/10/2026 | STAGE 02 – ETAPA RAINHA",
      "DOMINGO – 01/11/2026 | STAGE 03 – ETAPA FINAL",
    ],
    events: {
      opening: "Abertura da Arena Threerace Uruguay",
      kits: "Entrega de kits",
      mechanics: "Funcionamento da mecânica",
      wash: "Funcionamento do Bike Wash",
      firstXcc: "Primeira largada XCC",
      lastXcc: "Última largada XCC",
      results: "Publicação dos resultados oficiais",
      awards1: "Premiação conforme regulamento – Stage 01",
      briefing2: "Briefing online Stage 02 / Etapa Rainha",
      closing: "Fechamento da arena",
      corrals: "Abertura dos portões para alinhamento",
      start2: "Largada Stage 02 / Etapa Rainha",
      awards2: "Premiação conforme regulamento – Stage 02",
      briefing3: "Briefing online Stage 03 / Etapa Final",
      start3: "Largada Stage 03 / Etapa Final",
      awards3: "Premiação Stage 03 / Final",
      overall: "Premiação das etapas e premiação Geral Ultra",
      finish: "Encerramento Threerace Bike Ultramarathon Uruguay 2026",
    },
  },
  es: {
    range: "a", map: "Ver en Google Maps",
    titles: [
      "JUEVES – 29/10/2026",
      "VIERNES – 30/10/2026 | STAGE 01 – XCC",
      "SÁBADO – 31/10/2026 | STAGE 02 – ETAPA REINA",
      "DOMINGO – 01/11/2026 | STAGE 03 – ETAPA FINAL",
    ],
    events: {
      opening: "Apertura de la Arena Threerace Uruguay",
      kits: "Entrega de kits",
      mechanics: "Funcionamiento de la mecánica",
      wash: "Funcionamiento del Bike Wash",
      firstXcc: "Primera salida XCC",
      lastXcc: "Última salida XCC",
      results: "Publicación de resultados oficiales",
      awards1: "Premiación según reglamento – Stage 01",
      briefing2: "Briefing online Stage 02 / Etapa Reina",
      closing: "Cierre de la arena",
      corrals: "Apertura de los portones para alineación",
      start2: "Salida Stage 02 / Etapa Reina",
      awards2: "Premiación según reglamento – Stage 02",
      briefing3: "Briefing online Stage 03 / Etapa Final",
      start3: "Salida Stage 03 / Etapa Final",
      awards3: "Premiación Stage 03 / Final",
      overall: "Premiación de las etapas y premiación General Ultra",
      finish: "Cierre Threerace Bike Ultramarathon Uruguay 2026",
    },
  },
  en: {
    range: "to", map: "View on Google Maps",
    titles: [
      "THURSDAY – OCTOBER 29, 2026",
      "FRIDAY – OCTOBER 30, 2026 | STAGE 01 – XCC",
      "SATURDAY – OCTOBER 31, 2026 | STAGE 02 – QUEEN STAGE",
      "SUNDAY – NOVEMBER 1, 2026 | STAGE 03 – FINAL STAGE",
    ],
    events: {
      opening: "Threerace Uruguay Arena opens",
      kits: "Race kit collection",
      mechanics: "Mechanical service",
      wash: "Bike Wash",
      firstXcc: "First XCC start",
      lastXcc: "Last XCC start",
      results: "Official results published",
      awards1: "Stage 01 awards according to the rulebook",
      briefing2: "Online Stage 02 / Queen Stage briefing",
      closing: "Arena closes",
      corrals: "Starting corrals open",
      start2: "Stage 02 / Queen Stage start",
      awards2: "Stage 02 awards according to the rulebook",
      briefing3: "Online Stage 03 / Final Stage briefing",
      start3: "Stage 03 / Final Stage start",
      awards3: "Stage 03 / Final awards",
      overall: "Stage awards and Overall Ultra awards",
      finish: "Threerace Bike Ultramarathon Uruguay 2026 closes",
    },
  },
};

type ScheduleEvent = {
  time: string;
  end?: string;
  key: keyof typeof copy.pt.events;
  laPaloma?: boolean;
};

const days: { location: number; events: ScheduleEvent[] }[] = [
  { location: 0, events: [
    { time: "16:00", key: "opening" },
    { time: "16:00", end: "21:00", key: "kits" },
  ] },
  { location: 0, events: [
    { time: "09:00", key: "opening" },
    { time: "09:00", end: "12:00", key: "kits" },
    { time: "11:00", end: "18:00", key: "mechanics" },
    { time: "13:30", key: "firstXcc" },
    { time: "14:00", end: "17:00", key: "wash" },
    { time: "15:20", key: "lastXcc" },
    { time: "17:00", key: "results" },
    { time: "17:00", key: "awards1" },
    { time: "18:30", key: "briefing2" },
    { time: "18:30", key: "closing" },
  ] },
  { location: 1, events: [
    { time: "07:00", key: "opening" },
    { time: "07:00", end: "18:00", key: "mechanics", laPaloma: true },
    { time: "07:45", key: "corrals" },
    { time: "08:00", key: "start2" },
    { time: "11:00", end: "18:00", key: "wash", laPaloma: true },
    { time: "17:00", key: "results" },
    { time: "17:00", key: "awards2" },
    { time: "18:00", key: "briefing3" },
    { time: "18:30", key: "closing" },
  ] },
  { location: 2, events: [
    { time: "07:00", key: "opening" },
    { time: "08:15", key: "corrals" },
    { time: "08:30", key: "start3" },
    { time: "14:00", key: "results" },
    { time: "14:30", key: "awards3" },
    { time: "14:30", key: "overall" },
    { time: "15:00", key: "finish" },
  ] },
];

export default function UruguaySchedule({ language }: { language: Language }) {
  const t = copy[language];
  return (
    <div className={`official-copy ${styles.schedule}`}>
      {days.map((day, index) => {
        const location = locations[day.location];
        return (
          <section className={styles.day} key={index} aria-labelledby={`uruguay-schedule-${index}`}>
            <h4 id={`uruguay-schedule-${index}`}>{t.titles[index]}</h4>
            <ul className={styles.events}>
              {day.events.map((event) => (
                <li className={styles.event} key={event.key}>
                  <strong className={styles.time}>
                    {event.time}{event.end && ` ${t.range} ${event.end}`}
                  </strong>
                  <div>
                    <p>{t.events[event.key]}{event.laPaloma && <> <strong>(La Paloma)</strong></>}
                      {event.key === "opening" && <> — <strong>{location.name}</strong></>}
                    </p>
                    {event.key === "opening" && (
                      <a className={styles.map} href={location.map} target="_blank" rel="noopener noreferrer" aria-label={`${t.map} — ${location.name}`}>
                        {t.map} ↗
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
