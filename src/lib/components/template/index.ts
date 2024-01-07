import type { TemplateConfig } from './types';

export const blankTemplate: TemplateConfig = {
	slug: 'blank',
	version: '0.0.1',
	clipOverflowContent: false,
	margin: {
		top: {
			value: 0,
			type: 'px'
		},
		bottom: {
			value: 0,
			type: 'px'
		},
		left: {
			value: 0,
			type: 'px'
		},
		right: {
			value: 0,
			type: 'px'
		}
	},
	padding: {
		top: {
			value: 0,
			type: 'px'
		},
		bottom: {
			value: 0,
			type: 'px'
		},
		left: {
			value: 0,
			type: 'px'
		},
		right: {
			value: 0,
			type: 'px'
		}
	},
	border: {
		top: {
			strokewidth: 0,
			strokeColor: '#000',
			strokeStyle: 'solid'
		},
		bottom: {
			strokewidth: 0,
			strokeColor: '#000',
			strokeStyle: 'solid'
		},
		left: {
			strokewidth: 0,
			strokeColor: '#000',
			strokeStyle: 'solid'
		},
		right: {
			strokewidth: 0,
			strokeColor: '#000',
			strokeStyle: 'solid'
		}
	},
	fontFamily: 'Helvetica',
	fontColor: '#000',
	fontSize: {
		value: 18,
		unit: 'px'
	},
	backgrounds: [
		{
			type: 'color',
			value: '#fff',
			id: 'random_uuid'
		}
	],
	rounded: {
		topLeft: {
			value: 0,
			type: 'px'
		},
		topRight: {
			value: 0,
			type: 'px'
		},
		bottomLeft: {
			value: 0,
			type: 'px'
		},
		bottomRight: {
			value: 0,
			type: 'px'
		}
	}
};

// Create different template based on the configurations
// Create a blank template

export const templateList: Record<string, TemplateConfig> = {
	blank: { ...blankTemplate, slug: 'blank' },
	black: {
		...blankTemplate,
		slug: 'black',
		backgrounds: [
			{
				type: 'color',
				value: '#000',
				id: 'random_uuid_blank'
			}
		],
		fontColor: '#fff'
	}
};
