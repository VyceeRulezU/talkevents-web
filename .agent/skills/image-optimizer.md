# Skill: image-optimizer

1. Get originals from the client in the highest quality available; keep in R2 `originals/` (not in git).
2. Export web sizes: 480/800/1200/1600/2400 wide; AVIF q≈55, WebP q≈75, JPEG fallback q≈78. Strip EXIF/GPS (privacy).
3. Name descriptively: `wedding-reception-head-table-abuja-01.avif`.
4. Use `astro:assets` `<Image>`/`<Picture>` with `sizes` that match the layout; set `width/height`.
5. LCP image: `loading="eager"`, `fetchpriority="high"`, preload. All others lazy.
6. Alt text per `accessibility.md`. Record consent for identifiable people in the content entry (`consent: true`).
7. Colour grade consistently; overlays via CSS tokens, not baked in.
8. Check total page weight against `performance.md`.
