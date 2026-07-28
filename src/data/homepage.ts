import { getLocalizedPathname } from '~/lib/locale'

import { getLocaleContent } from './locales'
import { supportedLocales, type Locale } from './site'

export type { HomepageContent } from './locales/types'

export interface LocaleOption {
  locale: Locale
  label: string
  href: string
}

export function getHomepageContent(locale: Locale) {
  return getLocaleContent(locale).homepage
}

export function getLocaleOptions(pathname = '/'): LocaleOption[] {
  return supportedLocales.map(locale => ({
    locale,
    label: getLocaleContent(locale).homepage.languageLabel,
    href: getLocalizedPathname(pathname, locale),
  }))
}
