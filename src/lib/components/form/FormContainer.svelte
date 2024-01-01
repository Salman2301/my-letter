<script lang="ts">
	import Button from "../button/Button.svelte";
  import Heading from "../text/Heading.svelte";
  import { fade } from 'svelte/transition';

  export let title: string = "";
  export let errorMessage: string = "";
  export let submitLabel: string = "Submit";
</script>

<form class="form-container" on:submit>
  {#if title}
    <Heading content={title}/>
  {/if}
  <slot></slot>
  
  {#if errorMessage}
    <div class="text-error" transition:fade>{errorMessage}</div>
  {/if}

  <div class="action-bar">
    <Button label={submitLabel}/>
  </div>
</form>

<style lang="postcss">
  .form-container {
    @apply bg-secondary;
    @apply border border-secondary rounded-md;
    @apply flex items-center justify-center;
    @apply flex-col;
    @apply gap-1;
    max-width: 680px;
    @apply pb-10 px-4 pt-2;
  }
  .text-error {
    @apply text-red-500;
    @apply font-semibold text-sm;
    @apply py-1;
  }

  .action-bar {
    @apply pt-2;
  }
</style>
