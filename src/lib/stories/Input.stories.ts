// src/lib/components/atoms/Input.stories.ts
import Input from '../components/Input.svelte';

const meta = {
	title: 'Forms/Input',
	component: Input,
	parameters: {
		layout: 'centered',
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
			options: ['text', 'password', 'number'],
			description: '入力タイプ'
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
		}
	}
};

export default meta;

// 基本パターン
export const Default = {
	args: {
		value: '',
		placeholder: 'テキストを入力してください',
		clearable: false
	},
	render: (args: any) => ({
		Component: Input,
		props: {
			...args,
			onchange: (value: any) => console.log('Changed:', value),
			oninput: (value: any) => console.log('Input:', value)
		}
	})
};

// デフォルトバリアント
export const DefaultInput = {
	render: () => ({
		Component: Input,
		props: {
			placeholder: '標準の入力フィールド'
		}
	})
};

// 角丸
export const Rounded = {
	render: () => ({
		Component: Input,
		props: {
			placeholder: '角丸の入力フィールド',
			rounded: true
		}
	})
};

// フルWidth
export const FullWidth = {
	render: () => ({
		Component: Input,
		props: {
			placeholder: '幅100%の入力フィールド',
			fullWidth: true
		}
	})
};

// クリアボタンなし
export const NoClearButton = {
	render: () => ({
		Component: Input,
		props: {
			placeholder: 'クリアボタンなし',
			clearable: false
		}
	})
};

// パスワード入力
export const Password = {
	args: {
		type: 'password',
		placeholder: 'パスワードを入力',
		value: ''
	},
	render: (args: any) => ({
		Component: Input,
		props: args
	})
};

// 数値入力
export const Number = {
	args: {
		type: 'number',
		placeholder: '数値を入力',
		value: 1000,
		min: 0,
		max: 999999,
		step: 1
	},
	render: (args: any) => ({
		Component: Input,
		props: args
	})
};

// インラインバリアント
export const Inline = {
	render: () => ({
		Component: Input,
		props: {
			variant: 'inline',
			value: 'インライン表示のテキスト',
			placeholder: 'クリックして編集'
		}
	})
};

// インライン数値
export const InlineNumber = {
	render: () => ({
		Component: Input,
		props: {
			variant: 'inline',
			type: 'number',
			value: 2500
		}
	})
};

// Background Focus
export const BackgroundFocus = {
	render: () => ({
		Component: Input,
		props: {
			placeholder: 'フォーカス時に背景色変更',
			focusStyle: 'background'
		}
	})
};

// Border Focus
export const BorderFocus = {
	render: () => ({
		Component: Input,
		props: {
			placeholder: 'フォーカス時にボーダー表示',
			focusStyle: 'border'
		}
	})
};

// No Focus Style
export const NoFocusStyle = {
	render: () => ({
		Component: Input,
		props: {
			placeholder: 'フォーカススタイルなし',
			focusStyle: 'none'
		}
	})
};

// 通常状態
export const Normal = {
	render: () => ({
		Component: Input,
		props: {
			placeholder: '通常の状態',
			value: '編集可能'
		}
	})
};

// 無効状態
export const Disabled = {
	render: () => ({
		Component: Input,
		props: {
			placeholder: '無効な状態',
			value: '編集不可',
			disabled: true
		}
	})
};

// 読み取り専用
export const ReadOnly = {
	render: () => ({
		Component: Input,
		props: {
			placeholder: '読み取り専用',
			value: '表示のみ',
			readonly: true
		}
	})
};

// 必須項目
export const Required = {
	render: () => ({
		Component: Input,
		props: {
			placeholder: '必須項目',
			required: true
		}
	})
};

// ダークテーマ
export const DarkTheme = {
	render: () => ({
		Component: Input,
		props: {
			theme: 'dark',
			placeholder: 'ダークテーマの入力'
		}
	})
};

// 基本的なフォーム要素
export const FormName = {
	render: () => ({
		Component: Input,
		props: {
			placeholder: '山田太郎',
			required: true,
			fullWidth: true
		}
	})
};

// メールアドレス
export const FormEmail = {
	render: () => ({
		Component: Input,
		props: {
			type: 'text',
			placeholder: 'example@email.com',
			fullWidth: true
		}
	})
};

// パスワードフォーム
export const FormPassword = {
	render: () => ({
		Component: Input,
		props: {
			type: 'password',
			placeholder: 'パスワードを入力',
			fullWidth: true
		}
	})
};

// 年齢入力
export const FormAge = {
	render: () => ({
		Component: Input,
		props: {
			type: 'number',
			min: 0,
			max: 120,
			placeholder: '25'
		}
	})
};

// イベントハンドラーのデモ
export const WithEvents = {
	args: {
		placeholder: 'イベントを確認（コンソールをチェック）',
		value: ''
	},
	render: (args: any) => ({
		Component: Input,
		props: {
			...args,
			onchange: (value: any) => {
				console.log('onChange:', value);
			},
			oninput: (value: any) => {
				console.log('onInput:', value);
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

// 最小・最大幅
export const WithWidthLimits = {
	render: () => ({
		Component: Input,
		props: {
			placeholder: '幅制限あり',
			minWidth: 200,
			maxWidth: 300
		}
	})
};

// カスタムスタイル
export const WithCustomStyle = {
	render: () => ({
		Component: Input,
		props: {
			placeholder: 'カスタムスタイル',
			customStyle: 'font-weight: bold; color: #007bff;'
		}
	})
};
