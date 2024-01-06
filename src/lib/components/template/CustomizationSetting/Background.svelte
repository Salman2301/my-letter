<script lang="ts">
	import TitleCustomization from "./TitleCustomization.svelte";
	import InputUploadBtn from "$lib/components/form/InputUploadBtn.svelte";
	import ButtonColor from "$lib/components/form/ButtonColor.svelte";
	import Dropdown, { type DropOptions } from "$lib/components/form/Dropdown.svelte";
	import { PlusCircleIcon, Trash2Icon } from "svelte-feather-icons";
  import { v4 as uuid } from "uuid";

  type Background = BackgroundColor | BackgroundImage;
  interface BackgroundColor {
    type: "color",
    value: string;
    id: string;
  }

  interface BackgroundImage {
    type: "image",
    src: string;
    mode: "repeat" | "cover",
    pos: {
      x: number;
      y: number;
    };
    id: string;
  }

  const defaultBackground = () => ({ type: "color", value: "#fff", id: uuid() })
  export let backgrounds: Background[] = [
    {
      type: "color",
      value: "#fff",
      id: uuid()
    }
  ];
  export let backgroundOpts: DropOptions[] = [
    {
      label: "Color",
      value: "color"
    },
    {
      label: "Image",
      value: "image"
    }
  ];

  function handleUploadFileIdx(idx: number) {
    return function handleUploadFile(ev: CustomEvent<{url: string}>) {
      const { url } = ev.detail;
      console.log(" upload file url : ", url)
    }
  }

  function handleNewBackground() {
    backgrounds = [
      ...backgrounds,
      {
        type: "color",
        value: "#fff",
        id: uuid()
      }
    ]

  }
  function handleRemoveId(id:string) {
    return function remove() {
      backgrounds = backgrounds.filter(item=>item.id!==id);
      backgrounds = backgrounds;
    }
  }

  function handleColorChangeIdx(idx: number) {
    return function handleColorChange(ev: CustomEvent<{ colorValue: string }>) {
        //@ts-expect-error ts error invalid error. ignore
        backgrounds[idx].value = ev.detail.colorValue;
    }
  }

  let colorValue: string = "#000";

</script>

<div class="background-container">
  <TitleCustomization content="Background" />
  <div class="buttons" >
    
    <button
      on:click={handleNewBackground}>
      <PlusCircleIcon />
    </button>

    <div class="backgrounds-panel-container">
      {#each backgrounds as background, idx (background.id)}
        <div class="background-setting">
          <div class="background-header">  
            <Dropdown
              options={backgroundOpts}
              bind:value={backgrounds[idx].type}
              theme="border"
            />

            <button
              class="trash-icon idx-{idx}"
              on:click={handleRemoveId(background.id)}
            >
              <Trash2Icon />
            </button>
          </div>
          {#if backgrounds[idx].type === "color"}
            <ButtonColor 
              label="Select a background"
              on:change={handleColorChangeIdx(idx)}
            />
          {:else}
            <InputUploadBtn
              on:upload={handleUploadFileIdx(idx)}
              bucket="user_background"
              label="Upload background"
            />
          {/if}
        </div>
      {/each}

    </div>
    
  </div>
</div>

<style lang="postcss">
  .buttons {
    @apply flex flex-col gap-2;
  }

  .background-setting {
    @apply flex flex-col gap-2 justify-end;
    @apply border-l border-secondary-foreground pl-2;
  }

  .background-header {
    @apply flex items-center justify-between;
  }

  .trash-icon.idx-0 {
    @apply invisible;
  }

  .backgrounds-panel-container {
    @apply pl-3;
    @apply flex flex-col gap-2;
  }

</style>