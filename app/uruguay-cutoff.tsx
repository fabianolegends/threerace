import styles from "./uruguay-cutoff.module.css";

type Language = "pt" | "es" | "en";

const copy = {
  pt: {
    title: "PONTO DE CORTE", aid: "Ponto de Apoio 02", secondPass: "Segunda passagem pelo apoio",
    cutoff: "Horário de corte", start: "Largada", duration: "Limite até o apoio", average: "Média necessária",
    durationValue: "3h30 de prova",
    note: "A passagem pelo apoio deve ocorrer até o horário de corte. O tempo é contado desde a largada, incluindo paradas. Média aproximada, arredondada para cima.",
  },
  es: {
    title: "PUNTO DE CORTE", aid: "Punto de Apoyo 02", secondPass: "Segunda pasada por el apoyo",
    cutoff: "Horario de corte", start: "Largada", duration: "Límite hasta el apoyo", average: "Velocidad media necesaria",
    durationValue: "3h30 de carrera",
    note: "El paso por el apoyo debe realizarse a más tardar a la hora de corte. El tiempo se cuenta desde la largada, incluidas las paradas. Velocidad media aproximada, redondeada hacia arriba.",
  },
  en: {
    title: "CUTOFF POINT", aid: "Aid Station 02", secondPass: "Second pass through the aid station",
    cutoff: "Cutoff time", start: "Start", duration: "Time limit to the aid station", average: "Required average speed",
    durationValue: "3h30 race time",
    note: "Riders must pass the aid station no later than the cutoff time. Elapsed time is measured from the start and includes stops. Average speed is approximate, rounded up.",
  },
} as const;

const cutoffs = {
  2: { km: 43, start: "08:00", time: "11:30", average: 12.3 },
  3: { km: 44, start: "08:30", time: "12:00", average: 12.6 },
} as const;

export default function UruguayCutoff({ language, stage, short = false }: {
  language: Language;
  stage: 2 | 3;
  short?: boolean;
}) {
  const t = copy[language];
  const cutoff = cutoffs[stage];
  const average = cutoff.average.toFixed(1).replace(".", language === "en" ? "." : ",");
  return (
    <section className={styles.card} aria-label={`${t.title} - ${t.aid} - km ${cutoff.km}`}>
      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>{t.title} · {short ? "SHORT" : "MTB / ULTRA"}</span>
          <h5 className={styles.heading}>{t.aid} · km {cutoff.km}</h5>
          {stage === 3 && <span className={styles.secondPass}>{t.secondPass}</span>}
        </div>
        <div className={styles.clock}>
          <span>{t.cutoff}</span>
          <strong>{cutoff.time}</strong>
        </div>
      </div>
      <dl className={styles.details}>
        <div><dt>{t.start}</dt><dd>{cutoff.start}</dd></div>
        <div><dt>{t.duration}</dt><dd>{t.durationValue}</dd></div>
        <div><dt>{t.average}</dt><dd>{average} km/h</dd></div>
      </dl>
      <div className={styles.note}>{t.note}</div>
    </section>
  );
}
