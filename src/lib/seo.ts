import { releasePublishedDate, releaseUrl, releaseVersion } from '~/data/downloads'
import { type HomepageContent } from '~/data/homepage'
import { getLocaleUrl, siteMetadata, supportedLocales } from '~/data/site'

function getFaqAnswerText(answer: HomepageContent['faq']['items'][number]['answer']) {
  return answer
    .map(paragraph => typeof paragraph === 'string'
      ? paragraph
      : paragraph.map(part => part.text).join(''))
    .join('\n')
}

export function getHomepageStructuredData(content: HomepageContent) {
  const pageUrl = getLocaleUrl(content.locale)
  const organizationId = `${siteMetadata.siteUrl}/#organization`
  const websiteId = `${siteMetadata.siteUrl}/#website`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        'name': siteMetadata.name,
        'url': siteMetadata.siteUrl,
        'logo': {
          '@type': 'ImageObject',
          'url': new URL(siteMetadata.faviconPath, siteMetadata.siteUrl).href,
          'width': 512,
          'height': 512,
        },
        'sameAs': [siteMetadata.githubUrl],
      },
      {
        '@type': 'WebSite',
        '@id': websiteId,
        'url': siteMetadata.siteUrl,
        'name': siteMetadata.name,
        'inLanguage': [...supportedLocales],
        'publisher': { '@id': organizationId },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${siteMetadata.siteUrl}/#software`,
        'name': siteMetadata.name,
        'url': pageUrl,
        'description': content.metaDescription,
        'applicationCategory': 'DeveloperApplication',
        'operatingSystem': ['Windows', 'macOS', 'Linux'],
        'softwareVersion': releaseVersion,
        'datePublished': releasePublishedDate,
        'downloadUrl': releaseUrl,
        'isAccessibleForFree': true,
        'inLanguage': content.locale,
        'publisher': { '@id': organizationId },
        'offers': {
          '@type': 'Offer',
          'price': 0,
          'priceCurrency': 'USD',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        'url': `${pageUrl}#faq`,
        'inLanguage': content.locale,
        'isPartOf': { '@id': websiteId },
        'mainEntity': content.faq.items.map(item => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': getFaqAnswerText(item.answer),
          },
        })),
      },
    ],
  }
}
