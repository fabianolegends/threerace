import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "./components/google-analytics";
import { GlobalSiteFooter } from "./components/global-site-footer";
import "./globals.css";
import "./corporate.css";

const siteUrl = "https://www.threerace.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Threerace Sports | Eventos de MTB e Gravel",
    template: "%s | Threerace Sports",
  },
  description:
    "Eventos de mountain bike e gravel que conectam esporte, natureza e território no Brasil e no Uruguai. Conheça a Threerace Sports.",
  applicationName: "Threerace Sports",
  authors: [{ name: "Threerace Sports", url: siteUrl }],
  creator: "Threerace Sports",
  publisher: "Threerace Sports",
  category: "sports",
  keywords: [
    "Threerace",
    "Threerace Sports",
    "mountain bike",
    "MTB",
    "gravel",
    "stage race",
    "ciclismo",
    "eventos de ciclismo",
    "Uruguai",
    "Brasil",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    alternateLocale: ["es_UY", "en_US"],
    url: "/",
    siteName: "Threerace Sports",
    title: "Threerace Sports | Eventos de MTB e Gravel",
    description:
      "Uma marca, diferentes territórios e experiências que deixam histórias. Eventos de MTB e gravel no Brasil e no Uruguai.",
    images: [
      {
        url: "/home-hero-peloton.jpeg",
        width: 1920,
        height: 1280,
        alt: "Pelotão da Threerace Sports em uma prova de mountain bike",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Threerace Sports | Eventos de MTB e Gravel",
    description:
      "Eventos de mountain bike e gravel no Brasil e no Uruguai.",
    images: ["/home-hero-peloton.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/tr3-logo-new.svg",
    shortcut: "/tr3-logo-new.svg",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  "@id": `${siteUrl}/#organization`,
  name: "Threerace Sports",
  alternateName: "TR3",
  url: siteUrl,
  logo: `${siteUrl}/tr3-logo-new.svg`,
  image: `${siteUrl}/home-hero-peloton.jpeg`,
  foundingDate: "2017",
  email: "inscricoes@threerace.com.br",
  sameAs: [
    "https://www.instagram.com/threeracesports/",
    "https://www.facebook.com/threeracesports/",
    "https://www.youtube.com/@threeracesports",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        id="top"
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <GlobalSiteFooter />
        <a className="global-top-button" href="#top" aria-label="Voltar ao topo">
          <span aria-hidden="true">↑</span>
          TOPO
        </a>
      </body>
    </html>
  );
}
