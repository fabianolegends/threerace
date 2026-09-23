import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import MedicalDocuments from "../../../threerace-brasil/documentos-medicos/medical-page";
import { buildMedicalMetadata } from "../../../threerace-brasil/documentos-medicos/localization";

type LocalizedPageProps = { params: Promise<{ locale: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return ["pt", "es", "en"].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalizedPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "pt" && locale !== "es" && locale !== "en") notFound();
  return buildMedicalMetadata(locale);
}

export default async function LocalizedMedicalDocumentsPage({ params }: LocalizedPageProps) {
  const { locale } = await params;
  if (locale === "pt") permanentRedirect("/threerace-brasil/documentos-medicos");
  if (locale !== "es" && locale !== "en") notFound();
  return <MedicalDocuments locale={locale} />;
}
