<script lang="ts">
	import { onMount } from 'svelte';
	import { blankTemplate, templateList } from '../template';
	import type { TemplateConfig } from '../template/types';

	export let body: string = '';
	export let selectedTemplateId: string = 'blank';
	export let templateConfig: TemplateConfig = blankTemplate;

	export let resizeWidth: number = 780;

	let aspectRatio = 1 / 1.41; // A4 sheet
	let style: string = '';

	onMount(() => {
		updateStyle();
	});

	$: if (templateConfig) {
		updateStyle();
	}

	function updateStyle() {
		style = '';
		// TODO: This is running multiple times on start

		let styleArr: string[] = [];
		// let style
		styleArr.push(`margin-top:${templateConfig.margin.top.value}${templateConfig.margin.top.type}`);
		styleArr.push(
			`margin-bottom:${templateConfig.margin.bottom.value}${templateConfig.margin.bottom.type}`
		);
		styleArr.push(
			`margin-left:${templateConfig.margin.left.value}${templateConfig.margin.left.type}`
		);
		styleArr.push(
			`margin-right:${templateConfig.margin.right.value}${templateConfig.margin.right.type}`
		);

		styleArr.push(
			`padding-top:${templateConfig.padding.top.value}${templateConfig.padding.top.type}`
		);
		styleArr.push(
			`padding-bottom:${templateConfig.padding.bottom.value}${templateConfig.padding.bottom.type}`
		);
		styleArr.push(
			`padding-left:${templateConfig.padding.left.value}${templateConfig.padding.left.type}`
		);
		styleArr.push(
			`padding-right:${templateConfig.padding.right.value}${templateConfig.padding.right.type}`
		);

		styleArr.push(`border-top-width:${templateConfig.border.top.strokewidth}px`);
		styleArr.push(`border-bottom-width:${templateConfig.border.bottom.strokewidth}px`);
		styleArr.push(`border-left-width:${templateConfig.border.left.strokewidth}px`);
		styleArr.push(`border-right-width:${templateConfig.border.right.strokewidth}px`);

		styleArr.push(`border-top-color:${templateConfig.border.top.strokeColor}`);
		styleArr.push(`border-bottom-color:${templateConfig.border.bottom.strokeColor}`);
		styleArr.push(`border-left-color:${templateConfig.border.left.strokeColor}`);
		styleArr.push(`border-right-color:${templateConfig.border.right.strokeColor}`);

		templateConfig.background.forEach((bg) => {
			if (bg.type === 'color-plain') {
				styleArr.push(`background-color:${bg.color}`);
				styleArr.push(`opacity:${bg.opacity}`);
			} else if (bg.type === 'color-gradient') {
				// TOOD: HANDLE
			} else if (bg.type === 'image') {
				styleArr.push(`background-image: url("${bg.src}")`);
				styleArr.push(`background-image: url("${bg.stretch}")`);
				if (bg.size && bg.size.height && bg.size.width)
					styleArr.push(`background-size:${bg.size.width} ${bg.size.height}`);
			}
		});

		if (templateConfig.fontColor) styleArr.push(`color:${templateConfig.fontColor}`);
		if (templateConfig.fontFamily) styleArr.push(`font-family:${templateConfig.fontFamily}`);

		style = styleArr.join(';');
	}
</script>

<div class="letter-container" style="width:{resizeWidth}px;height:{resizeWidth / aspectRatio}px">
	<div class="letter" style="scale:{resizeWidth / 780};{style}">
		<div class="content mce-content-body">{@html body}</div>
	</div>
</div>

<style lang="postcss" global>
	.letter-container {
		top: 0;
		left: 0;
		top: 0;
		position: sticky;
		aspect-ratio: 1 / 1.41;
	}
	.letter {
		@apply relative;
		width: 780px;
		aspect-ratio: 1 / 1.41;
		transform-origin: top left;
		@apply m-0;
		@apply bg-white;
	}
	img {
		@apply absolute;
		@apply h-full w-full;
	}
	.content {
		@apply absolute;
		/* @apply text-black; */
		@apply w-full;
		@apply h-full;
	}
</style>
