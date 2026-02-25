// s../lib/components/atoms/Combobox.stories.ts
import Combobox from '../lib/components/Combobox.svelte';

const meta = {
	title: 'Forms/Combobox',
	component: Combobox,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'フィルタリング機能付きのコンボボックスコンポーネント。検索とオプション選択が可能です。'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: { type: 'text' },
			description: 'Selected value'
		},
		options: {
			control: { type: 'object' },
			description: 'Array of selectable options'
		},
		inline: {
			control: { type: 'boolean' },
			description: 'Display as inline editable text'
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
			description: 'Whether the combobox takes full width'
		},
		filterable: {
			control: { type: 'boolean' },
			description: 'Enable filtering as the user types'
		},
		rounded: {
			control: { type: 'boolean' },
			description: 'Use rounded corners'
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Whether the combobox is disabled'
		},
		readonly: {
			control: { type: 'boolean' },
			description: 'Make the input read-only'
		},
		required: {
			control: { type: 'boolean' },
			description: 'Mark the field as required'
		},
		minWidth: {
			control: { type: 'number' },
			description: 'Minimum width in pixels'
		},
		maxWidth: {
			control: { type: 'number' },
			description: 'Maximum width in pixels'
		},
		maxlength: {
			control: { type: 'number' },
			description: 'Maximum input length'
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

// 基本的なオプションデータ
const basicOptions = ['オプション1', 'オプション2', 'オプション3', 'オプション4', 'オプション5'];

const countryOptions = [
	'日本',
	'アメリカ',
	'イギリス',
	'フランス',
	'ドイツ',
	'カナダ',
	'オーストラリア',
	'ブラジル',
	'インド',
	'中国'
];

const colorOptions = ['赤', '青', '緑', '黄色', '紫', 'オレンジ', '黒', '白', 'グレー', 'ピンク'];

const numberOptions = [1, 5, 10, 20, 50, 100, 200, 500, 1000];

const programmingLanguages = [
	'JavaScript',
	'TypeScript',
	'Python',
	'Java',
	'C++',
	'C#',
	'Ruby',
	'PHP',
	'Go',
	'Rust',
	'Swift',
	'Kotlin',
	'Scala',
	'Haskell',
	'Elixir',
	'Clojure',
	'F#',
	'OCaml',
	'Erlang',
	'Lua'
];

// Default combobox (country options)
export const Default = {
	render: () => ({
		Component: Combobox,
		props: {
			options: countryOptions,
			placeholder: '国を選択または入力してください'
		}
	})
};

// フィルタリング無効
export const NonFilterable = {
	render: () => ({
		Component: Combobox,
		props: {
			options: basicOptions,
			placeholder: 'フィルタリング無効'
		}
	})
};

// 角丸デザイン
export const Rounded = {
	render: () => ({
		Component: Combobox,
		props: {
			options: countryOptions,
			placeholder: '角丸のコンボボックス',
			rounded: true
		}
	})
};

// フルWidth
export const FullWidth = {
	render: () => ({
		Component: Combobox,
		props: {
			options: programmingLanguages,
			placeholder: '幅100%のコンボボックス',
			fullWidth: true
		}
	})
};

// インラインバリアント
export const Inline = {
	render: () => ({
		Component: Combobox,
		props: {
			inline: true,
			options: countryOptions,
			placeholder: 'クリックして編集'
		}
	})
};

// 幅制限
export const WithWidthLimits = {
	render: () => ({
		Component: Combobox,
		props: {
			options: programmingLanguages,
			placeholder: '幅制限あり',
			minWidth: 200,
			maxWidth: 300
		}
	})
};

// カスタムスタイル（docs などでコード例として示すことを推奨）
