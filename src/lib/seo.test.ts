import { describe, expect, it } from 'vitest'

import { getHomepageContent } from '~/data/homepage'
import { getLocaleUrl, siteMetadata, supportedLocales } from '~/data/site'

import { getHomepageStructuredData } from './seo'

describe('getHomepageStructuredData', () => {
  it.each(supportedLocales)('builds localized schema data for %s', (locale) => {
    const content = getHomepageContent(locale)
    const schema = getHomepageStructuredData(content)
    const software = schema['@graph'].find(node => node['@type'] === 'SoftwareApplication')
    const faq = schema['@graph'].find(node => node['@type'] === 'FAQPage')

    expect(schema['@context']).toBe('https://schema.org')
    expect(software).toMatchObject({
      '@type': 'SoftwareApplication',
      'url': getLocaleUrl(locale),
      'description': content.metaDescription,
      'operatingSystem': ['Windows', 'macOS', 'Linux'],
      'inLanguage': locale,
    })
    expect(faq).toMatchObject({
      '@type': 'FAQPage',
      'url': `${getLocaleUrl(locale)}#faq`,
      'inLanguage': locale,
    })
    expect(faq?.mainEntity).toHaveLength(content.faq.items.length)
  })

  it('converts linked FAQ copy to the visible plain text', () => {
    const content = getHomepageContent('zh-Hans')
    const schema = getHomepageStructuredData(content)
    const faq = schema['@graph'].find(node => node['@type'] === 'FAQPage')
    const feedbackAnswer = faq?.mainEntity?.at(-1)?.acceptedAnswer.text

    expect(feedbackAnswer).toContain('Issues')
    expect(feedbackAnswer).toContain('QQ 交流群')
    expect(feedbackAnswer).not.toContain(siteMetadata.githubUrl)
  })
})
