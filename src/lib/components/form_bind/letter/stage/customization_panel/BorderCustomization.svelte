<script lang="ts">
	import InputFour from './InputFour.svelte';
	import TitleCustomization from './TitleCustomization.svelte';

	import type { StrokeStyle } from '$lib/components/template/types';

	export let topValue: number = 0;
	export let leftValue: number = 0;
	export let rightValue: number = 0;
	export let bottomValue: number = 0;

	export let topColorValue: string = '#000';
	export let leftColorValue: string = '#000';
	export let rightColorValue: string = '#000';
	export let bottomColorValue: string = '#000';

	export let topStroke: StrokeStyle = 'solid';
	export let leftStroke: StrokeStyle = 'solid';
	export let rightStroke: StrokeStyle = 'solid';
	export let bottomStroke: StrokeStyle = 'solid';
</script>

<div class="border-container">
	<TitleCustomization content="Border" />
	<InputFour
		bind:oneInputValue={topValue}
		bind:twoInputValue={leftValue}
		bind:threeInputValue={rightValue}
		bind:fourInputValue={bottomValue}
		bind:oneColorValue={topColorValue}
		bind:twoColorValue={leftColorValue}
		bind:threeColorValue={rightColorValue}
		bind:fourColorValue={bottomColorValue}
		bind:oneStroke={topStroke}
		bind:twoStroke={leftStroke}
		bind:threeStroke={rightStroke}
		bind:fourStroke={bottomStroke}
	/>
</div>

<style lang="postcss">
	.border-container {
		@apply h-full w-full;
	}
</style>
