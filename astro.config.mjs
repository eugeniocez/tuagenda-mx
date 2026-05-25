import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://agendallena.mx',
  trailingSlash: 'never',

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/landing-b') && !page.includes('/landing-c'),
    }),
  ],

  adapter: vercel(),
});