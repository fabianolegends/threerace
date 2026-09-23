"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useSiteLanguage } from "../use-site-language";
import type { SiteLanguage } from "../site-language";
import { PrivacyPreferencesButton } from "./privacy-preferences-button";

const footerCopy = {
  pt: {
    community: "COMUNIDADE THREERACE",
    communityTitle: "RECEBA AS PRÓXIMAS LARGADAS.",
    communityText:
      "Novos eventos, abertura de inscrições e histórias dos territórios onde pedalamos.",
    email: "E-MAIL",
    requiredField: "Preencha este campo.",
    validEmail: "Informe um e-mail válido.",
    name: "NOME",
    namePlaceholder: "Seu nome",
    interest: "INTERESSE",
    allEvents: "Todos os eventos",
    partnerships: "Parcerias",
    subscribe: "QUERO RECEBER",
    sent: "Cadastro realizado! Você agora faz parte da Comunidade Threerace.",
    error: "Não foi possível concluir. Tente novamente em alguns instantes.",
    sending: "ENVIANDO...",
    footerBrand: "EVENTOS, ESPORTE E EXPERIÊNCIAS QUE VÃO MAIS LONGE.",
    explore: "EXPLORE",
    events: "Eventos",
    about: "Sobre a TR3",
    contact: "FALE COM A THREERACE",
    region: "BRASIL · URUGUAI · AMÉRICA DO SUL",
    privacy: "Privacidade",
  },
  es: {
    community: "COMUNIDAD THREERACE",
    communityTitle: "RECIBE LAS PRÓXIMAS LARGADAS.",
    communityText:
      "Nuevos eventos, apertura de inscripciones e historias de los territorios donde pedaleamos.",
    email: "CORREO ELECTRÓNICO",
    requiredField: "Completa este campo.",
    validEmail: "Introduce un correo electrónico válido.",
    name: "NOMBRE",
    namePlaceholder: "Tu nombre",
    interest: "INTERÉS",
    allEvents: "Todos los eventos",
    partnerships: "Alianzas",
    subscribe: "QUIERO RECIBIR",
    sent: "¡Registro realizado! Ya formas parte de la Comunidad Threerace.",
    error: "No fue posible completar el registro. Inténtalo de nuevo.",
    sending: "ENVIANDO...",
    footerBrand: "EVENTOS, DEPORTE Y EXPERIENCIAS QUE LLEGAN MÁS LEJOS.",
    explore: "EXPLORA",
    events: "Eventos",
    about: "Sobre TR3",
    contact: "HABLA CON THREERACE",
    region: "BRASIL · URUGUAY · AMÉRICA DEL SUR",
    privacy: "Privacidad",
  },
  en: {
    community: "THREERACE COMMUNITY",
    communityTitle: "GET THE NEXT START DATES.",
    communityText:
      "New events, registration openings and stories from the territories where we ride.",
    email: "EMAIL",
    requiredField: "Please fill in this field.",
    validEmail: "Enter a valid email address.",
    name: "NAME",
    namePlaceholder: "Your name",
    interest: "INTEREST",
    allEvents: "All events",
    partnerships: "Partnerships",
    subscribe: "KEEP ME POSTED",
    sent: "Registration complete! You are now part of the Threerace Community.",
    error: "We could not complete your registration. Please try again.",
    sending: "SENDING...",
    footerBrand: "EVENTS, SPORT AND EXPERIENCES THAT GO FURTHER.",
    explore: "EXPLORE",
    events: "Events",
    about: "About TR3",
    contact: "CONTACT THREERACE",
    region: "BRAZIL · URUGUAY · SOUTH AMERICA",
    privacy: "Privacy",
  },
} satisfies Record<SiteLanguage, Record<string, string>>;

export function GlobalSiteFooter() {
  const language = useSiteLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const t = footerCopy[language];

  async function submitNewsletter(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setStatus("sending");

    try {
      const response = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          interest: form.get("interest"),
          language,
        }),
      });

      if (!response.ok) throw new Error("Registration failed");

      formElement.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="global-site-footer" id="contato">
      <div className="footer-newsletter" id="comunidade">
        <div className="section-frame footer-newsletter-grid">
          <div>
            <p className="section-label">{t.community}</p>
            <h2>{t.communityTitle}</h2>
            <p>{t.communityText}</p>
          </div>
          <form onSubmit={submitNewsletter} onInvalid={(event) => {
            const field = event.target as HTMLInputElement;
            field.setCustomValidity(field.validity.typeMismatch ? t.validEmail : t.requiredField);
          }} onInput={(event) => {
            const field = event.target;
            if (field instanceof HTMLInputElement) field.setCustomValidity("");
          }}>
            <label>
              <span>{t.name}</span>
              <input
                name="name"
                type="text"
                placeholder={t.namePlaceholder}
                required
              />
            </label>
            <label>
              <span>{t.email}</span>
              <input
                name="email"
                type="email"
                placeholder={{ pt: "voce@email.com", es: "tu@email.com", en: "you@email.com" }[language]}
                required
              />
            </label>
            <label>
              <span>{t.interest}</span>
              <select name="interest" defaultValue={t.allEvents}>
                <option>{t.allEvents}</option>
                <option>Mountain bike</option>
                <option>Gravel</option>
                <option>{t.partnerships}</option>
              </select>
            </label>
            <button type="submit" disabled={status === "sending"}>
              {status === "sending" ? t.sending : t.subscribe}
            </button>
            {status === "sent" && (
              <p className="newsletter-success" role="status">
                {t.sent}
              </p>
            )}
            {status === "error" && (
              <p className="newsletter-success" role="alert">
                {t.error}
              </p>
            )}
          </form>
        </div>
      </div>
      <div className="section-frame footer-top corporate-footer">
        <div className="footer-brand">
          <img
            className="footer-logo"
            src="/tr3-logo-display.webp"
            width="512"
            height="512"
            alt="Threerace Sports"
            loading="lazy"
            decoding="async"
          />
          <p>{t.footerBrand}</p>
        </div>
        <div className="footer-nav">
          <p>{t.explore}</p>
          <Link href="/#eventos">{t.events}</Link>
          <Link href="/#historias">TR3 Journal</Link>
          <Link href="/#sobre">{t.about}</Link>
        </div>
        <div className="footer-contact">
          <p>{t.contact}</p>
          <a href="mailto:inscricoes@threerace.com.br">
            inscricoes@threerace.com.br
          </a>
          <a
            href="https://wa.me/5554992476721"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp +55 54 99247-6721
          </a>
        </div>
      </div>
      <div className="section-frame footer-bottom">
        <span>THREERACE SPORTS © 2026</span>
        <span>
          {t.region} · <PrivacyPreferencesButton label={t.privacy} />
        </span>
      </div>
    </footer>
  );
}
