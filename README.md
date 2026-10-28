# AdminFlow

Painel administrativo feito com SvelteKit e Svelte 5, com componentes documentados em TSDoc e cobertura por testes unitários, testes de componentes e testes E2E. O app apresenta indicadores gerais, permite consultar usuários e publicações, pesquisar publicações e abrir a página de detalhes com seus comentários.

Acesse aqui a aplicação rodando em ambiente de produção: [https://adminflow-red.vercel.app/](https://adminflow-red.vercel.app/)

## Requisitos

- Node.js 22.12 ou superior.
- npm.

## Instalação e execução

Instale as dependências:

```sh
npm ci
```

Inicie o servidor de desenvolvimento:

```sh
npm run dev
```

Por padrão, o Vite disponibiliza o app em `http://localhost:5173`. Para criar e visualizar uma build de produção:

```sh
npm run build
npm run preview
```

## API de dados

O cliente da API fica em `src/lib/api/jsonplaceholder.ts` e usa a [JSONPlaceholder](https://jsonplaceholder.typicode.com/) por padrão. A URL base pode ser substituída com a variável pública `VITE_API_BASE_URL`.

Crie um arquivo `.env` na raiz do projeto para apontar o app para outra API compatível:

```dotenv
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
```

Como variáveis com prefixo `VITE_` podem ser incluídas no código do navegador, não coloque segredos ou credenciais nesse valor.

### Endpoints usados

| Função                | Requisição                     | Tipo retornado |
| --------------------- | ------------------------------ | -------------- |
| `getUsers()`          | `GET /users`                   | `ApiUser[]`    |
| `getPosts()`          | `GET /posts`                   | `ApiPost[]`    |
| `getPost(id)`         | `GET /posts/{id}`              | `ApiPost`      |
| `getComments(postId)` | `GET /posts/{postId}/comments` | `ApiComment[]` |

As interfaces `ApiUser`, `ApiPost` e `ApiComment` estão definidas junto ao cliente em `src/lib/api/jsonplaceholder.ts`. Cada função aceita opcionalmente uma implementação de `fetch`; as rotas passam o `fetch` fornecido pelo SvelteKit para manter o carregamento integrado ao ciclo da página. Em respostas HTTP que não sejam bem-sucedidas, as funções lançam um erro com o tipo de recurso e o status HTTP.

### Como os dados são usados

- **Dashboard (`/`)** carrega usuários e publicações. Calcula o total de cada recurso, a média de publicações por usuário e lista as cinco publicações de maior identificador em ordem decrescente.
- **Usuários (`/users`)** carrega usuários e exibe nome, e-mail, empresa e cidade.
- **Publicações (`/posts`)** carrega publicações. A pesquisa considera título e conteúdo.
- **Detalhe (`/posts/{id}`)** carrega a publicação e seus comentários. ID inválido ou publicação inexistente resulta em 404; falhas ao carregar os dados resultam em 502.

Os `load` das rotas ficam nos arquivos `+page.ts`; a apresentação correspondente fica em `+page.svelte`.

## Testes

Os testes são separados em três grupos: unitários, de componentes e E2E. Os testes unitários e de componentes rodam no Vitest; os testes E2E usam Playwright Test.

### Testes unitários

Execute todos os testes Vitest em modo de execução única:

```sh
npm test
```

Para executar somente os testes unitários:

```sh
npx vitest run src/lib/api src/lib/utils 'src/routes/posts/[id]/+page.test.ts'
```

Para acompanhar alterações e reexecutar testes:

```sh
npm run test:watch
```

Os testes unitários cobrem:

- URLs, dados retornados e erros HTTP do cliente JSONPlaceholder.
- Totais, média, ordenação, limite e entradas vazias do cálculo do dashboard.
- Validação de ID, dados encontrados e erros HTTP/API do carregamento do detalhe da publicação.

As chamadas à API são simuladas nos testes, então eles não dependem de uma conexão com a JSONPlaceholder.

### Testes de componentes

Os componentes são renderizados em `jsdom` com Svelte Testing Library. As consultas usam papéis e rótulos acessíveis, e as interações usam `user-event`.

Execute apenas os testes de componentes:

```sh
npx vitest run src/lib/components/components.test.ts
```

Eles cobrem campo de busca, tabela de dados, cartão de métrica, cabeçalho de página, cartão de publicação, estado vazio e breadcrumb. Os testes verificam o conteúdo e os comportamentos observáveis no DOM. A configuração compartilhada do Vitest fica em `vite.config.ts`, e os matchers do `jest-dom` são inicializados em `src/test/setup.ts`.

### Testes E2E com Playwright

Instale o Chromium do Playwright uma vez por ambiente:

```sh
npx playwright install chromium
```

Execute os fluxos E2E:

```sh
npm run test:e2e
```

Ou abra a interface interativa do Playwright:

```sh
npm run test:e2e:ui
```

O Playwright inicia automaticamente o servidor do app na porta `4173` e uma API de fixtures na porta `4174`. A API local fornece respostas previsíveis, sem depender de serviços externos. Os cenários em `e2e/publications.spec.ts` verificam:

1. Navegação entre dashboard, publicações e usuários pela sidebar.
2. Pesquisa por título e conteúdo, estado sem resultados e limpeza da busca.
3. Abertura dos detalhes de uma publicação, visualização dos comentários e retorno à lista.

Capturas de tela e traces de falhas são guardados em `test-results/`; relatórios HTML podem ser configurados pelo Playwright. Os artefatos de execução estão ignorados pelo Git.

## Verificações adicionais

```sh
npm run check
npm run lint
```

`npm run check` executa a sincronização do SvelteKit e a checagem de tipos. `npm run lint` verifica a formatação com Prettier e analisa o código com ESLint.

## Estrutura principal

```text
src/
├── lib/
│   ├── api/             # Cliente JSONPlaceholder e testes unitários
│   ├── components/      # Componentes Svelte e testes de componentes
│   ├── types/           # Tipos compartilhados da aplicação
│   └── utils/           # Cálculos puros do dashboard
└── routes/              # Dashboard, usuários e publicações
e2e/                     # Cenários Playwright e servidor de fixtures
```
