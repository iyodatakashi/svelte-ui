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
			description: '入力値'
		},
		type: {
			control: { type: 'select' },
			options: ['text', 'password', 'email', 'tel', 'url', 'number'],
			description: '入力タイプ'
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
		leftIconAriaLabel: {
			control: { type: 'text' },
			description: '左アイコンのaria-label'
		},
		rightIconAriaLabel: {
			control: { type: 'text' },
			description: '右アイコンのaria-label'
		},
		minWidth: {
			control: { type: 'number' },
			description: '最小幅'
		},
		maxWidth: {
			control: { type: 'number' },
			description: '最大幅'
		},
		rightIcon: {
			control: { type: 'text' },
			description: '右側のアイコン名'
		},
		leftIcon: {
			control: { type: 'text' },
			description: '左側のアイコン名'
		},
		iconFilled: {
			control: { type: 'boolean' },
			description: 'アイコンを塗りつぶし表示'
		},
		min: {
			control: { type: 'number' },
			description: '最小値（number type用）'
		},
		max: {
			control: { type: 'number' },
			description: '最大値（number type用）'
		},
		step: {
			control: { type: 'number' },
			description: 'ステップ値（number type用）'
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
			description: 'オートコンプリート属性'
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

// Default
export const Default = {
	args: {
		value: '',
		placeholder: 'テキストを入力してください',
		clearable: false
	}
};

// Password
export const Password = {
	args: {
		type: 'password',
		placeholder: 'パスワードを入力',
		value: ''
	}
};

// Number
export const Number = {
	args: {
		type: 'number',
		placeholder: '数値を入力',
		value: 1000
	}
};

// Email
export const Email = {
	args: {
		type: 'email',
		placeholder: 'メールアドレスを入力',
		value: 'example@example.com'
	}
};

// Tel
export const Tel = {
	args: {
		type: 'tel',
		placeholder: '電話番号を入力',
		value: '090-1234-5678'
	}
};

// URL
export const URL = {
	args: {
		type: 'url',
		placeholder: 'URLを入力',
		value: 'https://example.com'
	}
};

// Number with min/max/step
export const NumberWithConstraints = {
	args: {
		type: 'number',
		placeholder: '0-100の範囲で0.1刻み',
		value: 50,
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
		value: '',
		autocomplete: 'email'
	}
};

// Tel with autocomplete
export const TelWithAutocomplete = {
	args: {
		type: 'tel',
		placeholder: '電話番号を入力',
		value: '',
		autocomplete: 'tel'
	}
};

// Inline variant
export const Inline = {
	args: {
		variant: 'inline',
		value: 'インライン表示のテキスト',
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

// Disabled
export const Disabled = {
	args: {
		disabled: true,
		placeholder: '無効な状態',
		value: '編集不可'
	}
};

// Readonly
export const ReadOnly = {
	args: {
		readonly: true,
		placeholder: '読み取り専用',
		value: '表示のみ'
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
		disabled: true,
		value: '無効状態'
	}
};

// Icon Filled Comparison
export const IconFilledComparison = {
	args: {
		placeholder: 'アイコンの塗りつぶし比較',
		leftIcon: 'favorite',
		rightIcon: 'star',
		iconFilled: false
	}
};

// Icon Filled True
export const IconFilledTrue = {
	args: {
		placeholder: 'アイコン塗りつぶしあり',
		leftIcon: 'favorite',
		rightIcon: 'star',
		iconFilled: true
	}
};

// Icon Filled False
export const IconFilledFalse = {
	args: {
		placeholder: 'アイコン塗りつぶしなし',
		leftIcon: 'favorite',
		rightIcon: 'star',
		iconFilled: false
	}
};

// With custom style
export const WithCustomStyle = {
	args: {
		customStyle: 'font-weight: bold; color: #007bff;',
		placeholder: 'カスタムスタイル'
	}
};

// Playground (全props操作用)
export const Playground = {
	args: {
		value: '',
		type: 'text',
		variant: 'default',
		focusStyle: 'background',
		placeholder: 'Playground',
		fullWidth: false,
		clearable: false,
		rounded: false,
		disabled: false,
		readonly: false,
		required: false,
		minWidth: null,
		maxWidth: null,
		min: null,
		max: null,
		step: null,
		autocomplete: null,
		iconFilled: false
	},
	render: (args) => ({
		Component: Input,
		props: {
			...args,
			onchange: (value) => {
				console.log('onChange:', value);
			},
			oninput: (value) => {
				console.log('onInput:', value);
			}
		}
	})
};
