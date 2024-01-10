<script lang="ts">
	import { onMount } from 'svelte';
	import { blankTemplate } from '../template';
	import type { TemplateConfig } from '../template/types';

	const STANDARD_WIDTH: number = 780;

	export let body: string | undefined | null = '';
	export let selectedTemplateId: string = 'blank';
	export let templateConfig: TemplateConfig = blankTemplate;
	export let resizeWidth: number = STANDARD_WIDTH;

	let contentHeight: number | undefined = undefined;
	let aspectRatio = 1 / 1.41; // A4 sheet
	let style: string = '';
	let styleResize: string = '';
	let styleBackground: string[] = [];
	let styleMargin: string = '';
	let scrollBackgroundInstance: HTMLDivElement | undefined = undefined;

	onMount(updateStyle);

	let lastTemplateConfig: string | undefined = undefined;
	$: if (
		templateConfig &&
		templateConfig.slug &&
		JSON.stringify(templateConfig) !== lastTemplateConfig
	) {
		updateStyle();
		lastTemplateConfig = JSON.stringify(templateConfig);
	}

	function updateStyle() {
		style = '';
		// TODO: This is running multiple times on start
		console.log('leaking');
		let styleArr: string[] = [];
		let styleBackgroundArr: string[][] = [];
		let styleMarginArr: string[] = [];
		let styleResizeArr: string[] = [];
		// let style
		styleMarginArr.push(
			`padding-top:${templateConfig.margin.top.value}${templateConfig.margin.top.type}`
		);
		styleMarginArr.push(
			`padding-bottom:${templateConfig.margin.bottom.value}${templateConfig.margin.bottom.type}`
		);
		styleMarginArr.push(
			`padding-left:${templateConfig.margin.left.value}${templateConfig.margin.left.type}`
		);
		styleMarginArr.push(
			`padding-right:${templateConfig.margin.right.value}${templateConfig.margin.right.type}`
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

		styleResizeArr.push(
			`border-top-left-radius:${templateConfig.rounded.topLeft.value}${templateConfig.rounded.topLeft.type}`
		);
		styleResizeArr.push(
			`border-top-right-radius:${templateConfig.rounded.bottomLeft.value}${templateConfig.rounded.bottomLeft.type}`
		);
		styleResizeArr.push(
			`border-bottom-left-radius:${templateConfig.rounded.bottomLeft.value}${templateConfig.rounded.bottomLeft.type}`
		);
		styleResizeArr.push(
			`border-bottom-right-radius:${templateConfig.rounded.bottomRight.value}${templateConfig.rounded.bottomRight.type}`
		);

		templateConfig.backgrounds.forEach((bg, idx) => {
			if (!styleBackgroundArr[idx]) styleBackgroundArr[idx] = [];
			if (bg.type === 'color') {
				styleBackgroundArr[idx].push(`background-color:${bg.value}`);
			} else if (bg.type === 'image') {
				styleBackgroundArr[idx].push(`background-image: url("${bg.src}")`);
				styleBackgroundArr[idx].push(`background-image: url("${bg.mode}")`);
			}
		});

		if (templateConfig.fontColor) styleArr.push(`color:${templateConfig.fontColor}`);
		if (templateConfig.fontFamily) styleArr.push(`font-family:${templateConfig.fontFamily}`);

		if (templateConfig.fontFamily)
			styleArr.push(`font-size:${templateConfig.fontSize.value}${templateConfig.fontSize.unit}`);

		styleResizeArr.push(`overflow:${templateConfig.clipOverflowContent ? 'hidden' : 'auto'}`);
		if (templateConfig.clipOverflowContent && scrollBackgroundInstance) {
			scrollBackgroundInstance.scrollTop = 0;
		}

		style = styleArr.join(';');
		styleBackground = styleBackgroundArr.map((item) => item.join(';'));
		styleMargin = styleMarginArr.join(';');
		styleResize = styleResizeArr.join(';');
	}
</script>

<div
	class="letter-container"
	style="width:{resizeWidth}px"
>
	<div
		class="resize-container"
		style="scale:{resizeWidth / 780};{styleResize}"
		bind:this={scrollBackgroundInstance}
	>
		{#each styleBackground as bg}
			<div class="absolute left-0 top-0 h-full w-full" style="{bg};min-height:{contentHeight}px"></div>
		{/each}

		<div class="margin" style="{styleMargin};" bind:clientHeight={contentHeight}>
			<div class="letter mce-content-body z-10" {style}>{@html body}</div>
		</div>
		<!-- backgrounds -->
	</div>
</div>

<style lang="postcss" global>
	.letter-container {
		aspect-ratio: 1 / 1.41;
		@apply overflow-hidden;
	}
	.resize-container {
		@apply relative;
		width: 780px;
		aspect-ratio: 1 / 1.41;
		transform-origin: top left;
		@apply m-0;
	}
	.letter {
		@apply relative;
		aspect-ratio: 1 / 1.41;
		transform-origin: top left;
		@apply m-0;
		@apply border border-red-500;
		@apply h-full;
	}
	img {
		@apply absolute;
		@apply h-full w-full;
	}
</style>
