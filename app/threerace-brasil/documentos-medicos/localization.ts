import type { Metadata } from "next";
import type { SiteLanguage } from "../../site-language";
import { brasilAlternates, brasilLanguageTags, brasilPath } from "../localization";

const pt = {
  title: "Informações médicas | Threerace Brasil 2027",
  description: "Declaração de saúde e modelo de atestado médico da Threerace Brasil 2027.",
  back: "Voltar ao evento", athleteArea: "ÁREA DO ATLETA", heading: ["Informações", "médicas."],
  introduction: "Seu histórico de saúde e os documentos para a Threerace Brasil 2027, reunidos em um só lugar.",
  previewNotice: "Versão de trabalho: use dados fictícios. O envio à organização ainda não está ativo.",
  signature: "MONTANHAS, PESSOAS, HISTÓRIAS.", date: "THREERACE BRASIL · 02–04 ABR 2027",
  documents: "Documentos médicos", declaration: "Declaração de saúde", fillReview: "Preencha e revise as informações",
  certificate: "Atestado médico", downloadShortcut: "Baixe o modelo da prova", historyEyebrow: "SEU HISTÓRICO, COM CUIDADO",
  requiredFields: "Campos com * são obrigatórios. Responda às 12 perguntas.", identificationEmergency: "Identificação e contato de emergência",
  identification: "Identificação do atleta", identificationHelp: "Use o número e o e-mail informados na sua inscrição.",
  registration: "Número do atleta / inscrição", registrationPlaceholder: "Ex.: número informado na confirmação",
  email: "E-mail da inscrição", emailPlaceholder: "seuemail@exemplo.com", bloodType: "Tipo sanguíneo", optional: "Opcional", notProvided: "Não informado",
  emergency: "Em caso de emergência", emergencyContact: "Contato de emergência", contactPlaceholder: "Nome da pessoa de contato", emergencyPhone: "Telefone de emergência",
  history: "Histórico de saúde", historyHelp: "Escolha Sim ou Não em cada pergunta. Use as observações para complementar suas respostas.",
  answered: "PERGUNTAS RESPONDIDAS", of: "de", yes: "Sim", no: "Não", complementary: "Informações complementares",
  complementaryHelp: "Se necessário, detalhe as informações importantes para a equipe médica.", characterLimit: "Até 2.000 caracteres",
  certificateEyebrow: "DOCUMENTO DA PROVA", certificateHelp: "Modelo para a modalidade Ultra. Apresentar acompanhado da Declaração de Saúde.",
  downloadTitle: "Baixe o modelo", downloadHelp: "Leve o documento a um médico para avaliação, preenchimento e assinatura.", download: "Baixar atestado em PDF",
  completedCertificate: "Atestado preenchido", optionalPreview: "Opcional nesta prévia", fileHelp: "Selecione um PDF, JPG ou PNG de até 10 MB. O arquivo permanece neste dispositivo e não será enviado.",
  chooseFile: "Selecionar arquivo", noFile: "Nenhum arquivo selecionado", previewSelected: "selecionado apenas para a prévia", removeLabel: "Remover atestado selecionado", remove: "Remover", continueNoFile: "Continuar sem arquivo",
  confirmation: "Confirmação das informações", consent: "Declaro que as informações fornecidas são verdadeiras, completas e atualizadas. Autorizo o uso restrito destes dados pela organização da Threerace Brasil para segurança, atendimento médico e de emergência. Reconheço que esta declaração não substitui o atestado médico.",
  previewOnly: "Esta etapa é apenas uma prévia.", nothingSent: "Nenhuma informação será enviada.", review: "Revisar informações", reviewEyebrow: "REVISÃO DA PRÉVIA", reviewTitle: "Confira suas informações", reviewHelp: "Revise os dados antes de voltar para ajustar o formulário.",
  summaryIdentification: "Identificação e emergência", selectedCertificate: "Atestado selecionado", authorization: "Declaração e autorização", confirmed: "Confirmadas nesta prévia.", reviewed: "Prévia conferida. Nenhuma informação foi enviada.", edit: "Editar informações",
  fileTypeError: "Selecione um arquivo PDF, JPG ou PNG.", fileEmptyError: "O arquivo está vazio. Selecione outro arquivo.", fileSizeError: "O arquivo deve ter até 10 MB. Selecione um arquivo menor.",
  requiredError: "Preencha este campo.", emailError: "Informe um e-mail válido.", answerError: "Selecione Sim ou Não.", consentError: "Confirme a declaração e autorização para revisar as informações.",
  phoneError: "Informe um telefone de emergência com 8 a 15 dígitos, incluindo o DDD quando aplicável.",
};

