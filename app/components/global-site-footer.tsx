"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  getSavedLanguage,
  SITE_LANGUAGE_CHANGE_EVENT,
  type SiteLanguage,
} from "../site-language";
import { PrivacyPreferencesButton } from "./privacy-preferences-button";

const footerCopy = {
  pt: {
    community: "COMUNIDADE THREERACE",
    communityTitle: "RECEBA AS PRÓXIMAS LARGADAS.",
    communityText:
      "Novos eventos, abertura de inscrições e histórias dos territórios onde pedalamos.",
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
  const [language, setLanguage] = useState<SiteLanguage>("pt");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    setLanguage(getSavedLanguage("pt"));
    const updateLanguage = (event: Event) => {
      setLanguage((event as CustomEvent<SiteLanguage>).detail);
    };
    window.addEventListener(SITE_LANGUAGE_CHANGE_EVENT, updateLanguage);
    return () =>
      window.removeEventListener(SITE_LANGUAGE_CHANGE_EVENT, updateLanguage);
  }, []);

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
          <form onSubmit={submitNewsletter}>
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
              <span>E-MAIL</span>
              <input
                name="email"
                type="email"
                placeholder="voce@email.com"
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
          <a href="/#eventos">{t.events}</a>
          <a href="/#historias">TR3 Journal</a>
          <a href="/#sobre">{t.about}</a>
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
