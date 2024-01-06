<script lang="ts">
	import FormContainer from '$lib/components/form/FormContainer.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import LinkText from '$lib/components/text/LinkText.svelte';
	import { supabase } from '$lib/supabase';
	import { goto } from '$app/navigation';
	import { env } from '$env/dynamic/public';

	let form = {
		password: ''
	};

	let formInstance: any;
	async function handleSubmit(e: any) {
		e?.preventDefault();
		const redirectTo = `${env.PUBLIC_BASE_URL}/auth/reset-password`;
		let { data, error } = await supabase.auth.updateUser({ password: form.password });

		if (error) {
			formInstance.setErrorMessage(`Invalid password!`);
		} else {
			goto('/app');
		}
	}
</script>

<FormContainer
	title="Reset password"
	submitLabel="Submit"
	on:submit={handleSubmit}
	bind:this={formInstance}
	widthMode="compact"
>
	<Input label="New Password" bind:value={form.password} type="password" />
	<LinkText href="/auth/login" content="Click here to login" />
</FormContainer>
