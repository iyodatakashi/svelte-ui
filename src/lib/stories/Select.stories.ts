// src/lib/components/atoms/Select.stories.ts
import Select from '../components/Select.svelte';

const meta = {
	title: 'Forms/Select',
	component: Select,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'セレクトボックスコンポーネント。カスタムスタイリングとテーマに対応します。'
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
		}
	}
};

export default meta;

// 基本的な選択肢データ
const basicOptions = [
	{ value: 'option1', label: 'オプション1' },
	{ value: 'option2', label: 'オプション2' },
	{ value: 'option3', label: 'オプション3' }
];

const countryOptions = [
	{ value: 'jp', label: '日本' },
	{ value: 'us', label: 'アメリカ' },
	{ value: 'uk', label: 'イギリス' },
	{ value: 'fr', label: 'フランス' },
	{ value: 'de', label: 'ドイツ' }
];

const numberOptions = [
	{ value: 1, label: '1個' },
	{ value: 5, label: '5個' },
	{ value: 10, label: '10個' },
	{ value: 20, label: '20個' }
];

// 基本パターン
export const Default = {
	args: {
		value: '',
		options: basicOptions,
		placeholder: '選択してください'
	},
	render: (args: any) => ({
		Component: Select,
		props: {
			...args,
			onchange: (value: any) => console.log('Changed:', value),
			onfocus: () => console.log('フォーカスされました'),
			onblur: () => console.log('フォーカスが外れました')
		}
	})
};

// 基本的なセレクト
export const BasicSelect = {
	render: () => ({
		Component: Select,
		props: {
			options: basicOptions,
			placeholder: '選択してください'
		}
	})
};

// 国選択
export const CountrySelect = {
	render: () => ({
		Component: Select,
		props: {
			options: countryOptions,
			placeholder: '国を選択',
			value: 'jp'
		}
	})
};

// 数値選択
export const NumberSelect = {
	render: () => ({
		Component: Select,
		props: {
			options: numberOptions,
			placeholder: '数量を選択'
		}
	})
};

// 角丸デザイン
export const Rounded = {
	render: () => ({
		Component: Select,
		props: {
			options: basicOptions,
			placeholder: '角丸セレクト',
			rounded: true
		}
	})
};

// フルWidth
export const FullWidth = {
	render: () => ({
		Component: Select,
		props: {
			options: countryOptions,
			placeholder: '幅100%のセレクト',
			fullWidth: true
		}
	})
};

// Background Focus
export const BackgroundFocus = {
	render: () => ({
		Component: Select,
		props: {
			options: basicOptions,
			placeholder: 'フォーカス時に背景色変更',
			focusStyle: 'background'
		}
	})
};

// Border Focus
export const BorderFocus = {
	render: () => ({
		Component: Select,
		props: {
			options: basicOptions,
			placeholder: 'フォーカス時にボーダー表示',
			focusStyle: 'border'
		}
	})
};

// No Focus Style
export const NoFocusStyle = {
	render: () => ({
		Component: Select,
		props: {
			options: basicOptions,
			placeholder: 'フォーカススタイルなし',
			focusStyle: 'none'
		}
	})
};

// 無効状態
export const Disabled = {
	render: () => ({
		Component: Select,
		props: {
			options: basicOptions,
			placeholder: '無効な状態',
			disabled: true
		}
	})
};

// 読み取り専用
export const ReadOnly = {
	render: () => ({
		Component: Select,
		props: {
			options: countryOptions,
			value: 'jp',
			readonly: true
		}
	})
};

// 必須項目
export const Required = {
	render: () => ({
		Component: Select,
		props: {
			options: basicOptions,
			placeholder: '必須項目',
			required: true
		}
	})
};

// ダークテーマ
export const DarkTheme = {
	render: () => ({
		Component: Select,
		props: {
			options: countryOptions,
			placeholder: 'ダークテーマのセレクト',
			theme: 'dark'
		}
	})
};

