"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import "./site-music-player.css";

// The original Threerace anthem is hosted as an MP3, not an embedded Spotify player.
const SONG_URL = "https://d2ol7oe51mr4n9.cloudfront.net/user_3JpJMNn7dHcjT62hE88sHPaOZI1/b89f8f3f-5e79-4e71-966f-d22d14295e2e.mp3";
const PREFERENCE_KEY = "threerace:anthem-enabled";

type Language = "pt" | "es" | "en";
type MusicState = {
  playing: boolean;
  loading: boolean;
  error: boolean;
  toggle: () => Promise<void>;
};

const MusicContext = createContext<MusicState | null>(null);

const labels: Record<Language, { play: string; pause: string; error: string }> = {
  pt: { play: "Ouvir hino", pause: "Pausar hino", error: "Não foi possível carregar a música" },
  es: { play: "Escuchar himno", pause: "Pausar himno", error: "No se pudo cargar la música" },
  en: { play: "Play anthem", pause: "Pause anthem", error: "Unable to load the song" },
};

function savePreference(value: "on" | "off") {
  try {
    window.localStorage.setItem(PREFERENCE_KEY, value);
  } catch {
    // Audio controls should work even when storage is disabled.
  }
}

export function SiteMusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;

    // Attempt playback on entry when the browser permits it; honor an
    // explicit prior choice to disable music.
    let preference: string | null = null;
    try {
      preference = window.localStorage.getItem(PREFERENCE_KEY);
    } catch {
      // Private browsing can restrict storage.
    }
    if (preference !== "off") {
      void audio.play().catch((reason: unknown) => {
        // Autoplay rejection is normal for first-time visitors.
        // Keep the click-to-play button instead of displaying an error.
        if (reason instanceof DOMException &&
          (reason.name === "NotAllowedError" || reason.name === "AbortError")) return;
        setError(true);
      });
    }
  }, []);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setPlaying(false);
      savePreference("off");
      return;
    }

    setLoading(true);
    setError(false);
    try {
      if (audio.error) audio.load();
      await audio.play();
      setPlaying(true);
      savePreference("on");
    } catch {
      setPlaying(false);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <MusicContext.Provider value={{ playing, loading, error, toggle }}>
      {children}
      <audio
        ref={audioRef}
        src={SONG_URL}
        preload="none"
        onPlay={() => { setPlaying(true); setError(false); }}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => { setError(true); setPlaying(false); }}
      />
    </MusicContext.Provider>
  );
}

export function SiteMusicControl({ locale = "pt", compact = false }: { locale?: Language; compact?: boolean }) {
  const state = useContext(MusicContext);
  if (!state) return null;
  const label = labels[locale];
  const buttonText = state.playing ? label.pause : label.play;

  return (
    <button
      type="button"
      className={state.playing ? "site-music-toggle is-playing" : "site-music-toggle"}
      onClick={() => void state.toggle()}
      aria-label={state.error ? `${buttonText}. ${label.error}` : `${buttonText}: música oficial TR3, Ninguém Volta Igual`}
      aria-pressed={state.playing}
      disabled={state.loading}
      aria-busy={state.loading}
      title={state.error ? label.error : `${buttonText}: Ninguém Volta Igual`}
    >
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {state.playing ? (
          <>
            <path d="M4 9v6h4l5 4V5L8 9H4Z" />
            <path d="M16 9a4 4 0 0 1 0 6" />
            <path d="M19 6a8 8 0 0 1 0 12" />
          </>
        ) : (
          <>
            <path d="M4 9v6h4l5 4V5L8 9H4Z" />
            <path d="m17 9 4 6m0-6-4 6" />
          </>
        )}
      </svg>
      {compact ? (
        <span className="site-music-toggle-text">{buttonText}</span>
      ) : (
        <>
          <span className="site-music-toggle-copy">
            <span className="site-music-toggle-text">{locale === "en" ? "TR3 OFFICIAL MUSIC" : "MÚSICA OFICIAL TR3"}</span>
            <span className="site-music-track-title">Ninguém Volta Igual</span>
          </span>
          <span className="site-music-toggle-action">
            {state.playing ? (locale === "en" ? "PAUSE" : "PAUSAR") : (locale === "en" ? "PLAY" : locale === "es" ? "ESCUCHAR" : "OUVIR")}
          </span>
        </>
      )}
      {state.playing && <span className="site-music-playing-dot" aria-hidden="true" />}
    </button>
  );
}

export function SiteMusicFloatingControl() {
  const pathname = usePathname();
  if (!pathname || pathname === "/") return null;
  const locale: Language = pathname.startsWith("/es/") ? "es" : pathname.startsWith("/en/") ? "en" : "pt";

  return (
    <div className="site-music-floating">
      <SiteMusicControl locale={locale} compact />
    </div>
  );
}
