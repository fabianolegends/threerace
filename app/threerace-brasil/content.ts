// Dados fornecidos pela organização em 21/09/2026. Esta é a fonte editorial da página.
export const brasilEvent = {
  location: "SÃO FRANCISCO DE PAULA · RIO GRANDE DO SUL",
  venue: "Centro de Eventos de São Francisco de Paula",
  date: "02 — 04 DE ABRIL · 2027",
  startDate: "2027-04-02",
  endDate: "2027-04-04",
  whatsapp: "https://wa.me/5554992476721",
  email: "inscricoes@threerace.com.br",
  introduction: "Mountain bike por etapas, com dois formatos para escolher seu desafio: Ultra, em três dias, e Sport, em dois dias.",
};

export const priorityCampaign = {
  openingDate: "20/10/2026",
  closingDate: "22/10/2026",
  vacancyLabel: "100 vagas Ultra e 50 vagas Sport",
};

// Localização conferida na ficha do Google Maps (CID 5942198016919702).
// Logradouro/bairro: Prefeitura de São Francisco de Paula, notícia 2536, 09/06/2026.
// O número diverge entre as duas fontes; o mapa e as rotas apontam para o mesmo local.
export const eventVenue = {
  address: "Avenida Benjamin Constant · bairro Cipó",
  city: "São Francisco de Paula · Rio Grande do Sul",
  mapsUrl: "https://maps.app.goo.gl/puaCQGVSeqA3s7Vk8",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=-29.4411357%2C-50.5692636&travelmode=driving",
  embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3474.577733210162!2d-50.5692636!3d-29.4411357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9518db004aad5571%3A0x151c65c9fbc896!2sCentro%20de%20Eventos!5e0!3m2!1spt-BR!2sbr!4v1790022619447!5m2!1spt-BR!2sbr",
};

export const raceFormats = [
  {
    id: "ultra", name: "Ultra", days: "Três dias de prova", dates: "2, 3 e 4 de abril",
    description: "A Ultra reúne o maior volume esportivo da edição, com prólogo, etapa rainha e etapa final.",
    stages: [
      { date: "Sexta, 2 de abril", name: "Stage 1 — Prólogo", distance: 24, ascent: 530 },
      { date: "Sábado, 3 de abril", name: "Stage 2 — Etapa rainha", distance: 82, ascent: 1450 },
      { date: "Domingo, 4 de abril", name: "Stage 3 — Etapa final", distance: 68, ascent: 780 },
    ],
    note: "No prólogo, as largadas serão realizadas em baterias de até seis atletas, com uma nova bateria a cada minuto. O horário e a composição das baterias serão divulgados pela organização.",
  },
  {
    id: "sport", name: "Sport", days: "Duas etapas no fim de semana", dates: "3 e 4 de abril",
    description: "A Sport oferece a experiência de competir por etapas com participação concentrada no sábado e no domingo e menor distância total que a Ultra.",
    stages: [
      { date: "Sábado, 3 de abril", name: "Stage 1", distance: 46, ascent: 670 },
      { date: "Domingo, 4 de abril", name: "Stage 2", distance: 32, ascent: 450 },
    ],
    note: "A Sport não tem prólogo na sexta-feira. Suas etapas acontecem no sábado e no domingo.",
  },
];

export const courseNotice = "Os percursos e desníveis das duas modalidades são previstos e poderão receber ajustes após a validação técnica. Mapas, características do terreno e regras da competição serão apresentados nos materiais oficiais.";

// Regulamento Brasil 2027 · Revisão 06, 21/09/2026 · itens 2 e 4 (páginas 1–4).
type CompetitionCategory = { name: string; age: string; composition?: string };
type CategoryGroup = { title: string; categories: CompetitionCategory[]; note?: string };
type CompetitionFormat = { id: string; name: string; description: string; groups: CategoryGroup[]; grouping: string[] };

export function competitionCategoryId(format: string, group: string, category: string): string {
  const slug = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return `${format}.${slug(group)}.${slug(category)}`;
}

