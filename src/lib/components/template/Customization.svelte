<script lang="ts">
	import BackgroundCustomization from './CustomizationSetting/BackgroundCustomization.svelte';
	import MarginCustomization from './CustomizationSetting/MarginCustomization.svelte';
	import PaddingCustomization from './CustomizationSetting/PaddingCustomization.svelte';
	import BorderCustomization from './CustomizationSetting/BorderCustomization.svelte';
	import FontCustomization from './CustomizationSetting/FontCustomization.svelte';
</script>

<div class="container">
	<FontCustomization />
	<BackgroundCustomization />
	<div class="margin-padding">
		<MarginCustomization />
		<div class="divider"></div>
		<PaddingCustomization />
	</div>
	<BorderCustomization />
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
