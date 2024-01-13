<script lang="ts">
	import type { NumberCssUnit } from '$lib/components/template/types';
	import InputFour from './InputFour.svelte';
	import TitleCustomization from './TitleCustomization.svelte';

	export let topLeftValue: number = 0;
	export let topRightValue: number = 0;
	export let bottomLeftValue: number = 0;
	export let bottomRightValue: number = 0;

	export let topLeftUnit: NumberCssUnit = "px";
	export let topRightUnit: NumberCssUnit = "px";
	export let bottomLeftUnit: NumberCssUnit = "px";
	export let bottomRightUnit: NumberCssUnit = "px";
</script>

<div class="rounded-container">
	<TitleCustomization content="Rounded corner" />
	<InputFour
		hasColorInput={false}
		hasStrokeInput={false}
		corner={true}
		bind:oneInputValue={topLeftValue}
		bind:twoInputValue={topRightValue}
		bind:threeInputValue={bottomLeftValue}
		bind:fourInputValue={bottomRightValue}

		bind:oneInputUnit={topLeftUnit}
		bind:twoInputUnit={topRightUnit}
		bind:threeInputUnit={bottomLeftUnit}
		bind:fourInputUnit={bottomRightUnit}
	/>
</div>

<style lang="postcss">
	.rounded-container {
		@apply h-full w-full;
	}
</style>
