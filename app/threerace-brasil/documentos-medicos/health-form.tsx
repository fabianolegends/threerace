"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { complementaryFields, healthQuestions, type HealthQuestionKey } from "./questions";

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
const initialDetails: Details = { registration: "", email: "", bloodType: "Não informado", emergencyContact: "", emergencyPhone: "", medications: "", allergies: "", observations: "" };
const bloodTypes = ["Não informado", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
const maxFileSize = 10 * 1024 * 1024;

function SectionHeading({ number, title, description }: { number: string; title: string; description: string }) {
  return <div className="br-medical-section-heading"><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></div>;
}

export default function HealthForm() {
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
      setFileError("Selecione um arquivo PDF, JPG ou PNG.");
      event.currentTarget.value = "";
      return;
    }
    if (file.size === 0 || file.size > maxFileSize) {
      setFileError(file.size === 0 ? "O arquivo está vazio. Selecione outro arquivo." : "O arquivo deve ter até 10 MB. Selecione um arquivo menor.");
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

  function reviewInformation(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    const form = formRef.current;
    if (!form) return;
    for (const name of ["registration", "emergencyContact"] as const) {
      const field = form.elements.namedItem(name) as HTMLInputElement;
      field.setCustomValidity(details[name].trim() ? "" : "Preencha este campo.");
    }
    const phone = form.elements.namedItem("emergencyPhone") as HTMLInputElement;
    const phoneDigits = details.emergencyPhone.replace(/\D/g, "");
    phone.setCustomValidity(phoneDigits.length >= 8 && phoneDigits.length <= 15 && /^[+\d\s().-]+$/.test(details.emergencyPhone) ? "" : "Informe um telefone de emergência com 8 a 15 dígitos, incluindo o DDD quando aplicável.");
    if (!form.reportValidity()) return;
    if (fileError) { fileRef.current?.focus(); return; }
    setReviewing(true);
  }

  return <>
    {!reviewing ? <nav className="br-medical-shortcuts" aria-label="Documentos médicos">
          <a href="#declaracao-saude"><span className="br-medical-shortcut-icon"><MedicalIcon kind="heart" /></span><span><strong>Declaração de saúde</strong><small>Preencha e revise as informações</small></span><MedicalIcon kind="arrow" /></a>
          <a href="#atestado-medico"><span className="br-medical-shortcut-icon"><MedicalIcon kind="document" /></span><span><strong>Atestado médico</strong><small>Baixe o modelo da prova</small></span><MedicalIcon kind="arrow" /></a>
        </nav> : null}
    <form ref={formRef} className="br-medical-form" autoComplete="off" onSubmit={reviewInformation} hidden={reviewing}>
      <section className="br-medical-card" id="declaracao-saude" aria-labelledby="declaration-title">
        <div className="br-medical-card-heading"><div><p className="br-medical-eyebrow">SEU HISTÓRICO, COM CUIDADO</p><h2 id="declaration-title" tabIndex={-1} ref={formHeadingRef}>Declaração de saúde</h2><p>Campos com <span aria-hidden="true">*</span> são obrigatórios. Responda às 12 perguntas.</p></div><span className="br-medical-heading-icon"><MedicalIcon kind="heart" /></span></div>
        <section className="br-medical-section" aria-label="Identificação e contato de emergência">
          <SectionHeading number="01" title="Identificação do atleta" description="Use o número e o e-mail informados na sua inscrição." />
          <div className="br-medical-fields">
            <label>Número do atleta / inscrição <span aria-hidden="true">*</span><input name="registration" value={details.registration} onChange={changeDetail} required maxLength={80} placeholder="Ex.: número informado na confirmação" /></label>
            <label>E-mail da inscrição <span aria-hidden="true">*</span><input name="email" type="email" value={details.email} onChange={changeDetail} required maxLength={254} placeholder="seuemail@exemplo.com" autoCapitalize="none" spellCheck={false} /></label>
            <label>Tipo sanguíneo <small>Opcional</small><select name="bloodType" value={details.bloodType} onChange={changeDetail}>{bloodTypes.map((type) => <option key={type}>{type}</option>)}</select></label>
          </div>
          <div className="br-medical-emergency"><p>Em caso de emergência</p><div className="br-medical-fields"><label>Contato de emergência <span aria-hidden="true">*</span><input name="emergencyContact" value={details.emergencyContact} onChange={changeDetail} required maxLength={160} placeholder="Nome da pessoa de contato" /></label><label>Telefone de emergência <span aria-hidden="true">*</span><input name="emergencyPhone" type="tel" inputMode="tel" value={details.emergencyPhone} onChange={changeDetail} required maxLength={30} placeholder="(00) 00000-0000" /></label></div></div>
        </section>
        <section className="br-medical-section" aria-label="Histórico de saúde">
          <SectionHeading number="02" title="Histórico de saúde" description="Escolha Sim ou Não em cada pergunta. Use as observações para complementar suas respostas." />
          <div className="br-medical-progress"><span>PERGUNTAS RESPONDIDAS</span><span>{Object.keys(answers).length} de {healthQuestions.length}</span></div>
          <div className="br-medical-question-list">{healthQuestions.map((question, index) => <fieldset className="br-medical-question" key={question.key}><legend><span className="br-medical-question-number">{String(index + 1).padStart(2, "0")}</span>{question.label} <span aria-hidden="true">*</span></legend><div className="br-medical-answers">{(["Sim", "Não"] as const).map((answer) => <label key={answer}><input type="radio" name={question.key} value={answer} checked={answers[question.key] === answer} onChange={() => setAnswers((current) => ({ ...current, [question.key]: answer }))} required /><span>{answer}</span></label>)}</div></fieldset>)}</div>
        </section>
        <section className="br-medical-section" aria-label="Informações complementares">
          <SectionHeading number="03" title="Informações complementares" description="Se necessário, detalhe as informações importantes para a equipe médica." />
          <div className="br-medical-fields br-medical-fields-full">{complementaryFields.map((field) => <label key={field.key}>{field.label} <small>Opcional</small><textarea name={field.key} value={details[field.key]} onChange={changeDetail} maxLength={2000} rows={3} placeholder={field.placeholder} /><span className="br-medical-character-count">Até 2.000 caracteres</span></label>)}</div>
        </section>
      </section>
      <section className="br-medical-card br-medical-certificate" id="atestado-medico" aria-labelledby="certificate-title">
        <div className="br-medical-card-heading"><div><p className="br-medical-eyebrow">DOCUMENTO DA PROVA</p><h2 id="certificate-title">Atestado médico</h2><p>Modelo para a modalidade Ultra. Apresentar acompanhado da Declaração de Saúde.</p></div><span className="br-medical-heading-icon"><MedicalIcon kind="document" /></span></div>
        <div className="br-medical-certificate-grid">
          <div className="br-medical-download"><h3>Baixe o modelo</h3><p>Leve o documento a um médico para avaliação, preenchimento e assinatura.</p><a className="br-medical-button br-medical-button-primary" href="/brasil-2027/atestado-medico-threerace-brasil-2027.pdf" download="atestado-medico-threerace-brasil-2027.pdf"><MedicalIcon kind="download" />Baixar atestado em PDF</a><span>THREERACE BRASIL 2027 · PDF</span></div>
          <div className="br-medical-file-area"><label htmlFor="medical-certificate">Atestado preenchido <small>Opcional nesta prévia</small></label><p id="certificate-help">Selecione um PDF, JPG ou PNG de até 10 MB. O arquivo permanece neste dispositivo e não será enviado.</p><input ref={fileRef} id="medical-certificate" type="file" accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png" onChange={selectCertificate} aria-describedby={`certificate-help${fileError ? " certificate-error" : ""}`} aria-invalid={!!fileError} /><div className="br-medical-file-feedback" aria-live="polite">{selectedFile ? <div className="br-medical-file-selected"><MedicalIcon kind="document" /><span><strong>{selectedFile.name}</strong><small>{(selectedFile.size / 1024 / 1024).toLocaleString("pt-BR", { maximumFractionDigits: 2 })} MB · selecionado apenas para a prévia</small></span><button type="button" onClick={removeCertificate} aria-label="Remover atestado selecionado">Remover</button></div> : null}{fileError ? <div className="br-medical-file-error"><p id="certificate-error" role="alert">{fileError}</p><button type="button" onClick={removeCertificate}>Continuar sem arquivo</button></div> : null}</div></div>
        </div>
      </section>
      <section className="br-medical-consent" aria-label="Confirmação das informações"><label><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.currentTarget.checked)} required name="consent" /><span>Declaro que as informações fornecidas são verdadeiras, completas e atualizadas. Autorizo o uso restrito destes dados pela organização da Threerace Brasil para segurança, atendimento médico e de emergência. Reconheço que esta declaração não substitui o atestado médico. <span aria-hidden="true">*</span></span></label><div className="br-medical-form-actions"><p>Esta etapa é apenas uma prévia.<br />Nenhuma informação será enviada.</p><button className="br-medical-button br-medical-button-primary" type="button" onClick={() => reviewInformation()}>Revisar informações<MedicalIcon kind="arrow" /></button></div></section>
    </form>
    {reviewing ? <section ref={reviewRef} tabIndex={-1} className="br-medical-card br-medical-review" aria-labelledby="review-title">
      <div className="br-medical-card-heading"><div><p className="br-medical-eyebrow">REVISÃO DA PRÉVIA</p><h2 id="review-title">Confira suas informações</h2><p>Revise os dados antes de voltar para ajustar o formulário.</p></div><span className="br-medical-heading-icon"><MedicalIcon kind="check" /></span></div>
      <div className="br-medical-review-body"><h3>Identificação e emergência</h3><dl className="br-medical-summary"><div><dt>Número do atleta / inscrição</dt><dd>{details.registration.trim()}</dd></div><div><dt>E-mail da inscrição</dt><dd>{details.email}</dd></div><div><dt>Tipo sanguíneo</dt><dd>{details.bloodType}</dd></div><div><dt>Contato de emergência</dt><dd>{details.emergencyContact.trim()}</dd></div><div><dt>Telefone de emergência</dt><dd>{details.emergencyPhone}</dd></div></dl><h3>Histórico de saúde</h3><dl className="br-medical-summary br-medical-summary-questions">{healthQuestions.map((question) => <div key={question.key}><dt>{question.label}</dt><dd>{answers[question.key]}</dd></div>)}</dl><h3>Informações complementares</h3><dl className="br-medical-summary br-medical-summary-full">{complementaryFields.map((field) => <div key={field.key}><dt>{field.label}</dt><dd>{details[field.key].trim() || "Não informado"}</dd></div>)}<div><dt>Atestado selecionado</dt><dd>{selectedFile ? selectedFile.name : "Nenhum arquivo selecionado"}</dd></div><div><dt>Declaração e autorização</dt><dd>Confirmadas nesta prévia.</dd></div></dl><p className="br-medical-review-status" role="status"><MedicalIcon kind="check" /><span>Prévia conferida. Nenhuma informação foi enviada.</span></p><button className="br-medical-button br-medical-button-primary" type="button" onClick={() => setReviewing(false)}><MedicalIcon kind="edit" />Editar informações</button></div>
    </section> : null}
  </>;
}
