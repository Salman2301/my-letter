<script lang="ts">
	import Letter from "$lib/components/form_bind/Letter.svelte";
	import { setContext } from "svelte";
	import { CONTEXT_LAYOUT_TEMPLATE_CONFIG, templateConfig } from "$lib/components/template/store";

	setContext(CONTEXT_LAYOUT_TEMPLATE_CONFIG, templateConfig);
	
</script>

<Letter />
