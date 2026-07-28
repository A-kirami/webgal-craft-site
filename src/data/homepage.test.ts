import { describe, expect, it } from 'vitest'

import { getHomepageContent, getLocaleOptions } from './homepage'
import { siteMetadata } from './site'

describe('getLocaleOptions', () => {
  it('builds language links for the current localized path', () => {
    expect(getLocaleOptions('/en/guide/getting-started/')).toEqual([
      { locale: 'zh-Hans', label: '简体中文', href: '/guide/getting-started/' },
      { locale: 'zh-Hant', label: '繁體中文', href: '/zh-Hant/guide/getting-started/' },
      { locale: 'en', label: 'English', href: '/en/guide/getting-started/' },
      { locale: 'ja', label: '日本語', href: '/ja/guide/getting-started/' },
    ])
  })

  it('uses the language label from each locale content model', () => {
    for (const option of getLocaleOptions()) {
      expect(option.label).toBe(getHomepageContent(option.locale).languageLabel)
    }
  })
})

describe('getHomepageContent', () => {
  it('provides a complete homepage model for every locale', () => {
    for (const locale of ['zh-Hans', 'zh-Hant', 'en', 'ja'] as const) {
      const content = getHomepageContent(locale)

      expect(content.locale).toBe(locale)
      expect(content.hero.lead.length).toBeGreaterThan(0)
      expect(content.hero.title).toContain(content.hero.titleAccent)
      expect(content.workflow.items).toHaveLength(3)
      expect(content.features.items).toHaveLength(6)
      expect(content.faq.items.length).toBeGreaterThanOrEqual(3)
      expect(content.controls.themeToDark).toBeTruthy()
      expect(content.controls.themeToLight).toBeTruthy()
      expect(content.controls.primaryNavigation).toBeTruthy()
      expect(content.controls.languageMenu).toContain(content.languageLabel)
      expect(content.download.releasePublishedLabel).toBeTruthy()
    }
  })

  it('localizes the release published label for download metadata', () => {
    expect(getHomepageContent('zh-Hans').download.releasePublishedLabel).toBe('发布于')
    expect(getHomepageContent('zh-Hant').download.releasePublishedLabel).toBe('發布於')
    expect(getHomepageContent('en').download.releasePublishedLabel).toBe('Released')
    expect(getHomepageContent('ja').download.releasePublishedLabel).toBe('リリース')
  })

  it('embeds the configured feedback links in every locale', () => {
    for (const locale of ['zh-Hans', 'zh-Hant', 'en', 'ja'] as const) {
      const links = getHomepageContent(locale).faq.items
        .flatMap(item => item.answer)
        .flatMap(answer => typeof answer === 'string' ? [] : answer)
        .flatMap(part => part.href ? [part.href] : [])

      expect(links).toEqual([
        `${siteMetadata.githubUrl}/issues`,
        siteMetadata.communityUrl,
      ])
    }
  })
})
