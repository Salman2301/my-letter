<script lang="ts">
	import { genId } from "$lib/helper";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let checked: boolean = false;

  export let id: string = `checkbox_${genId()}`

  function handleChange() {
    dispatch("checked", { checked });
  }

</script>

<input type="checkbox" bind:checked id={id} on:change={handleChange}>
