<script lang="ts">
	import InputFour from './InputFour.svelte';
	import TitleCustomization from './TitleCustomization.svelte';

	export let topValue: number = 0;
	export let leftValue: number = 0;
	export let rightValue: number = 0;
	export let bottomValue: number = 0;
</script>

<div class="margin-container">
	<TitleCustomization content="Margin" textCenter={true} />
	<InputFour hasColorInput={false} hasStrokeInput={false}
		bind:topInputValue={topValue}
		bind:leftInputValue={leftValue}
		bind:rightInputValue={rightValue}
		bind:bottomInputValue={bottomValue}
	/>
</div>

<style lang="postcss">
	.margin-container {
		@apply h-full w-full;
	}
</style>
