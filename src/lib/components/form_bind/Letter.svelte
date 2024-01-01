<script lang="ts">
	import FormContainer from "$lib/components/form/FormContainer.svelte";
	import Input from "$lib/components/form/Input.svelte";
	import { supabase } from "$lib/supabase";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

  import type { Tables } from "$lib/database.types";

  let form = {
    title: "",
  } satisfies Partial<Tables<"letter">> 

  export let isEditMode: boolean = false;
  export let editId: string = "";
  export let isLoading: boolean = true;

  let formInstance: any;

  onMount(async ()=>{
    if( isEditMode && editId ) {
      const { data, error } = await supabase
        .from('letter')
        .select("*")
        .eq("id", editId)
      
      if(!data?.[0]) {
        // error failed to retrieve data
        goto("/app/my-letters");
        return;
      };

      form = data[0] as any;
    }
    
    isLoading = false;
  });
  
  async function handleSubmit(e: any) {
    e?.preventDefault();

    const { data, error } = await supabase
      .from('letter')
      .upsert(form)
      .select();

    if( error ) {
      console.error({error, form });    
      formInstance.setErrorMessage("Invalid form data: Please check and try again!");
      return;
    }

    goto("/app/my-letters");
  }

</script>

<div class="container">
  <FormContainer
    submitLabel="{isEditMode ? "Update" : "Submit" }"
    on:submit={handleSubmit}
    bind:this={formInstance}
    disabled={isLoading}
  >
    <Input bind:value={form.title} label="Title"/>
  </FormContainer>
</div>

<style lang="postcss">
.container {
  @apply flex w-full  h-full justify-center;
  @apply my-4;
}
</style>