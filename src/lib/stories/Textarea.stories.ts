// src/lib/stories/atoms/Textarea.stories.ts
import Textarea from '../components/Textarea.svelte';

const meta = {
	title: 'Forms/Textarea',
	component: Textarea,
	parameters: {
		layout: 'fullscreen',
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

// 基本パターン
export const Default = {
	args: {
		value: '',
		placeholder: '複数行のテキストを入力してください',
		rows: 3,
		autoResize: true
	},
	render: (args: any) => ({
		Component: Textarea,
		props: {
			...args,
			onchange: (value: any) => console.log('Changed:', value),
			oninput: (value: any) => console.log('Input:', value)
		}
	})
};

// 自動リサイズのデモ
export const AutoResize = {
	render: () => ({
		Component: Textarea,
		props: {
			value:
				'この文章は自動的に高さが調整されます。\n改行を入れると高さが変わることを確認できます。\n\n複数行に渡って長いテキストを入力すると、テキストエリアの高さが自動的に調整されます。',
			placeholder: '文章を入力すると高さが自動調整されます',
			autoResize: true,
			minHeight: 60
		}
	})
};

// パスワード入力
export const Password = {
	render: () => ({
		Component: Textarea,
		props: {
			placeholder: 'パスワードやシークレット情報',
			rows: 2
		}
	})
};

// 数値入力
export const Number = {
	render: () => ({
		Component: Textarea,
		props: {
			placeholder: '数値データや計算結果',
			rows: 4,
			value: '1000\n2000\n3000\n合計: 6000'
		}
	})
};

// インラインバリアント
export const Inline = {
	render: () => ({
		Component: Textarea,
		props: {
			variant: 'inline',
			value: 'インライン編集可能なテキスト\n複数行対応',
			placeholder: 'クリックして編集'
		}
	})
};

// フォーカススタイル
export const FocusStyles = {
	render: () => ({
		Component: Textarea,
		props: {
			placeholder: 'フォーカス時に背景色変更',
			focusStyle: 'background'
		}
	})
};

// 状態バリエーション
export const States = {
	render: () => ({
		Component: Textarea,
		props: {
			placeholder: '通常の状態',
			value: '編集可能なテキスト\n複数行'
		}
	})
};

// ダークテーマ
export const DarkTheme = {
	render: () => ({
		Component: Textarea,
		props: {
			theme: 'dark',
			placeholder: 'ダークテーマのテキストエリア',
			value: 'ダークモード\n複数行テキスト'
		}
	})
};

// 角丸
export const Rounded = {
	render: () => ({
		Component: Textarea,
		props: {
			placeholder: '角丸デザインのテキストエリア',
			rounded: true,
			rows: 4
		}
	})
};

// フルWidth
export const FullWidth = {
	render: () => ({
		Component: Textarea,
		props: {
			placeholder: '幅100%のテキストエリア',
			fullWidth: true,
			rows: 3
		}
	})
};

// クリアボタン付き
export const WithClearButton = {
	render: () => ({
		Component: Textarea,
		props: {
			placeholder: 'クリアボタン付き',
			clearable: true,
			value: 'このテキストをクリアできます\n複数行対応'
		}
	})
};

// 読み取り専用
export const ReadOnly = {
	render: () => ({
		Component: Textarea,
		props: {
			value: '読み取り専用のテキスト\n編集できません',
			readonly: true
		}
	})
};

// 無効状態
export const Disabled = {
	render: () => ({
		Component: Textarea,
		props: {
			value: '無効状態のテキスト\n操作できません',
			disabled: true
		}
	})
};

// リサイズ可能
export const Resizable = {
	render: () => ({
		Component: Textarea,
		props: {
			placeholder: 'ユーザーがリサイズできます（右下をドラッグ）',
			autoResize: false,
			resizable: true,
			rows: 4
		}
	})
};

// 文字数制限
export const WithMaxLength = {
	render: () => ({
		Component: Textarea,
		props: {
			placeholder: '最大100文字まで入力可能',
			maxlength: 100,
			value: '文字数制限のテスト'
		}
	})
};

// 高さ制限
export const WithMinHeight = {
	render: () => ({
		Component: Textarea,
		props: {
			placeholder: '最小高さ120px',
			minHeight: 120,
			autoResize: true
		}
	})
};

// イベントハンドラー
export const WithEvents = {
	render: () => ({
		Component: Textarea,
		props: {
			placeholder: 'イベントを確認（コンソールをチェック）',
			onchange: (value: any) => console.log('onChange:', value),
			oninput: (value: any) => console.log('onInput:', value),
			onfocus: () => console.log('フォーカスされました'),
			onblur: () => console.log('フォーカスが外れました'),
			onclick: () => console.log('クリックされました'),
			onkeydown: (event: any) => console.log('キーが押されました:', event?.key)
		}
	})
};
