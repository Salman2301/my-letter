<script lang="ts">
	import RenderLetter from '$lib/components/render/RenderLetter.svelte';
	import { letterObj } from '$lib/components/form_bind/letter/store';

</script>

<div class="section section-2">
	<RenderLetter body={$letterObj.body} templateConfig={$letterObj.template_config} />
</div>

<style lang="postcss">
	.section-2 {
		@apply p-2;
		@apply flex justify-center gap-2;
		@apply mx-2;
	}
</style>
