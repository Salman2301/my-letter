<script lang="ts">
	import { genId } from "$lib/helper";
	import { onMount } from "svelte";
	import { iconMap } from "../icon/map.svelte";

  export let id = `id-${genId()}`;
  export let label: string = "Label";
  export let value: string = "";
  export let icon: keyof typeof iconMap | undefined = undefined;
  export let type: "email" | "password" | "text" | "phone"= "text";
  export let disabled: boolean = false;
  export let maxInputWidth: boolean = false;
  export let theme: "light"| "default" = "default"; 

  export let options: string[] = [];

  let inputInstance: HTMLInputElement;
  onMount(()=>{
    if( type !== "text") inputInstance.type = type;
  })
</script>

<div
  class="input-container"
  class:theme-default={theme==="default"}
  class:theme-light={theme==="light"}
>
  <label class="label" for="id">{label} :</label>
  {#if icon}
    <div class="icon">
      <svelte:component this={iconMap[icon]} size="14"/>
    </div>
  {/if}
  <input type="text" class:max-width={maxInputWidth} bind:value id={id} bind:this={inputInstance} {disabled} list="list-{id}">
  
  <datalist id="list-{id}">
    {#each options as item}
      <option value="{item}"></option>
    {/each}
  </datalist>

</div>

<style lang="postcss">
  .input-container {
    @apply flex flex-col;
    @apply gap-1;
  }
  .label {
    @apply text-xs;
    @apply font-bold;
    @apply mt-1;
  }

  input {
    width: 280px;
    @apply py-1.5 px-2;
    @apply text-xs;
  }
  .max-width {
    @apply min-w-full;
  }
  
  .input-container:has( > .max-width ) {
    @apply min-w-full;
  }

  input:disabled {
    @apply cursor-not-allowed;
  }

  .input-container.theme-default > input {
    @apply border border-background;
    @apply bg-background;
    @apply rounded-sm;
    @apply text-secondary-foreground;
  }
  
  .input-container.theme-light > input {
    @apply border border-background;
    @apply bg-secondary-foreground;
    @apply rounded-sm;
    @apply text-background;
  }
</style>