export type NumberCssUnit = 'px' | 'rem' | '%';
export interface TemplateConfig {
	version: `${string}.${string}.${string}`;
	slug: string;
	clipOverflowContent: boolean;
	margin: {
		top: {
			value: number;
			type: NumberCssUnit;
		};
		bottom: {
			value: number;
			type: NumberCssUnit;
		};
		left: {
			value: number;
			type: NumberCssUnit;
		};
		right: {
			value: number;
			type: NumberCssUnit;
		};
	};
	padding: {
		top: {
			value: number;
			type: NumberCssUnit;
		};
		bottom: {
			value: number;
			type: NumberCssUnit;
		};
		left: {
			value: number;
			type: NumberCssUnit;
		};
		right: {
			value: number;
			type: NumberCssUnit;
		};
	};
	rounded: {
		topLeft: {
			value: number;
			type: NumberCssUnit;
		};
		topRight: {
			value: number;
			type: NumberCssUnit;
		};
		bottomLeft: {
			value: number;
			type: NumberCssUnit;
		};
		bottomRight: {
			value: number;
			type: NumberCssUnit;
		};
	};
	border: {
		top: {
			strokewidth: number;
			strokeUnit: NumberCssUnit;
			strokeColor: string;
			strokeStyle: StrokeStyle;
		};
		bottom: {
			strokewidth: number;
			strokeUnit: NumberCssUnit;
			strokeColor: string;
			strokeStyle: StrokeStyle;
		};
		left: {
			strokewidth: number;
			strokeUnit: NumberCssUnit;
			strokeColor: string;
			strokeStyle: StrokeStyle;
		};
		right: {
			strokewidth: number;
			strokeUnit: NumberCssUnit;
			strokeColor: string;
			strokeStyle: StrokeStyle;
		};
	};
	backgrounds: Background[];
	fontFamily: string;
	fontColor: string;
	fontSize: {
		value: number;
		unit: "px" | "rem";
	};
}

export type Background = BackgroundColor | BackgroundImage;
interface BackgroundColor {
	type: 'color';
	value: string;
	id: string;
}

interface BackgroundImage {
	type: 'image';
	src: string;
	mode: 'repeat' | 'cover';
	pos: {
		x: number;
		y: number;
	};
	id: string;
}

export type StrokeStyle =
	| 'dotted'
	| 'dashed'
	| 'solid'
	| 'double'
	| 'groove'
	| 'ridge'
	| 'inset'
	| 'outset';
