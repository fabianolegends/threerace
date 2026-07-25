import type { Metadata } from "next";
import SeoJsonLd from "../../seo-json-ld";

const url =
  "https://www.threerace.com/noticias/gravel-experience-uruguay";
const title = "Dois dias para descobrir o Uruguai por novas linhas";
const description =
  "Conheça a Gravel Experience Uruguay: 183 km em duas etapas por caminhos rurais, campos e paisagens costeiras de Rocha.";
const image = "https://www.threerace.com/gravel-experience-hero-v2.png";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/noticias/gravel-experience-uruguay" },
  openGraph: {
    type: "article",
    url,
    title,
    description,
    publishedTime: "2026-07-01",
    modifiedTime: "2026-07-24",
    authors: ["Threerace Sports"],
    images: [{ url: image, alt: "Gravel Experience Uruguay" }],
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
