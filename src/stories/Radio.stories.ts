import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import Radio from '../lib/components/Radio.svelte';

// 型安全性のための明示的な型定義
interface RadioArgs {
	name: string;
	value: string | number | boolean;
	currentValue: string | number | boolean | null;
	disabled?: boolean;
	required?: boolean;
	readonly?: boolean;
	error?: string | null;
	success?: string | null;
	size?: 'small' | 'medium' | 'large';
	reducedMotion?: boolean;
	children?: Snippet;
	onfocus?: (event: FocusEvent) => void;
	onblur?: (event: FocusEvent) => void;
	onchange?: (value: string | number | boolean | null | undefined) => void;
	// 新しいイベントハンドラ
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
}

const meta: Meta<RadioArgs> = {
	title: 'Forms/Radio',
	component: Radio,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A customizable radio button component with accessibility features, error/success states, and size variants.'
			}
		}
	},
	tags: ['autodocs'],
	// Enable reactive updates for bindable props
	render: (args) => ({
		Component: Radio,
		props: args
	}),
	argTypes: {
		name: {
			control: { type: 'text' },
			description: 'グループ名'
		},
		value: {
			control: { type: 'text' },
			description: '選択肢の値'
		},
		currentValue: {
			control: { type: 'text' },
			description: '現在の選択値'
		},
		disabled: {
			control: { type: 'boolean' },
			description: '無効状態'
		},
		required: {
			control: { type: 'boolean' },
			description: '必須項目'
		},
		size: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large'],
			description: 'サイズ'
		},
		reducedMotion: {
			control: { type: 'boolean' },
			description: 'アニメーション無効化'
		},
		// 新しいイベントハンドラのargTypes
		onfocus: {
			action: 'focused',
			description: 'フォーカスイベント'
		},
		onblur: {
			action: 'blurred',
			description: 'ブラーイベント'
		},
		onkeydown: {
			action: 'keydown',
			description: 'キーダウンイベント'
		},
		onkeyup: {
			action: 'keyup',
			description: 'キーアップイベント'
		},
		onclick: {
			action: 'clicked',
			description: 'クリックイベント'
		},
		onmousedown: {
			action: 'mousedown',
			description: 'マウスダウンイベント'
		},
		onmouseup: {
			action: 'mouseup',
			description: 'マウスアップイベント'
		},
		onmouseenter: {
			action: 'mouseenter',
			description: 'マウスエンターイベント'
		},
		onmouseleave: {
			action: 'mouseleave',
			description: 'マウスリーブイベント'
		},
		onmouseover: {
			action: 'mouseover',
			description: 'マウスオーバーイベント'
		},
		onmouseout: {
			action: 'mouseout',
			description: 'マウスアウトイベント'
		},
		oncontextmenu: {
			action: 'contextmenu',
			description: 'コンテキストメニューイベント'
		},
		onauxclick: {
			action: 'auxclick',
			description: '補助ボタンクリックイベント'
		},
		ontouchstart: {
			action: 'touchstart',
			description: 'タッチ開始イベント'
		},
		ontouchend: {
			action: 'touchend',
			description: 'タッチ終了イベント'
		},
		ontouchmove: {
			action: 'touchmove',
			description: 'タッチ移動イベント'
		},
		ontouchcancel: {
			action: 'touchcancel',
			description: 'タッチキャンセルイベント'
		},
		onpointerdown: {
			action: 'pointerdown',
			description: 'ポインターダウンイベント'
		},
		onpointerup: {
			action: 'pointerup',
			description: 'ポインターアップイベント'
		},
		onpointerenter: {
			action: 'pointerenter',
			description: 'ポインターエンターイベント'
		},
		onpointerleave: {
			action: 'pointerleave',
			description: 'ポインターリーブイベント'
		},
		onpointermove: {
			action: 'pointermove',
			description: 'ポインター移動イベント'
		},
		onpointercancel: {
			action: 'pointercancel',
			description: 'ポインターキャンセルイベント'
		},
		onchange: {
			action: 'changed',
			description: '変更イベント'
		}
	}
};

export default meta;
type Story = StoryObj<RadioArgs>;

// Helper function to create snippet for children
const createChildrenSnippet = (text: string) =>
	createRawSnippet(() => ({
		render: () => text
	}));

// Default (unchecked)
export const Default: Story = {
	args: {
		name: 'default-group',
		value: 'option1',
		currentValue: null,
		children: createChildrenSnippet('Option 1')
	}
};

// Checked
export const Checked: Story = {
	args: {
		name: 'checked-group',
		value: 'option1',
		currentValue: 'option1',
		children: createChildrenSnippet('Checked')
	}
};

// Size variants
export const Small: Story = {
	args: {
		name: 'size-group',
		value: 'small',
		currentValue: null,
		size: 'small',
		children: createChildrenSnippet('Small')
	}
};
export const Large: Story = {
	args: {
		name: 'size-group',
		value: 'large',
		currentValue: null,
		size: 'large',
		children: createChildrenSnippet('Large')
	}
};

// Disabled
export const Disabled: Story = {
	args: {
		name: 'disabled-group',
		value: 'option1',
		currentValue: null,
		disabled: true,
		children: createChildrenSnippet('Disabled')
	}
};

// Readonly
export const ReadOnly: Story = {
	args: {
		name: 'readonly-group',
		value: 'option1',
		currentValue: 'option1',
		readonly: true,
		children: createChildrenSnippet('Readonly')
	}
};

// Reduced motion
export const ReducedMotion: Story = {
	args: {
		name: 'motion-group',
		value: 'option1',
		currentValue: null,
		reducedMotion: true,
		children: createChildrenSnippet('Reduced motion')
	}
};

// String value
export const StringValue: Story = {
	args: {
		name: 'string-values',
		value: 'medium',
		currentValue: 'medium',
		children: createChildrenSnippet('String value')
	}
};
// Number value
export const NumberValue: Story = {
	args: {
		name: 'number-values',
		value: 5,
		currentValue: 5,
		children: createChildrenSnippet('Number value')
	}
};
// Boolean value
export const BooleanValue: Story = {
	args: {
		name: 'boolean-values',
		value: true,
		currentValue: true,
		children: createChildrenSnippet('Boolean value')
	}
};

// Playground (全props操作用)
export const Playground: Story = {
	args: {
		name: 'playground',
		value: 'test-value',
		currentValue: null,
		disabled: false,
		required: false,
		readonly: false,
		size: 'medium',
		reducedMotion: false
		// children は除外してコントロールの問題を回避
	},
	render: (args) => ({
		Component: Radio,
		props: {
			...args,
			children: createChildrenSnippet('Customizable radio')
		}
	})
};
