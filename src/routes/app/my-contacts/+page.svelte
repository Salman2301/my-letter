<script lang="ts">
	import Table from '$lib/components/table_bind/Table.svelte';
	import * as Card from '$lib/components/ui/card';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/module/supabase';
	import { LoaderIcon, PlusIcon, SlashIcon } from 'svelte-feather-icons';

	import type { Tables } from '$lib/database.types';
	import type { Columns } from '$lib/components/table_bind/table.types';

	let isLoading: boolean = true;
	let contacts: Tables<'contact'>[] = [];

	const MAX_CONTACTS = 10;
	$: disabledContact = contacts.length > MAX_CONTACTS;

	onMount(async () => {
		let { data, error } = await supabase.from('contact').select('*');
		if (error) {
			console.error(error);
		}

		contacts = (data || []) as Tables<'contact'>[];
		isLoading = false;
	});

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
		<Card.Root>
			{#if contacts.length > 0}
				<Card.Content>
					<Table 
						columns={columns}
						rows={contacts}
					/>
				</Card.Content>
			{:else}
				<Card.Header>
					<a href="/app/new-contact">
						<p>No contacts found click here to create your first letter</p>
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
