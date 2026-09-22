import { readPriorityRegistrations, type PriorityRegistrationRecord } from "@/lib/priority-list-store";
import { PRIORITY_CATEGORIES } from "@/lib/priority-list-schema";
import "./priority-admin.css";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Cadastros da lista prioritária | Threerace Brasil",
  robots: { index: false, follow: false, nocache: true },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

type Status = "all" | "ultra" | "sport";

function getAdminKey() {
  return process.env.THREERACE_PRIORITY_ADMIN_KEY?.trim() || "";
}

function getParam(params: Record<string, string | string[] | undefined>, key: string) {
  const value = params[key];
  return Array.isArray(value) ? value[0] : value || "";
}

function isAuthorized(params: Record<string, string | string[] | undefined>) {
  const configuredKey = getAdminKey();
  return Boolean(configuredKey) && getParam(params, "chave") === configuredKey;
}

function categoryLabel(categoryId: string) {
  for (const format of PRIORITY_CATEGORIES) {
    for (const group of format.groups) {
      const category = group.options.find((option) => option.id === categoryId);
      if (category) return `${format.name} · ${group.name} · ${category.label}`;
    }
  }
  return categoryId;
}

function modalityLabel(modality: string) {
  return modality === "ultra" ? "Ultra" : modality === "sport" ? "Sport" : modality;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(value));
}

function filterRecords(records: PriorityRegistrationRecord[], status: Status) {
  if (status === "all") return records;
  return records.filter((record) => record.modality === status);
}

function AdminGate({ configured }: { configured: boolean }) {
  return <main className="priority-admin-page">
    <section className="priority-admin-card priority-admin-access">
      <p className="priority-admin-eyebrow">THREERACE BRASIL · LISTA PRIORITÁRIA</p>
      <h1>Acesso restrito</h1>
      {configured ? <>
        <p>Informe a chave da equipe para consultar os cadastros.</p>
        <form method="get" className="priority-admin-login">
          <label>Chave de acesso
            <input name="chave" type="password" autoComplete="current-password" required />
          </label>
          <button type="submit">ACESSAR LISTA</button>
        </form>
      </> : <>
        <p>A área está criada, mas falta configurar a chave segura no ambiente de produção.</p>
        <p>Configure a variável <strong>THREERACE_PRIORITY_ADMIN_KEY</strong> na Vercel e faça um novo deploy.</p>
      </>}
    </section>
  </main>;
}

export default async function PriorityAdminPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  if (!isAuthorized(params)) {
    return <AdminGate configured={Boolean(getAdminKey())} />;
  }

  const filter = getParam(params, "modalidade") as Status;
  const status: Status = ["ultra", "sport"].includes(filter) ? filter : "all";
  const records = await readPriorityRegistrations();
  const visibleRecords = filterRecords(records, status);
  const key = encodeURIComponent(getParam(params, "chave"));
  const csvHref = `/api/brasil/priority-list/export?chave=${key}${status === "all" ? "" : `&modalidade=${status}`}`;
  const ultraCount = records.filter((record) => record.modality === "ultra").length;
  const sportCount = records.filter((record) => record.modality === "sport").length;

  return <main className="priority-admin-page">
    <section className="priority-admin-card priority-admin-header">
      <div>
        <p className="priority-admin-eyebrow">THREERACE BRASIL · LISTA PRIORITÁRIA</p>
        <h1>Cadastros recebidos</h1>
        <p>Consulta interna da equipe. Não compartilhe este endereço com a chave de acesso.</p>
      </div>
      <a className="priority-admin-export" href={csvHref}>BAIXAR CSV</a>
    </section>

    <section className="priority-admin-stats" aria-label="Resumo dos cadastros">
      <article><span>Total</span><strong>{records.length}</strong></article>
      <article><span>Ultra</span><strong>{ultraCount}</strong></article>
      <article><span>Sport</span><strong>{sportCount}</strong></article>
    </section>

    <nav className="priority-admin-filters" aria-label="Filtrar cadastros">
      <a aria-current={status === "all" ? "page" : undefined} href={`/threerace-brasil/cadastros?chave=${key}`}>Todos</a>
      <a aria-current={status === "ultra" ? "page" : undefined} href={`/threerace-brasil/cadastros?chave=${key}&modalidade=ultra`}>Ultra</a>
      <a aria-current={status === "sport" ? "page" : undefined} href={`/threerace-brasil/cadastros?chave=${key}&modalidade=sport`}>Sport</a>
    </nav>

    <section className="priority-admin-card priority-admin-table-card">
      <div className="priority-admin-table-wrap">
        <table className="priority-admin-table">
          <caption>{visibleRecords.length} cadastro{visibleRecords.length === 1 ? "" : "s"} na visualização atual</caption>
          <thead>
            <tr>
              <th>Data</th>
              <th>Nome</th>
              <th>Contato</th>
              <th>Local</th>
              <th>Modalidade</th>
              <th>Categoria</th>
            </tr>
          </thead>
          <tbody>
            {visibleRecords.map((record) => <tr key={record.id}>
              <td>{formatDate(record.submittedAt)}</td>
              <td>{record.fullName}</td>
              <td><a href={`mailto:${record.email}`}>{record.email}</a><br /><a href={`https://wa.me/${record.phone}`} target="_blank" rel="noreferrer">{record.phone}</a></td>
              <td>{record.city}<br /><span>{record.country || "—"}</span></td>
              <td>{modalityLabel(record.modality)}</td>
              <td>{categoryLabel(record.category)}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </section>
  </main>;
}
