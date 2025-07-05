import type { Meta, StoryObj } from '@storybook/sveltekit';
import Datepicker from '../components/Datepicker.svelte';

// 型安全性のための明示的な型定義
interface DatepickerArgs {
	value: Date | { start: Date; end: Date } | undefined;
	variant?: 'default' | 'inline';
	format?: string;
	nullString?: string;
	isDateRange?: boolean;
	showIcon?: boolean;
	disabled?: boolean;
	focusStyle?: 'background' | 'border' | 'none';
	allowDirectInput?: boolean;
	fullWidth?: boolean;
	rounded?: boolean;
	openIfClicked?: boolean;
	minDate?: Date;
	maxDate?: Date;
	locale?: 'en' | 'ja' | 'fr' | 'de' | 'es' | 'zh-cn';
	onchange?: () => void;
}

const meta: Meta<DatepickerArgs> = {
	title: 'Forms/Datepicker',
	component: Datepicker,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'日付選択用のコンポーネント。単一日付選択と日付範囲選択の両方に対応し、カスタマイズ可能なフォーマットとアイコン表示を提供します。'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: false,
			description: '選択された日付（単一またはstartとendを持つオブジェクト）'
		},
		variant: {
			control: 'select',
			options: ['default', 'inline'],
			description: '表示バリアント'
		},
		format: {
			control: 'text',
			description: '日付のフォーマット（dayjs形式）'
		},
		nullString: {
			control: 'text',
			description: '未選択時に表示する文字列'
		},
		isDateRange: {
			control: 'boolean',
			description: '日付範囲選択モード'
		},
		showIcon: {
			control: 'boolean',
			description: 'カレンダーアイコンを表示'
		},
		disabled: {
			control: 'boolean',
			description: '無効状態'
		},
		focusStyle: {
			control: 'select',
			options: ['background', 'border', 'none'],
			description: 'フォーカス時の表示スタイル'
		},
		allowDirectInput: {
			control: 'boolean',
			description: '直接入力を許可するかどうか'
		},
		fullWidth: {
			control: 'boolean',
			description: '全幅表示'
		},
		rounded: {
			control: 'boolean',
			description: '角丸スタイル'
		},
		openIfClicked: {
			control: 'boolean',
			description: 'クリックでカレンダーを開く'
		},
		minDate: {
			control: 'date',
			description: '選択可能な最小日付'
		},
		maxDate: {
			control: 'date',
			description: '選択可能な最大日付'
		},
		locale: {
			control: 'select',
			options: ['en', 'ja', 'fr', 'de', 'es', 'zh-cn'],
			description: '表示言語'
		},
		onchange: {
			control: false,
			action: 'changed',
			description: '値変更時のコールバック'
		}
	}
};

export default meta;
type Story = StoryObj<DatepickerArgs>;

// Default（基本の単一日付選択）
export const Default: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D（ddd）',
		nullString: '日付を選択してください',
		isDateRange: false,
		showIcon: false,
		disabled: false,
		focusStyle: 'border',
		openIfClicked: true,
		locale: 'ja'
	}
};

// Date Range（日付範囲選択）
export const DateRange: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D',
		nullString: '期間を選択してください',
		isDateRange: true,
		showIcon: false,
		disabled: false,
		focusStyle: 'border',
		openIfClicked: true,
		locale: 'ja'
	}
};

// With Icon（アイコン付き）
export const WithIcon: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D（ddd）',
		nullString: '日付を選択',
		isDateRange: false,
		showIcon: true,
		disabled: false,
		focusStyle: 'border',
		openIfClicked: true,
		locale: 'ja'
	}
};

// With Icon and Date Range（アイコン付き日付範囲選択）
export const WithIconAndDateRange: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D',
		nullString: '期間を選択',
		isDateRange: true,
		showIcon: true,
		disabled: false,
		focusStyle: 'border',
		openIfClicked: true,
		locale: 'ja'
	}
};

// Inline Variant（インライン表示）
export const InlineVariant: Story = {
	args: {
		value: new Date(),
		variant: 'inline',
		format: 'YYYY/M/D（ddd）',
		nullString: '',
		isDateRange: false,
		showIcon: false,
		disabled: false,
		focusStyle: 'border',
		openIfClicked: true,
		locale: 'ja'
	},
	parameters: {
		layout: 'padded'
	}
};

// Custom Format（カスタム日付フォーマット）
export const CustomFormat: Story = {
	args: {
		value: new Date(),
		variant: 'default',
		format: 'MM/DD/YYYY',
		nullString: '日付を選択',
		isDateRange: false,
		showIcon: true,
		disabled: false,
		focusStyle: 'border',
		openIfClicked: true,
		locale: 'ja'
	}
};

