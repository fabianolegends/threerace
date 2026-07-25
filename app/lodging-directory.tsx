"use client";

import { useMemo, useState } from "react";

type Language = "es" | "pt" | "en";
type Filter = "all" | "official" | "discount" | "breakfast" | "wellness" | "bike" | "ocean";

type Lodging = {
  name: string;
  official?: boolean;
  whatsapp: string;
  phone: string;
  email: string;
  instagram: string;
  website: string;
  filters: Filter[];
  offer: Record<Language, string>;
  details: Record<Language, string>;
  features: Record<Language, string[]>;
};

const lodgings: Lodging[] = [
  {
    name: "Audencia Apart Hotel", official: true, whatsapp: "https://wa.me/59898814921", phone: "+598 98 814 921 / +598 99 150 827",
    email: "contacto@aparthotelaudencia.com", instagram: "https://www.instagram.com/hotelaudencia/", website: "https://aparthotelaudencia.com/",
    filters: ["official", "breakfast", "wellness", "bike"],
    offer: { es: "Paquetes especiales para atletas", pt: "Pacotes especiais para atletas", en: "Special packages for athletes" },
    details: { es: "Apartamentos equipados, desayuno, Wi-Fi, estacionamiento, gimnasio y piscinas, cerca de la playa.", pt: "Apartamentos equipados, café da manhã, Wi-Fi, estacionamento, academia e piscinas, perto da praia.", en: "Equipped apartments, breakfast, Wi-Fi, parking, gym and pools, close to the beach." },
    features: { es: ["Desayuno", "Piscinas", "Estacionamiento"], pt: ["Café da manhã", "Piscinas", "Estacionamento"], en: ["Breakfast", "Pools", "Parking"] },
  },
  {
    name: "Aloe Village Aparthotel & Spa", whatsapp: "https://wa.me/59898231468", phone: "+598 98 231 468",
    email: "reservas@aloevillage.com", instagram: "https://www.instagram.com/aloe_village_apart_hotel/", website: "https://aloevillage.com/",
    filters: ["discount", "wellness"],
    offer: { es: "15% de descuento + acceso libre a piscinas y spa", pt: "15% de desconto + acesso livre às piscinas e spa", en: "15% off + free access to pools and spa" },
    details: { es: "Beneficio del 30/10 al 02/11 y 10% de descuento en masajes.", pt: "Benefício de 30/10 a 02/11 e 10% de desconto em massagens.", en: "Benefit valid Oct 30–Nov 2 plus 10% off massages." },
    features: { es: ["Spa", "Piscinas", "15% OFF"], pt: ["Spa", "Piscinas", "15% OFF"], en: ["Spa", "Pools", "15% OFF"] },
  },
  {
    name: "Zen La Paloma", whatsapp: "https://wa.me/59892512725", phone: "+598 92 512 725",
    email: "stay@zenlapaloma.com", instagram: "https://www.instagram.com/zenlapaloma/", website: "https://www.zenlapaloma.com",
    filters: ["breakfast", "ocean"],
    offer: { es: "Tarifas especiales para participantes", pt: "Tarifas especiais para participantes", en: "Special rates for participants" },
    details: { es: "Suites frente al mar con desayuno. Consulte valores y disponibilidad.", pt: "Suítes de frente para o mar com café da manhã. Consulte valores e disponibilidade.", en: "Oceanfront suites with breakfast. Ask for rates and availability." },
    features: { es: ["Frente al mar", "Desayuno", "Suites"], pt: ["Frente para o mar", "Café da manhã", "Suítes"], en: ["Oceanfront", "Breakfast", "Suites"] },
  },
  {
    name: "Complejo Piccola Marina", whatsapp: "https://wa.me/59895536987", phone: "+598 95 536 987",
    email: "info@piccolamarina.com.uy", instagram: "https://www.instagram.com/piccolamarinauy/", website: "https://complejopiccolamarina.com.uy/",
    filters: ["discount"],
    offer: { es: "Promoción 3 × 2 · UYU 5.000 en efectivo", pt: "Promoção 3 × 2 · UYU 5.000 em dinheiro", en: "3-for-2 offer · UYU 5,000 cash" },
    details: { es: "Ropa de cama incluida, sin toallas. Depósito UYU 1.000. Check-in 13–20 h y salida 10 h.", pt: "Roupa de cama incluída, sem toalhas. Caução UYU 1.000. Check-in 13–20h e saída às 10h.", en: "Bed linen included, towels excluded. UYU 1,000 deposit. Check-in 1–8 pm; checkout 10 am." },
    features: { es: ["3 × 2", "Ropa de cama", "La Paloma"], pt: ["3 × 2", "Roupa de cama", "La Paloma"], en: ["3 for 2", "Bed linen", "La Paloma"] },
  },
  {
    name: "Sotavento Apart Hotel", whatsapp: "https://wa.me/59898544121", phone: "+598 98 544 121",
    email: "sotaventoaparthotel@gmail.com", instagram: "https://www.instagram.com/sotavento.lapaloma/", website: "https://sotaventoaparthotel.com/",
    filters: ["discount", "breakfast", "ocean"],
    offer: { es: "15% de descuento + desayuno continental", pt: "15% de desconto + café da manhã continental", en: "15% off + continental breakfast" },
    details: { es: "Frente al mar, Wi-Fi y estacionamiento. Beneficio del 30/10 al 01/11.", pt: "De frente para o mar, Wi-Fi e estacionamento. Benefício de 30/10 a 01/11.", en: "Oceanfront, Wi-Fi and parking. Benefit valid Oct 30–Nov 1." },
    features: { es: ["15% OFF", "Desayuno", "Frente al mar"], pt: ["15% OFF", "Café da manhã", "Frente para o mar"], en: ["15% OFF", "Breakfast", "Oceanfront"] },
  },
  {
    name: "Portobello Suites La Paloma Beach Hotel", whatsapp: "https://wa.me/59898146565", phone: "+598 98 146 565",
    email: "info@portobellosuites.com.uy", instagram: "https://www.instagram.com/portobellosuites/", website: "https://www.portobellosuites.com.uy",
    filters: ["breakfast", "wellness", "bike", "ocean"],
    offer: { es: "USD 45 por persona en habitación doble", pt: "USD 45 por pessoa em quarto duplo", en: "USD 45 per person in a double room" },
    details: { es: "Desayuno y late checkout sin costo, piscina, gimnasio, guardabicicletas y estacionamiento.", pt: "Café da manhã e late checkout grátis, piscina, academia, bicicletário e estacionamento.", en: "Breakfast and free late checkout, pool, gym, bike storage and parking." },
    features: { es: ["Desayuno", "Guardabicicletas", "Piscina"], pt: ["Café da manhã", "Bicicletário", "Piscina"], en: ["Breakfast", "Bike storage", "Pool"] },
  },
  {
    name: "La Casona Hotel", whatsapp: "https://wa.me/59891940393", phone: "+598 91 940 393",
    email: "lacasonahlp@gmail.com", instagram: "https://www.instagram.com/lacasonahotel.uy/", website: "https://lacasonahotel.uy/",
    filters: ["discount", "breakfast"],
    offer: { es: "30% de descuento para participantes", pt: "30% de desconto para participantes", en: "30% off for participants" },
    details: { es: "Desayuno, cerca de la largada y de la playa. Estacionamiento sujeto a disponibilidad.", pt: "Café da manhã, próximo à largada e à praia. Estacionamento sujeito à disponibilidade.", en: "Breakfast, close to the start and beach. Parking subject to availability." },
    features: { es: ["30% OFF", "Desayuno", "Cerca de la largada"], pt: ["30% OFF", "Café da manhã", "Perto da largada"], en: ["30% OFF", "Breakfast", "Near the start"] },
  },
  {
    name: "Hotel Palma de Mallorca", whatsapp: "https://wa.me/59892550002", phone: "+598 92 550 002",
    email: "reservas@hotelpalmademallorca.com", instagram: "https://www.instagram.com/palmademallorcahotel/", website: "https://www.hotelpalmademallorca.com/",
    filters: ["breakfast", "wellness", "bike"],
    offer: { es: "Desde USD 25 por persona/noche", pt: "A partir de USD 25 por pessoa/noite", en: "From USD 25 per person/night" },
    details: { es: "Desayuno, piscinas climatizadas y espacio para bicicletas/remolques. Reserva con 50% de seña.", pt: "Café da manhã, piscinas aquecidas e espaço para bicicletas/reboques. Reserva com 50% de sinal.", en: "Breakfast, heated pools and bike/trailer space. Booking requires a 50% deposit." },
    features: { es: ["Desayuno", "Piscinas climatizadas", "Bicicletas"], pt: ["Café da manhã", "Piscinas aquecidas", "Bicicletas"], en: ["Breakfast", "Heated pools", "Bike space"] },
  },
];

