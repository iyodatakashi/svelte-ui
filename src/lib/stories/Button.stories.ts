import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import Button from '../components/Button.svelte';

// 型安全性のための明示的な型定義
interface ButtonArgs {
	children: Snippet;
	type?: 'button' | 'submit' | 'reset';
	customStyle?: string;

	disabled?: boolean;
	loading?: boolean;
	tabindex?: number | null;
	iconFilled?: boolean;
	iconWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
	iconGrade?: number;
	iconOpticalSize?: number | null;
	iconVariant?: 'outlined' | 'filled' | 'rounded' | 'sharp';
	fullWidth?: boolean;
	minWidth?: number;
	popup?: boolean;
	rounded?: boolean;
	icon?: string;
	color?: string;
	variant?: 'filled' | 'outlined' | 'ghost' | 'glass';
	size?: 'small' | 'medium' | 'large';
	reducedMotion?: boolean;
	ariaLabel?: string;
	ariaDescribedby?: string;
	ariaExpanded?: boolean;
	onclick?: (event: MouseEvent) => void;
	// 新しいイベントハンドラ
	onfocus?: (event: FocusEvent) => void;
	onblur?: (event: FocusEvent) => void;
	onkeydown?: (event: KeyboardEvent) => void;
	onkeyup?: (event: KeyboardEvent) => void;
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

const meta: Meta<ButtonArgs> = {
	title: 'Forms/Button',
	component: Button,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A versatile button component with multiple variants, sizes, loading states, and accessibility features.'
			}
		}
	},
	tags: ['autodocs'],
	// Enable reactive updates for bindable props
	render: (args) => ({
		Component: Button,
		props: args
	}),
	argTypes: {
		type: {
			control: 'select',
			options: ['button', 'submit', 'reset'],
			description: 'HTML button type attribute'
		},
		variant: {
			control: 'select',
			options: ['filled', 'outlined', 'ghost', 'glass'],
			description: 'Visual style variant'
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
			description: 'Size variant of the button'
		},

		disabled: {
			control: 'boolean',
			description: 'Whether the button is disabled'
		},
		loading: {
			control: 'boolean',
			description: 'Whether the button shows loading state'
		},
		fullWidth: {
			control: 'boolean',
			description: 'Whether the button takes full width'
		},
		rounded: {
			control: 'boolean',
			description: 'Whether the button has rounded corners'
		},
		popup: {
			control: 'boolean',
			description: 'Whether the button shows popup indicator'
		},
		iconFilled: {
			control: 'boolean',
			description: 'Whether the icon should be filled'
		},
		reducedMotion: {
			control: 'boolean',
			description: 'Disable animations for reduced motion'
		},
		icon: {
			control: 'text',
			description: 'Icon name from Material Symbols'
		},
		color: {
			control: 'color',
			description: 'Button color'
		},
		customStyle: {
			control: 'text',
			description: 'Custom CSS styles'
		},
		minWidth: {
			control: 'number',
			description: 'Minimum width in pixels'
		},
		tabindex: {
			control: 'number',
			description: 'Tab index for focus order'
		},
		ariaLabel: {
			control: 'text',
			description: 'Accessible label for screen readers'
		},
		ariaDescribedby: {
			control: 'text',
			description: 'ID of element that describes the button'
		},
		ariaExpanded: {
			control: 'boolean',
			description: 'Whether the button controls an expanded element'
		},
		// Snippetはコントロールから除外
		children: {
			control: false,
			description: 'Button content/label'
		},
		// イベントハンドラもコントロールから除外
		onclick: {
			control: false,
			action: 'clicked'
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
		}
	}
};

export default meta;
type Story = StoryObj<ButtonArgs>;

// Helper function to create snippet for children
const createChildrenSnippet = (text: string) =>
	createRawSnippet(() => ({
		render: () => text
	}));

// Default (ghost variant, medium)
export const Default: Story = {
	args: {
		variant: 'ghost',
		size: 'medium',
		children: createChildrenSnippet('Default Button')
	}
};

// Filled variant
export const Filled: Story = {
	args: {
		variant: 'filled',
		size: 'medium',
		children: createChildrenSnippet('Filled Button')
	}
};

// Outlined variant
export const Outlined: Story = {
	args: {
		variant: 'outlined',
		size: 'medium',
		children: createChildrenSnippet('Outlined Button')
	}
};

// Size variants
export const Small: Story = {
	args: {
		variant: 'filled',
		size: 'small',
		children: createChildrenSnippet('Small Button')
	}
};
export const Large: Story = {
	args: {
		variant: 'filled',
		size: 'large',
		children: createChildrenSnippet('Large Button')
	}
};

// Disabled
export const Disabled: Story = {
	args: {
		variant: 'filled',
		disabled: true,
		children: createChildrenSnippet('Disabled Button')
	}
};

// Loading
export const Loading: Story = {
	args: {
		variant: 'filled',
		loading: true,
		children: createChildrenSnippet('Loading Button')
	}
};

// With icon
export const WithIcon: Story = {
	args: {
		variant: 'filled',
		icon: 'add',
		children: createChildrenSnippet('Add Item')
	}
};

// Custom color
export const CustomColor: Story = {
	args: {
		variant: 'filled',
		color: '#e91e63',
		children: createChildrenSnippet('Custom Color')
	}
};

// Full width
export const FullWidth: Story = {
	args: {
		variant: 'filled',
		fullWidth: true,
		children: createChildrenSnippet('Full Width Button')
	},
	parameters: {
		layout: 'padded'
	}
};

// Rounded
export const Rounded: Story = {
	args: {
		variant: 'filled',
		rounded: true,
		children: createChildrenSnippet('Rounded Button')
	}
};

// Popup
export const Popup: Story = {
	args: {
		variant: 'outlined',
		popup: true,
		ariaExpanded: false,
		children: createChildrenSnippet('Options')
	}
};

// Accessibility example
export const Accessible: Story = {
	args: {
		variant: 'filled',
		ariaLabel: 'Save document as PDF',
		icon: 'download',
		children: createChildrenSnippet('Download PDF')
	}
};

// Reduced motion
export const ReducedMotion: Story = {
	args: {
		variant: 'filled',
		reducedMotion: true,
		children: createChildrenSnippet('No Animation')
	}
};

// Playground (全props操作用)
export const Playground: Story = {
	args: {
		type: 'button',
		variant: 'filled',
		size: 'medium',

		disabled: false,
		loading: false,
		fullWidth: false,
		rounded: false,
		popup: false,
		iconFilled: false,
		reducedMotion: false,
		icon: '',
		color: 'var(--svelte-ui-primary-color)',
		customStyle: '',
		minWidth: 0,
		tabindex: null,
		ariaLabel: '',
		ariaDescribedby: '',
		ariaExpanded: false
		// children は除外してコントロールの問題を回避
	},
	render: (args) => ({
		Component: Button,
		props: {
			...args,
			children: createChildrenSnippet('Customizable Button')
		}
	})
};
