# SEO Rules

Goal: rank for high-intent Abuja event searches and win local pack / Maps. Full strategy: `docs/seo-strategy.md`.

## Every page must ship
- `<title>` 50–60 chars: `{Primary keyword} in Abuja | Talk Events` (home: brand-led).
- Meta description 140–160 chars, unique, with a benefit + CTA.
- One `<h1>` containing the primary keyword naturally; logical h2/h3.
- Canonical (absolute, apex or www — one host only), `hreflang` not needed (single locale `en-NG`), `<html lang="en-NG">`.
- Open Graph + Twitter Card (1200×630 image per page/template).
- JSON-LD (see below) validated in Rich Results Test.
- Internal links: each page ≥ 3 contextual links in, ≥ 3 out; descriptive anchor text.
- Included in `sitemap-index.xml` (`@astrojs/sitemap`), with `lastmod`.
- Breadcrumbs (visual + `BreadcrumbList`).
- Images: descriptive filenames, alt text, dimensions, AVIF/WebP.

## Structured data
| Page | Schema |
|---|---|
| Global | `Organization` + `WebSite` (with `potentialAction` only if site search exists) |
| Home / Contact / Location pages | `LocalBusiness` (use `EventPlanner`-appropriate type via `additionalType`; `ProfessionalService` as safe parent) with `name`, `url`, `logo`, `image`, `telephone`, `address` (Abuja, FCT, NG), `geo`, `openingHoursSpecification`, `areaServed` (Abuja + districts), `sameAs` (Instagram etc.), `priceRange` only if confirmed |
| Service pages | `Service` (provider → Organization, areaServed) |
| FAQ sections | `FAQPage` (only visible Q&A) |
| Blog | `Article`/`BlogPosting` (author, datePublished, dateModified, image) |
| Portfolio case study | `CreativeWork`/`Article` + `ImageObject` |
| Testimonials | Do **not** self-mark up `Review` for own business (Google guideline) — display only |

**NAP consistency:** Name, Address, Phone identical across site, Google Business Profile, Instagram bio, directories. Source of truth: `src/data/site.ts`.

## URL rules
Lowercase, hyphenated, short, no dates in evergreen URLs, no trailing slash, 301 for changes. Pattern: `/services/{service}`, `/event-planner-in-{area}`? → prefer `/areas/{area}` unless keyword tests show otherwise. Journal: `/journal/{slug}`.

## Technical
- `robots.txt` allows all, references sitemap; block `/api/`.
- 404 returns real 404; soft-404s prohibited. 301 `www`↔apex, `http`→`https`.
- Core Web Vitals in the green on mobile (see `performance.md`).
- No `noindex` in production except thank-you/utility pages.
- Preview/staging: `X-Robots-Tag: noindex` via `_headers`, and behind Cloudflare Access if possible.
- Avoid duplicate thin location pages: each area page needs unique, useful content (venues, logistics, sample budgets, real events done there).

## Off-page (owner tasks, tracked in launch checklist)
Google Business Profile (category *Event planner*), Bing Places, Apple Business Connect; directories (Wezoree, JoyRibbons, ElitePlanners.ng, Babymigo, Connect Nigeria — confirm fit); Instagram bio → site; consistent reviews process.

## Measurement
Search Console (domain property via Cloudflare DNS TXT), Bing Webmaster, rank tracking for the keyword list in `docs/seo-strategy.md`, monthly report.
