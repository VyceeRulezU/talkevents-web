# Content Plan

## 1. Assets to collect from the client (Phase 0 checklist)
- [ ] Logo masters: **SVG/AI/PDF** (mark, wordmark, tagline lockup), colour + mono versions, brand guidelines if any
- [ ] 60–100 best event photos (originals, not Instagram-compressed), grouped by event; photographer credits; usage rights
- [ ] 3–5 events for case studies (brief, numbers, vendors, quotes, extra photos)
- [ ] Testimonials with full name, event type, written permission
- [ ] Team headshots + short bios
- [ ] Service list, inclusions, process, timelines, packages/ranges {{PLACEHOLDER}}
- [ ] Legal: company name, RC number, address, phone/WhatsApp, email, hours
- [ ] Partner/vendor and client logos **with permission**
- [ ] Social handles; existing hashtags; awards/associations
- [ ] Response-time promise and booking process (deposit, contract) if they want it stated

## 2. Page copy deck (owner: builder + client review)
| Page | Draft by | Reviewed by | Status |
|---|---|---|---|
| Home | Builder | Client | ☐ |
| About | Client input → Builder | Client | ☐ |
| Services (hub + each) | Builder | Client | ☐ |
| How we work | Builder | Client | ☐ |
| Pricing guidance | Client numbers → Builder | Client | ☐ |
| FAQ (15–20 Qs) | Builder | Client | ☐ |
| Contact/Book microcopy | Builder | — | ☐ |
| Legal | Template → counsel review | Client/Counsel | ☐ |

## 3. Editorial calendar (first 90 days after launch)
| Week | Article | Cluster |
|---|---|---|
| 0 (launch) | 6 seed articles (see `seo-strategy.md` §4) | Mixed |
| 2 | Case study #1 | Proof |
| 4 | Venue guide: Maitama & Wuse 2 | Venue |
| 6 | Wedding timeline: 12-month checklist | Wedding |
| 8 | Corporate: conference run-of-show template (downloadable) | Corporate |
| 10 | Case study #2 | Proof |
| 12 | Birthday/milestone planning guide | Social |

## 4. Content model (Astro content collections)
- `services`: title, slug, summary, hero, inclusions[], process[], faqs[], relatedServices[], seo
- `portfolio`: title, eventType, date?, venue?, area, cover, gallery[] (src, alt, consent), story?, vendors[]?
- `journal`: title, description, pubDate, updatedDate, author, category, cover, draft
- `testimonials`: quote, name, eventType, consent, date?
- `faqs`: question, answer, scope[]
- `team`: name, role, bio, photo, consent

## 5. Placeholder convention
`{{PLACEHOLDER: what is needed}}` — the build fails in CI on production if any remain (`scripts/check-placeholders.mjs`).

## 6. Social proof rules
No unverifiable numbers, no fake counts, no borrowed testimonials/logos, always record consent, date each testimonial.
