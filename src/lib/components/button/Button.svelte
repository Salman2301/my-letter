<script lang="ts">
  export let label: string = "Button";
  export let variant: string = "";
</script>

<button class="button {variant}" on:click >
  {label}
</button>

<style lang="postcss">
  button {
    @apply text-sm;
    @apply bg-primary;
    @apply px-4 py-1;
    @apply rounded-sm;
  }
  button:hover {
    @apply underline;
  }
</style>
