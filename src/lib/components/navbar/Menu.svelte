<script lang="ts">
	import { ArrowDownIcon, ArrowUpIcon, ChevronDownIcon, ChevronUpIcon } from "svelte-feather-icons";
  import { onMount } from "svelte";
  import { slide } from "svelte/transition";
	import { supabase } from "$lib/supabase";
  import clickOutside from "$lib/action/click-outside";

  export let show: boolean = false;
  export let email: string = "loading...";
  export let initial: string = "..";

  onMount(async ()=>{
    const { data, error } = await supabase.auth.getUser();
    if( data.user ) {
      email = data.user.email as string;
      initial = email?.[0]?.toUpperCase() || "A";
    }
  })

  function hide() { show = false }
  function handleToggle() { show = !show;}

</script>

<div class="dropdown" use:clickOutside={{ cb: hide }}>
  <button class="button" on:click={handleToggle}>
    <div class="image">
      {initial}
    </div>
    {#if show}
      <ChevronUpIcon size="12"/>
    {:else}
      <ChevronDownIcon size="12" />
    {/if}
  </button>

  {#if show}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="options" transition:slide on:click={hide}>
      <div class="item"> {email}</div>
      <div class="divider my-2"></div>
      <a href="/app/settings"><div class="item">Settings</div></a>
      <a href="/auth/logout"><div class="item">Logout</div></a>
    </div>
  {/if}
</div>

<style lang="postcss">
  .dropdown {
    @apply relative;
  }
  .button {
    @apply flex gap-1 items-center;
    @apply cursor-pointer;
  }
  .image {
    width: 30px;
    height: 30px;
    @apply bg-primary;
    @apply rounded-md;
    @apply flex items-center justify-center;
  }
  .item {
    @apply text-xs text-center;
    @apply py-1;
  }
  .options {
    @apply absolute;
    @apply px-2 py-2;
    top: 50px;
    margin-left: -180px;
    width: 220px;
    @apply bg-primary-foreground;
    @apply overflow-clip;
    @apply rounded-sm;
    @apply text-sm;
  }

  .options > a {
    @apply text-center;
    @apply mt-2;
  }
  .options > a:hover {
    @apply underline;
  }
  .options > a:hover > .item {
    @apply bg-secondary;
  }
</style>