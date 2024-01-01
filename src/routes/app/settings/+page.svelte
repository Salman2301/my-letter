<script lang="ts">
	import FormContainer from "$lib/components/form/FormContainer.svelte";
	import Input from "$lib/components/form/Input.svelte";
	import { supabase } from "$lib/supabase";
	import { onMount } from "svelte";

  import type { Tables } from "$lib/database.types";

  let form = {
    nick_name: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    id: ""
  } satisfies Partial<Tables<"users">> 

  export let isLoading: boolean = true;
  let formInstance: any;

  onMount(async ()=>{
    
    const { data, error } = await supabase
      .from('users')
      .select("*")

    if(!data || !data[0]) return;
    form = data[0] as any;
    
    isLoading = false;

  })
  
  async function handleSubmit(e: any) {
    e?.preventDefault();

    const { data, error } = await supabase
      .from('users')
      .update(form)
      .eq("id", form.id)

    if( error ) {
      console.error({error, form });    
      formInstance.setErrorMessage("Invalid form data: Please check and try again!");
      return;
    }

    alert("Updated info!");
  }

</script>

<div class="container">
  <FormContainer
    title="My Profile"
    submitLabel="Update"
    on:submit={handleSubmit}
    bind:this={formInstance}
    disabled={isLoading}
  >
    <Input bind:value={form.nick_name} label="Nick name"/>
    <Input bind:value={form.first_name} label="First name"/>
    <Input bind:value={form.last_name} label="Last name"/>
    <Input bind:value={form.email} label="Email" type="email" disabled="{true}"/>
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