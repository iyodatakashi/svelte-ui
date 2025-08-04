// src/lib/stories/atoms/Textarea.stories.ts
import Textarea from '../components/Textarea.svelte';

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
			description: '入力値'
		},
		variant: {
			control: { type: 'select' },
			options: ['default', 'inline'],
			description: 'デザインバリアント'
		},
		focusStyle: {
			control: { type: 'select' },
			options: ['background', 'border', 'none'],
			description: 'フォーカス時のスタイル'
		},
		placeholder: {
			control: { type: 'text' },
			description: 'プレースホルダーテキスト'
		},
		fullWidth: {
			control: { type: 'boolean' },
			description: '幅100%で表示'
		},
		autoResize: {
			control: { type: 'boolean' },
			description: '内容に応じて高さを自動調整'
		},
		resizable: {
			control: { type: 'boolean' },
			description: 'ユーザーによるリサイズを許可'
		},
		clearable: {
			control: { type: 'boolean' },
			description: 'クリアボタンを表示'
		},
		rounded: {
			control: { type: 'boolean' },
			description: '角丸デザイン'
		},
		disabled: {
			control: { type: 'boolean' },
			description: '無効状態'
		},
		readonly: {
			control: { type: 'boolean' },
			description: '読み取り専用'
		},
		required: {
			control: { type: 'boolean' },
			description: '必須項目'
		},
		rows: {
			control: { type: 'number', min: 1, max: 20 },
			description: '初期行数'
		},
		minHeight: {
			control: { type: 'number' },
			description: '最小高さ（px）'
		},
		maxlength: {
			control: { type: 'number' },
			description: '最大文字数'
		}
	}
};

export default meta;

// Default
export const Default = {
	args: {
		value: '',
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

// Focus style: background
export const FocusStyleBackground = {
	args: {
		focusStyle: 'background',
		placeholder: 'フォーカス時に背景色変更'
	}
};

// Focus style: border
export const FocusStyleBorder = {
	args: {
		focusStyle: 'border',
		placeholder: 'フォーカス時にボーダー表示'
	}
};

// Focus style: none
export const FocusStyleNone = {
	args: {
		focusStyle: 'none',
		placeholder: 'フォーカススタイルなし'
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

// Playground (全props操作用)
export const Playground = {
	args: {
		value: '',
		variant: 'default',
		focusStyle: 'background',
		placeholder: 'Playground',
		fullWidth: false,
		autoResize: false,
		resizable: false,
		clearable: false,
		rounded: false,
		disabled: false,
		readonly: false,
		required: false,
		rows: 3,
		minHeight: null,
		maxlength: null
	},
	render: (args: Record<string, unknown>) => ({
		Component: Textarea,
		props: {
			...args,
			onchange: (value: string | number | null | undefined) => {
				console.log('onChange:', value);
			},
			oninput: (value: string | number | undefined) => {
				console.log('onInput:', value);
			}
		}
	})
};
