export const supportedLocales = ['zh-Hans', 'zh-Hant', 'en', 'ja'] as const

export type Locale = (typeof supportedLocales)[number]

export const defaultLocale: Locale = 'zh-Hans'

export const siteMetadata = {
  name: 'WebGAL Craft',
  siteUrl: 'https://webgalcraft.com',
  themeColors: {
    light: '#FAFAFA',
    dark: '#18181B',
  },
  faviconPath: '/webgal-craft-logo.svg',
  githubUrl: 'https://github.com/A-kirami/webgal-craft',
  communityUrl: 'https://qm.qq.com/q/W2Dt9V2F66',
  license: 'MPL-2.0',
} as const

export function getLocaleUrl(locale: Locale) {
  const path = locale === defaultLocale ? '/' : `/${locale}/`
  return new URL(path, siteMetadata.siteUrl).href
}

export function getCanonicalUrl(pathname: string) {
  return new URL(pathname, siteMetadata.siteUrl).href
}
