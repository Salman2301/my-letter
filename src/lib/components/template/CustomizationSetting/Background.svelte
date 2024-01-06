<script lang="ts">
	import TitleCustomization from './TitleCustomization.svelte';
	import InputUploadBtn from '$lib/components/form/InputUploadBtn.svelte';
	import ButtonColor from '$lib/components/form/ButtonColor.svelte';
	import Dropdown, { type DropOptions } from '$lib/components/form/Dropdown.svelte';
	import { PlusCircleIcon, Trash2Icon } from 'svelte-feather-icons';
	import { v4 as uuid } from 'uuid';

	type Background = BackgroundColor | BackgroundImage;
	interface BackgroundColor {
		type: 'color';
		value: string;
		id: string;
	}

	interface BackgroundImage {
		type: 'image';
		src?: string;
		mode?: 'repeat' | 'cover';
		pos?: {
			x: number;
			y: number;
		};
		id: string;
	}

	export let backgrounds: Background[] = [
		{
			type: 'color',
			value: '#fff',
			id: uuid()
		}
	];
	export let backgroundOpts: DropOptions[] = [
		{
			label: 'Color',
			value: 'color'
		},
		{
			label: 'Image',
			value: 'image'
		}
	];

	function handleUploadFileIdx(idx: number) {
		return function handleUploadFile(ev: CustomEvent<{ url: string }>) {
			const { url } = ev.detail;
			console.log(' upload file url : ', url);
		};
	}

	function handleNewBackground() {
		backgrounds = [
			...backgrounds,
			{
				type: 'color',
				value: '#fff',
				id: uuid()
			}
		];
	}
	function handleRemoveId(id: string) {
		return function remove() {
			backgrounds = backgrounds.filter((item) => item.id !== id);
			backgrounds = backgrounds;
		};
	}

	function handleColorChangeIdx(idx: number) {
		return function handleColorChange(ev: CustomEvent<{ colorValue: string }>) {
			//@ts-expect-error ts error invalid error. ignore
			backgrounds[idx].value = ev.detail.colorValue;
		};
	}
</script>

<div class="background-container">
	<TitleCustomization content="Background" />
	<div class="buttons">
		<button on:click={handleNewBackground}>
			<PlusCircleIcon />
		</button>

		<div class="backgrounds-panel-container">
			{#each backgrounds as background, idx (background.id)}
				<div class="background-setting">
					<div class="background-header">
						<Dropdown options={backgroundOpts} bind:value={backgrounds[idx].type} theme="border" />

						<button class="trash-icon idx-{idx}" on:click={handleRemoveId(background.id)}>
							<Trash2Icon />
						</button>
					</div>
					{#if backgrounds[idx].type === 'color'}
						<ButtonColor label="Select a background" on:change={handleColorChangeIdx(idx)} />
					{:else}
						<div class="background-image-container">
							<div class="input-upload">
								<InputUploadBtn
									on:upload={handleUploadFileIdx(idx)}
									bucket="user_background"
									label="Upload background"
								/>
							</div>
							<div class="background-image-panel">
								<div class="background-drop-cover">
									Repeat mode:
									<Dropdown
										options={[
											{ label: 'Cover', value: 'cover' },
											{ label: 'Repeat', value: 'repeat' }
										]}
										theme="border"
									/>
								</div>
								<div class="position-inputs">
									x:
									<input type="number" class="background-position-input" value="0" min="0" />
									y:
									<input type="number" class="background-position-input" value="0" min="0" />
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="postcss">
	.buttons {
		@apply flex flex-col gap-2;
	}

	.background-setting {
		@apply flex flex-col justify-end gap-2;
		@apply border-l border-secondary-foreground pl-2;
	}

	.background-header {
		@apply flex items-center justify-between;
	}

	.trash-icon.idx-0 {
		@apply invisible;
	}

	.backgrounds-panel-container {
		@apply pl-3;
		@apply flex flex-col gap-2;
	}

	.background-image-panel {
		@apply flex justify-between gap-2;
		@apply my-1;
	}

	.position-inputs {
		@apply flex gap-2;
	}
	.background-position-input {
		@apply w-10;
		@apply bg-secondary;
		@apply p-0;
		@apply text-background;
		@apply text-secondary-foreground;
		@apply text-center;
	}

	.background-position-input:hover {
		@apply border border-secondary-foreground;
	}
</style>
