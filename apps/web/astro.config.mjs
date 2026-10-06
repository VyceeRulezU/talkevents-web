import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Pages that carry `noindex` stay out of the sitemap too.
const unlisted = ['/portfolio', '/404'];

export default defineConfig({
  site: 'https://talkevents.ng',
  trailingSlash: 'never',
  compressHTML: true,
  // Static build: Cloudflare Pages serves ./dist as-is (see wrangler.jsonc).
  output: 'static',
  // /about is built as about.html, which Cloudflare Pages serves at /about
  // with no trailing-slash redirect, so it matches the canonical URLs.
  build: { format: 'file' },
  // Keep every script in its own file. The site's Content-Security-Policy
  // (public/_headers) is script-src 'self', which blocks inline scripts; left
  // inlined, the menu, gallery, forms and carousel would all stop working.
  vite: { build: { assetsInlineLimit: 0 } },
  integrations: [
    sitemap({
      filter: (page) => !unlisted.some((path) => new URL(page).pathname.replace(/\/$/, '') === path),
    }),
  ],
});
