import { siteMetadata } from '~/data/site'

import { type LocaleContent } from './types'

export const zhHansLocale = {
  homepage: {
    locale: 'zh-Hans',
    metaTitle: 'WebGAL Craft｜创想无限，创作无界',
    metaDescription: 'WebGAL Craft 是面向 WebGAL 创作者的跨平台视觉小说工作室。',
    languageLabel: '简体中文',
    nav: {
      workflow: '创作流程',
      features: '功能特性',
      download: '下载',
      faq: '常见问题',
    },
    controls: {
      primaryNavigation: '主导航',
      languageMenu: '切换语言，当前：简体中文',
      github: '在 GitHub 查看 WebGAL Craft',
      themeToDark: '切换深色主题',
      themeToLight: '切换浅色主题',
    },
    hero: {
      kicker: '创想无限，创作无界',
      title: '为视觉小说创作而生',
      titleAccent: '创作',
      lead: ['让创作回到故事本身。可视化编辑、脚本编排与实时预览，在一个工作空间自然衔接。', '从第一句对白，到完整作品。'],
    },
    workflow: {
      pill: '创作流程',
      title: '从灵感到发布，只需三步',
      description: '清晰的流程，让每一个创意都能顺利落地',
      items: [
        { act: '第一幕', title: '构建场景', description: '导入素材、搭建背景与角色，快速创建沉浸式的故事场景。' },
        { act: '第二幕', title: '编排对话', description: '场景、分支、对白一体化编排，清晰掌控故事节奏。' },
        { act: '第三幕', title: '导出发布', description: '一键导出为多平台可运行作品，与玩家分享你的故事。' },
      ],
    },
    features: {
      pill: '功能特性',
      title: '专业功能，提升创作体验',
      description: '每一处细节，都为提升创作效率与作品质量而设计',
      items: [
        { title: '资源管理', description: '集中管理立绘、背景、音效等素材，在创作中随取随用。' },
        { title: '可视化编辑', description: '在可视化界面中轻松组织剧情和对白，上手简单，创作更流畅。' },
        { title: '本地历史版本', description: '自动记录每一次保存，脚本变更可追溯、可回退。' },
        { title: '快速预览', description: '实时预览演出效果，边创作边验证，所见即所得。' },
        { title: '引擎与模板切换', description: '按作品类型切换引擎与模板，适配不同风格与需求。' },
        { title: '演出参数复用', description: '保存常用语句默认值与语句组，减少重复配置和手写脚本。' },
      ],
    },
    download: {
      title: '开始你的创作之旅',
      description: '下载 WebGAL Craft，开始创作属于你的视觉小说',
      recommendedLabel: '推荐版本',
      otherPlatformsLabel: '下载其他平台',
      otherVariantsLabel: '其他版本',
      releasePublishedLabel: '发布于',
      releaseNotesLabel: '查看发布说明',
    },
    faq: {
      eyebrow: '常见问题',
      title: '你可能想了解',
      description: '快速找到常见问题的答案，或通过社区渠道获得进一步帮助',
      items: [
        {
          question: 'WebGAL Craft 和 WebGAL 是什么关系？',
          answer: ['WebGAL 是负责运行游戏的视觉小说引擎，WebGAL Craft 是面向 WebGAL 项目的可视化创作工具。你可以在 WebGAL Craft 中编辑项目内容，作品最终由 WebGAL 引擎运行。'],
        },
        {
          question: '可以导入已有 WebGAL 项目吗？',
          answer: ['可以。WebGAL Craft 支持打开已有 WebGAL 游戏目录，适合继续维护已经开始制作的项目。'],
        },
        {
          question: '如何反馈问题或提出建议？',
          answer: [[
            { text: '可以在 ' },
            { text: 'Issues', href: `${siteMetadata.githubUrl}/issues` },
            { text: ' 反馈问题，也可以加入 ' },
            { text: 'QQ 交流群', href: siteMetadata.communityUrl },
            { text: ' 讨论使用体验和功能建议。提交问题时建议包含 WebGAL Craft 版本、操作系统、复现步骤和错误截图。' },
          ]],
        },
      ],
    },
    footer: {
      description: '专为视觉小说创作者打造的一体化工具，高效、自由、专注创作。',
      copyright: '© 2026 WebGAL Craft. 保留所有权利.',
    },
  },
  downloadOptions: {
    'windows': {
      description: '.exe 安装包',
      actionLabel: '下载 Windows 版',
    },
    'macos-arm': {
      description: '.dmg 安装包',
      actionLabel: '下载 macOS 版',
    },
    'macos-intel': {
      description: '.dmg 安装包',
      actionLabel: '下载 macOS 版',
    },
    'linux-appimage': {
      description: '64-bit 免安装包',
      actionLabel: '下载 Linux 版',
    },
    'linux-deb': {
      description: '64-bit Debian 包',
      actionLabel: '下载 Linux deb 包',
    },
  },
} satisfies LocaleContent
