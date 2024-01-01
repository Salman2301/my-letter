<script lang="ts">
	import Input from "$lib/components/form/Input.svelte";
	import FormContainer from "$lib/components/form/FormContainer.svelte";
	import { goto } from "$app/navigation";
  import { supabase } from "$lib/supabase";
	import { onMount } from "svelte";
  
  import type { Tables } from "$lib/database.types";
	import ImageInput from "../form/ImageInput.svelte";
	
  let form = {
    nick_name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    id: "",
    photo: ""
  } satisfies  Partial<Tables<"contact">> 

  
  let profileFiles: FileList;
  let currentImageValue: string | undefined;
  let formInstance: any;
  
  export let isEditMode: boolean = false;
  export let editId: string = "";
  export let isLoading: boolean = true;
  
  onMount(async ()=>{
    if( isEditMode && editId ) {
      const { data, error } = await supabase
        .from('contact')
        .select("*")
        .eq("id", editId)

      if(!data?.[0]) {
        // error failed to retrieve data
        goto("/app/my-contacts");
        return;
      }; 

      form = data[0] as any;

      if( form.photo ) {
        const { data: blob, error } = await supabase
          .storage
          .from('contact_photo')
          .download(form.photo);
          
        if( !error && blob ) {
          const reader = new FileReader();
          reader.onloadend = function () {
            const dataUrl = reader.result;
            currentImageValue = dataUrl as string;
          };
          reader.readAsDataURL(blob);
        }
      }
      
    }
    
    isLoading = false;
  });
  
  async function handleSubmit(e: any) {
    e?.preventDefault();

    
    if( profileFiles.length > 0 ) {
      const file = profileFiles[0];
      const { type } = file;
      let ext = "png";
      if( type === "image/png" ) { ext = "png" } 
      else { ext = "jpg" }
      const { data: userData } = await supabase.from("users").select("*");

      if( !userData || userData.length === 0 ) throw new Error("Failed to get the current user!");

      const user = userData[0];
      let fileLocation = `${user.id}/${form.id}.${ext}`;
      
      const { data, error } = await supabase
        .storage
        .from('contact_photo')
        .upload(fileLocation, profileFiles[0], {
          cacheControl: 'no-cache',
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
      .from('contact')
      .upsert(form)
      .select();

    if( error ) {
      console.error({error, form });    
      formInstance.setErrorMessage("Invalid form data: Please check and try again!");
      return;
    }

    goto("/app/my-contacts")
  }

</script>

<div class="container">
  <FormContainer
    submitLabel="{isEditMode ? "Update Contact" : "Add Contact"}"
    disabled={isLoading}
    on:submit={handleSubmit}
    bind:this={formInstance}
  >
    <ImageInput bind:files={profileFiles} currentImageValue={currentImageValue} />
    
    <Input bind:value={form.nick_name} label="Nick name"/>
    <Input bind:value={form.first_name} label="First name"/>
    <Input bind:value={form.last_name} label="Last name"/>
    <Input bind:value={form.email} label="Email" type="email"/>
    <Input bind:value={form.phone} label="phone" type="phone"/>
  </FormContainer>
</div>

<style lang="postcss">
.container {
  @apply flex w-full justify-center;
  @apply my-4;
  height: 100%;
}
</style>