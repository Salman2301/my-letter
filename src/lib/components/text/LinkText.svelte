<script lang="ts">
	export let href = '#';
	export let content: string = '';
	export let align: 'left' | 'center' | 'right' = 'left';
</script>

<a {href} class="text-sec txt-{align}">
	<p>{content}</p>
</a>

<style lang="postcss">
	.text-sec {
		@apply text-xs text-secondary-foreground;
		@apply text-left;
		@apply w-full;
	}
	.text-sec:hover {
		@apply underline;
	}

	.txt-left {
		@apply text-left;
	}
	.txt-center {
		@apply text-center;
	}
	.txt-right {
		@apply text-right;
	}
</style>
