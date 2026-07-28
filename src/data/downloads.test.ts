import { describe, expect, it } from 'vitest'

import {
  getDownloadOptions,
  releasePublishedDate,
  releaseUrl,
  releaseVersion,
} from './downloads'
import { siteMetadata } from './site'

describe('getDownloadOptions', () => {
  it('exposes valid release metadata and derives the release URL from it', () => {
    expect(releaseVersion).toMatch(/^v\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/)
    expect(releasePublishedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(new Date(`${releasePublishedDate}T00:00:00Z`).toISOString().slice(0, 10)).toBe(releasePublishedDate)
    expect(releaseUrl).toBe(`${siteMetadata.githubUrl}/releases/tag/${releaseVersion}`)

    for (const option of getDownloadOptions('zh-Hans')) {
      expect(option.href).toContain(`/download/${releaseVersion}/`)
    }
  })

  it('returns Simplified Chinese download copy for the default locale', () => {
    expect(getDownloadOptions('zh-Hans')[0]).toMatchObject({
      label: 'Windows 64-bit Setup',
      shortLabel: 'Windows',
      description: '.exe 安装包',
      actionLabel: '下载 Windows 版',
    })
  })

  it('returns English download copy for English pages', () => {
    expect(getDownloadOptions('en')[0]).toMatchObject({
      label: 'Windows 64-bit Setup',
      shortLabel: 'Windows',
      description: '.exe installer',
      actionLabel: 'Download for Windows',
    })
  })

  it('returns localized download copy for Traditional Chinese and Japanese pages', () => {
    expect(getDownloadOptions('zh-Hant')[0].actionLabel).toBe('下載 Windows 版')
    expect(getDownloadOptions('ja')[0]).toMatchObject({
      label: 'Windows 64-bit Setup',
      shortLabel: 'Windows',
      description: '.exe インストーラー',
      actionLabel: 'Windows 版をダウンロード',
    })
  })
})
