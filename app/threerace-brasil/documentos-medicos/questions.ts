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
