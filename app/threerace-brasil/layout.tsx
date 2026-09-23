import SeoJsonLd from "../seo-json-ld";
import { buildBrasilJsonLd, buildBrasilMetadata } from "./metadata";

export const metadata = buildBrasilMetadata("pt");

export default function Layout({ children }: { children: React.ReactNode }) {
  return <><SeoJsonLd data={buildBrasilJsonLd("pt")} />{children}</>;
}
