import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

import { defaultLocale, siteMetadata, supportedLocales } from './src/data/site.ts'

const sitemapLocales = Object.fromEntries(
  supportedLocales.map(locale => [locale, locale]),
)

export default defineConfig({
  site: siteMetadata.siteUrl,
  integrations: [
    svelte(),
    sitemap({
      i18n: {
        defaultLocale,
        locales: sitemapLocales,
      },
    }),
    UnoCSS(),
  ],
  i18n: {
    locales: [...supportedLocales],
    defaultLocale,
  },
})
