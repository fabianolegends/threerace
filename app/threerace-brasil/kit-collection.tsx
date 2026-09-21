"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { kit } from "./content";

type KitView = { src: string; label: string; alt: string; width: number; height: number };
type KitPiece = { name: string; status: string; description: string; view: KitView; kind?: "sheet" };

const montage: KitView = {
  src: "kit-apresentacao-2027-v2", label: "Apresentação da coleção",
  alt: "Montagem do kit Threerace 2027 em fundo terracota, com frente e verso da jersey e da camiseta sobrepostos ao fundo e meia, placa e sacochila em primeiro plano",
  width: 1448, height: 1086,
};

const pieces: KitPiece[] = [
  {
    name: "Camiseta casual dry", status: "INCLUÍDA EM TODOS OS LOTES", kind: "sheet",
    description: "Areia, terracota e a araucária que acompanha nossas histórias.",
    view: { src: "camiseta-vistas-2027", label: "Frente, verso e perfil", alt: "Frente, verso e perfil da camiseta areia Threerace 2027, com marca e araucária em terracota", width: 1536, height: 1024 },
  },
  {
    name: "Jersey de ciclismo", status: "OPCIONAL · + R$ 100", kind: "sheet",
    description: "A identidade da edição, também na peça para pedalar.",
    view: { src: "jersey-vistas-2027", label: "Frente, verso e perfil", alt: "Frente, verso e perfil da jersey de ciclismo terracota Threerace 2027, com araucária em areia e bolsos traseiros", width: 1536, height: 1024 },
  },
  {
    name: "Meia de ciclismo", status: "INCLUÍDA EM TODOS OS LOTES", kind: "sheet",
    description: "Os mesmos traços e cores, até o último detalhe.",
    view: { src: "meia-vistas-2027", label: "Frente, verso e perfil", alt: "Frente, verso e perfil da meia de ciclismo terracota, com araucária e marca Threerace em areia", width: 1536, height: 1024 },
  },
];


function PieceCard({ piece, onExpand }: { piece: KitPiece; onExpand: (view: KitView, name: string) => void }) {
  const view = piece.view;
  return <article className={`brasil-piece ${piece.kind ?? ""}`}>
    <div className="brasil-piece-art">
      <span className="brasil-piece-status">{piece.status}</span>
      <button className="brasil-piece-expand" type="button" aria-label={`Ampliar ${piece.name} — ${view.label}`} onClick={() => onExpand(view, piece.name)}>
        <Image src={`/brasil-2027/${view.src}.webp`} alt={view.alt} width={view.width} height={view.height} unoptimized loading="lazy" />
        <span className="brasil-expand-label" aria-hidden="true">AMPLIAR +</span>
      </button>
    </div>
    <div className="brasil-piece-caption">
      <div><h3>{piece.name}</h3>{piece.description ? <p>{piece.description}</p> : null}</div>
      <p className="brasil-piece-view-label">{view.label}</p>
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
      <figure className="brasil-kit-montage">
        <button type="button" className="brasil-kit-montage-expand" aria-label="Ampliar montagem do kit Threerace 2027" onClick={() => expand(montage, "Kit Threerace 2027")}>
          <Image src={`/brasil-2027/${montage.src}.webp`} alt={montage.alt} width={montage.width} height={montage.height} unoptimized loading="lazy" />
          <span className="brasil-expand-label" aria-hidden="true">AMPLIAR +</span>
        </button>
        <figcaption>Jersey e camiseta em frente e verso, meia, placa e sacochila.</figcaption>
      </figure>
      <div className="brasil-kit-pieces">{pieces.map((piece) => <PieceCard key={piece.name} piece={piece} onExpand={expand} />)}</div>
      <div className="brasil-kit-inclusions"><div><h3>Seu kit, em qualquer lote.</h3><ul>{kit.included.map((item) => <li key={item}>{item}</li>)}</ul></div><div><p>{kit.optional}</p><p className="brasil-content-note">{kit.notice}</p></div></div>
    </div>
    <dialog className="brasil-kit-dialog" ref={dialogRef} aria-labelledby="kit-dialog-title" onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
      <div className="brasil-kit-dialog-header"><h3 id="kit-dialog-title">{selected ? `${selected.name} · ${selected.view.label}` : "Kit 2027"}</h3><button type="button" autoFocus aria-label="Fechar imagem ampliada" onClick={() => dialogRef.current?.close()}>FECHAR ×</button></div>
      {selected ? <Image src={`/brasil-2027/${selected.view.src}.webp`} alt={selected.view.alt} width={selected.view.width} height={selected.view.height} unoptimized /> : null}
    </dialog>
  </section>;
}
