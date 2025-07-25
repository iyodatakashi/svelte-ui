import type { Meta, StoryObj } from '@storybook/sveltekit';
import Datepicker from '../components/Datepicker.svelte';

// 型安全性のための明示的な型定義
interface DatepickerArgs {
	value: Date | { start: Date; end: Date } | undefined;
	variant?: 'default' | 'inline';
	format?: string;
	nullString?: string;
	mode?: 'single' | 'range';
	hasIcon?: boolean;
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
		layout: 'padded',
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
		mode: {
			control: 'select',
			options: ['single', 'range'],
			description: '日付選択モード（単一または範囲）'
		},
		hasIcon: {
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
		mode: 'single',
		hasIcon: true,
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
		mode: 'range',
		hasIcon: true,
		disabled: false,
		focusStyle: 'border',
		openIfClicked: true,
		locale: 'ja'
	}
};

// Inline Single（インライン単一日付選択）
export const InlineSingle: Story = {
	args: {
		value: new Date(),
		variant: 'inline',
		format: 'YYYY/M/D（ddd）',
		nullString: '',
		mode: 'single',
		hasIcon: false,
		disabled: false,
		focusStyle: 'border',
		openIfClicked: true,
		locale: 'ja'
	}
};

// Inline Range（インライン日付範囲選択）
export const InlineRange: Story = {
	args: {
		value: undefined,
		variant: 'inline',
		format: 'YYYY/M/D',
		nullString: '',
		mode: 'range',
		hasIcon: false,
		disabled: false,
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
		mode: 'single',
		hasIcon: true,
		disabled: false,
		focusStyle: 'border',
		openIfClicked: true,
		minDate: new Date(2024, 0, 1),
		maxDate: new Date(2024, 11, 31),
		locale: 'ja'
	}
};

// With Min/Max Date Range（最小/最大日付制限付き範囲選択）
export const WithMinMaxDateRange: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D',
		nullString: '期間を選択してください',
		mode: 'range',
		hasIcon: true,
		disabled: false,
		focusStyle: 'border',
		openIfClicked: true,
		minDate: new Date(2024, 0, 1),
		maxDate: new Date(2024, 11, 31),
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
		mode: 'single',
		hasIcon: true,
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

// Allow Direct Input Range（直接入力を許可した日付範囲選択）
export const AllowDirectInputRange: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D',
		nullString: '',
		mode: 'range',
		hasIcon: true,
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

// Playground（プレイグラウンド）
export const Playground: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D（ddd）',
		nullString: '日付を選択してください',
		mode: 'single',
		hasIcon: true,
		disabled: false,
		focusStyle: 'border',
		openIfClicked: true,
		locale: 'ja'
	}
};
