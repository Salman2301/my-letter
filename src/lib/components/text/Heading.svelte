<script lang="ts">
  export let content: string= "text"
</script>

<h1>{content}</h1>

<style lang="postcss">
  h1 {
    @apply text-lg;
  }
</style>
