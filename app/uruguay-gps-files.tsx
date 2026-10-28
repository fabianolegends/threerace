import styles from "./uruguay-gps-files.module.css";

type Language = "pt" | "es" | "en";
type Event = "ultra" | "gravel" | "short";

const ultraRoutes = [
  { stage: 1, rideWithGps: "https://ridewithgps.com/routes/57709790?via=9QHLged8UThlLeLuZB5ddg" },
  { stage: 2, rideWithGps: "https://ridewithgps.com/routes/57709804?via=kUuvFqj6qYac2Oyy9gBy2g" },
  { stage: 3, rideWithGps: "https://ridewithgps.com/routes/57709823?via=kDJoeWkINIbUAAy35D8ong" },
];

const gravelRoutes = [
  { stage: 1, rideWithGps: "https://ridewithgps.com/routes/57709895?via=XHp6hUxfocr2OC2wHcQZuQ" },
  { stage: 2, rideWithGps: "https://ridewithgps.com/routes/57709845?via=A2zSp571tvF63_huxwrJFQ" },
];

const copy = {
  pt: {
    intro: "Baixe o arquivo GPX para o seu GPS ou visualize o percurso no Ride with GPS.",
    names: ["XCC", "Etapa Rainha", "Etapa Final"],
    download: "Baixar GPX", view: "Abrir no Ride with GPS",
    short: "Mesmo percurso da Stage 3 da Ultra",
    gravel: "A navegação pelo GPS é obrigatória. Siga o track da Gravel e salve sua atividade para eventual conferência na chegada.",
  },
  es: {
    intro: "Descargá el archivo GPX para tu GPS o consultá el recorrido en Ride with GPS.",
    names: ["XCC", "Etapa Reina", "Etapa Final"],
    download: "Descargar GPX", view: "Abrir en Ride with GPS",
    short: "Mismo recorrido que la Stage 3 de la Ultra",
    gravel: "La navegación por GPS es obligatoria. Seguí el track de Gravel y guardá tu actividad para una posible verificación en la llegada.",
  },
  en: {
    intro: "Download the GPX file to your GPS or view the course on Ride with GPS.",
    names: ["XCC", "Queen Stage", "Final Stage"],
    download: "Download GPX", view: "Open on Ride with GPS",
    short: "Same course as Ultra Stage 3",
    gravel: "GPS navigation is mandatory. Follow the Gravel track and save your activity for possible verification at the finish.",
  },
};

export default function UruguayGpsFiles({ language, event = "ultra" }: { language: Language; event?: Event }) {
  const t = copy[language];
  const routes = event === "gravel" ? gravelRoutes : event === "short" ? [ultraRoutes[2]] : ultraRoutes;
  return (
    <div className={styles.files}>
      <div className={styles.intro}>{t.intro}</div>
      {event === "gravel" && <div className={styles.intro}><strong>{t.gravel}</strong></div>}
      <ul className={styles.grid}>
        {routes.map(({ stage, rideWithGps }) => {
          const title = event === "short" ? "Short" : `Stage ${stage}`;
          const file = event === "gravel" ? `/gravel-2026/gpx/stage-${stage}-gravel-experience-tr3-uruguay.gpx` : `/uruguay-2026/gpx/stage-${stage}-tr3-uruguay.gpx`;
          const filename = event === "gravel" ? `Stage ${stage} - Gravel Experience TR3 Uruguay.gpx` : `Stage ${stage} - TR3 Uruguay.gpx`;
          return (
          <li key={stage} className={styles.route}>
            <h4>{title}</h4>
            <span className={styles.name}>{event === "short" ? t.short : event === "gravel" ? "Gravel Experience" : t.names[stage - 1]}</span>
            <div className={styles.actions}>
              <a className={styles.download} href={file} download={filename} type="application/gpx+xml" aria-label={`${t.download} — ${title}`}>
                {t.download} <span aria-hidden="true">↓</span>
              </a>
              <a className={styles.view} href={rideWithGps} target="_blank" rel="noopener noreferrer" aria-label={`${t.view} — ${title}`}>
                {t.view} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </li>
          );
        })}
      </ul>
    </div>
  );
}
