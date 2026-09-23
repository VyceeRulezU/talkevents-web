# Competitor Analysis

*Snapshot 19 September 2026. Instagram figures are from search-engine snippets of public profiles and change often. Websites were reviewed via public pages; a full manual audit (speed, SEO, UX) should be done in Phase 2.*

## 1. Landscape map
| Tier | Who | Notes |
|---|---|---|
| **A. Abuja Instagram-led brands** | 3030 Events (@3030events.ng) · PK Events International (@pkevents_) · Sculptors Event Planners (@sculptorsevents) · Task Event Planners (@task_event_planners) · iHeart Events (@ihearteventss) | Large audiences, award/association signalling, training academies; web presence varies |
| **B. Abuja planners with websites** | Events by Beeba (eventsbybeeba.com.ng) · Wellington Events (wellingtonevents.com.ng) | Clear services & positioning; likely modest SEO |
| **C. National/Lagos benchmarks** | Cruise Events (thecruiseevents.com — design sample) · Zapphaire Events (Funke Bucknor-Obruthe) | Set credibility and design expectations; Lagos-centric |
| **D. Marketplaces & directories** | Wezoree · JoyRibbons · ElitePlanners.ng · Babymigo · TrustAm · ProGigFinder · Connect Nigeria (quote requests) | Compete for "event planner Abuja" SERPs; also citation/lead-gen partners |
| **E. Media/aggregators** | The Abuja Kulture (@abujakulture, ~36K) | Ad/PR channel, not a direct competitor |

## 2. Profiles
| Competitor | Signals (public) | Positioning | Strengths | Gaps / opportunity |
|---|---|---|---|---|
| **3030 Events** | ~55K IG followers, "award winning", Abuja/Warri/Lagos/London | Premium, multi-city | Scale, awards, reach | Email-only contact in bio; no clear site evidence; likely weak local SEO |
| **PK Events International** | ~27K IG, "Event Planner of the Year 2024", Abuja/Lagos/destination, academy | Luxury, destination | Authority, training funnel | Brand split (planner + academy); trust via awards not process |
| **Sculptors Event Planners** | ~15K IG, ~2.9K posts, EPA Abuja member, bridal consultancy, training | Planning + coordination + training | Association credibility, volume | Training focus can dilute client-facing positioning |
| **Task Event Planners** | ~15K IG, few posts | Burden-lifting messaging | Clear promise | Thin content depth |
| **iHeart Events** | ~4.9K IG, ~900 posts; planning & styling; social/corporate/kids; sister wedding brand | Decor + planning | Consistency | Small following, split brands |
| **Events by Beeba** | Website: planning, decor, venue selection, vendor management, budgeting; "no hidden costs / no last-minute surprises" | Stress-free, structured | Clear service list & tone | Generic imagery/proof unknown; check SEO/speed |
| **Wellington Events** | Website: full-service, weddings/corporate/consulting; "bespoke experiences" | Bespoke, precision | Broad services | Copy is generic; check proof/portfolio depth |
| **Cruise Events (Lagos)** | 15+ years, 250+ events (site claims), Fortune-500/government clients, 8 service lines, testimonials, blog | Full-service corporate + social | Proof (logos, testimonials), structure | Lagos; sample site has UX/a11y issues (see §4) |
| **Zapphaire Events (Lagos)** | Pioneer, founder-led, CNN/press features | Iconic personal brand | Reputation | Lagos-based |

## 3. Feature & content benchmark (marketing sites)
| Capability | Cruise | Beeba | Wellington | **Talk Events v1 target** |
|---|---|---|---|---|
| Clear service pages | ✔ (single page) | ✔ | ✔ | ✔ dedicated pages per service |
| Portfolio/gallery | ✔ (heavy) | ? | ? | ✔ filterable, paginated |
| Testimonials | ✔ | ? | ? | ✔ with consent + names |
| Client logos | ✔ | ✘ | ✘ | ✔ only if permitted |
| Process explained | ✘ | ✔ | ✔ | ✔ detailed, visual |
| Pricing guidance | ✘ | ✘ | ✘ | ✔ budget guidance/estimator |
| Blog / SEO content | ✔ (blog) | ? | ? | ✔ 6 seed + cadence |
| Area/location pages | ✘ | ? | ? | ✔ Abuja districts |
| WhatsApp CTA | ✔ (widget) | ? | ? | ✔ prefilled, tracked |
| Structured data / GBP | ? | ? | ? | ✔ |
| Mobile speed & a11y | ✘ (zoom disabled, large gallery) | ? | ? | ✔ budgets + WCAG |

(`?` = not verified; complete during Phase 2 audit.)

## 4. Design-sample critique (Cruise Events) — what we keep and fix
**Keep:** full-bleed hero + white card; portrait service tiles with overlay; script-accent heading; outline pill CTA; testimonial band; logo strip; black footer with clear columns; simple 6-link nav.
**Fix:**
- Body/UI text is small on hero and footer; tap targets under 44px; nav links tight.
- `maximum-scale=1` disables pinch-zoom (accessibility failure).
- Tiles show "Read More" as small underlined text over imagery — contrast depends on photo; use scrims + larger targets.
- All service tiles link to the same generic page → poor SEO; use one page per service.
- Home gallery loads dozens of full images → slow on 4G.
- Long single testimonial is repeated; use short, named, event-typed quotes.
- Client logos: permission and greyscale consistency; alt text.
- No pricing/process/FAQ content → higher enquiry friction.
- Sample's decorative gold is replaced by brand green/blue; green is never used as text on white.

## 5. Differentiation strategy
1. **Reliability as the brand** ("perfectly executed"): run-of-show, checklists, day-of team, communication cadence shown openly.
2. **Verifiable business:** registration, address, team, contract/deposit process, references.
3. **Budget honesty:** ranges, what drives cost, sample budgets by event type.
4. **Abuja-native knowledge:** venue guides, logistics (traffic, power, permits, security), district pages.
5. **Corporate lane:** proposal-request flow, capabilities deck, compliance-ready invoicing.
6. **Fastest response:** WhatsApp + published response-time promise (only if operationally true).

## 6. SEO competitor gap approach (Phase 2 task)
Pull SERPs for the 20 priority keywords (`seo-strategy.md`); log who ranks (directories dominate?); capture their titles/H1s/word counts; identify weak spots (no area pages, thin content, slow pages); build a content gap list. Tools: Search Console (own), Ahrefs/Semrush/Ubersuggest free tiers, manual SERP checks from Abuja.

## 7. Sources
Instagram public profile snippets for @3030events.ng, @pkevents_, @sculptorsevents, @task_event_planners, @ihearteventss, @abujakulture, @pkeventsacademy; https://eventsbybeeba.com.ng/ ; https://wellingtonevents.com.ng/ ; https://thecruiseevents.com/ ; Wikipedia (Funke Bucknor-Obruthe); directory sites listed in `market-research.md`.
