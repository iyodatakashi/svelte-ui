// s../lib/components/atoms/Combobox.stories.ts
import type { Meta, StoryObj } from '@storybook/svelte';
import Combobox from '../lib/components/Combobox.svelte';

const meta = {
	title: 'Forms/Combobox',
	component: Combobox,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A combobox component with filtering capabilities that supports searching and selecting options.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: { type: 'text' },
			description: 'Selected value'
		},
		options: {
			control: { type: 'object' },
			description: 'Array of selectable options'
		},
		inline: {
			control: { type: 'boolean' },
			description: 'Display as inline editable text'
		},
		focusStyle: {
			control: { type: 'radio' },
			options: ['background', 'outline', 'none'],
			description: 'Focus style (background, outline, or none)'
		},
		placeholder: {
			control: { type: 'text' },
			description: 'Placeholder text'
		},
		fullWidth: {
			control: { type: 'boolean' },
			description: 'Whether the combobox takes full width'
		},
		width: {
			control: { type: 'number' },
			description: 'Width in pixels'
		},
		filterable: {
			control: { type: 'boolean' },
			description: 'Enable filtering as the user types'
		},
		rounded: {
			control: { type: 'boolean' },
			description: 'Use rounded corners'
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Whether the combobox is disabled'
		},
		readonly: {
			control: { type: 'boolean' },
			description: 'Make the input read-only'
		},
		required: {
			control: { type: 'boolean' },
			description: 'Mark the field as required'
		},
		minWidth: {
			control: { type: 'text' },
			description:
				'Minimum width (number in px or CSS length string, e.g. "200", "50%", "24rem")'
		},
		maxWidth: {
			control: { type: 'text' },
			description:
				'Maximum width (number in px or CSS length string, e.g. "300", "80%", "32rem")'
		},
		maxlength: {
			control: { type: 'number' },
			description: 'Maximum input length'
		},
		// ArgTypes for additional event handlers
		onfocus: {
			action: 'focused',
			description: 'Focus event'
		},
		onblur: {
			action: 'blurred',
			description: 'Blur event'
		},
		onkeydown: {
			action: 'keydown',
			description: 'Keydown event'
		},
		onkeyup: {
			action: 'keyup',
			description: 'Keyup event'
		},
		onclick: {
			action: 'clicked',
			description: 'Click event'
		},
		onmousedown: {
			action: 'mousedown',
			description: 'Mousedown event'
		},
		onmouseup: {
			action: 'mouseup',
			description: 'Mouseup event'
		},
		onmouseenter: {
			action: 'mouseenter',
			description: 'Mouseenter event'
		},
		onmouseleave: {
			action: 'mouseleave',
			description: 'Mouseleave event'
		},
		onmouseover: {
			action: 'mouseover',
			description: 'Mouseover event'
		},
		onmouseout: {
			action: 'mouseout',
			description: 'Mouseout event'
		},
		oncontextmenu: {
			action: 'contextmenu',
			description: 'Context menu event'
		},
		onauxclick: {
			action: 'auxclick',
			description: 'Auxiliary button click event'
		},
		ontouchstart: {
			action: 'touchstart',
			description: 'Touch start event'
		},
		ontouchend: {
			action: 'touchend',
			description: 'Touch end event'
		},
		ontouchmove: {
			action: 'touchmove',
			description: 'Touch move event'
		},
		ontouchcancel: {
			action: 'touchcancel',
			description: 'Touch cancel event'
		},
		onpointerdown: {
			action: 'pointerdown',
			description: 'Pointer down event'
		},
		onpointerup: {
			action: 'pointerup',
			description: 'Pointer up event'
		},
		onpointerenter: {
			action: 'pointerenter',
			description: 'Pointer enter event'
		},
		onpointerleave: {
			action: 'pointerleave',
			description: 'Pointer leave event'
		},
		onpointermove: {
			action: 'pointermove',
			description: 'Pointer move event'
		},
		onpointercancel: {
			action: 'pointercancel',
			description: 'Pointer cancel event'
		},
		onchange: {
			action: 'changed',
			description: 'Change event'
		},
		oninput: {
			action: 'input',
			description: 'Input event'
		}
	}
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic option data
const basicOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

const countryOptions = [
	'Japan',
	'United States',
	'United Kingdom',
	'France',
	'Germany',
	'Canada',
	'Australia',
	'Brazil',
	'India',
	'China'
];

const colorOptions = [
	'Red',
	'Blue',
	'Green',
	'Yellow',
	'Purple',
	'Orange',
	'Black',
	'White',
	'Gray',
	'Pink'
];

const numberOptions = [1, 5, 10, 20, 50, 100, 200, 500, 1000];

const programmingLanguages = [
	'JavaScript',
	'TypeScript',
	'Python',
	'Java',
	'C++',
	'C#',
	'Ruby',
	'PHP',
	'Go',
	'Rust',
	'Swift',
	'Kotlin',
	'Scala',
	'Haskell',
	'Elixir',
	'Clojure',
	'F#',
	'OCaml',
	'Erlang',
	'Lua'
];

// Default combobox (country options)
export const Default: Story = {
	args: {
		value: '',
		options: countryOptions,
		placeholder: 'Select or type a country'
	}
};

// Non-filterable
export const NonFilterable: Story = {
	args: {
		value: '',
		options: basicOptions,
		placeholder: 'Filtering disabled',
		filterable: false
	}
};

// Rounded design
export const Rounded: Story = {
	args: {
		value: '',
		options: countryOptions,
		placeholder: 'Rounded combobox',
		rounded: true
	}
};

// Full width
export const FullWidth: Story = {
	args: {
		value: '',
		options: programmingLanguages,
		placeholder: 'Full-width combobox',
		fullWidth: true
	}
};

// Inline variant
export const Inline: Story = {
	args: {
		value: '',
		inline: true,
		options: countryOptions,
		placeholder: 'Click to edit'
	}
};

// Width-limited
export const WithWidthLimits: Story = {
	args: {
		value: '',
		options: programmingLanguages,
		placeholder: 'Width-constrained combobox',
		minWidth: 200,
		maxWidth: 300
	}
};

// Custom styles (recommended to show in docs as code examples)
