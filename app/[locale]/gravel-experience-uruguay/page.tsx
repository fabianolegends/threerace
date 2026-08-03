import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  buildLocalizedEventJsonLd,
  buildLocalizedEventMetadata,
  eventLocales,
  isEventLocale,
} from "../../event-localization";
import { GravelExperienceUruguayPage } from "../../gravel-experience-uruguay/page";
import SeoJsonLd from "../../seo-json-ld";

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
  return buildLocalizedEventMetadata("gravel-experience-uruguay", locale);
}

export default async function LocalizedGravelExperienceUruguay({
  params,
}: LocalizedPageProps) {
  const { locale } = await params;
  if (!isEventLocale(locale)) notFound();

  return (
    <>
      <SeoJsonLd
        data={buildLocalizedEventJsonLd(
          "gravel-experience-uruguay",
          locale,
        )}
      />
      <GravelExperienceUruguayPage initialLanguage={locale} localized />
    </>
  );
}
