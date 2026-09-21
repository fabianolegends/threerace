import { closeSync, fsyncSync, openSync, unlinkSync, writeFileSync } from "node:fs";
import { isAbsolute, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { readPriorityRegistrations } from "../lib/priority-list-store.ts";
import type { PriorityRegistrationRecord } from "../lib/priority-list-store.ts";
import { competitionCategories, competitionCategoryId } from "../app/threerace-brasil/content.ts";

const categoryLabels = new Map(competitionCategories.flatMap(format =>
  format.groups.flatMap(group => group.categories.map(category => [
    competitionCategoryId(format.id, group.title, category.name),
    `${group.title} · ${category.name}`,
  ] as const)),
));

function csvCell(value: unknown): string {
  let text = String(value ?? "");
  // Neutralize spreadsheet formulas, including phone numbers starting with '+'.
  if (/^[\s\u200B-\u200F\uFEFF]*[=+@-]/.test(text) || /^[\t\r\n]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""')}"`;
}

export function priorityRegistrationsCsv(rows: PriorityRegistrationRecord[]): string {
  const header = [
    "ID", "Evento", "Cadastro (UTC)", "Nome completo", "E-mail", "Telefone",
    "Cidade", "Estado", "Modalidade", "Categoria", "Consentimento", "Versão do consentimento",
  ];
  const records = rows.map(row => [
    row.id, row.eventId, row.submittedAt, row.fullName, row.email, row.phone,
    row.city, row.state, row.modality === "ultra" ? "Ultra" : "Sport", categoryLabels.get(row.category) ?? row.category, row.consent === 1 ? "Sim" : "Não", row.consentVersion,
  ]);
  return `\uFEFF${[header, ...records].map(row => row.map(csvCell).join(";")).join("\r\n")}\r\n`;
}

export function exportPriorityList(output: string): number {
  if (!isAbsolute(output) || !output.toLowerCase().endsWith(".csv")) {
    throw new Error("Informe um caminho absoluto terminado em .csv.");
  }
  const rows = readPriorityRegistrations();
  const descriptor = openSync(output, "wx", 0o600);
  try {
    writeFileSync(descriptor, priorityRegistrationsCsv(rows), "utf8");
    fsyncSync(descriptor);
  } catch (error) {
    closeSync(descriptor);
    unlinkSync(output);
    throw error;
  }
  closeSync(descriptor);
  return rows.length;
}

const invokedDirectly = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (invokedDirectly) {
  const args = process.argv.slice(2);
  if (args.length !== 2 || args[0] !== "--output") {
    console.error("Uso: node scripts/export-priority-list.ts --output /caminho/privado/lista-prioritaria.csv");
    process.exitCode = 1;
  } else {
    try {
      const count = exportPriorityList(args[1]);
      console.log(`Exportação concluída: ${count} cadastro(s).`);
    } catch {
      console.error("Não foi possível exportar. Confira o banco configurado e use um arquivo CSV que ainda não exista.");
      process.exitCode = 1;
    }
  }
}
