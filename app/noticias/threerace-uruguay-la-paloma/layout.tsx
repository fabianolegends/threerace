import type { Metadata } from "next";
import SeoJsonLd from "../../seo-json-ld";

const url =
  "https://www.threerace.com/noticias/threerace-uruguay-la-paloma";
const title = "La Paloma será a base da Threerace Uruguay";
const description =
  "Rocha recebe três dias de mountain bike, natureza e experiência internacional na Threerace Bike Ultramarathon Uruguay 2026.";
const image = "https://www.threerace.com/event-threerace-uruguay.jpeg";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/noticias/threerace-uruguay-la-paloma" },
  openGraph: {
    type: "article",
    url,
    title,
    description,
    publishedTime: "2026-07-01",
    modifiedTime: "2026-07-24",
    authors: ["Threerace Sports"],
    images: [{ url: image, alt: "Threerace Uruguay em La Paloma" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [image],
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: title,
  description,
  url,
  image: [image],
  datePublished: "2026-07-01",
  dateModified: "2026-07-24",
  author: {
    "@type": "SportsOrganization",
    name: "Threerace Sports",
    url: "https://www.threerace.com",
  },
  publisher: {
    "@type": "SportsOrganization",
    name: "Threerace Sports",
    logo: {
      "@type": "ImageObject",
      url: "https://www.threerace.com/tr3-logo-new.svg",
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SeoJsonLd data={articleJsonLd} />
      {children}
    </>
  );
}
