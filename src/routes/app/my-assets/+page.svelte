<script lang="ts">
	import * as Card from "$lib/components/ui/card";
</script>

<div class="container">
  <Card.Root>
    <Card.Title>
      <div class="title"> My Fonts </div>
    </Card.Title>
    <Card.Content>
      Font List
    </Card.Content>
  </Card.Root>

  <Card.Root>
    <Card.Title>
      <div class="title">Background Image</div>
    </Card.Title>
    <Card.Content>
      Background Image List
    </Card.Content>
  </Card.Root>

  <Card.Root>
    <Card.Title>
      <div class="title">My Footer</div>
    </Card.Title>
    <Card.Content>
      Footer List
    </Card.Content>
  </Card.Root>
</div>

<style lang="postcss">
  .container {
    @apply flex gap-2 flex-col my-1 mt-10;
  }

  .title {
    @apply text-center;
    @apply my-1;
  }

</style>