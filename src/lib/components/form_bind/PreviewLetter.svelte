<script lang="ts">
	import { publicFile } from "$lib/helper";

  export let body: string = "";
  export let background: string = publicFile("template_background", "blank.png");

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
    <img src="{background}" alt="letter background">
    <div class="content mce-content-body">{@html body}</div>
  </div>
</div>

<style lang="postcss" global>
  .letter-container {
    top: 0;
    left: 0;
    top: 0;
    position: sticky;
    /* width: 400px; */
    aspect-ratio: 1 / 1.41;
    /* height: 564px; */
  }
  .letter {
    @apply relative;
    width: 780px;
    aspect-ratio: 1 / 1.41;
    /* scale: 0.51; */
    transform-origin:top left;
    @apply m-0;
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

