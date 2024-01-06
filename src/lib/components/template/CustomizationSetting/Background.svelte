<script lang="ts">
	import TitleCustomization from "./TitleCustomization.svelte";
  import { getContext } from "svelte";
	import { CONTEXT_LAYOUT_TEMPLATE_CONFIG } from "../store";
  import { v4 as uuid } from "uuid";
  
	import { supabase } from "$lib/supabase";
	import { setSignedUrl } from "$lib/module/storage";
	import { UploadIcon } from "svelte-feather-icons";
	import Loader from "$lib/components/Loader.svelte";

  import type { Writable } from "svelte/store";
	import type { TemplateConfig } from "../types";

  export let fileInput: HTMLInputElement| undefined = undefined;
  export let files: FileList | undefined = undefined;

  const templateConfigStore: Writable<TemplateConfig> = getContext(CONTEXT_LAYOUT_TEMPLATE_CONFIG);  


  export function reset() {
    files=undefined;
    if(fileInput) fileInput.value = "";
  }

  export let disabled: boolean = false;
  export let isUploading: boolean = false;

  async function handleChange() {
    try {
      isUploading = true;
      disabled = true;

      if( !files?.length ) {
        disabled = false;
        return;
      }
      // TODO: Upload the image to Supabase
      const file = files[0];
      const { type } = file;
      let ext = "png";
      
      if( type === "image/png" ) { ext = "png" } 
      else { ext = "jpg" }

      const { data: userData } = await supabase.from("users").select("*");

      if( !userData || userData.length === 0 ) throw new Error("Failed to get the current user!");

      const user = userData[0];
      let fileLocation = `${user.id}/${uuid()}.${ext}`;
      
      const { data, error } = await supabase
        .storage
        .from('user_background')
        .upload(fileLocation, file, {
          // cacheControl: 'no-cache', TODO: REMOVE CACHE ON UPDATE
          upsert: true
        });
    
      if( error ) {
        console.error(error);
        throw new Error(JSON.stringify(error));
      }
    
      const TWO_DAYS = 2 * 24 * 60 * 60;
      const { data: dataSignedUrl, error: signedUrlError } = await supabase.storage.from("user_background").createSignedUrl(fileLocation, TWO_DAYS)

      if(signedUrlError) {
        throw new Error(JSON.stringify(signedUrlError));
      }
      setSignedUrl(fileLocation, dataSignedUrl.signedUrl)


      // Save the file location to svelte store
      // Keep a local storage of signed URL with the exp time


      // const fileReader = new FileReader();
      // fileReader.readAsDataURL(files[0]);
      // fileReader.addEventListener("load", function () {
      //   // previewImageValue = this.result as string;
      // });    

      isUploading = false;
      disabled = false;
    }
    catch(e) {
      console.error(e);
      isUploading = false;
      disabled = false;
    }
  }
    
</script>

<div class="background-container">
  <TitleCustomization content="Background" />
  <div class="body">
    <div class="select-background-image-container">
      <label
        for="background-image-input"
        class="btn-upload"
        class:disabled={disabled}
      >
        {#if isUploading}
          <Loader />
        {:else}
          <div class="icon">
            <UploadIcon size="20" />
          </div>
          <div class="label">
            Upload a background
          </div>
        {/if}
      </label>
      <input
        type="file"
        id="background-image-input"

        multiple={false}
        accept="image/png, image/jpeg"
        hidden
        bind:files={files}
        bind:this={fileInput}
        on:change={handleChange}
        {disabled}
      >
    </div>
  </div>
</div>


<style lang="postcss">
  .background-container {
    @apply w-full h-full;
  }

  .btn-upload {
    @apply flex gap-2 justify-center items-center;
    @apply bg-background px-1 py-2;
    @apply rounded-sm; 
  }

  .btn-upload:hover:not(.disabled) {
    @apply underline;
    @apply text-background bg-foreground;
  }

  .btn-upload.disabled {
    @apply text-background bg-gray-500;
    @apply cursor-not-allowed;
  }
</style>