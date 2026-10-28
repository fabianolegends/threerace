import styles from "./start-order.module.css";

type Language = "pt" | "es" | "en";

const copy = {
  pt: { title: "Ordem de largada — Stage 1 / XCC", description: "Confira sua bateria e seu horário antes de largar.", action: "Abrir PDF" },
  es: { title: "Orden de salida — Stage 1 / XCC", description: "Consultá tu tanda y tu horario antes de largar.", action: "Abrir PDF" },
  en: { title: "Start order — Stage 1 / XCC", description: "Check your heat and start time before the race.", action: "Open PDF" },
};

export default function StartOrder({ language, featured = false }: { language: Language; featured?: boolean }) {
  const t = copy[language];
  return (
    <a
      className={`${styles.startOrder} ${featured ? "" : styles.inline}`}
      href="/uruguay-2026/Largadas-Prologo-TR3-com-check.pdf"
      target="_blank"
      rel="noopener noreferrer"
      type="application/pdf"
      aria-label={`${t.title} — ${t.action}`}
    >
      <svg className={styles.icon} viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="3" width="22" height="26" rx="3" />
        <path d="m9 10 1.5 1.5L13 9M16 10h7m-14 7 1.5 1.5L13 16m3 1h7m-14 7 1.5 1.5L13 23m3 1h7" />
      </svg>
      <span className={styles.details}>
        <strong className={styles.title}>{t.title}</strong>
        <span className={styles.description}>{t.description}</span>
      </span>
      <span className={styles.action}>{t.action} <span aria-hidden="true">↗</span></span>
    </a>
  );
}
