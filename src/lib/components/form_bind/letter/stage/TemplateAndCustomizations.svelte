<script lang="ts">
	import InputCheckbox from '$lib/components/form/InputCheckbox.svelte';
	import Customization from './customization_panel/Customization.svelte';
	import RenderLetter from '$lib/components/render/RenderLetter.svelte';

	import { letterObj } from '$lib/components/form_bind/letter/store';
	import { templateList } from '$lib/components/template';
	import { deepCopyObj, genId } from '$lib/helper';

	import type { TemplateConfig } from '$lib/components/template/types';

	type TabId = 'template' | 'customization';
	interface TabItem {
		title: string;
		id: TabId;
	}

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

	let template: TemplateCheck[] = Object.values(templateList).map((e) => ({
		...e,
		checked: false
	}));
	const templateIndex = template.findIndex((item) => item.slug === $letterObj.template_config.slug);
	template[templateIndex].checked = true;

	function uncheckRest(itemId: string) {
		template = template.map((item) => {
			item.checked = itemId === item.slug;
			if (item.checked) {
				selectedTemplateId = item.slug;
				$letterObj.template_config = deepCopyObj(item);
			}
			return item;
		});
	}
</script>

<div class="template-list">
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
										on:change={() => uncheckRest(item.slug)}
										bind:checked={template[idx].checked}
									/>
								</div>
								<RenderLetter templateConfig={item} body={$letterObj.body} resizeWidth={180} />
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

<style lang="postcss">

	.template-list {
		@apply border-l border-background;
		@apply w-full;
		@apply fixed right-0;
		@apply bg-secondary;
		@apply h-full;
		top: 40px;
		width: 420px;
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
	.tab-body {
		@apply overflow-hidden overflow-y-auto;
		height: calc(100vh - 100px);
		/* display: table-row; This is needed for the color picker popup to show without cutting to edge */
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
