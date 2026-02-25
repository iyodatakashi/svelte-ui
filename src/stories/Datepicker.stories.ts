import type { Meta, StoryObj } from '@storybook/sveltekit';
import type { IconWeight } from '../lib/types/icon';
import Datepicker from '../lib/components/Datepicker.svelte';

// 型安全性のための明示的な型定義
interface DatepickerArgs {
	value: Date | { start: Date; end: Date } | undefined;
	inline?: boolean;
	format?: string;
	placeholder?: string;
	mode?: 'single' | 'range';
	hasIcon?: boolean;
	disabled?: boolean;
	focusStyle?: 'background' | 'outline' | 'none';
	enableTextInput?: boolean;
	fullWidth?: boolean;
	iconWeight?: IconWeight;
	width?: string | number | null;
	minWidth?: string | number | null;
	maxWidth?: string | number | null;
	rounded?: boolean;
	enableClickToOpen?: boolean;
	minDate?: Date;
	maxDate?: Date;
	locale?: 'en' | 'ja' | 'fr' | 'de' | 'es' | 'zh-cn';
	onchange?: () => void;
	// 新しいイベントハンドラ
	onfocus?: (event: FocusEvent) => void;
	onblur?: (event: FocusEvent) => void;
	onkeydown?: (event: KeyboardEvent) => void;
	onkeyup?: (event: KeyboardEvent) => void;
	onclick?: (event: MouseEvent) => void;
	onmousedown?: (event: MouseEvent) => void;
	onmouseup?: (event: MouseEvent) => void;
	onmouseenter?: (event: MouseEvent) => void;
	onmouseleave?: (event: MouseEvent) => void;
	onmouseover?: (event: MouseEvent) => void;
	onmouseout?: (event: MouseEvent) => void;
	oncontextmenu?: (event: MouseEvent) => void;
	onauxclick?: (event: MouseEvent) => void;
	ontouchstart?: (event: TouchEvent) => void;
	ontouchend?: (event: TouchEvent) => void;
	ontouchmove?: (event: TouchEvent) => void;
	ontouchcancel?: (event: TouchEvent) => void;
	onpointerdown?: (event: PointerEvent) => void;
	onpointerup?: (event: PointerEvent) => void;
	onpointerenter?: (event: PointerEvent) => void;
	onpointerleave?: (event: PointerEvent) => void;
	onpointermove?: (event: PointerEvent) => void;
	onpointercancel?: (event: PointerEvent) => void;
	oninput?: (value: string) => void;
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
			description: 'Selected date (single) or date range object'
		},
		inline: {
			control: 'boolean',
			description: 'Display calendar inline'
		},
		format: {
			control: 'text',
			description: 'Date format string (dayjs style)'
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder text to show when no date is selected'
		},
		mode: {
			control: 'radio',
			options: ['single', 'range'],
			description: 'Selection mode (single or range)'
		},
		hasIcon: {
			control: 'boolean',
			description: 'Show calendar icon'
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the datepicker is disabled'
		},
		focusStyle: {
			control: 'radio',
			options: ['background', 'outline', 'none'],
			description: 'Focus style (background, outline, or none)'
		},
		enableTextInput: {
			control: 'boolean',
			description: 'Allow direct text input in the field'
		},
		fullWidth: {
			control: 'boolean',
			description: 'Whether the control takes full width'
		},
		iconWeight: {
			control: 'select',
			options: [100, 200, 300, 400, 500, 600, 700],
			description: 'Icon weight (thickness of the calendar icon strokes)'
		},
		width: {
			control: 'text',
			description: 'Width (number in px or CSS length string, e.g. "320", "50%", "24rem")'
		},
		minWidth: {
			control: 'text',
			description: 'Minimum width (number in px or CSS length string, e.g. "200", "50%", "16rem")'
		},
		maxWidth: {
			control: 'text',
			description: 'Maximum width (number in px or CSS length string, e.g. "400", "80%", "32rem")'
		},
		rounded: {
			control: 'boolean',
			description: 'Use rounded corners'
		},
		enableClickToOpen: {
			control: 'boolean',
			description: 'Open calendar on click for selection'
		},
		minDate: {
			control: 'date',
			description: 'Minimum selectable date'
		},
		maxDate: {
			control: 'date',
			description: 'Maximum selectable date'
		},
		locale: {
			control: 'select',
			options: ['en', 'ja', 'fr', 'de', 'es', 'zh-cn'],
			description: 'Locale used for display'
		},
		onchange: {
			control: false,
			action: 'changed',
			description: 'Callback when the value changes'
		},
		// 新しいイベントハンドラのargTypes
		onfocus: {
			action: 'focused',
			description: 'Focus event'
		},
		onblur: {
			action: 'blurred',
			description: 'Blur event'
		},
		onkeydown: {
			action: 'keydown',
			description: 'Keydown event'
		},
		onkeyup: {
			action: 'keyup',
			description: 'Keyup event'
		},
		onclick: {
			action: 'clicked',
			description: 'Click event'
		},
		onmousedown: {
			action: 'mousedown',
			description: 'Mousedown event'
		},
		onmouseup: {
			action: 'mouseup',
			description: 'Mouseup event'
		},
		onmouseenter: {
			action: 'mouseenter',
			description: 'Mouseenter event'
		},
		onmouseleave: {
			action: 'mouseleave',
			description: 'Mouseleave event'
		},
		onmouseover: {
			action: 'mouseover',
			description: 'Mouseover event'
		},
		onmouseout: {
			action: 'mouseout',
			description: 'Mouseout event'
		},
		oncontextmenu: {
			action: 'contextmenu',
			description: 'Context menu event'
		},
		onauxclick: {
			action: 'auxclick',
			description: 'Auxiliary button click event'
		},
		ontouchstart: {
			action: 'touchstart',
			description: 'Touch start event'
		},
		ontouchend: {
			action: 'touchend',
			description: 'Touch end event'
		},
		ontouchmove: {
			action: 'touchmove',
			description: 'Touch move event'
		},
		ontouchcancel: {
			action: 'touchcancel',
			description: 'Touch cancel event'
		},
		onpointerdown: {
			action: 'pointerdown',
			description: 'Pointer down event'
		},
		onpointerup: {
			action: 'pointerup',
			description: 'Pointer up event'
		},
		onpointerenter: {
			action: 'pointerenter',
			description: 'Pointer enter event'
		},
		onpointerleave: {
			action: 'pointerleave',
			description: 'Pointer leave event'
		},
		onpointermove: {
			action: 'pointermove',
			description: 'Pointer move event'
		},
		onpointercancel: {
			action: 'pointercancel',
			description: 'Pointer cancel event'
		},
		oninput: {
			action: 'input',
			description: 'Input event'
		}
	}
};

