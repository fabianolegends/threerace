"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type MouseEvent } from "react";

type SectionNavigation = {
  openId: string | null;
  targetId: string | null;
  animate: boolean;
  focusHeading: boolean;
};

function currentHash() {
  try {
    return decodeURIComponent(window.location.hash.slice(1));
  } catch {
    return "";
  }
}

export default function useSectionNavigation(sectionIds: readonly string[], closeMenu: () => void) {
  const [navigation, setNavigation] = useState<SectionNavigation>({ openId: null, targetId: null, animate: false, focusHeading: false });
  const lastUrl = useRef<string | null>(null);

  const navigate = useCallback((targetId: string, openId: string | null, hashId = targetId, focusHeading = false) => {
    if (currentHash() !== hashId) {
      // Let Next copy its history metadata and update its canonical URL.
      window.history.pushState(null, "", `#${encodeURIComponent(hashId)}`);
    }
    lastUrl.current = window.location.href;
    closeMenu();
    setNavigation({ openId, targetId, animate: true, focusHeading });
  }, [closeMenu]);

  const onSectionLinkClick = useCallback((event: MouseEvent<HTMLElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
    if (!anchor || !event.currentTarget.contains(anchor) || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self")) return;

    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search || !url.hash) return;
    let targetId: string;
    try {
      targetId = decodeURIComponent(url.hash.slice(1));
    } catch {
      return;
    }
    if (!document.getElementById(targetId)) return;

    event.preventDefault();
    navigate(targetId, sectionIds.includes(targetId) ? targetId : null, targetId, true);
  }, [navigate, sectionIds]);

  const toggleSection = useCallback((id: string) => {
    const isClosing = navigation.openId === id;
    navigate(id, isClosing ? null : id, isClosing ? "informacoes" : id);
  }, [navigate, navigation.openId]);

  useEffect(() => {
    const pageUrl = new URL(window.location.href);
    const isCurrentPage = () => window.location.pathname === pageUrl.pathname && window.location.search === pageUrl.search;
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const syncLocation = () => {
      if (!isCurrentPage()) return;
      if (lastUrl.current === window.location.href) return;
      lastUrl.current = window.location.href;
      const id = currentHash() || "top";
      setNavigation({ openId: sectionIds.includes(id) ? id : null, targetId: id, animate: false, focusHeading: false });
    };
    const syncHashChange = () => {
      if (!isCurrentPage()) return;
      // Native anchors outside this component also need a router-aware history entry.
      // replaceState does not emit hashchange, so this cannot create a listener loop.
      window.history.replaceState(null, "", window.location.href);
      syncLocation();
    };

    // A deep link must open its panel before its final position is measured.
    const initialFrame = window.requestAnimationFrame(() => {
      if (window.location.hash) syncLocation();
      else lastUrl.current = window.location.href;
    });
    window.addEventListener("hashchange", syncHashChange);
    window.addEventListener("popstate", syncLocation);
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener("hashchange", syncHashChange);
      window.removeEventListener("popstate", syncLocation);
      window.history.scrollRestoration = previousRestoration;
    };
  }, [sectionIds]);

  useLayoutEffect(() => {
    if (!navigation.targetId) return;
    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(navigation.targetId!);
      if (!target) return;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // State is committed here: collapsing the previous panel cannot move the destination afterwards.
      target.scrollIntoView({ block: "start", behavior: navigation.animate && !reducedMotion ? "smooth" : "instant" });
      if (navigation.focusHeading) {
        const trigger = target.querySelector<HTMLButtonElement>(":scope > h3 > .brasil-accordion-trigger");
        trigger?.focus({ preventScroll: true });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [navigation]);

  return { openInfo: navigation.openId, onSectionLinkClick, toggleSection };
}
