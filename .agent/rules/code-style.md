# Code Style

## General
- **TypeScript strict**; no `any` (use `unknown` + narrowing). Prefer `type` for shapes, `interface` for extendable contracts.
- **Prettier** (default + `singleQuote: true`, `printWidth: 100`) and **ESLint** (`astro`, `@typescript-eslint`, `jsx-a11y`). CI fails on lint errors.
- Files: `PascalCase.astro` for components, `kebab-case.ts` for modules, `kebab-case.css` for styles. One component per file.
- Imports order: node/built-ins → packages → `@/` aliases → relative → styles. Use alias `@/` = `apps/web/src/`.
- No default exports except Astro pages/layouts and config files.
- Comments explain **why**, not what. Delete dead code; don't comment it out.
- Copy strings that the client may edit live in `src/content/` or `src/data/`, not buried in components.

## Astro components
- Props typed via `interface Props`. Destructure with defaults. Keep frontmatter logic small; move logic to `lib/`.
- Prefer semantic wrappers: `<section aria-labelledby>`, `<nav aria-label>`, `<article>`, `<figure>`.
- No inline `style=""` except to pass a CSS custom property value (e.g. `style={`--tile-bg:url(...)`}`).
- Client directives (`client:*`) require a written reason in the PR. Default is none.

## CSS (vanilla)
Order of authoring layers in `src/styles/`:
1. `tokens.css` (variables) → 2. `base.css` (reset, element defaults) → 3. `layout.css` (container, stack, grid, cluster) → 4. `utilities.css` (few: `.visually-hidden`, `.surface-dark`) → 5. component styles.

Use `@layer reset, base, layout, components, utilities;` to control cascade instead of specificity hacks.

Rules:
- **Tokens only.** `color: var(--color-text-default)` — never `#333`. Need a value that doesn't exist? Use `skills/generate-css-variable.md`.
- **Class naming: BEM-lite** — `.card`, `.card__title`, `.card--featured`. State via `[data-state]`, `[aria-*]`, `:where()`.
- **Specificity:** max one class + one attribute/pseudo. No `!important` (only in a11y utilities). No ID selectors.
- **Logical properties** (`margin-inline`, `padding-block`, `inset`) over physical.
- **Mobile-first** with `min-width` media queries using literals matching `--bp-*`. Prefer intrinsic layouts (`grid` + `auto-fit/minmax`, `clamp()`) before breakpoints. Use container queries for components that live in varying widths.
- **Units:** `rem` for type/space, `%`/`fr`/`ch` for layout, `px` only for 1px borders. `dvh` for full-height heroes (fallback `vh`).
- **Motion:** only `transform`/`opacity`; durations from tokens; wrap in `@media (prefers-reduced-motion: no-preference)` when non-essential.
- **Focus:** never remove outlines; use `:focus-visible` with `outline: 2px solid var(--color-focus-ring); outline-offset: 2px`.
- Avoid section-level padding collisions: sections get spacing from `.section` (padding-block token) only; child components must not add outer margin.
- Modern CSS is fine (`:has`, nesting, `color-mix`, `@layer`) but check the browser matrix: last 2 versions + Android Chrome/Samsung Internet + Safari 16.4+.

## JavaScript
- Progressive enhancement: pages work without JS. Enhance nav toggle, gallery lightbox, form UX.
- Modules < 5 KB gzip each; no jQuery/lodash/moment. Use `Intl` for dates/currency (`en-NG`).
- Event handlers use delegation for lists; always clean up observers.

## Naming
Components: `ServiceCard`, `CtaBand`. Tokens: `--color-*`, `--space-*`, `--text-*`. Content collections: plural nouns (`services`, `journal`). Routes: kebab-case, lowercase, no trailing slash.

## Testing & QA
- Unit: `lib/*` with Vitest. E2E smoke: Playwright (nav, enquiry form success/error, 404).
- Automated: `axe` via Playwright, Lighthouse CI on key pages, link checker, HTML validation.
- Visual check at 320 / 375 / 768 / 1024 / 1440.

## Git hygiene
See `git-workflow.md`.
