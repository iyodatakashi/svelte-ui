import type { Meta, StoryObj } from '@storybook/sveltekit';
import Datepicker from '../components/Datepicker.svelte';

// 型安全性のための明示的な型定義
interface DatepickerArgs {
	value: Date | { start: Date; end: Date } | undefined;
	variant?: 'default' | 'inline';
	format?: string;
	nullString?: string;
	isDateRange?: boolean;
	showCalendarIcon?: boolean;
	showPopupIcon?: boolean;
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
		showCalendarIcon: {
			control: 'boolean',
			description: 'カレンダーアイコンを表示'
		},
		showPopupIcon: {
			control: 'boolean',
			description: 'ドロップダウンアイコンを表示'
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
		showCalendarIcon: false,
		showPopupIcon: false,
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
		showCalendarIcon: false,
		showPopupIcon: false,
		disabled: false,
		openIfClicked: true
	}
};

// With Calendar Icon（カレンダーアイコン付き）
export const WithCalendarIcon: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D（ddd）',
		nullString: '日付を選択',
		isDateRange: false,
		showCalendarIcon: true,
		showPopupIcon: false,
		disabled: false,
		openIfClicked: true
	}
};

// With Popup Icon（ドロップダウンアイコン付き）
export const WithPopupIcon: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D（ddd）',
		nullString: '日付を選択',
		isDateRange: false,
		showCalendarIcon: false,
		showPopupIcon: true,
		disabled: false,
		openIfClicked: true
	}
};

// With Both Icons（両方のアイコン付き）
export const WithBothIcons: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D（ddd）',
		nullString: '日付を選択',
		isDateRange: false,
		showCalendarIcon: true,
		showPopupIcon: true,
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
		showCalendarIcon: false,
		showPopupIcon: false,
		disabled: false,
		openIfClicked: true
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
		showCalendarIcon: true,
		showPopupIcon: false,
		disabled: false,
		openIfClicked: true
	}
};

// Japanese Format（和暦フォーマット）
export const JapaneseFormat: Story = {
	args: {
		value: new Date(),
		variant: 'default',
		format: 'YYYY年MM月DD日（dddd）',
		nullString: '日付未選択',
		isDateRange: false,
		showCalendarIcon: true,
		showPopupIcon: true,
		disabled: false,
		openIfClicked: true,
		locale: 'ja'
	}
};

// English Locale（英語表示）
export const EnglishLocale: Story = {
	args: {
		value: new Date(),
		variant: 'default',
		nullString: 'Select a date',
		isDateRange: false,
		showCalendarIcon: true,
		showPopupIcon: true,
		disabled: false,
		openIfClicked: true,
		locale: 'en'
	}
};

// Korean Locale（韓国語表示）
export const KoreanLocale: Story = {
	args: {
		value: new Date(),
		variant: 'default',
		nullString: '날짜를 선택하세요',
		isDateRange: false,
		showCalendarIcon: true,
		showPopupIcon: true,
		disabled: false,
		openIfClicked: true,
		locale: 'ko'
	}
};

// Chinese Locale（中国語表示）
export const ChineseLocale: Story = {
	args: {
		value: new Date(),
		variant: 'default',
		nullString: '请选择日期',
		isDateRange: false,
		showCalendarIcon: true,
		showPopupIcon: true,
		disabled: false,
		openIfClicked: true,
		locale: 'zh-cn'
	}
};

// With Min Max Date（日付制限付き）
export const WithMinMaxDate: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D（ddd）',
		nullString: '今月の日付を選択',
		isDateRange: false,
		showCalendarIcon: true,
		showPopupIcon: false,
		disabled: false,
		openIfClicked: true,
		minDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
		maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
	}
};

// Date Range with Constraints（制限付き日付範囲）
export const DateRangeWithConstraints: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D',
		nullString: '今週の期間を選択',
		isDateRange: true,
		showCalendarIcon: true,
		showPopupIcon: true,
		disabled: false,
		openIfClicked: true,
		minDate: new Date(),
		maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30日後まで
	}
};

// Disabled（無効状態）
export const Disabled: Story = {
	args: {
		value: new Date(),
		variant: 'default',
		format: 'YYYY/M/D（ddd）',
		nullString: '',
		isDateRange: false,
		showCalendarIcon: true,
		showPopupIcon: false,
		disabled: true,
		openIfClicked: true
	}
};

// No Click to Open（クリックで開かない）
export const NoClickToOpen: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D（ddd）',
		nullString: 'プログラムから制御',
		isDateRange: false,
		showCalendarIcon: false,
		showPopupIcon: false,
		disabled: false,
		openIfClicked: false
	}
};

// Pre-selected Date（事前選択済み）
export const PreselectedDate: Story = {
	args: {
		value: new Date(),
		variant: 'default',
		format: 'YYYY/M/D（ddd）',
		nullString: '',
		isDateRange: false,
		showCalendarIcon: false,
		showPopupIcon: true,
		disabled: false,
		openIfClicked: true
	}
};

// Pre-selected Date Range（事前選択済み範囲）
export const PreselectedDateRange: Story = {
	args: {
		value: {
			start: new Date(),
			end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7日後
		},
		variant: 'default',
		format: 'M/D',
		nullString: '',
		isDateRange: true,
		showCalendarIcon: true,
		showPopupIcon: false,
		disabled: false,
		openIfClicked: true
	}
};

// Playground（全プロパティ操作用）
export const Playground: Story = {
	args: {
		value: undefined,
		variant: 'default',
		format: 'YYYY/M/D（ddd）',
		nullString: '日付を選択してください',
		isDateRange: false,
		showCalendarIcon: false,
		showPopupIcon: false,
		disabled: false,
		openIfClicked: true,
		minDate: undefined,
		maxDate: undefined,
		locale: 'ja'
	}
};
