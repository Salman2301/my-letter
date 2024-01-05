<script lang="ts">
	import Tiny from "$lib/components/editor/Tiny.svelte";
	import Input from "$lib/components/form/Input.svelte";
	import { getContext } from "svelte";
	import PreviewLetter from "../../PreviewLetter.svelte";
	import { CONTEXT_LAYOUT_TEMPLATE_CONFIG } from "$lib/components/template/store";
	import type { TemplateConfig } from "$lib/components/template/types";
	import type { Writable } from "svelte/store";

  export let body: string = "";
  export let title: string = "";

  let letterTitleOptions: string[] = ['Acceptance Letter', 'Acknowledgment Letter', 'Agreement Letter', 'Announcement Letter', 'Apology Letter', 'Appeal Letter', 'Application Letter', 'Appointment Letter', 'Appreciation Letter', 'Authorization Letter', 'Birthday Letter', 'Cancellation Letter', 'Certification Letter', 'Charity Letter', 'Claim Letter', 'Collection Letter', 'Complaint Letter', 'Condolence Letter', 'Confirmation Letter', 'Congratulations Letter', 'Cover Letter', 'Credit Letter', 'Criticism Letter', 'Dismissal Letter', 'Dispute Letter', 'Donation Letter', 'Endorsement Letter', 'Farewell Letter', 'Follow Up Letter', 'Friendship Letter', 'Fundraising Letter', 'Grievance Letter', 'Inquiry Letter', 'Internship Letter', 'Interview Letter', 'Introduction Letter', 'Invitation Letter', 'Marketing Letter', 'Order Letter', 'Permission Letter', 'Promotion Letter', 'Proposal Letter', 'Recommendation Letter', 'Reference Letter', 'Request Letter', 'Resignation Letter', 'Retirement Letter', 'Romantic Letter', 'Sales Letter', 'Scholarship Letter', 'Sorry Letter', 'Sponsorship Letter', 'Termination Letter', 'Thank You Letter', 'Transfer Letter', 'Warning Letter', 'Welcome Letter']

  let templateConfigStore = getContext(CONTEXT_LAYOUT_TEMPLATE_CONFIG) as Writable<TemplateConfig>;

</script>

<div class="section section-1">
  <div class="form-content">
    <Tiny bind:html={body} />
    <Input
      bind:value={title}
      label="Title"
      maxInputWidth={true}
      theme="light"
      options={letterTitleOptions}
    />
  </div>
  
  <div class="preview-letter">
    <PreviewLetter
      body={body}
      resizeWidth={400}
      templateConfig={$templateConfigStore}
    />
  </div>
</div>


<style lang="postcss">
  .section-1 {
    @apply flex w-full  h-full justify-center;
    @apply gap-4;
  }
  
  .form-content {
    @apply justify-between flex flex-col h-full;
  }

  .preview-letter {
    height: 100%;
    @apply my-10;
    @apply flex items-center justify-center;
  }

</style>
