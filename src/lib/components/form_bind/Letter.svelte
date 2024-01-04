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
	import PreviewLetter from "./PreviewLetter.svelte";
	import { publicFile } from "$lib/helper";

  let form = {
    title: "",
    body: `<h1>heading1</h1>
<h2>heading2</h2>
<h3>heading3</h3>
<p>para</p>
<ol>
<li>Order list</li>
<li>Order list 2</li>
</ol>
<ul>
<li style="text-align: justify;">Unorder list</li>
<li style="text-align: justify;">Unorder list 2</li>
</ul>
<hr>
<blockquote>
<p style="text-align: justify;">This is a quote</p>
</blockquote>
<p style="text-align: justify;">This is a&nbsp;<strong>bold </strong><em>italic <s>strike</s>&nbsp;</em><strong><em> <s>bold</s></em></strong></p>
<p style="text-align: justify;">To the left</p>
<p style="text-align: center;">To the middle</p>
<p style="text-align: right;">To the right</p>
<p style="text-align: left;">Color <span style="background-color: rgb(224, 62, 45); color: rgb(0, 0, 0);">background red<br></span><span style="color: rgb(0, 0, 0);">Color <span style="background-color: rgb(132, 63, 161); color: rgb(236, 240, 241);">White with purple bg<br><br><br><br></span></span></p>`,
    background: publicFile("template_background", "blank.png")
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
  <!-- Section 1 -->
  <!-- Section 2 -->
  <!-- Section 3 -->
  <FormContainer
    submitLabel="Publish"
    on:submit={handleSubmit}
    bind:this={formInstance}
    disabled={isLoading}
  >
    <Tiny bind:html={form.body}/>

    <Input
      bind:value={form.title}
      label="Title"
      maxInputWidth={true}
    />

    <!-- <SectionBackground bind:selected={form.background}/> -->

  </FormContainer>
  <div class="preview-letter">
    <PreviewLetter body={form.body} background={form.background}/>
  </div>
</div>


<style lang="postcss">
.container {
  @apply flex w-full  h-full justify-center;
  @apply my-4;
  @apply gap-4;
}
  .preview-letter {
    position: sticky;
    top: 4.5rem;
    height: 100%;
  }
</style>