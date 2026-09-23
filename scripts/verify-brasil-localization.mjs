/** Run with: node scripts/verify-brasil-localization.mjs
 * Checks the editorial translation boundary, canonical registration values,
 * metadata and rendered copy without submitting forms or contacting services.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const directory = path.join(root, "app/threerace-brasil");
// Compile the actual source in memory; no generated application files are written.
const compile = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
}).outputText, filename);
require.extensions[".ts"] = compile;
require.extensions[".tsx"] = compile;
require.extensions[".css"] = () => {};
const source = require(path.join(directory, "content.ts"));
const { getBrasilContent } = require(path.join(directory, "content-i18n.ts"));
const { brasilPath, brasilLanguageTags } = require(path.join(directory, "localization.ts"));
const { buildBrasilMetadata, buildBrasilJsonLd } = require(path.join(directory, "metadata.ts"));
const { PRIORITY_CATEGORIES, validatePriorityRegistration } = require(path.join(root, "lib/priority-list-schema.ts"));
const { componentText, translatePriorityError } = require(path.join(directory, "components-i18n.ts"));

const stableFields = new Set(["id", "icon", "dateTime", "startDate", "endDate", "whatsapp", "email", "mapsUrl", "directionsUrl", "embedUrl"]);
// Same-language words and official names were reviewed explicitly. Everything
// else must receive a translation, making future missing entries fail this check.
const sharedNames = ["SÃO FRANCISCO DE PAULA · RIO GRANDE DO SUL", "São Francisco de Paula · Rio Grande do Sul", "Ultra", "Sport", "Master A1", "Master A2", "Master B1", "Master B2", "Master C1", "Master C2", "Master D", "Master A", "Master B", "Master C"];
const unchangedAllowed = {
  es: new Set([...sharedNames, "Centro de Eventos de São Francisco de Paula", "02 — 04 DE ABRIL · 2027", "Sábado, 3 de abril", "Domingo, 4 de abril", "Sub-23", "Sub-30", "Open masculina", "E-bike individual", "E-bike masculina", "Lote 2", "Lote 3", "Camiseta casual", "Placa personalizada", "Placa personalizada.", "Jersey de ciclismo.", "Ultra · Etapa de XCC", "SÁBADO · 03 DE ABRIL", "DOMINGO · 04 DE ABRIL", "CENTRO DE EVENTOS · SÃO FRANCISCO DE PAULA"]),
  en: new Set([...sharedNames, "Stage 1", "Stage 2", "Bike wash", "Bike wash."]),
};
const numerals = (text) => [...text.replace(/\b(\d{1,2}):00\b/g, "$1").matchAll(/\d+(?:[.,]\d+)?/g)].map(([number]) => Number(number.replace(",", ".")));
let checkedLeaves = 0;
function checkContent(original, translated, locale, location = []) {
  const label = `${locale}:${location.join(".")}`;
  assert.equal(typeof translated, typeof original, `${label}: value type changed`);
  if (original && typeof original === "object") {
    assert.equal(Array.isArray(translated), Array.isArray(original), `${label}: array/object changed`);
    assert.deepEqual(Object.keys(translated), Object.keys(original), `${label}: structure or order changed`);
    for (const key of Object.keys(original)) checkContent(original[key], translated[key], locale, [...location, key]);
    return;
  }
  checkedLeaves++;
  if (typeof original !== "string" || stableFields.has(location.at(-1))) {
    assert.equal(translated, original, `${label}: fact or identifier changed`);
    return;
  }
  assert.deepEqual(numerals(translated), numerals(original), `${label}: numbers inside text changed`);
  if (locale !== "pt" && translated === original && /[A-Za-zÀ-ž]/.test(original)) {
    assert(unchangedAllowed[locale].has(original), `${label}: untranslated editorial text: ${original}`);
  }
}

const pt = getBrasilContent("pt");
for (const key of Object.keys(pt)) assert.deepEqual(pt[key], source[key], `Portuguese source changed: ${key}`);
for (const locale of ["pt", "es", "en"]) {
  const content = getBrasilContent(locale);
  checkContent(pt, content, locale);
  for (const [formatIndex, format] of PRIORITY_CATEGORIES.entries()) {
    const translatedFormat = content.competitionCategories[formatIndex];
    assert.equal(format.id, translatedFormat.id);
    for (const [groupIndex, group] of format.groups.entries()) {
      const canonicalGroup = source.competitionCategories[formatIndex].groups[groupIndex];
      assert.equal(group.options.length, translatedFormat.groups[groupIndex].categories.length);
      for (const [categoryIndex, option] of group.options.entries()) {
        const expectedId = source.competitionCategoryId(format.id, canonicalGroup.title, canonicalGroup.categories[categoryIndex].name);
        assert.equal(option.id, expectedId, `${locale}: canonical category ID changed`);
        const valid = validatePriorityRegistration({ fullName: "Example Rider", email: "rider@example.test", phone: "+55 54 99999 9998", city: "São Francisco de Paula", country: "Brasil", modality: format.id, category: option.id, consent: true });
        assert(valid.ok, `${locale}: canonical category ${option.id} rejected`);
      }
    }
  }
  const metadata = buildBrasilMetadata(locale);
  assert.equal(metadata.alternates.canonical, brasilPath(locale));
  for (const code of ["pt", "es", "en"]) assert.equal(metadata.alternates.languages[brasilLanguageTags[code]], brasilPath(code));
  assert.equal(metadata.alternates.languages["x-default"], brasilPath("pt"));
  const event = buildBrasilJsonLd(locale);
  assert.equal(event.startDate, "2027-04-02");
  assert.equal(event.endDate, "2027-04-04");
  assert.equal(event.inLanguage, brasilLanguageTags[locale]);
}

function translationEntries(filename) {
  const ast = ts.createSourceFile(filename, fs.readFileSync(filename, "utf8"), ts.ScriptTarget.Latest, true);
  let entries;
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(ast) === "translations") {
      let value = node.initializer;
      while (ts.isAsExpression(value) || ts.isSatisfiesExpression(value)) value = value.expression;
      assert(ts.isObjectLiteralExpression(value), `${filename}: unsupported dictionary shape`);
      entries = value.properties.map((property) => {
        assert(ts.isPropertyAssignment(property));
        assert(ts.isArrayLiteralExpression(property.initializer));
        return [property.name.text, property.initializer.elements.map((item) => item.text)];
      });
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  assert(entries?.length, `Missing translations in ${filename}`);
  return entries;
}
const tokens = (text) => (text.match(/\{\w+\}/g) ?? []).sort();
let checkedTranslations = 0;
for (const filename of ["content-i18n.ts", "components-i18n.ts", "page-copy.ts"]) {
  for (const [original, translations] of translationEntries(path.join(directory, filename))) {
    assert.equal(translations.length, 2);
    for (const translated of translations) {
      assert(translated?.trim(), `${filename}: empty translation for ${original}`);
      assert.deepEqual(tokens(translated), tokens(original), `${filename}: template placeholders changed`);
      assert.deepEqual(numerals(translated), numerals(original), `${filename}: numeric facts changed in ${original}`);
      checkedTranslations++;
    }
  }
}

const componentKeys = new Set(translationEntries(path.join(directory, "components-i18n.ts")).map(([key]) => key));
const invalid = validatePriorityRegistration({});
assert(!invalid.ok);
const expectedErrors = new Set(Object.values(invalid.errors));
const apiFile = path.join(root, "app/api/brasil/priority-list/route.ts");
const apiAst = ts.createSourceFile(apiFile, fs.readFileSync(apiFile, "utf8"), ts.ScriptTarget.Latest, true);
function errorMessages(node) {
  if (ts.isCallExpression(node) && node.expression.getText(apiAst) === "errorResponse" && ts.isStringLiteral(node.arguments[1])) expectedErrors.add(node.arguments[1].text);
  ts.forEachChild(node, errorMessages);
}
errorMessages(apiAst);
for (const message of expectedErrors) {
  assert(componentKeys.has(message), `Missing priority form error translation: ${message}`);
  for (const locale of ["es", "en"]) assert.notEqual(translatePriorityError(message, locale), message);
}
for (const locale of ["es", "en"]) assert.equal(translatePriorityError("unexpected server error", locale), componentText(locale)("Não foi possível salvar agora. Tente novamente."));

const BrasilPage = require(path.join(directory, "brasil-page.tsx")).default;
const { PrioritySignupProvider } = require(path.join(directory, "priority-signup.tsx"));
const menu = {
  pt: ["Home", "Inscrições", "Etapas", "Kit", "Área médica"],
  es: ["Inicio", "Inscripciones", "Etapas", "Kit", "Área médica"],
  en: ["Home", "Registration", "Stages", "Kit", "Medical area"],
};
for (const locale of ["pt", "es", "en"]) {
  const html = renderToStaticMarkup(React.createElement(BrasilPage, { locale }));
  assert(html.includes(`lang="${brasilLanguageTags[locale]}"`));
  const navigation = html.match(/<nav id="brasil-navigation"[^>]*>([\s\S]*?)<\/nav>/)?.[1];
  assert(navigation, `${locale}: missing event menu`);
  assert.deepEqual([...navigation.matchAll(/<a[^>]*>([^<]+)<\/a>/g)].map((match) => match[1]), menu[locale], `${locale}: menu items or order changed`);
  for (const flag of ["🇧🇷", "🇪🇸", "🇬🇧"]) assert(html.includes(flag), `${locale}: missing language flag ${flag}`);
  for (const code of ["pt", "es", "en"]) assert(html.includes(`href="${brasilPath(code)}"`), `${locale}: missing language link ${code}`);
  assert(html.includes(`href="${brasilPath(locale, "/documentos-medicos")}"`), `${locale}: medical link lost its language`);
  for (const section of source.information) assert(html.includes(`id="${section.id}"`), `${locale}: missing section ID ${section.id}`);
  assert(!html.includes("undefined"), `${locale}: undefined rendered copy`);
  if (locale !== "pt") {
    for (const text of ["Formação das categorias", "Idade do mais jovem", "QUERO ME CADASTRAR", "Carregando contagem regressiva", "Camiseta casual dry", "Sacochila Threerace", "Fechar cadastro", "Escolha Ultra ou Sport", "INFORMAÇÕES COMPLETAS", "MONTANHAS, PESSOAS, HISTÓRIAS."]) assert(!html.includes(text), `${locale}: Portuguese copy leaked: ${text}`);
  }
  const form = renderToStaticMarkup(React.createElement(PrioritySignupProvider, { locale }));
  assert(form.includes("priority-title"));
  assert(/<form[^>]+\bnovalidate\b/i.test(form), `${locale}: localized validation must handle the form`);
  assert(form.includes('name="consent"'));
}
console.log(`Brazil localization verified: ${checkedLeaves} content values, ${checkedTranslations} translations, all registration categories, metadata and all three page renders.`);
