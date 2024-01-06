<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as Card from '$lib/components/ui/card';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/supabase';
	import { LoaderIcon } from 'svelte-feather-icons';
	import { formatDate } from '$lib/helper';

	import type { Tables } from '$lib/database.types';
	import { goto } from '$app/navigation';

	let isLoading: boolean = true;
	let letters: Tables<'letter'>[] = [];

	onMount(async () => {
		let { data, error } = await supabase.from('letter').select('*');
		if (error) {
			console.error(error);
		}

		letters = data as Tables<'letter'>[];
		isLoading = false;
	});
</script>

<div class="container">
	{#if isLoading}
		<div class="flex items-center justify-center">
			<LoaderIcon class="animate-spin" />
		</div>
	{:else}
		<Card.Root>
			{#if letters.length > 0}
				<Card.Content>
					<Table.Root>
						<Table.Header>
							<Table.Row>
								<Table.Head>Title</Table.Head>
								<Table.Head>Date</Table.Head>
								<Table.Head>Contact</Table.Head>
								<Table.Head class="text-right">Status</Table.Head>
							</Table.Row>
						</Table.Header>
						<Table.Body>
							{#each letters as letter}
								<Table.Row on:click={() => goto(`/app/my-letter/${letter.id}`)}>
									<Table.Cell class="font-medium">{letter.title}</Table.Cell>
									<Table.Cell>{formatDate(letter.created_at)}</Table.Cell>
									<Table.Cell>{letter.to || '-'}</Table.Cell>
									<Table.Cell class="text-right"
										>{letter.is_publish ? 'Published' : 'Draft'}</Table.Cell
									>
								</Table.Row>
							{/each}
						</Table.Body>
					</Table.Root>
				</Card.Content>
			{:else}
				<Card.Header>
					<a href="/app/new-letter">
						<p>No letters found click here to create your first letter</p>
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
</style>
