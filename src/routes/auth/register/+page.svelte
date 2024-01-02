<script lang="ts">
	import FormContainer from "$lib/components/form/FormContainer.svelte";
	import Input from "$lib/components/form/Input.svelte";
	import LinkText from "$lib/components/text/LinkText.svelte";
  import { supabase } from '$lib/supabase';
	import { goto } from "$app/navigation";

  let form = {
    email: "",
    password: "",
    re_password: ""
  }

  let formInstance: any;
  async function handleSubmit(e: any) {
    e?.preventDefault();
    
    const { isValid, errorMessage } = checkValidation();

    if( !isValid ) {
      formInstance.setErrorMessage(errorMessage);
      throw new Error(`Form Error: ${errorMessage}`);
    }
    
    let { data, error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password
    });

    if( !data.user ) return;

    const { data: profileData, error: profileError } = await supabase.from("users").insert({ email: form.email, _owner:data.user.id })
    
    if( error || profileError ) {
      formInstance.setErrorMessage("Please check all the input and try again!");
    }
    else {
      goto("/app")
    }
  }
  
  function checkValidation() {
    if( !form.email ) {
      return { isValid: false, errorMessage: "Email cannot be empty!"}
    }
    
    if( !form.password ) {
      return { isValid: false, errorMessage: "Password cannot be empty!"}
    }
    
    if( form.password.length < 7 ) {
      return { isValid: false, errorMessage: "Password needs to be minimum 6 character!"}
    }

    if( form.password !== form.re_password ) {
      return { isValid: false, errorMessage: "Password didn't match!"}
    }

    return { isValid: true }
  }

</script>

<FormContainer
  title="Register"
  submitLabel="Register"
  on:submit={handleSubmit}
  bind:this={formInstance}
  widthMode="compact"
>
  <Input label="Email" bind:value={form.email} type="email" />
  <Input label="Password" bind:value={form.password }  type="password"/>
  <Input label="Reenter Password" bind:value={form.re_password }  type="password"/>
  <LinkText href="/auth/forget-password" content="Forget password?" align="right"/>
  <LinkText href="/auth/login" content="Click here to login"/>
</FormContainer>
