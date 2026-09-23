# Product Requirements Document — Talk Events Website

| | |
|---|---|
| **Client** | Talk Events (`@_talkevents` on Instagram) — event coordination & planning, Abuja, Nigeria |
| **Project** | Marketing website, architected to grow into a client-facing web app |
| **Builder** | Victor Ironali, NaliTech Consults Limited |
| **Version / date** | 0.1 draft — 19 September 2026 |
| **Status** | Scaffold phase. Requirements marked **[CONFIRM]** depend on `open-questions.md`. |

> **Evidence note.** Instagram blocks automated access, so nothing from the client's profile could be read directly. What is known about the client comes from the supplied logo files (tagline: *"Your plan, perfectly executed"*) and the brief. Market and competitor facts come from public web sources listed in `market-research.md` and `competitor-analysis.md`; several are secondary or vendor-published and are labelled as such. Client-specific facts are placeholders until the client confirms them.

---

## 1. Summary
Talk Events needs a credible, fast, search-visible home on the web. Today the business likely lives on Instagram and WhatsApp, where trust is hard to prove and discovery depends on the algorithm. The site converts search, Instagram and referral traffic into qualified enquiries, showcases real work, and gives the client an owned asset that can later become a planning/booking portal.

## 2. Goals & success metrics
| # | Goal | Metric (proposed targets — validate with client) |
|---|---|---|
| G1 | Generate qualified enquiries | ≥ 3% visitor→enquiry (form + WhatsApp click) after 90 days; enquiry completion ≥ 60% of starts |
| G2 | Rank for Abuja event searches | Top 10 for ≥ 8 of 20 priority keywords in 6 months; Google Business Profile in local pack for "event planner Abuja" |
| G3 | Build trust | Portfolio, process, testimonials and verifiable business details on every key page; bounce rate < 55% on service pages |
| G4 | Perform on mobile networks | LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 (mobile field data) |
| G5 | Be app-ready | Zero-rewrite path to `app.<domain>` (see §15) |

**Non-goals (v1):** online payments, user accounts/login, vendor marketplace, live chat bot, e-commerce, multilingual site, native mobile app.

## 3. Stakeholders
- **Owner/decision-maker:** Talk Events principal(s) {{PLACEHOLDER: names, roles}}
- **Team:** planning team {{PLACEHOLDER: size/roles}}
- **Builder:** NaliTech Consults (design + engineering)
- **Users:** see §5

## 4. Client profile
**Known:** Abuja-based; event coordinator/planner; brand mark = speech-bubble "e" (communication/dialogue); logo variants on blue, white, dark; tagline "Your plan, perfectly executed"; Instagram `@_talkevents`; domain purchased at Whogohost; hosting on Cloudflare.
**Not yet known [CONFIRM]:** legal name and RC number, founding year, services actually offered, event mix (weddings vs corporate vs social), typical guest counts and budgets, team, service area beyond Abuja, phone/WhatsApp/email, Instagram follower count and best-performing content, past clients, awards/associations (e.g. Event Planners Association), pricing approach, existing testimonials, photo library and usage rights.

**Positioning hypothesis (to test with client).** The tagline says the client brings a plan and Talk Events *executes it*. That points to **coordination and flawless delivery** rather than decor-led styling — a gap many Abuja competitors don't claim (most lead with "luxury", "styling", "decor"). Candidate promise: *"Your plan, perfectly executed — organised, on time, no surprises."* Proof mechanisms: transparent process, run-of-show samples, vendor coordination, day-of team, on-time record.

## 5. Audience & personas
| Persona | Needs | Behaviour | Site must |
|---|---|---|---|
| **P1 The Planning Couple** (25–38, Abuja/diaspora, engagement + white/traditional wedding) | Reduce stress, protect budget, trusted vendors | Finds planners via Instagram, referrals, Google; checks IG first, then a site for proof and pricing; WhatsApps quickly | Show weddings, process, packages/“what it costs”, testimonials, easy WhatsApp |
| **P2 The Corporate Organiser** (PA/comms/HR/admin at company, NGO or agency) | Reliable delivery to spec, invoicing, compliance | Googles "corporate event planner Abuja", compares 2–3 sites, needs a proposal/quote | Corporate services page, client proof (with permission), capabilities, request-proposal flow |
| **P3 The Celebrant / Family lead** (birthdays, milestone ages, anniversaries, naming, funerals/memorials) | Warm, respectful, well-run | Referral-driven, mobile, WhatsApp | Social-events page, sensitivity in tone, fast contact |
| **P4 The Diaspora Planner** (planning from UK/US/Canada for an Abuja event) | Remote coordination, trust, time-zone friendly | Google + Instagram, wants calls/WhatsApp video | Remote-planning section, scheduling link, clear process |
| **P5 Vendors / venues / partners** (secondary) | Partnership visibility | Search brand | Partner enquiry, brand facts |
| **P6 The Client Admin** (internal) | Update galleries/testimonials without a developer | Non-technical | Simple content workflow (Phase 2 CMS or guided git/Decap) |

