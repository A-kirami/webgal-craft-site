import { siteMetadata } from '~/data/site'

import { type LocaleContent } from './types'

export const jaLocale = {
  homepage: {
    locale: 'ja',
    metaTitle: 'WebGAL Craft｜無料のビジュアルノベル制作ツール',
    metaDescription: 'WebGAL Craft は WebGAL クリエイター向けの無料ビジュアルノベル制作ツールです。ビジュアル編集、スクリプト構成、素材管理、リアルタイムプレビュー、Windows・macOS・Linux 向けの書き出しに対応します。',
    languageLabel: '日本語',
    nav: {
      workflow: '制作フロー',
      features: '機能',
      download: 'ダウンロード',
      faq: 'よくある質問',
    },
    controls: {
      primaryNavigation: 'メインナビゲーション',
      languageMenu: '言語を切り替えます。現在：日本語',
      github: 'GitHub で WebGAL Craft を見る',
      themeToDark: 'ダークテーマに切り替え',
      themeToLight: 'ライトテーマに切り替え',
    },
    hero: {
      kicker: '発想は無限、創作は自由',
      title: 'ビジュアルノベル制作に特化',
      titleAccent: '制作',
      lead: ['物語そのものに集中できる制作環境。ビジュアル編集、スクリプト構成、リアルタイムプレビューが一つのワークスペースで自然につながります。', '最初の台詞から、作品の完成まで。'],
    },
    workflow: {
      pill: '制作フロー',
      title: 'アイデアから公開まで、3 ステップで',
      description: '明快なフローで、どんなアイデアも着実に形にできます。',
      items: [
        { act: '第一幕', title: 'シーンを構築', description: '素材を取り込み、背景やキャラクターを配置して、没入感のあるシーンをすばやく作成します。' },
        { act: '第二幕', title: '台詞を構成', description: 'シーン、分岐、台詞をひとつの流れで整理し、物語のテンポを明確に保てます。' },
        { act: '第三幕', title: '書き出して公開', description: 'ワンクリックで複数プラットフォーム向けに書き出し、プレイヤーに物語を届けられます。' },
      ],
    },
    features: {
      pill: '機能',
      title: '創作体験を高めるプロ向け機能',
      description: '細部まで、制作効率と作品の完成度を高めるために設計されています。',
      items: [
        { title: '素材管理', description: '立ち絵、背景、効果音などの素材を一元管理し、必要なときにすぐ使えます。' },
        { title: 'ビジュアル編集', description: 'ビジュアルインターフェースで物語と台詞を整理でき、習得しやすく制作もスムーズです。' },
        { title: 'ローカル履歴', description: '保存のたびに自動で履歴を記録し、スクリプトの変更を追跡・復元できます。' },
        { title: '高速プレビュー', description: '演出結果をリアルタイムで確認しながら制作でき、見たままに調整できます。' },
        { title: 'エンジンとテンプレートの切り替え', description: '作品の種類に合わせてエンジンやテンプレートを切り替え、異なる作風や要件に対応できます。' },
        { title: '演出パラメータの再利用', description: 'よく使う文のデフォルト値や文グループを保存し、繰り返し設定や手書きスクリプトを減らせます。' },
      ],
    },
    download: {
      title: '創作の旅を始めよう',
      description: 'WebGAL Craft をダウンロードして、あなただけのビジュアルノベル制作を始めましょう。',
      recommendedLabel: 'おすすめ版',
      otherPlatformsLabel: '他のプラットフォーム版をダウンロード',
      otherVariantsLabel: 'その他のビルド',
      releasePublishedLabel: 'リリース',
      releaseNotesLabel: 'リリースノートを見る',
    },
    faq: {
      eyebrow: 'よくある質問',
      title: '気になることはこちら',
      description: 'よくある質問の答えをすぐに確認できます。さらにサポートが必要な場合は、コミュニティチャンネルをご利用ください。',
      items: [
        {
          question: 'WebGAL Craft と WebGAL の関係は？',
          answer: ['WebGAL はゲームを実行するビジュアルノベルエンジンで、WebGAL Craft は WebGAL プロジェクト向けのビジュアル制作ツールです。WebGAL Craft でプロジェクト内容を編集し、完成した作品を WebGAL エンジンで実行できます。'],
        },
        {
          question: '既存の WebGAL プロジェクトを読み込めますか？',
          answer: ['はい。WebGAL Craft は既存の WebGAL ゲームディレクトリを開けるため、すでに制作を始めているプロジェクトの継続にも向いています。'],
        },
        {
          question: '不具合報告や要望はどこに送ればよいですか？',
          answer: [[
            { text: 'Issues', href: `${siteMetadata.githubUrl}/issues` },
            { text: ' で不具合を報告したり、' },
            { text: 'QQ グループ', href: siteMetadata.communityUrl },
            { text: ' で利用体験や機能要望を共有したりできます。報告時には、WebGAL Craft のバージョン、OS、再現手順、エラー画面のスクリーンショットを添えるのがおすすめです。' },
          ]],
        },
      ],
    },
    footer: {
      description: 'ビジュアルノベル制作者のためのオールインワンツール。効率的で、自由度が高く、創作に集中できます。',
      copyright: '© 2026 WebGAL Craft. All rights reserved.',
    },
  },
  downloadOptions: {
    'windows': {
      description: '.exe インストーラー',
      actionLabel: 'Windows 版をダウンロード',
    },
    'macos-arm': {
      description: '.dmg パッケージ',
      actionLabel: 'macOS 版をダウンロード',
    },
    'macos-intel': {
      description: '.dmg パッケージ',
      actionLabel: 'macOS 版をダウンロード',
    },
    'linux-appimage': {
      description: '64-bit AppImage',
      actionLabel: 'Linux 版をダウンロード',
    },
    'linux-deb': {
      description: '64-bit Debian パッケージ',
      actionLabel: 'Linux deb をダウンロード',
    },
  },
} satisfies LocaleContent
