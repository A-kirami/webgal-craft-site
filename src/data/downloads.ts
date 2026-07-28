import { getLocaleContent } from './locales'
import { type DownloadOptionKey } from './locales/types'
import release from './release.json'
import { siteMetadata, type Locale } from './site'

export type { DownloadOptionKey } from './locales/types'

export const releaseVersion = release.version
export const releasePublishedDate = release.publishedDate
export const releaseUrl = `${siteMetadata.githubUrl}/releases/tag/${releaseVersion}`
export const quarkMirrorUrl = 'https://pan.quark.cn/s/086461f3bd02'

const releaseDownloadBaseUrl = `${siteMetadata.githubUrl}/releases/download/${releaseVersion}`

export type PlatformFamily = 'windows' | 'macos' | 'linux'

export interface DownloadOption {
  key: DownloadOptionKey
  family: PlatformFamily
  label: string
  shortLabel: string
  description: string
  actionLabel: string
  href: string
}

type DownloadTarget = Pick<DownloadOption, 'key' | 'family' | 'label' | 'shortLabel' | 'href'>

const downloadTargets: DownloadTarget[] = [
  {
    key: 'windows',
    family: 'windows',
    label: 'Windows 64-bit Setup',
    shortLabel: 'Windows',
    href: `${releaseDownloadBaseUrl}/webgal-craft-${releaseVersion}-windows-64-bit-setup.exe`,
  },
  {
    key: 'macos-arm',
    family: 'macos',
    label: 'macOS Apple Silicon',
    shortLabel: 'macOS',
    href: `${releaseDownloadBaseUrl}/webgal-craft-${releaseVersion}-macos-apple-silicon.dmg`,
  },
  {
    key: 'macos-intel',
    family: 'macos',
    label: 'macOS Intel',
    shortLabel: 'macOS',
    href: `${releaseDownloadBaseUrl}/webgal-craft-${releaseVersion}-macos-intel.dmg`,
  },
  {
    key: 'linux-appimage',
    family: 'linux',
    label: 'Linux AppImage',
    shortLabel: 'Linux',
    href: `${releaseDownloadBaseUrl}/webgal-craft-${releaseVersion}-linux-64-bit.AppImage`,
  },
  {
    key: 'linux-deb',
    family: 'linux',
    label: 'Linux deb',
    shortLabel: 'Linux deb',
    href: `${releaseDownloadBaseUrl}/webgal-craft-${releaseVersion}-linux-64-bit.deb`,
  },
]

function buildDownloadOptions(locale: Locale): DownloadOption[] {
  const copyByKey = getLocaleContent(locale).downloadOptions

  return downloadTargets.map(target => ({
    ...target,
    ...copyByKey[target.key],
  }))
}

const downloadOptionsByLocale = {
  'zh-Hans': buildDownloadOptions('zh-Hans'),
  'zh-Hant': buildDownloadOptions('zh-Hant'),
  'en': buildDownloadOptions('en'),
  'ja': buildDownloadOptions('ja'),
} satisfies Record<Locale, DownloadOption[]>

export function getDownloadOptions(locale: Locale) {
  return downloadOptionsByLocale[locale]
}
