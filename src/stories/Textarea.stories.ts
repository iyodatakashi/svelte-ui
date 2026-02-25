// src/lib/stories/atoms/Textarea.stories.ts
import Textarea from '../lib/components/Textarea.svelte';

const meta = {
	title: 'Forms/Textarea',
	component: Textarea,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'複数行テキスト入力用のコンポーネント。自動リサイズやインライン編集に対応します。'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: { type: 'text' },
			description: 'Textarea value'
		},
		variant: {
			control: { type: 'radio' },
			options: ['default', 'inline'],
			description: 'Visual variant (default or inline)'
		},
		focusStyle: {
			control: { type: 'radio' },
			options: ['background', 'border', 'none'],
			description: 'Focus style (background, border, or none)'
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
		placeholder: '複数行のテキストを入力してください',
		rows: 3,
		autoResize: true
	}
};

// Rounded
export const Rounded = {
	args: {
		rounded: true,
		placeholder: '角丸デザインのテキストエリア',
		rows: 4
	}
};

// Full width
export const FullWidth = {
	args: {
		fullWidth: true,
		placeholder: '幅100%のテキストエリア',
		rows: 3
	}
};

// Auto resize
export const AutoResize = {
	args: {
		autoResize: true,
		placeholder: '自動リサイズ',
		rows: 2
	}
};

// Resizable
export const Resizable = {
	args: {
		resizable: true,
		placeholder: 'リサイズ可能',
		rows: 3
	}
};

// Clearable
export const Clearable = {
	args: {
		clearable: true,
		placeholder: 'クリアボタン付き',
		value: 'このテキストをクリアできます\n複数行対応'
	}
};

// Disabled
export const Disabled = {
	args: {
		disabled: true,
		value: '無効状態のテキスト\n操作できません'
	}
};

// Readonly
export const ReadOnly = {
	args: {
		readonly: true,
		value: '読み取り専用のテキスト\n編集できません'
	}
};

// Required
export const Required = {
	args: {
		required: true,
		placeholder: '必須項目'
	}
};

// With minHeight
export const WithMinHeight = {
	args: {
		minHeight: 100,
		placeholder: '最小高さ100px',
		rows: 2
	}
};

// With maxlength
export const WithMaxlength = {
	args: {
		maxlength: 50,
		placeholder: '最大50文字まで',
		rows: 2
	}
};

