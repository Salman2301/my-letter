<script lang="ts">
	import FormContainer from "$lib/components/form/FormContainer.svelte";
	import Input from "$lib/components/form/Input.svelte";
  import { supabase } from '$lib/supabase';
	import LinkText from "$lib/components/text/LinkText.svelte";
	import { goto } from "$app/navigation";

  let form = {
    email: ""
  }

  async function handleSubmit() {
    let { data, error } = await supabase.auth.resetPasswordForEmail(form.email);
    goto("/app")
  }
 
</script>

<FormContainer title="Forget password" submitLabel="Submit" on:submit={handleSubmit}>
  <Input label="Email" bind:value={form.email} type="email" />
  <LinkText href="/auth/login" content="Click here to login"/>
</FormContainer>
