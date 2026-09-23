# Agent Operating Manual — Talk Events Website

You are working on the marketing website for **Talk Events**, an Abuja-based event coordination
and planning company (Instagram: `@_talkevents`, tagline: *"Your plan, perfectly executed"*).
The site is a **marketing site today** and must be able to grow into a **web app** (client portal,
planning dashboard, booking) without a rewrite.

## 0. Read order (every session)
1. `docs/PRD.md` — what and why
2. `.agent/rules/architecture.md` — structure, boundaries, growth path
3. `.agent/rules/design-system.md` + `apps/web/src/styles/tokens.css` — how it looks
4. `.agent/rules/code-style.md` — how code is written
5. `.agent/rules/security.md`, `seo.md`, `accessibility.md`, `performance.md`
6. `.agent/skills.md` — task recipes (component-builder, generate-css-variable, …)
7. `docs/open-questions.md` — **do not guess answers listed here; ask.**

## 1. Non-negotiables
- **Vanilla CSS only.** No Tailwind, no CSS-in-JS, no preprocessors. CSS Modules or scoped Astro styles + tokens.
- **Every visual value comes from `tokens.css`.** No raw hex, px font sizes, magic z-indexes.
- **Never invent client facts.** Names, phone numbers, prices, RC number, testimonials, client logos,
  event counts, awards: use clearly marked placeholders (`{{PLACEHOLDER: ...}}`) until confirmed in `docs/open-questions.md`.
- **Mobile-first, low-bandwidth-first.** Most Nigerian traffic is mobile on variable 4G. Budget in `performance.md`.
- **WhatsApp is a primary conversion channel**, alongside the enquiry form. Both must work with JS disabled (link / plain POST fallback).
- **Accessible by default** (WCAG 2.2 AA). Green `#7ED958` is never used as text on white (1.76:1).
- **SEO is a feature, not a phase.** Every page ships with title, meta description, canonical, OG, JSON-LD, and a place in the sitemap.
- **No secrets in the repo.** See `security.md`.
- **Nigerian English** (organise, programme, colour). Currency ₦. Phones `+234`. Dates `19 September 2026`.

## 2. Working agreement
- Read the actual repo state before advising or editing. Do not assume files exist.
- One concern per change. Small, reviewable commits (`git-workflow.md`).
- If a request conflicts with a rule here, say so and propose the smallest deviation; do not silently break the rule.
- When finishing a task: list files changed, what was verified (build, lint, a11y, Lighthouse), and what remains.
- Update docs when behaviour changes (PRD requirement IDs, sitemap, tokens).

## 3. Definition of done (any page or component)
- [ ] Uses tokens only; renders correctly 320px → 1440px
- [ ] Keyboard operable, visible focus, correct semantics, alt text
- [ ] No layout shift (images have dimensions/aspect-ratio)
- [ ] Meta + JSON-LD present (pages)
- [ ] Copy uses placeholders where facts are unconfirmed
- [ ] Lighthouse (mobile) ≥ 95 Performance/Accessibility/Best Practices/SEO on the page

## 4. Stack summary (see ADR-001 for reasoning)
Astro + TypeScript (strict) · vanilla CSS + tokens · small vanilla-TS/React islands only where needed ·
Cloudflare (DNS, CDN, Workers static assets/Pages, Turnstile, D1/KV for leads, R2 for media) ·
Domain registrar: Whogohost (DNS delegated to Cloudflare) · Email: Resend (transactional).

## 5. Folder map
```
.agent/            agent.md, skills.md, rules/, skills/
docs/              PRD, research, competitor analysis, sitemap, flows, SEO, launch, ADRs
apps/web/          the site (Astro)
  public/brand/    logos (reference/ = supplied raster variants; replace with SVG)
  src/styles/      tokens.css (+ base/layout/utilities when scaffolded)
```
