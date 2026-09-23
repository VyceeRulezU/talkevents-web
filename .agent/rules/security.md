# Security & Privacy

Marketing site + lead capture. Risk profile is low but non-zero: spam, form abuse, defacement, data protection (NDPA 2023), supply-chain.

## 1. Data we handle
Enquiry data: name, email, phone/WhatsApp, event type, date, location, budget range, message. **Treat as personal data** under the Nigeria Data Protection Act 2023. Minimise: collect only what's needed to reply.

## 2. Transport & headers
- Cloudflare: **Full (strict)** SSL, Always Use HTTPS, HSTS (start `max-age=31536000`; add `includeSubDomains` only after confirming all subdomains), TLS 1.2+ minimum, Automatic HTTPS Rewrites.
- Set via `public/_headers` (or Worker):
  ```
  /*
    Content-Security-Policy: default-src 'self'; img-src 'self' data: https:; script-src 'self' https://challenges.cloudflare.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self' https://cloudflareinsights.com; frame-src https://challenges.cloudflare.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
    X-Content-Type-Options: nosniff
    Referrer-Policy: strict-origin-when-cross-origin
    Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
    Cross-Origin-Opener-Policy: same-origin
    X-Frame-Options: DENY
  ```
  Tighten `style-src` (nonces/hashes) when feasible; add GA4/Meta domains **only** if consent-gated analytics are enabled.
- Cache static assets `immutable`; never cache `/api/*`.

## 3. Forms & API (`/api/v1/enquiry`)
1. Server-side validation (Zod): types, lengths, allow-lists (event type, budget range); reject unknown fields.
2. **Turnstile** token verified server-side on every submit.
3. **Honeypot** field + minimum-time-to-submit check.
4. **Rate limit** per IP (KV or Cloudflare rate-limiting rule): e.g. 5/hour.
5. CSRF: same-origin `POST` + `Origin`/`Sec-Fetch-Site` check; no cookies used.
6. Output-encode anything echoed; never render user input as HTML. Strip CR/LF from values used in email headers (header injection).
7. Store in D1 with parameterised queries only. Send notification through Resend; **API keys as Worker secrets**.
8. Return generic errors; log detail server-side without PII.

## 4. Secrets & config
- No secrets in git, client bundles, or `wrangler.jsonc` vars. `.env.example` lists names only.
- Rotate keys on team change. Least-privilege Cloudflare API tokens. **2FA on Cloudflare, Whogohost, GitHub, email.**
- Registrar: enable **registrar lock** at Whogohost; keep contact email current; auto-renew on. (For `.ng`, check NiRA renewal rules.)

## 5. Dependencies & supply chain
- pnpm with lockfile; `pnpm audit` in CI; Dependabot/Renovate weekly; pin GitHub Actions by SHA.
- Minimal dependencies; no unvetted third-party scripts. Third-party embeds (maps, video) load on interaction (facade) to protect privacy and performance.
- Subresource Integrity for any CDN asset (prefer self-hosting).

## 6. Privacy & compliance (Nigeria)
- **NDPA 2023**: lawful basis (consent for marketing; legitimate interest/contract for responding), purpose limitation, retention limit (propose 24 months for unconverted leads), data-subject rights contact, breach process. Publish a Privacy Policy and Terms. Ask the client whether registration with the NDPC as a data controller/processor applies at their scale — **get legal advice; do not assume.**
- Cookie/consent banner for non-essential analytics/ads pixels; default **off** until consent. Cloudflare Web Analytics is cookieless.
- Consent checkbox on the enquiry form (unticked) for marketing messages, separate from the enquiry itself.
- Photos of guests: usage consent recorded by the client; provide a takedown contact.
- Third-party processors list in Privacy Policy (Cloudflare, Resend, Google, Meta if used).

## 7. Cloudflare hardening
WAF managed rules on; Bot Fight Mode; rate-limit `/api/*`; block obvious scanner paths (`/wp-login.php`, `/xmlrpc.php`); Email Obfuscation on; hotlink protection for media; Page Rules/Redirect Rules for canonical host; Cloudflare Access on any `/admin` or preview URLs.

## 8. Incident basics
Backups: D1 export weekly (Worker cron → R2). Runbook: rotate secrets → purge cache → redeploy from git → notify client; if personal data exposed, follow NDPA breach-notification timelines (confirm current requirement with counsel).

## 9. Review checklist (per PR)
- [ ] No secrets · [ ] inputs validated · [ ] CSP still valid · [ ] new third-party script justified · [ ] PII not logged · [ ] `pnpm audit` clean.
