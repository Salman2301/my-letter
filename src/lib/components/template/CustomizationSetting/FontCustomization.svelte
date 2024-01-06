<script lang="ts">
	import Dropdown, { type DropOptions } from '$lib/components/form/Dropdown.svelte';
	import { genId } from '$lib/helper';
	import TitleCustomization from './TitleCustomization.svelte';

	export let dropOpts: DropOptions[] = [
  { label: 'Andalé Mono', value: 'Andalé Mono' },
  { label: 'Arial', value: 'Arial' },
  { label: 'Arial Black', value: 'Arial Black' },
  { label: 'Baskerville', value: 'Baskerville' },
  { label: 'Bradley Hand', value: 'Bradley Hand' },
  { label: 'Brush Script MT', value: 'Brush Script MT' },
  { label: 'Comic Sans MS', value: 'Comic Sans MS' },
  { label: 'Courier', value: 'Courier' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Gill Sans', value: 'Gill Sans' },
  { label: 'Helvetica', value: 'Helvetica' },
  { label: 'Impact', value: 'Impact' },
  { label: 'Lucida', value: 'Lucida' },
  { label: 'Luminari', value: 'Luminari' },
  { label: 'Monaco', value: 'Monaco' },
  { label: 'Palatino', value: 'Palatino' },
  { label: 'Tahoma', value: 'Tahoma' },
  { label: 'Times New Roman', value: 'Times New Roman'},
  { label: 'Trebuchet MS', value: 'Trebuchet MS' },
  { label: 'Verdana', value: 'Verdana' }
];

	export let fontFamily: string = 'Helvetica';
	export let fontSize: number = 18;
	let id: string = genId();
</script>

<div class="drop-font-family">
	<label for="drop-{id}">
		<TitleCustomization content="Select a font" />
	</label>
	<div class="font-style">
		<Dropdown options={dropOpts} bind:value={fontFamily} id="drop-{id}" />
		<div class="input-font-size-px">
			<input type="number" min="12" bind:value={fontSize} class="font-input" id="input-{id}" />

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
		@apply bg-transparent;
		@apply border border-secondary;
		width: 70px;
		@apply z-10;
	}

	.suffix {
		@apply absolute;
		@apply float-right;
		@apply w-full;
		@apply text-right;
		@apply pr-5;
	}
</style>
