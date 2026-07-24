import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./corporate.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Threerace Sports | Eventos de MTB e Gravel",
  description: "Threerace Sports: eventos de mountain bike e gravel no Brasil e no Uruguai desde 2017.",
  icons: {
    icon: "/tr3-logo-new.svg",
    shortcut: "/tr3-logo-new.svg",
  },
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
        {children}
        <a className="global-top-button" href="#top" aria-label="Voltar ao topo">
          <span aria-hidden="true">↑</span>
          TOPO
        </a>
      </body>
    </html>
  );
}
