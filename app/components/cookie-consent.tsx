"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useSiteLanguage } from "../use-site-language";
import type { SiteLanguage } from "../site-language";
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

const CONSENT_CHANGE_EVENT = "threerace:consent-change";
function readConsent(): Consent {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "accepted" || saved === "rejected" ? saved : null;
  } catch { return null; }
}
function subscribeConsent(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(CONSENT_CHANGE_EVENT, listener);
  return () => { window.removeEventListener("storage", listener); window.removeEventListener(CONSENT_CHANGE_EVENT, listener); };
}
const subscribeReady = () => () => {};

export function CookieConsent() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null);
  const ready = useSyncExternalStore(subscribeReady, () => true, () => false);
  const [reopened, setReopened] = useState(false);
  const [sessionConsent, setSessionConsent] = useState<Consent>(null);
  const language = useSiteLanguage();
  const currentConsent = consent ?? sessionConsent;
  const isOpen = currentConsent === null || reopened;

  useEffect(() => {
    const openPreferences = () => setReopened(true);
    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
  }, []);

  function saveConsent(value: Exclude<Consent, null>) {
    try { window.localStorage.setItem(STORAGE_KEY, value); } catch { /* Keep the choice for this session when storage is unavailable. */ }
    setSessionConsent(value);
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
    setReopened(false);
  }
  if (!ready) return null;

  const t = copy[language];

  return (
    <>
      {currentConsent === "accepted" && <GoogleAnalytics />}

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
