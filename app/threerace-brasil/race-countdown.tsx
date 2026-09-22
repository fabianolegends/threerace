"use client";

import { useEffect, useState } from "react";
import { brasilEvent } from "./content";
import "./race-countdown.css";

// Count to the start of the event date in Brasília, not an unconfirmed start time.
const eventStartsAt = Date.parse(`${brasilEvent.startDate}T00:00:00-03:00`);
const eventDateLabel = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit", month: "long", year: "numeric", timeZone: "America/Sao_Paulo",
}).format(eventStartsAt);

export default function RaceCountdown() {
  // The same placeholder on the server and first client render avoids hydration drift.
  const [remainingMinutes, setRemainingMinutes] = useState<number | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil((eventStartsAt - Date.now()) / 60000));
      setRemainingMinutes(remaining);
      if (remaining === 0) window.clearInterval(timer);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const values = remainingMinutes === null ? null : [
    Math.floor(remainingMinutes / 1440),
    Math.floor((remainingMinutes % 1440) / 60),
    remainingMinutes % 60,
  ];

  return <div className="brasil-race-countdown" id="contagem-regressiva">
    <div className="brasil-race-countdown-intro">
      <p className="brasil-race-countdown-label">{remainingMinutes === 0 ? "A edição 2027 já começou" : "Até a Threerace"}</p>
      <p className="brasil-race-countdown-date">{eventDateLabel}</p>
    </div>
    <div role="timer" aria-live="off" aria-label={values ? `${values[0]} dias, ${values[1]} horas e ${values[2]} minutos até ${eventDateLabel}` : "Carregando contagem regressiva"}>
      <dl className="brasil-race-countdown-values">
        {["Dias", "Horas", "Minutos"].map((label, index) => <div key={label}>
          <dt>{label}</dt>
          <dd>{values ? String(values[index]).padStart(2, "0") : "—"}</dd>
        </div>)}
      </dl>
    </div>
  </div>;
}
