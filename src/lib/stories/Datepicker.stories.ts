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
	openIfClicked?: boolean;
	minDate?: Date;
	maxDate?: Date;
	locale?: 'ja' | 'en' | 'ko' | 'zh-cn';
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
			options: ['ja', 'en', 'ko', 'zh-cn'],
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
		openIfClicked: true
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
		openIfClicked: true
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
		openIfClicked: true
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
		openIfClicked: true
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
		nullString: 'Select date',
		isDateRange: false,
		showIcon: true,
		disabled: false,
		openIfClicked: true
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
		openIfClicked: true
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
		openIfClicked: true,
		minDate: new Date(2024, 0, 1),
		maxDate: new Date(2024, 11, 31)
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
		openIfClicked: true,
		locale: 'en'
	}
};

// Korean Locale（韓国語表示）
export const KoreanLocale: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY년 M월 D일',
		nullString: '날짜를 선택하세요',
		isDateRange: false,
		showIcon: true,
		disabled: false,
		openIfClicked: true,
		locale: 'ko'
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
		openIfClicked: true,
		locale: 'zh-cn'
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
		openIfClicked: true,
		locale: 'ja'
	}
};
