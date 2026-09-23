import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://talkevents.example',
  trailingSlash: 'never',
  compressHTML: true,
});
