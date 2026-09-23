# User Flows

## Flow 1 — Search → service page → enquiry (primary)
```mermaid
flowchart TD
  A[Google: "wedding planner in Abuja"] --> B[Service page: Wedding planning]
  B --> C{Convinced?}
  C -- needs proof --> D[Portfolio / case study] --> B
  C -- needs cost idea --> E[Pricing guidance] --> B
  C -- yes --> F{Prefers}
  F -- WhatsApp --> G[wa.me prefilled: event type + date] --> H[Conversation]
  F -- Form --> I[/book step 1-3/] --> J[Thank-you + expected response time]
  I -- error/spam block --> K[Inline error + WhatsApp fallback]
```
**Success:** enquiry submitted or WhatsApp opened. **Drop-off risks:** slow load, no price cue, long form → mitigations in PRD FR-E1/E4.

## Flow 2 — Instagram → site proof → WhatsApp
Instagram bio link → Home (or `/portfolio`) → skim hero/proof → tap WhatsApp FAB → prefilled message. *Design implication:* the link target must load in < 2 s in the in-app browser; WhatsApp CTA above the fold; no cookie wall.

## Flow 3 — Corporate organiser requests a proposal
```mermaid
flowchart LR
  A[Google: "corporate event planner Abuja"] --> B[/services/corporate-events/]
  B --> C[Capabilities + case studies + client proof]
  C --> D[Request a proposal /book?type=corporate]
  D --> E[Brief: event type, attendees, date, venue, budget range, decision date]
  E --> F[Thank-you + optional download: capabilities deck]
```
Extra fields for corporate: organisation, role, procurement needs (invoice/VAT), decision timeline.

## Flow 4 — Diaspora planner
Landing from Google/Instagram → "How we work" (remote planning section) → schedule call (link) or WhatsApp video → enquiry with time-zone field.

## Flow 5 — Returning visitor / referral
Referral shares site link → About/Testimonials → Contact (phone/WhatsApp). Ensure phone number is tap-to-call and copyable.

## Flow 6 — Journal reader → lead
Article (e.g. "How much does an event planner cost in Abuja?") → in-article CTA → pricing page → `/book`. Capture source/UTM.

## Flow 7 — Error & edge cases
- Form submit fails → keep entered data, show error summary, offer WhatsApp link.
- 404 → search-like suggestions (Services, Portfolio, Contact) + WhatsApp.
- JS disabled → forms post natively; nav works with `<details>`-based fallback.
- Slow connection → hero uses low-res placeholder; gallery paginates.

## Task success criteria (usability test script, 5 participants)
1. Find what services are offered (< 20 s). 2. Find evidence of past work (< 20 s). 3. Estimate rough cost for a 150-guest wedding (< 60 s). 4. Send an enquiry from a phone (< 90 s). 5. Contact via WhatsApp (< 15 s).
