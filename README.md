# next-ts-starter

A batteries-included Next.js starter: App Router, TypeScript, Tailwind CSS 4, Zustand,
TanStack Query, Biome, Vitest, Playwright component tests, Playwright E2E tests, and
Conventional Commits enforced by Husky.

## Stack

| Tool                                                                                                  | Purpose                                 |
| ----------------------------------------------------------------------------------------------------- | --------------------------------------- |
| [Next.js 16](https://nextjs.org)                                                                      | App Router, Turbopack, Cache Components |
| [React 19](https://react.dev)                                                                         | UI                                      |
| [TypeScript 5.9](https://www.typescriptlang.org)                                                      | Type safety                             |
| [Tailwind CSS 4](https://tailwindcss.com)                                                             | Styling, CSS-first config               |
| [Zustand 5](https://zustand.docs.pmnd.rs)                                                             | Client state                            |
| [TanStack Query 5](https://tanstack.com/query)                                                        | Server state                            |
| [Biome 2](https://biomejs.dev)                                                                        | Formatter + linter (no semicolons)      |
| [Vitest 5](https://vitest.dev)                                                                        | Unit tests                              |
| [Playwright CT](https://playwright.dev/docs/test-components)                                          | Component tests                         |
| [Playwright](https://playwright.dev)                                                                  | E2E tests                               |
| [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/lint-staged/lint-staged) | Git hooks                               |
| [Commitlint](https://commitlint.js.org)                                                               | Conventional Commits                    |

## Getting started

```bash
pnpm install
pnpm playwright:install   # downloads the Chromium build used by E2E and CT
pnpm dev
```

Open <http://localhost:3000>.

## Scripts

| Script                    | What it does                          |
| ------------------------- | ------------------------------------- |
| `pnpm dev`                | Start the dev server (Turbopack)      |
| `pnpm build`              | Production build                      |
| `pnpm start`              | Start the production server           |
| `pnpm lint`               | Run Biome lint + format checks        |
| `pnpm lint:fix`           | Apply Biome lint fixes and formatting |
| `pnpm format`             | Format with Biome                     |
| `pnpm typecheck`          | `tsc --noEmit`                        |
| `pnpm test`               | Run Vitest once                       |
| `pnpm test:watch`         | Run Vitest in watch mode              |
| `pnpm test:coverage`      | Vitest with V8 coverage               |
| `pnpm test:ct`            | Playwright component tests            |
| `pnpm test:e2e`           | Playwright E2E tests                  |
| `pnpm test:all`           | Unit + component + E2E                |
| `pnpm playwright:install` | Install the Chromium browser          |

## Testing strategy

Each layer has a clear job:

- **Vitest** — pure logic, utilities, Zustand stores, and hooks. Files live next to the code
  as `*.test.ts(x)` and render with `jsdom` + React Testing Library.
- **Playwright CT** — rendered components in a real browser. Files are `*.ct.tsx` and are
  mounted through `playwright/index.tsx`, which applies Tailwind and the app providers.
- **Playwright E2E** — full pages against the Next.js server. Specs live in `e2e/`.

Playwright component tests render through **Vite**, not Next.js. `next/link`, `next/image`,
and `next/navigation` therefore need mocks inside CT specs — prefer testing presentational
components there and cover routing/data fetching with E2E.

`pnpm test:coverage` reports unit-test coverage only. Components are exercised by Playwright
CT and pages by E2E, so those folders are excluded from the V8 report.

## Formatting and linting

Biome is the single tool for formatting and linting. Semicolons are omitted
(`javascript.formatter.semicolons: "asNeeded"`), imports are organized on save, and
Tailwind directives are parsed.

VS Code is pre-configured in `.vscode/settings.json`:

- `editor.defaultFormatter: "biomejs.biome"`
- `editor.formatOnSave: true`
- `source.fixAll.biome` and `source.organizeImports.biome` on save

Install the recommended extensions when VS Code prompts, or run:

```bash
code --install-extension biomejs.biome
```

## Commits

Husky runs lint-staged on `pre-commit` and Commitlint on `commit-msg`. Commit messages must
follow [Conventional Commits](https://www.conventionalcommits.org):

```text
feat: add account settings page
fix: prevent double submit on login
chore: bump dependencies
docs: document the testing strategy
```

Allowed types include `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`,
`ci`, `chore`, and `revert`.

## Project structure

```text
.
├─ e2e/                     # Playwright E2E specs
├─ playwright/              # Component-test harness (HTML entry, providers, CSS)
├─ src/
│  ├─ app/                  # App Router routes, providers, global styles
│  ├─ components/           # UI + co-located CT specs
│  ├─ lib/                  # Utilities + unit tests
│  ├─ stores/               # Zustand stores + unit tests
│  └─ test/                 # Vitest setup
├─ biome.json
├─ commitlint.config.mjs
├─ playwright.config.ts     # E2E
├─ playwright-ct.config.ts  # Component tests
└─ vitest.config.mts
```

## Notes

- **Playwright is pinned to 1.62.1** for both `@playwright/test` and
  `@playwright/experimental-ct-react`. Component testing's latest stable release is still
  1.62.1; mixing it with a newer test runner breaks the CT fixtures. Bump both together once
  CT catches up.
- **TypeScript stays on 5.9** because that is the line Next.js 16 validates. TypeScript 7 is
  the native compiler rewrite and can be evaluated separately.
- **Tailwind 4 uses CSS-first configuration.** Theme tokens live in `src/app/globals.css`
  via `@theme`; there is no `tailwind.config.ts`.
- **Cache Components are enabled** (`cacheComponents: true`). Client components that read
  dynamic values during prerendering must sit behind a `<Suspense>` boundary — see
  `src/app/page.tsx`.
- The QueryClient is created once per browser session and once per server render, following
  the official Next.js + TanStack Query pattern.
