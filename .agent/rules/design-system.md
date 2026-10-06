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
| Accent | Thin signature script | `--font-script` | Mrs Saint Delafield |

> ⚠️ Fonts were matched visually from a screenshot; confirm or swap in one place (`tokens.css`).

Install: `pnpm add @fontsource/cormorant-garamond @fontsource/inter @fontsource/mrs-saint-delafield`, import only weights used (300 Cormorant, 300/400/500/700 Inter, 400 script), `font-display: swap`, preload the two above-the-fold files.

Scale: `--text-2xs … --text-4xl` (fluid). Body `--text-base`, line-height `--leading-normal` (sans) / `--leading-relaxed` (serif long-form). Measure ≤ `--measure-prose`.

**Section headings are one voice site-wide.** `ui/SectionHeading.astro` is the only sanctioned opener: light display serif (`--font-weight-light`), `--text-2xl`, uppercase, `--tracking-wide`, `--leading-snug`. There is no sentence-case serif variant and no per-word script accent in section titles — a section opens the same way everywhere. Sentence case is reserved for prose and nav.

**Patterns from the sample**
- **Eyebrow**: `--text-2xs`, `--tracking-eyebrow`, uppercase, `--font-body`. Use only where it adds context (section category, "What we do"), not on every heading.
- **Script accent**: one word per key section title, `--font-script`, `--text-script`, overlapping the baseline. Decorative → wrap in `<span aria-hidden>` only if duplicated in text; otherwise keep in the heading and ensure the accessible name reads correctly. Max **one per page section, max 3 per page**. Never for body or buttons.
- Headings in serif sentence case; body left-aligned; hero card text left-aligned; CTA bands centred.

## 3. Layout & shape (from the sample)
- **Container** `--container-max` centred, `--gutter` inline padding. Home-page sections, the CTA band, PageHero and the footer use `width="header"` (`--container-header`) so their edges line up with the navbar and hero. Section rhythm `--section-padding-block`.
- **Header**: sticky frosted-glass bar (`--color-surface-glass` + `--blur-glass`, applied on a pseudo-element), logo left (`/te-logo-bw-nav.png`: full mark + wordmark, no tagline), text links centred (no underline; active link = accent colour), CTA right.
- **PageHero** (`sections/PageHero.astro`, props: eyebrow, title): the opener for every inner page. 50vh, `--color-surface-brand`, eyebrow + light serif H1 only, faint contour lines fading left to right, `Botanical` sprig at the far right.
- **Full-screen sections**: services, featured events, testimonials and the CTA band fill one screen below the navbar (`100dvh - --header-height`, the same sum as the hero).
- **Hero**: full-bleed image with `--overlay-hero`; **white content card** bottom-left (square corners, `--shadow-hero-card`): eyebrow → serif H1 → one-line body; scroll-down circle button bottom-centre.
- **Service tiles**: full-screen section, tiles stretch to fill the row (floor `--tile-min-height`). Image + full-cover `--overlay-tile`; copy centred in the lower half: `LineIcon` → uppercase tracked sans title → one-line summary → "Learn more →". 3-up from tablet, 1-up mobile (horizontal scroll not used). Grid gap `--grid-gap`. Square corners (`--radius-none`).
- **CTA band** (`sections/CtaBand.astro`, reusable — props: heading, body, cta, image): full-screen, full-bleed photo under the dark `--overlay-cta` scrim (flat `--overlay-cta-mobile` below md), `surface-dark` so the copy is light. Left-aligned light serif heading, one-line body, `accent-subtle` button. Photo must not show an identifiable face.
- **Testimonials**: white (`--color-surface-page`), centred "Kind Words" heading + ornament, `Botanical` sprigs in the two bottom corners. Serif quote, avatar (consented portrait or initials) above the name. Looping auto-advance carousel that pauses on hover/focus/hidden tab, has dots (no pause button, by client request), and never auto-advances under reduced motion; without JS it is a static list.
- **Gallery** (`sections/Gallery.astro`): `surface-tint`, full-screen. Centred "Our Gallery" heading + ornament, scroll-snap photo track (4-up desktop, 2-up tablet, 1.25-up mobile), then a "See more" text link to `/portfolio` on the left and prev/next arrows on the right. `layout="grid"` (portfolio page) shows every photo wrapped at `--aspect-gallery` with no heading or paging. Each photo is a button that opens it in a native `<dialog>` lightbox (`--overlay-lightbox`; close, prev/next, arrow keys, Esc).
- **Featured events** (currently hidden on the home page): `surface-tint`, full-screen. Intro column (eyebrow + rule, heading, body, button) beside a scroll-snap photo track (3-up desktop, 2-up tablet, 1.25-up mobile) with prev/next arrows.
- **Partner logo strip** (`sections/LogoStrip.astro`): light tint background, centred heading, logos flattened to one ink (`filter: brightness(0)`) at `--logo-partner-height`, static wrapped row. Solid full-colour artwork on a white ground (`solid: true`) is greyed and multiplied instead, since flattening it would leave a blob. **Only show logos with written permission.**
- **Footer** (`layout/Footer.astro`): `--color-surface-inverse`, 100vh, columns centred vertically (green-and-white logo at `--logo-footer-width`, brand blurb + socials, explore, services, get in touch with icons), copyright bar at the foot, `Botanical variant="meadow"` line art rising from the bottom edge behind the content.
- **Floating WhatsApp** button bottom-right (`--z-floating`), 56px, labelled, respects safe-area insets, hidden on the contact page.
- **Back to top** (`layout/BackToTop.astro`, in the base layout): round button stacked directly above the WhatsApp button, shown once the visitor is about a screen down the page.
- **Enquiry form** (`sections/EnquiryForm.astro`): `variant="short"` on `/contact`, `variant="steps"` (event → details → about you, with a progress row) on `/book`. Posts to `/api/v1/enquiry`; works without JS as a plain POST; with JS it validates per step, shows an error summary, and if the enquiry cannot be delivered keeps everything typed and offers the same message as a pre-filled email.
- **Inner pages**: `PageHero` → page sections on `width="header"` containers → (usually) `CtaBand` → footer. Legal pages put their copy in `ui/Prose.astro`.

