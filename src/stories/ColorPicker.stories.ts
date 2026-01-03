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
		},
		// 新しいイベントハンドラのargTypes
		onfocus: {
			action: 'focused',
			description: 'フォーカスイベント'
		},
		onblur: {
			action: 'blurred',
			description: 'ブラーイベント'
		},
		onkeydown: {
			action: 'keydown',
			description: 'キーダウンイベント'
		},
		onkeyup: {
			action: 'keyup',
			description: 'キーアップイベント'
		},
		onclick: {
			action: 'clicked',
			description: 'クリックイベント'
		},
		onmousedown: {
			action: 'mousedown',
			description: 'マウスダウンイベント'
		},
		onmouseup: {
			action: 'mouseup',
			description: 'マウスアップイベント'
		},
		onmouseenter: {
			action: 'mouseenter',
			description: 'マウスエンターイベント'
		},
		onmouseleave: {
			action: 'mouseleave',
			description: 'マウスリーブイベント'
		},
		onmouseover: {
			action: 'mouseover',
			description: 'マウスオーバーイベント'
		},
		onmouseout: {
			action: 'mouseout',
			description: 'マウスアウトイベント'
		},
		oncontextmenu: {
			action: 'contextmenu',
			description: 'コンテキストメニューイベント'
		},
		onauxclick: {
			action: 'auxclick',
			description: '補助ボタンクリックイベント'
		},
		ontouchstart: {
			action: 'touchstart',
			description: 'タッチ開始イベント'
		},
		ontouchend: {
			action: 'touchend',
			description: 'タッチ終了イベント'
		},
		ontouchmove: {
			action: 'touchmove',
			description: 'タッチ移動イベント'
		},
		ontouchcancel: {
			action: 'touchcancel',
			description: 'タッチキャンセルイベント'
		},
		onpointerdown: {
			action: 'pointerdown',
			description: 'ポインターダウンイベント'
		},
		onpointerup: {
			action: 'pointerup',
			description: 'ポインターアップイベント'
		},
		onpointerenter: {
			action: 'pointerenter',
			description: 'ポインターエンターイベント'
		},
		onpointerleave: {
			action: 'pointerleave',
			description: 'ポインターリーブイベント'
		},
		onpointermove: {
			action: 'pointermove',
			description: 'ポインター移動イベント'
		},
		onpointercancel: {
			action: 'pointercancel',
			description: 'ポインターキャンセルイベント'
		},
		onchange: {
			action: 'changed',
			description: '変更イベント'
		},
		oninput: {
			action: 'input',
			description: '入力イベント'
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
		focusStyle: 'background',
		fullWidth: false,
		rounded: false,
		clearable: true,
		disabled: false,
		readonly: false,
		customStyle: ''
	}
};
