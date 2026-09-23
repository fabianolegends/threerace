"use client";

import { createContext, useCallback, useContext, useRef, useState, type FormEvent, type ReactNode } from "react";
import { PRIORITY_CATEGORIES, validatePriorityRegistration } from "../../lib/priority-list-schema";
import type { SiteLanguage } from "../site-language";
import { getBrasilContent } from "./content-i18n";
import { componentText, translatePriorityError } from "./components-i18n";
import "./priority-signup.css";

const PrioritySignupContext = createContext<(() => void) | null>(null);

export function PrioritySignupButton({ children, className = "brasil-priority-open" }: { children: ReactNode; className?: string }) {
  const openSignup = useContext(PrioritySignupContext);
  return <button type="button" className={className} onClick={() => openSignup?.()} aria-haspopup="dialog">{children}</button>;
}

export default function PrioritySignup({ placement = "hero", locale = "pt" }: { placement?: "hero" | "prices"; locale?: SiteLanguage }) {
  const { priorityCampaign } = getBrasilContent(locale);
  const t = componentText(locale);
  const titleId = `priority-callout-title-${placement}`;
  return <aside className={`brasil-priority-callout${placement === "prices" ? " brasil-priority-callout-prices" : ""}`} id={placement === "hero" ? "lista-prioritaria" : undefined} aria-labelledby={titleId}>
    <div>
      {placement === "hero" ? <h2 id={titleId}>{t("Lista prioritária")}</h2> : <h4 id={titleId}>{t("Garanta seu acesso ao lote prioritário")}</h4>}
      <p><strong>{t("DE {opening} A {closing}", { opening: priorityCampaign.openingDate, closing: priorityCampaign.closingDate })}</strong> — {t("valor diferenciado, até o limite de {vacancies}.", { vacancies: priorityCampaign.vacancyLabel })}</p>
      {placement === "prices" && <p className="brasil-priority-callout-disclaimer">{t("Cadastre seu interesse para receber as informações de acesso. O cadastro não confirma a inscrição na prova.")}</p>}
    </div>
    <PrioritySignupButton>{t("QUERO ME CADASTRAR")} <span aria-hidden="true">↗</span></PrioritySignupButton>
  </aside>;
}

