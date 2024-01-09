<script lang="ts">
	import InputFour from './InputFour.svelte';
	import TitleCustomization from './TitleCustomization.svelte';

	export let topValue: number = 0;
	export let leftValue: number = 0;
	export let rightValue: number = 0;
	export let bottomValue: number = 0;
</script>

<div class="padding-container">
	<TitleCustomization content="Padding" textCenter={true} />
	<InputFour
		hasColorInput={false}
		hasStrokeInput={false}		
		bind:oneInputValue={topValue}
		bind:twoInputValue={leftValue}
		bind:threeInputValue={rightValue}
		bind:fourInputValue={bottomValue}
	/>
</div>

<style lang="postcss">
	.padding-container {
		@apply h-full w-full;
	}
</style>