// Disabled State（無効状態）
export const Disabled: Story = {
	args: {
		value: new Date(),
		variant: 'default',
		format: 'YYYY/M/D（ddd）',
		nullString: '日付を選択してください',
		isDateRange: false,
		showIcon: true,
		disabled: true,
		focusStyle: 'border',
		openIfClicked: true,
		locale: 'ja'
	}
};

// With Min/Max Date（最小/最大日付制限）
export const WithMinMaxDate: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D（ddd）',
		nullString: '日付を選択してください',
		isDateRange: false,
		showIcon: true,
		disabled: false,
		focusStyle: 'border',
		openIfClicked: true,
		minDate: new Date(2024, 0, 1),
		maxDate: new Date(2024, 11, 31),
		locale: 'ja'
	}
};

// English Locale（英語表示）
export const EnglishLocale: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'MMM D, YYYY',
		nullString: 'Select date',
		isDateRange: false,
		showIcon: true,
		disabled: false,
		focusStyle: 'border',
		openIfClicked: true,
		locale: 'en'
	}
};

// French Locale（フランス語表示）
export const FrenchLocale: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'D MMM YYYY',
		nullString: 'Sélectionnez une date',
		isDateRange: false,
		showIcon: true,
		disabled: false,
		focusStyle: 'border',
		openIfClicked: true,
		locale: 'fr'
	}
};

// German Locale（ドイツ語表示）
export const GermanLocale: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'D. MMM YYYY',
		nullString: 'Datum auswählen',
		isDateRange: false,
		showIcon: true,
		disabled: false,
		focusStyle: 'border',
		openIfClicked: true,
		locale: 'de'
	}
};

// Spanish Locale（スペイン語表示）
export const SpanishLocale: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'D [de] MMM [de] YYYY',
		nullString: 'Seleccionar fecha',
		isDateRange: false,
		showIcon: true,
		disabled: false,
		focusStyle: 'border',
		openIfClicked: true,
		locale: 'es'
	}
};

// Chinese Locale（中国語表示）
export const ChineseLocale: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY年M月D日',
		nullString: '请选择日期',
		isDateRange: false,
		showIcon: true,
		disabled: false,
		focusStyle: 'border',
		openIfClicked: true,
		locale: 'zh-cn'
	}
};

// Focus Style Variations（フォーカススタイルのバリエーション）
export const FocusStyleBorder: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D（ddd）',
		nullString: '日付を選択してください',
		isDateRange: false,
		showIcon: true,
		disabled: false,
		focusStyle: 'border',
		openIfClicked: true,
		locale: 'ja'
	}
};

export const FocusStyleBackground: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D（ddd）',
		nullString: '日付を選択してください',
		isDateRange: false,
		showIcon: true,
		disabled: false,
		focusStyle: 'background',
		openIfClicked: true,
		locale: 'ja'
	}
};

export const FocusStyleNone: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D（ddd）',
		nullString: '日付を選択してください',
		isDateRange: false,
		showIcon: true,
		disabled: false,
		focusStyle: 'none',
		openIfClicked: true,
		locale: 'ja'
	}
};

// Allow Direct Input（直接入力を許可）
export const AllowDirectInput: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D',
		nullString: '',
		isDateRange: false,
		showIcon: true,
		disabled: false,
		focusStyle: 'border',
		allowDirectInput: true,
		openIfClicked: true,
		locale: 'ja'
	},
	parameters: {
		docs: {
			description: {
				story: '直接入力を許可した場合、値がない時は placeholder のみが表示されます。'
			}
		}
	}
};

// Full Width（全幅表示）
export const FullWidth: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D（ddd）',
		nullString: '日付を選択してください',
		isDateRange: false,
		showIcon: true,
		disabled: false,
		focusStyle: 'border',
		fullWidth: true,
		openIfClicked: true,
		locale: 'ja'
	},
	parameters: {
		layout: 'padded'
	}
};

// Rounded Style（角丸スタイル）
export const RoundedStyle: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D（ddd）',
		nullString: '日付を選択してください',
		isDateRange: false,
		showIcon: true,
		disabled: false,
		focusStyle: 'border',
		rounded: true,
		openIfClicked: true,
		locale: 'ja'
	}
};

// Playground（プレイグラウンド）
export const Playground: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D（ddd）',
		nullString: '日付を選択してください',
		isDateRange: false,
		showIcon: true,
		disabled: false,
		focusStyle: 'border',
		openIfClicked: true,
		locale: 'ja'
	}
};
