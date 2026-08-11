import { defineConfig } from 'astro/config';

const base = process.env.SVARKOD_BASE || '/';

export default defineConfig({
  site: 'https://svarkod.ru',
  base,
  output: 'static',
});
