import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import HealthForm, { MedicalIcon } from "./health-form";
import "../brasil.css";
import "./medical.css";

export const metadata: Metadata = {
  title: "Informações médicas | Threerace Brasil 2027",
  description: "Declaração de saúde e modelo de atestado médico da Threerace Brasil 2027.",
  alternates: { canonical: "/threerace-brasil/documentos-medicos" },
  robots: { index: false, follow: false },
};

export default function MedicalDocumentsPage() {
  return (
    <main className="brasil-event-page br-medical-page" lang="pt-BR">
      <header className="br-medical-header br-medical-frame">
        <Link className="br-medical-brand" href="/threerace-brasil" aria-label="Threerace Brasil 2027 — voltar ao evento">
          <Image src="/tr3-logo-display.webp" alt="Threerace" width={64} height={64} />
          <span>BRASIL <b>2027</b></span>
        </Link>
        <Link className="br-medical-back" href="/threerace-brasil#documentacao"><MedicalIcon kind="back" /> Voltar ao evento</Link>
      </header>
      <div className="br-medical-frame">
        <section className="br-medical-intro" aria-labelledby="medical-title">
          <p className="br-medical-eyebrow">ÁREA DO ATLETA</p>
          <h1 id="medical-title">Informações<br />médicas.</h1>
          <p>Seu histórico de saúde e os documentos para a Threerace Brasil 2027, reunidos em um só lugar.</p>
        </section>
        <p className="br-medical-preview-notice"><MedicalIcon kind="info" /><span>Versão de trabalho: use dados fictícios. O envio à organização ainda não está ativo.</span></p>
        <HealthForm />
        <footer className="br-medical-footer"><span>MONTANHAS, PESSOAS, HISTÓRIAS.</span><span>THREERACE BRASIL · 02–04 ABR 2027</span></footer>
      </div>
    </main>
  );
}
