import { notFound, permanentRedirect } from "next/navigation";
import { isEventLocale } from "../../event-localization";
import SeoJsonLd from "../../seo-json-ld";
import BrasilPage from "../../threerace-brasil/brasil-page";
import { brasilLocales, brasilPath } from "../../threerace-brasil/localization";
import { buildBrasilJsonLd, buildBrasilMetadata } from "../../threerace-brasil/metadata";

type Props = { params: Promise<{ locale: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return brasilLocales.map((locale) => ({ locale })); }
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isEventLocale(locale)) notFound();
  return buildBrasilMetadata(locale);
}
export default async function LocalizedBrasil({ params }: Props) {
  const { locale } = await params;
  if (!isEventLocale(locale)) notFound();
  if (locale === "pt") permanentRedirect(brasilPath("pt"));
  return <><SeoJsonLd data={buildBrasilJsonLd(locale)} /><BrasilPage locale={locale} /></>;
}
