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
		// 基本プロパティ
		name: {
			control: { type: 'text' },
			description: 'Name attribute for the input'
		},
		value: {
			control: { type: 'text' },
			description: 'Input value'
		},
		// HTML 属性系
		id: {
			control: { type: 'text' },
			description: 'ID attribute for the input element'
		},
		type: {
			control: { type: 'select' },
			options: ['text', 'password', 'email', 'tel', 'url', 'number'],
			description: 'HTML input type'
		},
		tabindex: {
			control: { type: 'number' },
			description: 'Tab index of the input'
		},
		maxlength: {
			control: { type: 'number' },
			description: 'Maximum number of characters allowed'
		},
		pattern: {
			control: { type: 'text' },
			description: 'Validation pattern (regular expression)'
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
		decimalPlaces: {
			control: { type: 'number' },
			description: 'Decimal places for number formatting'
		},
		enableThousandsSeparator: {
			control: { type: 'boolean' },
			description: 'Enable thousands separator for numbers'
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
		spellcheck: {
			control: { type: 'boolean' },
			description: 'Enable spell checking'
		},
		inputAttributes: {
			control: { type: 'object' },
			description: 'Additional native input attributes'
		},
		// スタイル/レイアウト
		inline: {
			control: { type: 'boolean' },
			description: 'Render input as inline variant'
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
		width: {
			control: { type: 'text' },
			description:
				'Width (number in px or CSS length string, e.g. "200", "50%", "16rem"). When set, overrides minWidth.'
		},
		minWidth: {
			control: { type: 'text' },
			description: 'Minimum width (number in px or CSS length string, e.g. "200", "50%", "16rem")'
		},
		maxWidth: {
			control: { type: 'text' },
			description: 'Maximum width (number in px or CSS length string, e.g. "300", "80%", "24rem")'
		},
		rounded: {
			control: { type: 'boolean' },
			description: 'Use rounded corners'
		},
		customStyle: {
			control: { type: 'text' },
			description: 'Custom CSS style string applied to the input wrapper'
		},
		unit: {
			control: { type: 'text' },
			description: 'Unit label displayed next to numeric values'
		},
		// アイコン関連
		rightIcon: {
			control: { type: 'text' },
			description: 'Right icon name'
		},
		leftIcon: {
			control: { type: 'text' },
			description: 'Left icon name'
		},
		leftIconAriaLabel: {
			control: { type: 'text' },
			description: 'ARIA label for the left icon'
		},
		rightIconAriaLabel: {
			control: { type: 'text' },
			description: 'ARIA label for the right icon'
		},
		iconFilled: {
			control: { type: 'boolean' },
			description: 'Render icons as filled variants'
		},
		iconWeight: {
			control: { type: 'select' },
			options: [100, 200, 300, 400, 500, 600, 700],
			description: 'Material icon weight (wght)'
		},
		iconGrade: {
			control: { type: 'number' },
			description: 'Material icon grade (GRAD)'
		},
		iconOpticalSize: {
			control: { type: 'number' },
			description: 'Material icon optical size (opsz)'
		},
		iconVariant: {
			control: { type: 'radio' },
			options: ['outlined', 'rounded', 'sharp'],
			description: 'Material icon font family variant'
		},
		enablePasswordVisibilityToggle: {
			control: { type: 'boolean' },
			description: 'Show password visibility toggle for password type'
		},
		enableNumberStepper: {
			control: { type: 'boolean' },
			description: 'Show increment/decrement steppers for number type'
		},
		// 状態/動作
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
		clearable: {
			control: { type: 'boolean' },
			description: 'Show clear button'
		},
		linkify: {
			control: { type: 'boolean' },
			description: 'Render URLs as clickable links when not focused'
		},
		// アイコンイベント
		onRightIconClick: {
			action: 'right icon clicked',
			description: 'Click event on the right icon'
		},
		onLeftIconClick: {
			action: 'left icon clicked',
			description: 'Click event on the left icon'
		},
		onRightIconMouseDown: {
			action: 'right icon mousedown',
			description: 'Mousedown event on the right icon'
		},
		onLeftIconMouseDown: {
			action: 'left icon mousedown',
			description: 'Mousedown event on the left icon'
		},
		onRightIconMouseUp: {
			action: 'right icon mouseup',
			description: 'Mouseup event on the right icon'
		},
		onLeftIconMouseUp: {
			action: 'left icon mouseup',
			description: 'Mouseup event on the left icon'
		},
		onRightIconMouseLeave: {
			action: 'right icon mouseleave',
			description: 'Mouseleave event on the right icon'
		},
		onLeftIconMouseLeave: {
			action: 'left icon mouseleave',
			description: 'Mouseleave event on the left icon'
		},
		onRightIconTouchStart: {
			action: 'right icon touchstart',
			description: 'Touch start on the right icon'
		},
		onLeftIconTouchStart: {
			action: 'left icon touchstart',
			description: 'Touch start on the left icon'
		},
		onRightIconTouchEnd: {
			action: 'right icon touchend',
			description: 'Touch end on the right icon'
		},
		onLeftIconTouchEnd: {
			action: 'left icon touchend',
			description: 'Touch end on the left icon'
		},
		onRightIconTouchCancel: {
			action: 'right icon touchcancel',
			description: 'Touch cancel on the right icon'
		},
		onLeftIconTouchCancel: {
			action: 'left icon touchcancel',
			description: 'Touch cancel on the left icon'
		},
		// 入力・フォーカス・ポインターイベント
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
		enablePasswordVisibilityToggle: true,
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

// Inline
export const Inline = {
	args: {
		inline: true,
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

// Disabled
export const Disabled = {
	args: {
		disabled: true,
		placeholder: 'Disabled Input'
	}
};

// Readonly
export const ReadOnly = {
	args: {
		readonly: true,
		placeholder: 'Readonly Input'
	}
};
