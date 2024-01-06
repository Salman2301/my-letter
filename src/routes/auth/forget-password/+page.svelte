<script lang="ts">
	import FormContainer from '$lib/components/form/FormContainer.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import { supabase } from '$lib/supabase';
	import LinkText from '$lib/components/text/LinkText.svelte';
	import { goto } from '$app/navigation';
	import { env } from '$env/dynamic/public';

	let form = {
		email: ''
	};

	let formInstance: any;
	async function handleSubmit(e: any) {
		e?.preventDefault();
		const redirectTo = `${env.PUBLIC_BASE_URL}/auth/reset-password`;
		let { data, error } = await supabase.auth.resetPasswordForEmail(form.email, { redirectTo });
		// TODO: show a popup that says reset password has sent to the email

		if (error) {
			formInstance.setErrorMessage(`Invalid email ${form.email}, No user found!`);
		} else {
			console.log('Email sent show a popup?');
		}
	}
</script>

<FormContainer
	title="Forget password"
	submitLabel="Submit"
	on:submit={handleSubmit}
	bind:this={formInstance}
	widthMode="compact"
>
	<Input label="Email" bind:value={form.email} type="email" />
	<LinkText href="/auth/login" content="Click here to login" />
</FormContainer>
