<script lang="ts">
	import Button from '$lib/components/button/Button.svelte';
	import Stage1 from './stage/Stage1.svelte';
	import Stage2 from './stage/Stage2.svelte';
	import Stage3 from './stage/Stage3.svelte';

	import { supabase } from '$lib/module/supabase';
	import { onMount, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { Edit2Icon, SendIcon, TableIcon } from 'svelte-feather-icons';

	import { initNewLetterObj, letterObj } from '$lib/components/form_bind/letter/store';
	import { deepCopyObj } from '$lib/helper';

	type Stage = '1' | '2' | '3';

	export let isEditMode: boolean = false;
	export let editId: string = '';
	export let isLoading: boolean = true;
	export let stage: Stage = '1';

	onMount(async () => {
		if (isEditMode && editId) {
			const { data, error } = await supabase.from('letter').select('*').eq('id', editId);

			if (!data?.[0]) {
				// error failed to retrieve data
				goto('/app/my-letters');
				return;
			}

			$letterObj = data[0] as any;
		}

		isLoading = false;
	});

	onDestroy(() => {
		// TODO: Check if the initial object is changed from the current object show a alert before user unloading the page
		$letterObj = deepCopyObj(initNewLetterObj);
	});

	interface SectionMenu {
		title: string;
		icon: any;
		stage: Stage;
	}
	let sectionMenu: SectionMenu[] = [
		{
			title: 'Write',
			icon: Edit2Icon,
			stage: '1'
		},
		{
			title: 'Design',
			icon: TableIcon,
			stage: '2'
		},
		{
			title: 'Send',
			icon: SendIcon,
			stage: '3'
		}
	];

	function handleNext() {
		if (stage === '1') {
			stage = '2';
			return;
		}
		if (stage === '2') {
			stage = '3';
			return;
		}
	}
	function handlePrev() {
		if (stage === '3') {
			stage = '2';
			return;
		}
		if (stage === '2') {
			stage = '1';
			return;
		}
	}
</script>

<div class="container">
	<div class="section-menu">
		{#each sectionMenu as item}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="section-item"
				class:complete={Number(stage) >= Number(item.stage)}
				on:click={() => (stage = item.stage)}
				role="button"
				tabindex="0"
			>
				<div class="icon"><svelte:component this={item.icon} /></div>
				<div class="title">{item.title}</div>
			</div>
		{/each}
	</div>

	<div class="stages">
		{#if stage === '1'}
			<Stage1 />
		{:else if stage === '2'}
			<Stage2 />
		{:else if stage === '3'}
			<Stage3 />
		{/if}

		<div class="action" class:hide={stage === '3'}>
			<Button label="Prev" on:click={handlePrev} disabled={stage === '1'} />
			<Button label="Next" on:click={handleNext} disabled={stage === '3'} />
		</div>
	</div>
</div>

<style lang="postcss">
	.container {
		@apply my-4;
	}

	.stages {
		@apply bg-secondary;
		@apply rounded-md;
		max-width: 1280px;
	}

	.section-menu {
		@apply flex justify-evenly gap-2;
		@apply my-4;
	}
	.section-item {
		@apply flex flex-col gap-2;
		@apply text-gray-500;
	}
	.complete {
		@apply text-white;
	}
	.section-item .title {
		@apply text-center;
	}
	.icon {
		@apply h-14 w-14;
		@apply rounded-full;
		@apply bg-secondary;
		@apply text-center;
		@apply flex items-center justify-center;
	}
	/* end of section menu  */
	.section {
		@apply pb-8;
	}

	.action {
		@apply flex justify-center gap-8;
		@apply pb-2;
	}
	.action.hide {
		@apply hidden;
	}
</style>
