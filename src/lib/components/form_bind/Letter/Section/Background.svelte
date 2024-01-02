<script lang="ts">
	import Loader from "$lib/components/Loader.svelte";
	import InputCheckbox from "$lib/components/form/InputCheckbox.svelte";
	import Section1 from "$lib/components/section/Section1.svelte";
  
  import { supabase } from "$lib/supabase";
	import { onMount } from "svelte";
  import { genId } from "$lib/helper";

	import type { Tables } from "$lib/database.types";

  interface template_checked extends Tables<"template_background"> {
    checked: boolean;
  }
  let template: template_checked[] = [];

  let state: "LOADING" | "ERROR" | "EMPTY" | "DONE" = "LOADING";
  
  onMount(async ()=>{
    
    const { data, error } = await supabase.from("template_background").select("*");
    if( error ) {
      state = "ERROR";
      console.error(error);
    } 
    else if( data.length === 0) {
      state = "EMPTY";
    }
    else {
      state = "DONE";
      template = data.map(e=>({...e, checked: false}));
      template[0].checked = true;
    }
  });

  function uncheckRest(itemId: string) {
    template = template.map(item=>{
      item.checked = itemId === item.id;
      return item;
    });
  }
</script>



<Section1 title="Background"  description="Select an background image">
  <div class="content" slot="content">
    {#if state === "LOADING"}
      <Loader />
    {:else if state === "EMPTY"}
      <p class="text-center my-2">No background image found</p>
    {:else if state === "ERROR"}
      <p class="text-center my-2 text-destructive">No background image found</p>
    {:else if state === "DONE"}
      <div class="cards">
        {#each template as item, idx}
          {@const checkboxId = `checkbox_${genId()}`}
          <label for="{checkboxId}">
            <div class="card">
              <div class="checbox">
                <InputCheckbox
                  id={checkboxId}
                  on:checked={()=>uncheckRest(item.id)}
                  bind:checked={template[idx].checked}
                />
              </div>
              <img src={item.src} width="150px"  alt="background template"/>
              <div class="title">{item.name}</div>
            </div>
          </label>

        {/each}
      </div>
    {/if}
  </div>
</Section1>

<style lang="postcss">
  .cards {
    @apply flex gap-2;
  }
  .card {
    @apply border-primary-foreground;
  }
  .card img {
    aspect-ratio: 1 / 1.41;
  }
  .card .title {
    @apply text-center;
    @apply my-1;
  }
</style>
