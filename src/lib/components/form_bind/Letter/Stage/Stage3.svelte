<script lang="ts">
	import Dropdown from "$lib/components/form/Dropdown.svelte";
  import FormContainer from "$lib/components/form/FormContainer.svelte";
	import Input from "$lib/components/form/Input.svelte";
	import InputCheckbox from "$lib/components/form/InputCheckbox.svelte";

  const dropdownOptions = [
    {
      label: "Publish",
      value: "publish"
    },
    {
      label: "Specific Date",
      value: "date"
    }
  ]
  export let sendOn: string = "publish";
  export let selectedSendOnDate: any = new Date();
  export let isPasswordProtect: boolean = false;
  export let passwordProtected: string = "";

  function handleSubmit(e: any) {
    // Save the form to supabase
  }
</script>

<div class="stage-3-container">
  <h3>Almost done!</h3>
  <FormContainer on:submit={handleSubmit}>
    <div class="form-elements">
      <span>
        <div class="label">Send this letter on </div>
        <div class="dropdown-container">
          <Dropdown options={dropdownOptions} bind:value={sendOn} />
        </div>
      </span>

      {#if sendOn==="date"}
        Date picker here
      {/if}

      <InputCheckbox bind:checked={isPasswordProtect} label="Password protect this page"/>
      {#if isPasswordProtect }
        <Input bind:value={passwordProtected} type="password" label="Password"/>
      {/if}
      <InputCheckbox label="Send email / sms to the recipient"/>
      <InputCheckbox label="Send OTP to recipient before showing"/>
      <InputCheckbox label="Remove the public link once the user read"/>
      <InputCheckbox label="Send as Anonymous. (Make sure you don't include it in the letter body)"/>
      <InputCheckbox label="Display no Ads."/>
    </div>
  </FormContainer>
</div>

<style lang="postcss">
  .stage-3-container {
    @apply py-2;
  }

  h3 {
    @apply text-center font-semibold text-lg;
  }

  .form-elements {
    @apply flex justify-center flex-col;
  }

  span {
    @apply flex gap-2 justify-center items-center;
    width: 400px;
  }
</style>