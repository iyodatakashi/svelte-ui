// src/lib/components/atoms/Combobox.stories.ts
import Combobox from '../components/Combobox.svelte';

const meta = {
	title: 'Forms/Combobox',
	component: Combobox,
	parameters: {
		layout: 'centered',
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
			description: '選択された値'
		},
		options: {
			control: { type: 'object' },
			description: '選択肢の配列'
		},
		variant: {
			control: { type: 'select' },
			options: ['default', 'inline'],
			description: 'デザインバリアント'
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
		placeholder: {
			control: { type: 'text' },
			description: 'プレースホルダーテキスト'
		},
		fullWidth: {
			control: { type: 'boolean' },
			description: '幅100%で表示'
		},
		filterable: {
			control: { type: 'boolean' },
			description: 'フィルタリング機能を有効にする'
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
		minWidth: {
			control: { type: 'number' },
			description: '最小幅'
		},
		maxWidth: {
			control: { type: 'number' },
			description: '最大幅'
		},
		maxlength: {
			control: { type: 'number' },
			description: '最大文字数'
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

// Playground (全props操作用)
export const Playground = {
	args: {
		value: '',
		options: basicOptions,
		variant: 'default',
		theme: 'light',
		focusStyle: 'background',
		fullWidth: false,
		rounded: false,
		filterable: true,
		disabled: false,
		readonly: false,
		required: false,
		minWidth: null,
		maxWidth: null,
		maxlength: null,
		placeholder: 'Playground'
	}
};

// 基本的なコンボボックス
export const BasicCombobox = {
	render: () => ({
		Component: Combobox,
		props: {
			options: basicOptions,
			placeholder: '選択または入力してください',
			filterable: true
		}
	})
};

// 国選択
export const CountrySearch = {
	render: () => ({
		Component: Combobox,
		props: {
			options: countryOptions,
			placeholder: '国名を検索...',
			filterable: true,
			value: '日本'
		}
	})
};

// プログラミング言語選択
export const ProgrammingLanguageSearch = {
	render: () => ({
		Component: Combobox,
		props: {
			options: programmingLanguages,
			placeholder: 'プログラミング言語を検索...',
			filterable: true
		}
	})
};

// 数値選択
export const NumberCombobox = {
	render: () => ({
		Component: Combobox,
		props: {
			options: numberOptions,
			placeholder: '数値を選択または入力',
			filterable: true
		}
	})
};

// 色選択
export const ColorPicker = {
	render: () => ({
		Component: Combobox,
		props: {
			options: colorOptions,
			placeholder: '色を選択...',
			filterable: true
		}
	})
};

// フィルタリング無効
export const NonFilterable = {
	render: () => ({
		Component: Combobox,
		props: {
			options: basicOptions,
			placeholder: 'フィルタリング無効',
			filterable: false
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
			filterable: true,
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
			filterable: true,
			fullWidth: true
		}
	})
};

// Background Focus
export const BackgroundFocus = {
	render: () => ({
		Component: Combobox,
		props: {
			options: colorOptions,
			placeholder: 'フォーカス時に背景色変更',
			focusStyle: 'background',
			filterable: true
		}
	})
};

// Border Focus
export const BorderFocus = {
	render: () => ({
		Component: Combobox,
		props: {
			options: basicOptions,
			placeholder: 'フォーカス時にボーダー表示',
			focusStyle: 'border',
			filterable: true
		}
	})
};

// No Focus Style
export const NoFocusStyle = {
	render: () => ({
		Component: Combobox,
		props: {
			options: basicOptions,
			placeholder: 'フォーカススタイルなし',
			focusStyle: 'none',
			filterable: true
		}
	})
};

// インラインバリアント
export const Inline = {
	render: () => ({
		Component: Combobox,
		props: {
			variant: 'inline',
			options: countryOptions,
			value: '日本',
			placeholder: 'クリックして編集',
			filterable: true
		}
	})
};

// インライン（空の値）
export const InlineEmpty = {
	render: () => ({
		Component: Combobox,
		props: {
			variant: 'inline',
			options: colorOptions,
			value: '',
			placeholder: '色を選択してください',
			filterable: true
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
			maxlength: 10,
			filterable: true
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
			maxWidth: 300,
			filterable: true
		}
	})
};

// 大量のオプション
export const LargeOptionList = {
	render: () => ({
		Component: Combobox,
		props: {
			options: Array.from({ length: 100 }, (_, i) => `オプション${i + 1}`),
			placeholder: '大量のオプションから検索',
			filterable: true
		}
	})
};

// 空のオプション
export const EmptyOptions = {
	render: () => ({
		Component: Combobox,
		props: {
			options: [],
			placeholder: 'オプションがありません',
			filterable: true
		}
	})
};

// 混在した型のオプション
export const MixedTypeOptions = {
	render: () => ({
		Component: Combobox,
		props: {
			options: ['文字列1', '文字列2', 123, 456, null, '文字列3'],
			placeholder: '混在した型のオプション',
			filterable: true
		}
	})
};

// 長いオプション名
export const LongOptionNames = {
	render: () => ({
		Component: Combobox,
		props: {
			options: [
				'短い',
				'中程度の長さのオプション',
				'非常に長いオプション名でテキストの折り返しや表示を確認するためのサンプル',
				'さらに長いオプション名でユーザーインターフェースの動作をテストするための詳細なサンプルテキスト',
				'普通の長さ'
			],
			placeholder: '長いオプション名のテスト',
			filterable: true
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
			filterable: true,
			fullWidth: true
		}
	})
};

// 技術スタック選択
export const TechStackSelector = {
	render: () => ({
		Component: Combobox,
		props: {
			options: [
				'React',
				'Vue.js',
				'Angular',
				'Svelte',
				'Next.js',
				'Nuxt.js',
				'Gatsby',
				'Node.js',
				'Express.js',
				'Fastify',
				'NestJS',
				'Django',
				'Flask',
				'Laravel',
				'MongoDB',
				'PostgreSQL',
				'MySQL',
				'Redis',
				'ElasticSearch',
				'Docker',
				'Kubernetes',
				'AWS',
				'GCP',
				'Azure',
				'Vercel',
				'Netlify'
			],
			placeholder: '技術スタックを検索...',
			filterable: true
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
			filterable: true,
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

// カスタムスタイル
export const WithCustomStyle = {
	render: () => ({
		Component: Combobox,
		props: {
			options: colorOptions,
			placeholder: 'カスタムスタイル',
			customStyle: 'font-weight: bold; color: #007bff;',
			filterable: true
		}
	})
};
