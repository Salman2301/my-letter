<script lang="ts">
	import Input from '$lib/components/form/Input.svelte';
	import Dropdown from '$lib/components/form/Dropdown.svelte';
	import InputDate from '$lib/components/form/InputDate.svelte';
	import InputCheckbox from '$lib/components/form/InputCheckbox.svelte';
	import FormContainer from '$lib/components/form/FormContainer.svelte';

	import { letterObj } from '$lib/components/form_bind/letter/store';

	const dropdownOptions = [
		{
			label: 'Publish',
			value: 'publish'
		},
		{
			label: 'Specific Date',
			value: 'date'
		}
	];
	// export let sendOn: string = 'publish';
	export let password: string = '';
</script>

<div class="stage-3-container">
	<h3>Almost done!</h3>
	<FormContainer on:submit>
		<div class="form-elements">
			<span>
				<div class="label">Send this letter on</div>
				<div class="dropdown-container">
					<Dropdown options={dropdownOptions} bind:value={$letterObj.trigger_method} />
				</div>
			</span>

			{#if $letterObj.trigger_method === 'date'}
				<!-- not sure why this is erroring -->
				<InputDate bind:value={$letterObj.trigger_date} />
			{/if}

			<InputCheckbox
				bind:checked={$letterObj.is_password_protected}
				label="Password protect this page"
			/>
			{#if $letterObj.is_password_protected}
				<Input bind:value={password} type="password" label="Password" />
			{/if}
			<InputCheckbox
				label="Send email / sms to the recipient"
				bind:checked={$letterObj.alert_via_email}
			/>
			<InputCheckbox
				label="Send OTP to recipient before showing"
				bind:checked={$letterObj.verify_reader}
			/>
			<InputCheckbox
				label="Remove the public link once the user read"
				bind:checked={$letterObj.read_only_once}
			/>
			<InputCheckbox
				label="Send as Anonymous. (Make sure you don't include it in the letter body)"
				bind:checked={$letterObj.anonymous}
			/>
			<InputCheckbox label="Display no Ads." bind:checked={$letterObj.paid} />
		</div>
	</FormContainer>
</div>

<style lang="postcss">
	.stage-3-container {
		@apply py-2;
	}

	h3 {
		@apply text-center text-lg font-semibold;
	}

	.form-elements {
		@apply flex flex-col justify-center;
	}

	span {
		@apply flex items-center justify-center gap-2;
		width: 400px;
	}
</style>
