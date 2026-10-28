"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./uruguay-briefing.module.css";

type Language = "pt" | "es" | "en";
type Briefing = "xcc" | "rainha" | "final" | "gravel";

const videoIds: Record<Briefing, string> = {
  xcc: "Fj6_T2n7w0Q",
  rainha: "fSS9Vvip5NY",
  final: "HAEpGkBjPqk",
  gravel: "em8gXZ0zEAk",
};

const copy = {
  pt: {
    heading: "Briefing da etapa", both: "Briefing das duas etapas",
    names: { xcc: "Stage 01 · XCC", rainha: "Stage 02 · Etapa Rainha", final: "Etapa Final / Short", gravel: "Gravel Experience" },
    description: "Confira o percurso, os horários e as orientações antes de largar.",
    languages: "Narração em espanhol · Legendas em português",
    watch: "Assistir ao briefing", youtube: "Abrir no YouTube", close: "Fechar vídeo",
    gpsTitle: "Gravel: navegação obrigatória pelo GPS",
    gps: "Siga o track oficial da sua etapa no GPS. As marcações pertencem ao MTB e podem aparecer em trechos compartilhados. Grave e salve sua atividade: o comissário ou diretor de prova poderá exigir a comprovação do percurso na chegada.",
  },
  es: {
    heading: "Briefing de la etapa", both: "Briefing de las dos etapas",
    names: { xcc: "Stage 01 · XCC", rainha: "Stage 02 · Etapa Reina", final: "Etapa Final / Short", gravel: "Gravel Experience" },
    description: "Revisá el recorrido, los horarios y las indicaciones antes de largar.",
    languages: "Narración en español · Subtítulos en portugués",
    watch: "Ver el briefing", youtube: "Abrir en YouTube", close: "Cerrar video",
    gpsTitle: "Gravel: navegación obligatoria por GPS",
    gps: "Seguí el track oficial de tu etapa en el GPS. Las marcas pertenecen al MTB y pueden aparecer en tramos compartidos. Grabá y guardá tu actividad: el comisario o director de carrera podrá exigir la comprobación del recorrido en la llegada.",
  },
  en: {
    heading: "Stage briefing", both: "Briefing for both stages",
    names: { xcc: "Stage 01 · XCC", rainha: "Stage 02 · Queen Stage", final: "Final Stage / Short", gravel: "Gravel Experience" },
    description: "Review the course, start times and instructions before the race.",
    languages: "Spanish narration · Portuguese subtitles",
    watch: "Watch the briefing", youtube: "Open on YouTube", close: "Close video",
    gpsTitle: "Gravel: GPS navigation is mandatory",
    gps: "Follow your stage’s official track on your GPS. Course markings belong to the MTB route and may appear on shared sections. Record and save your activity: the commissaire or race director may require proof of your route at the finish.",
  },
};

function PlayIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7z" fill="currentColor" /></svg>;
}

export default function UruguayBriefing({ language, video }: { language: Language; video: Briefing }) {
  const t = copy[language];
  const videoId = videoIds[video];
  const title = t.names[video];
  const id = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      openerRef.current?.focus();
    };
  }, [isOpen]);

  const openVideo = () => {
    openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setIsOpen(true);
  };

  return (
    <div className={styles.briefing} data-briefing={video}>
      <div className={styles.card}>
        <button className={styles.cover} type="button" onClick={openVideo} aria-label={`${t.watch} — ${title}`} aria-haspopup="dialog">
          <Image className={styles.coverImage} src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`} alt="" width={480} height={360} unoptimized />
          <span className={styles.play}><PlayIcon /></span>
        </button>
        <div className={styles.details}>
          <p className={styles.kicker}>{video === "gravel" ? t.both : t.heading}</p>
          <h5 className={styles.title}>{title}</h5>
          <p className={styles.description}>{t.description}</p>
          <p className={styles.languages}>{t.languages}</p>
          <div className={styles.actions}>
            <button className={styles.watch} type="button" onClick={openVideo} aria-haspopup="dialog"><PlayIcon />{t.watch}</button>
            <a className={styles.external} href={youtubeUrl} target="_blank" rel="noopener noreferrer">{t.youtube} ↗</a>
          </div>
        </div>
      </div>
      {video === "gravel" && <div className={styles.notice}><strong>{t.gpsTitle}</strong><p>{t.gps}</p></div>}
      {isOpen && createPortal(
        <dialog ref={dialogRef} className={styles.dialog} aria-labelledby={`${id}-title`} onClose={() => setIsOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
          <div className={styles.dialogBody}>
            <div className={styles.dialogHeader}>
              <h2 id={`${id}-title`}>{title}</h2>
              <button className={styles.close} type="button" onClick={() => dialogRef.current?.close()} aria-label={t.close}>×</button>
            </div>
            <div className={styles.player}>
              <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=0&rel=0&playsinline=1&hl=${language}`} title={`${t.heading} — ${title}`} allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
            </div>
            <a className={styles.playerLink} href={youtubeUrl} target="_blank" rel="noopener noreferrer">{t.youtube} ↗</a>
          </div>
        </dialog>, document.body,
      )}
    </div>
  );
}
