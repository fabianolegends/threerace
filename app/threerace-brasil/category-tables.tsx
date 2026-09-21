import { competitionCategories } from "./content";

export default function CategoryTables() {
  return <div className="brasil-panel-extra brasil-categories">
    <div className="brasil-category-grid">
      {competitionCategories.map((format) => <section className={`brasil-category-format brasil-category-${format.id}`} key={format.id} aria-labelledby={`categorias-${format.id}`}>
        <header className="brasil-category-header">
          <h4 id={`categorias-${format.id}`}>{format.name}</h4>
          <p>{format.description}</p>
        </header>
        <div className="brasil-category-body">
          {format.groups.map((group) => <div className="brasil-category-group" key={group.title}>
            <table className="brasil-data-table brasil-category-table" aria-label={`${format.name} · ${group.title}`}>
              <caption>{group.title}</caption>
              <thead><tr><th scope="col">Categoria</th><th scope="col">{group.title === "Duplas" ? "Idade do mais jovem" : "Idade esportiva"}</th></tr></thead>
              <tbody>{group.categories.map((category) => <tr key={category.name}>
                <th scope="row">{category.name}{category.composition && <span className="brasil-category-composition">{category.composition}</span>}</th>
                <td>{category.age}</td>
              </tr>)}</tbody>
            </table>
            {group.note && <p className="brasil-category-note">{group.note}</p>}
          </div>)}
          <div className="brasil-category-grouping">
            <h5>Formação das categorias</h5>
            {format.grouping.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </section>)}
    </div>
    <p className="brasil-content-note">Cada atleta participa em uma modalidade e uma categoria elegível. Quando houver sobreposição entre Elite, Open e faixa etária, escolha apenas uma. Os agrupamentos respeitam a modalidade, o sexo e o formato da disputa.</p>
    <p className="brasil-category-source">Regulamento Threerace Brasil 2027 · Revisão 06 de 21/09/2026 · Itens 2 e 4.</p>
  </div>;
}
