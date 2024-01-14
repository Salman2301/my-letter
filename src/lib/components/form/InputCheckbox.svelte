<script lang="ts">
	import { genId } from '$lib/helper';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let checked: boolean | null | undefined = false;
	export let label: string = '';
	export let hasLabel: boolean = !!label;
	export let id: string = `checkbox_${genId()}`;

	function handleChange() {
		dispatch('change', { checked });
		if(checked) dispatch('check', { checked });
		else  dispatch('uncheck', { checked });
	}
</script>

<div class="checkbox-container">
	<input type="checkbox" bind:checked={checked} {id} on:change={handleChange} />
	{#if hasLabel && label}
		<slot name="label">
			<label for={id}>{label}</label>
		</slot>
	{/if}
</div>

<style lang="postcss">
	.checkbox-container {
		@apply flex items-center gap-2;
	}
	label {
		@apply select-none;
	}
</style>
