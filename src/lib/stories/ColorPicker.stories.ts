// src/lib/components/atoms/ColorPicker.stories.ts
import ColorPicker from '../components/ColorPicker.svelte';

const meta = {
	title: 'Forms/ColorPicker',
	component: ColorPicker,
	parameters: {
		layout: 'centered',
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
		customStyle: {
			control: { type: 'text' },
			description: 'カスタムスタイル'
		}
	}
};

export default meta;

// 基本パターン
export const Default = {
	args: {
		value: '#3498db',
		clearable: false
	},
	render: (args: any) => ({
		Component: ColorPicker,
		props: {
			...args,
			onchange: () => console.log('Color changed:', args.value),
			onfocus: () => console.log('フォーカスされました'),
			onblur: () => console.log('フォーカスが外れました')
		}
	})
};

// 基本的なカラーピッカー
export const BasicColorPicker = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#e74c3c'
		}
	})
};

// 角丸デザイン
export const Rounded = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#1abc9c',
			rounded: true
		}
	})
};

// フルWidth
export const FullWidth = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#34495e',
			fullWidth: true
		}
	})
};

// クリアボタンなし
export const NoClearButton = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#e67e22',
			clearable: false
		}
	})
};

// Background Focus
export const BackgroundFocus = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#8e44ad',
			focusStyle: 'background'
		}
	})
};

// Border Focus
export const BorderFocus = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#c0392b',
			focusStyle: 'border'
		}
	})
};

// No Focus Style
export const NoFocusStyle = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#27ae60',
			focusStyle: 'none'
		}
	})
};

// 無効状態
export const Disabled = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#95a5a6',
			disabled: true
		}
	})
};

// ダークテーマ
export const DarkTheme = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#f1c40f',
			theme: 'dark'
		}
	})
};

// ダークテーマ + 角丸
export const DarkThemeRounded = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#e74c3c',
			theme: 'dark',
			rounded: true
		}
	})
};

// 透明色
export const TransparentColor = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#ffffff00'
		}
	})
};

// 黒色
export const BlackColor = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#000000'
		}
	})
};

// 白色
export const WhiteColor = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#ffffff'
		}
	})
};

// グレー系の色
export const GrayColor = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#7f8c8d'
		}
	})
};

// 明るい色
export const BrightColors = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#ff6b6b'
		}
	})
};

// パステルカラー
export const PastelColor = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#ffeaa7'
		}
	})
};

// カスタムスタイル
export const WithCustomStyle = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#6c5ce7',
			customStyle: 'border: 2px solid #ddd; padding: 8px; border-radius: 8px;'
		}
	})
};

// 空の値
export const EmptyValue = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: ''
		}
	})
};

// プリセットカラーパレット風
export const ColorPalette = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#3742fa'
		}
	})
};

// フォーム統合例
export const FormIntegration = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#2f3542',
			fullWidth: true,
			rounded: true
		}
	})
};

// 複数サイズの比較
export const SizeComparison = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#5f27cd'
		}
	})
};

// テーマカラー選択例
export const ThemeColorSelector = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#0984e3',
			rounded: true
		}
	})
};

// ブランドカラー設定例
export const BrandColorSetting = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#00b894',
			fullWidth: true
		}
	})
};

// アクセントカラー選択
export const AccentColorPicker = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#fd79a8',
			clearable: false
		}
	})
};

// UIカラー設定
export const UIColorSetting = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#636e72',
			rounded: true,
			fullWidth: true
		}
	})
};

// イベントハンドラーのデモ
export const WithEvents = {
	args: {
		value: '#a29bfe'
	},
	render: (args: any) => ({
		Component: ColorPicker,
		props: {
			...args,
			onchange: () => {
				console.log('Color changed:', args.value);
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

// レスポンシブデザイン確認
export const ResponsiveTest = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#74b9ff',
			fullWidth: true
		}
	})
};

// 色の妥当性テスト
export const ColorValidityTest = {
	render: () => ({
		Component: ColorPicker,
		props: {
			value: '#invalid'
		}
	})
};
