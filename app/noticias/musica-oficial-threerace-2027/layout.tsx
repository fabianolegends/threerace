import type { Metadata } from "next";
import SeoJsonLd from "../../seo-json-ld";

const url = "https://www.threerace.com/noticias/musica-oficial-threerace-2027";
const title = "Ninguém Volta Igual: música oficial da Threerace Brasil 2027";
const description = "A Threerace apresenta Ninguém Volta Igual, música oficial da edição de 10 anos. Ouça a canção, conheça o conceito Pessoas, Montanhas e Histórias e leia a letra completa.";
const image = "https://www.threerace.com/brasil-2027/hero-pdl0485-sem-logo.webp";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/noticias/musica-oficial-threerace-2027" },
  openGraph: {
    type: "article",
    url,
    title,
    description,
    publishedTime: "2026-11-07",
    modifiedTime: "2026-11-07",
    authors: ["Threerace Sports"],
    images: [{ url: image, alt: "Atletas da Threerace Bike Ultramarathon Brasil" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: title,
  description,
  url,
  image: [image],
  datePublished: "2026-11-07",
  dateModified: "2026-11-07",
  author: { "@type": "SportsOrganization", name: "Threerace Sports", url: "https://www.threerace.com" },
  publisher: {
    "@type": "SportsOrganization",
    name: "Threerace Sports",
    logo: { "@type": "ImageObject", url: "https://www.threerace.com/tr3-logo-new.svg" },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><SeoJsonLd data={articleJsonLd} />{children}</>;
}