const ui = {
  es: {
    eyebrow: "HOSPEDAJES CONVENIADOS", title: "Tu base para vivir la experiencia.", intro: "Compara beneficios y habla directamente con cada alojamiento.",
    filters: { all: "Todos", official: "Hotel oficial", discount: "Descuentos", breakfast: "Desayuno", wellness: "Piscina / spa", bike: "Bicicletas", ocean: "Frente al mar" },
    official: "HOTEL OFICIAL", whatsapp: "CONSULTAR POR WHATSAPP", details: "Ver detalles", hide: "Ocultar detalles", site: "Sitio web", instagram: "Instagram", email: "E-mail",
    note: "Tarifas, condiciones y disponibilidad deben confirmarse directamente con el alojamiento.", results: "opciones",
  },
  pt: {
    eyebrow: "HOSPEDAGENS CONVENIADAS", title: "Sua base para viver a experiência.", intro: "Compare benefícios e fale diretamente com cada hospedagem.",
    filters: { all: "Todas", official: "Hotel oficial", discount: "Descontos", breakfast: "Café da manhã", wellness: "Piscina / spa", bike: "Bicicletas", ocean: "De frente para o mar" },
    official: "HOTEL OFICIAL", whatsapp: "CONSULTAR NO WHATSAPP", details: "Ver detalhes", hide: "Ocultar detalhes", site: "Site", instagram: "Instagram", email: "E-mail",
    note: "Tarifas, condições e disponibilidade devem ser confirmadas diretamente com a hospedagem.", results: "opções",
  },
  en: {
    eyebrow: "PARTNER ACCOMMODATION", title: "Your base for the full experience.", intro: "Compare benefits and contact each property directly.",
    filters: { all: "All", official: "Official hotel", discount: "Discounts", breakfast: "Breakfast", wellness: "Pool / spa", bike: "Bike-friendly", ocean: "Oceanfront" },
    official: "OFFICIAL HOTEL", whatsapp: "ASK ON WHATSAPP", details: "View details", hide: "Hide details", site: "Website", instagram: "Instagram", email: "Email",
    note: "Rates, conditions and availability must be confirmed directly with each property.", results: "options",
  },
} as const;

