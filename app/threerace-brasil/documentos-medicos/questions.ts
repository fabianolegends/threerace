export const healthQuestions = [
  { key: "cardiovascular", label: "Possui ou já teve doença cardíaca, arritmia, insuficiência cardíaca, infarto ou outra condição cardiovascular?" },
  { key: "chest_pain", label: "Já apresentou dor ou pressão no peito durante esforço físico?" },
  { key: "syncope_palpitations", label: "Já apresentou desmaio, perda de consciência, tontura intensa ou palpitações importantes durante exercício?" },
  { key: "hypertension", label: "Possui hipertensão arterial ou utiliza medicação para controle da pressão?" },
  { key: "respiratory", label: "Possui asma, bronquite, doença pulmonar ou outra condição respiratória relevante?" },
  { key: "metabolic", label: "Possui diabetes, histórico de hipoglicemia ou outra condição metabólica que exija cuidados durante esforço prolongado?" },
  { key: "neurological", label: "Possui epilepsia, histórico de convulsões ou outra condição neurológica relevante?" },
  { key: "orthopedic", label: "Possui lesão ou limitação ortopédica/musculoesquelética que possa interferir no ciclismo de longa duração?" },
  { key: "severe_allergy", label: "Possui alergia grave a medicamentos, alimentos, picadas de insetos ou outras substâncias?" },
  { key: "continuous_medication", label: "Faz uso contínuo de medicamentos?" },
  { key: "recent_surgery", label: "Foi submetido(a) a cirurgia, internação hospitalar ou tratamento médico relevante nos últimos 12 meses?" },
  { key: "other_condition", label: "Existe alguma outra condição de saúde que a equipe médica do evento deva conhecer?" },
] as const;

export type HealthQuestionKey = (typeof healthQuestions)[number]["key"];

export const complementaryFields = [
  { key: "medications", label: "Medicamentos em uso", placeholder: "Informe nome, dose e frequência quando aplicável." },
  { key: "allergies", label: "Alergias", placeholder: "Informe as alergias que a equipe médica deve conhecer." },
  { key: "observations", label: "Condições / observações", placeholder: "Acrescente informações relevantes sobre as respostas acima." },
] as const;

const questionLabels = {
  es: [
    "¿Tienes o has tenido una enfermedad cardíaca, arritmia, insuficiencia cardíaca, infarto u otra afección cardiovascular?",
    "¿Has sentido dolor o presión en el pecho durante un esfuerzo físico?",
    "¿Has sufrido desmayos, pérdida del conocimiento, mareos intensos o palpitaciones importantes durante el ejercicio?",
    "¿Tienes hipertensión arterial o tomas medicación para controlar la presión arterial?",
    "¿Tienes asma, bronquitis, una enfermedad pulmonar u otra afección respiratoria relevante?",
    "¿Tienes diabetes, antecedentes de hipoglucemia u otra afección metabólica que requiera cuidados durante un esfuerzo prolongado?",
    "¿Tienes epilepsia, antecedentes de convulsiones u otra afección neurológica relevante?",
    "¿Tienes alguna lesión o limitación ortopédica o musculoesquelética que pueda interferir con el ciclismo de larga duración?",
    "¿Tienes alguna alergia grave a medicamentos, alimentos, picaduras de insectos u otras sustancias?",
    "¿Tomas medicamentos de forma continua?",
    "¿Te has sometido a una cirugía, hospitalización o tratamiento médico relevante en los últimos 12 meses?",
    "¿Existe alguna otra afección de salud que el equipo médico del evento deba conocer?",
  ],
  en: [
    "Do you have or have you ever had heart disease, arrhythmia, heart failure, a heart attack or another cardiovascular condition?",
    "Have you ever experienced chest pain or pressure during physical exertion?",
    "Have you ever experienced fainting, loss of consciousness, severe dizziness or significant palpitations during exercise?",
    "Do you have high blood pressure or take medication to control your blood pressure?",
    "Do you have asthma, bronchitis, lung disease or another relevant respiratory condition?",
    "Do you have diabetes, a history of hypoglycemia or another metabolic condition that requires care during prolonged exertion?",
    "Do you have epilepsy, a history of seizures or another relevant neurological condition?",
    "Do you have an orthopedic or musculoskeletal injury or limitation that could affect long-duration cycling?",
    "Do you have a severe allergy to medications, foods, insect stings or other substances?",
    "Do you take medication on an ongoing basis?",
    "Have you undergone surgery, hospitalization or significant medical treatment in the past 12 months?",
    "Is there any other health condition that the event's medical team should know about?",
  ],
} as const;

const complementaryTranslations = {
  es: [
    { label: "Medicamentos en uso", placeholder: "Indica el nombre, la dosis y la frecuencia cuando corresponda." },
    { label: "Alergias", placeholder: "Indica las alergias que el equipo médico deba conocer." },
    { label: "Afecciones / observaciones", placeholder: "Añade información relevante sobre las respuestas anteriores." },
  ],
  en: [
    { label: "Current medications", placeholder: "Provide the name, dose and frequency where applicable." },
    { label: "Allergies", placeholder: "List any allergies the medical team should know about." },
    { label: "Conditions / comments", placeholder: "Add relevant information about your answers above." },
  ],
} as const;

export function getHealthQuestions(locale: "pt" | "es" | "en") {
  return healthQuestions.map((question, index) => ({
    ...question,
    label: locale === "pt" ? question.label : questionLabels[locale][index],
  }));
}

export function getComplementaryFields(locale: "pt" | "es" | "en") {
  return complementaryFields.map((field, index) => ({
    ...field,
    ...(locale === "pt" ? {} : complementaryTranslations[locale][index]),
  }));
}
