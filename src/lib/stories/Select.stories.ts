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

// Default
export const Default = {
	args: {
		value: '',
		options: basicOptions,
		placeholder: '選択してください'
	}
};

// Dark theme
export const DarkTheme = {
	args: {
		options: basicOptions,

		placeholder: 'ダークテーマのセレクト'
	}
};

// Rounded
export const Rounded = {
	args: {
		options: basicOptions,
		rounded: true,
		placeholder: '角丸セレクト'
	}
};

// Full width
export const FullWidth = {
	args: {
		options: basicOptions,
		fullWidth: true,
		placeholder: '幅100%のセレクト'
	}
};

// Focus style: background
export const FocusStyleBackground = {
	args: {
		options: basicOptions,
		focusStyle: 'background',
		placeholder: 'フォーカス時に背景色変更'
	}
};

// Focus style: border
export const FocusStyleBorder = {
	args: {
		options: basicOptions,
		focusStyle: 'border',
		placeholder: 'フォーカス時にボーダー表示'
	}
};

// Focus style: none
export const FocusStyleNone = {
	args: {
		options: basicOptions,
		focusStyle: 'none',
		placeholder: 'フォーカススタイルなし'
	}
};

// Disabled
export const Disabled = {
	args: {
		options: basicOptions,
		disabled: true,
		placeholder: '無効な状態'
	}
};

// Readonly
export const ReadOnly = {
	args: {
		options: basicOptions,
		readonly: true,
		placeholder: '読み取り専用'
	}
};

// Required
export const Required = {
	args: {
		options: basicOptions,
		required: true,
		placeholder: '必須項目'
	}
};

// With custom style
export const WithCustomStyle = {
	args: {
		options: basicOptions,
		customStyle: 'font-weight: bold; color: #007bff;',
		placeholder: 'カスタムスタイル'
	}
};

// Multiple size
export const MultipleSize = {
	args: {
		options: basicOptions,
		size: 3,
		placeholder: '複数選択可能'
	}
};

// Playground (全props操作用)
export const Playground = {
	args: {
		value: '',
		options: basicOptions,
		theme: 'light',
		focusStyle: 'background',
		placeholder: 'Playground',
		fullWidth: false,
		rounded: false,
		disabled: false,
		readonly: false,
		required: false,
		customStyle: '',
		size: 1
	},
	render: (args: Record<string, unknown>) => ({
		Component: Select,
		props: {
			...args,
			onchange: (value: string | number | undefined) => {
				console.log('onChange:', value);
			}
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

// フルWidth
export const FullWidthCountry = {
	render: () => ({
		Component: Select,
		props: {
			options: countryOptions,
			placeholder: '幅100%のセレクト',
			fullWidth: true
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
	render: (args: Record<string, unknown>) => ({
		Component: Select,
		props: {
			...args,
			onchange: (value: string | number | undefined) => {
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
