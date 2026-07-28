import { siteMetadata } from '~/data/site'

import { type LocaleContent } from './types'

export const enLocale = {
  homepage: {
    locale: 'en',
    metaTitle: 'WebGAL Craft | Imagine without limits, create without boundaries',
    metaDescription: 'WebGAL Craft is a cross-platform visual novel studio for WebGAL creators.',
    languageLabel: 'English',
    nav: {
      workflow: 'Workflow',
      features: 'Features',
      download: 'Download',
      faq: 'FAQ',
    },
    controls: {
      primaryNavigation: 'Primary navigation',
      languageMenu: 'Switch language, current: English',
      github: 'View WebGAL Craft on GitHub',
      themeToDark: 'Switch to dark theme',
      themeToLight: 'Switch to light theme',
    },
    hero: {
      kicker: 'Imagine without limits, create without boundaries',
      title: 'Built for visual novel creation',
      titleAccent: 'creation',
      lead: ['Put the story back at the center. Visual editing, script orchestration, and live preview flow together in one workspace.', 'From the first line of dialogue to a finished visual novel.'],
    },
    workflow: {
      pill: 'Workflow',
      title: 'From idea to release in three steps',
      description: 'A clear workflow helps bring every idea to life.',
      items: [
        { act: 'Act I', title: 'Build scenes', description: 'Import assets, set up backgrounds and characters, and quickly create immersive story scenes.' },
        { act: 'Act II', title: 'Arrange dialogue', description: 'Organize scenes, branches, and dialogue in one flow so the pacing of the story stays clear.' },
        { act: 'Act III', title: 'Export and publish', description: 'Export a runnable build for multiple platforms in one click and share your story with players.' },
      ],
    },
    features: {
      pill: 'Features',
      title: 'Professional features for a better creative experience',
      description: 'Every detail is designed to improve creative efficiency and the quality of your work.',
      items: [
        { title: 'Asset management', description: 'Manage sprites, backgrounds, sound effects, and other assets in one place so they are always ready to use.' },
        { title: 'Visual editor', description: 'Organize story flow and dialogue in a visual interface that is easy to learn and smooth to use.' },
        { title: 'Local version history', description: 'Automatically record every save so script changes stay traceable and reversible.' },
        { title: 'Fast preview', description: 'Preview presentation effects in real time and validate as you create, so what you see is what you get.' },
        { title: 'Engine and template switching', description: 'Switch engines and templates by project type to fit different styles and needs.' },
        { title: 'Reusable staging parameters', description: 'Save default values and statement groups for common commands to reduce repeated setup and handwritten scripts.' },
      ],
    },
    download: {
      title: 'Start creating today',
      description: 'Download WebGAL Craft and start creating your own visual novel.',
      recommendedLabel: 'Recommended',
      otherPlatformsLabel: 'Other platforms',
      otherVariantsLabel: 'Other builds',
      releasePublishedLabel: 'Released',
      releaseNotesLabel: 'View release notes',
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Questions you may have',
      description: 'Quickly find answers to common questions, or get further help through our community channels.',
      items: [
        { question: 'What is the relationship between WebGAL Craft and WebGAL?', answer: ['WebGAL is the visual novel engine that runs the game, while WebGAL Craft is a visual authoring tool for WebGAL projects. You can edit project content in WebGAL Craft, and the finished work runs on the WebGAL engine.'] },
        { question: 'Can I import an existing WebGAL project?', answer: ['Yes. WebGAL Craft can open an existing WebGAL game directory, which is suitable for continuing projects that are already underway.'] },
        {
          question: 'How can I report issues or send suggestions?',
          answer: [[
            { text: 'You can report issues on GitHub ' },
            { text: 'Issues', href: `${siteMetadata.githubUrl}/issues` },
            { text: ', or join the ' },
            { text: 'QQ group', href: siteMetadata.communityUrl },
            { text: ' to discuss your experience and feature suggestions. When submitting a report, it is recommended to include the WebGAL Craft version, operating system, reproduction steps, and screenshots of the error.' },
          ]],
        },
      ],
    },
    footer: {
      description: 'An all-in-one tool built for visual novel creators, designed for efficiency, freedom, and focused creation.',
      copyright: '© 2026 WebGAL Craft. All rights reserved.',
    },
  },
  downloadOptions: {
    'windows': {
      description: '.exe installer',
      actionLabel: 'Download for Windows',
    },
    'macos-arm': {
      description: '.dmg package',
      actionLabel: 'Download for macOS',
    },
    'macos-intel': {
      description: '.dmg package',
      actionLabel: 'Download for macOS',
    },
    'linux-appimage': {
      description: '64-bit AppImage',
      actionLabel: 'Download for Linux',
    },
    'linux-deb': {
      description: '64-bit Debian package',
      actionLabel: 'Download Linux deb',
    },
  },
} satisfies LocaleContent
