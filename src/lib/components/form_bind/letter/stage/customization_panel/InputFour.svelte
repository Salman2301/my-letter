<script lang="ts">
	import IconCheckbox from '$lib/components/form/IconCheckbox.svelte';
	import InputStroke from './InputStroke.svelte';
	import LinkBroken from '$lib/components/icon/LinkBroken.svelte';

	import { LinkIcon } from 'svelte-feather-icons';

	import type { EventOnChange, InputType } from './InputStroke.svelte';
	import type { StrokeStyle } from '$lib/components/template/types';

	export let inputType: InputType[] = ['color', 'input', 'stroke'];
	export let isLinked: boolean = true;
	export let corner: boolean = false;

	type Position = 'one' | 'two' | 'three' | 'four';
	type InputUnit = 'px' | 'rem';

	let defaultColorValue: string = '#000';
	let defaultInputValue: number = 0;
	let defaultInputUnit: InputUnit = 'px';
	let defaultStroke: StrokeStyle = 'solid';

	let lastValueColor: string = defaultColorValue;
	let lastValueInput: number = defaultInputValue;
	let lastValueStroke: StrokeStyle = defaultStroke;

	export let oneColorValue: string = defaultColorValue;
	export let twoColorValue: string = defaultColorValue;
	export let threeColorValue: string = defaultColorValue;
	export let fourColorValue: string = defaultColorValue;

	export let oneInputValue: number = defaultInputValue;
	export let twoInputValue: number = defaultInputValue;
	export let threeInputValue: number = defaultInputValue;
	export let fourInputValue: number = defaultInputValue;

	export let oneInputUnit: InputUnit = defaultInputUnit;
	export let twoInputUnit: InputUnit = defaultInputUnit;
	export let threeInputUnit: InputUnit = defaultInputUnit;
	export let fourInputUnit: InputUnit = defaultInputUnit;

	export let oneStroke: StrokeStyle = defaultStroke;
	export let twoStroke: StrokeStyle = defaultStroke;
	export let threeStroke: StrokeStyle = defaultStroke;
	export let fourStroke: StrokeStyle = defaultStroke;

	export let hasColorInput: boolean = true;
	export let hasNumberInput: boolean = true;
	export let hasStrokeInput: boolean = true;

	function handleChange(pos: Position) {
		return function handleEvent(event: { detail: EventOnChange }) {
			const { type, value } = event.detail;

			if (type === 'color') {
				lastValueColor = value;
			} else if (type === 'input') {
				lastValueInput = value;
			} else if (type === 'stroke') {
				lastValueStroke = value;
			}

			if (isLinked) {
				if (type === 'color') {
					oneColorValue = value;
					twoColorValue = value;
					threeColorValue = value;
					fourColorValue = value;
				}

				if (type === 'input') {
					oneInputValue = value;
					twoInputValue = value;
					threeInputValue = value;
					fourInputValue = value;
				}

				if (type === 'stroke') {
					oneStroke = value;
					twoStroke = value;
					threeStroke = value;
					fourStroke = value;
				}
			} else {
			}
		};
	}

	function handleSyncAllInputs() {
		oneColorValue = lastValueColor;
		twoColorValue = lastValueColor;
		threeColorValue = lastValueColor;
		fourColorValue = lastValueColor;

		oneInputValue = lastValueInput;
		twoInputValue = lastValueInput;
		threeInputValue = lastValueInput;
		fourInputValue = lastValueInput;

		oneStroke = lastValueStroke;
		twoStroke = lastValueStroke;
		threeStroke = lastValueStroke;
		fourStroke = lastValueStroke;
	}
</script>

<div class="input-four-container" class:corner>
	<div class="one">
		<InputStroke
			{hasColorInput}
			{hasNumberInput}
			{hasStrokeInput}
			bind:colorValue={oneColorValue}
			bind:inputValue={oneInputValue}
			bind:strokeValue={oneStroke}
			on:change={handleChange('one')}
		/>
	</div>
	<div class="two">
		<InputStroke
			{hasColorInput}
			{hasNumberInput}
			{hasStrokeInput}
			bind:colorValue={twoColorValue}
			bind:inputValue={twoInputValue}
			bind:strokeValue={twoStroke}
			on:change={handleChange('two')}
		/>
	</div>
	<div class="link">
		<IconCheckbox
			bind:isChecked={isLinked}
			on:change={handleSyncAllInputs}
		>
			<div slot="unchecked">
				<LinkBroken size="20" />
			</div>
			<div slot="checked">
				<LinkIcon size="20" />
			</div>
		</IconCheckbox>
	</div>
	<div class="three">
		<InputStroke
			{hasColorInput}
			{hasNumberInput}
			{hasStrokeInput}
			bind:colorValue={threeColorValue}
			bind:inputValue={threeInputValue}
			bind:strokeValue={threeStroke}
			on:change={handleChange('three')}
		/>
	</div>
	<div class="four">
		<InputStroke
			{hasColorInput}
			{hasNumberInput}
			{hasStrokeInput}
			bind:colorValue={fourColorValue}
			bind:inputValue={fourInputValue}
			bind:strokeValue={fourStroke}
			on:change={handleChange('four')}
		/>
	</div>
</div>

<style lang="postcss">
	.input-four-container {
		display: grid;
		grid-template:
			'.      .      .      one      one       one    .      .       .'
			'.   two   two   two        link      three      three  three      .'
			'.      .      .      four   four    four .      .       .';
		/* ".  .  . one ."
		"two link three"
		". four ."; */
		/* grid-template: ". one ."
		"two link three"
		". four ."; */
		@apply gap-2;
		@apply w-full;
	}
	.input-four-container.corner {
		grid-template:
			'one . three'
			'. link .'
			'two . four';
	}
	.middle {
		@apply flex justify-between;
		@apply w-full;
	}

	.one,
	.four {
		@apply flex justify-center;
	}

	.one {
		grid-area: one;
	}
	.four {
		grid-area: four;
	}
	.link {
		grid-area: link;
		align-self: center;
		justify-self: center;

		min-width: 40px;
		@apply flex items-center justify-center;
	}
	.two {
		grid-area: two;
	}
	.three {
		grid-area: three;
	}
</style>
