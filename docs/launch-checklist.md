# Launch Checklist

## A. Domain & DNS (Whogohost → Cloudflare)
- [ ] Confirm domain, TLD, registrant contact, expiry; enable auto-renew + registrar lock
- [ ] Export existing DNS records (esp. **MX/SPF/DKIM** for any email) before change
- [ ] Add site to Cloudflare; recreate all records; verify email still resolves in Cloudflare DNS
- [ ] Change nameservers at Whogohost to the two Cloudflare nameservers; wait for propagation
- [ ] SSL/TLS Full (strict), Always HTTPS, HSTS, min TLS 1.2, HTTP/3
- [ ] Redirect rules: `www`↔apex (single canonical), `http`→`https`
- [ ] Email auth: SPF, DKIM, DMARC (`p=none` → `quarantine`) for the sending domain (Resend)
- [ ] `.ng`/`.com.ng` specifics verified with registrar (renewal, DNSSEC support)

## B. Build & deploy
- [ ] CI green (lint, types, build, tests, axe, Lighthouse)
- [ ] Cloudflare project connected to repo; preview per PR; production on `main`
- [ ] Secrets set (Turnstile, Resend); D1 migrated; KV bound; R2 bucket for media
- [ ] `_headers` (CSP etc.) and `_redirects` shipped; `robots.txt` allows indexing on prod only
- [ ] Custom 404/500; favicon set (SVG + PNG 32/180/512), web manifest, theme-color

## C. Quality gates
- [ ] Lighthouse mobile ≥ 95 (Home, Service, Portfolio, Contact)
- [ ] axe 0 critical/serious; keyboard + screen-reader pass on nav, forms, gallery
- [ ] Real-device tests: Android mid-range, iPhone Safari, Instagram in-app browser, Slow 4G
- [ ] Forms: success, validation, spam, JS-off, email received, D1 row saved
- [ ] All placeholders removed; facts confirmed by client; legal pages live
- [ ] Broken links 0; images have alt; OG previews (WhatsApp/Facebook/X) look right
- [ ] Security headers A/A+ (securityheaders.com); SSL Labs A

## D. SEO & marketing
- [ ] Sitemap submitted (Search Console + Bing); URL inspection on key pages
- [ ] JSON-LD validated; NAP consistent
- [ ] Google Business Profile verified & complete; WhatsApp Business updated
- [ ] Instagram bio link + highlight for "Plan my event"
- [ ] Analytics events verified; consent banner behaves; Cloudflare Web Analytics on
- [ ] Announcement plan (IG, WhatsApp status, email to past clients)

## E. Post-launch (first 30 days)
- [ ] Daily lead check; response-time SLA
- [ ] Monitor Search Console coverage/CWV; fix issues
- [ ] Collect first reviews; publish first case study
- [ ] Retrospective: conversion data → backlog
