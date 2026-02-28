import type { Meta, StoryObj } from '@storybook/sveltekit';
import Slider from '../lib/components/Slider.svelte';

const meta = {
	title: 'Forms/Slider',
	component: Slider,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A range slider component for selecting numeric values, with support for min/max, step, full-width layout, and customizable thumb size/color.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: { type: 'number' },
			description: 'Current slider value'
		},
		min: {
			control: { type: 'number' },
			description: 'Minimum value'
		},
		max: {
			control: { type: 'number' },
			description: 'Maximum value'
		},
		step: {
			control: { type: 'number' },
			description: 'Step size between values'
		},
		width: {
			control: { type: 'text' },
			description:
				'Slider width (number in px or CSS length string, e.g. "200", "50%", "24rem")'
		},
		fullWidth: {
			control: { type: 'boolean' },
			description: 'Whether the slider takes full width of its container'
		},
		thumbColor: {
			control: { type: 'color' },
			description: 'Thumb (handle) color'
		},
		thumbWidth: {
			control: { type: 'text' },
			description:
				'Thumb width (number in px or CSS length string, e.g. "16", "20px")'
		},
		thumbHeight: {
			control: { type: 'text' },
			description:
				'Thumb height (number in px or CSS length string, e.g. "16", "20px")'
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Whether the slider is disabled'
		},
		customStyle: {
			control: { type: 'text' },
			description: 'Custom CSS styles for the root element'
		},
		id: {
			control: { type: 'text' },
			description: 'ID for the input element'
		},
		name: {
			control: { type: 'text' },
			description: 'Form name attribute'
		},
		onchange: {
			control: false,
			action: 'changed',
			description: 'Callback when value changes'
		},
		oninput: {
			control: false,
			action: 'input',
			description: 'Input event'
		},
		onfocus: { control: false, action: 'focused' },
		onblur: { control: false, action: 'blurred' },
		onkeydown: { control: false, action: 'keydown' },
		onkeyup: { control: false, action: 'keyup' },
		onclick: { control: false, action: 'clicked' },
		onmousedown: { control: false, action: 'mousedown' },
		onmouseup: { control: false, action: 'mouseup' },
		onmouseenter: { control: false, action: 'mouseenter' },
		onmouseleave: { control: false, action: 'mouseleave' },
		onmouseover: { control: false, action: 'mouseover' },
		onmouseout: { control: false, action: 'mouseout' },
		oncontextmenu: { control: false, action: 'contextmenu' },
		onauxclick: { control: false, action: 'auxclick' },
		ontouchstart: { control: false, action: 'touchstart' },
		ontouchend: { control: false, action: 'touchend' },
		ontouchmove: { control: false, action: 'touchmove' },
		ontouchcancel: { control: false, action: 'touchcancel' },
		onpointerdown: { control: false, action: 'pointerdown' },
		onpointerup: { control: false, action: 'pointerup' },
		onpointerenter: { control: false, action: 'pointerenter' },
		onpointerleave: { control: false, action: 'pointerleave' },
		onpointermove: { control: false, action: 'pointermove' },
		onpointercancel: { control: false, action: 'pointercancel' }
	}
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default slider (0–100)
export const Default: Story = {
	args: {
		value: 50,
		min: 0,
		max: 100,
		step: 1
	}
};

// Full width layout
export const FullWidth: Story = {
	args: {
		value: 40,
		min: 0,
		max: 100,
		step: 1,
		fullWidth: true
	}
};

// Custom thumb size and color
export const CustomThumb: Story = {
	args: {
		value: 30,
		min: 0,
		max: 100,
		step: 5,
		thumbColor: '#e91e63',
		thumbWidth: 20,
		thumbHeight: 20
	}
};

// Disabled state
export const Disabled: Story = {
	args: {
		value: 70,
		min: 0,
		max: 100,
		step: 10,
		disabled: true
	}
};

