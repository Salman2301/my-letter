<script lang="ts">
	import { publicFile } from "$lib/helper";

  export let body: string = "";
  export let background: string = publicFile("template_background", "blank.png"); 
</script>

<div class="letter-container">
  <div class="letter">
    <img src="{background}" alt="letter background">
    <div class="content mce-content-body">{@html body}</div>
  </div>
</div>

<style lang="postcss" global>
  .letter-container {
    width: 400px;
    top: 0;
    left: 0;
    aspect-ratio: 1 / 1.41;
    top: 0;
    position: sticky;
    height: 500px;
  }
  .letter {
    @apply relative;
    width: 780px;
    aspect-ratio: 1 / 1.41;
    scale: 0.51;
    transform-origin:top left;
  }
  img {
    @apply absolute;
    @apply w-full h-full;
  }
  .content {
    @apply absolute;
    @apply text-black;
    @apply w-full;
    @apply h-full;
  }
  .letter {
    @apply m-2;
  }

</style>

