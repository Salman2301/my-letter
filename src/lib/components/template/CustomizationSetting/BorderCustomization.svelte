<script lang="ts">
	import InputFour from './InputFour.svelte';
	import TitleCustomization from './TitleCustomization.svelte';
	import { getContext } from 'svelte';
	import { CONTEXT_LAYOUT_TEMPLATE_CONFIG } from '../store';

	import type { Writable } from 'svelte/store';
	import type { TemplateConfig } from '../types';

	const templateConfigStore: Writable<TemplateConfig> = getContext(CONTEXT_LAYOUT_TEMPLATE_CONFIG);
</script>

<div class="border-container">
	<TitleCustomization content="Border" />
	<InputFour />
</div>

<style lang="postcss">
	.border-container {
		@apply h-full w-full;
	}
</style>
