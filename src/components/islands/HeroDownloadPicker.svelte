<script lang="ts">
  import { onMount } from 'svelte'

  import { type DownloadOption, type DownloadOptionKey } from '~/data/downloads'

  import { detectClientRecommendedPlatform } from './download-platform'
  import PlatformIcon from './PlatformIcon.svelte'


  interface HeroDownloadPickerLabels {
    otherPlatforms: string
  }

  interface Props {
    options: DownloadOption[]
    labels: HeroDownloadPickerLabels
  }

  let { options, labels }: Props = $props()
  let pickerRoot: HTMLDivElement | undefined = $state()
  let menuButton: HTMLButtonElement | undefined = $state()
  let isMenuOpen = $state(false)
  let selectedKey = $state<DownloadOptionKey>('windows')

  const selectedOption = $derived(options.find(option => option.key === selectedKey) ?? options[0])

  function closeMenu(restoreFocus = false) {
    isMenuOpen = false
    if (restoreFocus) {
      menuButton?.focus()
    }
  }

  function closeOnOutsidePointer(event: PointerEvent) {
    if (pickerRoot && isMenuOpen && event.target instanceof Node && !pickerRoot.contains(event.target)) {
      closeMenu()
    }
  }

  function closeOnEscape(event: KeyboardEvent) {
    if (isMenuOpen && event.key === 'Escape') {
      closeMenu(true)
    }
  }

  onMount(() => {
    void detectClientRecommendedPlatform().then((platform) => {
      if (!platform) {
        return
      }
      selectedKey = platform
    })
    document.addEventListener('pointerdown', closeOnOutsidePointer)
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer)
      document.removeEventListener('keydown', closeOnEscape)
    }
  })
</script>

<div class="hero-picker" bind:this={pickerRoot}>
  <div class="hero-picker__actions">
    <a
      class="download-button hero-picker__download"
      href={selectedOption.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <PlatformIcon family={selectedOption.family} />
      <span>{selectedOption.actionLabel}</span>
    </a>
    <button
      bind:this={menuButton}
      class="hero-picker__menu-button"
      type="button"
      aria-label={labels.otherPlatforms}
      aria-expanded={isMenuOpen}
      aria-controls="hero-download-menu"
      onclick={() => (isMenuOpen = !isMenuOpen)}
    >
      <span class="i-lucide-chevron-down size-4" class:rotate-180={isMenuOpen} aria-hidden="true"></span>
    </button>
  </div>

  {#if isMenuOpen}
    <div id="hero-download-menu" class="hero-menu">
      {#each options as option (option.key)}
        <a
          class:hero-menu__item--selected={option.key === selectedKey}
          class="hero-menu__item"
          href={option.href}
          target="_blank"
          rel="noopener noreferrer"
          onclick={() => closeMenu()}
        >
          <PlatformIcon family={option.family} />
          <span class="hero-menu__copy">
            <strong class="hero-menu__label">{option.label}</strong>
            <small class="hero-menu__description">{option.description}</small>
          </span>
        </a>
      {/each}
    </div>
  {/if}
</div>
