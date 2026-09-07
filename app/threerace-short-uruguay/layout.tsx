import type { Metadata } from "next";
import { eventAlternates } from "../event-localization";
import SeoJsonLd from "../seo-json-ld";

const url = "https://www.threerace.com/threerace-short-uruguay";

export const metadata: Metadata = {
  title: "Threerace Short Uruguay 2026",
  description:
    "Prova de mountain bike de 63 km e 630 m de elevação acumulada, com largada às 8h30 em La Pedrera, Uruguai, em 1º de novembro de 2026.",
  alternates: {
    canonical: "/threerace-short-uruguay",
    languages: eventAlternates("threerace-short-uruguay"),
  },
  openGraph: {
    type: "website",
    url,
    title: "Threerace Short Uruguay 2026",
    description:
      "Uma prova de MTB em etapa única: 63 km e 630 m+ com largada em La Pedrera.",
    images: [
      {
        url: "/event-threerace-uruguay.jpeg",
        alt: "Ciclistas na Threerace Short Uruguay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Threerace Short Uruguay 2026",
    description:
      "MTB em etapa única com 63 km e 630 m+ em La Pedrera, Uruguai.",
    images: ["/event-threerace-uruguay.jpeg"],
  },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  "@id": `${url}/#event`,
  name: "Threerace Short Uruguay 2026",
  description:
    "Prova de mountain bike em etapa única com 63 km e 630 metros de elevação acumulada, realizada em La Pedrera, Rocha, Uruguai.",
  url,
  image: ["https://www.threerace.com/event-threerace-uruguay.jpeg"],
  startDate: "2026-11-01T08:30:00-03:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "La Pedrera",
    address: {
      "@type": "PostalAddress",
      addressLocality: "La Pedrera",
      addressRegion: "Rocha",
      addressCountry: "UY",
    },
  },
  organizer: [
    {
      "@type": "SportsOrganization",
      name: "Threerace Sports",
      url: "https://www.threerace.com",
    },
    {
      "@type": "Organization",
      name: "Azimut Extremo",
      url: "https://www.azimutextremo.com/",
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SeoJsonLd data={eventJsonLd} />
      {children}
    </>
  );
}
