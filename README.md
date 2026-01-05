# 🛒 Admin Dashboard — E-commerce

Projeto de Dashboard Administrativo para E-commerce, desenvolvido com Next.js, com foco em arquitetura front-end, autenticação, visualização de dados e boas práticas modernas.

O objetivo do projeto é simular um cenário real de produto, incluindo controle de acesso, organização de código e clareza na apresentação de métricas.

---

## 🚀 Tecnologias Utilizadas

- Next.js (App Router)
- TypeScript
- Material UI (MUI)
- NextAuth.js (autenticação e gerenciamento de sessão)
- API Routes (Next.js)
- Docker (padronização de ambiente)
- React Query (TanStack Query) (fetching, cache e sincronização de dados)
- Notistack (sistema de notificações)
- Recharts (visualização de dados e gráficos)

---

## 🔐 Configuração de Variáveis de Ambiente

Antes de rodar o projeto, é necessário configurar as variáveis de ambiente.

Crie um arquivo .env.local na raiz do projeto com base no .env.example

```bash
cp .env.example .env.local
```

Exemplo de variáveis necessárias:

AUTH_SECRET=your-secret-key

AUTH_URL=http://localhost:3000

AUTH_TRUST_HOST=true

Descrição das variáveis

AUTH_SECRET: Usado para criptografar sessões e cookies de autenticação.

AUTH_URL: URL base da aplicação.

AUTH_TRUST_HOST: Necessário para execução local em ambiente Docker.

Gerando uma secret segura

```bash
openssl rand -base64 32
```

⚠️ Nunca versionar o arquivo .env.local com valores reais.

## 📦 Instalação e Uso

Clone o repositório:

```bash
git clone https://github.com/andredeandrade/ecommerce-dashboard.git
cd ecommerce-dashboard
```

🐳 Execução com Docker (opcional)

```bash
docker build -t ecommerce-dashboard .
docker run --env-file .env.local -p 3000:3000 ecommerce-dashboard
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para visualizar o projeto.

---

📌 Observação

Este projeto tem foco em estudos e demonstração técnica, mas foi desenvolvido com mentalidade de produto, seguindo práticas comuns em ambientes profissionais.
