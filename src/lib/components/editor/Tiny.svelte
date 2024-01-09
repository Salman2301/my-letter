<script lang="ts">
	import Editor from '@tinymce/tinymce-svelte';
	import { env } from '$env/dynamic/public';

	export let html: string | null = '';
	export let placeholder: string = 'Your letter body....';
	export let readonly: boolean = false;

	export let conf = {
		skin: 'oxide-dark',
		plugins: 'quickbars emoticons lists wordcount autosave css',
		// toolbar: [
		//   'bold italic strikethrough underline | blockquote hr | emoticons | align numlist bullist | undo redo',
		//   'fontfamily | blocks h1 h2 h3  | backcolor forecolor',
		// ],
		quickbars_selection_toolbar:
			'blocks | bold italic | blockquote | alignleft aligncenter alignright | forecolor',

		toolbar_location: 'top',
		quickbars_insert_toolbar: '',
		content_css: '/asset/css/letter.css',
		mobile: {
			menubar: true
		},
		min_height: 500,
		min_width: 600,
		promotion: false,
		placeholder,
		readonly,

		menubar: false,
		inline: true,
		statusbar: false
	};
</script>

<div class="editor">
	<Editor apiKey={env.PUBLIC_TINY_EDITOR_KEY} inline={false} bind:value={html} {conf} />
</div>

<style lang="postcss">
	.editor {
		@apply w-full;
		@apply mt-10;
		min-height: 500px;
		min-width: 600px;
	}
</style>
