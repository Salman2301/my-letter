<script lang="ts">
	import Table from '$lib/components/table_bind/Table.svelte';
	import * as Card from '$lib/components/ui/card';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/module/supabase';
	import { LoaderIcon } from 'svelte-feather-icons';

	import type { Tables } from '$lib/database.types';
	import type { Columns } from '$lib/components/table_bind/table.types';
	import { goto } from '$app/navigation';

	let isLoading: boolean = true;
	let letters: Tables<'letter'>[] = [];

	let columns: Columns<keyof Tables<'letter'>> = [
		{
			key: "title",
			name: "Title",
		},
		{
			key: "created_at",
			name: "Date",
			type: "date",
		},
		{
			key: "to",
			name: "Contact"
		},
		{
			key: "is_publish",
			name: "Status",
			render: (row) => row.is_publish ? "Published" : "Draft" 
		}
	]

	function handleRowClick(event: any) {
		const letter = event.detail.row;
		goto(`/app/my-letter/${letter.id}`)
	}

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
					<Table
						columns={columns}
						rows={letters}
						on:row_click={handleRowClick}
					/>
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
