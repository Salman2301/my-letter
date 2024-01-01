<script lang="ts">
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';

	onMount(async () => {
		let { error } = await supabase.auth.signOut();
		goto("/")
	});
</script>
