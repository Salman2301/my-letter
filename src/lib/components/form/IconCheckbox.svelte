<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { CheckSquareIcon, SquareIcon } from 'svelte-feather-icons';

	const dispatch = createEventDispatcher();
	export let isChecked: boolean = false;
	export let isDisabled: boolean = false;

	function toggleCheck() {
		if (isDisabled) return;
		isChecked = !isChecked;

		dispatch('change', { isChecked });
		dispatch(isChecked ? 'checked' : 'unchecked', { isChecked });
	}
</script>

<button class="icon-checkbox-container" on:click={toggleCheck}>
	{#if isChecked}
		<slot name="checked">
			<SquareIcon />
		</slot>
	{:else}
		<slot name="unchecked">
			<CheckSquareIcon />
		</slot>
	{/if}
</button>

<style lang="postcss">
</style>
