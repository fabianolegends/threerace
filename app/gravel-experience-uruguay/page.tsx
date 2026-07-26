"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { getSavedLanguage, saveLanguage } from "../site-language";
import LodgingDirectory from "../lodging-directory";

type Language = "es" | "pt" | "en";
type PanelKey = "event" | "registration" | "categories" | "stages" | "schedule" | "rules" | "stay";

const registrationUrl = "https://event.windfit.app/threerace-gravel-experience-uruguay-2026";
const lodgingUrl = "https://www.escapatearocha.uy/alojamientos?localidad=4&page=4";
const heroImage = "/gravel-experience-hero-v2.png";
const tr3HeaderLogo = "/tr3-logo-new.svg";
const azimutHeaderLogo = "/azimut-extremo-logo-white.svg";
const tr3Logo = "/tr3-logo-new.svg";
const azimutLogo = "/azimut-extremo-logo.png";
const azimutUrl = "https://www.azimutextremo.com/";
const galleryImages = [
  "/tr3-gallery-01.svg",
  "/tr3-gallery-02.svg",
  "/tr3-gallery-03.svg",
  "/tr3-gallery-04.svg",
  "/tr3-gallery-05.svg",
  "/tr3-gallery-06.svg",
  "/tr3-gallery-07.svg",
  "/tr3-gallery-08.svg",
];
const supportImages = ["/ministerio-turismo-uruguay.png", "/support-rocha.png", "/support-rocha-deportes.png", "/support-la-paloma.png", "/audencia-apart-hotel.svg"];

