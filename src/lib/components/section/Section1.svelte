<script lang="ts">
  import * as  Card from '$lib/components/ui/card';
	import { InfoIcon } from 'svelte-feather-icons';

  export let title: string = "My Title";
  export let description: string = "";
</script>


<Card.Root class="w-full min-h-20 bg-secondary border-primary-foreground my-2 p-2">
  <Card.Title class="Title">
    <p class="title">{title}</p>
  </Card.Title>
  {#if description}
    <Card.Description>
      <div class="description">
        <div class="icon"><InfoIcon size="16"/></div>
        <p>{description}</p>        
      </div>
    </Card.Description>
  {/if}
  <Card.Content>
    <slot name="content"></slot>
  </Card.Content>
</Card.Root>

<style lang="postcss">
  .title {
    @apply text-left;
    @apply text-lg;
  }

  .description {
    @apply flex gap-2 items-center;
  }
</style>