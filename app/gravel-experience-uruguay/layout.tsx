import type { Metadata } from "next";
import { eventAlternates } from "../event-localization";
import SeoJsonLd from "../seo-json-ld";

const url = "https://www.threerace.com/gravel-experience-uruguay";

export const metadata: Metadata = {
  title: "Gravel Experience Uruguay 2026",
  description:
    "Gravel Stage Race de duas etapas e 183 km em La Paloma e Rocha, Uruguai, nos dias 31 de outubro e 1º de novembro de 2026.",
  alternates: {
    canonical: "/gravel-experience-uruguay",
    languages: eventAlternates("gravel-experience-uruguay"),
  },
  openGraph: {
    type: "website",
    url,
    title: "Gravel Experience Uruguay 2026",
    description:
      "Duas etapas e 183 km para descobrir o Uruguai pelos caminhos que o gravel conecta.",
    images: [
      {
        url: "/gravel-experience-hero-v2.png",
        alt: "Ciclista na Gravel Experience Uruguay",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gravel Experience Uruguay 2026",
    description: "Gravel Stage Race de 183 km em La Paloma e Rocha.",
    images: ["/gravel-experience-hero-v2.png"],
  },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  "@id": `${url}/#event`,
  name: "Gravel Experience Uruguay 2026",
  description:
    "Gravel Stage Race com duas etapas, 115 km e 68 km, por caminhos rurais e paisagens costeiras de Rocha.",
  url,
  image: ["https://www.threerace.com/gravel-experience-hero-v2.png"],
  startDate: "2026-10-31T07:00:00-03:00",
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
    url: "https://event.windfit.app/threerace-gravel-experience-uruguay-2026",
    price: "149",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
    validFrom: "2026-06-25",
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
