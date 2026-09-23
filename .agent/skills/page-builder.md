# Skill: page-builder

**Purpose:** Create a complete page that is on-brand, accessible, fast and SEO-ready.

## Steps
1. Locate the page in `docs/sitemap.md` and its requirement IDs in `docs/PRD.md`; confirm target keyword/intent in `docs/seo-strategy.md`.
2. Draft the section list (wireframe in ASCII in the PR). Prefer existing `sections/*`.
3. Create `src/pages/{route}.astro` using `BaseLayout` with `title`, `description`, `canonical`, `ogImage`, `jsonLd`.
4. Pull content from `src/content/*` or `src/data/site.ts`; unknown facts → `{{PLACEHOLDER}}` + entry in `docs/open-questions.md`.
5. Add breadcrumbs, internal links (≥3 in/out), one primary CTA per section, WhatsApp + enquiry CTA in the closing band.
6. Add JSON-LD per `rules/seo.md`.
7. Run `skills/seo-audit.md`, a11y checks, Lighthouse mobile. Fix before PR.
8. Update `docs/sitemap.md` status column.

## Output contract
Route file, any new components (via `component-builder`), content entries, updated docs, screenshots in PR.