const maleAgeCategories: CompetitionCategory[] = [
  { name: "Sub-23", age: "19 a 22 anos" },
  { name: "Sub-30", age: "23 a 29 anos" },
  { name: "Master A1", age: "30 a 34 anos" },
  { name: "Master A2", age: "35 a 39 anos" },
  { name: "Master B1", age: "40 a 44 anos" },
  { name: "Master B2", age: "45 a 49 anos" },
  { name: "Master C1", age: "50 a 54 anos" },
  { name: "Master C2", age: "55 a 59 anos" },
  { name: "Master D", age: "60 anos ou mais" },
];
const femaleAgeCategories: CompetitionCategory[] = [
  { name: "Master A", age: "30 a 39 anos" },
  { name: "Master B", age: "40 a 49 anos" },
  { name: "Master C", age: "50 anos ou mais" },
];
const eBikeGroup: CategoryGroup = {
  title: "E-bike individual",
  categories: [
    { name: "E-bike masculina", age: "19 anos ou mais" },
    { name: "E-bike feminina", age: "19 anos ou mais" },
  ],
  note: "Categorias exclusivas da Ultra, com disputas separadas no masculino e no feminino, sem subdivisão por faixa etária e sem duplas E-bike.",
};
export const competitionCategories: CompetitionFormat[] = [
  {
    id: "ultra", name: "Ultra", description: "3 etapas · Solo, duplas e E-bike",
    groups: [
      { title: "Solo masculino", categories: [{ name: "Elite masculina", age: "19 anos ou mais" }, ...maleAgeCategories] },
      { title: "Solo feminino", categories: [{ name: "Elite feminina", age: "19 anos ou mais" }, ...femaleAgeCategories] },
      {
        title: "Duplas",
        categories: [
          { name: "Open masculina", age: "19 a 59 anos", composition: "Dois homens" },
          { name: "Master A", age: "30 a 39 anos", composition: "Dois homens" },
          { name: "Master B", age: "40 anos ou mais", composition: "Dois homens" },
          { name: "Mista", age: "19 anos ou mais", composition: "Um homem e uma mulher" },
          { name: "Feminina", age: "19 anos ou mais", composition: "Duas mulheres" },
        ],
        note: "A faixa etária é definida pelo integrante mais jovem, respeitada a idade mínima dos dois. Na Open masculina, o integrante mais velho pode ter mais de 59 anos. Mista e Feminina não têm faixa adicional à idade mínima.",
      },
      eBikeGroup,
    ],
    grouping: ["Todas as categorias Ultra são mantidas, independentemente do número de inscritos. A premiação fica limitada aos classificados elegíveis existentes."],
  },
  {
    id: "sport", name: "Sport", description: "2 etapas · Solo",
    groups: [
      { title: "Solo masculino", categories: maleAgeCategories },
      {
        title: "Solo feminino",
        categories: [{ name: "Open feminina", age: "18 a 29 anos" }, ...femaleAgeCategories],
        note: "Na Open feminina Sport, é preciso ter 18 anos completos em 03/04/2027, dia da primeira etapa, e até 29 anos de idade esportiva.",
      },
    ],
    grouping: [
      "A Sport não tem Elite, duplas ou E-bike. Categorias etárias com 1, 2 ou 3 inscritos confirmados são incorporadas à categoria imediatamente mais jovem e compatível. Com 4 ou mais, permanecem separadas.",
      "A apuração começa nas faixas mais velhas e continua para as mais jovens enquanto o grupo tiver até 3 atletas. Sub-23 masculina e Open feminina permanecem abertas mesmo com até 3 inscritos.",
      "O quadro final é definido após o encerramento das inscrições e divulgado antes da primeira largada Sport. Ausências e abandonos não alteram esse agrupamento durante a prova.",
    ],
  },
];

