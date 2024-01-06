<script lang="ts" context="module">
	export type DropOptions = {
		label: string;
		value: string;
	};
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	export let options: DropOptions[] = [];

	export let value: string | null = options?.[0]?.value || null;
	export let theme: 'bg' | 'border' = 'bg';

	function handleChange(ev: any) {
		value = ev.target.value;
		dispatch('change', { value });
	}
</script>

<select on:change={handleChange} class="theme-{theme}">
	{#each options as opt}
		<option value={opt.value} selected={opt.value === value}>
			{opt.label}
		</option>
	{/each}
</select>

<style lang="postcss">
	select {
		@apply text-sm;
		height: 30px;
		@apply px-1;
	}

	.theme-bg {
		@apply bg-background;
	}

	.theme-border {
		@apply bg-secondary;
		@apply border border-background;
	}
</style>
