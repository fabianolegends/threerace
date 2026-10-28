import styles from "./uruguay-gps-files.module.css";

type Language = "pt" | "es" | "en";

const routes = [
  { stage: 1, rideWithGps: "https://ridewithgps.com/routes/57709895?via=XHp6hUxfocr2OC2wHcQZuQ" },
  { stage: 2, rideWithGps: "https://ridewithgps.com/routes/57709804?via=kUuvFqj6qYac2Oyy9gBy2g" },
  { stage: 3, rideWithGps: "https://ridewithgps.com/routes/57709823?via=kDJoeWkINIbUAAy35D8ong" },
];

const copy = {
  pt: {
    intro: "Baixe o arquivo GPX para o seu GPS ou visualize o percurso no Ride with GPS.",
    names: ["XCC", "Etapa Rainha", "Etapa Final"],
    download: "Baixar GPX", view: "Abrir no Ride with GPS",
  },
  es: {
    intro: "Descargá el archivo GPX para tu GPS o consultá el recorrido en Ride with GPS.",
    names: ["XCC", "Etapa Reina", "Etapa Final"],
    download: "Descargar GPX", view: "Abrir en Ride with GPS",
  },
  en: {
    intro: "Download the GPX file to your GPS or view the course on Ride with GPS.",
    names: ["XCC", "Queen Stage", "Final Stage"],
    download: "Download GPX", view: "Open on Ride with GPS",
  },
};

export default function UruguayGpsFiles({ language }: { language: Language }) {
  const t = copy[language];
  return (
    <div className={styles.files}>
      <div className={styles.intro}>{t.intro}</div>
      <ul className={styles.grid}>
        {routes.map(({ stage, rideWithGps }, index) => (
          <li key={stage} className={styles.route}>
            <h4>Stage {stage}</h4>
            <span className={styles.name}>{t.names[index]}</span>
            <div className={styles.actions}>
              <a className={styles.download} href={`/uruguay-2026/gpx/stage-${stage}-tr3-uruguay.gpx`} download={`Stage ${stage} - TR3 Uruguay.gpx`} type="application/gpx+xml" aria-label={`${t.download} — Stage ${stage}`}>
                {t.download} <span aria-hidden="true">↓</span>
              </a>
              <a className={styles.view} href={rideWithGps} target="_blank" rel="noopener noreferrer" aria-label={`${t.view} — Stage ${stage}`}>
                {t.view} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
