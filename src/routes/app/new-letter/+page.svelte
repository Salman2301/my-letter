<script lang="ts">
	import Letter from '$lib/components/form_bind/Letter.svelte';
	import { setContext } from 'svelte';
	import { CONTEXT_LAYOUT_TEMPLATE_CONFIG, templateConfig } from '$lib/components/template/store';
	import { LogToWindow } from '$lib/module/logWindows';

	setContext(CONTEXT_LAYOUT_TEMPLATE_CONFIG, templateConfig);

	const newLog = new LogToWindow("template_preview_letter")
	
	templateConfig.subscribe($templateConfig=>{
		newLog.log($templateConfig)
	})
	
</script>

<Letter />