export default meta;
type Story = StoryObj<DatepickerArgs>;

// Default（基本の単一日付選択）
export const Default: Story = {
	args: {
		// Use component defaults: single mode, locale from config, default format/placeholder
		value: undefined
	}
};

// Date Range（日付範囲選択）
export const DateRange: Story = {
	args: {
		value: undefined,
		mode: 'range'
	}
};

// With Icon（アイコン付き）
export const WithIcon: Story = {
	args: {
		value: undefined,
		hasIcon: true
	}
};

// With Icon and Date Range（アイコン付き日付範囲選択）
export const WithIconAndDateRange: Story = {
	args: {
		value: undefined,
		mode: 'range',
		hasIcon: true
	}
};

// Inline
export const Inline: Story = {
	args: {
		value: new Date(),
		inline: true
	},
	parameters: {
		layout: 'padded'
	}
};

// Custom Format（カスタム日付フォーマット）
export const CustomFormat: Story = {
	args: {
		value: new Date(),
		format: 'MM/DD/YYYY',
		hasIcon: true
	}
};

// Disabled State（無効状態）
export const Disabled: Story = {
	args: {
		value: new Date(),
		hasIcon: true,
		disabled: true
	}
};

// With Min/Max Date（最小/最大日付制限）
export const WithMinMaxDate: Story = {
	args: {
		hasIcon: true,
		minDate: new Date(2024, 0, 1),
		maxDate: new Date(2024, 11, 31)
	}
};

// Allow Direct Input（直接入力を許可）
export const AllowDirectInput: Story = {
	args: {
		enableTextInput: true,
		hasIcon: true
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
		fullWidth: true,
		hasIcon: true
	},
	parameters: {
		layout: 'padded'
	}
};

// Rounded Style（角丸スタイル）
export const RoundedStyle: Story = {
	args: {
		hasIcon: true,
		rounded: true
	}
};
