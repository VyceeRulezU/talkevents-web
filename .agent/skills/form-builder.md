# Skill: form-builder

**Purpose:** Build enquiry / contact / newsletter forms that convert on mobile and are secure.

## Principles
- Ask the minimum. Enquiry v1 fields: name · WhatsApp/phone · email (optional if phone given) · event type · event date (or "not sure") · guest count range · area/venue · budget range (optional) · message. Multi-step (3 steps) on `/book`, single-step short form in footer/contact.
- Works without JS (native `POST`, redirect to `/thank-you`); enhance with `fetch` + inline status.
- Always offer **"Prefer WhatsApp?"** prefilled link (`https://wa.me/234XXXXXXXXXX?text=…` with event type/date).

## Steps
1. Define the Zod schema in `src/lib/validators.ts`; share between client hints and the Worker.
2. Markup: `<form method="post" action="/api/v1/enquiry" novalidate>` with labels, `autocomplete`, `inputmode`, `aria-describedby`, error summary container `role="alert"` (on error) and `role="status"` (on success).
3. Hidden honeypot, timestamp, Turnstile widget (`data-sitekey` from env).
4. Worker: verify Turnstile → validate → rate limit → store D1 → send email via Resend → respond JSON `{ ok, id }` or field errors. See `rules/security.md` §3.
5. Analytics: fire `generate_lead` (consent-gated) on success only.
6. Tests: happy path, validation errors, spam path, JS-off path.

## Copy
Button: "Send my enquiry". Success: "Thanks, {name}. We'll reply within {{PLACEHOLDER: response time}}." Error: say what to fix. Include privacy line + link and unticked marketing-consent checkbox.

## Anti-patterns
Required fields the team doesn't really need · CAPTCHA puzzles · placeholder-as-label · clearing inputs on error · mailto-only contact.
