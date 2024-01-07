<script lang="ts">
	import BackgroundCustomization from './CustomizationSetting/BackgroundCustomization.svelte';
	import MarginCustomization from './CustomizationSetting/MarginCustomization.svelte';
	import PaddingCustomization from './CustomizationSetting/PaddingCustomization.svelte';
	import BorderCustomization from './CustomizationSetting/BorderCustomization.svelte';
	import RoundedCustomization from './CustomizationSetting/RoundedCustomization.svelte';
	import FontCustomization from './CustomizationSetting/FontCustomization.svelte';

	import { getContext } from 'svelte';
	import { CONTEXT_LAYOUT_TEMPLATE_CONFIG } from './store';

	import type { Writable } from 'svelte/store';
	import type { TemplateConfig } from './types';

	const templateConfigStore: Writable<TemplateConfig> = getContext(CONTEXT_LAYOUT_TEMPLATE_CONFIG);
</script>

<div class="container">
	<FontCustomization
		bind:fontColor={$templateConfigStore.fontColor}
		bind:fontFamily={$templateConfigStore.fontFamily}
		bind:fontSizeValue={$templateConfigStore.fontSize.value}
	/>
	<BackgroundCustomization bind:backgrounds={$templateConfigStore.backgrounds} />
	<div class="margin-padding">
		<MarginCustomization
			bind:topValue={$templateConfigStore.margin.top.value}
			bind:leftValue={$templateConfigStore.margin.left.value}
			bind:rightValue={$templateConfigStore.margin.right.value}
			bind:bottomValue={$templateConfigStore.margin.bottom.value}
		/>
		<div class="divider"></div>
		<PaddingCustomization
			bind:topValue={$templateConfigStore.padding.top.value}
			bind:leftValue={$templateConfigStore.padding.left.value}
			bind:rightValue={$templateConfigStore.padding.right.value}
			bind:bottomValue={$templateConfigStore.padding.bottom.value}
		/>
	</div>
	<BorderCustomization
		bind:topValue={$templateConfigStore.border.top.strokewidth}
		bind:leftValue={$templateConfigStore.border.left.strokewidth}
		bind:rightValue={$templateConfigStore.border.right.strokewidth}
		bind:bottomValue={$templateConfigStore.border.bottom.strokewidth}
		bind:topColorValue={$templateConfigStore.border.top.strokeColor}
		bind:leftColorValue={$templateConfigStore.border.left.strokeColor}
		bind:rightColorValue={$templateConfigStore.border.right.strokeColor}
		bind:bottomColorValue={$templateConfigStore.border.bottom.strokeColor}
		bind:topStroke={$templateConfigStore.border.top.strokeStyle}
		bind:leftStroke={$templateConfigStore.border.left.strokeStyle}
		bind:rightStroke={$templateConfigStore.border.right.strokeStyle}
		bind:bottomStroke={$templateConfigStore.border.bottom.strokeStyle}
	/>
	<RoundedCustomization
		bind:topLeftValue={$templateConfigStore.rounded.topLeft.value}
		bind:topRightValue={$templateConfigStore.rounded.topRight.value}
		bind:bottomLeftValue={$templateConfigStore.rounded.bottomLeft.value}
		bind:bottomRightValue={$templateConfigStore.rounded.bottomRight.value}
	/>
</div>

<style lang="postcss">
	.container {
		@apply h-full w-full;
		@apply flex flex-col;
		@apply gap-8;
		@apply justify-between;
		@apply my-2;
	}
	.margin-padding {
		@apply flex gap-x-2;
	}

	.divider {
		@apply my-auto;
		@apply bg-secondary-foreground;
		height: 100px;
		width: 2px;
		@apply mx-2;
	}
</style>
