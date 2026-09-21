"use client";

import { useRef, useState, type FormEvent } from "react";
import { BRAZIL_STATES, PRIORITY_CATEGORIES, validatePriorityRegistration } from "../../lib/priority-list-schema";
import { brasilEvent, priorityCampaign } from "./content";
import "./priority-signup.css";

export default function PrioritySignup() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const [modality, setModality] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const selectedFormat = PRIORITY_CATEGORIES.find((format) => format.id === modality);

  const fieldError = (field: string) => errors[field] ? <span className="brasil-priority-field-error" id={`priority-error-${field}`}>{errors[field]}</span> : null;
  const fieldAttributes = (field: string) => ({
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `priority-error-${field}` : undefined,
  });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const values = new FormData(form);
    const validation = validatePriorityRegistration({
      ...Object.fromEntries(values), consent: values.get("consent") === "on",
    });
    if (!validation.ok) {
      setErrors(validation.errors);
      const firstField = form.elements.namedItem(Object.keys(validation.errors)[0]);
      if (firstField instanceof HTMLElement) firstField.focus();
      return;
    }
    setErrors({});
    setPending(true);
    try {
      const response = await fetch("/api/brasil/priority-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        setErrors({ ...result.errors, form: result.error || "Não foi possível salvar agora. Tente novamente." });
        return;
      }
      setSaved(true);
      form.reset();
      setModality("");
      setCategory("");
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setErrors({ form: "Não recebemos a confirmação do cadastro. Confira sua conexão e tente novamente; o mesmo e-mail não será cadastrado duas vezes." });
    } finally {
      setPending(false);
    }
  }

  return <>
    <aside className="brasil-priority-callout" id="lista-prioritaria" aria-labelledby="priority-callout-title">
      <div>
        <h2 id="priority-callout-title">Lista prioritária</h2>
        <p><strong>DE {priorityCampaign.openingDate} A {priorityCampaign.closingDate}</strong> — valor diferenciado, até o limite de {priorityCampaign.vacancyLabel}.</p>
      </div>
      <button type="button" className="brasil-priority-open" onClick={() => dialogRef.current?.showModal()} aria-haspopup="dialog">QUERO ME CADASTRAR <span aria-hidden="true">↗</span></button>
    </aside>
    <dialog ref={dialogRef} className="brasil-priority-dialog" aria-labelledby="priority-title" aria-describedby="priority-description" onCancel={(event) => { if (pending) event.preventDefault(); }}>
      <div className="brasil-priority-dialog-header">
        <p className="brasil-priority-eyebrow">THREERACE BRASIL · 2027</p>
        <button className="brasil-priority-close" type="button" onClick={() => dialogRef.current?.close()} disabled={pending} aria-label="Fechar cadastro da lista prioritária">×</button>
      </div>
      <div className="brasil-priority-dialog-body">
        <h2 id="priority-title">Entre na lista prioritária.</h2>
        <p id="priority-description">Acesso prioritário de <strong>{priorityCampaign.openingDate} a {priorityCampaign.closingDate}</strong>, com valor diferenciado. Limite de <strong>{priorityCampaign.vacancyLabel}</strong>, ou até a data final, o que ocorrer primeiro.</p>
        {saved ? <div className="brasil-priority-success" role="status">
          <span aria-hidden="true">✓</span>
          <h3 ref={successRef} tabIndex={-1}>Seu interesse está registrado!</h3>
          <p>A Threerace usará o e-mail ou telefone cadastrado para enviar as informações de acesso.</p>
          <p>Se esse e-mail já estava na lista, o cadastro anterior foi mantido. Para corrigir seus dados, fale com <a href={`mailto:${brasilEvent.email}`}>{brasilEvent.email}</a>.</p>
          <p>O cadastro na lista não confirma sua inscrição na prova.</p>
          <button type="button" className="brasil-priority-submit" onClick={() => dialogRef.current?.close()}>CONCLUÍDO</button>
        </div> : <form onSubmit={submit} noValidate aria-busy={pending}>
          <fieldset disabled={pending} className="brasil-priority-fields">
            <legend className="brasil-priority-sr-only">Dados para a lista prioritária</legend>
            <label className="brasil-priority-full">Nome completo
              <input name="fullName" autoComplete="name" maxLength={120} required {...fieldAttributes("fullName")} />{fieldError("fullName")}
            </label>
            <label>E-mail
              <input name="email" type="email" autoComplete="email" autoCapitalize="none" spellCheck={false} maxLength={254} required {...fieldAttributes("email")} />{fieldError("email")}
            </label>
            <label>Telefone com DDD
              <input name="phone" type="tel" autoComplete="tel" maxLength={24} placeholder="(54) 99999-9999" required {...fieldAttributes("phone")} />{fieldError("phone")}
            </label>
            <label>Cidade
              <input name="city" autoComplete="address-level2" maxLength={100} required {...fieldAttributes("city")} />{fieldError("city")}
            </label>
            <label>Estado
              <select name="state" autoComplete="address-level1" defaultValue="" required {...fieldAttributes("state")}>
                <option value="" disabled>Selecione seu estado</option>
                {BRAZIL_STATES.map(([code, name]) => <option key={code} value={code}>{name} · {code}</option>)}
              </select>{fieldError("state")}
            </label>
            <label>Modalidade
              <select name="modality" value={modality} required {...fieldAttributes("modality")} onChange={(event) => { setModality(event.target.value); setCategory(""); }}>
                <option value="" disabled>Escolha Ultra ou Sport</option>
                {PRIORITY_CATEGORIES.map((format) => <option key={format.id} value={format.id}>{format.name}</option>)}
              </select>{fieldError("modality")}
            </label>
            <label>Categoria pretendida
              <select name="category" value={category} required disabled={!selectedFormat} {...fieldAttributes("category")} onChange={(event) => setCategory(event.target.value)}>
                <option value="" disabled>{selectedFormat ? "Escolha sua categoria" : "Escolha a modalidade primeiro"}</option>
                {selectedFormat?.groups.map((group) => <optgroup key={group.name} label={group.name}>{group.options.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</optgroup>)}
              </select>{fieldError("category")}
            </label>
            <label className="brasil-priority-consent brasil-priority-full">
              <input type="checkbox" name="consent" required {...fieldAttributes("consent")} />
              <span>Quero receber da Threerace as informações de acesso prioritário por e-mail ou telefone.{fieldError("consent")}</span>
            </label>
          </fieldset>
          <p className="brasil-priority-privacy">Mora fora do Brasil? Selecione Exterior em Estado e informe sua cidade e país no campo Cidade.</p>
          <p className="brasil-priority-privacy">Usaremos estes dados para organizar a lista e entrar em contato sobre as inscrições. Para corrigir ou remover seu cadastro, fale com <a href={`mailto:${brasilEvent.email}`}>{brasilEvent.email}</a>.</p>
          {errors.form && <p className="brasil-priority-form-error" role="alert">{errors.form}</p>}
          <button type="submit" className="brasil-priority-submit" disabled={pending}>{pending ? "SALVANDO CADASTRO…" : "ENTRAR NA LISTA PRIORITÁRIA"}</button>
          <p className="brasil-priority-disclaimer">Todos os campos são obrigatórios. Este cadastro é para acesso prioritário e não confirma a inscrição na prova.</p>
        </form>}
      </div>
    </dialog>
  </>;
}
