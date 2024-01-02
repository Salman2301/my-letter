<script lang="ts">
	import Input from "$lib/components/form/Input.svelte";
	import ImageInput from "$lib/components/form/ImageInput.svelte";
	import FormContainer from "$lib/components/form/FormContainer.svelte";
	import { supabase } from "$lib/supabase";
	import { onMount } from "svelte";

  import type { Tables } from "$lib/database.types";
	import { returnPhotoBlob } from "$lib/helper";
	import Loader from "$lib/components/Loader.svelte";

  let form = {
    nick_name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    id: "",
    photo: ""
  } satisfies Partial<Tables<"users">> 

  let profileFiles: FileList;
  let currentImageValue: string | undefined;

  export let isLoading: boolean = true;
  let formInstance: any;

  onMount(async ()=>{
    const { data, error } = await supabase
      .from('users')
      .select("*")

    if(!data || !data[0]) return;
    form = data[0] as any;
    
    if( form.photo) {
      currentImageValue = await returnPhotoBlob("profile_photo", form.photo);
    }
    isLoading = false;

  })

  let uploadedBtnInstance: any;
  let isSubmitting: boolean = false;
  
  async function handleSubmit(e: any) {
    try {
      e?.preventDefault();
      isSubmitting = true;

      if( profileFiles.length > 0 ) {
        const file = profileFiles[0];
        const { type } = file;
        let ext = "png";
        if( type === "image/png" ) {
          ext = "png"
        } 
        else {
          ext = "jpg"
        }
        let fileLocation = `${form.id}.${ext}`;
        
        const { data, error } = await supabase
          .storage
          .from('profile_photo')
          .upload(fileLocation, profileFiles[0], {
            // cacheControl: 'no-cache', //TODO: REMOVE CACHE ON UPDATE
            upsert: true
          });
        
          if( error ) {
            formInstance.setErrorMessage("Failed to upload photo!");
            console.error(error);
            console.warn(fileLocation)
            throw new Error("Failed to upload photo")
          }
        form.photo = fileLocation;
      }

      const { data, error } = await supabase
        .from('users')
        .update(form)
        .eq("id", form.id)

      if( error ) {
        console.error({error, form });    
        formInstance.setErrorMessage("Invalid form data: Please check and try again!");
        return;
      }

      if( form.photo) {
        currentImageValue = await returnPhotoBlob("profile_photo", form.photo);
      }
      uploadedBtnInstance.uploaded(form.photo)
      alert("Updated info!")
      isSubmitting = false;
    
    }
    catch(e) {
      console.error(e);
      isSubmitting = false;
    }
  }

</script>

<div class="container">
  {#if isLoading}
    <Loader />
  {:else}
    <FormContainer
      title="My Profile"
      submitLabel="Update"
      on:submit={handleSubmit}
      bind:this={formInstance}
      disabled={isLoading || isSubmitting}
    >
      <ImageInput bind:files={profileFiles} currentImageValue={currentImageValue} bind:this={uploadedBtnInstance}/>
      <Input bind:value={form.nick_name} label="Nick name"/>
      <Input bind:value={form.first_name} label="First name"/>
      <Input bind:value={form.last_name} label="Last name"/>
      <Input bind:value={form.email} label="Email" type="email" disabled="{true}"/>
      <Input bind:value={form.phone} label="phone" type="phone"/>
    </FormContainer>
  {/if}
</div>

<style lang="postcss">
.container {
  @apply flex w-full justify-center;
  @apply my-4;
  height: 100%;
  max-width: 380px;
}
</style>