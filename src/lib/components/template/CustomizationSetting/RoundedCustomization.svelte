<script lang="ts">
	import InputFour from './InputFour.svelte';
	import TitleCustomization from './TitleCustomization.svelte';

	export let topValue: number = 0;
	export let leftValue: number = 0;
	export let rightValue: number = 0;
	export let bottomValue: number = 0;
</script>

<div class="rounded-container">
	<TitleCustomization content="Rounded corner" />
	<InputFour
		hasColorInput={false}
		hasStrokeInput={false}
		bind:topInputValue={topValue}
		bind:leftInputValue={leftValue}
		bind:rightInputValue={rightValue}
		bind:bottomInputValue={bottomValue}
	/>
</div>

<style lang="postcss">
	.rounded-container {
		@apply h-full w-full;
	}
</style>
