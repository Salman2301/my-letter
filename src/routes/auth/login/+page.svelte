<script lang="ts">
	import FormContainer from "$lib/components/form/FormContainer.svelte";
	import Input from "$lib/components/form/Input.svelte";
  import { supabase } from '$lib/supabase';
	import LinkText from "$lib/components/text/LinkText.svelte";
	import { goto } from "$app/navigation";

  let form = {
    email: "",
    password: ""
  }

  async function handleSubmit() {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    });
    goto("/app")
  }
 
</script>

<FormContainer title="Login" submitLabel="Login" on:submit={handleSubmit}>
  <Input label="Email" bind:value={form.email} type="email" />
  <Input label="Password" bind:value={form.password }  type="password"/>
  <LinkText href="/auth/forget-password" content="Forget password" align="right"/>
  <LinkText href="/auth/register" content="Click here to register"/>
</FormContainer>
