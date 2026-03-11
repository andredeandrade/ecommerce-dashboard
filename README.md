# Admin Dashboard - E-commerce

Dashboard administrativo para e-commerce, construído com Next.js (App Router), Supabase Auth e Prisma.

## Visao Geral

- Frontend: Next.js + React + TypeScript + MUI
- Estado de servidor: TanStack React Query
- Autenticacao: Supabase Auth
- Banco de dados: PostgreSQL com Prisma
- API interna: Route Handlers do Next.js em `src/app/api`

## Stack Tecnica

- Next.js 16 (App Router)
- React 19
- TypeScript 5
- Prisma 7
- Supabase (`@supabase/ssr` e `@supabase/supabase-js`)
- Material UI 7
- Jest + Testing Library
- Docker

## Pre-requisitos

- Node.js 20+
- npm 10+
- PostgreSQL disponivel (local, Docker ou cloud)
- Projeto no Supabase (para autenticacao)

## Variaveis de Ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env.local
```

Preencha as variaveis abaixo em `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
DIRECT_URL=
```

Descricao rapida:

- `NEXT_PUBLIC_SUPABASE_URL`: URL do projeto Supabase.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: chave publica usada no client e middleware.
- `NEXT_SUPABASE_SERVICE_ROLE_KEY`: chave admin usada apenas no servidor (ex.: criacao de profile).
- `DATABASE_URL`: conexao principal do Prisma com o Postgres.
- `DIRECT_URL`: conexao direta usada pelo Prisma em migracoes/shadow database.

Importante:

- Nunca commitar `.env.local`.
- Em desenvolvimento local, normalmente `DATABASE_URL` e `DIRECT_URL` podem apontar para o mesmo banco.

## Setup Local (Passo a Passo)

1. Instale dependencias:

```bash
npm install
```

2. Rode as migracoes:

```bash
npx prisma migrate dev
```

3. Popule dados iniciais (opcional, recomendado):

```bash
npx prisma db seed
```

4. Inicie o projeto:

```bash
npm run dev
```

5. Acesse:

- App: http://localhost:3000

## Fluxo de Autenticacao

- Tela inicial (`/`) e cadastro (`/register`) sao publicos.
- Rotas privadas exigem sessao ativa (middleware redireciona para login quando necessario).
- Cadastro cria usuario no Supabase Auth e profile no banco via API interna.

Observacao sobre confirmacao de email no Supabase:

- Se a confirmacao estiver habilitada no projeto Supabase, o usuario precisa confirmar email antes de autenticar.
- Se quiser simplificar ambiente de desenvolvimento, desabilite confirmacao de email temporariamente no painel do Supabase.

## Scripts

- `npm run dev`: sobe em modo desenvolvimento.
- `npm run build`: gera build de producao.
- `npm run start`: executa app em producao.
- `npm run lint`: roda ESLint.
- `npm run format`: formata codigo com Prettier.
- `npm run test`: roda testes com Jest.

## Banco de Dados e Prisma

Comandos uteis:

```bash
# gera migration com nome
npx prisma migrate dev --name nome_da_migration

# aplica schema sem gerar migration (uso pontual)
npx prisma db push

# abre Prisma Studio
npx prisma studio
```

Seed atual cria dados basicos de:

- profile admin
- configuracoes da loja
- categorias e marcas
- produtos
- cliente
- pedido de exemplo

## Docker

Build da imagem:

```bash
docker build -t ecommerce-dashboard .
```

Execucao:

```bash
docker run --env-file .env.local -p 3000:3000 ecommerce-dashboard
```

Se o banco estiver na maquina host, ajuste a URL de conexao para ser acessivel de dentro do container.

## Estrutura de Pastas (Resumo)

- `src/app`: paginas, layouts e rotas API (App Router)
- `src/services`: camada de acesso/operacoes por dominio
- `src/lib`: clientes e integracoes (Prisma, Supabase)
- `src/types`: tipagens de dominio
- `prisma`: schema, migracoes e seed

## Troubleshooting Rapido

- Erro de autenticacao no cadastro/login:
  confira chaves do Supabase no `.env.local`.
- Erro de Prisma/migracao:
  valide `DATABASE_URL`/`DIRECT_URL` e se o Postgres esta no ar.
- Sessao nao persiste:
  confira dominio/URL da aplicacao e configuracoes de Auth no Supabase.
