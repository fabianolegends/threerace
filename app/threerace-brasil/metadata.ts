import type { Metadata } from "next";
import type { SiteLanguage } from "../site-language";
import { brasilEvent } from "./content";
import { brasilAlternates, brasilLanguageTags, brasilLocales, brasilPath } from "./localization";

const title = "Threerace Bike Ultramarathon Brasil 2027";
const siteUrl = "https://www.threerace.com";
const copy = {
  pt: { description: "Threerace Brasil, de 2 a 4 de abril de 2027 no Centro de Eventos de São Francisco de Paula. Ultra em três dias e Sport em duas etapas, com Threerace Expo.", imageAlt: "Ciclistas na Threerace Bike Ultramarathon Brasil", venue: brasilEvent.venue },
  es: { description: "Threerace Brasil, del 2 al 4 de abril de 2027 en el Centro de Eventos de São Francisco de Paula. Ultra en tres días y Sport en dos etapas, con Threerace Expo.", imageAlt: "Ciclistas en Threerace Bike Ultramarathon Brasil", venue: brasilEvent.venue },
  en: { description: "Threerace Brasil, April 2–4, 2027 at the São Francisco de Paula Events Center. Three-day Ultra and two-stage Sport, with Threerace Expo.", imageAlt: "Riders at Threerace Bike Ultramarathon Brasil", venue: "São Francisco de Paula Events Center" },
};
const ogLocale = { pt: "pt_BR", es: "es_UY", en: "en_US" };

export function buildBrasilMetadata(locale: SiteLanguage): Metadata {
  const t = copy[locale];
  return {
    title,
    description: t.description,
    alternates: { canonical: brasilPath(locale), languages: brasilAlternates() },
    // Preserve the edition's existing pre-launch indexing policy in every language.
    robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } },
    openGraph: { type: "website", url: brasilPath(locale), siteName: "Threerace Sports", title, description: t.description, locale: ogLocale[locale], alternateLocale: brasilLocales.filter((code) => code !== locale).map((code) => ogLocale[code]), images: [{ url: "/event-threerace-brasil.jpeg", alt: t.imageAlt }] },
    twitter: { card: "summary_large_image", title, description: t.description, images: ["/event-threerace-brasil.jpeg"] },
  };
}

export function buildBrasilJsonLd(locale: SiteLanguage) {
  const url = `${siteUrl}${brasilPath(locale)}`;
  return {
    "@context": "https://schema.org", "@type": "SportsEvent", "@id": `${url}/#event`,
    name: title, description: copy[locale].description, inLanguage: brasilLanguageTags[locale], url,
    image: [`${siteUrl}/event-threerace-brasil.jpeg`], startDate: brasilEvent.startDate, endDate: brasilEvent.endDate,
    eventStatus: "https://schema.org/EventScheduled", eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: copy[locale].venue, address: { "@type": "PostalAddress", addressLocality: "São Francisco de Paula", addressRegion: "RS", addressCountry: "BR" } },
    organizer: { "@type": "SportsOrganization", name: "Threerace Sports", url: siteUrl },
  };
}
