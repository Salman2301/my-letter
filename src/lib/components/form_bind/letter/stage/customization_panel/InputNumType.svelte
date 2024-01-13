<script lang="ts" context="module">
  export type TypeLabel = "px" | "rem" | "%";
</script>
<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let value: number = 0;
  export let availableTypes: TypeLabel[] = ["px", "rem", "%"];
  export let typeLabel: TypeLabel = "px";

  const dispatch = createEventDispatcher();

  function handleTypeClick() {
    let index = availableTypes.indexOf( typeLabel );
    if( (index + 1) >= availableTypes.length ) index =0
    else index = index + 1;
    
    typeLabel = availableTypes[ index ];
    dispatch("type-change", typeLabel);
  }

</script>

<div class="input-type-container">
  <input
    type="number"
    class="num-input"
    bind:value={value}
    on:change={() => dispatch("value-change", value)}
    min="0"
  />
  <button class="type-label" on:click={handleTypeClick}>{typeLabel}</button>
</div>


<style lang="postcss">
  .input-type-container {
    @apply flex gap-2;
    @apply border border-background bg-secondary;
  }
  .num-input {
    @apply bg-secondary;
		@apply text-center;
		@apply pl-2;
		height: 30px;
		width: 50px;
	}
  .type-label {
    @apply flex items-center justify-center;
    @apply cursor-pointer;
    width: 28px;
    @apply mx-1;
  }
</style>