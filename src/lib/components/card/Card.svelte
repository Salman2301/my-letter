<script lang="ts">
  export let theme: "border" | "bg" = "bg";
  export let header: string = "";
</script>

<div
  class="card-container"
  class:theme-border={theme === "border"}
  class:theme-bg={theme === "bg"}
>
  <slot class="header" name="header">
    {#if header}
      {header}
    {/if}
  </slot>
  
  <slot></slot>
</div>

<style lang="postcss">
  .card-container {
    @apply p-4;
  }

  .theme-bg {
    @apply bg-secondary;
  }

  .theme-border {
    @apply border border-secondary-foreground;
  }
  
	.header {
		@apply text-center;
		@apply my-1;
	}
</style>