<script lang="ts">
	import Tiny from '$lib/components/editor/Tiny.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import RenderLetter from '$lib/components/render/RenderLetter.svelte';
	import { letterObj } from '$lib/components/form_bind/letter/store';

	let letterTitleOptions: string[] = [
		'Invitation letter',
		'Birthday letter',
		'Love letter',
		'Community letter',
		'Apology letter',
		'Proposal letter',
		'Promotion letter'
	];
</script>

<div class="section section-1">
	<div class="form-content">
		<Tiny bind:html={$letterObj.body} />
		<Input
			bind:value={$letterObj.title}
			label="Title"
			maxInputWidth={true}
			theme="light"
			options={letterTitleOptions}
		/>
	</div>

	<div class="preview-letter">
		<RenderLetter
			body={$letterObj.body}
			resizeWidth={400}
			templateConfig={$letterObj.template_config}
		/>
	</div>
</div>

<style lang="postcss">
	.section-1 {
		@apply flex h-full  w-full justify-center;
		@apply gap-4;
		@apply mx-2;
	}

	.form-content {
		@apply flex h-full flex-col justify-between;
	}

	.preview-letter {
		height: 100%;
		@apply my-10;
		@apply flex items-center justify-center;
	}
</style>
