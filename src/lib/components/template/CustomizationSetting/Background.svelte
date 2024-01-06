<script lang="ts">
	import TitleCustomization from "./TitleCustomization.svelte";
	import InputUploadBtn from "$lib/components/form/InputUploadBtn.svelte";
	import InputColor from "$lib/components/form/InputColor.svelte";
	import clickOutside from "$lib/action/click-outside";

  function handleUploadFile(ev: CustomEvent<{url: string}>) {
    const { url } = ev.detail;
    console.log(" upload file url : ", url)
  }

  let showColorPicker: boolean = false;

  async function toggleColorPicker() {
    showColorPicker = !showColorPicker;
  }
</script>

<div class="background-container">
  <TitleCustomization content="Background" />
  <div class="buttons" use:clickOutside={{ cb: ()=>showColorPicker=false}}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
      role="button"
      tabindex="0"
      class="btn"
      on:click|self={toggleColorPicker}
      aria-label="Choose a background color"
    >
      <InputColor
        bind:isOpen={showColorPicker}
        disableClickOutside={true}
      />

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="label" 
        on:click|self={toggleColorPicker}
        role="button"
        tabindex="0"
        >
        Select a color
      </div>
    </div>
    <InputUploadBtn
      on:upload={handleUploadFile}
      bucket="user_background"
      label="Upload background"
    />
  </div>
</div>


<style lang="postcss">
  .buttons {
    @apply flex flex-col gap-2;
  }
  .btn {
    @apply flex justify-center gap-2;
    @apply bg-background text-secondary-foreground;
    @apply py-2 px-4;
    
  }

</style>