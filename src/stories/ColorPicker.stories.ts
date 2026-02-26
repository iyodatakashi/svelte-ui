// s../lib/components/atoms/ColorPicker.stories.ts
import ColorPicker from '../lib/components/ColorPicker.svelte';

const meta = {
	title: 'Forms/ColorPicker',
	component: ColorPicker,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A color picker component that supports both visual color selection and direct hex color code input.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: { type: 'color' },
			description: 'Selected color (hex code)'
		},
		focusStyle: {
			control: { type: 'radio' },
			options: ['background', 'outline', 'none'],
			description: 'Focus style (background, outline, or none)'
		},
		fullWidth: {
			control: { type: 'boolean' },
			description: 'Whether the picker takes full width'
		},
		rounded: {
			control: { type: 'boolean' },
			description: 'Use rounded corners'
		},
		clearable: {
			control: { type: 'boolean' },
			description: 'Show clear button'
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Whether the picker is disabled'
		},
		readonly: {
			control: { type: 'boolean' },
			description: 'Make the picker read-only'
		},
		customStyle: {
			control: { type: 'text' },
			description: 'Custom CSS styles'
		},
		width: {
			control: { type: 'text' },
			description:
				'Width (number in px or CSS length string, e.g. "200", "50%", "24rem")'
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
};

export default meta;

// Note: Test hover on RoundedClearable story to verify clear button visibility

// Default
export const Default = {
	args: {
		value: '#3498db',
		clearable: true
	}
};

// Rounded
export const Rounded = {
	args: {
		value: '#1abc9c',
		rounded: true
	}
};

// Rounded + Clearable
export const RoundedClearable = {
	args: {
		value: '#e74c3c',
		rounded: true,
		clearable: true
	}
};

// Full width
export const FullWidth = {
	args: {
		value: '#34495e',
		fullWidth: true
	}
};

// Clearable false
export const NotClearable = {
	args: {
		value: '#e67e22',
		clearable: false
	}
};

// Disabled
export const Disabled = {
	args: {
		value: '#95a5a6',
		disabled: true
	}
};

// ReadOnly
export const ReadOnly = {
	args: {
		value: '#f39c12',
		readonly: true
	}
};

// (No dedicated Playground story; use Default and other stories with controls instead.)
