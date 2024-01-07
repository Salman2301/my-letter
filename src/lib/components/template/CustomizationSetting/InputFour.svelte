<script lang="ts">
	import IconCheckbox from '$lib/components/form/IconCheckbox.svelte';
	import InputStroke from './InputStroke.svelte';
	import LinkBroken from '$lib/components/icon/LinkBroken.svelte';

	import { LinkIcon } from 'svelte-feather-icons';
	import type { EventOnChange, InputType } from './InputStroke.svelte';
	import type { StrokeStyle } from '../types';

	export let inputType: InputType[] = ['color', 'input', 'stroke'];
	export let isLinked: boolean = true;

	type Position = 'top' | 'bottom' | 'left' | 'right';
	type InputUnit = "px" | "rem";

	let defaultColorValue: string = "#000";
	let defaultInputValue: number = 0;
	let defaultInputUnit: InputUnit = "px";
	let defaultStroke: StrokeStyle = "solid";

	let lastValueColor: string = defaultColorValue;
	let lastValueInput: number = defaultInputValue;
	let lastValueStroke: StrokeStyle = defaultStroke;

	export let topColorValue: string = defaultColorValue;
	export let leftColorValue: string = defaultColorValue;
	export let rightColorValue: string = defaultColorValue;
	export let bottomColorValue: string = defaultColorValue;

	export let topInputValue: number = defaultInputValue;
	export let leftInputValue: number = defaultInputValue;
	export let rightInputValue: number = defaultInputValue;
	export let bottomInputValue: number = defaultInputValue;

	export let topInputUnit: InputUnit = defaultInputUnit;
	export let leftInputUnit: InputUnit = defaultInputUnit;
	export let rightInputUnit: InputUnit = defaultInputUnit;
	export let bottomInputUnit: InputUnit = defaultInputUnit;

	export let topStroke: StrokeStyle = defaultStroke;
	export let leftStroke: StrokeStyle = defaultStroke;
	export let rightStroke: StrokeStyle = defaultStroke;
	export let bottomStroke: StrokeStyle = defaultStroke;

	export let hasColorInput: boolean = true;
	export let hasNumberInput: boolean = true;
	export let hasStrokeInput: boolean = true;

	function handleChange(pos: Position) {
		return function handleEvent(event: { detail: EventOnChange }) {
			const { type, value } = event.detail;

			if( type === "color" ) {
				lastValueColor = value;
			}
			else if (type==="input") {
				lastValueInput = value;
			}
			else if (type==="stroke") {
				lastValueStroke = value;
			}

			if (!isLinked) return;
			if (type === 'color') {
				topColorValue = value;
				bottomColorValue = value;
				leftColorValue = value;
				rightColorValue = value;
			}

			if (type === 'input') {
				topInputValue = value;
				bottomInputValue = value;
				leftInputValue = value;
				rightInputValue = value;
			}

			if (type === 'stroke') {
				topStroke = value;
				bottomStroke = value;
				leftStroke = value;
				rightStroke = value;
			}
		};
	}

	function handleSyncAllInputs() {
		topColorValue = lastValueColor;
		bottomColorValue = lastValueColor;
		leftColorValue = lastValueColor;
		rightColorValue = lastValueColor;

		topInputValue = lastValueInput;
		bottomInputValue = lastValueInput;
		leftInputValue = lastValueInput;
		rightInputValue = lastValueInput;

		topStroke = lastValueStroke;
		bottomStroke = lastValueStroke;
		leftStroke = lastValueStroke;
		rightStroke = lastValueStroke;
	}
</script>

<div class="input-four-container">
	<div class="top">
		<InputStroke
			{hasColorInput}
			{hasNumberInput}
			{hasStrokeInput}
			colorValue={topColorValue}
			inputValue={topInputValue}
			strokeValue={topStroke}
			on:change={handleChange('top')}
		/>
	</div>
	<div class="middle">
		<div class="left">
			<InputStroke
				{hasColorInput}
				{hasNumberInput}
				{hasStrokeInput}
				colorValue={leftColorValue}
				inputValue={leftInputValue}
				strokeValue={leftStroke}
				on:change={handleChange('left')}
			/>
		</div>
		<div class="link">
			<IconCheckbox bind:isChecked={isLinked} on:checked={handleSyncAllInputs}>
				<div slot="unchecked">
					<LinkBroken size="20" />
				</div>
				<div slot="checked">
					<LinkIcon size="20" />
				</div>
			</IconCheckbox>
		</div>
		<div class="right">
			<InputStroke
				{hasColorInput}
				{hasNumberInput}
				{hasStrokeInput}
				colorValue={rightColorValue}
				inputValue={rightInputValue}
				strokeValue={rightStroke}
				on:change={handleChange('right')}
			/>
		</div>
	</div>
	<div class="bottom">
		<InputStroke
			{hasColorInput}
			{hasNumberInput}
			{hasStrokeInput}
			colorValue={bottomColorValue}
			inputValue={bottomInputValue}
			strokeValue={bottomStroke}
			on:change={handleChange('bottom')}
		/>
	</div>
</div>

<style lang="postcss">
	.input-four-container {
		@apply flex flex-col;
		@apply items-center;
		@apply gap-y-4;
		@apply w-full;
	}
	.middle {
		@apply flex justify-between;
		@apply w-full;
	}

	.top,
	.bottom {
		@apply flex justify-center;
	}
</style>
