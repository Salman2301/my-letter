<script lang="ts">
	import clickOutside from '$lib/action/click-outside';
	import ColorPicker from 'svelte-awesome-color-picker';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let colorValue: string = '#000';
	export let isOpen: boolean = false;
	export let disableClickOutside: boolean = false;

	$: if (colorValue) handleInput();
	$: if (!isOpen) handleInput();

	function hide() {
		if (disableClickOutside) return;
		isOpen = false;
	}

	let debouncerTimer: number | undefined;

	function handleInput() {
		if (debouncerTimer) return;
		debouncerTimer = setTimeout(() => {
			dispatch('change', { colorValue });
			clearTimeout(debouncerTimer);
			debouncerTimer = undefined;
		}, 300);
	}
</script>

<div class="input-color" use:clickOutside={{ cb: hide }}>
	<div class="color-input-container">
		<button
			class="color-input"
			style="background:{colorValue}"
			on:click={() => (isOpen = !isOpen)}
			type="button"
		>
		</button>
		<div class="transparent"></div>
	</div>

	<div class="color-picker">
		<ColorPicker
			label=""
			bind:hex={colorValue}
			on:input={handleInput}
			bind:isOpen
			isTextInput={false}
			isInput={false}
			isPopup={false}
		/>
	</div>
	<div class="color-picker"></div>
</div>

<style lang="postcss">
	.input-color {
		@apply relative;
		@apply flex items-center;
	}
	.color-picker {
		@apply absolute;
		z-index: 40;
	}
	.color-input-container {
		@apply relative;
		@apply h-5 w-5;
	}
	.color-input {
		@apply h-5 w-5 rounded-full;
		@apply border border-secondary-foreground;
		@apply overflow-hidden;
		@apply z-10;
		@apply relative
	}
	.transparent {
		background: url("/asset/transparent.png");
		background-repeat: repeat;

		@apply border border-secondary-foreground;
		@apply h-5 w-5 ;
		@apply rounded-full;
		@apply absolute;
		top: 0;
		left: 0;
	}
</style>
