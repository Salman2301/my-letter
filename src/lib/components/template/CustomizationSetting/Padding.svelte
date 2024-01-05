<script lang="ts">
  import InputFour from "./InputFour.svelte";
	import TitleCustomization from "./TitleCustomization.svelte";
  import { getContext } from "svelte";
	import { CONTEXT_LAYOUT_TEMPLATE_CONFIG } from "../store";

  import type { Writable } from "svelte/store";
	import type { TemplateConfig } from "../types";

  const templateConfigStore: Writable<TemplateConfig> = getContext(CONTEXT_LAYOUT_TEMPLATE_CONFIG);  

</script>

<div class="padding-container">
  <TitleCustomization content="Padding" textCenter={true} />
  <InputFour hasColorInput={false} hasStrokeInput={false}/>
</div>


<style lang="postcss">
  .padding-container {
    @apply w-full h-full;
  }
</style>