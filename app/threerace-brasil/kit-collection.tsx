"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { kit } from "./content";

type KitView = { src: string; label: string; alt: string };
type KitPiece = { name: string; status: string; description: string; views: KitView[]; kind?: string };

const pieces: KitPiece[] = [
  {
    name: "Camiseta casual dry", status: "INCLUÍDA EM TODOS OS LOTES",
    description: "Areia, terracota e a araucária que acompanha nossas histórias.",
    views: [
      { src: "camiseta-frente", label: "Frente", alt: "Frente da camiseta areia com marca Threerace em terracota" },
      { src: "camiseta-costas", label: "Costas", alt: "Costas da camiseta areia com araucária terracota e a frase Montanhas, pessoas, histórias" },
    ],
  },
  {
    name: "Jersey de ciclismo", status: "OPCIONAL · + R$ 100",
    description: "A identidade da edição, também na peça para pedalar.",
    views: [
      { src: "jersey-frente", label: "Frente", alt: "Frente da jersey terracota com araucária e marca Threerace em areia" },
      { src: "jersey-costas", label: "Costas", alt: "Costas da jersey terracota com bolsos, araucária e inscrição 2017 a 2027" },
    ],
  },
  {
    name: "Meia de ciclismo", status: "INCLUÍDA EM TODOS OS LOTES", kind: "sock",
    description: "Os mesmos traços e cores, até o último detalhe.",
    views: [{ src: "meia", label: "Detalhe", alt: "Meia de ciclismo terracota com araucária e logotipo Threerace em areia" }],
  },
];

const collection: KitPiece[] = [
  { name: "Sacochila", status: "COLEÇÃO 2027", description: "", views: [{ src: "sacochila", label: "Detalhe", alt: "Sacochila terracota com cordões areia e ilustração de araucária" }] },
  { name: "Bandana", status: "COLEÇÃO 2027", description: "", views: [{ src: "bandana", label: "Detalhe", alt: "Bandana terracota com araucária e marca Threerace" }] },
  { name: "Placa de identificação", status: "CONCEITO VISUAL", description: "", kind: "plate", views: [{ src: "placa", label: "Detalhe", alt: "Estudo visual da placa de bicicleta 2027, em terracota e areia" }] },
];

function PieceCard({ piece, onExpand }: { piece: KitPiece; onExpand: (view: KitView, name: string) => void }) {
  const [viewIndex, setViewIndex] = useState(0);
  const view = piece.views[viewIndex];
  return <article className={`brasil-piece ${piece.kind ?? ""}`}>
    <div className="brasil-piece-art">
      <span className="brasil-piece-status">{piece.status}</span>
      <button className="brasil-piece-expand" type="button" aria-label={`Ampliar ${piece.name} — ${view.label}`} onClick={() => onExpand(view, piece.name)}>
        <Image src={`/brasil-2027/${view.src}.webp`} alt={view.alt} width={1000} height={1200} unoptimized loading="lazy" />
        <span className="brasil-expand-label" aria-hidden="true">AMPLIAR +</span>
      </button>
    </div>
    <div className="brasil-piece-caption">
      <div><h3>{piece.name}</h3>{piece.description ? <p>{piece.description}</p> : null}</div>
      {piece.views.length > 1 ? <div className="brasil-piece-views" role="group" aria-label={`Vistas de ${piece.name}`}>
        {piece.views.map((item, i) => <button type="button" key={item.src} aria-pressed={viewIndex === i} onClick={() => setViewIndex(i)}>{item.label}</button>)}
      </div> : null}
    </div>
  </article>;
}

export default function KitCollection() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<{ view: KitView; name: string } | null>(null);
  function expand(view: KitView, name: string) {
    setSelected({ view, name });
    dialogRef.current?.showModal();
  }
  return <section className="brasil-kit-collection" id="kit" aria-labelledby="brasil-kit-title">
    <div className="section-frame">
      <div className="brasil-kit-intro">
        <div><p className="section-label">KIT DO ATLETA · EDIÇÃO 2027</p><h2 id="brasil-kit-title">A NOSSA HISTÓRIA.<br /><em>NA SUA PELE.</em></h2></div>
        <div><p>Montanhas, pessoas, histórias. A araucária e os caminhos da Serra Gaúcha dão forma às peças dos dez anos da Threerace.</p><p className="brasil-kit-colors"><span aria-hidden="true" />TERRACOTA <span aria-hidden="true" />AREIA</p></div>
      </div>
      <div className="brasil-kit-pieces">{pieces.map((piece) => <PieceCard key={piece.name} piece={piece} onExpand={expand} />)}</div>
      <div className="brasil-kit-inclusions"><div><h3>Seu kit, em qualquer lote.</h3><ul>{kit.included.map((item) => <li key={item}>{item}</li>)}</ul></div><div><p>{kit.optional}</p><p className="brasil-content-note">{kit.notice}</p></div></div>
      <div className="brasil-collection-heading"><div><p className="section-label">A IDENTIDADE EM CADA DETALHE</p><h3>COLEÇÃO THREERACE 2027.</h3></div><p>Sacochila, bandana e placa integram a apresentação visual da edição. A inclusão dessas peças no kit ainda será confirmada.</p></div>
      <div className="brasil-kit-pieces brasil-collection-pieces">{collection.map((piece) => <PieceCard key={piece.name} piece={piece} onExpand={expand} />)}</div>
      <p className="brasil-collection-note">Imagens de apresentação da edição 2027. Os logotipos no estudo da placa são ilustrativos; os patrocinadores oficiais serão anunciados pela organização.</p>
    </div>
    <dialog className="brasil-kit-dialog" ref={dialogRef} aria-labelledby="kit-dialog-title" onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
      <div className="brasil-kit-dialog-header"><h3 id="kit-dialog-title">{selected ? `${selected.name} · ${selected.view.label}` : "Kit 2027"}</h3><button type="button" autoFocus aria-label="Fechar imagem ampliada" onClick={() => dialogRef.current?.close()}>FECHAR ×</button></div>
      {selected ? <Image src={`/brasil-2027/${selected.view.src}.webp`} alt={selected.view.alt} width={1000} height={1200} unoptimized /> : null}
    </dialog>
  </section>;
}
