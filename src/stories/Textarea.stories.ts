// src/lib/stories/atoms/Textarea.stories.ts
import Textarea from '../lib/components/Textarea.svelte';

const meta = {
	title: 'Forms/Textarea',
	component: Textarea,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: 'A multi-line text input component that supports auto-resize and inline editing.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: { type: 'text' },
			description: 'Textarea value'
		},
		inline: {
			control: { type: 'boolean' },
			description: 'Borderless, transparent variant that inherits surrounding styles'
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
			description: 'Whether the textarea takes full width'
		},
		autoResize: {
			control: { type: 'boolean' },
			description: 'Automatically resize height based on content'
		},
		resizable: {
			control: { type: 'boolean' },
			description: 'Allow user-driven resize'
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
			description: 'Whether the textarea is disabled'
		},
		readonly: {
			control: { type: 'boolean' },
			description: 'Make the textarea read-only'
		},
		required: {
			control: { type: 'boolean' },
			description: 'Mark the field as required'
		},
		rows: {
			control: { type: 'number', min: 1, max: 20 },
			description: 'Initial row count'
		},
		minHeight: {
			control: { type: 'number' },
			description: 'Minimum height in pixels'
		},
		maxlength: {
			control: { type: 'number' },
			description: 'Maximum character length'
		},
		autocomplete: {
			control: { type: 'select' },
			options: [
				null,
				'on',
				'off',
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
		placeholder: 'Enter multi-line text',
		autoResize: true
	}
};

// Inline
export const Inline = {
	args: {
		inline: true,
		placeholder: 'Inline textarea'
	}
};

// Rounded
export const Rounded = {
	args: {
		rounded: true,
		placeholder: 'Rounded textarea'
	}
};

// Single row (rows=1) with autoResize
export const SingleRow = {
	args: {
		rows: 1,
		autoResize: true,
		placeholder: 'Single row'
	}
};

// Single row + rounded
export const SingleRowRounded = {
	args: {
		rows: 1,
		rounded: true,
		autoResize: true,
		placeholder: 'Single row rounded'
	}
};

// Resizable
export const Resizable = {
	args: {
		resizable: true,
		placeholder: 'Resizable'
	}
};

// With maxHeight
export const WithMaxHeight = {
	args: {
		maxHeight: 300,
		placeholder: 'Maximum height 300px'
	}
};

// Clearable
export const Clearable = {
	args: {
		clearable: true,
		placeholder: 'With clear button',
		value: 'You can clear this text.\nSupports multiple lines.'
	}
};

// Disabled
export const Disabled = {
	args: {
		disabled: true,
		placeholder: 'Disabled text',
		value: ''
	}
};

// Readonly
export const ReadOnly = {
	args: {
		readonly: true,
		value: 'Read-only text.\nCannot be edited.'
	}
};