const copy = {
  es: {
    nav: ["HOME", "ETAPAS", "INSCRIPCIÓN", "INFORMACIÓN"],
    heroPlace: "ROCHA + LA PALOMA · URUGUAY",
    heroTitle: "GRAVEL",
    heroSubtitle: "EXPERIENCE URUGUAY",
    actions: [
      ["INSCRIPCIONES", "PLATAFORMA WINDFIT"],
      ["ETAPAS", "115 KM + 68 KM"],
      ["REGLAMENTO", "REGLAMENTO 2026"],
    ],
    countdown: ["DÍAS", "HORAS", "MINUTOS"],
    information: "INFORMACIÓN COMPLETA",
    panels: ["EL EVENTO", "INSCRIPCIONES", "CATEGORÍAS", "ETAPAS", "PROGRAMACIÓN", "REGLAMENTO", "HOSPEDAJE"],
    eventTitle: "Gravel Experience – La Paloma, Rocha, Uruguay",
    eventParagraphs: [
      "Gravel Experience es una experiencia de ciclismo creada para quienes buscan mucho más que simplemente completar una distancia. El evento combina aventura, desafío, naturaleza y la verdadera esencia del gravel: pedalear por caminos variados, explorar nuevos territorios y vivir cada kilómetro con intensidad.",
      "Integrado a la programación de la Threerace Bike Ultramarathon Uruguay, se realizará los días 31 de octubre y 1.º de noviembre de 2026, recorriendo caminos rurales, tramos de tierra, campos abiertos, paisajes costeros y escenarios naturales de Rocha.",
      "La propuesta ofrece una prueba desafiante y una inmersión en el espíritu gravel, donde el atleta encuentra viento, distancia, estrategia, superación y conexión con el entorno. Cada tramo une rendimiento, aventura y contemplación.",
      "La Paloma será el punto central del evento: una región emblemática de la costa uruguaya, conocida por su naturaleza, faro, playas, caminos rurales y paisajes únicos.",
      "Más que una prueba, Gravel Experience es una invitación a descubrir Uruguay sobre dos ruedas. No se trata solo de competir, sino de vivir el camino.",
    ],
    format: "FORMATO DEL EVENTO",
    formatText: "Dos etapas con desafío físico, navegación, resistencia y contacto directo con la naturaleza.",
    lots: [
      ["LOTE 01", "USD 149 + 10% de tasas", "25/06/2026 — 05/08/2026"],
      ["LOTE 02", "USD 179 + 10% de tasas", "06/08/2026 — 05/09/2026"],
      ["LOTE 03", "USD 199 + 10% de tasas", "06/09/2026 — 15/10/2026"],
    ],
    registrationNotes: [
      "Equipos con más de 10 integrantes deberán consultar condiciones especiales por el e-mail inscricoes@threerace.com.br.",
      "El valor y la fecha de la inscripción serán considerados desde la confirmación del pago, que puede variar hasta 5 días después del pago, y no desde la fecha de registro.",
      "El comprobante de pago deberá presentarse en la Secretaría de Carrera en caso de duda.",
    ],
    includedTitle: "INCLUIDO EN LA INSCRIPCIÓN",
    included: ["Jersey de ciclismo BIORACER", "Camiseta casual del evento", "Cap de ciclismo", "Medalla Finisher al completar al menos el 75% del evento", "Placa personalizada", "Seguro del atleta", "Puntos de hidratación", "Servicios médicos en el recorrido y atención básica en la arena", "Servicio mecánico básico", "Bike Wash"],
    excludedTitle: "NO INCLUIDO",
    excluded: ["Recuperación muscular", "Servicio mecánico completo", "Hospedaje o alimentación no descritos", "Traslados o transfer", "Servicio de fotografía"],
    categoriesIntro: "Categorías únicas, sin distinción por edad. La clasificación se define por el tiempo acumulado de los dos stages.",
    male: "MASCULINA",
    maleText: "Clasificación general masculina. Premiación del 1.º al 10.º colocado.",
    female: "FEMENINA",
    femaleText: "Clasificación general femenina. Premiación de la 1.ª a la 5.ª colocada.",
    categoryRules: ["Completar los dos stages dentro de los tiempos máximos", "Cumplir integralmente la ruta oficial", "Pasar por todos los puntos de control", "No recibir penalizaciones que resulten en descalificación", "La ausencia injustificada en la premiación podrá implicar la pérdida del trofeo"],
    stages: [
      { name: "STAGE 01 — 115 KM", date: "31/10/2026", start: "Gimnasio Polideportivo de Rocha", distance: "115 km", elevation: "1.214 m+", surface: "26% asfalto · 74% tierra", limit: "7 horas" },
      { name: "STAGE 02 — 68 KM", date: "01/11/2026", start: "Arena TR3 · La Paloma", distance: "68 km", elevation: "560 m+", surface: "31% asfalto · 69% tierra", limit: "4h30" },
    ],
    stageLabels: ["FECHA", "LARGADA", "DISTANCIA", "ELEVACIÓN", "SUPERFICIE", "TIEMPO LÍMITE"],
    schedule: [
      ["JUEVES · 29/10", ["16:00 · Apertura de la Arena Threerace Uruguay", "16:00–21:00 · Entrega de kits"]],
      ["VIERNES · 30/10", ["09:00 · Apertura de la Arena", "15:00–19:00 · Entrega de kits Gravel Experience"]],
      ["SÁBADO · 31/10", ["06:00 · Apertura de la Arena en Rocha", "06:50 · Apertura de portones para alineación", "07:00 · Largada Stage 01"]],
      ["DOMINGO · 01/11", ["07:00 · Apertura de la Arena", "07:45 · Apertura de portones para alineación", "08:00 · Largada Stage 02", "14:00 · Resultados oficiales", "14:30 · Premiación Gravel Experience", "15:00 · Cierre del evento"]],
    ],
    rulesTitle: "REGLAMENTO OFICIAL · GRAVEL EXPERIENCE 2026",
    rules: [
      ["1. PRESENTACIÓN", "Prueba oficial en dos etapas: 115 km desde Rocha, con límite de 7 horas, y 68 km desde La Paloma, con límite de 4h30. Clasificación masculina y femenina por tiempo acumulado."],
      ["2. PARTICIPACIÓN", "La inscripción implica aceptación del reglamento y de los riesgos del ciclismo gravel. Edad mínima de 18 años; menores solo con autorización. Bicicleta gravel segura, autonomía del atleta y drafting entre ciclistas permitido. Prohibido apoyo móvil, remolque, rueda de vehículos, cambio de bicicleta o abastecimiento fuera de los puntos autorizados."],
      ["3. CATEGORÍAS", "Categorías generales masculina y femenina, sin división por edad. Para clasificar es obligatorio completar ambos stages, seguir la ruta y no recibir descalificación."],
      ["4. REGISTRO", "Formulario Windfit, pago confirmado, documentación solicitada, término de responsabilidad y retirada personal del kit. La organización puede solicitar certificado médico y alterar o cancelar etapas por seguridad, clima, logística, fuerza mayor o decisión oficial."],
      ["5. EQUIPAMIENTO", "Obligatorios: casco, bicicleta segura, número visible, celular cargado, GPS con GPX, hidratación recomendada de 1,5 L, reparación básica, repuesto, bomba/CO₂, ropa adecuada y documento. Recomendados: tubeless, multiherramienta, luces, gafas, guantes, protector solar, efectivo, alimentación extra, lubricante y seguro personal."],
      ["6. NÚMERO", "El número oficial debe permanecer visible y no puede ser cortado, doblado, adulterado, cubierto o retirado."],
      ["7. SEGURIDAD", "La ruta comparte caminos abiertos con vehículos, peatones y animales. Es obligatorio respetar las leyes, señalización y staff, prestar ayuda en emergencias y comunicar accidentes o abandono."],
      ["8. TIEMPOS MÁXIMOS", "Stage 01: 7 horas. Stage 02: 4h30. Quien exceda el límite podrá ser retirado o continuar por cuenta propia, sin clasificación, premiación ni apoyo. Podrán existir cortes intermedios."],
      ["9. ABANDONO", "Todo abandono debe comunicarse inmediatamente. La organización no está obligada a proporcionar transporte, salvo emergencia o decisión de la dirección."],
      ["10. PENALIZACIONES", "Podrán generar penalización o descalificación: basura, falta de respeto, ausencia de equipo, desobediencia, recorte o ruta no autorizada, pérdida de controles, apoyo irregular, cambio de bicicleta, remolque, rueda de vehículo, falta de casco, número ajeno, inscripción irregular, riesgo a terceros o abandono no informado."],
      ["11. RUTA", "El GPX oficial es obligatorio. Cada atleta debe cargarlo correctamente. La ruta puede modificarse por seguridad, clima, permisos, terreno, tránsito o fuerza mayor."],
      ["12. PARTICIPANTES MÍNIMOS", "La realización depende de criterios técnicos, logísticos y operacionales. Actividades podrán ser canceladas, modificadas o reagrupadas."],
      ["13. PREMIACIÓN", "Top 10 masculino y top 5 femenino por acumulado. Es obligatorio completar las etapas, la ruta e todos los controles sin penalización descalificatoria."],
      ["14. PATROCINADORES", "Logotipos personales son permitidos si no contradicen las normas, seguridad, legislación o patrocinadores oficiales."],
      ["15. USO DE IMAGEN", "La inscripción autoriza el uso de imagen, voz, nombre, resultados, fotos, videos y registros del participante para fines institucionales, comerciales y promocionales."],
      ["16. LEY APLICABLE", "Las controversias seguirán la legislación de la República Oriental del Uruguay. Los casos omisos serán decididos por la organización y dirección de carrera."],
      ["17. DISPOSICIONES GENERALES", "La organización puede realizar ajustes técnicos, deportivos, logísticos y operacionales. Las comunicaciones oficiales se publicarán en sus canales; desconocer el reglamento no exime su cumplimiento."],
    ],
    stayTitle: "Opciones de hospedaje en La Paloma",
    stayText: "Consulte la guía oficial de alojamientos de Rocha y organice su estadía cerca de la arena del evento.",
    stayCta: "VER HOSPEDAJES",
    organizers: "ORGANIZACIÓN Y REALIZACIÓN",
    historyTitle: "¿YA CONOCES LA HISTORIA DE LA PRUEBA?",
    historyText: "Threerace Sports nació en 2017 para liderar los eventos competitivos de Ekonova Adventure. Con foco en mountain bike, consolidó la Threerace Bike Ultramarathon como referencia sudamericana y uno de los eventos brasileños con mayor presencia internacional.",
    finalTitle: "DOS ETAPAS. UN URUGUAY PARA DESCUBRIR.",
    finalCta: "INSCRIBIRME AHORA",
    menu: "Abrir menú",
    close: "Cerrar menú",
  },
  pt: {
    nav: ["HOME", "ETAPAS", "INSCRIÇÃO", "INFORMAÇÕES"],
    heroPlace: "ROCHA + LA PALOMA · URUGUAI", heroTitle: "GRAVEL", heroSubtitle: "EXPERIENCE URUGUAY",
    actions: [["INSCRIÇÕES", "PLATAFORMA WINDFIT"], ["ETAPAS", "115 KM + 68 KM"], ["REGULAMENTO", "REGULAMENTO 2026"]],
    countdown: ["DIAS", "HORAS", "MINUTOS"], information: "INFORMAÇÕES COMPLETAS",
    panels: ["O EVENTO", "INSCRIÇÕES", "CATEGORIAS", "ETAPAS", "PROGRAMAÇÃO", "REGULAMENTO", "HOSPEDAGEM"],
    eventTitle: "Gravel Experience – La Paloma, Rocha, Uruguai",
    eventParagraphs: [
      "A Gravel Experience foi criada para quem busca muito mais do que completar uma distância. O evento combina aventura, desafio, natureza e a essência do gravel: pedalar por terrenos variados, explorar novos territórios e viver cada quilômetro intensamente.",
      "Integrada à programação da Threerace Bike Ultramarathon Uruguay, será realizada em 31 de outubro e 1º de novembro de 2026, por estradas rurais, trechos de terra, campos abertos e paisagens costeiras de Rocha.",
      "A proposta é uma imersão no espírito gravel, unindo vento, distância, estratégia, superação, desempenho, aventura e contemplação.",
      "La Paloma será o centro do evento, com sua natureza, farol, praias, estradas rurais e paisagens únicas.",
      "Mais que uma prova, é um convite para descobrir o Uruguai sobre duas rodas: não apenas competir, mas viver o caminho.",
    ],
    format: "FORMATO DO EVENTO", formatText: "Duas etapas com desafio físico, navegação, resistência e contato direto com a natureza.",
    lots: [["LOTE 01", "USD 149 + 10% de taxas", "25/06/2026 — 05/08/2026"], ["LOTE 02", "USD 179 + 10% de taxas", "06/08/2026 — 05/09/2026"], ["LOTE 03", "USD 199 + 10% de taxas", "06/09/2026 — 15/10/2026"]],
    registrationNotes: ["Equipes com mais de 10 integrantes devem consultar condições especiais pelo e-mail inscricoes@threerace.com.br.", "O valor e a data da inscrição serão considerados após a confirmação do pagamento, que pode levar até 5 dias.", "O comprovante poderá ser solicitado na Secretaria de Prova."],
    includedTitle: "INCLUÍDO NA INSCRIÇÃO", included: ["Jersey de ciclismo BIORACER", "Camiseta casual do evento", "Cap de ciclismo", "Medalha Finisher ao completar ao menos 75% do evento", "Placa personalizada", "Seguro do atleta", "Pontos de hidratação", "Serviços médicos no percurso e arena", "Mecânica básica", "Bike Wash"],
    excludedTitle: "NÃO INCLUÍDO", excluded: ["Recuperação muscular", "Mecânica completa", "Hospedagem ou alimentação não descritas", "Traslados ou transfer", "Fotografia"],
    categoriesIntro: "Categorias únicas, sem divisão por idade. A classificação é definida pelo tempo acumulado das duas etapas.", male: "MASCULINA", maleText: "Geral masculina, com premiação do 1º ao 10º.", female: "FEMININA", femaleText: "Geral feminina, com premiação da 1ª à 5ª.",
    categoryRules: ["Completar as duas etapas dentro dos tempos máximos", "Cumprir integralmente a rota oficial", "Passar por todos os pontos de controle", "Não receber penalização desclassificatória", "Ausência injustificada na premiação pode implicar perda do troféu"],
    stages: [
      { name: "STAGE 01 — 115 KM", date: "31/10/2026", start: "Ginásio Poliesportivo de Rocha", distance: "115 km", elevation: "1.214 m+", surface: "26% asfalto · 74% terra", limit: "7 horas" },
      { name: "STAGE 02 — 68 KM", date: "01/11/2026", start: "Arena TR3 · La Paloma", distance: "68 km", elevation: "560 m+", surface: "31% asfalto · 69% terra", limit: "4h30" },
    ],
    stageLabels: ["DATA", "LARGADA", "DISTÂNCIA", "ELEVAÇÃO", "SUPERFÍCIE", "TEMPO LIMITE"],
    schedule: [["QUINTA · 29/10", ["16:00 · Abertura da Arena", "16:00–21:00 · Entrega de kits"]], ["SEXTA · 30/10", ["09:00 · Abertura da Arena", "15:00–19:00 · Entrega de kits Gravel"]], ["SÁBADO · 31/10", ["06:00 · Abertura da Arena em Rocha", "06:50 · Alinhamento", "07:00 · Largada Stage 01"]], ["DOMINGO · 01/11", ["07:00 · Abertura da Arena", "07:45 · Alinhamento", "08:00 · Largada Stage 02", "14:00 · Resultados oficiais", "14:30 · Premiação Gravel Experience", "15:00 · Encerramento"]]],
    rulesTitle: "REGULAMENTO OFICIAL · GRAVEL EXPERIENCE 2026",
    rules: [
      ["1. APRESENTAÇÃO", "Prova em duas etapas: 115 km, limite de 7h, e 68 km, limite de 4h30. Classificação masculina e feminina pelo tempo acumulado."],
      ["2. PARTICIPAÇÃO", "Inscrição implica aceitar o regulamento e os riscos. Idade mínima 18 anos; menor só com autorização. Bicicleta gravel segura, autonomia e drafting permitido. Proibidos apoio móvel, reboque, vácuo de veículos, troca de bicicleta e abastecimento irregular."],
      ["3. CATEGORIAS", "Gerais masculina e feminina, sem idade. É obrigatório completar ambas as etapas, seguir a rota e não ser desclassificado."],
      ["4. INSCRIÇÃO", "Formulário Windfit, pagamento, documentos, termo e retirada pessoal do kit. Pode haver exigência médica e alterações por segurança, clima, logística ou força maior."],
      ["5. EQUIPAMENTOS", "Obrigatórios: capacete, bicicleta segura, número, celular, GPS com GPX, hidratação recomendada 1,5 L, reparo, reserva, bomba/CO₂, roupa e documento. Recomendados: tubeless, ferramentas, luzes, óculos, luvas, protetor, dinheiro, alimentação, lubrificante e seguro."],
      ["6. NÚMERO", "O número deve ficar visível e não pode ser cortado, dobrado, adulterado, coberto ou retirado."],
      ["7. SEGURANÇA", "Respeitar trânsito, sinalização e staff, prestar ajuda em emergências e comunicar acidentes ou abandono."],
      ["8. TEMPOS", "Stage 01: 7h. Stage 02: 4h30. Exceder o limite elimina classificação, premiação e apoio. Podem existir cortes intermediários."],
      ["9. ABANDONO", "O abandono deve ser comunicado imediatamente. Transporte não é obrigatório, salvo emergência ou decisão da direção."],
      ["10. PENALIZAÇÕES", "Lixo, desrespeito, falta de equipamento, desobediência, atalhos, perda de controles, apoio irregular, troca de bicicleta, reboque, vácuo, falta de capacete, número alheio, inscrição irregular, risco ou abandono não informado podem penalizar ou desclassificar."],
      ["11. ROTA", "O GPX oficial é obrigatório e pode ser alterado por segurança, clima, permissões, terreno, trânsito ou força maior."],
      ["12. MÍNIMO", "A realização depende de critérios técnicos, logísticos e operacionais; atividades podem ser canceladas, alteradas ou reagrupadas."],
      ["13. PREMIAÇÃO", "Top 10 masculino e top 5 feminino. É necessário completar etapas, rota e controles sem desclassificação."],
      ["14. PATROCÍNIOS", "Logos pessoais são permitidas se respeitarem normas, segurança, leis e patrocinadores oficiais."],
      ["15. IMAGEM", "A inscrição autoriza uso de imagem, voz, nome, resultados, fotos e vídeos para fins institucionais, comerciais e promocionais."],
      ["16. LEI", "Aplica-se a legislação uruguaia; casos omissos serão decididos pela organização e direção."],
      ["17. DISPOSIÇÕES", "A organização pode fazer ajustes técnicos, esportivos e logísticos. Comunicados oficiais serão publicados nos canais do evento."],
    ],
    stayTitle: "Opções de hospedagem em La Paloma", stayText: "Consulte o guia oficial de hospedagens de Rocha e organize sua estadia próximo à arena.", stayCta: "VER HOSPEDAGENS",
    organizers: "ORGANIZAÇÃO E REALIZAÇÃO", historyTitle: "JÁ CONHECE A HISTÓRIA DA PROVA?", historyText: "A Threerace Sports nasceu em 2017 para liderar os eventos competitivos da Ekonova Adventure. Com foco no MTB, consolidou a Threerace Bike Ultramarathon como referência sul-americana e um dos eventos brasileiros com maior participação estrangeira.",
    finalTitle: "DUAS ETAPAS. UM URUGUAI PARA DESCOBRIR.", finalCta: "INSCREVER-ME AGORA", menu: "Abrir menu", close: "Fechar menu",
  },
  en: {
    nav: ["HOME", "STAGES", "REGISTRATION", "INFORMATION"],
    heroPlace: "ROCHA + LA PALOMA · URUGUAY", heroTitle: "GRAVEL", heroSubtitle: "EXPERIENCE URUGUAY",
    actions: [["REGISTRATION", "WINDFIT PLATFORM"], ["STAGES", "115 KM + 68 KM"], ["RULEBOOK", "2026 RULEBOOK"]],
    countdown: ["DAYS", "HOURS", "MINUTES"], information: "COMPLETE INFORMATION",
    panels: ["THE EVENT", "REGISTRATION", "CATEGORIES", "STAGES", "SCHEDULE", "RULEBOOK", "ACCOMMODATION"],
    eventTitle: "Gravel Experience – La Paloma, Rocha, Uruguay",
    eventParagraphs: ["Gravel Experience is for riders seeking more than a finish line. It combines adventure, challenge, nature and the true essence of gravel.", "Part of Threerace Bike Ultramarathon Uruguay, it takes place on October 31 and November 1, 2026, across rural roads, dirt, open fields and Rocha's coastline.", "The course blends wind, distance, strategy, resilience, performance and contemplation.", "La Paloma is the event hub, known for its lighthouse, beaches, rural roads and unique scenery.", "More than a race, it is an invitation to discover Uruguay on two wheels: not only to compete, but to live the road."],
    format: "EVENT FORMAT", formatText: "Two stages combining physical challenge, navigation, endurance and direct contact with nature.",
    lots: [["BATCH 01", "USD 149 + 10% fees", "06/25/2026 — 07/25/2026"], ["BATCH 02", "USD 179 + 10% fees", "07/26/2026 — 08/25/2026"], ["BATCH 03", "USD 199 + 10% fees", "08/26/2026 — 10/20/2026"]],
    registrationNotes: ["Teams with more than 10 riders should request special conditions at inscricoes@threerace.com.br.", "The registration value and date are based on payment confirmation, which may take up to 5 days.", "Proof of payment may be requested at Race Office."],
    includedTitle: "INCLUDED", included: ["BIORACER cycling jersey", "Casual event shirt", "Cycling cap", "Finisher medal after completing at least 75%", "Personalized number plate", "Athlete insurance", "Hydration points", "Medical services on course and at the arena", "Basic mechanical service", "Bike Wash"],
    excludedTitle: "NOT INCLUDED", excluded: ["Muscle recovery", "Complete mechanical service", "Unlisted accommodation or meals", "Transfers", "Photography"],
    categoriesIntro: "Open categories with no age divisions. Classification uses the accumulated time of both stages.", male: "MEN", maleText: "Men's overall, awards from 1st to 10th.", female: "WOMEN", femaleText: "Women's overall, awards from 1st to 5th.",
    categoryRules: ["Finish both stages within time limits", "Follow the entire official route", "Pass every control point", "Receive no disqualifying penalty", "Unjustified absence from awards may forfeit the trophy"],
    stages: [{ name: "STAGE 01 — 115 KM", date: "10/31/2026", start: "Rocha Sports Gym", distance: "115 km", elevation: "1,214 m+", surface: "26% paved · 74% dirt", limit: "7 hours" }, { name: "STAGE 02 — 68 KM", date: "11/01/2026", start: "TR3 Arena · La Paloma", distance: "68 km", elevation: "560 m+", surface: "31% paved · 69% dirt", limit: "4h30" }],
    stageLabels: ["DATE", "START", "DISTANCE", "ELEVATION", "SURFACE", "TIME LIMIT"],
    schedule: [["THURSDAY · OCT 29", ["16:00 · Arena opens", "16:00–21:00 · Kit pickup"]], ["FRIDAY · OCT 30", ["09:00 · Arena opens", "15:00–19:00 · Gravel kit pickup"]], ["SATURDAY · OCT 31", ["06:00 · Rocha Arena opens", "06:50 · Starting grid opens", "07:00 · Stage 01 start"]], ["SUNDAY · NOV 01", ["07:00 · Arena opens", "07:45 · Starting grid opens", "08:00 · Stage 02 start", "14:00 · Official results", "14:30 · Awards", "15:00 · Event closes"]]],
    rulesTitle: "OFFICIAL RULEBOOK · GRAVEL EXPERIENCE 2026",
    rules: [
      ["1. EVENT", "Two stages: 115 km with a 7-hour limit and 68 km with a 4h30 limit. Men's and women's accumulated-time classification."], ["2. PARTICIPATION", "Registration accepts the rules and risks. Minimum age 18; minors need authorization. Safe gravel bike, rider autonomy and rider drafting allowed. Mobile support, towing, vehicle drafting, bike swaps and unauthorized aid are prohibited."], ["3. CATEGORIES", "Men's and women's overall, no age split. Both stages and the full route must be completed without disqualification."], ["4. REGISTRATION", "Windfit form, payment, documents, waiver and personal kit pickup. Medical documents may be required; changes may occur for safety, weather, logistics or force majeure."], ["5. EQUIPMENT", "Required: helmet, safe bike, number, phone, GPS/GPX, recommended 1.5 L hydration, repair kit, spare, pump/CO₂, suitable clothing and ID. Tubeless, tools, lights, eyewear, gloves, sunscreen, cash, extra food, lubricant and insurance are recommended."], ["6. NUMBER", "The official number must remain visible and may not be cut, folded, altered, covered or removed."], ["7. SAFETY", "Obey traffic laws, signage and staff; assist emergencies and report accidents or withdrawal."], ["8. TIME LIMITS", "Stage 01: 7h. Stage 02: 4h30. Exceeding limits removes classification, awards and support. Intermediate cutoffs may apply."], ["9. WITHDRAWAL", "Withdrawal must be reported immediately. Return transport is not guaranteed except in emergencies or by race direction."], ["10. PENALTIES", "Littering, disrespect, missing gear, disobedience, shortcuts, missed controls, illegal aid, bike swaps, towing, vehicle drafting, no helmet, wrong number, irregular entry, dangerous behavior or unreported withdrawal may penalize or disqualify."], ["11. ROUTE", "The official GPX is mandatory and may change for safety, weather, permissions, terrain, traffic or force majeure."], ["12. MINIMUM FIELD", "The event depends on technical, logistical and operational criteria; activities may be cancelled, changed or regrouped."], ["13. AWARDS", "Top 10 men and top 5 women. Riders must complete stages, route and controls without disqualification."], ["14. SPONSORS", "Personal sponsor logos are allowed if they comply with rules, safety, law and official sponsors."], ["15. IMAGE RIGHTS", "Entry authorizes use of image, voice, name, results, photos and video for institutional, commercial and promotional purposes."], ["16. LAW", "Uruguayan law applies; omitted cases are decided by organizers and race direction."], ["17. GENERAL", "Organizers may make technical, sporting and logistical adjustments. Official communications are published through event channels."],
    ],
    stayTitle: "Accommodation options in La Paloma", stayText: "Use Rocha's official accommodation guide and plan your stay close to the arena.", stayCta: "VIEW ACCOMMODATION",
    organizers: "ORGANIZATION", historyTitle: "DO YOU KNOW THE RACE STORY?", historyText: "Threerace Sports was founded in 2017 to lead Ekonova Adventure's competitive events. Focused on MTB, it established Threerace Bike Ultramarathon as a South American reference with strong international participation.",
    finalTitle: "TWO STAGES. A URUGUAY TO DISCOVER.", finalCta: "REGISTER NOW", menu: "Open menu", close: "Close menu",
  },
} as const;