type MedicalCopy = { [K in keyof typeof pt]: (typeof pt)[K] extends string[] ? string[] : string };

const es: MedicalCopy = {
  title: "Información médica | Threerace Brasil 2027",
  description: "Declaración de salud y modelo de certificado médico de Threerace Brasil 2027.",
  back: "Volver al evento", athleteArea: "ÁREA DEL ATLETA", heading: ["Información", "médica."],
  introduction: "Tu historial de salud y los documentos para Threerace Brasil 2027, reunidos en un solo lugar.",
  previewNotice: "Versión de trabajo: utiliza datos ficticios. El envío a la organización aún no está activo.",
  signature: "MONTAÑAS, PERSONAS, HISTORIAS.", date: "THREERACE BRASIL · 02–04 ABR 2027",
  documents: "Documentos médicos", declaration: "Declaración de salud", fillReview: "Completa y revisa la información",
  certificate: "Certificado médico", downloadShortcut: "Descarga el modelo de la prueba", historyEyebrow: "TU HISTORIAL, CON CUIDADO",
  requiredFields: "Los campos con * son obligatorios. Responde las 12 preguntas.", identificationEmergency: "Identificación y contacto de emergencia",
  identification: "Identificación del atleta", identificationHelp: "Utiliza el número y el correo electrónico indicados en tu inscripción.",
  registration: "Número del atleta / inscripción", registrationPlaceholder: "Ej.: número indicado en la confirmación",
  email: "Correo electrónico de la inscripción", emailPlaceholder: "tucorreo@ejemplo.com", bloodType: "Grupo sanguíneo", optional: "Opcional", notProvided: "No informado",
  emergency: "En caso de emergencia", emergencyContact: "Contacto de emergencia", contactPlaceholder: "Nombre de la persona de contacto", emergencyPhone: "Teléfono de emergencia",
  history: "Historial de salud", historyHelp: "Selecciona Sí o No en cada pregunta. Utiliza las observaciones para complementar tus respuestas.",
  answered: "PREGUNTAS RESPONDIDAS", of: "de", yes: "Sí", no: "No", complementary: "Información complementaria",
  complementaryHelp: "Si es necesario, detalla la información importante para el equipo médico.", characterLimit: "Hasta 2.000 caracteres",
  certificateEyebrow: "DOCUMENTO DE LA PRUEBA", certificateHelp: "Modelo para la modalidad Ultra. Presentar junto con la Declaración de Salud.",
  downloadTitle: "Descarga el modelo", downloadHelp: "Lleva el documento a un médico para su evaluación, cumplimentación y firma.", download: "Descargar certificado en PDF",
  completedCertificate: "Certificado completado", optionalPreview: "Opcional en esta vista previa", fileHelp: "Selecciona un PDF, JPG o PNG de hasta 10 MB. El archivo permanece en este dispositivo y no se enviará.",
  chooseFile: "Seleccionar archivo", noFile: "Ningún archivo seleccionado", previewSelected: "seleccionado solo para la vista previa", removeLabel: "Eliminar certificado seleccionado", remove: "Eliminar", continueNoFile: "Continuar sin archivo",
  confirmation: "Confirmación de la información", consent: "Declaro que la información proporcionada es verdadera, completa y actualizada. Autorizo el uso restringido de estos datos por parte de la organización de Threerace Brasil para la seguridad y la atención médica y de emergencia. Reconozco que esta declaración no sustituye al certificado médico.",
  previewOnly: "Esta etapa es solo una vista previa.", nothingSent: "No se enviará ninguna información.", review: "Revisar información", reviewEyebrow: "REVISIÓN DE LA VISTA PREVIA", reviewTitle: "Comprueba tu información", reviewHelp: "Revisa los datos antes de volver para ajustar el formulario.",
  summaryIdentification: "Identificación y emergencia", selectedCertificate: "Certificado seleccionado", authorization: "Declaración y autorización", confirmed: "Confirmadas en esta vista previa.", reviewed: "Vista previa revisada. No se ha enviado ninguna información.", edit: "Editar información",
  fileTypeError: "Selecciona un archivo PDF, JPG o PNG.", fileEmptyError: "El archivo está vacío. Selecciona otro archivo.", fileSizeError: "El archivo debe tener como máximo 10 MB. Selecciona un archivo más pequeño.",
  requiredError: "Completa este campo.", emailError: "Introduce un correo electrónico válido.", answerError: "Selecciona Sí o No.", consentError: "Confirma la declaración y autorización para revisar la información.",
  phoneError: "Introduce un teléfono de emergencia con entre 8 y 15 dígitos, incluyendo el código de área cuando corresponda.",
};

