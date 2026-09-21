const icons = {
  evento: (
    <>
      <circle cx="5.5" cy="16.5" r="3.5" />
      <circle cx="18.5" cy="16.5" r="3.5" />
      <path d="m5.5 16.5 4-8 5 8h-9M9.5 8.5h6M14.5 16.5l3-11H15M8 5.5h3" />
      <path d="m16.5 9.2 2 7.3" />
    </>
  ),
  inscricoes: (
    <>
      <path d="M3 6h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4V6Z" />
      <path d="M15 6v2m0 3v2m0 3v2M7 10h4m-4 4h2" />
    </>
  ),
  categorias: (
    <>
      <circle cx="9" cy="7.5" r="3.5" />
      <path d="M2.5 20v-1.5a6.5 6.5 0 0 1 13 0V20M16 4.2a3.5 3.5 0 0 1 0 6.6M18 13a5 5 0 0 1 3.5 4.8V20" />
    </>
  ),
  etapas: (
    <>
      <circle cx="5" cy="5" r="2.5" />
      <circle cx="19" cy="19" r="2.5" />
      <path d="M7.5 5H16a3.5 3.5 0 0 1 0 7H8a3.5 3.5 0 0 0 0 7h8.5" />
    </>
  ),
  programacao: (
    <>
      <path d="M13 21H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5M7 2v4m10-4v4M3 9h18" />
      <circle cx="17.5" cy="17.5" r="4.5" />
      <path d="M17.5 15v2.5l1.5 1" />
    </>
  ),
  documentacao: (
    <>
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2M8 12l2 2 5-5M8 18h8" />
    </>
  ),
  regulamento: (
    <>
      <path d="m12 2 8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3Z" />
      <path d="m8 11.5 2.5 2.5L16 8.5" />
    </>
  ),
  hospedagem: (
    <>
      <path d="M3 18v3m18-3v3M3 13V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M4 12h16a2 2 0 0 1 2 2v4H2v-4a2 2 0 0 1 2-2Z" />
      <path d="M6 12V9a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3m2 0V9a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3" />
    </>
  ),
};

export default function AccordionIcon({ section }: { section: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {icons[section as keyof typeof icons] ?? icons.evento}
    </svg>
  );
}
