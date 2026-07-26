import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Política de Privacidade e uso de cookies da Threerace Sports.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PrivacyPolicyPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "64px 24px",
        color: "#eee8dd",
        background: "#071116",
      }}
    >
      <article style={{ maxWidth: 820, margin: "0 auto", lineHeight: 1.7 }}>
        <Link
          href="/"
          style={{
            color: "#c98a76",
            textTransform: "uppercase",
            letterSpacing: ".12em",
          }}
        >
          ← Voltar ao site
        </Link>
        <h1
          style={{
            margin: "48px 0 28px",
            fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
            lineHeight: 1,
          }}
        >
          Política de Privacidade
        </h1>
        <p>Última atualização: 26 de julho de 2026.</p>

        <h2>Dados que coletamos</h2>
        <p>
          Quando você entra em contato ou participa da Comunidade Threerace,
          tratamos os dados informados por você para responder ao seu interesse e
          enviar comunicações relacionadas aos eventos da Threerace Sports.
        </p>
        <p>
          Com seu consentimento, usamos o Google Analytics para entender visitas
          e navegação. A ferramenta pode registrar informações técnicas como
          dispositivo, navegador, páginas visitadas e origem do acesso.
        </p>

        <h2>Como usamos os dados</h2>
        <p>
          Usamos os dados para responder solicitações, comunicar novidades sobre
          os eventos, melhorar o site e compreender o interesse do público. Não
          comercializamos seus dados pessoais.
        </p>

        <h2>Cookies e sua escolha</h2>
        <p>
          Cookies essenciais permitem o funcionamento do site. Cookies de
          análise são ativados somente após sua autorização. Você pode revisar
          sua escolha pelo link “Privacidade” disponível no rodapé.
        </p>

        <h2>Compartilhamento e armazenamento</h2>
        <p>
          Os dados podem ser processados por fornecedores necessários à operação
          do site, das comunicações e das métricas, sempre dentro das finalidades
          descritas nesta política.
        </p>

        <h2>Seus direitos</h2>
        <p>
          Você pode solicitar confirmação, acesso, correção, exclusão ou
          informações sobre o tratamento dos seus dados, além de revogar o
          consentimento quando aplicável.
        </p>

        <h2>Contato</h2>
        <p>
          Para exercer seus direitos ou esclarecer dúvidas, escreva para{" "}
          <a
            href="mailto:inscricoes@threerace.com.br"
            style={{ color: "#c98a76" }}
          >
            inscricoes@threerace.com.br
          </a>
          .
        </p>
      </article>
    </main>
  );
}