## 6. Market context (summary — details & sources in `market-research.md`)
- Nigeria's wedding sector is reported at roughly ₦1.2 trillion a year (BusinessDay figure repeated by consumer sites); average couples reportedly spend about ₦13m across proposal, traditional and white wedding (Cowrywise figure, second-hand). Treat as directional.
- Abuja venues range from about ₦400k for modest halls to ₦5m+ for premium ballrooms (ElitePlanners.ng, May 2026); pricing is described as comparable to Lagos Island at the top end (TrustAm).
- Abuja audience skews formal and corporate/government-adjacent; weddings need long lead times (9–12 months) and corporate events 2–4 months (ProGigFinder).
- Trust is a live problem: consumer articles warn about vendors who are "just an Instagram handle" that can vanish after a deposit — an opening for a planner with verifiable credentials and a transparent process.
- Discovery is fragmented between Instagram, directories (Wezoree, JoyRibbons, Babymigo, TrustAm, ElitePlanners.ng, Connect Nigeria quote requests) and Google.

## 7. Competitive summary (details in `competitor-analysis.md`)
Direct Abuja competitors range from large Instagram-led brands (3030 Events ~55K followers, PK Events ~27K, Sculptors ~15K, Task Event Planners ~15K) to smaller planners with websites (Events by Beeba, Wellington Events). Lagos leaders (Cruise Events, Zapphaire) set the design/credibility bar. **Opportunity:** a fast, well-structured, search-optimised site with real proof, transparent process and pricing guidance; few Abuja planners appear to own strong local SEO or publish planning/cost content.

## 8. Positioning & messaging framework
- **Category:** Event coordination & planning, Abuja.
- **Promise:** Your plan, perfectly executed.
- **Pillars (to validate):** Organised planning · Flawless day-of execution · Trusted vendor network · Transparent budgeting · Calm, communicative team.
- **Tone:** confident, warm, precise.
- **Primary CTA:** "Plan my event" (→ `/book`). **Secondary:** "Chat on WhatsApp".

## 9. Scope (MoSCoW)
**Must (Launch v1.0)**
- Home, About, Services hub + 4–6 service pages **[CONFIRM services]**, Portfolio/Gallery, Testimonials, How we work (process), Pricing guidance/packages, FAQ, Journal (blog) with ≥ 6 seed articles, Contact, Book/enquiry, Legal pages, 404, Thank-you.
- WhatsApp integration; enquiry form with anti-spam; email notification; lead storage.
- SEO foundation: metadata, JSON-LD, sitemap, robots, redirects, Search Console/Bing, Google Business Profile guide.
- Analytics & conversion tracking (consent-aware).
- Design system + tokens (vanilla CSS), responsive, WCAG 2.2 AA.
- Cloudflare deployment, DNS from Whogohost, security headers, Turnstile.

**Should**
- Area pages (Maitama, Wuse 2, Jabi, Gwarinpa, Asokoro, Garki) with unique content.
- Case studies (3–5), event-type landing pages for ads.
- Downloadable capabilities deck / sample run-of-show (email-gated optional).
- Instagram feed strip (static curated grid preferred over live embed for speed/privacy).
- Newsletter sign-up (Brevo/Resend audiences — decide).
- Scheduling link for discovery calls.

**Could**
- Budget calculator/estimator (lead magnet, high SEO value).
- Vendor directory (curated, "our trusted vendors").
- Blog CMS (Decap/Sanity) for client self-editing.
- Video hero (mobile-safe fallback).

