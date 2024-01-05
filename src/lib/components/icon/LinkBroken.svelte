<script lang="ts">
	import { LinkIcon } from "svelte-feather-icons";

  export let size: string = "24";
</script>


<div class="cross-container">  
  <div class="cross"></div>
  <LinkIcon {size} />
</div>


<style lang="postcss">
  .cross-container {
    @apply relative;
  }
  .cross {
    @apply bg-red-500;
    width: 4px;
    @apply h-full;
    @apply absolute;
    rotate: -30deg;
    translate: 200%;
  }
</style>