// 一部オプションが無効
export const WithDisabledOptions = {
	render: () => ({
		Component: Select,
		props: {
			options: [
				{ value: 'option1', label: 'オプション1' },
				{ value: 'option2', label: 'オプション2（無効）', disabled: true },
				{ value: 'option3', label: 'オプション3' },
				{ value: 'option4', label: 'オプション4（無効）', disabled: true },
				{ value: 'option5', label: 'オプション5' }
			],
			placeholder: '一部オプションが無効'
		}
	})
};

// 長いオプション名
export const LongOptions = {
	render: () => ({
		Component: Select,
		props: {
			options: [
				{ value: 'short', label: '短い' },
				{ value: 'medium', label: '中程度の長さのオプション' },
				{ value: 'long', label: '非常に長いオプション名でテキストの折り返しや表示を確認' },
				{
					value: 'extra-long',
					label:
						'さらに長いオプション名でユーザーインターフェースの動作をテストするためのサンプルテキスト'
				}
			],
			placeholder: '長いオプション名のテスト'
		}
	})
};

// カテゴリー選択（実用例）
export const CategorySelect = {
	render: () => ({
		Component: Select,
		props: {
			options: [
				{ value: 'electronics', label: '電子機器' },
				{ value: 'clothing', label: '衣類' },
				{ value: 'books', label: '書籍' },
				{ value: 'home', label: 'ホーム・キッチン' },
				{ value: 'sports', label: 'スポーツ・アウトドア' },
				{ value: 'beauty', label: '美容・コスメ' }
			],
			placeholder: 'カテゴリーを選択',
			fullWidth: true
		}
	})
};

// 優先度選択
export const PrioritySelect = {
	render: () => ({
		Component: Select,
		props: {
			options: [
				{ value: 'low', label: '低' },
				{ value: 'medium', label: '中' },
				{ value: 'high', label: '高' },
				{ value: 'urgent', label: '緊急' }
			],
			placeholder: '優先度を選択',
			value: 'medium'
		}
	})
};

// 年月選択
export const MonthSelect = {
	render: () => ({
		Component: Select,
		props: {
			options: [
				{ value: 1, label: '1月' },
				{ value: 2, label: '2月' },
				{ value: 3, label: '3月' },
				{ value: 4, label: '4月' },
				{ value: 5, label: '5月' },
				{ value: 6, label: '6月' },
				{ value: 7, label: '7月' },
				{ value: 8, label: '8月' },
				{ value: 9, label: '9月' },
				{ value: 10, label: '10月' },
				{ value: 11, label: '11月' },
				{ value: 12, label: '12月' }
			],
			placeholder: '月を選択'
		}
	})
};

// 空のオプション
export const EmptyOptions = {
	render: () => ({
		Component: Select,
		props: {
			options: [],
			placeholder: 'オプションがありません'
		}
	})
};

// イベントハンドラーのデモ
export const WithEvents = {
	args: {
		options: basicOptions,
		placeholder: 'イベントを確認（コンソールをチェック）',
		value: ''
	},
	render: (args: any) => ({
		Component: Select,
		props: {
			...args,
			onchange: (value: any) => {
				console.log('onChange:', value);
			},
			onfocus: () => {
				console.log('フォーカスされました');
			},
			onblur: () => {
				console.log('フォーカスが外れました');
			}
		}
	})
};

// カスタムスタイル
export const WithCustomStyle = {
	render: () => ({
		Component: Select,
		props: {
			options: countryOptions,
			placeholder: 'カスタムスタイル',
			customStyle: 'font-weight: bold; color: #007bff;'
		}
	})
};

// 複数のサイズ
export const MultipleSize = {
	render: () => ({
		Component: Select,
		props: {
			options: basicOptions,
			placeholder: '複数選択可能',
			size: 3
		}
	})
};

// フォーム統合例
export const FormExample = {
	render: () => ({
		Component: Select,
		props: {
			options: [
				{ value: 'male', label: '男性' },
				{ value: 'female', label: '女性' },
				{ value: 'other', label: 'その他' },
				{ value: 'not-specified', label: '回答しない' }
			],
			placeholder: '性別を選択',
			fullWidth: true,
			required: true
		}
	})
};
