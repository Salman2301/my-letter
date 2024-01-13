<script lang="ts">
	import type { NumberCssUnit } from '$lib/components/template/types';
	import { createEventDispatcher } from 'svelte';

	export let value: number = 0;
	export let availableUnits: NumberCssUnit[] = ['px', 'rem', '%'];
	export let unitLabel: NumberCssUnit = 'px';

	const dispatch = createEventDispatcher();

	function handleTypeClick() {
		let index = availableUnits.indexOf(unitLabel);
		if (index + 1 >= availableUnits.length) index = 0;
		else index = index + 1;

		unitLabel = availableUnits[index];
		dispatch('unitChange', unitLabel);
	}
</script>

<div class="input-type-container">
	<input
		type="number"
		class="num-input"
		bind:value
		on:change={() => dispatch('valueChange', value)}
		min="0"
	/>
	<button class="unit-label" on:click={handleTypeClick}>{unitLabel}</button>
</div>

<style lang="postcss">
	.input-type-container {
		@apply flex gap-1;
		@apply border border-background bg-secondary;
	}
	.num-input {
		@apply bg-secondary;
		@apply text-center;
		@apply pl-2;
		height: 30px;
		width: 40px;
		@apply text-xs;
	}
	.unit-label {
		@apply flex items-center justify-start;
		@apply cursor-pointer;
		width: 24px;
		@apply mr-1;
	}
</style>
