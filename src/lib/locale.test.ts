import { describe, expect, it } from 'vitest'

import { getLocalizedPathname } from './locale'

describe('getLocalizedPathname', () => {
  it('adds a locale prefix when switching from the default locale', () => {
    expect(getLocalizedPathname('/', 'en')).toBe('/en/')
  })

  it('removes the locale prefix when switching back to the default locale', () => {
    expect(getLocalizedPathname('/en/', 'zh-Hans')).toBe('/')
  })

  it('preserves nested paths when switching between non-default locales', () => {
    expect(getLocalizedPathname('/en/guide/getting-started/', 'ja')).toBe('/ja/guide/getting-started/')
  })

  it('preserves non-locale paths when switching to another locale', () => {
    expect(getLocalizedPathname('/download', 'zh-Hant')).toBe('/zh-Hant/download')
  })
})
