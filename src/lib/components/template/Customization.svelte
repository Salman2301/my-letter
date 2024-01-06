<script lang="ts">
	import Background from './CustomizationSetting/Background.svelte';
	import Margin from './CustomizationSetting/Margin.svelte';
	import Padding from './CustomizationSetting/Padding.svelte';
	import Border from './CustomizationSetting/Border.svelte';
	import FontFamily from './CustomizationSetting/FontFamily.svelte';
</script>

<div class="container">
	<FontFamily />
	<Background />
	<div class="margin-padding">
		<Margin />
		<div class="divider"></div>
		<Padding />
	</div>
	<Border />
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
