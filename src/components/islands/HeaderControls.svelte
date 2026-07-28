<script lang="ts">
  import { onMount } from 'svelte'

  import { type LocaleOption } from '~/data/homepage'
  import {
    createThemeClipPath,
    getNextTheme,
    resolveThemePreference,
    type Theme,
  } from '~/lib/theme'


  interface HeaderControlLabels {
    languageMenu: string
    github: string
    themeToDark: string
    themeToLight: string
  }

  interface Props {
    currentLabel: string
    locales: LocaleOption[]
    labels: HeaderControlLabels
    githubUrl: string
  }

  const themeStorageKey = 'webgal-craft-theme'
  const themeTransitionStartClip = '--theme-transition-start-clip'
  const themeTransitionEndClip = '--theme-transition-end-clip'

  let { currentLabel, locales, labels, githubUrl }: Props = $props()
  let languageRoot: HTMLDivElement | undefined = $state()
  let isLanguageOpen = $state(false)
  let isThemeTransitioning = $state(false)
  let theme = $state<Theme>(
    typeof document !== 'undefined' && document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
  )

  const themeLabel = $derived(theme === 'dark' ? labels.themeToLight : labels.themeToDark)

  function readStoredTheme() {
    try {
      return window.localStorage.getItem(themeStorageKey)
    }
    catch {
      return null
    }
  }

  function saveTheme(nextTheme: Theme) {
    try {
      window.localStorage.setItem(themeStorageKey, nextTheme)
    }
    catch {
      // 忽略隐私模式下的存储失败，主题仍可在当前页面生效。
    }
  }

  function applyTheme(nextTheme: Theme) {
    theme = nextTheme
    document.documentElement.dataset.theme = nextTheme
    const themeColor = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    themeColor?.setAttribute('content', themeColor.dataset[nextTheme] ?? themeColor.content)
    saveTheme(nextTheme)
  }

  function canAnimateThemeTransition() {
    return (
      'startViewTransition' in document
      && window.matchMedia?.('(prefers-reduced-motion: no-preference)').matches === true
    )
  }

  function prepareThemeTransition(nextTheme: Theme, clipPath: [string, string]) {
    const root = document.documentElement
    root.dataset.themeTransition = nextTheme
    root.style.setProperty(themeTransitionStartClip, clipPath[0])
    root.style.setProperty(themeTransitionEndClip, clipPath[1])
  }

  function cleanupThemeTransition() {
    const root = document.documentElement
    delete root.dataset.themeTransition
    root.style.removeProperty(themeTransitionStartClip)
    root.style.removeProperty(themeTransitionEndClip)
  }

  async function toggleTheme(event: MouseEvent) {
    if (isThemeTransitioning) {
      return
    }

    const currentTheme = theme
    const nextTheme = getNextTheme(currentTheme)

    if (!canAnimateThemeTransition()) {
      applyTheme(nextTheme)
      return
    }

    const clipPath = createThemeClipPath({
      x: event.clientX,
      y: event.clientY,
      width: window.innerWidth,
      height: window.innerHeight,
    })
    prepareThemeTransition(nextTheme, clipPath)
    isThemeTransitioning = true

    let transition: ViewTransition
    try {
      transition = document.startViewTransition(() => {
        applyTheme(nextTheme)
      })
    }
    catch {
      applyTheme(nextTheme)
      cleanupThemeTransition()
      isThemeTransitioning = false
      return
    }

    try {
      await transition.finished
    }
    finally {
      cleanupThemeTransition()
      isThemeTransitioning = false
    }
  }

  function closeLanguageMenu() {
    isLanguageOpen = false
  }

  function closeOnOutsidePointer(event: PointerEvent) {
    if (languageRoot && isLanguageOpen && event.target instanceof Node && !languageRoot.contains(event.target)) {
      closeLanguageMenu()
    }
  }

  function closeOnEscape(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      closeLanguageMenu()
    }
  }

  onMount(() => {
    applyTheme(resolveThemePreference(readStoredTheme()))

    document.addEventListener('pointerdown', closeOnOutsidePointer)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer)
      document.removeEventListener('keydown', closeOnEscape)
    }
  })
</script>

<div class="header-controls">
  <div class="language-switcher" bind:this={languageRoot}>
    <button
      class="ui-control-button"
      type="button"
      aria-label={labels.languageMenu}
      aria-haspopup="true"
      aria-expanded={isLanguageOpen}
      aria-controls="language-menu"
      onclick={() => (isLanguageOpen = !isLanguageOpen)}
    >
      <span class="i-lucide-languages shrink-0 size-4.75" aria-hidden="true"></span>
      <span class="language-label">{currentLabel}</span>
      <span class="i-lucide-chevron-down size-3.5" class:rotate-180={isLanguageOpen} aria-hidden="true"></span>
    </button>

    {#if isLanguageOpen}
      <div id="language-menu" class="language-menu" role="menu">
        {#each locales as locale (locale.locale)}
          <a
            class="language-menu__item"
            href={locale.href}
            role="menuitem"
            aria-current={locale.label === currentLabel ? 'page' : undefined}
            onclick={closeLanguageMenu}
          >
            {locale.label}
          </a>
        {/each}
      </div>
    {/if}
  </div>

  <button
    class="ui-icon-button theme-button"
    type="button"
    aria-label={themeLabel}
    disabled={isThemeTransitioning}
    onclick={toggleTheme}
  >
    <span class="theme-toggle-icon theme-toggle-icon--sun i-lucide-sun size-4.75" aria-hidden="true"></span>
    <span class="theme-toggle-icon theme-toggle-icon--moon i-lucide-moon size-4.75" aria-hidden="true"></span>
  </button>

  <a
    class="ui-icon-button"
    href={githubUrl}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={labels.github}
  >
    <span class="i-simple-icons-github size-5" aria-hidden="true"></span>
  </a>
</div>
