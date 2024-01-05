<script lang="ts">
	import Button from "../button/Button.svelte";
  import Stage1 from "./Letter/Stage/Stage1.svelte";
  import Stage2 from "./Letter/Stage/Stage2.svelte";
	import Stage3 from "./Letter/Stage/Stage3.svelte";

  import { supabase } from "$lib/supabase";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { publicFile } from "$lib/helper";
	import { Edit2Icon, SendIcon, TableIcon } from "svelte-feather-icons";


  import type { Tables } from "$lib/database.types";

  type Stage = "1" | "2" | "3";

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
  export let stage: Stage = "2";

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

  interface SectionMenu {
    title: string;
    icon: any;
    stage: Stage;
  }
  let sectionMenu: SectionMenu[] = [
    {
      title: "Content",
      icon: Edit2Icon,
      stage: "1"
    },
    {
      title: "Template",
      icon: TableIcon,
      stage: "2"
    },
    {
      title: "Send",
      icon: SendIcon,
      stage: "3"
    }
  ];

  function handleNext() {
    if( stage === "1"){
      stage = "2";
      return;
    }
    if( stage === "2") {
      stage = "3"
      return;
    };
  }
  function handlePrev() {
    if( stage === "3"){
      stage = "2";
      return;
    }
    if( stage === "2") {
      stage = "1"
      return;
    };
  }

  let selectedTemplateId: string = "blank";
</script>

<div class="container">
  <div class="section-menu">
    {#each sectionMenu as item}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="section-item"
        class:complete="{Number(stage) >= Number(item.stage)}"
        on:click={()=>stage=item.stage}
        role="button"
        tabindex="0"
      >
        <div class="icon"><svelte:component this={item.icon}/></div>
        <div class="title">{item.title}</div>
      </div>
    {/each}
  </div>

  <div class="stages">
    {#if stage === "1"}
      <Stage1 bind:body={form.body} bind:title={form.title} {selectedTemplateId} />
    {:else if stage === "2"}
      <Stage2 body={form.body} bind:selectedTemplateId={selectedTemplateId} />
    {:else if stage === "3"}
      <Stage3 />
    {/if}
    
    <div class="action">
      <Button label="Prev" on:click={handlePrev} disabled={stage==="1"}/>  
      <Button label="Next" on:click={handleNext} disabled={stage==="3"}/>
    </div>
  </div>
  
</div>


<style lang="postcss">
  .container {
    @apply my-4;
  }

  .stages {
    @apply bg-secondary;
    @apply rounded-md;
    max-width: 1280px;
  }

  .section-menu {
    @apply flex gap-2 justify-evenly;
    @apply my-4;
  }
  .section-item {
    @apply flex flex-col gap-2;
    @apply text-gray-500;
  }
  .complete {
    @apply text-white;
  }
  .section-item .title {
    @apply text-center;
  }
  .icon {
    @apply w-14 h-14;
    @apply rounded-full;
    @apply bg-secondary;
    @apply text-center;
    @apply flex items-center justify-center;
  }
  /* end of section menu  */
  .section{
    @apply pb-8;
  }

  .action {
    @apply flex gap-8 justify-center;
    @apply pb-2;
  }
</style>
