<script lang="ts">
  import { getContext } from "svelte";
	import { CONTEXT_LAYOUT_TEMPLATE_CONFIG } from "../store";
  
  import type { Writable } from "svelte/store";
	import type { TemplateConfig } from "../types";


  const templateConfigStore: Writable<TemplateConfig> = getContext(CONTEXT_LAYOUT_TEMPLATE_CONFIG);  

</script>

<div class="background-container">
background setting
</div>


<style lang="postcss">
  .background-container {
    @apply w-full h-full;
    @apply border border-white;
  }
</style>