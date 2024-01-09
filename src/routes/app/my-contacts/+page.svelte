<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Card from '$lib/components/ui/card';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/module/supabase';
	import { LoaderIcon, PlusIcon, SlashIcon } from 'svelte-feather-icons';
	import { formatDate } from '$lib/helper';
	import { goto } from '$app/navigation';

	import type { Tables } from '$lib/database.types';

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

	let userId: string;
	async function getContactImage(contact: Tables<'contact'>) {
		if (!userId) {
			const res = await supabase.from('users').select('*');
			if (!res.data) throw new Error('No contact image');
			userId = res.data[0].id;
		}
		if (!contact.photo) return Promise.reject('No image uploaded');

		const { data, error } = await supabase.storage
			.from('contact_photo')
			.createSignedUrl(contact.photo, 60);

		if (!data) return Promise.reject('Failed to get the contact image!');
		return data.signedUrl;
	}

	function getFullName(contact: Tables<'contact'>) {
		return [contact.first_name || '', contact.last_name || ''].join(' ');
	}
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
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head>Photo</Table.Head>
								<Table.Head>Nickname</Table.Head>
								<Table.Head>Full name</Table.Head>
								<Table.Head>Created at</Table.Head>
								<Table.Head class="text-right">Email</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each contacts as contact}
								<Table.Row on:click={() => goto(`/app/my-contact/${contact.id}`)}>
									<Table.Cell class="font-medium">
										{#await getContactImage(contact)}
											<div class="image no-image"><LoaderIcon class="animate-spin" /></div>
										{:then src}
											<img {src} alt="photo {contact.nick_name}" class="image" />
										{:catch}
											<div class="image no-image"><SlashIcon /></div>
										{/await}
									</Table.Cell>
									<Table.Cell class="font-medium">{contact.nick_name}</Table.Cell>
									<Table.Cell class="font-medium">{getFullName(contact)}</Table.Cell>
									<Table.Cell>{formatDate(contact.created_at)}</Table.Cell>
									<Table.Cell class="text-right">{contact.email}</Table.Cell>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
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
