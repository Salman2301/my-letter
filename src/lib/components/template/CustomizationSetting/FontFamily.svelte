<script lang="ts">
	import Dropdown, { type DropOptions} from "$lib/components/form/Dropdown.svelte";
	import { genId } from "$lib/helper";
	import TitleCustomization from "./TitleCustomization.svelte";

  export let dropOpts: DropOptions[] =[
    {
      label: "Helvetica",
      value: "Helvetica"
    },
    {
      label: "Arial",
      value: "Arial"
    },
    {
      label: "Arial Black",
      value: "Arial Black"
    },
    {
      label: "Verdana",
      value: "Verdana"
    },
    {
      label: "Tahoma",
      value: "Tahoma"
    },
    {
      label: "Trebuchet MS",
      value: "Trebuchet MS"
    },
    {
      label: "Impact",
      value: "Impact"
    },
    {
      label: "Gill Sans",
      value: "Gill Sans"
    },
    {
      label: "Times New Roman",
      value: "Times New Roman"
    },
    {
      label: "Georgia",
      value: "Georgia"
    },
    {
      label: "Palatino",
      value: "Palatino"
    },
    {
      label: "Baskerville",
      value: "Baskerville"
    },
    {
      label: "Andalé Mono",
      value: "Andalé Mono"
    },
    {
      label: "Courier",
      value: "Courier"
    },
    {
      label: "Lucida",
      value: "Lucida"
    },
    {
      label: "Monaco",
      value: "Monaco"
    },
    {
      label: "Bradley Hand",
      value: "Bradley Hand"
    },
    {
      label: "Brush Script MT",
      value: "Brush Script MT"
    },
    {
      label: "Luminari",
      value: "Luminari"
    },
    {
      label: "Comic Sans MS",
      value: "Comic Sans MS"
    }
  ]

  export let fontFamily: string = "Helvetica";
  export let fontSize: number = 18;
  let id: string = genId();

</script>

<div class="drop-font-family">
  <label for="drop-{id}">
    <TitleCustomization content="Select a font"/>
  </label>
  <div class="font-style">
    <Dropdown 
      options={dropOpts}
      bind:value={fontFamily}
      id="drop-{id}"
    />
    <div class="input-font-size-px">
      <input
        type="number"
        min="12"
        bind:value={fontSize}
        class="font-input"
        id="input-{id}"
      />

      <label for="input-{id}" class="suffix px">px</label>
    </div>
  </div>
</div>

<style lang="postcss">
  .drop-font-family {
    @apply flex flex-col gap-2;
  }

  .font-style {
    @apply flex justify-between;
    @apply gap-4;
  }
  .input-font-size-px {
    @apply relative;
    @apply flex items-center;
  }
  .font-input {
    @apply bg-secondary;
    @apply border border-secondary;
    width: 70px;
  }

  .suffix {
    @apply absolute;
    @apply float-right;
    @apply w-full;
    @apply text-right;
    @apply pr-5;
  }
</style>