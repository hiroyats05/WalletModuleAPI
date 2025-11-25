# WalletModuleAPI

> **Este projeto faz parte de um módulo que estou desenvolvendo para o ERP da empresa onde trabalho atualmente.**  
> O objetivo da API é permitir o gerenciamento de wallets e transferências internas dentro do sistema corporativo.

Badges

- Node.js
- TypeScript
- Status: Em desenvolvimento

---

## Visão geral

WalletModuleAPI fornece endpoints para:

- criar wallets (id, saldo, banco),
- listar wallets,
- consultar wallet por id,
- transferir valor entre wallets (regras de negócio no service).

Projetos e decisões principais

- Linguagem: TypeScript
- Framework HTTP: Express
- Persistência em desenvolvimento: in-memory (Map). Opcional: Prisma + SQLite (configurado para uso local com Prisma v4).
- Testes: Jest + ts-jest + Supertest
- Variáveis de ambiente: dotenv (.env na raiz)

---

## Estrutura relevante do projeto

src/

- core/
  - server.ts (app Express exportado — não faz listen em NODE_ENV=test)
  - env.ts (dotenv loader)
- routes/
  - index.ts
- controllers/
  - wallet.controller.ts
  - transfer.controller.ts
- services/
  - wallet.services.ts
  - transfer.services.ts
- tests/ or tests/ (testes de integração com supertest)

prisma/

- schema.prisma (opcional — usado se optar por Prisma + SQLite)
  .env (na raiz)

---

## Endpoints

Base path: /api

- GET /api/wallet

  - Retorna lista de wallets. Se não houver wallets retorna 404.
  - Response: array de wallets (id, balance, bank)

- GET /api/wallet/:id

  - Retorna wallet por id (200) ou 404 quando não encontrada.

- POST /api/wallet

  - Cria/atualiza uma wallet.
  - Body JSON: { id: string, balance: number, bank: string }
  - Response: 201 com o objeto criado.

- POST /api/transfer
  - Realiza transferência entre wallets.
  - Body JSON: { fromId: string, toId: string, amount: number }
  - Response: 200 com dados da transferência ou 400 com mensagem de erro (validação, saldo insuficiente, wallet não encontrada).

---

## Como usar os endpoints

Pré-requisito: o servidor deve estar rodando (por exemplo `npm run dev`). Os exemplos assumem `http://localhost:3000/api` como base.

Observações gerais

- Envie JSON com o header `Content-Type: application/json`.
- Use curl, HTTPie, Postman ou similar.
- Os exemplos abaixo mostram request e o comportamento esperado (status / corpo).

1. Criar wallet

- Endpoint: POST /api/wallet
- Body:

```json
{ "id": "w1", "balance": 100, "bank": "BankA" }
```

- Exemplo (curl):

```bash
curl -X POST http://localhost:3000/api/wallet \
  -H "Content-Type: application/json" \
  -d '{"id":"w1","balance":100,"bank":"BankA"}'
```

- Sucesso: 201

```json
{
  "message": "Wallet created successfully",
  "data": { "id": "w1", "balance": 100, "bank": "BankA" }
}
```

- Erro: 400 quando faltar campo obrigatório.

2. Listar wallets

- Endpoint: GET /api/wallet
- Exemplo:

```bash
curl http://localhost:3000/api/wallet
```

- Sucesso: 200 com array de wallets, ou 404 quando não houver wallets (comportaçao do projeto atual).

Resposta esperada (quando houver):

```json
[
  { "id": "w1", "balance": 100, "bank": "BankA" },
  { "id": "w2", "balance": 50, "bank": "BankB" }
]
```

3. Obter wallet por id

- Endpoint: GET /api/wallet/:id
- Exemplo de request:

```bash
curl http://localhost:3000/api/wallet/w1
```

- Sucesso: 200 com o objeto completo da wallet. Exemplo de resposta:

```json
{
  "id": "w1",
  "balance": 100,
  "bank": "BankA"
}
```

- Erro: 404 se não encontrada.

4. Transferência entre wallets

- Endpoint: POST /api/transfer
- Body:

```json
{ "fromId": "w1", "toId": "w2", "amount": 30 }
```

- Exemplo (curl):

```bash
curl -X POST http://localhost:3000/api/transfer \
  -H "Content-Type: application/json" \
  -d '{"fromId":"w1","toId":"w2","amount":30}'
```

- Sucesso: 200

```json
{
  "message": "Transfer successful",
  "data": {
    "from": { "id": "w1", "balance": 70, "bank": "BankA" },
    "to": { "id": "w2", "balance": 80, "bank": "BankB" },
    "amount": 30
  }
}
```

- Erros comuns (400):
  - Missing required fields (faltou fromId/toId/amount)
  - Invalid transfer amount (<= 0 ou não numérico)
  - Wallet not found (uma das wallets não existe)
  - Insufficient funds (saldo insuficiente na wallet de origem)

## Setup (local — Windows / PowerShell)

1. Clone e entre no projeto

```powershell
git clone <repo-url>
cd WalletModuleAPI
```

2. Instale dependências

```powershell
npm install
```

3. Crie `.env` na raiz (exemplo)

```text
PORT=3000
DATABASE_URL="file:./dev.db"    # somente se usar Prisma + SQLite
NODE_ENV=development
```

4. (Opcional) Usando Prisma v4 + SQLite

```powershell
# certifique-se de usar prisma@4 e @prisma/client@4
npx prisma db push
npx prisma generate
```

5. Scripts úteis (adicione no package.json se ainda não existir)

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/core/server.ts",
  "build": "tsc",
  "start": "node dist/core/server.js",
  "test": "jest --runInBand"
}
```

6. Rodar em desenvolvimento

```powershell
npm run dev
```

A API ficará disponível em http://localhost:3000/api

---

## Testes

Testes de integração usam Jest + Supertest. Executar:

```powershell
npm run test
# ou
npx jest --runInBand
```

Dicas:

- server.ts já exporta o `app` sem dar listen quando NODE_ENV === 'test', permitindo testes via supertest.
- Antes de cada teste os serviços em memória são limpos (ver `walletService.wallets.clear()` nos specs).

---

## Observações e boas práticas

- Regras de negócio (validação de saldo, existência de wallets, limites) estão no service (`transfer.services.ts`). Controllers apenas validam payload e mapear HTTP responses.
- Para desenvolvimento rápido use o armazenamento em memória. Para persistência real, habilite Prisma + SQLite (Prisma v4) e ajuste o serviço para usar `prisma.client`.
- Não comite `.env` nem o arquivo de banco SQLite ao repositório — adicione-os ao `.gitignore`.

Problemas comuns

- Se aparecer erro relacionado a `prisma.config.ts` ou `prisma/config`, remova `prisma.config.ts` (não usado com Prisma v4) e mantenha `.env` + `prisma/schema.prisma` na raiz.
- Se o TS reclamar sobre arquivos fora de `src`, adicione `prisma` e `prisma.config.ts` em `exclude` no tsconfig.json.

---

## Autor

Samuel Hiroshi P. Yatabe  
GitHub: https://github.com/hiroyats05  
LinkedIn: https://www.linkedin.com/in/samuel-hiroshi-pires-yatabe-37049327a/?locale=pt-BR

Licença: MIT
