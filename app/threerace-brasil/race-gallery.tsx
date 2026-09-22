"use client";

import Image from "next/image";
import { useId, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent, type TouchEvent } from "react";
import "./race-gallery.css";

const photographs = Array.from({ length: 8 }, (_, index) => ({
  src: `/tr3-gallery-${String(index + 1).padStart(2, "0")}.svg`,
  alt: `Registro histórico da Threerace em uma edição anterior — foto ${index + 1}`,
}));
const desktopQuery = "(min-width: 768px)";

function subscribeToLayout(onChange: () => void) {
  const media = window.matchMedia(desktopQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const getDesktopLayout = () => window.matchMedia(desktopQuery).matches;
const getServerLayout = () => false;

function GalleryArrow({ previous = false }: { previous?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {previous ? <path d="M19 12H5m7-7-7 7 7 7" /> : <path d="M5 12h14m-7-7 7 7-7 7" />}
  </svg>;
}

export default function RaceGallery() {
  const id = useId();
  const isDesktop = useSyncExternalStore(subscribeToLayout, getDesktopLayout, getServerLayout);
  const visibleCount = isDesktop ? 3 : 1;
  const lastStart = photographs.length - visibleCount;
  const [firstIndex, setFirstIndex] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const currentIndex = Math.min(firstIndex, lastStart);

  // Keep the current window valid when the layout grows from one photo to three.
  if (firstIndex > lastStart) setFirstIndex(lastStart);

  function moveBy(direction: number) {
    setFirstIndex((previous) => Math.max(0, Math.min(lastStart, previous + direction)));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") moveBy(-1);
    else if (event.key === "ArrowRight") moveBy(1);
    else if (event.key === "Home") setFirstIndex(0);
    else if (event.key === "End") setFirstIndex(lastStart);
    else return;
    event.preventDefault();
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    touchStart.current = event.touches.length === 1 && touch ? { x: touch.clientX, y: touch.clientY } : null;
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const start = touchStart.current;
    const touch = event.changedTouches[0];
    touchStart.current = null;
    if (!start || !touch) return;
    const horizontal = touch.clientX - start.x;
    const vertical = touch.clientY - start.y;
    if (Math.abs(horizontal) >= 45 && Math.abs(horizontal) > Math.abs(vertical) * 1.2) {
      moveBy(horizontal < 0 ? 1 : -1);
    }
  }

  const visibleLabel = visibleCount === 1
    ? `Foto ${currentIndex + 1} de ${photographs.length}`
    : `Fotos ${currentIndex + 1}–${currentIndex + visibleCount} de ${photographs.length}`;

  return <section className="brasil-race-gallery" aria-labelledby={`${id}-heading`} aria-roledescription="carrossel">
    <div className="section-frame brasil-race-gallery-heading">
      <h2 id={`${id}-heading`}>HISTÓRIAS EM IMAGENS</h2>
      <div className="brasil-race-gallery-controls">
        <button type="button" onClick={() => moveBy(-1)} disabled={currentIndex === 0} aria-label="Foto anterior" aria-controls={`${id}-photos`}><GalleryArrow previous /></button>
        <p className="brasil-race-gallery-count" role="status" aria-atomic="true">{visibleLabel}</p>
        <button type="button" onClick={() => moveBy(1)} disabled={currentIndex === lastStart} aria-label="Próxima foto" aria-controls={`${id}-photos`}><GalleryArrow /></button>
      </div>
    </div>
    <div className="brasil-race-gallery-viewport" id={`${id}-photos`} role="group" aria-label="Fotos da Threerace. Use as setas esquerda e direita para navegar." tabIndex={0} onKeyDown={handleKeyDown} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onTouchCancel={() => { touchStart.current = null; }}>
      <div className="brasil-race-gallery-track" style={{ "--br-gallery-index": currentIndex } as CSSProperties}>
        {photographs.map((photograph, index) => <figure key={photograph.src} className="brasil-race-gallery-slide" aria-hidden={index < currentIndex || index >= currentIndex + visibleCount}>
          <Image src={photograph.src} width={1440} height={960} sizes="(min-width: 768px) 33vw, 100vw" alt={photograph.alt} draggable={false} unoptimized />
        </figure>)}
      </div>
    </div>
    <p className="section-frame brasil-race-gallery-credit">Acervo Threerace · edições anteriores</p>
  </section>;
}
