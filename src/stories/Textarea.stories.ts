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
		name: {
			control: { type: 'text' },
			description: 'Name attribute'
		},
		placeholder: {
			control: { type: 'text' },
			description: 'Placeholder text'
		},
		id: {
			control: { type: 'text' },
			description: 'ID attribute'
		},
		tabindex: {
			control: { type: 'number' },
			description: 'Tab index'
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
		wrap: {
			control: { type: 'radio' },
			options: [null, 'soft', 'hard'],
			description: 'Wrap attribute'
		},
		spellcheck: {
			control: { type: 'boolean' },
			description: 'Spellcheck attribute'
		},
		rows: {
			control: { type: 'number', min: 1, max: 20 },
			description: 'Initial row count'
		},
		minHeight: {
			control: { type: 'number' },
			description: 'Minimum height (number as px, or pass string in args)'
		},
		maxHeight: {
			control: { type: 'number' },
			description: 'Maximum height (number as px, or pass string in args)'
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
		width: {
			control: { type: 'text' },
			description: 'Width (number as px or string e.g. "100%")'
		},
		fullWidth: {
			control: { type: 'boolean' },
			description: 'Whether the textarea takes full width'
		},
		fullHeight: {
			control: { type: 'boolean' },
			description: 'Whether the textarea takes full height'
		},
		customStyle: {
			control: { type: 'text' },
			description: 'Additional inline style'
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
		clearButtonAriaLabel: {
			control: { type: 'text' },
			description: 'Aria label for clear button'
		},
		iconFilled: {
			control: { type: 'boolean' },
			description: 'Use filled icon variant for clear button'
		},
		iconVariant: {
			control: { type: 'select' },
			options: ['outlined', 'filled', 'rounded', 'sharp', 'two-tone'],
			description: 'Icon variant for clear button'
		},
		iconWeight: {
			control: { type: 'select' },
			options: [100, 200, 300, 400, 500, 600, 700],
			description: 'Icon weight for clear button (Material Symbols)'
		},
		iconGrade: {
			control: { type: 'number' },
			description: 'Icon grade for clear button (Material Symbols)'
		},
		iconOpticalSize: {
			control: { type: 'number' },
			description: 'Icon optical size for clear button (Material Symbols)'
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
		linkify: {
			control: { type: 'boolean' },
			description: 'Parse and linkify URLs in content'
		},
		autocapitalize: {
			control: { type: 'select' },
			options: [null, 'off', 'none', 'on', 'sentences', 'words', 'characters'],
			description: 'Autocapitalize attribute'
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
		placeholder: 'Enter multi-line text'
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
