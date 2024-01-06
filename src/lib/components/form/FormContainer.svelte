<script lang="ts">
	import Button from '../button/Button.svelte';
	import Heading from '../text/Heading.svelte';
	import { fade } from 'svelte/transition';

	export let title: string = '';
	export let errorMessage: string = '';
	export let submitLabel: string = 'Submit';
	export let disabled: boolean = false;
	export let widthMode: 'full' | 'compact' = 'full';

	let timer: number;
	export function setErrorMessage(newMessage: string) {
		clearInterval(timer);
		errorMessage = newMessage;

		timer = setTimeout(() => {
			errorMessage = '';
		}, 5000);
	}
</script>

<form
	class="form-container"
	class:width-full={widthMode === 'full'}
	class:width-compact={widthMode === 'compact'}
	on:submit
>
	{#if title}
		<Heading content={title} />
	{/if}
	<slot />

	{#if errorMessage}
		<div class="text-error" transition:fade>{errorMessage}</div>
	{/if}

	<div class="action-bar">
		<Button label={submitLabel} {disabled} />
	</div>
</form>

<style lang="postcss">
	.form-container {
		@apply bg-secondary;
		@apply rounded-md border border-secondary;
		@apply flex items-center justify-center;
		@apply flex-col;
		@apply gap-1;
		@apply px-4 pb-10 pt-4;
	}

	.width-full {
		@apply w-full;
	}
	.width-compact {
		width: 320px;
	}
	.text-error {
		@apply text-red-500;
		@apply text-sm font-semibold;
		@apply py-1;
	}

	.action-bar {
		@apply pt-2;
	}
</style>
