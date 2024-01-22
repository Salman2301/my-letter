<script lang="ts">
	import Table from '$lib/components/table_bind/Table.svelte';
	import Button from '$lib/components/button/Button.svelte';
	import Card from '$lib/components/card/Card.svelte';

	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { supabase } from '$lib/module/supabase';
	import { LoaderIcon } from 'svelte-feather-icons';

	import type { Tables } from '$lib/database.types';
	import type { Columns } from '$lib/components/table_bind/table.types';

	let isLoading: boolean = true;
	let letters: Tables<'letter'>[] = [];
	export let checkedRowState: boolean[] = [];
	export let checkedRowIndices: number[] = [];

	$: showAction = checkedRowState.filter(Boolean).length > 0;

	let columns: Columns<keyof Tables<'letter'>> = [
		{
			key: 'title',
			name: 'Title'
		},
		{
			key: 'slug',
			name: 'Slug'
		},
		{
			key: 'created_at',
			name: 'Date',
			type: 'date'
		},
		{
			key: 'to',
			name: 'Contact'
		},
		{
			key: 'is_publish',
			name: 'Status',
			render: (row) => (row.is_publish ? 'Published' : 'Draft')
		}
	];

	onMount(async () => {
		fetchData();
	});

	async function fetchData() {
		isLoading = true;
		let { data, error } = await supabase.from('letter').select('*');
		if (error) {
			console.error(error);
		}

		letters = data as Tables<'letter'>[];
		checkedRowState = letters.map((letter) => false);
		isLoading = false;
	}
	
	function handleRowClick(event: any) {
		const letter = event.detail.row;
		goto(`/app/my-letter/${letter.id}`);
	}

	async function handleDeleteSelected( ){
		const ids = checkedRowIndices.map((index) => letters[index].id);
		const { data, error } = await supabase.from('letter').delete().in("id", ids);
		
		fetchData();
	}
</script>

<div class="container">
	{#if isLoading}
		<div class="flex items-center justify-center">
			<LoaderIcon class="animate-spin" />
		</div>
	{:else}
		<div class="action-container" class:active={showAction}>
			{#if showAction}
				<div class="delete-button">
					<Button
						label="Delete ({checkedRowIndices.length})"
						on:click={handleDeleteSelected}
					/>
				</div>
			{/if}
		</div>
		<Card>
			{#if letters.length > 0}
				<Table
					{columns}
					rows={letters}
					bind:checkedRowState
					bind:checkedRowIndices
					on:row_click={handleRowClick}
				/>
			{:else}
				<a href="/app/new-letter">
					<p>No letters found click here to create your first letter</p>
				</a>
			{/if}
		</Card>
	{/if}
</div>

<style lang="postcss">
	.container {
		@apply mt-10;
	}

	.action-container {
		@apply min-h-10;
		@apply mb-2 px-2;
		@apply flex justify-end items-center;
	}

	.action-container.active {
		@apply bg-secondary;
	}
</style>
