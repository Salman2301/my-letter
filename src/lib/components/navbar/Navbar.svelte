<script lang="ts">
	import Menu from './Menu.svelte';
	import Heading from '../text/Heading.svelte';
	
	import { ArrowLeftIcon, MenuIcon, XIcon } from 'svelte-feather-icons';
	import { showSidebar, toggleSidebar } from '../sidebar/store';
	import { page } from '$app/stores';
	import data from '../sidebar/data';
	
	let navbarTitle = "";
	page.subscribe(($page)=>{
		let path =  $page.url.pathname;
		navbarTitle = data?.find(item=>{
			if( item.href.startsWith("/app/my-contact/") ) return path.startsWith("/app/my-contact/")
			return item.href === path;
		})?.title || "";
	});

</script>

<div class="navbar">
	<button class="menu-icon" on:click={toggleSidebar}>
		{#if $showSidebar}
			<ArrowLeftIcon />
			<div class="w-[250px]"></div>
		{:else}
			<MenuIcon />
		{/if}
	</button>

	<Heading content={navbarTitle}></Heading>
	
	<div class="menubar">
		<Menu />
	</div>
</div>

<style lang="postcss">
	.navbar {
		width: 100%;
		height: 40px;
		@apply bg-secondary;
		@apply flex items-center justify-between;
		@apply px-4;
	}
</style>
