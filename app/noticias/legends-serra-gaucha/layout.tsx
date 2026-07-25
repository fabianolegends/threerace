import type { Metadata } from "next";
import SeoJsonLd from "../../seo-json-ld";

const url = "https://www.threerace.com/noticias/legends-serra-gaucha";
const title = "Legends: quatro destinos em uma travessia pela Serra Gaúcha";
const description =
  "Canela, São Francisco de Paula, Gramado e Nova Petrópolis conectadas por uma experiência premium de gravel.";
const image = "https://www.threerace.com/event-legends-v3.jpeg";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/noticias/legends-serra-gaucha" },
  openGraph: {
    type: "article",
    url,
    title,
    description,
    publishedTime: "2026-07-01",
    modifiedTime: "2026-07-24",
    authors: ["Threerace Sports"],
    images: [{ url: image, alt: "Legends Ultimate Gravel Race" }],
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
