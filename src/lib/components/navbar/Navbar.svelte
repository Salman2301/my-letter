<script lang="ts">
	import { ArrowLeftIcon, MenuIcon, XIcon } from 'svelte-feather-icons';
	import { showSidebar, toggleSidebar } from '../sidebar/store';
</script>

<div class="navbar">
	<button class="menu-icon" on:click={toggleSidebar}>
		{#if $showSidebar}
			<ArrowLeftIcon />
		{:else}
			<MenuIcon />
		{/if}
	</button>
	<div class="image"></div>
</div>

<style lang="postcss">
	.navbar {
		width: 100%;
		height: 40px;
		@apply bg-secondary;
		@apply flex items-center;
		@apply px-4;
	}
</style>
