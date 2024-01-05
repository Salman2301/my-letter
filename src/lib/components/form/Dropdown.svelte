<script lang="ts" context="module">
  export type DropOptions = {
    label: string;
    value: string;
  }

</script>
<script lang="ts">
  export let options: DropOptions[] = [];
</script>

<select on:change >
  {#each options as {label, value} } 
    <option
      value={value}
    >
      {label}
    </option>
  {/each}
</select>

<style lang="postcss">
  select {
    @apply bg-background;
  }
</style>
