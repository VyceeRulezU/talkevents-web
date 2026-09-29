# Talk Events — Website

> **"Your plan, perfectly executed."**
> Marketing website for Talk Events, an Abuja-based event coordination and planning company (`@_talkevents`). Architected today as a fast, SEO-first static site — built to grow into a full client-facing web app without a rewrite.

---

## Table of Contents

1. [Project Status](#project-status)
2. [Quick Start](#quick-start)
3. [Tech Stack](#tech-stack)
4. [Repository Layout](#repository-layout)
5. [Design System](#design-system)
6. [Environment Variables](#environment-variables)
7. [Available Scripts](#available-scripts)
8. [Architecture & Growth Path](#architecture--growth-path)
9. [Deployment](#deployment)
10. [Agent & AI Contributor Rules](#agent--ai-contributor-rules)
11. [Git Workflow](#git-workflow)
12. [Definition of Done](#definition-of-done)
13. [Roadmap](#roadmap)
14. [Open Questions](#open-questions)
15. [Key Documents](#key-documents)

---

## Project Status

| Phase | Status | Description |
|---|---|---|
| 0 — Discovery | ?? In progress | Client interview, content audit, asset collection |
| 1 — Scaffold | ? Done | Docs, agent rules, tokens, base Astro scaffold |
| 2 — Foundation | ?? In progress | Layout (Header, Footer, WhatsApp FAB), Home page live on localhost |
| 3 — Design & Build | ? Upcoming | All pages (Services, Portfolio, About, Contact/Book, Legal) |
| 4 — Content & SEO | ? Upcoming | Copy, images, schema, journal seed posts |
| 5 — QA & Launch | ? Upcoming | a11y/perf/security audit, DNS cut-over, GBP, Search Console |
| 6 — Grow | ? Upcoming | Publishing cadence, CMS, web app |

> Content is **placeholder** pending client answers in [`docs/open-questions.md`](docs/open-questions.md). Do not ship placeholders to production.

---

## Quick Start

### Prerequisites

- **Node.js** >= 18 (LTS recommended)
- **pnpm** >= 9 — `npm install -g pnpm`

### Clone & install

```bash
git clone https://github.com/VyceeRulezU/talkevents-web.git
cd talkevents-web
cd apps/web && pnpm install
```

### Run the dev server

```bash
# From repo root (recommended):
npm run dev

# Or from apps/web:
cd apps/web && pnpm dev
```

Open http://localhost:4321

### First-time setup

```bash
cp apps/web/.env.example apps/web/.env
# Fill in the values — see Environment Variables section
```

---

## Tech Stack

| Layer | Choice | Rationale |
|---|---|---|
| **Framework** | Astro 5 + TypeScript (strict) | Zero-JS by default; best-in-class static SEO; islands for interactivity; first-class Cloudflare adapter |
| **Styling** | Vanilla CSS + `tokens.css` | Client requirement; no build-time lock-in; scoped Astro styles per component |
| **Interactivity** | Vanilla TS first; React islands only for genuinely complex state | Keeps JS bundle under budget |
| **Content** | Astro content collections (`src/content/`) with Zod schemas | Blog, services, portfolio editable in git; CMS-ready later |
| **Hosting** | Cloudflare Workers static assets / Pages | Global CDN, free tier, DDoS/WAF |
| **DNS** | Cloudflare (nameservers delegated from Whogohost) | CDN + security + analytics |
| **Server logic** | Cloudflare Workers / Pages Functions (`/api/*`) | Enquiry form, health checks, future auth |
| **Data** | Cloudflare D1 (leads ? clients), KV (rate limits, flags), R2 (media) | All edge-native |
| **Bot protection** | Cloudflare Turnstile | Privacy-friendly, free, replaces reCAPTCHA |
| **Email** | Resend (transactional) | Deliverability; API from Workers |
| **Analytics** | Cloudflare Web Analytics + GA4 (consent-gated) | Privacy + marketing insight |

---

## Repository Layout

```
talkevents-web/
+-- .agent/                     ? AI agent manual & rules (read before contributing)
¦   +-- agent.md                  Master operating manual
¦   +-- skills.md                 Task recipes (component-builder, etc.)
¦   +-- rules/
¦       +-- architecture.md
¦       +-- code-style.md
¦       +-- design-system.md
¦       +-- git-workflow.md
¦       +-- security.md
¦       +-- seo.md
¦       +-- accessibility.md
¦       +-- performance.md
¦
+-- docs/                       ? Product & research documentation
¦   +-- PRD.md                    Full product requirements document
¦   +-- open-questions.md         Client facts still needed — never guess these
¦   +-- sitemap.md
¦   +-- user-flows.md
¦   +-- seo-strategy.md
¦   +-- content-plan.md
¦   +-- market-research.md
¦   +-- competitor-analysis.md
¦   +-- analytics-and-tracking.md
¦   +-- launch-checklist.md
¦   +-- decisions/
¦       +-- ADR-001-framework-and-hosting.md
¦
+-- apps/
¦   +-- web/                    ? The Astro site
¦       +-- public/
¦       ¦   +-- brand/            Logo variants (reference JPEGs; replace with SVG)
¦       ¦   +-- images/           Hero & event photography
¦       ¦   +-- te-logo-bw-compact.png
¦       +-- src/
¦       ¦   +-- components/
¦       ¦   ¦   +-- ui/           Atoms: Button, Eyebrow, Heading, Field, Icon…
¦       ¦   ¦   +-- sections/     Blocks: Hero, ServiceGrid, ProcessSteps, Testimonial…
¦       ¦   ¦   +-- layout/       Header, Footer, MobileNav, WhatsAppFab, SkipLink
¦       ¦   ¦   +-- seo/          <Seo />, <JsonLd />, <Breadcrumbs />
¦       ¦   +-- content/          Collections: services, portfolio, journal, faqs, team
¦       ¦   +-- data/
¦       ¦   ¦   +-- site.ts       Single source of truth for NAP, socials, nav links
¦       ¦   +-- layouts/
¦       ¦   ¦   +-- BaseLayout.astro
¦       ¦   +-- pages/            File-based routes + pages/api/*
¦       ¦   +-- scripts/          Progressive-enhancement TS modules
¦       ¦   +-- styles/
¦       ¦   ¦   +-- tokens.css    ? Design token source of truth
¦       ¦   ¦   +-- base.css
¦       ¦   +-- lib/              seo.ts, schema.ts, format.ts, validators.ts
¦       +-- astro.config.mjs
¦       +-- tsconfig.json
¦       +-- .env.example
¦
+-- package.json                ? Root workspace (proxy scripts to apps/web)
+-- pnpm-workspace.yaml         ? pnpm monorepo config
+-- .gitignore
+-- README.md
```

> **Rule:** Component dependencies point **downward only** — pages ? sections ? ui. UI components never import content or page data.

---

## Design System

All visual values live in `apps/web/src/styles/tokens.css`. **Never use raw hex values, magic px sizes, or hardcoded z-indexes** outside that file.

### Brand colours

| Token | Value | Use |
|---|---|---|
| `--color-brand-primary` | `#1A3870` (blue) | Headers on light, buttons, links, brand bands |
| `--color-brand-accent` | `#7ED958` (green) | Fills, highlights, focus rings on dark. **Never as text on white** (1.76:1 — fails WCAG) |
| `--color-brand-accent-text` | `#2A7A17` | Accent-coloured text on light backgrounds |
| `--palette-ink-900` | `#1B1B1B` | Body text, headings, dark surfaces |
| `--color-surface-inverse` | `#000` | Footer |

### Typography

| Role | Font | Token |
|---|---|---|
| Display / headings | Cormorant Garamond (serif) | `--font-display` |
| Body / UI | Inter (neo-grotesque sans) | `--font-body` |
| Accent script | Mrs Saint Delafield | `--font-script` |

- **Eyebrow labels**: `--text-2xs`, `--tracking-eyebrow`, uppercase — only where it adds context.
- **Script accent**: max one per section, max three per page.
- **Headings**: serif, sentence case. Body: left-aligned. CTA bands: centred.

### Key layout patterns

- **Hero**: full-bleed image + CSS overlay; white content card bottom-left; scroll-cue circle bottom-centre.
- **Service tiles**: portrait aspect-ratio, image + overlay, serif title. 3-up desktop ? 2-up tablet ? 1-up mobile.
- **CTA band**: full-bleed image + overlay, outline pill button.
- **Floating WhatsApp**: 56px, bottom-right, labelled, hidden on `/contact` and `/book`.
- **Header**: transparent over hero ? solid `#fff` on scroll.

---

## Environment Variables

```bash
cp apps/web/.env.example apps/web/.env
```

| Variable | Description | Where to get it |
|---|---|---|
| `RESEND_API_KEY` | Transactional email (enquiry notifications) | resend.com dashboard |
| `TURNSTILE_SECRET_KEY` | Server-side Turnstile validation | Cloudflare dashboard ? Turnstile |
| `PUBLIC_TURNSTILE_SITE_KEY` | Client-side Turnstile widget | Cloudflare dashboard ? Turnstile |

All secrets in production are set via `wrangler secret put <KEY>` or the Cloudflare dashboard — **never** in `wrangler.jsonc`.

---

## Available Scripts

| Command | From root | From `apps/web` | Description |
|---|---|---|---|
| Dev server | `npm run dev` | `pnpm dev` | Astro dev server at localhost:4321 |
| Type-check + build | `npm run build` | `pnpm build` | `astro check && astro build` |
| Preview build | `npm run preview` | `pnpm preview` | Serve production build locally |
| Astro CLI | `npm run astro -- <cmd>` | `pnpm astro <cmd>` | Direct Astro CLI access |

---

## Architecture & Growth Path

### Phase 1 — Now (marketing site)

Static Astro site. Every marketing route is SSG. API routes (`/api/*`) use Cloudflare Pages Functions.

### Phase 2 — Web app (when ready)

Separate app at `app.<domain>` (client portal). Monorepo grows to:

```
apps/
  web/      ? marketing site (unchanged)
  app/      ? client portal (Astro + islands or React/Vite — decide by ADR)
packages/
  tokens/   ? extracted tokens.css
  ui/       ? shared components
  schema/   ? shared Zod types
```

**Stay ready now:** `site.ts` single source for contact facts; tokens are framework-agnostic; API routes versioned `/api/v1/*`; leads have a `status` field.

**Do not build yet:** auth, dashboards, payments, multi-tenant abstractions.

---

## Deployment

| Environment | URL | How |
|---|---|---|
| Local | `http://localhost:4321` | `npm run dev` |
| Preview | `*.pages.dev` per branch | Auto on push |
| Production | Apex domain (+ `www` ? 301) | Merge to `main` |

### Cloudflare setup (first time)

1. Add site to Cloudflare dashboard.
2. Change nameservers at **Whogohost** to Cloudflare's assigned nameservers.
3. **Before switching DNS:** audit existing MX records so email is not broken.
4. Set SSL mode to **Full (strict)**.
5. Connect GitHub repo to Cloudflare Pages — build command: `npm run build`, output dir: `apps/web/dist`.
6. Add environment variables in Cloudflare Pages settings.
7. Add Search Console TXT verification via Cloudflare DNS.

### Manual deploy

```bash
npm install -g wrangler
cd apps/web
npx wrangler pages deploy dist
```

---

## Agent & AI Contributor Rules

Read `docs/PRD.md` and `.agent/agent.md` before making any changes.

### Non-negotiables

- **Vanilla CSS only.** No Tailwind, no CSS-in-JS, no preprocessors.
- **Every visual value from `tokens.css`.** No raw hex, magic px, or hardcoded z-indexes.
- **Never invent client facts.** Use `{{PLACEHOLDER: ...}}` for anything not confirmed in `docs/open-questions.md`.
- **Mobile-first, low-bandwidth-first.** Most Nigerian traffic is mobile on variable 4G.
- **WhatsApp is a primary conversion channel** alongside the enquiry form. Both must work with JS disabled.
- **WCAG 2.2 AA.** Green `#7ED958` is never used as text on white.
- **SEO is a feature.** Every page ships with title, meta description, canonical, OG, JSON-LD, and sitemap entry.
- **No secrets in the repo.** See `.agent/rules/security.md`.
- **Nigerian English** — organise, programme, colour. Currency ?. Phone `+234`. Dates `29 September 2026`.

---

## Git Workflow

- **Trunk-based:** `feat/…`, `fix/…`, `docs/…`, `chore/…` ? PR ? squash-merge to `main`.
- **Conventional Commits:**

```
feat(hero): add scroll cue animation
fix(form): announce validation errors to screen readers
chore(root): add workspace package.json
docs(prd): update sitemap section
```

- **`main` is protected** — CI must pass (lint ? typecheck ? build ? axe ? Lighthouse CI).
- **Never commit:** `.env*` files, exports containing leads, large unoptimised photos.

---

## Definition of Done

Every page or component must satisfy all of the following:

- [ ] Uses design tokens only — no raw values in CSS
- [ ] Renders correctly 320 px ? 1440 px (mobile-first)
- [ ] Keyboard-operable with visible focus states and correct ARIA semantics
- [ ] Alt text on all images; decorative images have `alt=""`
- [ ] No layout shift (images have explicit `width`/`height` or `aspect-ratio`)
- [ ] Meta title, description, canonical, OG tags, and JSON-LD present (pages)
- [ ] Copy uses `{{PLACEHOLDER: ...}}` where facts are unconfirmed
- [ ] Lighthouse mobile >= 95 on Performance / Accessibility / Best Practices / SEO

---

## Roadmap

### Phase 3 — Remaining pages

- [ ] Services hub + individual service pages (wedding, corporate, birthday, day-of, etc.)
- [ ] Portfolio / gallery — filterable, paginated, lazy-loaded + lightbox
- [ ] About / Team
- [ ] Contact (`/contact`) and multi-step enquiry form (`/book`)
- [ ] FAQ with `FAQPage` JSON-LD
- [ ] Journal / blog — index + article template + RSS
- [ ] Legal: Privacy Policy, Terms of Service, Cookie Notice
- [ ] Thank-you page (post-enquiry)

### Phase 3/4 — API & backend

- [ ] `/api/v1/enquiry` — Turnstile + honeypot + D1 storage + Resend email
- [ ] Rate limiting via Cloudflare KV
- [ ] No-JS POST fallback for enquiry form

### Phase 4 — SEO & content

- [ ] 6 seed journal articles (see `docs/content-plan.md`)
- [ ] Area pages: Maitama, Wuse 2, Jabi, Gwarinpa, Asokoro, Garki
- [ ] Google Business Profile claim + optimisation
- [ ] Search Console verification + sitemap submission
- [ ] `robots.txt`, canonical tags, redirect rules

### Phase 5 — Infrastructure & launch

- [ ] Cloudflare production DNS cut-over
- [ ] Security headers (grade A on securityheaders.com)
- [ ] Lighthouse CI in GitHub Actions
- [ ] Cloudflare Web Analytics + GA4 (consent-gated)

### Phase 2 — Web app (future)

- [ ] Client portal at `app.<domain>` (proposals, timelines, checklists, payments)
- [ ] Admin interface for team
- [ ] WhatsApp notifications
- [ ] Optional CMS (Decap / Sanity) for client self-editing

---

## Open Questions

Client facts must be confirmed before going live — **never guess**. See [`docs/open-questions.md`](docs/open-questions.md) for the full list.

**Business:** Legal name & RC number · services offered · team bios & consent

**Contact:** Phone/WhatsApp · email · office address · response-time promise

**Brand:** SVG logo masters · confirmed fonts · photo library (quantity, rights, consent)

**Digital:** Confirmed domain & TLD · Google Business Profile · who updates content post-launch

---

## Key Documents

| Document | Purpose |
|---|---|
| `docs/PRD.md` | Full product requirements, goals, personas, scope, acceptance criteria |
| `docs/open-questions.md` | Blocked items — needs client input |
| `docs/sitemap.md` | Full page & URL map |
| `docs/user-flows.md` | Key user journeys (search?enquiry, Instagram?WhatsApp, etc.) |
| `docs/seo-strategy.md` | Keyword targets, schema plan, local SEO approach |
| `docs/content-plan.md` | Journal seed topics, copy responsibilities |
| `docs/launch-checklist.md` | Pre-launch gate checklist |
| `docs/analytics-and-tracking.md` | GA4 events, Cloudflare Web Analytics setup |
| `docs/decisions/ADR-001-framework-and-hosting.md` | Why Astro + Cloudflare was chosen |
| `.agent/agent.md` | AI / contributor operating manual |
| `.agent/rules/design-system.md` | Design tokens, typography, layout patterns |
| `.agent/rules/architecture.md` | Folder structure, component layers, growth path |
| `apps/web/src/styles/tokens.css` | Design token definitions (single source of truth) |
| `apps/web/src/data/site.ts` | NAP, social links, navigation (single source of truth) |

---

## Builder

**Victor Ironali** — NaliTech Consults Limited
Client: Talk Events (`@_talkevents`, Abuja, Nigeria)
