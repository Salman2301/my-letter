<script lang="ts">
	import Input from "$lib/components/form/Input.svelte";
	import FormContainer from "$lib/components/form/FormContainer.svelte";
	import { goto } from "$app/navigation";
  import { supabase } from "$lib/supabase";
	import { onMount } from "svelte";
  
  import type { Tables } from "$lib/database.types";
	
  let form = {
    nick_name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",

  } satisfies  Partial<Tables<"contact">> 

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
    }
    
    isLoading = false;
  });
  
  async function handleSubmit(e: any) {
    e?.preventDefault();
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
    title="{isEditMode ? "Update Contact" : "New Contact"}"
    submitLabel="{isEditMode ? "Update Contact" : "Add Contact"}"
    disabled={isLoading}
    on:submit={handleSubmit}
    bind:this={formInstance}
  >
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
  height: 420px;
}
</style>