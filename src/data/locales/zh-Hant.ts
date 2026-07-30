import { siteMetadata } from '~/data/site'

import { type LocaleContent } from './types'

export const zhHantLocale = {
  homepage: {
    locale: 'zh-Hant',
    metaTitle: 'WebGAL Craft｜跨平台視覺小說製作工具',
    metaDescription: 'WebGAL Craft 是面向 WebGAL 創作者的免費跨平台視覺小說製作工具，支援視覺化編輯、劇情腳本編排、資源管理、即時預覽與多平台作品匯出。',
    languageLabel: '繁體中文',
    nav: {
      workflow: '創作流程',
      features: '功能特性',
      download: '下載',
      faq: '常見問題',
    },
    controls: {
      primaryNavigation: '主要導覽',
      languageMenu: '切換語言，目前：繁體中文',
      github: '在 GitHub 查看 WebGAL Craft',
      themeToDark: '切換深色主題',
      themeToLight: '切換淺色主題',
    },
    hero: {
      kicker: '創想無限，創作無界',
      title: '為視覺小說創作而生',
      titleAccent: '創作',
      lead: ['讓創作回到故事本身。視覺化編輯、腳本編排與即時預覽，在同一個工作空間自然銜接。', '從第一句對白，到完整作品。'],
    },
    workflow: {
      pill: '創作流程',
      title: '從靈感到發布，只需三步',
      description: '清晰的流程，讓每一個創意都能順利落地',
      items: [
        { act: '第一幕', title: '建立場景', description: '匯入素材、搭建背景與角色，快速建立沉浸式的故事場景。' },
        { act: '第二幕', title: '編排對話', description: '場景、分支、對白一體化編排，清晰掌握故事節奏。' },
        { act: '第三幕', title: '匯出發布', description: '一鍵匯出為多平台可執行作品，與玩家分享你的故事。' },
      ],
    },
    features: {
      pill: '功能特性',
      title: '專業功能，提升創作體驗',
      description: '每一處細節，都為提升創作效率與作品品質而設計',
      items: [
        { title: '資源管理', description: '集中管理立繪、背景、音效等素材，在創作中隨取隨用。' },
        { title: '視覺化編輯', description: '在視覺化介面中輕鬆組織劇情和對白，上手簡單，創作更流暢。' },
        { title: '本地歷史版本', description: '自動記錄每一次儲存，腳本變更可追溯、可回退。' },
        { title: '快速預覽', description: '即時預覽演出效果，邊創作邊驗證，所見即所得。' },
        { title: '引擎與範本切換', description: '依作品類型切換引擎與範本，以因應不同風格與需求。' },
        { title: '重複使用演出參數', description: '儲存常用語句預設值與語句組，減少重複設定和手寫腳本。' },
      ],
    },
    download: {
      title: '開始你的創作之旅',
      description: '下載 WebGAL Craft，開始創作屬於你的視覺小說',
      recommendedLabel: '推薦版本',
      otherPlatformsLabel: '下載其他平台',
      otherVariantsLabel: '其他版本',
      releasePublishedLabel: '發布於',
      releaseNotesLabel: '查看發布說明',
    },
    faq: {
      eyebrow: '常見問題',
      title: '你可能想了解',
      description: '快速找到常見問題的答案，或透過社群管道取得進一步協助',
      items: [
        {
          question: 'WebGAL Craft 和 WebGAL 是什麼關係？',
          answer: ['WebGAL 是負責執行遊戲的視覺小說引擎，WebGAL Craft 是專為 WebGAL 專案打造的視覺化創作工具。你可以在 WebGAL Craft 中編輯專案內容，作品最終由 WebGAL 引擎執行。'],
        },
        {
          question: '可以匯入已有的 WebGAL 專案嗎？',
          answer: ['可以。WebGAL Craft 支援打開已有的 WebGAL 遊戲目錄，適合繼續維護已經開始製作的專案。'],
        },
        {
          question: '如何回報問題或提出建議？',
          answer: [[
            { text: '可以在 ' },
            { text: 'Issues', href: `${siteMetadata.githubUrl}/issues` },
            { text: ' 回報問題，也可以加入 ' },
            { text: 'QQ 交流群', href: siteMetadata.communityUrl },
            { text: ' 討論使用體驗和功能建議。提交問題時建議附上 WebGAL Craft 版本、作業系統、重現步驟和錯誤截圖。' },
          ]],
        },
      ],
    },
    footer: {
      description: '專為視覺小說創作者打造的一體化工具，高效、自由、專注創作。',
      copyright: '© 2026 WebGAL Craft. 保留所有權利。',
    },
  },
  downloadOptions: {
    'windows': {
      description: '.exe 安裝包',
      actionLabel: '下載 Windows 版',
    },
    'macos-arm': {
      description: '.dmg 安裝包',
      actionLabel: '下載 macOS 版',
    },
    'macos-intel': {
      description: '.dmg 安裝包',
      actionLabel: '下載 macOS 版',
    },
    'linux-appimage': {
      description: '64-bit 免安裝包',
      actionLabel: '下載 Linux 版',
    },
    'linux-deb': {
      description: '64-bit Debian 套件',
      actionLabel: '下載 Linux deb 套件',
    },
  },
} satisfies LocaleContent
