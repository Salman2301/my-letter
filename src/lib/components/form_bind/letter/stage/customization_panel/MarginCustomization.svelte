<script lang="ts">
	import InputFour from './InputFour.svelte';
	import TitleCustomization from './TitleCustomization.svelte';
	import type { NumberCssUnit } from '$lib/components/template/types';

	export let topValue: number = 0;
	export let leftValue: number = 0;
	export let rightValue: number = 0;
	export let bottomValue: number = 0;

	export let topUnit: NumberCssUnit = "px";
	export let leftUnit: NumberCssUnit = "px";
	export let rightUnit: NumberCssUnit = "px";
	export let bottomUnit: NumberCssUnit = "px";
</script>

<div class="margin-container">
	<TitleCustomization content="Margin" textCenter={true} />
	<InputFour
		hasColorInput={false}
		hasStrokeInput={false}
		bind:oneInputValue={topValue}
		bind:twoInputValue={leftValue}
		bind:threeInputValue={rightValue}
		bind:fourInputValue={bottomValue}

		bind:oneInputUnit={topUnit}
		bind:twoInputUnit={leftUnit}
		bind:threeInputUnit={rightUnit}
		bind:fourInputUnit={bottomUnit}
	/>
</div>

<style lang="postcss">
	.margin-container {
		@apply h-full w-full;
	}
</style>
