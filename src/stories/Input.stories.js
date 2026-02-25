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
					'テキスト入力用のコンポーネント。デフォルトとインラインの2つのバリアントを提供します。'
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
		// 新しいイベントハンドラのargTypes
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
		placeholder: 'テキストを入力してください'
	}
};

// Password
export const Password = {
	args: {
		type: 'password',
		placeholder: 'パスワードを入力'
	}
};

// Number
export const Number = {
	args: {
		type: 'number',
		placeholder: '数値を入力'
	}
};

// Email
export const Email = {
	args: {
		type: 'email',
		placeholder: 'メールアドレスを入力'
	}
};

// Tel
export const Tel = {
	args: {
		type: 'tel',
		placeholder: '電話番号を入力'
	}
};

// URL
export const URL = {
	args: {
		type: 'url',
		placeholder: 'URLを入力'
	}
};

// Number with min/max/step
export const NumberWithConstraints = {
	args: {
		type: 'number',
		placeholder: '0-100の範囲で0.1刻み',
		min: 0,
		max: 100,
		step: 0.1
	}
};

// Email with autocomplete
export const EmailWithAutocomplete = {
	args: {
		type: 'email',
		placeholder: 'メールアドレスを入力',
		autocomplete: 'email'
	}
};

// Tel with autocomplete
export const TelWithAutocomplete = {
	args: {
		type: 'tel',
		placeholder: '電話番号を入力',
		autocomplete: 'tel'
	}
};

// Inline
export const Inline = {
	args: {
		variant: 'inline',
		placeholder: 'クリックして編集'
	}
};

// Rounded
export const Rounded = {
	args: {
		rounded: true,
		placeholder: '角丸の入力フィールド'
	}
};

// Full width
export const FullWidth = {
	args: {
		fullWidth: true,
		placeholder: '幅100%の入力フィールド'
	}
};

// Disabled
export const Disabled = {
	args: {
		disabled: true,
		placeholder: '無効な状態'
	}
};

// Readonly
export const ReadOnly = {
	args: {
		readonly: true,
		placeholder: '読み取り専用'
	}
};

// Required
export const Required = {
	args: {
		required: true,
		placeholder: '必須項目'
	}
};

// With min/max width
export const WithWidthLimits = {
	args: {
		minWidth: 200,
		maxWidth: 300,
		placeholder: '幅制限あり'
	}
};

// With Right Icon
export const WithRightIcon = {
	args: {
		placeholder: '右側にアイコン',
		rightIcon: 'search',
		iconFilled: true,
		onRightIconClick: () => alert('右アイコンがクリックされました！')
	}
};

// With Left Icon
export const WithLeftIcon = {
	args: {
		placeholder: '左側にアイコン',
		leftIcon: 'person',
		iconFilled: true,
		onLeftIconClick: () => alert('左アイコンがクリックされました！')
	}
};

// With Both Icons
export const WithBothIcons = {
	args: {
		placeholder: '両側にアイコン',
		leftIcon: 'search',
		rightIcon: 'clear',
		iconFilled: true,
		onLeftIconClick: () => alert('左アイコンがクリックされました！'),
		onRightIconClick: () => alert('右アイコンがクリックされました！')
	}
};

// Icons Disabled State
export const IconsDisabled = {
	args: {
		placeholder: '無効状態のアイコン',
		rightIcon: 'calendar_today',
		leftIcon: 'person',
		iconFilled: true,
		disabled: true
	}
};
