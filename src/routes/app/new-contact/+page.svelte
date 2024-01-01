<script lang="ts">
	import { goto } from "$app/navigation";
	import FormContainer from "$lib/components/form/FormContainer.svelte";
	import Input from "$lib/components/form/Input.svelte";
  import type { Tables } from "$lib/database.types";
	import { supabase } from "$lib/supabase";
  let form = {
    nick_name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",

  } satisfies  Partial<Tables<"contact">> 

  let formInstance: any;
  
  async function handleSubmit(e: any) {
    e?.preventDefault();
    const { data, error } = await supabase
      .from('contact')
      .insert([ form ])
      .select()

    if( error ) {
      console.error({error, form });    
      formInstance.setErrorMessage("Invalid form data: Please check and try again!");
      return;
    }

    goto("/app/my-contacts")
  }

</script>

<div class="container">
  <FormContainer title="New Contact" submitLabel="Add Contact" on:submit={handleSubmit} bind:this={formInstance}>
    <Input bind:value={form.nick_name} label="Nick name"/>
    <Input bind:value={form.first_name} label="First name"/>
    <Input bind:value={form.last_name} label="Last name"/>
    <Input bind:value={form.email} label="Email" type="email"/>
    <Input bind:value={form.phone} label="phone" type="phone"/>
  </FormContainer>
</div>

<style lang="postcss">
.container {
  @apply flex w-full justify-center;
  @apply my-4;
  height: 420px;
}
</style>