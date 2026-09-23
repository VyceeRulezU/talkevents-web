# Performance Budget

Audience: mobile-first, variable 4G, many mid-range Android devices, data cost sensitivity. Test on **Moto G Power / Slow 4G** presets.

## Targets (75th percentile, mobile, field data once available)
| Metric | Target |
|---|---|
| LCP | ≤ 2.5 s (goal ≤ 2.0 s) |
| INP | ≤ 200 ms |
| CLS | ≤ 0.1 |
| TTFB | ≤ 600 ms (edge cached) |
| Lighthouse mobile | ≥ 95 all categories |

## Budgets (per page, gzip/brotli)
- HTML ≤ 30 KB · CSS ≤ 40 KB total · **JS ≤ 60 KB** (home ≤ 30 KB) · fonts ≤ 90 KB (subset Latin, woff2, 3–4 files)
- Hero image ≤ 120 KB (AVIF/WebP, sized to viewport via `srcset`) · gallery thumbs ≤ 30 KB each · page weight ≤ 1 MB on first load excluding lazy gallery.
- No render-blocking third-party JS. Total third-party requests ≤ 3 on initial load.

## Rules
- Preload LCP image and the two critical font files; `fetchpriority="high"` on hero; everything else `loading="lazy"` + `decoding="async"`.
- Always set `width`/`height` or `aspect-ratio`.
- Background video: not on mobile by default; use poster image. If used, ≤ 1.5 MB, muted loop, `preload="none"` fallback.
- Inline critical CSS (Astro does per-page); avoid CSS `@import` chains.
- Gallery: paginate/“load more”; never load 50+ images at once (the sample gallery does).
- Lightbox/carousel JS loads on interaction (dynamic `import()`).
- Cache: `public, max-age=31536000, immutable` for hashed assets; HTML `s-maxage` with revalidation; Brotli on.
- Cloudflare: enable Polish/Mirage only after measuring; Early Hints; HTTP/3.
- Measure in CI with Lighthouse CI; fail the build on budget regressions.