export default function LodgingDirectory({ language }: { language: Language }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<string | null>(null);
  const t = ui[language];
  const visible = useMemo(() => lodgings.filter((item) => filter === "all" || item.filters.includes(filter)), [filter]);

  return (
    <div className="lodging-directory">
      <div className="lodging-intro">
        <span>{t.eyebrow}</span>
        <h4>{t.title}</h4>
        <p>{t.intro}</p>
      </div>
      <div className="lodging-filters" aria-label={t.eyebrow}>
        {(Object.keys(t.filters) as Filter[]).map((key) => (
          <button key={key} type="button" className={filter === key ? "active" : ""} aria-pressed={filter === key} onClick={() => setFilter(key)}>
            {t.filters[key]}
          </button>
        ))}
      </div>
      <div className="lodging-count">{visible.length} {t.results}</div>
      <div className="lodging-grid">
        {visible.map((item) => {
          const expanded = open === item.name;
          return (
            <article className={`lodging-card${item.official ? " lodging-card-official" : ""}`} key={item.name}>
              <div className="lodging-card-head">
                <div>
                  {item.official && <span className="lodging-official">{t.official}</span>}
                  <h5>{item.name}</h5>
                  <small>La Paloma · Rocha · Uruguay</small>
                </div>
              </div>
              <strong className="lodging-offer">{item.offer[language]}</strong>
              <div className="lodging-features">{item.features[language].map((feature) => <span key={feature}>{feature}</span>)}</div>
              <div className="lodging-actions">
                <a className="lodging-whatsapp" href={item.whatsapp} target="_blank" rel="noreferrer">{t.whatsapp} ↗</a>
                <button type="button" aria-expanded={expanded} onClick={() => setOpen(expanded ? null : item.name)}>{expanded ? t.hide : t.details} {expanded ? "−" : "+"}</button>
              </div>
              {expanded && (
                <div className="lodging-details">
                  <p>{item.details[language]}</p>
                  <p><b>WhatsApp:</b> {item.phone}</p>
                  <nav>
                    <a href={item.website} target="_blank" rel="noreferrer">{t.site} ↗</a>
                    <a href={item.instagram} target="_blank" rel="noreferrer">{t.instagram} ↗</a>
                    <a href={`mailto:${item.email}`}>{t.email} ↗</a>
                  </nav>
                </div>
              )}
            </article>
          );
        })}
      </div>
      <p className="lodging-note">{t.note}</p>
    </div>
  );
}
