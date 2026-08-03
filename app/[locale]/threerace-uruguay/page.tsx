import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  buildLocalizedEventJsonLd,
  buildLocalizedEventMetadata,
  eventLocales,
  isEventLocale,
} from "../../event-localization";
import SeoJsonLd from "../../seo-json-ld";
import { ThreeraceUruguayPage } from "../../threerace-uruguay/page";

type LocalizedPageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return eventLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalizedPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isEventLocale(locale)) notFound();
  return buildLocalizedEventMetadata("threerace-uruguay", locale);
}

export default async function LocalizedThreeraceUruguay({
  params,
}: LocalizedPageProps) {
  const { locale } = await params;
  if (!isEventLocale(locale)) notFound();

  return (
    <>
      <SeoJsonLd
        data={buildLocalizedEventJsonLd("threerace-uruguay", locale)}
      />
      <ThreeraceUruguayPage initialLanguage={locale} localized />
    </>
  );
}
