<script lang="ts">
	import { publicFile } from "$lib/helper";

  export let body: string = "";

  // TODO: Instead of background use template
  // export let background: string = publicFile("template_background", "blank.png");

  export let resizeWidth: number = 780;

  let aspectRatio = 1 / 1.41; // A4 sheet

</script>

<div
  class="letter-container"
  style="width:{resizeWidth}px;height:{resizeWidth/aspectRatio}px"
>
  <div
    class="letter"
    style="scale:{resizeWidth/780}"
  >
    <!-- <img src="{background}" alt="letter background"> -->
    <div class="content mce-content-body">{@html body}</div>
  </div>
</div>

<style lang="postcss" global>
  .letter-container {
    top: 0;
    left: 0;
    top: 0;
    position: sticky;
    aspect-ratio: 1 / 1.41;
  }
  .letter {
    @apply relative;
    width: 780px;
    aspect-ratio: 1 / 1.41;
    transform-origin:top left;
    @apply m-0;
    @apply bg-white;
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

</style>

