<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let label: string = 'Button';
	export let variant: string = '';
	export let disabled: boolean = false;

	function handleClick(e: MouseEvent) {
		if (disabled) return;
		dispatch('click', { e });
	}
</script>

<button class="button {variant}" {disabled} on:click={handleClick}>
	{label}
</button>

<style lang="postcss">
	button {
		@apply text-sm;
		@apply bg-primary;
		@apply px-4 py-1;
		@apply rounded-sm;
	}
	button:hover:not(:disabled) {
		@apply underline;
	}

	button:disabled {
		@apply bg-accent;
		@apply border border-secondary-foreground;
	}
</style>
