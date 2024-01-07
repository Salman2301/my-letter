<script lang="ts">
	import InputFour from './InputFour.svelte';
	import TitleCustomization from './TitleCustomization.svelte';
	import type { StrokeStyle } from '../types';
	
	export let topValue: number = 0;
	export let leftValue: number = 0;
	export let rightValue: number = 0;
	export let bottomValue: number = 0;

	export let topColorValue: string = "#000";
	export let leftColorValue: string = "#000";
	export let rightColorValue: string = "#000";
	export let bottomColorValue: string = "#000";

	export let topStroke: StrokeStyle = "solid";
	export let leftStroke: StrokeStyle = "solid";
	export let rightStroke: StrokeStyle = "solid";
	export let bottomStroke: StrokeStyle = "solid";
</script>

<div class="border-container">
	<TitleCustomization content="Border" />
	<InputFour 
		bind:topInputValue={topValue}
		bind:leftInputValue={leftValue}
		bind:rightInputValue={rightValue}
		bind:bottomInputValue={bottomValue}
		
		bind:topColorValue={topColorValue}
		bind:leftColorValue={leftColorValue}
		bind:rightColorValue={rightColorValue}
		bind:bottomColorValue={bottomColorValue}

		
		bind:topStroke={topStroke}
		bind:leftStroke={leftStroke}
		bind:rightStroke={rightStroke}
		bind:bottomStroke={bottomStroke}

	/>
</div>

<style lang="postcss">
	.border-container {
		@apply h-full w-full;
	}
</style>
