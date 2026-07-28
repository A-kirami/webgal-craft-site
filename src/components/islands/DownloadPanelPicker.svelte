<script lang="ts">
  import { onMount } from 'svelte'

  import { releasePublishedDate, releaseVersion, type DownloadOption, type DownloadOptionKey } from '~/data/downloads'

  import { detectClientRecommendedPlatform } from './download-platform'
  import PlatformIcon from './PlatformIcon.svelte'


  interface DownloadPanelPickerLabels {
    recommended: string
    otherPlatforms: string
    otherVariants: string
    releasePublished?: string
    releaseNotes?: string
  }

  interface Props {
    options: DownloadOption[]
    labels: DownloadPanelPickerLabels
    releaseUrl?: string
  }

  let { options, labels, releaseUrl }: Props = $props()
  let selectedKey = $state<DownloadOptionKey>('windows')

  const selectedOption = $derived(options.find(option => option.key === selectedKey) ?? options[0])
  const sameFamilyOthers = $derived(
    options.filter(option => option.family === selectedOption.family && option.key !== selectedOption.key),
  )

  const familyOptions = $derived(
    options.filter(
      (option, index) => options.findIndex(candidate => candidate.family === option.family) === index,
    ),
  )

  onMount(() => {
    void detectClientRecommendedPlatform().then((platform) => {
      if (!platform) {
        return
      }
      selectedKey = platform
    })
  })
</script>

<div class="panel-picker">
  <div class="panel-platforms" role="group" aria-label={labels.otherPlatforms}>
    {#each familyOptions as option (option.family)}
      <button
        class="panel-platform"
        class:panel-platform--selected={selectedOption.family === option.family}
        type="button"
        aria-pressed={selectedOption.family === option.family}
        onclick={() => (selectedKey = option.key)}
      >
        <PlatformIcon family={option.family} />
        <span>{option.shortLabel}</span>
      </button>
    {/each}
  </div>

  <a
    class="panel-download"
    href={selectedOption.href}
    target="_blank"
    rel="noopener noreferrer"
  >
    <span class="panel-download__icon" aria-hidden="true">
      <PlatformIcon family={selectedOption.family} />
    </span>
    <span class="panel-download__body">
      <span class="panel-download__title">{selectedOption.actionLabel}</span>
      <span class="panel-download__meta">WebGAL Craft {releaseVersion} · {selectedOption.description}</span>
    </span>
    <span class="panel-download__perforation" aria-hidden="true"></span>
    <span class="panel-download__badge">{labels.recommended}</span>
  </a>

  {#if sameFamilyOthers.length > 0}
    <div class="panel-alternatives">
      <span class="panel-alternatives__label">{labels.otherVariants}</span>
      <span class="panel-alternatives__list">
        {#each sameFamilyOthers as option (option.key)}
          <a
            class="panel-alternatives__link"
            href={option.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="panel-alternatives__link-text">{option.label}</span>
            <span class="panel-alternatives__link-arrow i-solar:arrow-down-line-duotone" aria-hidden="true"></span>
          </a>
        {/each}
      </span>
    </div>
  {/if}

  <p class="panel-release">
    {#if labels.releasePublished}<span>{labels.releasePublished} {releasePublishedDate}</span>{/if}
    {#if releaseUrl && labels.releaseNotes}
      <span class="panel-release__sep">·</span>
      <a
        class="panel-release__link"
        href={releaseUrl}
        target="_blank"
        rel="noopener noreferrer"
      >{labels.releaseNotes}</a>
    {/if}
  </p>
</div>
