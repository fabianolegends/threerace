# Threerace Brasil — ambiente de desenvolvimento

Versão de trabalho do site Threerace no repositório original para preparar a edição Brasil 2027. Preserva a organização das informações da edição Uruguai e aplica a identidade brasileira de dez anos: terracota, areia e as imagens do kit fornecidas pela organização.

As imagens do kit estão em `public/brasil-2027`, otimizadas em WebP com transparência. A seção oferece frente e costas da camiseta e da jersey e ampliação de todas as peças. Camiseta casual, meia, placa personalizada e sacochila estão incluídas na inscrição; jersey é opcional por R$ 100, comprada no ato da inscrição. Logotipos na placa não confirmam patrocínios.

**Não publicar esta branch.** O trabalho está em `desenvolvimento/brasil`, no repositório `fabianolegends/threerace`. A branch publicada `legendsbikerace` deve permanecer intacta até autorização.

## Abrir localmente

Requer Node.js 22.13 ou superior e npm.

```bash
npm ci
npm run dev
```

Acesse http://127.0.0.1:3000/threerace-brasil. A página de referência está em http://127.0.0.1:3000/threerace-uruguay.

```bash
npm run build
```

O comando acima apenas verifica e compila o projeto localmente. Não publica nada.

## Onde trabalhar

- `app/threerace-brasil/content.ts`: textos, programação e perguntas frequentes.
- `app/threerace-brasil/page.tsx`: página e interações.
- `app/threerace-brasil/brasil.css`: ajustes visuais exclusivos do Brasil.
- `app/threerace-brasil/layout.tsx`: informações da edição nos metadados.
- `public/`: fotos e marcas já existentes na base original.
- `CONTEUDO-BRASIL.md`: pontos que precisam de definição antes do lançamento.

## Isolamento da publicação

- Repositório original: `fabianolegends/threerace`, branch `desenvolvimento/brasil`.
- O domínio threerace.com continua vinculado à versão publicada; esta branch não deve gerar publicação.
- `vercel.json` desabilita publicações automáticas pelo Git.
- `robots.txt`, metadados e cabeçalho HTTP instruem buscadores a não indexar esta cópia. Isso não substitui controle de acesso.
- Servidor local escuta somente em `127.0.0.1`.
- Newsletter desativada, sem envio de contatos e sem carregar Analytics no layout desta cópia.
- Não importar credenciais de produção nem habilitar hospedagem neste ambiente.
- As páginas históricas de outros eventos continuam na cópia para referência; seus links externos pertencem às respectivas edições. Não realizar inscrições reais durante testes.

O layout Brasil reaproveita o estilo da edição Uruguai sem associar à edição brasileira seus valores, regulamento, hospedagens ou parceiros.

Uma publicação futura no domínio threerace.com será feita após revisão dos dados e autorização expressa. Antes de integrar à branch publicada, retirar os avisos de trabalho, restaurar indexação, rodapé e integrações apropriadas e revisar a configuração de publicação. Não mesclar esta branch automaticamente.
