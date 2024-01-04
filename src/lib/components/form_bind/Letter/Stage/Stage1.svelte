<script lang="ts">
	import Tiny from "$lib/components/editor/Tiny.svelte";
	import Input from "$lib/components/form/Input.svelte";
	import PreviewLetter from "../../PreviewLetter.svelte";

  export let body: string = "";
  export let title: string = "";

</script>

<div class="section section-1">
  <div class="form-content">
    <Tiny bind:html={body} />
    <Input
      bind:value={title}
      label="Title"
      maxInputWidth={true}
      theme="light"
      options={["My Apology letter"]}
    />
  </div>
  
  <div class="preview-letter">
    <PreviewLetter
      body={body}
      resizeWidth={400}
    />
  </div>
</div>


<style lang="postcss">
  .section-1 {
    @apply flex w-full  h-full justify-center;
    @apply gap-4;
  }
  
  .form-content {
    @apply justify-between flex flex-col h-full;
  }

  .preview-letter {
    height: 100%;
    @apply my-10;
    @apply flex items-center justify-center;
  }

</style>
