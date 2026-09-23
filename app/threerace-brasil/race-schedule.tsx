import type { SiteLanguage } from "../site-language";
import { getBrasilContent } from "./content-i18n";
import "./race-schedule.css";

export default function RaceSchedule({ locale = "pt" }: { locale?: SiteLanguage }) {
  const { schedule } = getBrasilContent(locale);
  return <div className="brasil-panel-extra brasil-race-schedule">
    {schedule.map((day) => <section className="brasil-schedule-day" key={day.dateTime} aria-labelledby={`agenda-${day.dateTime}`}>
      <header className="brasil-schedule-day-header">
        <h5 id={`agenda-${day.dateTime}`}><time dateTime={day.dateTime}>{day.date}</time></h5>
        <p>{day.title}</p>
      </header>
      <ol className="brasil-schedule-events">
        {day.events.map((event) => <li key={event.title}>
          <span className="brasil-schedule-time">{event.time}</span>
          <div><h6>{event.title}</h6>{event.description && <p>{event.description}</p>}</div>
        </li>)}
      </ol>
    </section>)}
  </div>;
}
