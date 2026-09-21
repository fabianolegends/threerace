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

export const raceFormats = [
  {
    id: "ultra", name: "Ultra", days: "Três dias de prova", dates: "2, 3 e 4 de abril",
    description: "A Ultra reúne o maior volume esportivo da edição, com prólogo, etapa rainha e etapa final.",
    stages: [
      { date: "Sexta, 2 de abril", name: "Stage 1 — Prólogo", distance: 32, ascent: 450 },
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
export const registrationPrices = [
  { format: "Ultra", lot: "Lote 1 · lista prioritária", withoutJersey: 599, withJersey: 699 },
  { format: "Ultra", lot: "Lote 2", withoutJersey: 699, withJersey: 799 },
  { format: "Ultra", lot: "Lote 3", withoutJersey: 829, withJersey: 929 },
  { format: "Sport", lot: "Lote 1 · lista prioritária", withoutJersey: 499, withJersey: 599 },
  { format: "Sport", lot: "Lote 2", withoutJersey: 599, withJersey: 699 },
  { format: "Sport", lot: "Lote 3", withoutJersey: 729, withJersey: 829 },
];
export const registrationNotice = "Abertura das inscrições, períodos dos lotes, formas de pagamento e eventuais taxas serão informados junto ao canal oficial de inscrição.";
export const scheduleNotice = "Os horários de credenciamento, largadas, premiações e funcionamento da expo serão divulgados na programação oficial.";
export const schedule = [
  { date: "SEXTA · 02 ABR", title: "PRÓLOGO ULTRA", description: "Credenciamento Ultra, prólogo em baterias e programação da arena." },
  { date: "SÁBADO · 03 ABR", title: "ULTRA + SPORT", description: "Etapa rainha Ultra e primeira etapa Sport. A retirada de kits Sport está prevista antes das largadas, em horário a divulgar." },
  { date: "DOMINGO · 04 ABR", title: "ETAPAS FINAIS", description: "Etapas finais Ultra e Sport, com encerramento do evento." },
];
export const kit = {
  included: ["Participação nas etapas da modalidade escolhida.", "Camiseta casual em tecido dry.", "Meia de ciclismo."],
  optional: "Jersey de ciclismo opcional: escolha a inscrição com jersey por mais R$ 100. Camiseta dry e meia também estão incluídas nessa opção.",
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
    "Com trajetória desde 2017, a Threerace prepara a edição de 2027 com projeção de 350 atletas: 250 na Ultra e 100 na Sport.",
  ] },
  { id: "inscricoes", title: "INSCRIÇÕES E VALORES", icon: "document", heading: "VALORES POR ATLETA", paragraphs: ["O Lote 1 é destinado à lista prioritária. Camiseta casual dry e meia de ciclismo estão incluídas em todas as modalidades e lotes."] },
  { id: "categorias", title: "CATEGORIAS", icon: "document", heading: "ULTRA E SPORT", paragraphs: ["Escolha entre a Ultra, com três dias de prova, e a Sport, com duas etapas no fim de semana. As categorias competitivas, faixas etárias e critérios de classificação serão detalhados no regulamento oficial."] },
  { id: "etapas", title: "ETAPAS E PERCURSOS", icon: "stages", heading: "DOIS FORMATOS PARA ESCOLHER SEU DESAFIO", paragraphs: [courseNotice] },
  { id: "programacao", title: "PROGRAMAÇÃO", icon: "event", heading: "PROGRAMAÇÃO PREVISTA · 2 A 4 DE ABRIL", paragraphs: schedule.map((day) => `${day.date}: ${day.description}`).concat(scheduleNotice) },
  { id: "documentacao", title: "DOCUMENTAÇÃO", icon: "document", heading: "ORIENTAÇÕES EM BREVE", paragraphs: ["A relação de documentos exigidos, os modelos e os prazos para apresentação serão disponibilizados para a edição Brasil 2027."] },
  { id: "regulamento", title: "REGULAMENTO", icon: "document", heading: "REGULAMENTO BRASIL 2027 EM PREPARAÇÃO", paragraphs: ["O regulamento oficial da edição brasileira será disponibilizado após a aprovação da organização. Critérios de participação, regras esportivas e condições da inscrição serão detalhados nesse documento."] },
  { id: "hospedagem", title: "BASE E HOSPEDAGEM", icon: "document", heading: "CENTRO DE EVENTOS · SÃO FRANCISCO DE PAULA", paragraphs: ["A base do evento será no Centro de Eventos de São Francisco de Paula, no Rio Grande do Sul. Endereço completo, mapa de acesso e orientações de chegada serão divulgados pela organização.", "A relação de hospedagens será divulgada em breve."] },
];
export const faqs = [
  ["Preciso participar dos três dias?", "Na Ultra, as etapas acontecem de sexta a domingo. Na Sport, as etapas são no sábado e no domingo."],
  ["A Sport tem prólogo na sexta-feira?", "Não. O prólogo de sexta faz parte da Ultra."],
  ["A jersey está incluída em todas as inscrições?", "A jersey está incluída somente na opção com adicional de R$ 100. Camiseta casual dry e meia de ciclismo fazem parte das duas opções de kit, em todos os lotes."],
  ["Onde será a base do evento?", "No Centro de Eventos de São Francisco de Paula, no Rio Grande do Sul. Endereço completo, mapa de acesso e orientações de chegada serão divulgados pela organização."],
  ["Já posso consultar os horários e os mapas finais?", "Os horários detalhados e os percursos finais serão divulgados nos materiais oficiais. As distâncias e os desníveis apresentados nesta página correspondem ao planejamento atual."],
  ["Como minha loja pode participar da expo?", "A equipe comercial apresentará as opções de espaço, infraestrutura e divulgação para lojistas e empresas interessadas. As condições serão definidas na proposta individual."],
];
