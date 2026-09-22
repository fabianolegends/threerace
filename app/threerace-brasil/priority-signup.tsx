"use client";

import { createContext, useCallback, useContext, useRef, useState, type FormEvent, type ReactNode } from "react";
import { BRAZIL_STATES, PRIORITY_CATEGORIES, validatePriorityRegistration } from "../../lib/priority-list-schema";
import { priorityCampaign } from "./content";
import "./priority-signup.css";

const PrioritySignupContext = createContext<(() => void) | null>(null);

export function PrioritySignupButton({ children, className = "brasil-priority-open" }: { children: ReactNode; className?: string }) {
  const openSignup = useContext(PrioritySignupContext);
  return <button type="button" className={className} onClick={() => openSignup?.()} aria-haspopup="dialog">{children}</button>;
}

export default function PrioritySignup({ placement = "hero" }: { placement?: "hero" | "prices" }) {
  const titleId = `priority-callout-title-${placement}`;
  return <aside className={`brasil-priority-callout${placement === "prices" ? " brasil-priority-callout-prices" : ""}`} id={placement === "hero" ? "lista-prioritaria" : undefined} aria-labelledby={titleId}>
    <div>
      {placement === "hero" ? <h2 id={titleId}>Lista prioritária</h2> : <h4 id={titleId}>Acesso ao lote prioritário</h4>}
      <p><strong>DE {priorityCampaign.openingDate} A {priorityCampaign.closingDate}</strong> — valor diferenciado, até o limite de {priorityCampaign.vacancyLabel}.</p>
      <p className="brasil-priority-callout-disclaimer">Prévia interna para a equipe. O formulário é demonstrativo e não salva cadastros.</p>
    </div>
    <PrioritySignupButton>TESTAR CADASTRO <span aria-hidden="true">↗</span></PrioritySignupButton>
  </aside>;
}

export function PrioritySignupProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const openSignup = useCallback(() => dialogRef.current?.showModal(), []);
  const [modality, setModality] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reviewed, setReviewed] = useState(false);
  const selectedFormat = PRIORITY_CATEGORIES.find((format) => format.id === modality);

  const fieldError = (field: string) => errors[field] ? <span className="brasil-priority-field-error" id={`priority-error-${field}`}>{errors[field]}</span> : null;
  const fieldAttributes = (field: string) => ({
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? `priority-error-${field}` : undefined,
  });

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
    form.reset();
    setModality("");
    setCategory("");
    setReviewed(true);
    requestAnimationFrame(() => successRef.current?.focus());
  }

  return <PrioritySignupContext.Provider value={openSignup}>
    {children}
    <dialog ref={dialogRef} className="brasil-priority-dialog" aria-labelledby="priority-title" aria-describedby="priority-description priority-demo-notice">
      <div className="brasil-priority-dialog-header">
        <p className="brasil-priority-eyebrow">THREERACE BRASIL · 2027</p>
        <button className="brasil-priority-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Fechar cadastro da lista prioritária">×</button>
      </div>
      <div className="brasil-priority-dialog-body">
        <h2 id="priority-title">Teste da lista prioritária.</h2>
        <p id="priority-description">Acesso prioritário de <strong>{priorityCampaign.openingDate} a {priorityCampaign.closingDate}</strong>, com valor diferenciado. Limite de <strong>{priorityCampaign.vacancyLabel}</strong>, ou até a data final, o que ocorrer primeiro.</p>
        <p id="priority-demo-notice" className="brasil-priority-demo-notice"><strong>Demonstração para a equipe.</strong> Use dados fictícios. Nenhuma informação será enviada ou salva e nenhum contato será realizado.</p>
        {reviewed ? <div className="brasil-priority-success" role="status">
          <span aria-hidden="true">✓</span>
          <h3 ref={successRef} tabIndex={-1}>Teste conferido.</h3>
          <p>Os campos passaram pela validação. Nenhum cadastro foi criado e os dados preenchidos foram descartados.</p>
          <button type="button" className="brasil-priority-submit" onClick={() => setReviewed(false)}>TESTAR NOVAMENTE</button>
        </div> : <form onSubmit={submit} noValidate autoComplete="off">
          <fieldset className="brasil-priority-fields">
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
              <span>Quero receber da Threerace as informações de acesso prioritário por e-mail ou telefone. Nesta demonstração, esta confirmação também é apenas um teste.{fieldError("consent")}</span>
            </label>
          </fieldset>
          <p className="brasil-priority-privacy">Mora fora do Brasil? Selecione Exterior em Estado e informe sua cidade e país no campo Cidade.</p>
          <button type="submit" className="brasil-priority-submit">VALIDAR DEMONSTRAÇÃO</button>
          <p className="brasil-priority-disclaimer">Todos os campos são obrigatórios para testar a validação. Esta prévia não cadastra participantes nem reserva vagas.</p>
        </form>}
      </div>
    </dialog>
  </PrioritySignupContext.Provider>;
}
