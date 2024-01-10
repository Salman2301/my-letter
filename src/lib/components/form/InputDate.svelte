<script lang="ts">
	import { DateInput } from 'date-picker-svelte';

	export let value: Date | null = new Date();
</script>

<DateInput bind:value />

<style lang="postcss">
	:global(body) {
		--date-picker-foreground: hsl(var(--foreground) / 1);
		--date-picker-background: hsl(var(--background) / 1);
		--date-picker-highlight-border: hsl(var(--deg), 98%, 49%);
		--date-picker-highlight-shadow: hsla(var(--deg), 98%, 49%, 50%);
		--date-picker-selected-color: hsl(var(--deg), 100%, 85%);
		--date-picker-selected-background: hsla(var(--deg), 98%, 49%, 20%);
		background: hsl(var(--background) / 1);
		color: hsl(var(--foreground) / 1);
		transition: all 80ms ease-in-out;
		font-size: 14px;
	}
	div > :global(*) {
		margin-bottom: 10px;
	}
</style>
