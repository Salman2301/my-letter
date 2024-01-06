<script lang="ts">
	import Loader from '../Loader.svelte';
	import { v4 as uuid } from 'uuid';
	import { setSignedUrl } from '$lib/module/storage';
	import { supabase } from '$lib/supabase';
	import { UploadIcon } from 'svelte-feather-icons';
	import { createEventDispatcher } from 'svelte';
	import { genId } from '$lib/helper';

	export let fileInput: HTMLInputElement | undefined = undefined;
	export let files: FileList | undefined = undefined;
	export let disabled: boolean = false;
	export let isUploading: boolean = false;
	export let fileLocation: string = '$user_id/$random_uuid.$ext';
	export let bucket: string = '';
	export let label: string = 'Upload file';
	export let id: string = genId();

	const dispatch = createEventDispatcher();

	export function reset() {
		files = undefined;
		if (fileInput) fileInput.value = '';
	}

	async function handleChange() {
		try {
			isUploading = true;
			disabled = true;

			if (!files?.length) {
				disabled = false;
				return;
			}
			// TODO: Upload the image to Supabase
			const file = files[0];

			if (fileLocation.includes('$user_id')) {
				const { data: userData } = await supabase.from('users').select('*');

				if (!userData || userData.length === 0) throw new Error('Failed to get the current user!');

				const user = userData[0];
				fileLocation = fileLocation.replace(/\$user_id/g, user.id);
			}

			if (fileLocation.includes('$random_uuid')) {
				fileLocation = fileLocation.replace(/\$random_uuid/g, uuid());
			}

			if (fileLocation.includes('$ext')) {
				const { type } = file;
				let ext = 'png';

				if (type === 'image/png') {
					ext = 'png';
				} else {
					ext = 'jpg';
				}
				fileLocation = fileLocation.replace(/\$ext/g, ext);
			}

			const { data, error } = await supabase.storage.from(bucket).upload(fileLocation, file, {
				// cacheControl: 'no-cache', TODO: REMOVE CACHE ON UPDATE
				upsert: true
			});

			if (error) {
				console.error(error);
				throw new Error(JSON.stringify(error));
			}

			const TWO_DAYS = 2 * 24 * 60 * 60;
			const { data: dataSignedUrl, error: signedUrlError } = await supabase.storage
				.from(bucket)
				.createSignedUrl(fileLocation, TWO_DAYS);

			if (signedUrlError) {
				throw new Error(JSON.stringify(signedUrlError));
			}
			setSignedUrl(fileLocation, dataSignedUrl.signedUrl);

			dispatch('upload', { url: dataSignedUrl.signedUrl });

			isUploading = false;
			disabled = false;
		} catch (e) {
			console.error(e);
			isUploading = false;
			disabled = false;
		}
	}
</script>

<label for="input-upload-{id}" class="btn-upload" class:disabled>
	{#if isUploading}
		<Loader />
	{:else}
		<div class="icon">
			<UploadIcon size="20" />
		</div>
		<div class="label">{label}</div>
	{/if}
</label>
<input
	type="file"
	id="input-upload-{id}"
	multiple={false}
	accept="image/png, image/jpeg"
	hidden
	bind:files
	bind:this={fileInput}
	on:change={handleChange}
	{disabled}
/>

<style lang="postcss">
	.btn-upload {
		@apply flex items-center justify-center gap-2;
		@apply bg-background px-1 py-2;
		@apply rounded-sm;
		@apply h-full w-full;
	}
	.btn-upload:hover:not(.disabled) {
		@apply underline;
		@apply bg-foreground text-background;
	}

	.btn-upload.disabled {
		@apply bg-gray-500 text-background;
		@apply cursor-not-allowed;
	}
</style>
