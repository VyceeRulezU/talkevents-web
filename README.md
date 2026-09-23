# Talk Events — Website

Marketing website for **Talk Events**, Abuja-based event coordinators/planners (`@_talkevents`). Built to grow into a web app.

**Status:** foundation built. Astro project scaffolded, global layout (Header, Footer, WhatsApp FAB) and the Home page are live on localhost. Content is placeholder pending client answers in `docs/open-questions.md`.

## Start here
1. `docs/PRD.md` — product requirements
2. `.agent/agent.md` — rules for AI agents and contributors
3. `docs/open-questions.md` — what we still need from the client

## Structure
```
.agent/      agent manual, rules (architecture, code-style, design-system, security, seo, accessibility, performance, content, git), skills
docs/        PRD, market research, competitor analysis, sitemap, user flows, SEO strategy, content plan, analytics, launch checklist, ADRs
apps/web/    the site (Astro) — tokens in src/styles/tokens.css, logos in public/brand/reference
```

## Run locally
```
cd apps/web
pnpm install
pnpm dev
```
Then open the local URL Astro prints (usually `http://localhost:4321`).

## Next steps
Remaining service, portfolio, about, contact/book and legal pages; enquiry API (`/api/v1/enquiry`) with D1 + Turnstile + Resend; Cloudflare deploy config and CI; real content and photography once the client confirms `docs/open-questions.md`.
