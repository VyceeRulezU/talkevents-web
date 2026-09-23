# Site Map & Information Architecture

Status: ☐ not started · ◐ in progress · ✔ done. Priority: P0 launch · P1 soon after · P2 later.

## 1. Hierarchy
```
/                                   Home                                      P0
├── /about                          About Talk Events (story, values, team)    P0
│   └── /about/team                 (optional split when bios grow)            P2
├── /services                       Services hub                              P0
│   ├── /services/wedding-planning        Wedding planning & coordination      P0 [CONFIRM]
│   ├── /services/corporate-events        Corporate events & conferences       P0 [CONFIRM]
│   ├── /services/birthdays-and-celebrations  Birthdays & milestones           P0 [CONFIRM]
│   ├── /services/day-of-coordination     Day-of / month-of coordination       P0 [CONFIRM]
│   ├── /services/event-styling-and-decor Styling & decor (if offered)         P1 [CONFIRM]
│   └── /services/traditional-and-engagement  Traditional weddings/engagements P1 [CONFIRM]
├── /how-we-work                    Process (4–5 steps + timeline)             P0
├── /portfolio                      Gallery (filter by event type)             P0
│   └── /portfolio/{case-study}     Case studies                               P1
├── /pricing                        Packages / budget guidance                 P0
├── /testimonials                   Reviews & references                       P1
├── /faq                            FAQs (schema)                              P0
├── /journal                        Blog index                                 P0
│   ├── /journal/category/{slug}    Category archives                          P1
│   └── /journal/{slug}             Articles                                   P0 (6 seed)
├── /areas                          Where we work (Abuja districts)            P1
│   └── /areas/{maitama|wuse-2|jabi|gwarinpa|asokoro|garki}                    P1
├── /book                           Multi-step enquiry                         P0
├── /contact                        Contact + map + WhatsApp                   P0
├── /thank-you                      Post-submission (noindex)                  P0
├── /privacy  /terms  /cookies      Legal                                      P0
├── /404                            Not found                                  P0
├── /sitemap.xml  /robots.txt  /rss.xml                                        P0
└── /_kitchen-sink                  Dev-only component gallery (noindex)       dev
```

## 2. Navigation
- **Primary (header):** Home · About · Services (dropdown: all services) · Portfolio · Journal · Contact · **[Plan my event]**
- **Footer:** Quick links (Home, About, Services, Portfolio, Journal, Contact, How we work, FAQ, Book) · Services (each) · Areas · Contact (address, phone, WhatsApp, email, socials) · Legal.
- **Utility:** WhatsApp FAB · breadcrumbs on inner pages.
- Mobile: full-screen menu, CTA pinned at bottom of menu, focus trapped, Esc closes.

## 3. Page templates & sections
| Template | Sections (in order) |
|---|---|
| **Home** | Hero → Services tiles → Why Talk Events (3 pillars) → How we work → Featured work → Testimonial band → Logos/partners → Journal teaser → CTA band |
| **Service** | Hero (H1 + summary + CTA) → Who it's for → What's included → Process → Sample budget guidance → Gallery → FAQs → Related services → CTA |
| **Portfolio** | Filter bar → Grid (paginated) → Lightbox → CTA |
| **Case study** | Hero → Brief → Approach → Highlights/gallery → Vendors/partners → Result/testimonial → Related → CTA |
| **Area** | Intro → Popular venues (with tips) → Logistics → Sample budgets → Events we've done here → FAQs → CTA |
| **Article** | Title/meta → TOC → Body → Author → Related → CTA |
| **Book** | Step 1 event type → Step 2 date/guests/location → Step 3 contact/budget → Review/submit |
| **Contact** | Contact methods → Short form → Map link → Hours/response time |

## 4. URL & redirect rules
Lowercase, hyphenated, no trailing slash. Canonical host: choose apex **or** `www` (recommend apex) and 301 the other. Retire URLs with 301s recorded in `apps/web/public/_redirects`.

## 5. Future web-app map (Phase 2+, on `app.<domain>`)
```
/login  /forgot
/dashboard          Event overview & next actions
/events/{id}        Timeline · Checklist · Budget · Guests · Vendors · Documents · Payments · Messages
/proposals/{id}     Review & approve
/account            Profile, notifications
/admin              Team: leads → clients → events, calendar, vendors, invoices
```
Marketing pages stay on the apex; "Client login" link appears in the footer only when the app exists.
