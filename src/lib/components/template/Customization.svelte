<script lang="ts">
	import Background from "./CustomizationSetting/Background.svelte";
	import Margin from "./CustomizationSetting/Margin.svelte";
	import Padding from "./CustomizationSetting/Padding.svelte";

</script>

<div class="container">
  <Background />
  <Margin />
  <Padding />
</div>

<style lang="postcss">
  .container {
  @apply w-full h-full;
    @apply border border-primary;
    @apply flex flex-col;
  }
</style>