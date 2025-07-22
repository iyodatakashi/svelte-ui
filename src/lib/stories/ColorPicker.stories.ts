// src/lib/components/atoms/ColorPicker.stories.ts
import ColorPicker from '../components/ColorPicker.svelte';

const meta = {
	title: 'Forms/ColorPicker',
	component: ColorPicker,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'カラーピッカーコンポーネント。色選択と16進数カラーコードの直接入力に対応します。'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: { type: 'color' },
			description: '選択された色（16進数カラーコード）'
		},
		theme: {
			control: { type: 'select' },
			options: ['light', 'dark'],
			description: 'テーマ'
		},
		focusStyle: {
			control: { type: 'select' },
			options: ['background', 'border', 'none'],
			description: 'フォーカス時のスタイル'
		},
		fullWidth: {
			control: { type: 'boolean' },
			description: '幅100%で表示'
		},
		rounded: {
			control: { type: 'boolean' },
			description: '角丸デザイン'
		},
		clearable: {
			control: { type: 'boolean' },
			description: 'クリアボタンを表示'
		},
		disabled: {
			control: { type: 'boolean' },
			description: '無効状態'
		},
		readonly: {
			control: { type: 'boolean' },
			description: '読み取り専用'
		},
		customStyle: {
			control: { type: 'text' },
			description: 'カスタムスタイル'
		}
	}
};

export default meta;

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

// Full width
export const FullWidth = {
	args: {
		value: '#34495e',
		fullWidth: true
	}
};

// Focus style: background
export const FocusStyleBackground = {
	args: {
		value: '#8e44ad',
		focusStyle: 'background'
	}
};

// Focus style: border
export const FocusStyleBorder = {
	args: {
		value: '#c0392b',
		focusStyle: 'border'
	}
};

// Focus style: none
export const FocusStyleNone = {
	args: {
		value: '#27ae60',
		focusStyle: 'none'
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

// Playground (全props操作用)
export const Playground = {
	args: {
		value: '#3498db',
		theme: 'light',
		focusStyle: 'background',
		fullWidth: false,
		rounded: false,
		clearable: true,
		disabled: false,
		readonly: false,
		customStyle: ''
	}
};