**Won't (v1)** — accounts, payments, marketplace, chat bot, native app.

## 10. Functional requirements
IDs are referenced in code/PR titles.

### Navigation & global
- **FR-G1** Header with logo, primary nav (Home, About, Services, Portfolio, Journal, Contact) and persistent CTA "Plan my event"; transparent over hero → solid on scroll; accessible mobile menu.
- **FR-G2** Footer: brand blurb, quick links, services, contact (NAP), socials, legal links, copyright.
- **FR-G3** Floating WhatsApp button (labelled, non-blocking, hidden on `/contact`, `/book`).
- **FR-G4** Skip link, breadcrumbs (inner pages), custom 404, cookie/consent banner (only if non-essential tracking is enabled).

### Home (`/`)
- **FR-H1** Hero: real event photo, eyebrow, H1 with promise, one-line support, primary + secondary CTA, scroll cue.
- **FR-H2** Services overview tiles → service pages.
- **FR-H3** "How we work" 4–5 step process.
- **FR-H4** Featured work (3–6 images/case studies).
- **FR-H5** Proof: testimonials, stats (only confirmed numbers), client/partner logos (with permission).
- **FR-H6** Closing CTA band + enquiry teaser.

### Services
- **FR-S1** Hub lists all services with summary + link.
- **FR-S2** Each service page: intro, who it's for, what's included, process, sample budget guidance {{PLACEHOLDER}}, gallery, FAQs (with schema), related services, CTA.
- **FR-S3** Candidate service set **[CONFIRM]**: Wedding planning & coordination · Corporate events & conferences · Birthdays & milestone celebrations · Day-of coordination · Event styling & decor (if offered) · Engagement/traditional weddings · Baby showers/naming · Memorials/thanksgiving services.

### Portfolio
- **FR-P1** Filterable gallery (event type) with lazy-loaded, paginated images and accessible lightbox.
- **FR-P2** Case study template: brief → approach → result → vendors → photos → testimonial.

### About / Team
- **FR-A1** Story, values, team bios (photos, consent), credentials/associations, registration info **[CONFIRM]**.

### Journal (SEO content)
- **FR-J1** Article index (categories, pagination), article template (author, date, updated, TOC, related, CTA), RSS.
- **FR-J2** Seed topics listed in `content-plan.md`.

### Enquiry & contact
- **FR-E1** `/book` multi-step enquiry (event type → date/guests/location → contact details/budget) with progress and no-JS fallback.
- **FR-E2** `/contact` with short form, phone, WhatsApp, email, map link, hours, socials.
- **FR-E3** Turnstile + honeypot + rate limit; server validation; D1 storage; email notification to team; auto-acknowledgement email to enquirer **[CONFIRM]**.
- **FR-E4** WhatsApp deep link prefilled with event type/date; UTM/source captured on the lead.
- **FR-E5** Thank-you page with next steps and expected response time.

### Legal & trust
- **FR-L1** Privacy Policy (NDPA-aligned), Terms, Cookie notice. **FR-L2** Registered business details in footer **[CONFIRM RC number]**.

### SEO & analytics
- **FR-SEO1..n** per `seo.md`/`seo-strategy.md`. **FR-AN1** Events: `whatsapp_click`, `phone_click`, `form_start`, `form_submit`, `generate_lead`, `cta_click`, `gallery_open`.

## 11. Non-functional requirements
- **Performance:** budgets in `.agent/rules/performance.md`.
- **Accessibility:** WCAG 2.2 AA.
- **Security & privacy:** `.agent/rules/security.md`; NDPA 2023.
- **Browser support:** last 2 versions of Chrome, Safari, Firefox, Edge, Samsung Internet; Android 8+; iOS 15+.
- **Availability:** static on Cloudflare CDN — target ≥ 99.9%.
- **Maintainability:** content in versioned collections; documented deploy; single source for NAP.
- **Localisation:** `en-NG`, ₦, +234, WAT (UTC+1).

## 12. Information architecture
See `sitemap.md`. Primary nav: **Home · About · Services · Portfolio · Journal · Contact** + CTA. Footer adds Process, FAQ, Areas, Legal.

## 13. User flows
See `user-flows.md` (search→enquiry, Instagram→proof→WhatsApp, corporate proposal request, diaspora planning, return visitor).

