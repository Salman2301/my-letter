<script lang="ts">
	import data from './data';
	import { page } from '$app/stores';
	import { iconMap } from '$lib/components/icon/map.svelte';
	import { LogOutIcon } from 'svelte-feather-icons';
	import { slide } from "svelte/transition";
</script>

<div class="sidebar" transition:slide={{ axis : "x"}}>
	<div class="sidebar-top">
		{#each data.filter(item=>!item.hideSidebar) as item}
			<div class="sidebar-item">
				<a
					href={item.href}
					aria-label="menu {item.title}"
					class:active={$page.url.pathname === item.href}
					class="theme-{item.theme}"
				>
					<div class="icon">
						<svelte:component this={iconMap[item.icon]} size="14" />
					</div>
					<div class="title">{item.title}</div>
				</a>
			</div>
		{/each}
	</div>

	<div class="footer">
		<div class="sidebar-item">
			<a href="/auth/logout" aria-label="logout">
				<div class="icon">
					<LogOutIcon size="14" />
				</div>
				<div class="title">Logout</div>
			</a>
		</div>
	</div>
</div>

<style lang="postcss">
	.sidebar {
		height: calc(100vh - 40px);
		width: 220px;
		@apply bg-secondary;
		@apply px-2 py-4;
		@apply flex flex-col justify-between;
	}
	.sidebar-item > a {
		@apply flex items-center gap-2 justify-start;
		@apply rounded-sm;
		@apply border border-secondary;
		@apply px-2 py-2 pl-14;
		@apply text-center;
		width: 200px;
	}

	.sidebar-item > a:hover,
	.sidebar-item > a.active {
		@apply bg-secondary-foreground;
		@apply text-background;
	}

	.title {
		@apply text-sm;
	}

	.theme-cta {
		@apply !rounded-full;
		@apply !border-2 !border-secondary-foreground;
		@apply my-4;
	}
</style>
