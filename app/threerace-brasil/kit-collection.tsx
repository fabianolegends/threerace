"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { SiteLanguage } from "../site-language";
import { getBrasilContent } from "./content-i18n";
import { componentText } from "./components-i18n";

type KitView = { src: string; label: string; alt: string; width: number; height: number };
type KitPiece = { name: string; status: string; view: KitView };

function getKitAssets(locale: SiteLanguage) {
  const t = componentText(locale);
  const { jerseyOption } = getBrasilContent(locale);
  const montage: KitView = {
    src: "kit-apresentacao-2027-v2", label: t("Apresentação da coleção"),
    alt: t("Montagem do kit Threerace 2027 em fundo terracota, com frente e verso da jersey e da camiseta sobrepostos ao fundo e meia, placa e sacochila em primeiro plano"),
    width: 1448, height: 1086,
  };

  const pieces: KitPiece[] = [
    {
      name: t("Camiseta casual dry"), status: t("INSCRIÇÃO PADRÃO"),
      view: { src: "camiseta-recortada-2027", label: t("Frente, verso e perfil"), alt: t("Frente, verso e perfil da camiseta areia Threerace 2027, com marca e araucária em terracota"), width: 1536, height: 1024 },
    },
    {
      name: t("Jersey de ciclismo"), status: t("OPCIONAL · R$ {price}", { price: jerseyOption.price }),
      view: { src: "jersey-recortada-2027", label: t("Frente, verso e perfil"), alt: t("Frente, verso e perfil da jersey de ciclismo terracota Threerace 2027, com araucária em areia e bolsos traseiros"), width: 1536, height: 1024 },
    },
    {
      name: t("Meia de ciclismo"), status: t("INSCRIÇÃO PADRÃO"),
      view: { src: "meia-recortada-2027", label: t("Frente, verso e perfil"), alt: t("Frente, verso e perfil da meia de ciclismo terracota, com araucária e marca Threerace em areia"), width: 1536, height: 1024 },
    },
  ];
  return { montage, pieces };
}

function PieceCard({ piece, onExpand, locale }: { piece: KitPiece; onExpand: (view: KitView, name: string) => void; locale: SiteLanguage }) {
  const t = componentText(locale);
  const view = piece.view;
  return <article className="brasil-piece">
    <div className="brasil-piece-art">
      <span className="brasil-piece-status">{piece.status}</span>
      <button className="brasil-piece-expand" type="button" aria-label={t("Ampliar {name} — {label}", { name: piece.name, label: view.label })} onClick={() => onExpand(view, piece.name)}>
        <Image src={`/brasil-2027/${view.src}.webp`} alt={view.alt} width={view.width} height={view.height} unoptimized loading="lazy" />
        <span className="brasil-piece-expand-icon" aria-hidden="true">+</span>
      </button>
    </div>
    <div className="brasil-piece-caption">
      <h3>{piece.name}</h3>
    </div>
  </article>;
}

export default function KitCollection({ locale = "pt" }: { locale?: SiteLanguage }) {
  const { kit, jerseyOption } = getBrasilContent(locale);
  const { montage, pieces } = getKitAssets(locale);
  const t = componentText(locale);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<{ view: KitView; name: string } | null>(null);
  function expand(view: KitView, name: string) {
    setSelected({ view, name });
    dialogRef.current?.showModal();
  }
  return <section className="brasil-kit-collection" id="kit" aria-labelledby="brasil-kit-title">
    <div className="section-frame">
      <div className="brasil-kit-intro">
        <div><p className="section-label">{t("KIT DO ATLETA · EDIÇÃO 2027")}</p><h2 id="brasil-kit-title">{t("A NOSSA HISTÓRIA.")}<br /><em>{t("NA SUA PELE.")}</em></h2></div>
        <div><p>{t("Montanhas, pessoas, histórias. A araucária e os caminhos da Serra Gaúcha dão forma às peças dos dez anos da Threerace.")}</p><p className="brasil-kit-colors"><span aria-hidden="true" />{t("TERRACOTA")} <span aria-hidden="true" />{t("AREIA")}</p></div>
      </div>
      <figure className="brasil-kit-montage">
        <button type="button" className="brasil-kit-montage-expand" aria-label={t("Ampliar montagem do kit Threerace 2027")} onClick={() => expand(montage, t("Kit Threerace 2027"))}>
          <Image src={`/brasil-2027/${montage.src}.webp`} alt={montage.alt} width={montage.width} height={montage.height} unoptimized loading="lazy" />
          <span className="brasil-expand-label" aria-hidden="true">{t("AMPLIAR +")}</span>
        </button>
        <figcaption>
          <strong>{kit.summary}</strong>
          <span>{t("Jersey de ciclismo: opcional por R$ {price}, comprada junto com a inscrição.", { price: jerseyOption.price })}</span>
        </figcaption>
      </figure>
      <div className="brasil-kit-pieces">{pieces.map((piece) => <PieceCard key={piece.name} piece={piece} onExpand={expand} locale={locale} />)}</div>
      <div className="brasil-kit-inclusions"><div><h3>{t("Seu kit, em qualquer lote.")}</h3><ul>{kit.included.map((item) => <li key={item}>{item}</li>)}</ul></div><div><p>{kit.optional}</p><p className="brasil-content-note">{kit.notice}</p></div></div>
    </div>
    <dialog className="brasil-kit-dialog" ref={dialogRef} aria-labelledby="kit-dialog-title" onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
      <div className="brasil-kit-dialog-header"><h3 id="kit-dialog-title">{selected ? `${selected.name} · ${selected.view.label}` : t("Kit 2027")}</h3><button type="button" autoFocus aria-label={t("Fechar imagem ampliada")} onClick={() => dialogRef.current?.close()}>{t("FECHAR ×")}</button></div>
      {selected ? <>
        <Image src={`/brasil-2027/${selected.view.src}.webp`} alt={selected.view.alt} width={selected.view.width} height={selected.view.height} unoptimized />
        <a className="brasil-kit-original-link" href={`/brasil-2027/${selected.view.src}.webp`} target="_blank" rel="noopener noreferrer">{t("Abrir imagem original")} <span className="sr-only">{t("em uma nova aba")}</span><span aria-hidden="true"> ↗</span></a>
      </> : null}
    </dialog>
  </section>;
}
