<script lang="ts" context="module">
  export type InputType = "color" | "input" | "stroke";
  export type Stroke = "solid" | "dashed" | "dotted" | "none";
  
  export type EventOnChange =
    { event: any, type: "color", value: string } |
    { event: any, type: "input", value: number } |
    { event: any, type: "stroke", value: Stroke }
    
</script>

<script lang="ts">
	import Dropdown, { type DropOptions } from "$lib/components/form/Dropdown.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let hasColorInput: boolean = true;
  export let hasNumberInput: boolean = true;
  export let hasStrokeInput: boolean = true;
  
  export let colorValue: string = "#fff";
  export let inputValue: number = 0;
  export let strokeValue: Stroke  = "solid";

  export let dropStrokeOptions: DropOptions[] = [
    {
      label: "Solid",
      value: "solid"
    },
    {
      label: "Dashed",
      value: "dashed"
    },
    {
      label: "Dotted",
      value: "dotted"
    },
    {
      label: "None",
      value: "none"
    }
  ]


  function handleColorChange(event: any) {
    dispatch("change", { event, type: "color", value: colorValue })
    dispatch("color", { event, type: "color", value: colorValue })
  }

  function handleInputChange(event: any) {
    dispatch("change", { event, type: "input", value: inputValue })
    dispatch("input", { event, type: "input", value: inputValue })
  }

  function handleStrokeChange(event: any) {
    dispatch("change", { event, type: "stroke", value: strokeValue })
    dispatch("stroke", { event, type: "stroke", value: strokeValue })
  }

  $: console.log({ inputValue })
</script>

<div class="input-container">
  {#if hasColorInput }
    <input type="color" bind:value={colorValue} style="width:30px" on:change={handleColorChange}>
  {/if}
  {#if hasNumberInput }
    <input type="number"bind:value={inputValue} style="width:30px" on:change={handleInputChange}>
  {/if}
  {#if hasStrokeInput }
    <Dropdown options={dropStrokeOptions} on:change={handleStrokeChange}/>
  {/if}
</div>

<style lang="postcss">
  .input-container {
    @apply flex items-center;
    @apply gap-2;;
  }
  input {
    @apply bg-background;
    @apply text-center;
  }
</style>