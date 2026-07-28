import { defaultLocale, supportedLocales, type Locale } from '~/data/site'

const nonDefaultLocales = supportedLocales.filter(locale => locale !== defaultLocale)

export function getLocalizedPathname(pathname: string, targetLocale: Locale) {
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`

  const currentLocale = nonDefaultLocales.find(
    locale => normalizedPath === `/${locale}` || normalizedPath.startsWith(`/${locale}/`),
  )

  const basePath = currentLocale
    ? normalizedPath.slice(`/${currentLocale}`.length) || '/'
    : normalizedPath

  if (targetLocale === defaultLocale) {
    return basePath
  }

  return basePath === '/' ? `/${targetLocale}/` : `/${targetLocale}${basePath}`
}