export function PrioritySignupProvider({ children, locale = "pt" }: { children: ReactNode; locale?: SiteLanguage }) {
  const { brasilEvent, priorityCampaign, competitionCategories } = getBrasilContent(locale);
  const t = componentText(locale);
  // Display translated labels while submitting the original IDs accepted by the API.
  const categories = PRIORITY_CATEGORIES.map((format, formatIndex) => ({
    ...format,
    name: competitionCategories[formatIndex].name,
    groups: format.groups.map((group, groupIndex) => {
      const translated = competitionCategories[formatIndex].groups[groupIndex];
      return {
        ...group,
        name: translated.title,
        options: group.options.map((option, categoryIndex) => ({
          ...option,
          label: `${translated.categories[categoryIndex].name} · ${translated.categories[categoryIndex].age}`,
        })),
      };
    }),
  }));
  const localizeErrors = (errors: Record<string, unknown>) => Object.fromEntries(
    Object.entries(errors).map(([field, message]) => [field, translatePriorityError(message, locale)]),
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const openSignup = useCallback(() => dialogRef.current?.showModal(), []);
  const [modality, setModality] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const selectedFormat = categories.find((format) => format.id === modality);

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
      setErrors(localizeErrors(validation.errors));
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
        setErrors({ ...localizeErrors(result.errors ?? {}), form: translatePriorityError(result.error, locale) });
        return;
      }
      setSaved(true);
      form.reset();
      setModality("");
      setCategory("");
      requestAnimationFrame(() => successRef.current?.focus());
    } catch {
      setErrors({ form: t("Não recebemos a confirmação do cadastro. Confira sua conexão e tente novamente; o mesmo e-mail não será cadastrado duas vezes.") });
    } finally {
      setPending(false);
    }
  }

  return <PrioritySignupContext.Provider value={openSignup}>
    {children}
    <dialog ref={dialogRef} className="brasil-priority-dialog" aria-labelledby="priority-title" aria-describedby="priority-description" onCancel={(event) => { if (pending) event.preventDefault(); }}>
      <div className="brasil-priority-dialog-header">
        <p className="brasil-priority-eyebrow">THREERACE BRASIL · 2027</p>
        <button className="brasil-priority-close" type="button" onClick={() => dialogRef.current?.close()} disabled={pending} aria-label={t("Fechar cadastro da lista prioritária")}>×</button>
      </div>
      <div className="brasil-priority-dialog-body">
        <h2 id="priority-title">{t("Entre na lista prioritária.")}</h2>
        <p id="priority-description">{t("Acesso prioritário de")} <strong>{priorityCampaign.openingDate} {t("a")} {priorityCampaign.closingDate}</strong>{t(", com valor diferenciado. Limite de")} <strong>{priorityCampaign.vacancyLabel}</strong>{t(", ou até a data final, o que ocorrer primeiro.")}</p>
        {saved ? <div className="brasil-priority-success" role="status">
          <span aria-hidden="true">✓</span>
          <h3 ref={successRef} tabIndex={-1}>{t("Seu interesse está registrado!")}</h3>
          <p>{t("A Threerace usará o e-mail ou telefone cadastrado para enviar as informações de acesso.")}</p>
          <p>{t("Se esse e-mail já estava na lista, o cadastro anterior foi mantido. Para corrigir seus dados, fale com")} <a href={`mailto:${brasilEvent.email}`}>{brasilEvent.email}</a>.</p>
          <p>{t("O cadastro na lista não confirma sua inscrição na prova.")}</p>
          <button type="button" className="brasil-priority-submit" onClick={() => dialogRef.current?.close()}>{t("CONCLUÍDO")}</button>
        </div> : <form onSubmit={submit} noValidate aria-busy={pending}>
          <fieldset disabled={pending} className="brasil-priority-fields">
            <legend className="brasil-priority-sr-only">{t("Dados para a lista prioritária")}</legend>
            <label className="brasil-priority-full">{t("Nome completo")}
              <input name="fullName" autoComplete="name" maxLength={120} required {...fieldAttributes("fullName")} />{fieldError("fullName")}
            </label>
            <label>{t("E-mail")}
              <input name="email" type="email" autoComplete="email" autoCapitalize="none" spellCheck={false} maxLength={254} required {...fieldAttributes("email")} />{fieldError("email")}
            </label>
            <label>{t("Telefone com DDD")}
              <input name="phone" type="tel" autoComplete="tel" maxLength={24} placeholder="(54) 99999-9999" required {...fieldAttributes("phone")} />{fieldError("phone")}
            </label>
            <label>{t("Cidade")}
              <input name="city" autoComplete="address-level2" maxLength={100} required {...fieldAttributes("city")} />{fieldError("city")}
            </label>
            <label>{t("País")}
              <input name="country" autoComplete="country-name" maxLength={80} placeholder={t("Brasil")} required {...fieldAttributes("country")} />{fieldError("country")}
            </label>
            <label>{t("Modalidade")}
              <select name="modality" value={modality} required {...fieldAttributes("modality")} onChange={(event) => { setModality(event.target.value); setCategory(""); }}>
                <option value="" disabled>{t("Escolha Ultra ou Sport")}</option>
                {categories.map((format) => <option key={format.id} value={format.id}>{format.name}</option>)}
              </select>{fieldError("modality")}
            </label>
            <label>{t("Categoria pretendida")}
              <select name="category" value={category} required disabled={!selectedFormat} {...fieldAttributes("category")} onChange={(event) => setCategory(event.target.value)}>
                <option value="" disabled>{selectedFormat ? t("Escolha sua categoria") : t("Escolha a modalidade primeiro")}</option>
                {selectedFormat?.groups.map((group) => <optgroup key={group.name} label={group.name}>{group.options.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</optgroup>)}
              </select>{fieldError("category")}
            </label>
            <label className="brasil-priority-consent brasil-priority-full">
              <input type="checkbox" name="consent" required {...fieldAttributes("consent")} />
              <span>{t("Quero receber da Threerace as informações de acesso prioritário por e-mail ou telefone.")}{fieldError("consent")}</span>
            </label>
          </fieldset>
          <p className="brasil-priority-privacy">{t("Informe a cidade e o país onde você mora para organizarmos contatos do Brasil e do exterior.")}</p>
          <p className="brasil-priority-privacy">{t("Usaremos estes dados para organizar a lista e entrar em contato sobre as inscrições. Para corrigir ou remover seu cadastro, fale com")} <a href={`mailto:${brasilEvent.email}`}>{brasilEvent.email}</a>.</p>
          {errors.form && <p className="brasil-priority-form-error" role="alert">{errors.form}</p>}
          <button type="submit" className="brasil-priority-submit" disabled={pending}>{pending ? t("SALVANDO CADASTRO…") : t("ENTRAR NA LISTA PRIORITÁRIA")}</button>
          <p className="brasil-priority-disclaimer">{t("Todos os campos são obrigatórios. Este cadastro é para acesso prioritário e não confirma a inscrição na prova.")}</p>
        </form>}
      </div>
    </dialog>
  </PrioritySignupContext.Provider>;
}
