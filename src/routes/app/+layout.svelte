<script lang="ts">
	import Sidebar from '$lib/components/sidebar/Sidebar.svelte';
	import Navbar from '$lib/components/navbar/Navbar.svelte';
	import { showSidebar } from '$lib/components/sidebar/store';

	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';

  onMount(async()=>{
    const {data, error} = await supabase.auth.getUser();
    if( !data.user ) goto("/auth")
  })
</script>

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

<style lang="postcss">
	.app {
		@apply flex flex-grow;
		min-height: calc(100vh - 40px);
	}
</style>
