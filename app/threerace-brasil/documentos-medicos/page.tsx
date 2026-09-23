import MedicalDocuments from "./medical-page";
import { buildMedicalMetadata } from "./localization";

export const metadata = buildMedicalMetadata("pt");

export default function MedicalDocumentsPage() {
  return <MedicalDocuments locale="pt" />;
}
