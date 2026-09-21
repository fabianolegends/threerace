import type { Metadata } from "next";
import SeoJsonLd from "../seo-json-ld";
import { brasilEvent } from "./content";

const url = "https://www.threerace.com/threerace-brasil";

export const metadata: Metadata = {
  title: "Threerace Bike Ultramarathon Brasil 2027",
  description:
    "Threerace Brasil, de 2 a 4 de abril de 2027 no Centro de Eventos de São Francisco de Paula. Ultra em três dias e Sport em duas etapas, com Threerace Expo.",
  alternates: { canonical: "/threerace-brasil" },
  openGraph: {
    type: "website",
    url,
    title: "Threerace Bike Ultramarathon Brasil 2027",
    description:
      "2 a 4 de abril de 2027 · Ultra e Sport em São Francisco de Paula.",
    images: [
      {
        url: "/event-threerace-brasil.jpeg",
        alt: "Threerace Bike Ultramarathon Brasil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Threerace Bike Ultramarathon Brasil 2027",
    description: "2 a 4 de abril de 2027 · Ultra e Sport em São Francisco de Paula.",
    images: ["/event-threerace-brasil.jpeg"],
  },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  "@id": `${url}/#event`,
  name: "Threerace Bike Ultramarathon Brasil 2027",
  description:
    "Mountain bike por etapas em São Francisco de Paula: Ultra em três dias, Sport em dois dias e Threerace Expo.",
  url,
  image: ["https://www.threerace.com/event-threerace-brasil.jpeg"],
  startDate: brasilEvent.startDate,
  endDate: brasilEvent.endDate,
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: brasilEvent.venue,
    address: {
      "@type": "PostalAddress",
      addressLocality: "São Francisco de Paula",
      addressRegion: "RS",
      addressCountry: "BR",
    },
  },
  organizer: {
    "@type": "SportsOrganization",
    name: "Threerace Sports",
    url: "https://www.threerace.com",
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
