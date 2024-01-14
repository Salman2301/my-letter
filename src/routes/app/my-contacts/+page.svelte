<script lang="ts">
	import Table from '$lib/components/table_bind/Table.svelte';
	import Card from '$lib/components/card/Card.svelte';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/module/supabase';
	import { LoaderIcon, PlusIcon } from 'svelte-feather-icons';

	import type { Tables } from '$lib/database.types';
	import type { Columns } from '$lib/components/table_bind/table.types';
	import { Trash2Icon } from 'lucide-svelte';

	let isLoading: boolean = true;
	let contacts: Tables<'contact'>[] = [];
	export let checkedRowState: boolean[] = [];
	export let checkedRowIndices: number[] = [];

	$: showDeleted = checkedRowState.filter(Boolean).length > 0;

	const MAX_CONTACTS = 10;
	$: disabledContact = contacts.length > MAX_CONTACTS;

	onMount(async () => {
		fetchData();
	});

	async function fetchData() {
		isLoading = true;
		
		let { data, error } = await supabase.from('contact').select('*');
		if (error) {
			console.error(error);
		}

		contacts = (data || []) as Tables<'contact'>[];
		checkedRowState = contacts.map(() => false);
		isLoading = false;
	}

	async function handleDeleteSelected( ){
		const ids = checkedRowIndices.map((index) => contacts[index].id);
		const { data, error } = await supabase.from('contact').delete().in("id", ids);
		
		fetchData();
	}

	const columns: Columns<keyof Tables<'contact'>> = [
		{
			name: "Photo",
			key: "photo",
			type: "image",
			typeImageBucketName: "contact_photo",
			typeImageIsPrivate: true
		},
		{
			name: "Nickname",
			key: "nick_name"
		},
		{
			name: "Full name",
			key: "first_name",
			render: row=>`${row.first_name} ${row.last_name}`
		},
		{
			name: "Created at",
			key: "created_at",
			type: "date"
		},
		{
			name: "Email",
			key: "email"
		}
	]
</script>


<div class="container">
	{#if isLoading}
		<div class="flex items-center justify-center">
			<LoaderIcon class="animate-spin" />
		</div>
	{:else}
		<div class="action">
			{#if showDeleted}
				<button
					class="btn-container btn-delete"
					on:click={handleDeleteSelected}
				>
					<div class="btn">
						<div class="icon"><Trash2Icon size="22" /></div>
						<div class="label">Delete ({checkedRowIndices.length})</div>
					</div>
				</button>
			{/if}

			<a
				href={disabledContact ? '#' : '/app/new-contact'}
				class="btn-container"
				class:disabled={disabledContact}
			>
				<div class="btn">
					<div class="icon"><PlusIcon size="22" /></div>
					<div class="label">New contact ( {contacts.length}/10 )</div>
				</div>
			</a>		

		</div>
		<Card>
			{#if contacts.length===0}
				<a href="/app/new-contact">
					<p>No contacts found click here to create your first letter</p>
				</a>
			{:else}
					<Table 
						columns={columns}
						rows={contacts}
						bind:checkedRowState
						bind:checkedRowIndices
					/>

			{/if}
		</Card>

	{/if}
</div>

<style lang="postcss">
	.container {
		@apply mt-10;
	}

	.action {
		@apply flex justify-end gap-2;
		@apply my-2;
	}


	.btn-container {
		@apply bg-primary text-secondary-foreground;
		width: 220px;
		@apply rounded-sm px-4 py-2;
	}
	.btn {
		@apply flex items-center justify-center gap-2;
	}

	.btn-container:hover {
		@apply bg-primary-foreground;
	}

	.btn-container.disabled {
		@apply bg-accent;
		text-decoration: none; /* Remove underline */
		cursor: not-allowed; /* Change cursor style */
	}
	.btn-delete {
		@apply bg-destructive;
		@apply hover:bg-destructive;
		@apply hover:underline;
	}

	.image {
		width: 50px;
		height: 50px;
		min-width: 50px;
		min-height: 50px;
		max-width: 50px;
		max-height: 50px;
		@apply rounded-full;
		@apply bg-secondary text-primary-foreground;
	}

	.no-image {
		@apply flex items-center justify-center;
	}
</style>
