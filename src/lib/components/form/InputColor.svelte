<script lang="ts">
	import clickOutside from '$lib/action/click-outside';
	import ColorPicker from 'svelte-awesome-color-picker';
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();

  export let colorValue:string = "#000";
  export let isOpen: boolean = false;
  export let disableClickOutside: boolean = false;

  $: if(colorValue) handleInput();
  $: if( !isOpen ) handleInput();

  function hide() { 
    if(disableClickOutside) return;
    isOpen = false;
  }

  let debouncerTimer: number | undefined;

  function handleInput() {
    if(debouncerTimer) return;
    debouncerTimer = setTimeout(()=>{
      dispatch("change", { value: colorValue });
      clearTimeout(debouncerTimer);
      debouncerTimer = undefined;
    }, 300)
  }

</script>

<div class="input-color" use:clickOutside={{ cb: hide }}>
  <button
    class="color-input"
    style="background:{colorValue}"
    on:click={()=>isOpen=!isOpen}
    type="button"
  >
  </button>
  <div class="color-picker">
    <ColorPicker
      label=""
      bind:hex={colorValue}
      on:input={handleInput}
      bind:isOpen={isOpen}
      isTextInput={false}
      isInput={false}
      isPopup={false}
    />
  </div>
  <div class="color-picker">
  </div>
</div>

<style lang="postcss">
  .input-color {
    @apply relative;
    @apply flex items-center;
  }
  .color-picker {
    @apply absolute;
    z-index: 40;
  }
  .color-input {
    @apply w-5 h-5 rounded-full;
    @apply border border-secondary-foreground;
  }
</style>
