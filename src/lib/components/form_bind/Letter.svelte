<script lang="ts">
	import Input from "$lib/components/form/Input.svelte";
  import Tiny from "$lib/components/editor/Tiny.svelte"
	import Button from "../button/Button.svelte";

  import { supabase } from "$lib/supabase";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";

  import type { Tables } from "$lib/database.types";
	import PreviewLetter from "./PreviewLetter.svelte";
	import { publicFile } from "$lib/helper";
	import { Edit2Icon, SendIcon, TableIcon } from "svelte-feather-icons";

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

  async function handleSection1Submit(e: any) {
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

  interface TabItem {
    title: string;
    id: string;
  }
  export let currTab = "template"
  export let tabTemplate: TabItem[] = [
    {
      title: "Template",
      id: "template"
    },
    {
      title: "Customization",
      id: "customization"
    }
  ]
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
      <div class="section section-1">
        <div class="form-content">
          <Tiny bind:html={form.body}/>
          <Input
            bind:value={form.title}
            label="Title"
            maxInputWidth={true}
            theme="light"
            options={["My Apology letter"]}
          />
        </div>
        
        <div class="preview-letter">
          <PreviewLetter
            body={form.body}
            background={form.background}
            resizeWidth={400}
          />
        </div>
      </div>
    {:else if stage === "2"}
      <div class="section section-2">
        <PreviewLetter body={form.body} background={form.background}/>
        <div class="templateList">
          <div class="tabs">
            <div class="tab-menu">
              {#each tabTemplate as item}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                  class="tab-item"
                  on:click={()=>{currTab=item.id}}
                  class:active={currTab===item.id}
                  role="button"
                  tabindex="0"
                >
                  <p>{item.title}</p>
                </div>
              {/each}
            </div>
            <div class="tab-body">
              {#if currTab === "template"}
                <div class="tab">This is a template</div>
              {/if}
              {#if currTab === "customization"}
                <div class="tab">This is setting!!1</div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    {:else if stage === "3"}
      <div class="section section-2">

      </div>
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
  }

  .section-menu {
    @apply flex gap-2 justify-evenly;
    @apply my-4;
  }
  .section-item {
    @apply flex flex-col gap-2;
    @apply text-popover-foreground;
  }
  .complete {
    @apply text-primary;
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
  .section.section-1 {
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

  .action {
    @apply flex gap-8 justify-center;
    @apply pb-2;
  }

  .section-2 {
    @apply p-2;
    @apply flex gap-2;
  }

  .templateList {
    @apply border border-secondary-foreground;
    @apply w-full;
  }

  .tab-menu {
    @apply flex;
    @apply justify-evenly;
    @apply h-10;
  }


  .tab-item {
    @apply w-full h-full;
    @apply flex items-center;
    @apply bg-secondary-foreground;
    @apply text-secondary;
    @apply items-center;
  }
  .tab-item.active {
    @apply text-primary;
    @apply bg-secondary;
    @apply font-bold;
  }

  .tab-item > p {
    @apply text-center;
    @apply w-full;
  } 


</style>