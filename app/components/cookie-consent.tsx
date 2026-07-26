"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getSavedLanguage,
  SITE_LANGUAGE_CHANGE_EVENT,
  type SiteLanguage,
} from "../site-language";
import { GoogleAnalytics } from "./google-analytics";
import styles from "./cookie-consent.module.css";

type Consent = "accepted" | "rejected" | null;

const STORAGE_KEY = "threerace_cookie_consent";
const OPEN_PREFERENCES_EVENT = "threerace:open-privacy";

const copy = {
  pt: {
    label: "Preferências de privacidade",
    title: "Sua privacidade importa.",
    text:
      "Usamos cookies de análise para entender a navegação e melhorar a experiência. Você pode aceitar ou continuar apenas com os cookies essenciais.",
    policy: "Política de Privacidade",
    essential: "Apenas essenciais",
    accept: "Aceitar cookies",
  },
  es: {
    label: "Preferencias de privacidad",
    title: "Tu privacidad importa.",
    text:
      "Usamos cookies de análisis para comprender la navegación y mejorar la experiencia. Puedes aceptarlos o continuar solo con las cookies esenciales.",
    policy: "Política de Privacidad",
    essential: "Solo esenciales",
    accept: "Aceptar cookies",
  },
  en: {
    label: "Privacy preferences",
    title: "Your privacy matters.",
    text:
      "We use analytics cookies to understand navigation and improve your experience. You may accept them or continue with essential cookies only.",
    policy: "Privacy Policy",
    essential: "Essential only",
    accept: "Accept cookies",
  },
} satisfies Record<SiteLanguage, Record<string, string>>;

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<SiteLanguage>("pt");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Consent;
    setConsent(saved === "accepted" || saved === "rejected" ? saved : null);
    setIsOpen(saved !== "accepted" && saved !== "rejected");
    setLanguage(getSavedLanguage("pt"));
    setReady(true);
  }, []);

  useEffect(() => {
    const openPreferences = () => setIsOpen(true);
    const updateLanguage = (event: Event) => {
      setLanguage((event as CustomEvent<SiteLanguage>).detail);
    };

    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    window.addEventListener(SITE_LANGUAGE_CHANGE_EVENT, updateLanguage);

    return () => {
      window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
      window.removeEventListener(SITE_LANGUAGE_CHANGE_EVENT, updateLanguage);
    };
  }, []);

  function saveConsent(value: Exclude<Consent, null>) {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    setIsOpen(false);
  }

  if (!ready) return null;

  const t = copy[language];

  return (
    <>
      {consent === "accepted" && <GoogleAnalytics />}

      {isOpen ? (
        <section className={styles.banner} aria-label={t.label}>
          <div className={styles.copy}>
            <strong>{t.title}</strong>
            <p>
              {t.text}{" "}
              <Link href="/politica-de-privacidade">{t.policy}</Link>.
            </p>
          </div>
          <div className={styles.actions}>
            <button
              className={styles.secondary}
              type="button"
              onClick={() => saveConsent("rejected")}
            >
              {t.essential}
            </button>
            <button
              className={styles.primary}
              type="button"
              onClick={() => saveConsent("accepted")}
            >
              {t.accept}
            </button>
          </div>
        </section>
      ) : null}
    </>
  );
}
