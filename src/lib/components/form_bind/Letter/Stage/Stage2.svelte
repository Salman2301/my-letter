<script lang="ts">
	import InputCheckbox from '$lib/components/form/InputCheckbox.svelte';
	import Customization from '$lib/components/template/Customization.svelte';
	import PreviewLetter from '../../PreviewLetter.svelte';

	import { templateList } from '$lib/components/template';
	import { genId } from '$lib/helper';

	import { getContext } from 'svelte';
	import { CONTEXT_LAYOUT_TEMPLATE_CONFIG } from '$lib/components/template/store';

	import type { Writable } from 'svelte/store';
	import type { TemplateConfig } from '$lib/components/template/types';

	type TabId = 'template' | 'customization';
	interface TabItem {
		title: string;
		id: TabId;
	}

	export let body: string = '';

	export let selectedTemplateId: string = 'blank';

	let currTab: TabId = 'customization';
	let tabTemplate: TabItem[] = [
		{
			title: 'Template',
			id: 'template'
		},
		{
			title: 'Customization',
			id: 'customization'
		}
	];
	interface TemplateCheck extends TemplateConfig {
		checked: boolean;
	}

	let templateConfigStore = getContext(CONTEXT_LAYOUT_TEMPLATE_CONFIG) as Writable<TemplateConfig>;

	let template: TemplateCheck[] = Object.values(templateList).map((e) => ({
		...e,
		checked: false
	}));
	const templateIndex = template.findIndex((item) => item.slug === $templateConfigStore.slug);
	template[templateIndex].checked = true;

	function uncheckRest(itemId: string) {
		template = template.map((item) => {
			item.checked = itemId === item.slug;
			if (item.checked) {
				selectedTemplateId = item.slug;
				templateConfigStore.set(item);
			}
			return item;
		});
	}
</script>

<div class="section section-2">
	<PreviewLetter {body} templateConfig={$templateConfigStore} />
	<div class="templateList">
		<div class="tabs">
			<div class="tab-menu">
				{#each tabTemplate as item}
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div
						class="tab-item"
						on:click={() => {
							currTab = item.id;
						}}
						class:active={currTab === item.id}
						role="button"
						tabindex="0"
					>
						<p>{item.title}</p>
					</div>
				{/each}
			</div>
			<div class="tab-body">
				{#if currTab === 'template'}
					<div class="templates">
						{#each template as item, idx}
							{@const checkboxId = `checkbox_${genId()}`}
							<label for={checkboxId}>
								<div class="card">
									<div class="checkbox">
										<InputCheckbox
											id={checkboxId}
											on:checked={() => uncheckRest(item.slug)}
											bind:checked={template[idx].checked}
										/>
									</div>
									<PreviewLetter templateConfig={item} {body} resizeWidth={200} />
									<div class="title">{item.slug}</div>
								</div>
							</label>
						{/each}
					</div>
				{/if}
				{#if currTab === 'customization'}
					<Customization />
				{/if}
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.section-2 {
		@apply p-2;
		@apply flex gap-2;
	}

	.templateList {
		@apply border border-secondary-foreground;
		@apply w-full;
	}

	.tab-menu {
		@apply flex;
		@apply justify-evenly;
		@apply h-10;
	}

	.tab-item {
		@apply h-full w-full;
		@apply flex items-center;
		@apply bg-secondary-foreground;
		@apply text-secondary;
		@apply items-center;
	}
	.tab-item.active {
		@apply text-white;
		@apply bg-secondary;
		@apply font-bold;
	}

	.tab-item > p {
		@apply text-center;
		@apply w-full;
	}

	.templates {
		@apply mx-auto flex w-full justify-start gap-2;
		@apply mt-2;
		@apply flex-wrap;
		@apply px-4;
	}

	.card {
		@apply relative;
	}

	.checkbox {
		@apply h-full w-full;
		@apply flex items-start justify-end;
		@apply absolute;
		@apply z-10;
		@apply p-2;
	}

	.title {
		@apply text-center;
	}
</style>
