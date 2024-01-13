<script lang="ts">
	import InputCheckbox from '../form/InputCheckbox.svelte';
	import { deepCopyObj, formatDate, getSignedImage, isSameObj, styleStr } from '$lib/helper';
	import { createEventDispatcher } from 'svelte';
	import { LoaderIcon, SlashIcon } from 'svelte-feather-icons';
	import type { Columns, Row, Rows, TableSetting } from './table.types';
	import type { Mouse } from '@playwright/test';

	const dispatch = createEventDispatcher();

	export let tableSetting: TableSetting = {
		showTableCheckbox: true
	};
	export let rows: Rows = [];
	export let columns: Columns<any> = [
		{
			key: '',
			name: '',
			hide: false,
			style: {}
		}
	];

	export let checkedRowState: boolean[] = [];
	export let checkedRowIndices: number[] = [];

	export let tableChecked: boolean = false;

	$: if (checkedRowState) onCheckedRowStateChanged(checkedRowState);

	function onCheckedRowStateChanged(state: boolean[]) {
		let selectedIndices = state.reduce((acc: number[], curr, idx) => {
			if (curr) acc.push(idx);
			return acc;
		}, []);

		if (!isSameObj(selectedIndices, checkedRowIndices)) {
			checkedRowIndices = deepCopyObj(selectedIndices);
			const allChecked = state.every((item) => item);
			tableChecked = allChecked;
			dispatch('checked-change', { checkedRowIndices });
		}
	}

	function onTableCheckedChanged(checked: boolean) {
		checkedRowState = new Array(rows.length).fill(checked);
	}

	function toggleRow(idx: number) {
		checkedRowState[idx] = !checkedRowState[idx]; 
	}

	
	function handleRowClick({ idx, row, event }: {idx: number, row: Row, event: MouseEvent}) {
		toggleRow(idx)
		dispatch("row_click", { row, idx })
	}
</script>

<table>
	<thead>
		<tr>
			{#if tableSetting.showTableCheckbox}
				<th class="checkbox checkbox-header">
					<InputCheckbox
            bind:checked={tableChecked}
            on:change={()=>onTableCheckedChanged(tableChecked)}
          />
				</th>
			{/if}
			{#each columns as column, idx}
				{@const widthStyle = column.width ? `${column.width}px` : null}
				<th
					id="col-{idx}"
					style={styleStr({
						width: widthStyle,
						'min-width': widthStyle,
						'max-width': widthStyle
					})}
				>
					{column.name}
				</th>
			{/each}
		</tr>
	</thead>

	<tbody>
		{#each rows as row, idx}
			<tr
				class="row body"
			>
				{#if tableSetting.showTableCheckbox}
					<td class="checkbox checkbox-row" >
						<InputCheckbox bind:checked={checkedRowState[idx]} />
					</td>
				{/if}
				{#each columns as column, idxRow}
					{@const value = row[column.key]}
					<td id="cell-{idx}-{idxRow}" 	on:click={(event)=>handleRowClick({idx, row, event})} >
						{#if !column.type || column.type === 'text'}

							{column.render ? column.render(row) :  value}

            {:else if column.type === 'date' && (typeof value === "string" || value === null) }

              {formatDate(value, column.typeDateFormat)}

						{:else if column.type === 'image'}
						
							{#if typeof value === "string" && Boolean(value) }
                {#if column.typeImageIsPrivate && column.typeImageBucketName && value}
                
                  {#await getSignedImage(column.typeImageBucketName,  value)}
                    <div class="image no-image"><LoaderIcon class="animate-spin" /></div>
                  {:then src}
                    <img
                      src={src}
                      alt="table {column?.typeImageAlt?.(row) || ''} "
                      class="image"
                    />
                  {:catch}
                    <div class="image no-image"><SlashIcon /></div>
                  {/await}

                {:else}
                  <img src={value} alt="table {column?.typeImageAlt?.(row) || ''} " class="image" />
                {/if}
                
							{:else}
								<div class="image no-image">
									<SlashIcon />
								</div>
							{/if}

						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style lang="postcss">
	table {
		width: 100%;
		@apply p-2;
	}
	.checkbox {
		width: 40px;
		min-width: 40px;
	}

	tr {
		height: 60px;
		@apply mb-2;
    @apply cursor-pointer;
	}

  tr.row.body:hover {
    @apply bg-accent;
  }

	th {
		@apply border-b border-gray-500;
		@apply mb-2;
    @apply text-white;
	}

	th, td {
		@apply min-w-20;
		@apply text-center;
		/* @apply flex items-center justify-center; */
	}

	td:has(.image) {
		@apply flex h-full items-center justify-center;
	}

  .checkbox {
    @apply pl-2;
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
		@apply flex justify-center;
	}

	.no-image {
		@apply flex items-center justify-center;
	}
</style>
