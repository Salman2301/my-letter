<script lang="ts">
	import { genId } from "$lib/helper";
	import { PlusIcon, RefreshCcwIcon, XIcon } from "svelte-feather-icons";

  export let id: string = genId();
  export let fileInput: HTMLInputElement| undefined = undefined;
  export let files: FileList | undefined = undefined;
  export let previewImageValue: string | undefined = undefined;
  export let currentImageValue: string | undefined = undefined;
  
  $: isFileSelected = files && (files.length > 0);

  function reset() {
    files=undefined;
    previewImageValue = undefined;
    if(fileInput) fileInput.value = "";
  }

  function handleChange() {
    if( !files?.length ) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files[0]);
    fileReader.addEventListener("load", function () {
      previewImageValue = this.result as string;
    });    
  }
</script>

<div class="image">
  {#if currentImageValue || previewImageValue}
    <img src={previewImageValue||currentImageValue} alt="preview" />
  {/if}
  <label class="icon" for="image-{id}">
    {#if isFileSelected}
      <RefreshCcwIcon />
    {:else}
      <PlusIcon />
    {/if}
  </label>
  <input
    id="image-{id}"
    type="file"
    multiple={false}
    accept="image/png, image/jpeg"
    hidden
    bind:files={files}
    bind:this={fileInput}
    on:change={handleChange}
  />
  
</div>

{#if isFileSelected}
  <button class="btn" type="button" on:click={reset}>Clear</button>
{/if}

<style lang="postcss">
  .image {
    @apply bg-gray-500;
    @apply border border-gray-500;
    @apply rounded-full;
    @apply cursor-pointer;
    @apply flex flex-col items-center;
    min-width: 80px;
    min-height: 80px;
    @apply relative;
  
  }
  
  .icon {
    @apply flex items-center justify-center;
    @apply w-full h-full;
    @apply absolute;
  }

  img {
    min-width: 80px;
    min-height: 80px;  
    width: 80px;
    height: 80px;
    filter: brightness(0.8)
  }

  button {
    @apply text-xs;
    @apply bg-primary;
    @apply text-secondary-foreground;
    @apply hover:bg-primary-foreground;
    @apply px-4 py-1;
    @apply rounded-sm;

  }
</style>