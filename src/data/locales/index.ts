import { type Locale } from '~/data/site'

import { enLocale } from './en'
import { jaLocale } from './ja'
import { type LocaleContent } from './types'
import { zhHansLocale } from './zh-Hans'
import { zhHantLocale } from './zh-Hant'

const localeContentByLocale = {
  'zh-Hans': zhHansLocale,
  'zh-Hant': zhHantLocale,
  'en': enLocale,
  'ja': jaLocale,
} satisfies Record<Locale, LocaleContent>

export function getLocaleContent(locale: Locale): LocaleContent {
  return localeContentByLocale[locale]
}
