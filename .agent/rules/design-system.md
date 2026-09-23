# Design System (vanilla CSS)

Source of truth: `apps/web/src/styles/tokens.css`. This doc explains *how to use it*.

## 1. Brand
Logo variants supplied (in `public/brand/reference/`): **on blue** (white wordmark + green mark), **on white** (ink), **on dark** (white). Tagline lockup: *YOUR PLAN, PERFECTLY EXECUTED* (tracked caps, geometric sans — Montserrat-like).
| Token | Value | Use |
|---|---|---|
| `--color-brand-primary` | `#1A3870` | headers on light, buttons, links, brand bands |
| `--color-brand-accent` | `#7ED958` | fills, highlights, focus on dark, mark. **Never text on white (1.76:1)** |
| `--color-brand-accent-text` | `#2A7A17` (auto-swaps to green-500 on dark) | accent-coloured text on light |
| `--palette-ink-900` | `#1B1B1B` | body/headings, dark surface |
| `--color-surface-inverse` | `#000` | footer (matches sample) |

Contrast reference: blue on white 11.4:1 · ink on white 17.2:1 · green on blue 6.5:1 · green on ink 9.8:1 · ink on green 9.8:1.
**Logo rules:** clear-space = height of the "e" mark on all sides; min width 120px (tagline drops below 160px — use mark + wordmark only); never recolour, stretch or place on busy imagery without a scrim. On the header over a hero image use the **on-dark (white)** variant; after scroll (white header) use the **on-white** variant; brand-blue bands use the **on-blue** variant. **Ask for SVG masters** — the supplied files are JPEG with backgrounds.

## 2. Typography (from the design sample)
The sample pairs three voices. We keep the structure and self-host metric-compatible fonts:
| Role | Sample look | Token | Font (self-hosted) |
|---|---|---|---|
| Display / headings | Classic serif, sentence-case | `--font-display` | Tinos (Times-compatible) |
| Body / UI | Neo-grotesque sans | `--font-body` | Arimo (Helvetica/Arial-compatible) |
| Accent | Thin signature script, one word in a section title ("Our *Services*") | `--font-script` | Mrs Saint Delafield |

> ⚠️ Fonts were matched visually from a screenshot; confirm or swap in one place (`tokens.css`). The serif may be a system fallback on the sample site — a more refined serif (e.g. Cormorant Garamond, Playfair Display) is a one-line upgrade if the client wants it.

Install: `pnpm add @fontsource/tinos @fontsource/arimo @fontsource/mrs-saint-delafield`, import only weights used (400/700 Tinos & Arimo, 400 script), `font-display: swap`, preload the two above-the-fold files.

Scale: `--text-2xs … --text-4xl` (fluid). Body `--text-base`, line-height `--leading-normal` (sans) / `--leading-relaxed` (serif long-form). Measure ≤ `--measure-prose`.

**Patterns from the sample**
- **Eyebrow**: `--text-2xs`, `--tracking-eyebrow`, uppercase, `--font-body`. Use only where it adds context (section category, "What we do"), not on every heading.
- **Script accent**: one word per key section title, `--font-script`, `--text-script`, overlapping the baseline. Decorative → wrap in `<span aria-hidden>` only if duplicated in text; otherwise keep in the heading and ensure the accessible name reads correctly. Max **one per page section, max 3 per page**. Never for body or buttons.
- Headings in serif sentence case; body left-aligned; hero card text left-aligned; CTA bands centred.

## 3. Layout & shape (from the sample)
- **Container** `--container-max` centred, `--gutter` inline padding. Section rhythm `--section-padding-block`.
- **Header**: transparent over hero, logo left, 6–7 text links right (no underline; active link = accent colour), becomes solid on scroll (`--header-height-scrolled`).
- **Hero**: full-bleed image with `--overlay-hero`; **white content card** bottom-left (square corners, `--shadow-hero-card`): eyebrow → serif H1 → one-line body; scroll-down circle button bottom-centre.
- **Service tiles**: portrait `--aspect-tile`, image + `--overlay-tile`, serif title bottom-right/left aligned consistently, underlined "Read more". 3-up desktop, 2-up tablet, 1-up mobile (horizontal scroll not used). Grid gap `--grid-gap`. Square corners (`--radius-none`).
- **CTA band**: full-bleed image + `--overlay-band`, eyebrow, serif heading, **outline pill** button.
- **Testimonial band**: image + `--overlay-testimonial`, five stars, serif *italic* quote, name below. Rotating carousel must be pausable and keyboard operable; provide a static fallback list.
- **Client logo strip**: light tint background, greyscale logos, auto-scroll only if reduced-motion allows; otherwise static row. **Only show logos with written permission.**
- **Footer**: `--color-surface-inverse`, 3–4 columns (brand blurb, quick links, services, contact + socials), copyright bar.
- **Floating WhatsApp** button bottom-right (`--z-floating`), 56px, labelled, respects safe-area insets, hidden on the contact page.

## 4. Components (catalogue — build via `skills/component-builder.md`)
Button (primary fill blue · accent fill green · outline-on-dark pill · text link), Link, Eyebrow, SectionHeading (eyebrow + serif + optional script word), Container, Section, Card/ServiceTile, Hero, CtaBand, Testimonial, LogoStrip, ProcessSteps (numbered — only because it *is* a sequence), Stat, FaqAccordion (`<details>`), Gallery + Lightbox, Field/Select/Textarea/Checkbox, FormStatus, Breadcrumbs, Header/MobileNav, Footer, WhatsAppFab, Badge, Pagination, ArticleCard, Prose.

**States every interactive component defines:** default, hover, `:focus-visible`, active, disabled, loading, error (forms). Hover must not be the only affordance (touch).

## 5. Imagery
- Real event photography from the client only; no stock people. Colour-grade consistently; apply overlays via CSS not baked into the file.
- Alt text describes the scene and event type ("Head table set for a 200-guest wedding reception, Abuja"). Decorative → `alt=""`.
- Aspect ratios from tokens; `loading="lazy"` except the LCP image (`fetchpriority="high"`).
- Photo consent: obtain client/guest consent for identifiable portraits (NDPA).

## 6. Iconography
Inline SVG, 1.5px stroke, `currentColor`, 24px grid. Required set: menu, close, arrow-down, arrow-right, phone, mail, map-pin, whatsapp, instagram, x, facebook, tiktok, check, star, calendar, users, quote.

## 7. Voice & microcopy
Warm, confident, precise. Plain verbs, sentence case, active voice. CTA labels state the outcome: "Plan my event", "Request a proposal", "Chat on WhatsApp". Errors say what happened and how to fix it. Avoid hype ("world-class", "luxury" unless the client positions that way) and unverifiable claims.

## 8. Governance
Change tokens only through `skills/generate-css-variable.md`. Any new component gets a catalogue entry here. Visual regressions reviewed at 375 and 1440.