function Icon({ kind }: { kind: "register" | "stages" | "rules" }) {
  if (kind === "register") return <svg viewBox="0 0 48 48"><rect x="9" y="6" width="30" height="36" rx="3"/><circle cx="20" cy="19" r="5"/><path d="M13 34c1-6 4-9 7-9s6 3 7 9M30 17h5M30 23h5M30 29h5"/></svg>;
  if (kind === "stages") return <svg viewBox="0 0 48 48"><path d="M8 35 17 9l9 26 6-18 8 18"/><circle cx="17" cy="9" r="3"/><circle cx="40" cy="35" r="3"/></svg>;
  return <svg viewBox="0 0 48 48"><path d="M13 5h17l7 7v31H13zM30 5v9h7M19 23h13M19 29h13M19 35h9"/></svg>;
}

function ActionArrow({ direction }: { direction: "external" | "down" }) {
  return direction === "external"
    ? <svg aria-hidden="true" viewBox="0 0 32 32"><path d="M7 25 25 7M12 7h13v13" /></svg>
    : <svg aria-hidden="true" viewBox="0 0 32 32"><path d="M16 5v22M8 19l8 8 8-8" /></svg>;
}

function List({ children }: { children: ReactNode }) {
  return <ul className="gravel-clean-list">{children}</ul>;
}

