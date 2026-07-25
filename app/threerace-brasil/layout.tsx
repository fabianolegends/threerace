import type { Metadata } from "next";
import SeoJsonLd from "../seo-json-ld";

const url = "https://www.threerace.com/threerace-brasil";

export const metadata: Metadata = {
  title: "Threerace Bike Ultramarathon Brasil 2027",
  description:
    "A Threerace Bike Ultramarathon retorna a São Francisco de Paula de 3 a 5 de abril de 2027 para celebrar dez anos de MTB, natureza e comunidade.",
  alternates: { canonical: "/threerace-brasil" },
  openGraph: {
    type: "website",
    url,
    title: "Threerace Bike Ultramarathon Brasil 2027",
    description:
      "MTB Stage Race em São Francisco de Paula, na Serra Gaúcha.",
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
    description: "MTB Stage Race em São Francisco de Paula.",
    images: ["/event-threerace-brasil.jpeg"],
  },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  "@id": `${url}/#event`,
  name: "Threerace Bike Ultramarathon Brasil 2027",
  description:
    "MTB Stage Race de três dias em São Francisco de Paula, Rio Grande do Sul.",
  url,
  image: ["https://www.threerace.com/event-threerace-brasil.jpeg"],
  startDate: "2027-04-03",
  endDate: "2027-04-05",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "São Francisco de Paula",
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
