// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // En GitHub Pages el workflow define estas variables (ver .github/workflows/deploy.yml).
  // En local, o en un hosting que publique en la raíz del dominio, quedan vacías y base = '/'.
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || '/',
});
