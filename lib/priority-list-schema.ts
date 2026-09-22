import { competitionCategories, competitionCategoryId } from "../app/threerace-brasil/content";

export const PRIORITY_CONSENT_VERSION = "brasil-2027-prioridade-v2";

// The registration options and server validation share the regulation's category list.
export const PRIORITY_CATEGORIES = competitionCategories.map((format) => ({
  id: format.id,
  name: format.name,
  groups: format.groups.map((group) => ({
    name: group.title,
    options: group.categories.map((category) => ({
      id: competitionCategoryId(format.id, group.title, category.name),
      label: `${category.name} · ${category.age}`,
      name: category.name,
    })),
  })),
}));

export type PriorityRegistration = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  modality: string;
  category: string;
  consent: true;
};

export function validatePriorityRegistration(input: unknown):
  | { ok: true; data: PriorityRegistration }
  | { ok: false; errors: Record<string, string> } {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, errors: { form: "Confira os dados do cadastro." } };
  }
  const raw = input as Record<string, unknown>;
  const clean = (key: string) => typeof raw[key] === "string" ? raw[key].trim().replace(/\s+/g, " ") : "";
  const fullName = clean("fullName");
  const email = clean("email").toLowerCase();
  const phoneInput = clean("phone");
  const phone = phoneInput.replace(/[^0-9]/g, "");
  const city = clean("city");
  const country = clean("country");
  const modality = clean("modality");
  const category = clean("category");
  const errors: Record<string, string> = {};
  if (fullName.length < 5 || fullName.length > 120 || !/^\p{L}[\p{L}\p{M} .’'\-]+\s+\p{L}[\p{L}\p{M} .’'\-]*$/u.test(fullName)) errors.fullName = "Informe seu nome completo, com nome e sobrenome.";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Informe um e-mail válido.";
  if (!/^[+\d ()\-.]+$/.test(phoneInput) || phone.length < 8 || phone.length > 15 || /^(\d)\1+$/.test(phone)) errors.phone = "Informe um telefone válido, com DDD ou código do país.";
  if (city.length < 2 || city.length > 100 || !/\p{L}/u.test(city) || /[\u0000-\u001f<>]/.test(city)) errors.city = "Informe sua cidade.";
  if (country.length < 2 || country.length > 80 || !/\p{L}/u.test(country) || /[\u0000-\u001f<>]/.test(country)) errors.country = "Informe seu país.";
  const format = PRIORITY_CATEGORIES.find((item) => item.id === modality);
  if (!format) errors.modality = "Escolha Ultra ou Sport.";
  if (!format?.groups.some((group) => group.options.some((option) => option.id === category))) errors.category = "Escolha uma categoria da modalidade selecionada.";
  if (raw.consent !== true) errors.consent = "Confirme que deseja receber as informações de acesso prioritário.";
  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, data: { fullName, email, phone, city, country, modality, category, consent: true } };
}
