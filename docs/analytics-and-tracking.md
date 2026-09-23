# Analytics & Tracking

## Stack
- **Cloudflare Web Analytics** — cookieless, privacy-friendly baseline (no consent required for basic use; confirm with counsel).
- **Google Search Console** (domain property via DNS TXT) + **Bing Webmaster Tools**.
- **GA4** — only after consent; Consent Mode v2 defaults denied. Alternative: Plausible/Umami if the client prefers privacy-first.
- **Meta Pixel / TikTok** — only if the client runs ads; consent-gated; server-side events later.

## Events (names are stable API — don't rename)
| Event | When | Params |
|---|---|---|
| `cta_click` | Any primary CTA | `location`, `label` |
| `whatsapp_click` | wa.me link/FAB | `page`, `event_type?` |
| `phone_click` / `email_click` | tel:/mailto: | `page` |
| `form_start` | first field interaction | `form_id` |
| `form_step` | step change on `/book` | `step` |
| `generate_lead` | successful submission | `event_type`, `budget_range`, `source` |
| `gallery_open` | lightbox open | `event_type` |
| `download` | capabilities deck | `file` |
Store `utm_*`, referrer and landing page on the lead record (first-party) regardless of analytics consent, since it is needed to respond and measure the business (disclose in Privacy Policy).

## Dashboard (monthly)
Sessions by channel (Organic, Instagram, Direct, Referral, Directories) · enquiries by source · conversion rate · WhatsApp vs form split · top pages · GBP calls/direction requests · rankings · CWV (field) · response time to leads (internal).

## Governance
Documented in a tracking plan; test events with GA DebugView; review quarterly; remove unused tags.
