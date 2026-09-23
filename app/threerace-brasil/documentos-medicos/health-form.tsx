"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { getComplementaryFields, getHealthQuestions, type HealthQuestionKey } from "./questions";
import type { SiteLanguage } from "../../site-language";
import { brasilLanguageTags } from "../localization";
import { medicalCertificatePath, medicalCopy } from "./localization";

type IconKind = "back" | "arrow" | "heart" | "document" | "download" | "check" | "info" | "edit";

export function MedicalIcon({ kind }: { kind: IconKind }) {
  const paths: Record<IconKind, ReactNode> = {
    back: <path d="m10 5-7 7 7 7M3 12h18" />,
    arrow: <path d="M7 7h10v10M7 17 17 7" />,
    heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /><path d="M3 11h4l2-3 3 7 2-4h7" /></>,
    document: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></>,
    download: <path d="M12 3v12m-5-5 5 5 5-5M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4" />,
    check: <path d="m5 12 4 4L19 6" />,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" /></>,
    edit: <path d="m15 4 5 5M4 20l5-1L20 8a3.5 3.5 0 0 0-5-5L4 14Z" />,
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[kind]}</svg>;
}

type Details = { registration: string; email: string; bloodType: string; emergencyContact: string; emergencyPhone: string; medications: string; allergies: string; observations: string };
const initialDetails: Details = { registration: "", email: "", bloodType: "", emergencyContact: "", emergencyPhone: "", medications: "", allergies: "", observations: "" };
const bloodTypes = ["", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const maxFileSize = 10 * 1024 * 1024;

function SectionHeading({ number, title, description }: { number: string; title: string; description: string }) {
  return <div className="br-medical-section-heading"><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></div>;
}

export default function HealthForm({ locale = "pt" }: { locale?: SiteLanguage }) {
  const t = medicalCopy[locale];
  const healthQuestions = getHealthQuestions(locale);
  const complementaryFields = getComplementaryFields(locale);
  const [details, setDetails] = useState<Details>(initialDetails);
  const [answers, setAnswers] = useState<Partial<Record<HealthQuestionKey, "Sim" | "Não">>>({});
  const [consent, setConsent] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: number } | null>(null);
  const [fileError, setFileError] = useState("");
  const [reviewing, setReviewing] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const reviewRef = useRef<HTMLElement>(null);
  const formHeadingRef = useRef<HTMLHeadingElement>(null);
  const previouslyReviewing = useRef(false);

  useEffect(() => {
    if (reviewing) reviewRef.current?.focus();
    else if (previouslyReviewing.current) formHeadingRef.current?.focus();
    previouslyReviewing.current = reviewing;
  }, [reviewing]);

  function changeDetail(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = event.currentTarget;
    event.currentTarget.setCustomValidity("");
    setDetails((current) => ({ ...current, [name]: value }));
  }

  function selectCertificate(event: ChangeEvent<HTMLInputElement>) {
    const file = event.currentTarget.files?.[0];
    setFileError("");
    setSelectedFile(null);
    if (!file) return;
    const supportedType = ["application/pdf", "image/jpeg", "image/png"].includes(file.type) || file.type === "";
    if (!/\.(pdf|jpe?g|png)$/i.test(file.name) || !supportedType) {
      setFileError(t.fileTypeError);
      event.currentTarget.value = "";
      return;
    }
    if (file.size === 0 || file.size > maxFileSize) {
      setFileError(file.size === 0 ? t.fileEmptyError : t.fileSizeError);
      event.currentTarget.value = "";
      return;
    }
    setSelectedFile({ name: file.name, size: file.size });
  }

  function removeCertificate() {
    setSelectedFile(null);
    setFileError("");
    if (fileRef.current) fileRef.current.value = "";
  }

  function localizeValidation(event: FormEvent<HTMLFormElement>) {
    const field = event.target as HTMLInputElement;
    if (field.validity.customError) return;
    if (field.validity.valueMissing) {
      field.setCustomValidity(field.type === "radio" ? t.answerError : field.type === "checkbox" ? t.consentError : t.requiredError);
    } else if (field.validity.typeMismatch) {
      field.setCustomValidity(t.emailError);
    }
  }

  function reviewInformation(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const form = formRef.current;
    if (!form) return;
    for (const field of Array.from(form.elements)) {
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement || field instanceof HTMLSelectElement) field.setCustomValidity("");
    }
    for (const name of ["registration", "emergencyContact"] as const) {
      const field = form.elements.namedItem(name) as HTMLInputElement;
      field.setCustomValidity(details[name].trim() ? "" : t.requiredError);
    }
    const phone = form.elements.namedItem("emergencyPhone") as HTMLInputElement;
    const phoneDigits = details.emergencyPhone.replace(/\D/g, "");
    phone.setCustomValidity(phoneDigits.length >= 8 && phoneDigits.length <= 15 && /^[+\d\s().-]+$/.test(details.emergencyPhone) ? "" : t.phoneError);
    if (!form.reportValidity()) return;
    if (fileError) { fileRef.current?.focus(); return; }
    setReviewing(true);
  }

  return <>
    {!reviewing ? <nav className="br-medical-shortcuts" aria-label={t.documents}>
          <a href="#declaracao-saude"><span className="br-medical-shortcut-icon"><MedicalIcon kind="heart" /></span><span><strong>{t.declaration}</strong><small>{t.fillReview}</small></span><MedicalIcon kind="arrow" /></a>
          <a href="#atestado-medico"><span className="br-medical-shortcut-icon"><MedicalIcon kind="document" /></span><span><strong>{t.certificate}</strong><small>{t.downloadShortcut}</small></span><MedicalIcon kind="arrow" /></a>
        </nav> : null}
    <form ref={formRef} className="br-medical-form" autoComplete="off" onSubmit={reviewInformation} onInvalid={localizeValidation} hidden={reviewing}>
      <section className="br-medical-card" id="declaracao-saude" aria-labelledby="declaration-title">
        <div className="br-medical-card-heading"><div><p className="br-medical-eyebrow">{t.historyEyebrow}</p><h2 id="declaration-title" tabIndex={-1} ref={formHeadingRef}>{t.declaration}</h2><p>{t.requiredFields}</p></div><span className="br-medical-heading-icon"><MedicalIcon kind="heart" /></span></div>
        <section className="br-medical-section" aria-label={t.identificationEmergency}>
          <SectionHeading number="01" title={t.identification} description={t.identificationHelp} />
          <div className="br-medical-fields">
            <label>{t.registration} <span aria-hidden="true">*</span><input name="registration" value={details.registration} onChange={changeDetail} required maxLength={80} placeholder={t.registrationPlaceholder} /></label>
            <label>{t.email} <span aria-hidden="true">*</span><input name="email" type="email" value={details.email} onChange={changeDetail} required maxLength={254} placeholder={t.emailPlaceholder} autoCapitalize="none" spellCheck={false} /></label>
            <label>{t.bloodType} <small>{t.optional}</small><select name="bloodType" value={details.bloodType} onChange={changeDetail}>{bloodTypes.map((type) => <option key={type} value={type}>{type || t.notProvided}</option>)}</select></label>
          </div>
          <div className="br-medical-emergency"><p>{t.emergency}</p><div className="br-medical-fields"><label>{t.emergencyContact} <span aria-hidden="true">*</span><input name="emergencyContact" value={details.emergencyContact} onChange={changeDetail} required maxLength={160} placeholder={t.contactPlaceholder} /></label><label>{t.emergencyPhone} <span aria-hidden="true">*</span><input name="emergencyPhone" type="tel" inputMode="tel" value={details.emergencyPhone} onChange={changeDetail} required maxLength={30} placeholder="(00) 00000-0000" /></label></div></div>
        </section>
        <section className="br-medical-section" aria-label={t.history}>
          <SectionHeading number="02" title={t.history} description={t.historyHelp} />
          <div className="br-medical-progress"><span>{t.answered}</span><span>{Object.keys(answers).length} {t.of} {healthQuestions.length}</span></div>
          <div className="br-medical-question-list">{healthQuestions.map((question, index) => <fieldset className="br-medical-question" key={question.key}><legend><span className="br-medical-question-number">{String(index + 1).padStart(2, "0")}</span>{question.label} <span aria-hidden="true">*</span></legend><div className="br-medical-answers">{(["Sim", "Não"] as const).map((answer) => <label key={answer}><input type="radio" name={question.key} value={answer} checked={answers[question.key] === answer} onChange={(event) => { event.currentTarget.setCustomValidity(""); setAnswers((current) => ({ ...current, [question.key]: answer })); }} required /><span>{answer === "Sim" ? t.yes : t.no}</span></label>)}</div></fieldset>)}</div>
        </section>
        <section className="br-medical-section" aria-label={t.complementary}>
          <SectionHeading number="03" title={t.complementary} description={t.complementaryHelp} />
          <div className="br-medical-fields br-medical-fields-full">{complementaryFields.map((field) => <label key={field.key}>{field.label} <small>{t.optional}</small><textarea name={field.key} value={details[field.key]} onChange={changeDetail} maxLength={2000} rows={3} placeholder={field.placeholder} /><span className="br-medical-character-count">{t.characterLimit}</span></label>)}</div>
        </section>
      </section>
      <section className="br-medical-card br-medical-certificate" id="atestado-medico" aria-labelledby="certificate-title">
        <div className="br-medical-card-heading"><div><p className="br-medical-eyebrow">{t.certificateEyebrow}</p><h2 id="certificate-title">{t.certificate}</h2><p>{t.certificateHelp}</p></div><span className="br-medical-heading-icon"><MedicalIcon kind="document" /></span></div>
        <div className="br-medical-certificate-grid">
          <div className="br-medical-download"><h3>{t.downloadTitle}</h3><p>{t.downloadHelp}</p><a className="br-medical-button br-medical-button-primary" href={medicalCertificatePath(locale)} download><MedicalIcon kind="download" />{t.download}</a><span>THREERACE BRASIL 2027 · PDF</span></div>
          <div className="br-medical-file-area"><label htmlFor="medical-certificate">{t.completedCertificate} <small>{t.optionalPreview}</small></label><p id="certificate-help">{t.fileHelp}</p><div className="br-medical-file-picker"><label className="br-medical-button br-medical-button-primary" htmlFor="medical-certificate">{t.chooseFile}</label><span>{selectedFile?.name ?? t.noFile}</span><input className="br-medical-native-file" ref={fileRef} id="medical-certificate" type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" onChange={selectCertificate} aria-describedby={`certificate-help${fileError ? " certificate-error" : ""}`} aria-invalid={!!fileError} /></div><div className="br-medical-file-feedback" aria-live="polite">{selectedFile ? <div className="br-medical-file-selected"><MedicalIcon kind="document" /><span><strong>{selectedFile.name}</strong><small>{(selectedFile.size / 1024 / 1024).toLocaleString(brasilLanguageTags[locale], { maximumFractionDigits: 2 })} MB · {t.previewSelected}</small></span><button type="button" onClick={removeCertificate} aria-label={t.removeLabel}>{t.remove}</button></div> : null}{fileError ? <div className="br-medical-file-error"><p id="certificate-error" role="alert">{fileError}</p><button type="button" onClick={removeCertificate}>{t.continueNoFile}</button></div> : null}</div></div>
        </div>
      </section>
      <section className="br-medical-consent" aria-label={t.confirmation}><label><input type="checkbox" checked={consent} onChange={(event) => { event.currentTarget.setCustomValidity(""); setConsent(event.currentTarget.checked); }} required name="consent" /><span>{t.consent} <span aria-hidden="true">*</span></span></label><div className="br-medical-form-actions"><p>{t.previewOnly}<br />{t.nothingSent}</p><button className="br-medical-button br-medical-button-primary" type="button" onClick={() => reviewInformation()}>{t.review}<MedicalIcon kind="arrow" /></button></div></section>
    </form>
    {reviewing ? <section ref={reviewRef} tabIndex={-1} className="br-medical-card br-medical-review" aria-labelledby="review-title">
      <div className="br-medical-card-heading"><div><p className="br-medical-eyebrow">{t.reviewEyebrow}</p><h2 id="review-title">{t.reviewTitle}</h2><p>{t.reviewHelp}</p></div><span className="br-medical-heading-icon"><MedicalIcon kind="check" /></span></div>
      <div className="br-medical-review-body"><h3>{t.summaryIdentification}</h3><dl className="br-medical-summary"><div><dt>{t.registration}</dt><dd>{details.registration.trim()}</dd></div><div><dt>{t.email}</dt><dd>{details.email}</dd></div><div><dt>{t.bloodType}</dt><dd>{details.bloodType || t.notProvided}</dd></div><div><dt>{t.emergencyContact}</dt><dd>{details.emergencyContact.trim()}</dd></div><div><dt>{t.emergencyPhone}</dt><dd>{details.emergencyPhone}</dd></div></dl><h3>{t.history}</h3><dl className="br-medical-summary br-medical-summary-questions">{healthQuestions.map((question) => <div key={question.key}><dt>{question.label}</dt><dd>{answers[question.key] === "Sim" ? t.yes : t.no}</dd></div>)}</dl><h3>{t.complementary}</h3><dl className="br-medical-summary br-medical-summary-full">{complementaryFields.map((field) => <div key={field.key}><dt>{field.label}</dt><dd>{details[field.key].trim() || t.notProvided}</dd></div>)}<div><dt>{t.selectedCertificate}</dt><dd>{selectedFile ? selectedFile.name : t.noFile}</dd></div><div><dt>{t.authorization}</dt><dd>{t.confirmed}</dd></div></dl><p className="br-medical-review-status" role="status"><MedicalIcon kind="check" /><span>{t.reviewed}</span></p><button className="br-medical-button br-medical-button-primary" type="button" onClick={() => setReviewing(false)}><MedicalIcon kind="edit" />{t.edit}</button></div>
    </section> : null}
  </>;
}
