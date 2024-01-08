<script lang="ts">
	import { genId } from '$lib/helper';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let checked: boolean = false;
	export let label: string = "";
	export let hasLabel: boolean = !!label;
	export let id: string = `checkbox_${genId()}`;

	function handleChange() {
		dispatch('checked', { checked });
	}
</script>

<div class="checkbox-container">
	<input type="checkbox" bind:checked id="{id}" on:change={handleChange} />
	{#if hasLabel && label}
		<slot name="label">
			<label for="{id}">{label}</label>
		</slot>
	{/if}
</div>

<style lang="postcss">
	.checkbox-container {
		@apply flex gap-2 items-center;
	}
	label {
		@apply select-none;
	}
</style>
