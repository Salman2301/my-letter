<script lang="ts">
	import ButtonColor from '$lib/components/form/ButtonColor.svelte';
	import Dropdown, { type DropOptions } from '$lib/components/form/Dropdown.svelte';
	import TitleCustomization from './TitleCustomization.svelte';
	import defaultFont from './defaultFontList';
	import { genId } from '$lib/helper';

	let dropOpts: DropOptions[] = defaultFont;

	export let fontFamily: string = 'Helvetica';
	export let fontSizeValue: number = 18;
	export let fontSizeUnit: 'px' | 'rem' = 'px';
	export let fontColor: string = '#000';
	let id: string = genId();
</script>

<div class="drop-font-family">
	<label for="drop-{id}">
		<TitleCustomization content="Select a font" />
	</label>
	<div class="font-color">
		<ButtonColor bind:colorValue={fontColor} label="Font color" />
	</div>
	<div class="font-style">
		<Dropdown options={dropOpts} bind:value={fontFamily} id="drop-{id}" />
		<div class="input-font-size-px">
			<input type="number" min="12" bind:value={fontSizeValue} class="font-input" id="input-{id}" />

			<label for="input-{id}" class="suffix px">
				{fontSizeUnit}
			</label>
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
