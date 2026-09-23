import Image from "next/image";
import Link from "next/link";
import type { SiteLanguage } from "../../site-language";
import { brasilLanguageTags, brasilPath } from "../localization";
import { BrasilLanguageSwitcher } from "../language-switcher";
import HealthForm, { MedicalIcon } from "./health-form";
import { medicalCopy } from "./localization";
import "../brasil.css";
import "./medical.css";

export default function MedicalDocuments({ locale }: { locale: SiteLanguage }) {
  const t = medicalCopy[locale];
  return (
    <main className="brasil-event-page br-medical-page" lang={brasilLanguageTags[locale]}>
      <header className="br-medical-header br-medical-frame">
        <Link className="br-medical-brand" href={brasilPath(locale)} aria-label={`Threerace Brasil 2027 — ${t.back}`}>
          <Image src="/tr3-logo-display.webp" alt="Threerace" width={64} height={64} />
          <span>BRASIL <b>2027</b></span>
        </Link>
        <div className="br-medical-header-actions">
          <BrasilLanguageSwitcher locale={locale} medical />
          <Link className="br-medical-back" href={brasilPath(locale, "#documentacao")}><MedicalIcon kind="back" /> {t.back}</Link>
        </div>
      </header>
      <div className="br-medical-frame">
        <section className="br-medical-intro" aria-labelledby="medical-title">
          <p className="br-medical-eyebrow">{t.athleteArea}</p>
          <h1 id="medical-title">{t.heading[0]}<br />{t.heading[1]}</h1>
          <p>{t.introduction}</p>
        </section>
        <p className="br-medical-preview-notice"><MedicalIcon kind="info" /><span>{t.previewNotice}</span></p>
        <HealthForm locale={locale} />
        <footer className="br-medical-footer"><span>{t.signature}</span><span>{t.date}</span></footer>
      </div>
    </main>
  );
}
