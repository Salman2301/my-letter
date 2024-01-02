<script lang="ts">
	import FormContainer from "$lib/components/form/FormContainer.svelte";
	import SectionBackground from "./Letter/Section/Background.svelte";
	import Input from "$lib/components/form/Input.svelte";
  import Tiny from "$lib/components/editor/Tiny.svelte"
	import Section1 from "../section/Section1.svelte";
	import Button from "../button/Button.svelte";

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
    submitLabel="Publish"
    on:submit={handleSubmit}
    bind:this={formInstance}
    disabled={isLoading}
  >
    <div class="flex justify-end w-full">
      <Button label="Preview"></Button>
    </div>
    <Input
      bind:value={form.title}
      label="Title"
      maxInputWidth={true}
    />

    <div class="label-letter">Letter :</div>
    <Tiny />

    <SectionBackground />
    

    <Section1 title="Trigger" description="When should the letter be sent?">

    </Section1>

    <Section1 title="Contact"  description="Select who to sent this letter">

    </Section1>

    <Section1 title="Verification" description="Verify the contact">

    </Section1>

    <Section1 title="Delete on read" description="Delete on read">

    </Section1>

    <Section1 title="Record Audio" description="Add a personalize audio you reading">

    </Section1>

    <Section1 title="Add sticker" description="Add some stickers">

    </Section1>

    <Section1 title="Anonymous"  description="Hide your info? Make them guess">

    </Section1>
  </FormContainer>
</div>


<style lang="postcss">
.container {
  @apply flex w-full  h-full justify-center;
  @apply my-4;
}
.label-letter {
  @apply font-bold text-sm;
  @apply text-left;
  @apply w-full;
}
</style>