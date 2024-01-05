<script lang="ts">
	import InputCheckbox from "$lib/components/form/InputCheckbox.svelte";
	import PreviewLetter from "../../PreviewLetter.svelte";

	import { templateList } from "$lib/components/template";
	import { genId } from "$lib/helper";

	import type { TemplateConfigWithId } from "$lib/components/template/types";

  interface TabItem {
    title: string;
    id: string;
  }
  
  export let body: string = "";
  
  export let selectedTemplateId: string = "blank";
  
  let currTab = "template"
  let tabTemplate: TabItem[] = [
    {
      title: "Template",
      id: "template"
    },
    {
      title: "Customization",
      id: "customization"
    }
  ]
  interface TemplateCheck extends TemplateConfigWithId {
    checked: boolean;
  }

  let template: TemplateCheck[] = Object.values(templateList).map(e=>({...e, checked: false}));
  template[0].checked = true;

  function uncheckRest(itemId: string) {
    template = template.map(item=>{
      item.checked = itemId === item.id;
      if(item.checked) {
        selectedTemplateId = item.id;
      }
      return item;
    });
  }

</script>

<div class="section section-2">
  <PreviewLetter body={body} {selectedTemplateId}/>
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
          <div class="templates">
            {#each template as item, idx}
              {@const checkboxId = `checkbox_${genId()}`}
              <label for="{checkboxId}">
                <div class="card">
                  <div class="checkbox">
                    <InputCheckbox
                      id={checkboxId}
                      on:checked={()=>uncheckRest(item.id)}
                      bind:checked={template[idx].checked}
                    />
                  </div>
                  <PreviewLetter config={item} body="{body}" resizeWidth={200} selectedTemplateId={item.id} />
                  <div class="title">{item.id}</div>
                </div>
              </label>
            {/each}
          </div>
        {/if}
        {#if currTab === "customization"}
          <div class="tab">This is setting!!1</div>
        {/if}
      </div>
    </div>
  </div>
</div>


<style lang="postcss">

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
    @apply text-white;
    @apply bg-secondary;
    @apply font-bold;
  }

  .tab-item > p {
    @apply text-center;
    @apply w-full;
  } 

  .templates {
    @apply flex gap-2 justify-start mx-auto w-full;
    @apply mt-2;
    @apply flex-wrap;
    @apply px-4;
  }

  .card {
    @apply relative;
  }

  .checkbox {
    @apply w-full h-full;
    @apply flex justify-end items-start;
    @apply absolute;
    @apply z-10;
    @apply p-2;
  }

  .title {
    @apply text-center;

  }
</style>
