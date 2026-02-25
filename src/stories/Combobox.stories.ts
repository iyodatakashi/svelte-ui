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

// 基本的なコンボボックス
export const BasicCombobox = {
	render: () => ({
		Component: Combobox,
		props: {
			options: basicOptions,
			placeholder: '選択または入力してください'
		}
	})
};

// 国選択
export const CountrySearch = {
	render: () => ({
		Component: Combobox,
		props: {
			options: countryOptions,
			placeholder: '国名を検索...'
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

// 文字数制限
export const WithMaxLength = {
	render: () => ({
		Component: Combobox,
		props: {
			options: colorOptions,
			placeholder: '最大10文字まで',
			maxlength: 10
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

// 都道府県選択（実用例）
export const PrefectureSelector = {
	render: () => ({
		Component: Combobox,
		props: {
			options: [
				'北海道',
				'青森県',
				'岩手県',
				'宮城県',
				'秋田県',
				'山形県',
				'福島県',
				'茨城県',
				'栃木県',
				'群馬県',
				'埼玉県',
				'千葉県',
				'東京都',
				'神奈川県',
				'新潟県',
				'富山県',
				'石川県',
				'福井県',
				'山梨県',
				'長野県',
				'岐阜県',
				'静岡県',
				'愛知県',
				'三重県',
				'滋賀県',
				'京都府',
				'大阪府',
				'兵庫県',
				'奈良県',
				'和歌山県',
				'鳥取県',
				'島根県',
				'岡山県',
				'広島県',
				'山口県',
				'徳島県',
				'香川県',
				'愛媛県',
				'高知県',
				'福岡県',
				'佐賀県',
				'長崎県',
				'熊本県',
				'大分県',
				'宮崎県',
				'鹿児島県',
				'沖縄県'
			],
			placeholder: '都道府県を選択または検索',
			fullWidth: true
		}
	})
};

// フォーム統合例
export const FormIntegration = {
	render: () => ({
		Component: Combobox,
		props: {
			options: ['個人', '法人', 'フリーランス', '学生', 'その他'],
			placeholder: '職業を選択または入力',
			required: true,
			fullWidth: true
		}
	})
};

// イベントハンドラーのデモ
export const WithEvents = {
	args: {
		options: basicOptions,
		placeholder: 'イベントを確認（コンソールをチェック）',
		value: '',
		filterable: true
	},
	render: (args: Record<string, unknown>) => ({
		Component: Combobox,
		props: {
			...args,
			onchange: (value: string | number | null | undefined) => {
				console.log('onChange:', value);
			},
			oninput: (value: string | number | null | undefined) => {
				console.log('onInput:', value);
			},
			onfocus: () => {
				console.log('フォーカスされました');
			},
			onblur: () => {
				console.log('フォーカスが外れました');
			},
			onclick: () => {
				console.log('クリックされました');
			},
			onkeydown: () => {
				console.log('キーが押されました');
			}
		}
	})
};

// カスタムスタイル（docs などでコード例として示すことを推奨）
