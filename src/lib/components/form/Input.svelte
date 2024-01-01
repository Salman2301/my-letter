<script lang="ts">
	import { genId } from "$lib/helper";
	import { onMount } from "svelte";
	import { iconMap } from "../icon/map.svelte";

  export let id = `id-${genId()}`;
  export let label: string = "Label";
  export let value: string = "";
  export let icon: keyof typeof iconMap | undefined = undefined;
  export let type: "email" | "password" | "text" = "text";

  let inputInstance: HTMLInputElement;
  onMount(()=>{
    if( type !== "text") inputInstance.type = type;
  })
</script>

<div class="input-container">
  <label class="label" for="id">{label} :</label>
  {#if icon}
    <div class="icon">
      <svelte:component this={iconMap[icon]} size="14"/>
    </div>
  {/if}
  <input type="text" bind:value id={id} bind:this={inputInstance}>
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
    @apply py-1.5 px-1;
    @apply border;
    @apply bg-background;
    @apply rounded-sm;
    @apply text-xs;
  }
</style>