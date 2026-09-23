"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { getSavedLanguage, SITE_LANGUAGE_CHANGE_EVENT, type SiteLanguage } from "./site-language";

function subscribe(listener: () => void) {
  window.addEventListener(SITE_LANGUAGE_CHANGE_EVENT, listener);
  window.addEventListener("storage", listener);
  return () => { window.removeEventListener(SITE_LANGUAGE_CHANGE_EVENT, listener); window.removeEventListener("storage", listener); };
}

export function useSiteLanguage(fallback: SiteLanguage = "pt", forced?: SiteLanguage): SiteLanguage {
  const pathname = usePathname();
  const saved = useSyncExternalStore(subscribe, () => getSavedLanguage(fallback), () => fallback);
  // A direct Brazil URL always wins over a language saved on a different page.
  const match = pathname?.match(/^\/(?:(pt|es|en)\/)?threerace-brasil(?:\/|$)/);
  return forced ?? (match ? (match[1] as SiteLanguage | undefined) ?? "pt" : saved);
}
