<script lang="ts">
	import { onMount } from "svelte";
	import { blankTemplate, templateList } from "../template";
	import type { TemplateConfig } from "../template/types";

  export let body: string = "";
  export let selectedTemplateId: string = "blank";
  export let config: TemplateConfig = blankTemplate; 

  export let resizeWidth: number = 780;

  let aspectRatio = 1 / 1.41; // A4 sheet
  let style: string = "";

  onMount(()=>{
    updateStyle();
  });

  $: if( selectedTemplateId ) {
    updateStyle();
  }

  function updateStyle() {
    style= "";
    // TODO: This is running multiple times on start
    config = templateList[selectedTemplateId];

    let styleArr: string[] = [];
    // let style
    styleArr.push(`margin-top:${config.margin.top.value}${config.margin.top.type}`)
    styleArr.push(`margin-bottom:${config.margin.bottom.value}${config.margin.bottom.type}`)
    styleArr.push(`margin-left:${config.margin.left.value}${config.margin.left.type}`)
    styleArr.push(`margin-right:${config.margin.right.value}${config.margin.right.type}`)

    
    styleArr.push(`padding-top:${config.padding.top.value}${config.padding.top.type}`)
    styleArr.push(`padding-bottom:${config.padding.bottom.value}${config.padding.bottom.type}`)
    styleArr.push(`padding-left:${config.padding.left.value}${config.padding.left.type}`)
    styleArr.push(`padding-right:${config.padding.right.value}${config.padding.right.type}`)

    styleArr.push(`border-top-width:${config.border.top.strokewidth}px`)
    styleArr.push(`border-bottom-width:${config.border.bottom.strokewidth}px`)
    styleArr.push(`border-left-width:${config.border.left.strokewidth}px`)
    styleArr.push(`border-right-width:${config.border.right.strokewidth}px`)

    styleArr.push(`border-top-color:${config.border.top.strokeColor}`)
    styleArr.push(`border-bottom-color:${config.border.bottom.strokeColor}`)
    styleArr.push(`border-left-color:${config.border.left.strokeColor}`)
    styleArr.push(`border-right-color:${config.border.right.strokeColor}`)

    config.background.forEach(bg=>{
      if(bg.type === "color-plain") {
        styleArr.push(`background-color:${bg.color}`)
        styleArr.push(`opacity:${bg.opacity}`)
      }
      else if (bg.type==="color-gradient") {
        // TOOD: HANDLE
      }
      else if (bg.type==="image") {
        styleArr.push(`background-image: url("${bg.src}")`);
        styleArr.push(`background-image: url("${bg.stretch}")`);
        if(bg.size && bg.size.height && bg.size.width ) styleArr.push(`background-size:${bg.size.width} ${bg.size.height}`);
      }
    });

    if(config.fontColor) styleArr.push(`color:${config.fontColor}`);
    if(config.fontFamily) styleArr.push(`font-family:${config.fontFamily}`);
    
    style = styleArr.join(";")
  }

  

</script>

<div
  class="letter-container"
  style="width:{resizeWidth}px;height:{resizeWidth/aspectRatio}px"
>
  <div
    class="letter"
    style="scale:{resizeWidth/780};{style}"
  >
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
    /* @apply text-black; */
    @apply w-full;
    @apply h-full;
  }

</style>

