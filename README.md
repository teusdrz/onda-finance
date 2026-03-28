# Onda Finance

Aplicacao web simulando um app bancario simples, desenvolvida como desafio tecnico para a vaga de Desenvolvedor Front-End na Onda Finance.

## Link da Aplicacao

> **[Acessar aplicacao publicada](https://onda-finance.vercel.app)**

## Como Rodar o Projeto

### Pre-requisitos

- Node.js 18+
- npm 9+

### Instalacao

```bash
git clone https://github.com/matheusreissouza/onda-finance.git
cd onda-finance
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173`

### Credenciais de acesso (mock)

- **E-mail:** matheus@ondafinance.com
- **Senha:** 123456

### Build de producao

```bash
npm run build
npm run preview
```

### Testes

```bash
npm run test:run
```

## Decisoes Tecnicas

### Arquitetura Feature-Based

O projeto segue uma organizacao por funcionalidades (`features/auth`, `features/dashboard`, `features/transfer`), onde cada feature encapsula seus proprios componentes, hooks, services e schemas. Essa abordagem facilita a escalabilidade e a manutencao, pois cada modulo e independente e autocontido.

```
src/
  features/
    auth/           # Login, autenticacao, guards
    dashboard/      # Saldo, transacoes
    transfer/       # Formulario de transferencia
  components/
    ui/             # Componentes shadcn/ui
    layouts/        # Layout da aplicacao
  lib/              # Utilitarios, axios, query client
  mocks/            # Dados simulados (mock database)
  pages/            # Paginas da aplicacao
  types/            # Tipos compartilhados
```

### Separacao de Estado: Zustand + React Query

- **Zustand** gerencia estado do cliente (autenticacao e sessao) com persistencia em `localStorage` via middleware `persist`
- **React Query** gerencia estado do servidor (saldo e transacoes), com cache, invalidacao automatica e loading states

Essa separacao segue o principio de que estado do cliente e estado do servidor sao preocupacoes distintas e devem ser gerenciados por ferramentas diferentes.

### Camada de Servicos (Mock)

Os servicos simulam chamadas a uma API REST com delays artificiais, mantendo a mesma interface que seria usada com um backend real. O mock database em memoria (`mocks/db.ts`) funciona como fonte de dados. Trocar para um backend real requer apenas alterar os servicos - nenhum componente ou hook precisa mudar.

### Validacao com Zod + React Hook Form

Cada formulario possui seu schema Zod separado, definido junto da feature correspondente. O `zodResolver` integra a validacao ao React Hook Form, garantindo type safety entre o schema e os dados do formulario.

### Componentes UI com shadcn/ui + CVA

Os componentes de interface utilizam shadcn/ui (baseado em Radix) com class-variance-authority (CVA) para variantes. As cores seguem um tema personalizado via CSS variables com um primary azul-oceano, remetendo ao conceito "Onda".

### Roteamento com Guards

O `AuthGuard` protege rotas autenticadas usando o pattern de layout routes do React Router. Rotas nao autenticadas redirecionam para `/login`, e o login redireciona para `/dashboard`.

### Testes

Os testes cobrem o fluxo de login completo:
- Renderizacao dos campos
- Validacao de campos vazios
- Validacao de senha curta
- Erro de credenciais invalidas
- Autenticacao bem-sucedida e atualizacao do store

## Melhorias Futuras

- **Backend real**: Integrar com API REST, substituindo os mocks por chamadas HTTP reais via Axios
- **Autenticacao JWT completa**: Implementar refresh token, expiracao de sessao e rotacao de tokens
- **Dark mode**: Ja preparado com CSS variables, falta apenas o toggle e a classe `dark`
- **Testes E2E**: Adicionar testes de ponta a ponta com Playwright ou Cypress
- **Internacionalizacao (i18n)**: Suporte a multiplos idiomas com react-intl ou i18next
- **PWA**: Service worker para uso offline e push notifications
- **Paginacao de transacoes**: Implementar paginacao ou scroll infinito para listas longas
- **Historico de transferencias**: Tela dedicada com filtros por periodo e destinatario

## Seguranca

Embora esta aplicacao seja um mock/prototipo, em um cenario de producao as seguintes medidas seriam implementadas:

### Protecao contra Engenharia Reversa

- **Ofuscacao de codigo**: Utilizar ferramentas como Terser (ja incluso no Vite) com configuracoes agressivas de mangling e compressao para dificultar a leitura do bundle
- **Source maps desabilitados em producao**: Nunca disponibilizar source maps no ambiente de producao (`build.sourcemap: false` no Vite)
- **Nenhuma logica sensivel no frontend**: Toda logica de negocios critica (calculo de taxas, validacao de saldo real, autorizacao) deve residir exclusivamente no backend
- **Variaveis de ambiente no servidor**: Chaves de API, secrets e configuracoes sensiveis nunca devem ser incluidas no bundle do frontend
- **Code splitting**: Carregar modulos sob demanda dificulta a analise estatica do codigo completo
- **Certificate pinning**: Em apps mobile, implementar pinning de certificados SSL para prevenir interceptacao via proxy

### Protecao contra Vazamento de Dados

- **HTTPS obrigatorio**: Toda comunicacao entre cliente e servidor deve usar TLS/SSL, com redirecionamento forcado de HTTP para HTTPS
- **Tokens em HttpOnly cookies**: Ao inves de armazenar tokens JWT no localStorage (vulneravel a XSS), utilizar cookies HttpOnly com flags Secure e SameSite
- **Content Security Policy (CSP)**: Headers CSP restritivos para prevenir execucao de scripts maliciosos injetados
- **Sanitizacao de inputs**: Todo dado vindo do usuario deve ser sanitizado tanto no frontend (Zod/validacao) quanto no backend antes de persistir
- **Rate limiting**: Limitar tentativas de login e chamadas de API para prevenir ataques de forca bruta
- **Logs e monitoramento**: Implementar logging de eventos de seguranca (tentativas de login, transferencias) com ferramentas como Sentry ou Datadog
- **Principio do menor privilegio**: APIs devem retornar apenas os dados estritamente necessarios para cada operacao, evitando over-fetching de dados sensiveis
- **Criptografia em repouso**: Dados sensiveis no banco de dados devem ser criptografados (AES-256)

## Stack Utilizada

| Tecnologia | Uso |
|---|---|
| React + TypeScript | Framework e linguagem |
| Vite | Build tool e dev server |
| Tailwind CSS + CVA | Estilizacao e variantes |
| shadcn/ui + Radix | Componentes de UI |
| React Router | Roteamento SPA |
| React Query | Gerenciamento de estado do servidor |
| Zustand | Gerenciamento de estado do cliente |
| React Hook Form + Zod | Formularios e validacao |
| Axios | Cliente HTTP |
| Vitest | Testes |
