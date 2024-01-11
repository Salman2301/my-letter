<script lang="ts">
	import Card from '$lib/components/card/Card.svelte';

</script>

<div class="container">
	<Card 
		header="My Fonts"
	>
		Font List
	</Card>
	<Card 
		header="Background Image"
	>
		Background Image
	</Card>
	<Card 
		header="My Footer"
	>
	My Footer
	</Card>
	
</div>

<style lang="postcss">
	.container {
		@apply my-1 mt-10 flex flex-col gap-2;
	}

</style>