## 14. Design direction
Sample provided: **Cruise Events** (Lagos) — full-bleed dark-scrimmed imagery, white hero card, serif headings with a script-accent word, portrait service tiles, outline pill CTA, testimonial and logo bands, black footer. We adopt the **structure and typographic voices**, apply **Talk Events brand colours** (blue `#1A3870`, green `#7ED958`, ink `#1B1B1B`), and fix the sample's weak spots (tiny tap targets, disabled zoom, 50+ image gallery on load, hover-only affordances, low-contrast text on imagery). Details: `.agent/rules/design-system.md`, tokens in `apps/web/src/styles/tokens.css`.

## 15. Technical approach
Astro + TypeScript, vanilla CSS with tokens, Cloudflare (DNS/CDN/Workers/D1/KV/R2/Turnstile), Resend. Rationale and alternatives in `decisions/ADR-001-framework-and-hosting.md`; structure and growth path in `.agent/rules/architecture.md`.

**Domain/DNS:** keep registration at Whogohost; add site to Cloudflare; change nameservers at Whogohost to Cloudflare's; set SSL Full (strict), apex + `www` redirect; add Search Console TXT. Confirm the TLD (`.ng`/`.com.ng`/`.com`) and any existing email (MX) records before switching nameservers **so email isn't broken**.

**Web-app growth path (Phase 2+):** `app.<domain>` with client portal (proposal review/approval, timeline & checklist, guest list, vendor list, payments/invoices, document vault), admin for the team, WhatsApp notifications. Shared tokens/UI packages; leads table becomes clients/events. Decision gates: consistent lead volume, client demand for portal, budget.

## 16. SEO requirements (summary)
Local + service intent keywords; service, area and journal pages; LocalBusiness/Service/FAQ/Article schema; Google Business Profile; NAP consistency; internal linking; CWV in green; monthly reporting. Details: `seo-strategy.md`.

## 17. Analytics & KPIs
Cloudflare Web Analytics (cookieless) + GA4 (consent-gated) + Search Console. Funnel: session → CTA click → form start → submit / WhatsApp click. Monthly dashboard. See `analytics-and-tracking.md`.

## 18. Content plan (summary)
Client supplies photos, testimonials (with consent), services, team, packages. We write copy with placeholders and produce 6 seed articles pre-launch. Details: `content-plan.md`.

## 19. Legal, privacy & risk
- NDPA 2023 compliance; photo and testimonial consent; no unverifiable claims; client-logo permissions; music/video licensing if used.
- **Risks:** no photography library (mitigate: shoot list/day; curate IG originals in full resolution) · client slow on content (mitigate: placeholders + content deadlines) · Instagram-only mindset (mitigate: IG→site funnel and bio link) · DNS cut-over breaking email · thin/duplicated area pages hurting SEO · heavy imagery on slow networks · scope creep toward app.

## 20. Delivery plan
| Phase | Scope | Output |
|---|---|---|
| 0 Discovery | Client interview, content audit, asset collection, confirm open questions | Answers in `open-questions.md`, brand pack (SVG) |
| 1 Scaffold ✅ | Docs, agent rules, tokens (this repo) | You are here |
| 2 Foundation | Astro project, tokens/base CSS, layout, header/footer, CI, Cloudflare preview | Deployed skeleton |
| 3 Design & build | Home, Services, Portfolio, About, Contact/Book, Legal; components | Feature-complete on preview |
| 4 Content & SEO | Copy, images, schema, journal seed posts, redirects | Content-complete |
| 5 QA & launch | a11y/perf/security checks, DNS cut-over, GBP, Search Console, analytics | Live |
| 6 Grow | Publishing cadence, reviews, case studies, CMS, app discovery | Ongoing |

## 21. Acceptance criteria (launch gate)
All **Must** requirements shipped · Lighthouse mobile ≥ 95 on Home, a service page, Portfolio, Contact · axe: 0 critical/serious · no placeholders left · privacy/terms live · forms tested E2E (incl. spam + no-JS) · redirects/canonical verified · Search Console verified with sitemap submitted · GBP claimed · analytics events verified · security headers grade A on securityheaders.com · backup/rollback documented.

## 22. Open questions
See `open-questions.md`.

## Appendix A — Sources
See `market-research.md` and `competitor-analysis.md` (each fact links to its source).
