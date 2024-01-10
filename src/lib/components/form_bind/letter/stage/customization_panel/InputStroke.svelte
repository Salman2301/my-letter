<script lang="ts" context="module">
	import type { StrokeStyle } from '$lib/components/template/types';

	export type InputType = 'color' | 'input' | 'stroke';

	export type EventOnChange =
		| { event: any; type: 'color'; value: string }
		| { event: any; type: 'input'; value: number }
		| { event: any; type: 'stroke'; value: StrokeStyle };
</script>

<script lang="ts">
	import Dropdown, { type DropOptions } from '$lib/components/form/Dropdown.svelte';
	import InputColor from '$lib/components/form/InputColor.svelte';
	import { genId } from '$lib/helper';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let id = genId();
	export let hasColorInput: boolean = true;
	export let hasNumberInput: boolean = true;
	export let hasStrokeInput: boolean = true;

	export let colorValue: string = '#fff';
	export let inputValue: number = 0;
	export let strokeValue: StrokeStyle = 'solid';

	export let dropStrokeOptions: DropOptions[] = [
		{
			label: 'Solid',
			value: 'solid'
		},
		{
			label: 'Dashed',
			value: 'dashed'
		},
		{
			label: 'Dotted',
			value: 'dotted'
		},
		{
			label: 'double',
			value: 'Double'
		},
		{
			label: 'groove',
			value: 'Groove'
		},
		{
			label: 'ridge',
			value: 'Ridge'
		},
		{
			label: 'inset',
			value: 'Inset'
		},
		{
			label: 'outset',
			value: 'Outset'
		},
		{
			label: 'None',
			value: 'none'
		}
	];

	function handleColorChange(event: any) {
		dispatch('change', { event, type: 'color', value: colorValue });
		dispatch('color', { event, type: 'color', value: colorValue });
	}

	function handleInputChange(event: any) {
		dispatch('change', { event, type: 'input', value: inputValue });
		dispatch('input', { event, type: 'input', value: inputValue });
	}

	function handleStrokeChange(event: any) {
		dispatch('change', { event, type: 'stroke', value: strokeValue });
		dispatch('stroke', { event, type: 'stroke', value: strokeValue });
	}
</script>

<div class="input-container">
	{#if hasColorInput}
		<InputColor bind:colorValue on:change={handleColorChange} />
	{/if}
	{#if hasNumberInput}
		<input
			type="number"
			class="num-input"
			bind:value={inputValue}
			on:change={handleInputChange}
			min="0"
		/>
	{/if}
	{#if hasStrokeInput}
		<Dropdown
			options={dropStrokeOptions}
			on:change={handleStrokeChange}
			theme="border"
			bind:value={strokeValue}
		/>
	{/if}
</div>

<style lang="postcss">
	.input-container {
		@apply flex items-center justify-center;
		@apply gap-x-1 gap-y-2;
	}
	.num-input {
		@apply border border-background bg-secondary;
		@apply text-center;
		@apply pl-2;
		height: 30px;
		width: 50px;
	}
	.input-color {
		width: 40px;
		height: 40px;
	}
	.label-input-color {
		width: 20px;
		height: 20px;
		@apply rounded-full;
		@apply border border-gray-300;
	}
</style>
