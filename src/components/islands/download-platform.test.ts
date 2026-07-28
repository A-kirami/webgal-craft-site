import { describe, expect, it } from 'vitest'

import { detectRecommendedPlatform } from './download-platform'

describe('detectRecommendedPlatform', () => {
  it('uses user agent client hints before the plain user agent string', () => {
    expect(
      detectRecommendedPlatform({
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
        userAgentDataPlatform: 'Windows',
      }),
    ).toBe('windows')
  })

  it('recommends Windows downloads for Windows user agents', () => {
    expect(
      detectRecommendedPlatform({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      }),
    ).toBe('windows')
  })

  it('recommends Apple Silicon downloads for macOS arm architecture', () => {
    expect(
      detectRecommendedPlatform({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4)',
        architecture: 'arm',
      }),
    ).toBe('macos-arm')
  })

  it('recommends Intel downloads for macOS x86 architecture', () => {
    expect(
      detectRecommendedPlatform({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4)',
        architecture: 'x86',
      }),
    ).toBe('macos-intel')
  })

  it('does not recommend a macOS build when the architecture is unknown', () => {
    expect(
      detectRecommendedPlatform({
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4)',
      }),
    ).toBeUndefined()
  })

  it('falls back to AppImage for Linux', () => {
    expect(
      detectRecommendedPlatform({
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64)',
      }),
    ).toBe('linux-appimage')
  })

  it('does not recommend desktop downloads for mobile user agents', () => {
    expect(
      detectRecommendedPlatform({
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)',
      }),
    ).toBeUndefined()
  })

  it('does not recommend a download for unknown platforms', () => {
    expect(
      detectRecommendedPlatform({
        userAgent: 'CustomClient/1.0',
      }),
    ).toBeUndefined()
  })
})
