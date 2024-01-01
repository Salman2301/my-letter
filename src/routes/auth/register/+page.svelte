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

  let formInstance: any;
  async function handleSubmit(e: any) {
    e?.preventDefault();
    let { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password
    });
    if( error ) {
      formInstance.setErrorMessage("Please check all the input and try again!")
    }
    else {
      goto("/app")
    }
  }
 
</script>

<FormContainer title="Register" submitLabel="Register" on:submit={handleSubmit} bind:this={formInstance}>
  <Input label="Email" bind:value={form.email} type="email" />
  <Input label="Password" bind:value={form.password }  type="password"/>
  <LinkText href="/auth/forget-password" content="Forget password?" align="right"/>
  <LinkText href="/auth/login" content="Click here to login"/>
</FormContainer>
