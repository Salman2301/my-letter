<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase';
  import { onMount } from 'svelte';

  onMount(async()=>{
    const {data, error} = await supabase.auth.getUser();
    if( data.user ) goto("/app")
  })
</script>

<div class="auth-layout">
  <slot />
</div>

<style lang="postcss">
  .auth-layout {
    @apply h-svh w-full;
    @apply flex justify-center items-center;
  }  
</style>
