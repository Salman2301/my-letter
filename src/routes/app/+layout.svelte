<script lang="ts">
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import { showSidebar } from '$lib/components/sidebar/store';
</script>

<div class="page">
	<div class="navbar">
		<Navbar />
	</div>
	<div class="app">
		<div class="sidebar">
			{#if $showSidebar}
				<Sidebar />
			{/if}
		</div>
		<slot />
	</div>
</div>

<style lang="postcss">
	.page {
		@apply bg-background text-foreground;
	}
	.app {
		@apply flex flex-grow;
		min-height: calc(100vh - 40px);
	}
</style>