// Destaque editorial solicitado pela organização para a prévia; não abre vendas.
export const registrationPrices = [
  { format: "Ultra", lot: "Lote prioritário", active: true, price: 599, startDate: "2026-10-20", endDate: "2026-10-22", vacancies: 100 },
  { format: "Ultra", lot: "Lote 2", active: false, price: 699, startDate: "2026-10-23", endDate: "2026-12-10", vacancies: 100 },
  { format: "Ultra", lot: "Lote 3", active: false, price: 829, startDate: "2026-12-11", endDate: "2027-03-15", vacancies: 50 },
  { format: "Sport", lot: "Lote prioritário", active: true, price: 499, startDate: "2026-10-20", endDate: "2026-10-22", vacancies: 50 },
  { format: "Sport", lot: "Lote 2", active: false, price: 599, startDate: "2026-10-23", endDate: "2026-12-10", vacancies: 50 },
  { format: "Sport", lot: "Lote 3", active: false, price: 729, startDate: "2026-12-11", endDate: "2027-03-15", vacancies: 50 },
];
export const registrationPayment = {
  cardLabel: "Pagamento cartão de crédito",
  feePercent: 10,
  pixFeePercent: 0,
  description: "Pagamento com cartão de crédito tem taxa de 10% em todos os lotes. No Pix, a taxa é de 0%.",
};
export const jerseyOption = {
  price: 100,
  description: "A jersey de ciclismo é opcional e pode ser comprada por R$ 100 adicionais, junto com a inscrição, no momento de realizá-la. Disponível para Ultra e Sport, em todos os lotes.",
};
export const registrationNotice = "Cada lote encerra na data final indicada ou ao atingir seu limite de vagas, o que ocorrer primeiro. O lote prioritário é exclusivo para a lista prioritária. Os horários de abertura e encerramento serão informados no canal oficial de inscrição.";
export const registrationIncludedItems = [
  { icon: "shirt", title: "Camiseta casual", detail: "Alusiva ao evento.", text: "Camiseta casual alusiva ao evento." },
  { icon: "socks", title: "Meias Threerace", detail: "", text: "Meias Threerace." },
  { icon: "medal", title: "Medalha FINISHER", detail: "Caso complete 75% do evento.", text: "Medalha FINISHER, caso complete 75% do evento." },
  { icon: "plate", title: "Placa personalizada", detail: "", text: "Placa personalizada." },
  { icon: "shield", title: "Seguro do atleta", detail: "", text: "Seguro do atleta." },
  { icon: "hydration", title: "Hidratação", detail: "Pontos de hidratação durante o percurso.", text: "Pontos de hidratação durante o percurso." },
  { icon: "medical", title: "Serviços médicos", detail: "No percurso e atendimento básico gratuito na arena.", text: "Serviços médicos no percurso e atendimento básico gratuito na arena." },
  { icon: "mechanic", title: "Mecânica básica", detail: "Regulagem e identificação de problemas.", text: "Serviço mecânico básico: regulagem e identificação de problemas." },
  { icon: "wash", title: "Bike wash", detail: "", text: "Bike wash." },
] as const;
export const registrationBenefits = [
  {
    id: "incluso-na-inscricao",
    title: "INCLUSO NA INSCRIÇÃO",
    items: registrationIncludedItems.map((item) => item.text),
  },
  {
    id: "nao-incluso-na-inscricao",
    title: "NÃO INCLUSO NA INSCRIÇÃO",
    items: [
      "Jersey de ciclismo.",
      "Serviço de recuperação muscular.",
      "Serviço mecânico completo.",
      "Hospedagem ou alimentação não descritas.",
      "Qualquer deslocamento ou transfer.",
      "Serviço de fotografia.",
    ],
  },
];
export const scheduleNotice = "Programação preliminar. Os horários de credenciamento, largadas, briefings e premiações serão confirmados pela organização. Base do evento: Centro de Eventos de São Francisco de Paula.";
// Estrutura adaptada do Guia do Protagonista Brasil 2026 (p. 3, 11 e 13)
// e do regulamento Brasil 2026, itens 15.1, 18.1 e 21. Nenhum deles traz a agenda horária completa.
// O ofício aos Bombeiros nº 008/2026 contém apenas janelas de apoio operacional;
// elas não são horários de largada e não foram transpostas para 2027.
// Fonte e limites da pesquisa: docs/programacao-brasil-2027.md.
export const schedule = [
  {
    date: "SEXTA-FEIRA · 02 DE ABRIL", dateTime: "2027-04-02", title: "Ultra · Prólogo",
    events: [
      { time: "Antes da largada", title: "Credenciamento e retirada de kits · Ultra", description: "Recepção dos atletas, conferência dos documentos e entrega do kit no Centro de Eventos." },
      { time: "Antes da largada", title: "Orientações e organização das baterias", description: "Confira sua bateria e apresente-se para o alinhamento conforme a chamada da organização." },
      { time: "A confirmar", title: "Largadas do prólogo · Ultra", description: "Baterias de até seis atletas, com intervalo de um minuto. Confira seu horário na lista de largada." },
      { time: "Após a etapa", title: "Resultados e premiação diária · Ultra", description: "Pódios diários das categorias convencionais previstas no regulamento. A E-bike tem somente premiação geral final." },
      { time: "À noite", title: "Briefing para sábado", description: "Orientações técnicas para a etapa rainha da Ultra e a primeira etapa da Sport. Horário e formato a confirmar." },
    ],
  },
  {
    date: "SÁBADO · 03 DE ABRIL", dateTime: "2027-04-03", title: "Ultra · Etapa rainha / Sport · Etapa 1",
    events: [
      { time: "Antes da largada", title: "Credenciamento e retirada de kits · Sport", description: "Conferência dos documentos e entrega dos kits antes da primeira etapa. Janela de atendimento a confirmar." },
      { time: "Antes da largada", title: "Abertura da arena e alinhamento", description: "Acesso ao alinhamento de cada modalidade: de 20 a cinco minutos antes da respectiva largada, salvo alteração no boletim técnico." },
      { time: "A confirmar", title: "Largada da etapa rainha · Ultra", description: "Segunda etapa da Ultra, com alinhamento conforme a classificação do prólogo e o boletim técnico." },
      { time: "A confirmar", title: "Largada da primeira etapa · Sport", description: "Início da competição Sport. Ordem e intervalo entre modalidades a confirmar." },
      { time: "Após as etapas", title: "Resultados e premiação diária · Ultra", description: "Divulgação dos resultados das duas modalidades e pódios diários convencionais da Ultra. Sport e E-bike têm somente premiação geral final." },
      { time: "À noite", title: "Briefing para domingo", description: "Orientações técnicas para as etapas finais das duas modalidades. Horário e formato a confirmar." },
    ],
  },
  {
    date: "DOMINGO · 04 DE ABRIL", dateTime: "2027-04-04", title: "Ultra + Sport · Etapas finais",
    events: [
      { time: "Antes da largada", title: "Abertura da arena e alinhamento", description: "Acesso ao alinhamento de cada modalidade: de 20 a cinco minutos antes da respectiva largada, salvo alteração no boletim técnico." },
      { time: "A confirmar", title: "Largada da etapa final · Ultra", description: "Terceira e última etapa da Ultra." },
      { time: "A confirmar", title: "Largada da etapa final · Sport", description: "Segunda e última etapa da Sport. Ordem e intervalo entre modalidades a confirmar." },
      { time: "Após as etapas", title: "Resultados finais e premiações", description: "Premiação diária convencional da Ultra e premiação geral da Ultra e da Sport, incluindo E-bike masculina e feminina na Ultra, conforme o regulamento." },
      { time: "Após a premiação", title: "Encerramento da Threerace Brasil 2027", description: "Conclusão da programação dos três dias no Centro de Eventos." },
    ],
  },
];
export const kit = {
  included: ["Participação nas etapas da modalidade escolhida.", "Camiseta casual em tecido dry.", "Meia de ciclismo."],
  optional: jerseyOption.description,
  notice: "As informações de tamanhos, retirada de kits e demais serviços da prova serão divulgadas pela organização.",
};
export const expo = {
  paragraphs: [
    "A edição 2027 prevê uma área comercial no Centro de Eventos, voltada a quem pedala e a quem acompanha o evento. A proposta é reunir produtos e atendimento em bicicletas, peças, acessórios, vestuário, nutrição esportiva e serviços relacionados ao ciclismo.",
    "Lojas participantes, demonstrações, horários e condições de acesso serão divulgados conforme a programação for confirmada.",
    "Sua empresa pode participar como patrocinadora do evento, parceira de uma experiência ou expositora com atendimento e venda direta ao público. As condições de participação serão apresentadas pela equipe comercial da Threerace.",
  ],
};
export const information = [
  { id: "evento", title: "O EVENTO", icon: "event", heading: "A EDIÇÃO 2027", paragraphs: [
    "Após o retorno a São Francisco de Paula em 2026, a Threerace segue na cidade para a edição de 2 a 4 de abril de 2027, com base no Centro de Eventos. A Ultra começa na sexta-feira com um prólogo em baterias e segue até domingo. A Sport concentra suas duas etapas no sábado e no domingo.",
    "O planejamento também inclui uma expo para aproximar ciclistas, acompanhantes e visitantes de lojas e empresas do segmento, com atendimento, apresentação de produtos e venda direta ao público.",
    "Com trajetória desde 2017, a Threerace prepara a edição de 2027 com 400 vagas: 250 na Ultra e 150 na Sport, distribuídas em três lotes por modalidade.",
  ] },
  { id: "inscricoes", title: "INSCRIÇÕES E VALORES", icon: "document", heading: "LOTES E VALORES POR ATLETA", paragraphs: ["O lote prioritário é destinado à lista prioritária. Camiseta casual dry e meia de ciclismo estão incluídas em todas as modalidades e lotes."] },
  { id: "categorias", title: "CATEGORIAS", icon: "document", heading: "ULTRA E SPORT", paragraphs: ["Confira as categorias e escolha sua disputa. A E-bike é exclusiva da Ultra, com categorias masculina e feminina separadas. A idade esportiva é a idade completada até 31 de dezembro de 2027. A idade mínima geral é de 19 anos esportivos, com a exceção da Open feminina Sport indicada abaixo."] },
  { id: "etapas", title: "ETAPAS E PERCURSOS", icon: "stages", heading: "DOIS FORMATOS PARA ESCOLHER SEU DESAFIO", paragraphs: [courseNotice] },
  { id: "programacao", title: "PROGRAMAÇÃO", icon: "event", heading: "PROGRAMAÇÃO DIA A DIA · 2 A 4 DE ABRIL", paragraphs: [scheduleNotice] },
  { id: "documentacao", title: "DOCUMENTAÇÃO MÉDICA", icon: "document", heading: "DECLARAÇÃO DE SAÚDE E ATESTADO", paragraphs: ["A área médica reúne o formulário de saúde do atleta e o modelo de atestado da Threerace Brasil 2027. Na versão de trabalho, é possível conferir o preenchimento e baixar o PDF; o envio à organização ainda não está ativo."] },
  { id: "regulamento", title: "REGULAMENTO", icon: "document", heading: "REGULAMENTO BRASIL 2027", paragraphs: ["Consulte as regras de participação, categorias, documentação, equipamentos e classificação da Ultra e da Sport."] },
  { id: "hospedagem", title: "BASE E HOSPEDAGEM", icon: "document", heading: "CENTRO DE EVENTOS · SÃO FRANCISCO DE PAULA", paragraphs: ["O Centro de Eventos será a base da Threerace Brasil 2027 e da Threerace Expo. Confira a localização e trace sua rota pelo Google Maps."] },
];
export const faqs = [
  ["Preciso participar dos três dias?", "Na Ultra, as etapas acontecem de sexta a domingo. Na Sport, as etapas são no sábado e no domingo."],
  ["A Sport tem prólogo na sexta-feira?", "Não. O prólogo de sexta faz parte da Ultra."],
  ["A jersey está incluída na inscrição?", `Não. ${jerseyOption.description} Camiseta casual dry e meia de ciclismo já estão incluídas no valor da inscrição.`],
  ["Onde será a base do evento?", "No Centro de Eventos de São Francisco de Paula, na Avenida Benjamin Constant, bairro Cipó. O mapa e o botão Como chegar estão na seção Base e hospedagem."],
  ["Já posso consultar os horários e os mapas finais?", "Os horários detalhados e os percursos finais serão divulgados nos materiais oficiais. As distâncias e os desníveis apresentados nesta página correspondem ao planejamento atual."],
  ["Como minha loja pode participar da expo?", "A equipe comercial apresentará as opções de espaço, infraestrutura e divulgação para lojistas e empresas interessadas. As condições serão definidas na proposta individual."],
];
