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

		styleArr.push(`border-top-style:${templateConfig.border.top.strokeStyle}`);
		styleArr.push(`border-bottom-style:${templateConfig.border.bottom.strokeStyle}`);
		styleArr.push(`border-left-style:${templateConfig.border.left.strokeStyle}`);
		styleArr.push(`border-right-style:${templateConfig.border.right.strokeStyle}`);

		styleArr.push(
			`border-top-left-radius:${templateConfig.rounded.topLeft.value}${templateConfig.rounded.topLeft.type}`
		);
		styleArr.push(
			`border-top-right-radius:${templateConfig.rounded.bottomLeft.value}${templateConfig.rounded.bottomLeft.type}`
		);
		styleArr.push(
			`border-bottom-left-radius:${templateConfig.rounded.bottomLeft.value}${templateConfig.rounded.bottomLeft.type}`
		);
		styleArr.push(
			`border-bottom-right-radius:${templateConfig.rounded.bottomRight.value}${templateConfig.rounded.bottomRight.type}`
		);

		templateConfig.backgrounds.forEach((bg) => {
			if (bg.type === 'color') {
				styleArr.push(`background-color:${bg.value}`);
			} else if (bg.type === 'image') {
				styleArr.push(`background-image: url("${bg.src}")`);
				styleArr.push(`background-image: url("${bg.mode}")`);
			}
		});

		if (templateConfig.fontColor) styleArr.push(`color:${templateConfig.fontColor}`);
		if (templateConfig.fontFamily) styleArr.push(`font-family:${templateConfig.fontFamily}`);

		if (templateConfig.fontFamily)
			styleArr.push(`font-size:${templateConfig.fontSize.value}${templateConfig.fontSize.unit}`);

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
