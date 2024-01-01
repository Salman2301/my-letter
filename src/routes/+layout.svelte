<script>
	import '../app.pcss';
</script>


<div class="page">
	<slot />
</div>

<style lang="postcss">
	.page {
		@apply bg-background text-foreground;
		min-height: 100vh;
	}

</style>
