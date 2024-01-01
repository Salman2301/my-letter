<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import * as Card from "$lib/components/ui/card";
	import { onMount } from "svelte";
	import { supabase } from "$lib/supabase";
	import { LoaderIcon, PlusIcon } from "svelte-feather-icons";
	import { formatDate } from "$lib/helper";

  import type { Tables } from "$lib/database.types";
	import { goto } from "$app/navigation";
  
  let isLoading:boolean = true;
  let contacts: Tables<"contact">[] = [];

  const MAX_CONTACTS = 10;
  $: disabledContact = contacts.length > MAX_CONTACTS;

  onMount(async ()=>{
    let { data, error } = await supabase.from('contact').select('*');
    if( error ) { console.error(error) }

    contacts = (data || []) as Tables<"contact">[];
    isLoading = false;
  });

</script>

<div class="container">
  {#if isLoading}
    <div class="flex items-center justify-center">
      <LoaderIcon class="animate-spin" />
    </div>
  {:else}
    <div class="action">
      <a href="{disabledContact? "#" : "/app/new-contact"}" class="btn-container" class:disabled={disabledContact}>
        <div class="btn">
          <div class="icon"> <PlusIcon size="22"/> </div>
          <div class="label">New contact ( {contacts.length}/10 ) </div>
        </div>
      </a>
    </div>
    <Card.Root>
        {#if contacts.length > 0 }
        <Card.Content>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Nickname</Table.Head>
                <Table.Head >Full name</Table.Head>
                <Table.Head>Date</Table.Head>
                <Table.Head>Fav.</Table.Head>
                <Table.Head class="text-right">Email</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {#each contacts as contact}
                <Table.Row on:click={()=>goto(`/app/my-contact/${contact.id}`)}>
                  <Table.Cell class="font-medium">{contact.nick_name}</Table.Cell>
                  <Table.Cell class="font-medium">{contact.first_name  + " " + contact.last_name }</Table.Cell>
                  <Table.Cell>{formatDate(contact.created_at)}</Table.Cell>
                  <Table.Cell>{contact.fav ? "Yes" : "No"}</Table.Cell>
                  <Table.Cell class="text-right">{contact.email }</Table.Cell>
                </Table.Row>
              {/each}
            </Table.Body>
          </Table.Root>    
        </Card.Content>
        {:else}      
        <Card.Header>
         <a href="/app/new-contact">
            <p >No contacts found click here to create your first letter</p>
         </a>
        </Card.Header>
      {/if}
    </Card.Root>
  {/if}
</div>
<style lang="postcss">
  .container {
    @apply mt-10;
  }

  .action {
    @apply flex justify-end;
    @apply my-2;
  }

  .btn-container {
    @apply bg-primary text-secondary-foreground;
    width: 220px;
    @apply py-2 px-4 rounded-sm;
  }
  .btn {
    @apply flex gap-2 items-center justify-center;
  }

  .btn-container:hover {
    @apply bg-primary-foreground;
  }

  .btn-container.disabled {
    @apply bg-accent;
    text-decoration: none; /* Remove underline */
    cursor: not-allowed; /* Change cursor style */
  }

</style>