import Select from '../lib/components/Select.svelte';

const meta = {
	title: 'Forms/Select',
	component: Select,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A styled select component that supports theming, inline display, and various visual variants.'
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
			description: 'Whether the select takes full width'
		},
		rounded: {
			control: { type: 'boolean' },
			description: 'Use rounded corners'
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Whether the select is disabled'
		},
		required: {
			control: { type: 'boolean' },
			description: 'Mark the field as required'
		},
		size: {
			control: { type: 'number' },
			description: 'Number of visible rows'
		},
		customStyle: {
			control: { type: 'text' },
			description: 'Custom CSS styles for the root element'
		},
		id: {
			control: { type: 'text' },
			description: 'ID for the select element'
		},
		name: {
			control: { type: 'text' },
			description: 'Form name attribute'
		},
		tabindex: {
			control: { type: 'number' },
			description: 'Tab index for focus order'
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
		}
	}
};

export default meta;

// Basic option data
const basicOptions = [
	{ value: 'option1', label: 'Option 1' },
	{ value: 'option2', label: 'Option 2' },
	{ value: 'option3', label: 'Option 3' }
];

const countryOptions = [
	{ value: 'jp', label: 'Japan' },
	{ value: 'us', label: 'United States' },
	{ value: 'uk', label: 'United Kingdom' },
	{ value: 'fr', label: 'France' },
	{ value: 'de', label: 'Germany' }
];

// Default
export const Default = {
	args: {
		options: basicOptions,
		placeholder: 'Select an option'
	}
};

// Inline
export const Inline = {
	args: {
		options: basicOptions,
		inline: true,
		placeholder: 'Select an option (inline)'
	}
};

// Rounded
export const Rounded = {
	args: {
		options: basicOptions,
		rounded: true,
		placeholder: 'Rounded select'
	}
};

// Full width
export const FullWidth = {
	args: {
		options: countryOptions,
		fullWidth: true,
		placeholder: 'Select a country'
	},
	parameters: {
		layout: 'padded'
	}
};

// States
export const Disabled = {
	args: {
		options: basicOptions,
		disabled: true,
		placeholder: 'Disabled state'
	}
};

export const Required = {
	args: {
		options: basicOptions,
		required: true,
		placeholder: 'Required (select one)'
	}
};
