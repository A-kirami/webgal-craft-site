import { type Locale } from '~/data/site'

interface RichTextPart {
  readonly text: string
  readonly href?: string
}

type FaqAnswer = readonly (string | readonly RichTextPart[])[]

export interface HomepageContent {
  readonly locale: Locale
  readonly metaTitle: string
  readonly metaDescription: string
  readonly languageLabel: string
  readonly nav: {
    readonly workflow: string
    readonly features: string
    readonly download: string
    readonly faq: string
  }
  readonly controls: {
    readonly primaryNavigation: string
    readonly languageMenu: string
    readonly github: string
    readonly themeToDark: string
    readonly themeToLight: string
  }
  readonly hero: {
    readonly kicker: string
    readonly title: string
    readonly titleAccent: string
    readonly lead: readonly string[]
  }
  readonly workflow: {
    readonly pill: string
    readonly title: string
    readonly description: string
    readonly items: readonly {
      readonly act: string
      readonly title: string
      readonly description: string
    }[]
  }
  readonly features: {
    readonly pill: string
    readonly title: string
    readonly description: string
    readonly items: readonly {
      readonly title: string
      readonly description: string
    }[]
  }
  readonly download: {
    readonly title: string
    readonly description: string
    readonly recommendedLabel: string
    readonly otherPlatformsLabel: string
    readonly otherVariantsLabel: string
    readonly releasePublishedLabel: string
    readonly releaseNotesLabel: string
  }
  readonly faq: {
    readonly eyebrow: string
    readonly title: string
    readonly description: string
    readonly items: readonly {
      readonly question: string
      readonly answer: FaqAnswer
    }[]
  }
  readonly footer: {
    readonly description: string
    readonly copyright: string
  }
}

interface DownloadOptionCopy {
  readonly description: string
  readonly actionLabel: string
}

export interface DownloadOptionMessages {
  readonly 'windows': DownloadOptionCopy
  readonly 'macos-arm': DownloadOptionCopy
  readonly 'macos-intel': DownloadOptionCopy
  readonly 'linux-appimage': DownloadOptionCopy
  readonly 'linux-deb': DownloadOptionCopy
}

export type DownloadOptionKey = keyof DownloadOptionMessages

export interface LocaleContent {
  readonly homepage: HomepageContent
  readonly downloadOptions: DownloadOptionMessages
}
