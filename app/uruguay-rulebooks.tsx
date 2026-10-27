import styles from "./uruguay-rulebooks.module.css";

type Language = "pt" | "es" | "en";
type Event = "ultra" | "gravel";

const documents: Record<Event, Record<Language, string>> = {
  ultra: {
    pt: "/regulamentos-2026/ultra-pt-2026-10-26.pdf",
    es: "/regulamentos-2026/ultra-es-2026-10-26.pdf",
    en: "/regulamentos-2026/ultra-en-2026-10-27.pdf",
  },
  gravel: {
    pt: "/regulamentos-2026/gravel-pt-2026-10-27.pdf",
    es: "/regulamentos-2026/gravel-es-2026-10-26.pdf",
    en: "/regulamentos-2026/gravel-en-2026-10-27.pdf",
  },
};

const languages: { code: Language; label: string }[] = [
  { code: "pt", label: "Português" },
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
];

const copy = {
  pt: { title: "REGULAMENTOS OFICIAIS", open: "ABRIR PDF" },
  es: { title: "REGLAMENTOS OFICIALES", open: "ABRIR PDF" },
  en: { title: "OFFICIAL RULEBOOKS", open: "OPEN PDF" },
};

export function getRulebookUrl(event: Event, language: Language) {
  return documents[event][language];
}

export default function UruguayRulebooks({ event, language }: { event: Event; language: Language }) {
  const t = copy[language];
  const ordered = [
    ...languages.filter((item) => item.code === language),
    ...languages.filter((item) => item.code !== language),
  ];

  return (
    <div className={styles.rulebooks}>
      <h4>{t.title} · {event === "ultra" ? "ULTRA" : "GRAVEL EXPERIENCE"}</h4>
      <ul className={styles.documents}>
        {ordered.map(({ code, label }) => (
          <li key={code}>
            <a href={getRulebookUrl(event, code)} hrefLang={code} type="application/pdf" target="_blank" rel="noopener noreferrer">
              <strong lang={code}>{label}</strong>
              <span>{t.open} <span aria-hidden="true">↗</span></span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
