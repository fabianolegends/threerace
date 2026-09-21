# Lista prioritária · Threerace Brasil 2027

O botão no hero abre o cadastro. O servidor valida nome completo, e-mail, telefone, cidade, estado, modalidade, categoria e consentimento antes de gravar em SQLite. As opções de categoria usam o mesmo conteúdo do regulamento apresentado na página.

## Armazenamento

Configure `THREERACE_PRIORITY_DB_PATH` em `.env.local` com um caminho absoluto em disco persistente, fora de `public/` e de diretórios temporários. Use Node.js 24 LTS. O banco e os arquivos auxiliares são privados, com permissões 0600, em diretório 0700, e não devem entrar no Git ou em anexos públicos.

Configure também `THREERACE_PRIORITY_ORIGIN` com a origem exata da página (na prévia, `http://127.0.0.1:3001`). Essa origem confiável evita divergência entre o endereço do navegador e a URL interna do servidor. Atualize-a ao mudar o endereço da página; não derive a configuração de cabeçalhos de clientes.

Os registros persistem ao fechar o navegador, recarregar a página ou reiniciar o servidor. O mesmo e-mail é registrado uma única vez por evento. Reenvios não modificam os dados anteriores; correções devem ser atendidas pela organização. Não há rota pública para listar ou exportar participantes, nem envio automático de e-mail ou mensagens.

Sem configuração válida ou com falha na gravação, o formulário informa o erro e não confirma o cadastro. O armazenamento local é bloqueado em Vercel e em pastas temporárias: antes de publicar em hospedagem sem disco persistente, conectar um banco durável e migrar os registros existentes. Manter backups privados do banco usando a API de backup SQLite ou exports controlados; não copiar um arquivo SQLite isolado durante escritas ativas.

## Exportação privada

Execute na máquina que mantém o banco:

```sh
npm run priority:export -- --output /caminho/privado/lista-prioritaria.csv
```

A pasta de destino deve existir. O exportador cria um arquivo novo com BOM UTF-8 e separador ponto e vírgula; não sobrescreve um export anterior. Inclui data de cadastro, contatos, localização, modalidade, nome da categoria e consentimento. Os campos são escapados contra fórmulas de planilha. Proteja o CSV como os dados originais.

## Verificação

```sh
npm run test:priority
```

Os testes usam apenas dados fictícios e bancos temporários isolados: persistência em processo novo, concorrência, duplicados, rollback, indisponibilidade, exportação e validação da API. A aceitação de caminhos temporários se limita a `NODE_ENV=test`.

## Campanha

A página considera 20/10/2026 o início das 48 horas prioritárias. A data é informação de campanha; o cadastro não faz cobrança, reserva inscrição ou dispara abertura automática. O horário e o canal de compra serão definidos pela organização.