## 4. Components (catalogue — build via `skills/component-builder.md`)
Button (primary fill blue · accent fill green · outline-on-dark pill · text link), Link, Eyebrow, SectionHeading (eyebrow + uppercase tracked display serif — the only section opener), Container, Section, Card/ServiceTile, Hero, CtaBand, Testimonial, LogoStrip, ProcessSteps (numbered — only because it *is* a sequence), PlanningBenefits (centred editorial header + four borderless icon columns, `data-reveal` staggered fade-up), LineIcon, Stat, FaqAccordion (`<details>`), Gallery + Lightbox, Field/Select/Textarea/Checkbox, FormStatus, Breadcrumbs, Header/MobileNav, Footer, WhatsAppFab, Badge, Pagination, ArticleCard, Prose.

**States every interactive component defines:** default, hover, `:focus-visible`, active, disabled, loading, error (forms). Hover must not be the only affordance (touch).

## 5. Imagery
- Real event photography from the client only; no stock people. Until it arrives, placeholders are decor-only stock (rooms, tables, florals) — no identifiable faces anywhere below the hero. Colour-grade consistently; apply overlays via CSS not baked into the file.
- Alt text describes the scene and event type ("Head table set for a 200-guest wedding reception, Abuja"). Decorative → `alt=""`.
- Aspect ratios from tokens; `loading="lazy"` except the LCP image (`fetchpriority="high"`).
- Photo consent: obtain client/guest consent for identifiable portraits (NDPA).

## 6. Iconography
Inline SVG, 1.5px stroke, `currentColor`, 24px grid. Required set: menu, close, arrow-down, arrow-right, phone, mail, map-pin, whatsapp, instagram, x, facebook, tiktok, check, star, calendar, users, quote.

House glyphs are wrapped in `ui/LineIcon.astro` (`bloom`, `botanical`, `rings`, `toast`, `calendar`, `snowflake`, `glass`, `usher`) for decorative line-art moments that need to render far larger than 24px. It sets `vector-effect: non-scaling-stroke` so the 1.5px stays true at any display size. `ui/Botanical.astro` draws the leafy line art (`sprig` for corners, `meadow` for a full-width row). Icons are always `aria-hidden` — the adjacent heading or label carries the meaning.

## 7. Voice & microcopy
Warm, confident, precise. Plain verbs, sentence case, active voice. CTA labels state the outcome: "Plan my event", "Request a proposal", "Chat on WhatsApp". Errors say what happened and how to fix it. Avoid hype ("world-class", "luxury" unless the client positions that way) and unverifiable claims.

## 8. Governance
Change tokens only through `skills/generate-css-variable.md`. Any new component gets a catalogue entry here. Visual regressions reviewed at 375 and 1440.
