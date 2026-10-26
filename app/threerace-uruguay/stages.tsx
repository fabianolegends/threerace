import Image from "next/image";
import styles from "./stages.module.css";
import { locations } from "./locations";

type Language = "pt" | "es" | "en";

const copy = {
  pt: {
    date: "Data", start: "Local da largada", address: "Endereço",
    distance: "Distância", elevation: "Desnível positivo", firstStart: "Primeira largada",
    map: "Ver local da largada no Google Maps", enlarge: "Ampliar perfil",
    notice: "Os horários de largada por bateria serão divulgados em 29/10/2026.",
    generalTitle: "INFORMAÇÕES GERAIS SOBRE OS PERCURSOS",
    general: "Percursos, horários e pontos de apoio poderão sofrer ajustes por razões técnicas, climáticas, de segurança ou por determinação das autoridades competentes.",
    stages: [
      { title: "STAGE 01 – XCC", date: "30/10/2026", distance: "5,3 km · volta única", description: "A primeira etapa será disputada no formato XCC, com uma única volta de 5,3 km. As largadas serão organizadas por categoria, com no máximo 15 atletas por bateria." },
      { title: "STAGE 02 – ETAPA RAINHA XCM", date: "31/10/2026", distance: "81,1 km", elevation: "1.370 m", description: "A segunda etapa será a Etapa Rainha da competição, disputada no formato XCM. O percurso combina estradas rurais, setores técnicos e subidas exigentes.", alt: "Perfil da etapa 02: 81,1 km e 1.370 m de desnível positivo. Apoio nos km 25, 43 e 63; apoio mecânico no km 43." },
      { title: "STAGE 03 – ETAPA FINAL XCM", date: "01/11/2026", distance: "64 km", elevation: "670 m", description: "A terceira e última etapa será decisiva para a classificação geral da Threerace Bike Ultramarathon Uruguay.", alt: "Perfil da etapa 03: 64 km e 670 m de desnível positivo. Apoio nos km 18 e 44; apoio mecânico no km 44." },
    ],
  },
  es: {
    date: "Fecha", start: "Lugar de salida", address: "Dirección",
    distance: "Distancia", elevation: "Desnivel positivo", firstStart: "Primera salida",
    map: "Ver lugar de salida en Google Maps", enlarge: "Ampliar perfil",
    notice: "Los horarios de salida de cada tanda se publicarán el 29/10/2026.",
    generalTitle: "INFORMACIÓN GENERAL SOBRE LOS RECORRIDOS",
    general: "Los recorridos, horarios y puntos de apoyo podrán modificarse por razones técnicas, climáticas, de seguridad o por decisión de las autoridades competentes.",
    stages: [
      { title: "STAGE 01 – XCC", date: "30/10/2026", distance: "5,3 km · vuelta única", description: "La primera etapa se disputará en formato XCC, con una única vuelta de 5,3 km. Las salidas se organizarán por categoría, con un máximo de 15 atletas por tanda." },
      { title: "STAGE 02 – ETAPA REINA XCM", date: "31/10/2026", distance: "81,1 km", elevation: "1.370 m", description: "La segunda etapa será la Etapa Reina de la competencia, disputada en formato XCM. El recorrido combina caminos rurales, sectores técnicos y subidas exigentes.", alt: "Perfil de la etapa 02: 81,1 km y 1.370 m de desnivel positivo. Apoyo en los km 25, 43 y 63; asistencia mecánica en el km 43." },
      { title: "STAGE 03 – ETAPA FINAL XCM", date: "01/11/2026", distance: "64 km", elevation: "670 m", description: "La tercera y última etapa será decisiva para la clasificación general de la Threerace Bike Ultramarathon Uruguay.", alt: "Perfil de la etapa 03: 64 km y 670 m de desnivel positivo. Apoyo en los km 18 y 44; asistencia mecánica en el km 44." },
    ],
  },
  en: {
    date: "Date", start: "Start location", address: "Address",
    distance: "Distance", elevation: "Elevation gain", firstStart: "First start",
    map: "View start location on Google Maps", enlarge: "Enlarge profile",
    notice: "Start times for each heat will be published on October 29, 2026.",
    generalTitle: "GENERAL COURSE INFORMATION",
    general: "Courses, schedules and aid stations may change for technical, weather or safety reasons, or at the direction of the relevant authorities.",
    stages: [
      { title: "STAGE 01 – XCC", date: "October 30, 2026", distance: "5.3 km · single lap", description: "The first stage is an XCC race with one 5.3 km lap. Starts are organized by category, with a maximum of 15 riders per heat." },
      { title: "STAGE 02 – XCM QUEEN STAGE", date: "October 31, 2026", distance: "81.1 km", elevation: "1,370 m", description: "The second stage is the XCM Queen Stage, combining rural roads, technical sectors and demanding climbs.", alt: "Stage 02 elevation profile: 81.1 km and 1,370 m elevation gain. Aid at km 25, 43 and 63; mechanical support at km 43." },
      { title: "STAGE 03 – XCM FINAL STAGE", date: "November 1, 2026", distance: "64 km", elevation: "670 m", description: "The third and final stage will decide the overall classification of Threerace Bike Ultramarathon Uruguay.", alt: "Stage 03 elevation profile: 64 km and 670 m elevation gain. Aid at km 18 and 44; mechanical support at km 44." },
    ],
  },
};

export default function UruguayStages({ language }: { language: Language }) {
  const t = copy[language];
  return (
    <div className={`official-copy ${styles.stages}`}>
      {t.stages.map((stage, index) => {
        const location = locations[index];
        const profile = `/uruguay-2026/perfil-etapa-0${index + 1}.png`;
        return (
          <section className={styles.stage} key={stage.title} aria-labelledby={`uruguay-stage-${index + 1}`}>
            <h4 id={`uruguay-stage-${index + 1}`}>{stage.title}</h4>
            <p>{t.date}: {stage.date}</p>
            <p>{t.start}: <strong>{location.name}</strong></p>
            <p>{t.address}: {location.address}</p>
            <a className={styles.map} href={location.map} target="_blank" rel="noopener noreferrer">{t.map} ↗</a>
            <p>{t.distance}: <strong>{stage.distance}</strong></p>
            {"elevation" in stage && <p>{t.elevation}: {stage.elevation}</p>}
            {index === 0 && (
              <div className={styles.notice}>
                <p><strong>{t.firstStart}: 13:30</strong></p>
                <p>{t.notice}</p>
              </div>
            )}
            <div className={styles.description}><p>{stage.description}</p></div>
            {stage.alt && (
              <figure className={styles.profile}>
                <a href={profile} target="_blank" rel="noopener noreferrer" aria-label={`${t.enlarge} — ${stage.title}`}>
                  <Image src={profile} alt={stage.alt} width={3240} height={720} unoptimized />
                </a>
                <figcaption><a href={profile} target="_blank" rel="noopener noreferrer">{t.enlarge} ↗</a></figcaption>
              </figure>
            )}
          </section>
        );
      })}
      <h4>{t.generalTitle}</h4>
      <p>{t.general}</p>
    </div>
  );
}
