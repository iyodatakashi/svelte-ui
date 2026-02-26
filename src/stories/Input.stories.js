// s../lib/components/atoms/Input.stories.ts
import Input from '../lib/components/Input.svelte';

const meta = {
	title: 'Forms/Input',
	component: Input,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A text input component that provides both default and inline variants for flexible layouts.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: { type: 'text' },
			description: 'Input value'
		},
		type: {
			control: { type: 'select' },
			options: ['text', 'password', 'email', 'tel', 'url', 'number'],
			description: 'HTML input type'
		},
		variant: {
			control: { type: 'radio' },
			options: ['default', 'inline'],
			description: 'Visual variant (default or inline)'
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
			description: 'Whether the input takes full width'
		},
		clearable: {
			control: { type: 'boolean' },
			description: 'Show clear button'
		},
		rounded: {
			control: { type: 'boolean' },
			description: 'Use rounded corners'
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Whether the input is disabled'
		},
		readonly: {
			control: { type: 'boolean' },
			description: 'Make the input read-only'
		},
		required: {
			control: { type: 'boolean' },
			description: 'Mark the field as required'
		},
		leftIconAriaLabel: {
			control: { type: 'text' },
			description: 'ARIA label for the left icon'
		},
		rightIconAriaLabel: {
			control: { type: 'text' },
			description: 'ARIA label for the right icon'
		},
		minWidth: {
			control: { type: 'text' },
			description: 'Minimum width (number in px or CSS length string, e.g. "200", "50%", "16rem")'
		},
		maxWidth: {
			control: { type: 'text' },
			description: 'Maximum width (number in px or CSS length string, e.g. "300", "80%", "24rem")'
		},
		rightIcon: {
			control: { type: 'text' },
			description: 'Right icon name'
		},
		leftIcon: {
			control: { type: 'text' },
			description: 'Left icon name'
		},
		iconFilled: {
			control: { type: 'boolean' },
			description: 'Render icons as filled variants'
		},
		min: {
			control: { type: 'number' },
			description: 'Minimum value (for number type)'
		},
		max: {
			control: { type: 'number' },
			description: 'Maximum value (for number type)'
		},
		step: {
			control: { type: 'number' },
			description: 'Step value (for number type)'
		},
		autocomplete: {
			control: { type: 'select' },
			options: [
				null,
				'email',
				'tel',
				'url',
				'name',
				'username',
				'current-password',
				'new-password'
			],
			description: 'Autocomplete attribute'
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

// Default
export const Default = {
	args: {
		placeholder: 'Enter text'
	}
};

// Password
export const Password = {
	args: {
		type: 'password',
		placeholder: 'Enter password'
	}
};

// Number
export const Number = {
	args: {
		type: 'number',
		placeholder: 'Enter a number'
	}
};

// Email
export const Email = {
	args: {
		type: 'email',
		placeholder: 'Enter email address'
	}
};

// Tel
export const Tel = {
	args: {
		type: 'tel',
		placeholder: 'Enter phone number'
	}
};

// URL
export const URL = {
	args: {
		type: 'url',
		placeholder: 'Enter URL'
	}
};

// Number with min/max/step
export const NumberWithConstraints = {
	args: {
		type: 'number',
		placeholder: '0–100 range with 0.1 step',
		min: 0,
		max: 100,
		step: 0.1
	}
};

// Email with autocomplete
export const EmailWithAutocomplete = {
	args: {
		type: 'email',
		placeholder: 'Enter email address',
		autocomplete: 'email'
	}
};

// Tel with autocomplete
export const TelWithAutocomplete = {
	args: {
		type: 'tel',
		placeholder: 'Enter phone number',
		autocomplete: 'tel'
	}
};

// Inline
export const Inline = {
	args: {
		variant: 'inline',
		placeholder: 'Click to edit'
	}
};

// Rounded
export const Rounded = {
	args: {
		rounded: true,
		placeholder: 'Rounded input field'
	}
};

// Full width
export const FullWidth = {
	args: {
		fullWidth: true,
		placeholder: 'Full-width input field'
	}
};

// Disabled
export const Disabled = {
	args: {
		disabled: true,
		placeholder: 'Disabled state'
	}
};

// Readonly
export const ReadOnly = {
	args: {
		readonly: true,
		placeholder: 'Read-only'
	}
};

// With min/max width
export const WithWidthLimits = {
	args: {
		minWidth: 200,
		maxWidth: 300,
		placeholder: 'Width-constrained input'
	}
};

// With Right Icon
export const WithRightIcon = {
	args: {
		placeholder: 'Icon on the right',
		rightIcon: 'search',
		iconFilled: true,
		onRightIconClick: () => alert('Right icon clicked!')
	}
};

// With Left Icon
export const WithLeftIcon = {
	args: {
		placeholder: 'Icon on the left',
		leftIcon: 'person',
		iconFilled: true,
		onLeftIconClick: () => alert('Left icon clicked!')
	}
};

// With Both Icons
export const WithBothIcons = {
	args: {
		placeholder: 'Icons on both sides',
		leftIcon: 'search',
		rightIcon: 'clear',
		iconFilled: true,
		onLeftIconClick: () => alert('Left icon clicked!'),
		onRightIconClick: () => alert('Right icon clicked!')
	}
};

// Icons Disabled State
export const IconsDisabled = {
	args: {
		placeholder: 'Icons in disabled state',
		rightIcon: 'calendar_today',
		leftIcon: 'person',
		iconFilled: true,
		disabled: true
	}
};
