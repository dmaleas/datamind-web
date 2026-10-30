// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.datamind.gr',
  // Same URL shape as the old WordPress site (/slug/), so existing Google rankings carry over.
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'el',
    locales: ['el', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'el', locales: { el: 'el-GR', en: 'en-US' } },
    }),
  ],
});
