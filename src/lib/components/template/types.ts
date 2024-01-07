export interface TemplateConfig {
	version: `${string}.${string}.${string}`;
	slug: string;
	margin: {
		top: {
			value: number;
			type: 'px';
		};
		bottom: {
			value: number;
			type: 'px';
		};
		left: {
			value: number;
			type: 'px';
		};
		right: {
			value: number;
			type: 'px';
		};
	};
	padding: {
		top: {
			value: number;
			type: 'px';
		};
		bottom: {
			value: number;
			type: 'px';
		};
		left: {
			value: number;
			type: 'px';
		};
		right: {
			value: number;
			type: 'px';
		};
	};
	rounded: {
		topLeft: {
			value: number;
			type: 'px';
		};
		topRight: {
			value: number;
			type: 'px';
		};
		bottomLeft: {
			value: number;
			type: 'px';
		};
		bottomRight: {
			value: number;
			type: 'px';
		};
	};
	border: {
		top: {
			strokewidth: number;
			strokeColor: string;
			strokeStyle: StrokeStyle;
		};
		bottom: {
			strokewidth: number;
			strokeColor: string;
			strokeStyle: StrokeStyle;
		};
		left: {
			strokewidth: number;
			strokeColor: string;
			strokeStyle: StrokeStyle;
		};
		right: {
			strokewidth: number;
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

export type StrokeStyle = "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset";