const en: MedicalCopy = {
  title: "Medical information | Threerace Brasil 2027",
  description: "Health declaration and medical certificate template for Threerace Brasil 2027.",
  back: "Back to the event", athleteArea: "ATHLETE AREA", heading: ["Medical", "information."],
  introduction: "Your health history and documents for Threerace Brasil 2027, all in one place.",
  previewNotice: "Work in progress: use fictional data. Submission to the organizers is not yet active.",
  signature: "MOUNTAINS, PEOPLE, STORIES.", date: "THREERACE BRASIL · 02–04 APR 2027",
  documents: "Medical documents", declaration: "Health declaration", fillReview: "Complete and review your information",
  certificate: "Medical certificate", downloadShortcut: "Download the race template", historyEyebrow: "YOUR HISTORY, HANDLED WITH CARE",
  requiredFields: "Fields marked * are required. Answer all 12 questions.", identificationEmergency: "Identification and emergency contact",
  identification: "Athlete identification", identificationHelp: "Use the number and email address provided in your registration.",
  registration: "Athlete / registration number", registrationPlaceholder: "E.g., number in your confirmation",
  email: "Registration email", emailPlaceholder: "you@example.com", bloodType: "Blood type", optional: "Optional", notProvided: "Not provided",
  emergency: "In case of emergency", emergencyContact: "Emergency contact", contactPlaceholder: "Contact person's name", emergencyPhone: "Emergency phone number",
  history: "Health history", historyHelp: "Select Yes or No for each question. Use the comments to add details to your answers.",
  answered: "QUESTIONS ANSWERED", of: "of", yes: "Yes", no: "No", complementary: "Additional information",
  complementaryHelp: "If needed, provide details that are important for the medical team.", characterLimit: "Up to 2,000 characters",
  certificateEyebrow: "RACE DOCUMENT", certificateHelp: "Template for the Ultra format. Submit together with the Health Declaration.",
  downloadTitle: "Download the template", downloadHelp: "Take the document to a doctor for assessment, completion and signature.", download: "Download certificate as PDF",
  completedCertificate: "Completed certificate", optionalPreview: "Optional in this preview", fileHelp: "Select a PDF, JPG or PNG up to 10 MB. The file stays on this device and will not be sent.",
  chooseFile: "Choose file", noFile: "No file selected", previewSelected: "selected for preview only", removeLabel: "Remove selected certificate", remove: "Remove", continueNoFile: "Continue without a file",
  confirmation: "Information confirmation", consent: "I declare that the information provided is true, complete and up to date. I authorize the restricted use of this data by the Threerace Brasil organizers for safety, medical care and emergency care. I acknowledge that this declaration does not replace the medical certificate.",
  previewOnly: "This step is a preview only.", nothingSent: "No information will be sent.", review: "Review information", reviewEyebrow: "PREVIEW REVIEW", reviewTitle: "Check your information", reviewHelp: "Review your details before returning to update the form.",
  summaryIdentification: "Identification and emergency", selectedCertificate: "Selected certificate", authorization: "Declaration and authorization", confirmed: "Confirmed in this preview.", reviewed: "Preview reviewed. No information has been sent.", edit: "Edit information",
  fileTypeError: "Select a PDF, JPG or PNG file.", fileEmptyError: "The file is empty. Select another file.", fileSizeError: "The file must be no larger than 10 MB. Select a smaller file.",
  requiredError: "Complete this field.", emailError: "Enter a valid email address.", answerError: "Select Yes or No.", consentError: "Confirm the declaration and authorization to review your information.",
  phoneError: "Enter an emergency phone number with 8 to 15 digits, including the area code where applicable.",
};

export const medicalCopy: Record<SiteLanguage, MedicalCopy> = { pt, es, en };

export function medicalCertificatePath(locale: SiteLanguage) {
  return `/brasil-2027/atestado-medico-threerace-brasil-2027${locale === "pt" ? "" : `-${locale}`}.pdf`;
}

export function buildMedicalMetadata(locale: SiteLanguage): Metadata {
  const t = medicalCopy[locale];
  const path = brasilPath(locale, "/documentos-medicos");
  return {
    title: t.title,
    description: t.description,
    alternates: {
      canonical: path,
      languages: brasilAlternates("/documentos-medicos"),
    },
    robots: { index: false, follow: false },
    openGraph: { title: t.title, description: t.description, url: path, locale: brasilLanguageTags[locale].replace("-", "_") },
    twitter: { title: t.title, description: t.description },
  };
}
