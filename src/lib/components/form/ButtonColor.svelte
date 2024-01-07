<script lang="ts">
	import InputColor from './InputColor.svelte';
	import clickOutside from '$lib/action/click-outside';

	export let showColorPicker: boolean = false;
	export let label: string = 'Choose a color';
	export let colorValue: string = '#fff';
	
	async function toggleColorPicker() {
		showColorPicker = !showColorPicker;
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	role="button"
	tabindex="0"
	class="btn"
	on:click|self={toggleColorPicker}
	aria-label={label}
	use:clickOutside={{ cb: () => (showColorPicker = false) }}
>
	<InputColor bind:isOpen={showColorPicker} disableClickOutside={true} bind:colorValue on:change />

	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="label" on:click|self={toggleColorPicker} role="button" tabindex="0">
		{label}
	</div>
</div>

<style lang="postcss">
	.btn {
		@apply flex justify-center gap-2;
		@apply bg-background text-secondary-foreground;
		@apply px-4 py-2;
	}
</style>
