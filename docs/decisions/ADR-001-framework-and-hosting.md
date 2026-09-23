# ADR-001 — Framework & hosting

- **Status:** Proposed (needs Victor's confirmation)
- **Date:** 19 September 2026
- **Context:** Marketing site now; may become a web app. SEO is a core goal. Vanilla CSS required. Hosting on Cloudflare. Small team; low budget; audience on mobile networks in Nigeria.

## Decision
**Astro 5 + TypeScript**, vanilla CSS with design tokens, deployed to **Cloudflare** (Workers static assets / Pages) with Workers/Pages Functions for API, D1/KV/R2 for data, Turnstile for spam, Resend for email. Registrar stays at Whogohost; DNS on Cloudflare.

## Options considered
| Option | Pros | Cons |
|---|---|---|
| **Astro (chosen)** | Zero-JS default, excellent SEO/CWV, content collections, islands for React when needed, first-class Cloudflare support | Different mental model if the team is React-only; app phase may prefer a separate SPA/SSR |
| Next.js (App Router) on Cloudflare (OpenNext) | Familiar React/Next path from other projects; one framework for site + app | Heavier JS/runtime on edge, more adapter complexity, easy to over-ship JS for a marketing site |
| Vite + React SPA | Simple | Poor SEO by default, needs prerendering — wrong tool for marketing |
| WordPress | Non-technical editing | Slower, security upkeep, conflicts with vanilla-CSS/edge goals, hosting off-Cloudflare |
| Static HTML/CSS | Simplest | Doesn't scale to content collections/app growth |

## Consequences
- Marketing pages are static HTML; app can live at `app.<domain>` in the same monorepo later, sharing tokens/UI (see `architecture.md` §6).
- Any React use is an island with a written justification.
- If the client insists on self-serve editing early: add Decap CMS (git-based) or Sanity in Phase 6 — no framework change needed.
- **Revisit trigger:** when app scope is defined; decide Astro vs Next/React for `apps/app` in a new ADR.

## Open confirmation
Victor: Astro vs Next.js? (Next.js is workable if you'd rather reuse patterns from your other projects; the docs need small edits.)
