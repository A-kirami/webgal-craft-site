import sitemap from '@astrojs/sitemap'
import svelte from '@astrojs/svelte'
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'

import { defaultLocale, siteMetadata, supportedLocales } from './src/data/site.ts'

export default defineConfig({
  site: siteMetadata.siteUrl,
  integrations: [svelte(), sitemap(), UnoCSS()],
  i18n: {
    locales: [...supportedLocales],
    defaultLocale,
  },
})
