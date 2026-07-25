import type { Metadata } from "next";
import SeoJsonLd from "../seo-json-ld";

const url = "https://www.threerace.com/threerace-uruguay";

export const metadata: Metadata = {
  title: "Threerace Bike Ultramarathon Uruguay 2026",
  description:
    "MTB Stage Race de três dias e mais de 140 km em La Paloma e Rocha, Uruguai, de 30 de outubro a 1º de novembro de 2026.",
  alternates: { canonical: "/threerace-uruguay" },
  openGraph: {
    type: "website",
    url,
    title: "Threerace Bike Ultramarathon Uruguay 2026",
    description:
      "Três dias de mountain bike por etapas entre La Paloma e Rocha.",
    images: [
      {
        url: "/event-threerace-uruguay.jpeg",
        alt: "Threerace Bike Ultramarathon Uruguay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Threerace Bike Ultramarathon Uruguay 2026",
    description: "MTB Stage Race de três dias em La Paloma e Rocha.",
    images: ["/event-threerace-uruguay.jpeg"],
  },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  "@id": `${url}/#event`,
  name: "Threerace Bike Ultramarathon Uruguay 2026",
  description:
    "MTB Stage Race de três dias e mais de 140 km com base em La Paloma e percursos pela região de Rocha, Uruguai.",
  url,
  image: ["https://www.threerace.com/event-threerace-uruguay.jpeg"],
  startDate: "2026-10-30T07:00:00-03:00",
  endDate: "2026-11-01T15:00:00-03:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "La Paloma e Rocha",
    address: {
      "@type": "PostalAddress",
      addressLocality: "La Paloma",
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
  offers: {
    "@type": "Offer",
    url: "https://event.windfit.app/threerace-uruguay-2026",
    price: "220",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    validFrom: "2026-05-20",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SeoJsonLd data={eventJsonLd} />
      {children}
    </>
  );
}
