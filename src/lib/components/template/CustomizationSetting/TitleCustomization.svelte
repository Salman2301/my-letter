<script lang="ts">
	export let content: string = '';
	export let textCenter: boolean = false;
</script>

<h3 class:text-center={textCenter}>
	{content}
</h3>

<style lang="postcss">
	h3 {
		@apply text-secondary-foreground;
		@apply font-bold;
		@apply mb-2;
	}
</style>
