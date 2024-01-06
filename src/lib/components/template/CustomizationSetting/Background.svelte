<script lang="ts">
	import TitleCustomization from "./TitleCustomization.svelte";
	import InputUploadBtn from "$lib/components/form/InputUploadBtn.svelte";
	import ButtonColor from "$lib/components/form/ButtonColor.svelte";

  function handleUploadFile(ev: CustomEvent<{url: string}>) {
    const { url } = ev.detail;
    console.log(" upload file url : ", url)
  }

  let colorValue: string = "#000";

</script>

<div class="background-container">
  <TitleCustomization content="Background" />
  <div class="buttons" >
    <ButtonColor 
      label="Select a background"
      bind:colorValue={colorValue}
    />
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

</style>