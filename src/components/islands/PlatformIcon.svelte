<script lang="ts">
  import { type PlatformFamily } from '~/data/downloads'

  interface Props {
    family: PlatformFamily
  }

  let { family }: Props = $props()
</script>

<!-- 图标类必须保持静态，UnoCSS 才能在构建阶段生成对应规则。 -->
{#if family === 'windows'}
  <span class="i-simple-icons:windows10 shrink-0 size-4.5" aria-hidden="true"></span>
{:else if family === 'macos'}
  <span class="i-simple-icons:apple shrink-0 size-4.5" aria-hidden="true"></span>
{:else}
  <span class="i-simple-icons:linux shrink-0 size-4.5" aria-hidden="true"></span>
{/if}
