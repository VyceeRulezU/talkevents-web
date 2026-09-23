# Architecture

## 1. Goals
1. Fast, SEO-first marketing site on Cloudflare's edge.
2. A clean growth path to a web app (client portal, booking, planning dashboard) **without rewriting** the marketing site.
3. Cheap to run and easy for a small team (or one developer) to maintain.

## 2. Stack (decision record: `docs/decisions/ADR-001-framework-and-hosting.md`)
| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro 5**, TypeScript strict | Ships zero JS by default; best-in-class static SEO; islands for interactivity; first-class Cloudflare adapter |
| Styling | **Vanilla CSS** + `tokens.css` (scoped Astro styles / CSS Modules for islands) | Client requirement; no build-time lock-in |
| Interactivity | Vanilla TS first; React island only when state is genuinely complex | Keep JS under budget |
| Content | Markdown/MDX content collections (`src/content/`) with Zod schemas | Blog, services, portfolio editable in git; can move to a CMS later |
| Hosting | **Cloudflare Workers static assets / Pages** | Global CDN, free tier, DDoS/WAF |
| DNS | Cloudflare DNS (nameservers changed at Whogohost) | CDN + security + analytics |
| Server logic | **Cloudflare Workers/Pages Functions** (`/api/*`) | Enquiry form, health, future auth |
| Data | **D1** (leads, later app data), **KV** (rate limits, flags), **R2** (media) | All edge-native |
| Bot protection | **Cloudflare Turnstile** | Privacy-friendly, free |
| Email | Resend (transactional notifications) | Deliverability; API from Workers |
| Analytics | Cloudflare Web Analytics + GA4 (consent-gated) — see `docs/analytics-and-tracking.md` | Privacy + marketing insight |

## 3. Repository layout
```
talkevents-web/
├── .agent/                     agent manual, rules, skills
├── docs/                       product & research docs
├── apps/
│   └── web/                    ← marketing site (this scaffold)
│       ├── public/             static assets (brand, favicons, robots.txt)
│       ├── src/
│       │   ├── components/     ui/ (atoms), sections/ (page blocks), layout/, seo/
│       │   ├── content/        collections: services, portfolio, journal, faqs, testimonials, team
│       │   ├── data/           site.ts (NAP, socials, nav) — single source for contact facts
│       │   ├── layouts/        BaseLayout.astro
│       │   ├── pages/          file-based routes + pages/api/*
│       │   ├── scripts/        small progressive-enhancement TS modules
│       │   ├── styles/         tokens.css, base.css, layout.css, utilities.css
│       │   └── lib/            seo.ts, schema.ts, format.ts, validators.ts
│       ├── astro.config.mjs
│       └── wrangler.jsonc
└── packages/                   (created when app work starts — see §6)
```

## 4. Component layers
- **ui/** — atoms: Button, Link, Eyebrow, Heading, Field, Icon, Tag, Container. No page knowledge.
- **sections/** — composed blocks: Hero, ServiceGrid, ProcessSteps, Testimonial, LogoStrip, CtaBand, Gallery, FaqList.
- **layout/** — Header, Footer, MobileNav, WhatsAppFab, SkipLink.
- **seo/** — `<Seo/>`, `<JsonLd/>`, `<Breadcrumbs/>`.
Rule: dependencies point downward only (pages → sections → ui). UI never imports content.

## 5. Rendering strategy
- **Static (SSG) by default** for every marketing route.
- **On-demand (SSR/API)** only for `/api/*` (enquiry, health) and future app routes.
- Images: build-time optimisation (`astro:assets`) → AVIF/WebP with `srcset`; large galleries from R2 with Cloudflare Image Resizing when enabled.

## 6. Growth path to a web app
Phase 1 (now): marketing site at `https://<domain>`.
Phase 2: **separate app at `app.<domain>`** (client portal: proposals, timelines, payments, checklists, vendor lists).
- Split into a pnpm workspace: `apps/web` (marketing), `apps/app` (product), `packages/tokens` (extracted `tokens.css`), `packages/ui` (shared components), `packages/schema` (Zod types).
- Marketing stays static/SEO-optimised; the app can be Astro + islands, or React/Vite — decide by ADR when scoped.
- Shared: design tokens, brand assets, D1 schema (leads become clients), auth (Cloudflare Access or Better Auth on D1).
- **Do now to stay ready:** keep `site.ts` as single source of facts; keep tokens framework-agnostic; keep API routes versioned `/api/v1/*`; model the enquiry as a `lead` entity with status.
- **Do not do now:** auth, dashboards, payments, multi-tenant abstractions.

## 7. Environments
| Env | URL | Deploy |
|---|---|---|
| Local | `localhost:4321` | `pnpm dev` |
| Preview | `*.pages.dev` per PR | auto on push |
| Production | apex domain (+ `www` → 301 apex, or reverse; pick one) | merge to `main` |

## 8. Configuration & secrets
Non-secret config: `src/data/site.ts`, `wrangler.jsonc` vars. Secrets (`RESEND_API_KEY`, `TURNSTILE_SECRET`) via `wrangler secret` / Cloudflare dashboard only. Provide `.env.example` with names, never values.

## 9. Error handling & observability
Custom `404`/`500` pages; Worker errors logged with Cloudflare logs; optional Sentry later. Form failures must show a WhatsApp fallback link.

## 10. Anti-patterns
- Client-side rendering of marketing content · giant JS bundles · duplicating NAP data across files ·
  CMS/DB before content volume justifies it · designing the app's data model inside the marketing repo before it's scoped.
