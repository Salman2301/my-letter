<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/module/supabase';
	import { goto } from '$app/navigation';

	onMount(async () => {
		await supabase.auth.signOut();
		goto('/auth/login');
	});
</script>