export default function GravelExperienceUruguay() {
  const [language, setLanguage] = useState<Language>("es");
  const [open, setOpen] = useState<PanelKey | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryVisible, setGalleryVisible] = useState(3);
  const [now, setNow] = useState(() => Date.now());
  const t = copy[language];
  const countdown = useMemo(() => {
    const target = new Date("2026-10-31T07:00:00-03:00").getTime();
    const remaining = Math.max(0, target - now);
    return [Math.floor(remaining / 86400000), Math.floor((remaining / 3600000) % 24), Math.floor((remaining / 60000) % 60)];
  }, [now]);

  useEffect(() => {
    const saved = getSavedLanguage("es");
    setLanguage(saved);
    saveLanguage(saved);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const updateGallery = () => {
      const visible = media.matches ? 1 : 3;
      setGalleryVisible(visible);
      setGalleryIndex((current) =>
        Math.min(current, galleryImages.length - visible)
      );
    };

    updateGallery();
    media.addEventListener("change", updateGallery);
    return () => media.removeEventListener("change", updateGallery);
  }, []);

  const galleryLastIndex = Math.max(
    0,
    galleryImages.length - galleryVisible
  );

  const panelKeys: PanelKey[] = ["event", "registration", "categories", "stages", "schedule", "rules", "stay"];
  const actionTargets = [registrationUrl, "#stages", "#rules"];

  const panelContent = (key: PanelKey) => {
    if (key === "event") return <div className="official-copy"><h4>{t.eventTitle}</h4>{t.eventParagraphs.map((p) => <p key={p}>{p}</p>)}<h4>{t.format}</h4><p>{t.formatText}</p><div className="gravel-distance-strip"><b>STAGE 01</b><span>31.10.2026 · 115 KM</span><b>STAGE 02</b><span>01.11.2026 · 68 KM</span></div></div>;
    if (key === "registration") return <div className="official-copy"><div className="gravel-lots">{t.lots.map(([name, price, date]) => <article key={name}><b>{name}</b><strong>{price}</strong><span>{date}</span></article>)}</div>{t.registrationNotes.map((p) => <p key={p}>{p}</p>)}<div className="gravel-two-columns"><div><h4>{t.includedTitle}</h4><List>{t.included.map((item) => <li key={item}>{item}</li>)}</List></div><div><h4>{t.excludedTitle}</h4><List>{t.excluded.map((item) => <li key={item}>{item}</li>)}</List></div></div><a className="button button-primary accordion-action" href={registrationUrl} target="_blank" rel="noreferrer">{t.finalCta} ↗</a></div>;
    if (key === "categories") return <div className="official-copy"><p>{t.categoriesIntro}</p><div className="gravel-category-grid"><article><b>{t.male}</b><p>{t.maleText}</p></article><article><b>{t.female}</b><p>{t.femaleText}</p></article></div><List>{t.categoryRules.map((item) => <li key={item}>{item}</li>)}</List></div>;
    if (key === "stages") return <div className="official-copy"><div className="gravel-stage-details">{t.stages.map((stage) => <article key={stage.name}><h4>{stage.name}</h4>{[stage.date, stage.start, stage.distance, stage.elevation, stage.surface, stage.limit].map((value, index) => <p key={t.stageLabels[index]}><b>{t.stageLabels[index]}:</b> {value}</p>)}</article>)}</div></div>;
    if (key === "schedule") return <div className="official-copy gravel-schedule">{t.schedule.map(([day, entries]) => <section key={day as string}><h4>{day}</h4><List>{(entries as readonly string[]).map((item) => <li key={item}>{item}</li>)}</List></section>)}</div>;
    if (key === "rules") return <div className="official-copy gravel-rules"><h4>{t.rulesTitle}</h4>{t.rules.map(([title, text]) => <section key={title}><h4>{title}</h4><p>{text}</p></section>)}</div>;
    return <div className="official-copy"><LodgingDirectory language={language} /></div>;
  };

  return (
    <main className="uruguay-event-page gravel-event-page">
      <section className="hero uruguay-event-hero gravel-event-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <header className="site-header">
          <a className="brand" href="/" aria-label="Threerace Sports">
            <img className="header-tr3-logo" src={tr3HeaderLogo} alt="Threerace Sports" />
            <img className="header-azimut-logo" src={azimutHeaderLogo} alt="Azimut Extremo" />
          </a>
          <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
            <a href="/">{t.nav[0]}</a><a href="#stages">{t.nav[1]}</a><a href={registrationUrl} target="_blank" rel="noreferrer">{t.nav[2]}</a><a href="#information">{t.nav[3]}</a>
          </nav>
          <div className="header-actions"><div className="language-switcher" aria-label="Language selector">{(["es", "pt", "en"] as Language[]).map((code) => <button key={code} className={language === code ? "active" : ""} type="button" onClick={() => { setLanguage(code); saveLanguage(code); }} aria-label={code} aria-pressed={language === code}>{{ es: "🇪🇸", pt: "🇧🇷", en: "🇬🇧" }[code]}</button>)}</div><button className="menu-toggle" type="button" aria-label={menuOpen ? t.close : t.menu} onClick={() => setMenuOpen(!menuOpen)}><span/><span/></button></div>
        </header>
        <div className="uruguay-title-block gravel-title-block"><p className="location">{t.heroPlace}</p><h1>{t.heroTitle}<small>{t.heroSubtitle}</small></h1></div>
        <section className="original-action-cards section-frame" aria-label="Quick access">{t.actions.map(([title, note], index) => <a key={title} href={actionTargets[index]} target={index === 0 ? "_blank" : undefined} rel={index === 0 ? "noreferrer" : undefined}><Icon kind={(["register", "stages", "rules"] as const)[index]} /><b>{title}</b><small>{note}</small><i><ActionArrow direction={index === 0 ? "external" : "down"} /></i></a>)}</section>
      </section>

      <section className="countdown-section" aria-label="Countdown"><div className="section-frame countdown-grid">{countdown.map((value, index) => <div className="countdown-unit" key={t.countdown[index]}><b>{String(value).padStart(2, "0")}</b><span>{t.countdown[index]}</span></div>)}</div></section>

      <section className="original-information" id="information"><div className="section-frame"><h2>{t.information}</h2><div className="original-accordion">{panelKeys.map((key, index) => <article id={key === "stages" ? "stages" : key === "rules" ? "rules" : undefined} className={open === key ? "open" : ""} key={key}><div className="accordion-trigger"><span className="accordion-field-icon"><Icon kind={index === 1 ? "register" : index === 3 ? "stages" : "rules"} /></span><b>{t.panels[index]}</b><button type="button" onClick={() => setOpen(open === key ? null : key)} aria-expanded={open === key} aria-label={open === key ? t.close : t.menu}><i>{open === key ? "−" : "+"}</i></button></div>{open === key && <div className="accordion-panel-inner">{panelContent(key)}</div>}</article>)}</div></div></section>

      <section className="original-about section-frame">
        <div className="original-about-copy">
          <h2>{t.historyTitle}</h2>
          <p>{t.historyText}</p>
          <p>{language === "pt" ? "Com foco principal em eventos de mountain bike e gravel, a empresa consolidou uma comunidade internacional de atletas do Uruguai, Argentina, Chile, Paraguai e Brasil." : language === "en" ? "Focused on mountain bike and gravel events, the company has built an international community of athletes from Uruguay, Argentina, Chile, Paraguay and Brazil." : "Con foco en mountain bike y gravel, la empresa consolidó una comunidad internacional de atletas de Uruguay, Argentina, Chile, Paraguay y Brasil."}</p>
        </div>
        <div className="original-about-brand">
          <span><img src={tr3Logo} alt="Threerace Sports" /></span>
          <a href="/">{language === "pt" ? "SAIBA MAIS" : language === "en" ? "DISCOVER MORE" : "CONOCE MÁS"} +++</a>
        </div>
      </section>

      <section className="original-gallery" aria-label="Galeria Gravel Experience Uruguay">
        <div className="original-gallery-viewport">
          <div
            className="original-gallery-track"
            style={{
              transform: `translateX(-${galleryIndex * (100 / galleryVisible)}%)`,
            }}
          >
            {galleryImages.map((image, index) => (
              <figure className="original-gallery-slide" key={image}>
                <img
                  src={image}
                  alt={`Gravel Experience Uruguay — foto ${index + 1}`}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </div>
        <button
          className="original-gallery-control original-gallery-prev"
          type="button"
          aria-label={language === "en" ? "Previous photo" : "Foto anterior"}
          disabled={galleryIndex === 0}
          onClick={() =>
            setGalleryIndex((current) => Math.max(0, current - 1))
          }
        >
          ←
        </button>
        <button
          className="original-gallery-control original-gallery-next"
          type="button"
          aria-label={
            language === "es"
              ? "Foto siguiente"
              : language === "en"
                ? "Next photo"
                : "Próxima foto"
          }
          disabled={galleryIndex === galleryLastIndex}
          onClick={() =>
            setGalleryIndex((current) =>
              Math.min(galleryLastIndex, current + 1)
            )
          }
        >
          →
        </button>
        <span className="original-gallery-count" aria-hidden="true">
          {String(galleryIndex + 1).padStart(2, "0")} /{" "}
          {String(galleryImages.length).padStart(2, "0")}
        </span>
      </section>

      <section className="azimut-feature">
        <a className="section-frame" href={azimutUrl} target="_blank" rel="noreferrer">
          <img src="/azimut-extremo-logo.png" alt="Azimut Extremo Outdoor Adventures" />
          <div>
            <p className="section-label">PARTNER URUGUAY</p>
            <h2>{language === "pt" ? <>CONHEÇA A EMPRESA PARCEIRA<br className="azimut-title-break" />QUE ORGANIZA A THREERACE<br className="azimut-title-break" />NO URUGUAI</> : language === "en" ? <>MEET THE PARTNER<br className="azimut-title-break" />BEHIND THREERACE<br className="azimut-title-break" />IN URUGUAY</> : <>CONOCE A LA EMPRESA<br className="azimut-title-break" />ALIADA QUE ORGANIZA<br className="azimut-title-break" />THREERACE EN URUGUAY</>}</h2>
            <span>{language === "en" ? "VISIT AZIMUT EXTREMO" : "VISITAR AZIMUT EXTREMO"} ↗</span>
          </div>
        </a>
      </section>

      <section className="original-kit">
        <div className="benefits-art-wrap">
          <img className="benefits-art" src="/threerace-benefits-gravel-cap.png" alt={t.includedTitle} />
        </div>
      </section>

      <section className="original-partners" id="contact">
        <div className="section-frame">
          <div className="original-organizers"><p>{t.organizers}</p><img src="/tr3-logo-new.svg" alt="Threerace Sports" /><img src="/azimut-extremo-logo.png" alt="Azimut Extremo" /></div>
          <div className="original-main-sponsor"><p>OFFICIAL SPONSOR</p><img src="/epic-bike-store.png" alt="Epic Bike Store" /></div>
          <div className="original-brands">
            <p>{language === "pt" ? "MARCAS PARCEIRAS" : language === "en" ? "PARTNER BRANDS" : "MARCAS ASOCIADAS"}</p>
            <img className="partner-brands-all" src="/partner-brands-row.png" alt="Orbea, Bioracer, 226ERS, Rudy Project, Shokz, DJI e Insta360" />
            <div className="partner-brands-mobile" aria-hidden="true">
              <img src="/partner-brands-mobile-1.svg" alt="" />
              <img src="/partner-brands-mobile-2.svg" alt="" />
            </div>
          </div>
          <div className="original-support">
            <p>{language === "pt" ? "APOIO" : language === "en" ? "SUPPORTERS" : "APOYAN"}</p>
            <div className="support-logo-row">
              <div className="support-logo-line support-logo-line-top">
                {supportImages.slice(0, 2).map((image, index) => <img src={image} alt={`Event supporter ${index + 1}`} key={image} />)}
              </div>
              <div className="support-logo-line support-logo-line-bottom">
                {supportImages.slice(2).map((image, index) => <img src={image} alt={`Event supporter ${index + 3}`} key={image} />)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
