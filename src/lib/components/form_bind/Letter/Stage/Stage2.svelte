<script lang="ts">
	import PreviewLetter from "../../PreviewLetter.svelte";

  interface TabItem {
    title: string;
    id: string;
  }
  
  export let body: string = "";
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

<div class="section section-2">
  <PreviewLetter body={body}/>
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
    @apply text-primary;
    @apply bg-secondary;
    @apply font-bold;
  }

  .tab-item > p {
    @apply text-center;
    @apply w-full;
  } 

</style>
