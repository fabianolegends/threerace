# Programação Brasil 2027 — referência editorial

Pesquisa realizada em 21/09/2026 a pedido da organização. Programação apresentada somente na sanfona da prévia Brasil; a seção avulsa removida da home não foi recriada.

## Fontes consultadas

- **Threerace Ultramarathon — Guia do Protagonista 2026**, 15 páginas: https://drive.google.com/file/d/1zFoVugHttu3t0NKMozpFlpBWM-DdMlX1/view. Página 3: sexta XCE, sábado Etapa Rainha, domingo etapa final. Página 11: gates e tempo limite. Página 13: premiações por etapa e geral. Todas as páginas foram conferidas visualmente; o guia não contém horários de credenciamento, largadas, briefings ou premiações.
- **Regulamento Threerace 2026**, 8 páginas, arquivo da organização. Item 2.5 (p. 1): 10–12/04/2026. Itens 11.1/11.3 (p. 3): alinhamento de 20 a cinco minutos antes da largada. Item 15.1 (p. 4): briefing na noite anterior. Item 18.1 (p. 5): premiação de etapa durante o briefing. Itens 21.1–21.4 (p. 6): cadastramento e coletiva remetem ao site/painel, sem horários. Versão pública consultada: https://storage.easyauth.net/windfit/content/document/1762367751236Regulamento%2520Threerace%25202026.pdf.
- **Ofício aos Bombeiros nº 008/2026**, de 26/03/2026, p. 1: janelas de apoio operacional de sexta 12h30–16h, sábado 7h30–14h e domingo 7h30–13h. Não equivalem a horários de largada ou programação dos atletas e não foram copiadas para 2027.
- **Regulamento Brasil 2027, revisão 08**: itens 7.6 (orientações também disponíveis à Sport no sábado), 11 (etapa de XCC em baterias por categoria), 12 (alinhamento e largadas por modalidade), 18 (premiações).

As buscas na web, nos arquivos locais e no Drive não localizaram a agenda horária completa da edição Brasil 2026. Horários de Uruguai, Garopaba ou outros eventos não foram utilizados.

## Adaptação para 2027

- Sexta, 02/04: credenciamento Ultra, orientação das baterias, XCC com término até as 17h, resultados, premiação diária Ultra e briefing para sábado.
- Sábado, 03/04: credenciamento Sport, arena e alinhamento, largadas próprias Ultra/Sport, resultados, premiação diária Ultra e briefing para domingo.
- Domingo, 04/04: arena e alinhamento, etapas finais Ultra/Sport, apuração, premiação diária Ultra, premiações gerais e encerramento.
- Conforme atualização da organização em 22/09/2026, a primeira etapa será de XCC: duas voltas em circuito de 3,5 km (7 km), por categoria, com no máximo 10 atletas por largada. Os horários serão ajustados à quantidade de baterias, garantindo o término da prova até as 17h. O XCC tem 120 m de elevação por volta, somando 240 m nas duas voltas. O total previsto da Ultra é de 157 km e 2.470 m de subida acumulada (240 + 1.450 + 780 m).
- Sport e E-bike têm apenas premiação geral final; as premiações diárias são da Ultra convencional. E-bike masculina e feminina são exclusivas da Ultra.
- O limite de término às 17h foi definido pela organização em 22/09/2026. Os demais horários continuam a confirmar. Os rótulos “Antes da largada”, “Após a etapa” e “À noite” organizam uma proposta preliminar; “A confirmar” indica horários pendentes. Datas, locais, sequência e formato poderão ser ajustados pela organização.

## Próximos dados a definir

Horários de atendimento e kits, primeira bateria de XCC, largadas e intervalos entre modalidades, briefings (hora e canal), resultados, premiações, encerramento e funcionamento da expo. O aviso de programação preliminar permanece visível.

Fonte editável da agenda: `app/threerace-brasil/content.ts` (`schedule` e `scheduleNotice`). Apresentação: `race-schedule.tsx` / `race-schedule.css`. Esta alteração não define horário para o contador: ele continua usando o início do dia 02/04/2027, conforme a decisão anterior.
