<script lang="ts">
	import InputCheckbox from '../form/InputCheckbox.svelte';
	import BackgroundCustomization from './CustomizationSetting/BackgroundCustomization.svelte';
	import MarginCustomization from './CustomizationSetting/MarginCustomization.svelte';
	import PaddingCustomization from './CustomizationSetting/PaddingCustomization.svelte';
	import BorderCustomization from './CustomizationSetting/BorderCustomization.svelte';
	import RoundedCustomization from './CustomizationSetting/RoundedCustomization.svelte';
	import FontCustomization from './CustomizationSetting/FontCustomization.svelte';

	import { letterObj } from '$lib/components/form_bind/Letter/store';

</script>

<div class="container">
	<FontCustomization
		bind:fontColor={$letterObj.template_config.fontColor}
		bind:fontFamily={$letterObj.template_config.fontFamily}
		bind:fontSizeValue={$letterObj.template_config.fontSize.value}
	/>
	<BackgroundCustomization bind:backgrounds={$letterObj.template_config.backgrounds} />
	<div class="margin-padding">
		<MarginCustomization
			bind:topValue={$letterObj.template_config.margin.top.value}
			bind:leftValue={$letterObj.template_config.margin.left.value}
			bind:rightValue={$letterObj.template_config.margin.right.value}
			bind:bottomValue={$letterObj.template_config.margin.bottom.value}
		/>
		<div class="divider"></div>
		<PaddingCustomization
			bind:topValue={$letterObj.template_config.padding.top.value}
			bind:leftValue={$letterObj.template_config.padding.left.value}
			bind:rightValue={$letterObj.template_config.padding.right.value}
			bind:bottomValue={$letterObj.template_config.padding.bottom.value}
		/>
	</div>

	<div class="clip-customization">
		<InputCheckbox
			bind:checked={$letterObj.template_config.clipOverflowContent}
			label="Clip excess content"
		/>
	</div>

	<BorderCustomization
		bind:topValue={$letterObj.template_config.border.top.strokewidth}
		bind:leftValue={$letterObj.template_config.border.left.strokewidth}
		bind:rightValue={$letterObj.template_config.border.right.strokewidth}
		bind:bottomValue={$letterObj.template_config.border.bottom.strokewidth}
		bind:topColorValue={$letterObj.template_config.border.top.strokeColor}
		bind:leftColorValue={$letterObj.template_config.border.left.strokeColor}
		bind:rightColorValue={$letterObj.template_config.border.right.strokeColor}
		bind:bottomColorValue={$letterObj.template_config.border.bottom.strokeColor}
		bind:topStroke={$letterObj.template_config.border.top.strokeStyle}
		bind:leftStroke={$letterObj.template_config.border.left.strokeStyle}
		bind:rightStroke={$letterObj.template_config.border.right.strokeStyle}
		bind:bottomStroke={$letterObj.template_config.border.bottom.strokeStyle}
	/>
	<RoundedCustomization
		bind:topLeftValue={$letterObj.template_config.rounded.topLeft.value}
		bind:topRightValue={$letterObj.template_config.rounded.topRight.value}
		bind:bottomLeftValue={$letterObj.template_config.rounded.bottomLeft.value}
		bind:bottomRightValue={$letterObj.template_config.rounded.bottomRight.value}
	/>
</div>

<style lang="postcss">
	.container {
		@apply w-full;
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

	.clip-customization {
		@apply my-2;
	}
</style>
