import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import IconButton from '../lib/components/IconButton.svelte';

// 型安全性のための明示的な型定義
interface IconButtonArgs {
	children: Snippet;
	type?: 'button' | 'submit' | 'reset' | null | undefined;
	size?: number;
	fontSize?: number;
	variant?: 'filled' | 'outlined' | 'ghost' | 'glass';
	color?: string;
	disabled?: boolean;
	loading?: boolean;
	tabindex?: number | null;
	iconFilled?: boolean;
	iconVariant?: 'outlined' | 'rounded' | 'sharp';
	iconWeight?: number;
	iconGrade?: number;
	iconOpticalSize?: number;
	customStyle?: string;
	rounded?: boolean;
	pressed?: boolean;
	hasBadge?: boolean;
	badgeCount?: number;
	badgeVariant?: 'dot' | 'count';
	badgeColor?: string;
	badgeMax?: number;
	reducedMotion?: boolean;
	ariaLabel: string;
	ariaDescribedby?: string;
	ariaPressed?: boolean;
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

const meta: Meta<IconButtonArgs> = {
	title: 'UI/IconButton',
	component: IconButton,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A versatile icon button component with badges, loading states, and accessibility features.'
			}
		}
	},
	tags: ['autodocs'],
	// Enable reactive updates for bindable props
	render: (args) => ({
		Component: IconButton,
		props: args
	}),
	argTypes: {
		type: {
			control: 'radio',
			options: ['button', 'submit', 'reset'],
			description: 'HTML button type attribute'
		},
		variant: {
			control: 'radio',
			options: ['filled', 'outlined', 'ghost', 'glass'],
			description: 'Visual style variant'
		},
		size: {
			control: 'number',
			description: 'Size of the button in pixels'
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the button is disabled'
		},
		loading: {
			control: 'boolean',
			description: 'Whether the button shows loading state'
		},
		rounded: {
			control: 'boolean',
			description: 'Whether the button is circular (true) or rounded rectangle (false)'
		},
		pressed: {
			control: 'boolean',
			description: 'Whether the button appears pressed (for toggle buttons)'
		},
		iconFilled: {
			control: 'boolean',
			description: 'Whether the icon should be filled'
		},
		iconVariant: {
			control: 'radio',
			options: ['outlined', 'rounded', 'sharp'],
			description: 'Icon variant style'
		},
		iconWeight: {
			control: 'select',
			options: [100, 200, 300, 400, 500, 600, 700],
			description: 'Icon weight'
		},
		iconGrade: {
			control: 'number',
			description: 'Icon grade'
		},
		iconOpticalSize: {
			control: 'number',
			description: 'Icon optical size'
		},
		hasBadge: {
			control: 'boolean',
			description: 'Whether to show a badge'
		},
		badgeVariant: {
			control: 'select',
			options: ['dot', 'count'],
			description: 'Badge display style'
		},
		badgeCount: {
			control: 'number',
			description: 'Number to display in badge'
		},
		badgeMax: {
			control: 'number',
			description: 'Maximum number before showing "+"'
		},
		reducedMotion: {
			control: 'boolean',
			description: 'Disable animations for reduced motion'
		},
		color: {
			control: 'color',
			description: 'Button color'
		},
		badgeColor: {
			control: 'color',
			description: 'Badge background color'
		},
		customStyle: {
			control: 'text',
			description: 'Custom CSS styles'
		},
		tabindex: {
			control: 'number',
			description: 'Tab index for focus order'
		},
		ariaLabel: {
			control: 'text',
			description: 'Accessible label for screen readers (required)'
		},
		ariaDescribedby: {
			control: 'text',
			description: 'ID of element that describes the button'
		},
		ariaPressed: {
			control: 'boolean',
			description: 'Whether the button is pressed (for toggle buttons)'
		},
		// Snippetはコントロールから除外
		children: {
			control: false,
			description: 'Icon content (Material Symbols name)'
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
type Story = StoryObj<IconButtonArgs>;

// Helper function to create snippet for children
const createChildrenSnippet = (iconName: string) =>
	createRawSnippet(() => ({
		render: () => iconName
	}));

// Default (ghost, medium)
export const Default: Story = {
	args: {
		variant: 'ghost',
		size: 32,
		ariaLabel: 'Default icon button',
		iconFilled: true,
		children: createChildrenSnippet('cancel')
	}
};

// Filled variant
export const Filled: Story = {
	args: {
		variant: 'filled',
		size: 32,
		ariaLabel: 'Filled icon button',
		children: createChildrenSnippet('home')
	}
};

// Outlined variant
export const Outlined: Story = {
	args: {
		variant: 'outlined',
		size: 32,
		ariaLabel: 'Outlined icon button',
		children: createChildrenSnippet('home')
	}
};

// Glass variant
export const Glass: Story = {
	args: {
		variant: 'glass',
		size: 32,
		ariaLabel: 'Glass icon button',
		children: createChildrenSnippet('tune')
	}
};

// Glass variant with different sizes
export const GlassLarge: Story = {
	args: {
		variant: 'glass',
		size: 48,
		ariaLabel: 'Large glass icon button',
		children: createChildrenSnippet('settings')
	}
};

// Glass variant with rounded shape
export const GlassRounded: Story = {
	args: {
		variant: 'glass',
		size: 40,
		rounded: true,
		ariaLabel: 'Round glass icon button',
		children: createChildrenSnippet('more_vert')
	}
};

// Glass with background demo
export const GlassWithBackground: Story = {
	args: {
		variant: 'glass',
		size: 40,
		ariaLabel: 'Glass with background',
		children: createChildrenSnippet('star'),
		customStyle: 'position: relative; z-index: 1;'
	},
	parameters: {
		docs: {
			description: {
				story:
					'すりガラス効果を確認するため、ブラウザの開発者ツールでこの要素に背景色やグラデーションを設定してください。例: `background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px;`'
			}
		}
	}
};

// Size variants
export const Small: Story = {
	args: {
		variant: 'filled',
		size: 24,
		ariaLabel: 'Small icon button',
		children: createChildrenSnippet('home')
	}
};
export const Large: Story = {
	args: {
		variant: 'filled',
		size: 40,
		ariaLabel: 'Large icon button',
		children: createChildrenSnippet('home')
	}
};

// Disabled
export const Disabled: Story = {
	args: {
		variant: 'filled',
		disabled: true,
		ariaLabel: 'Disabled icon button',
		children: createChildrenSnippet('home')
	}
};

// Loading
export const Loading: Story = {
	args: {
		variant: 'filled',
		loading: true,
		ariaLabel: 'Loading icon button',
		children: createChildrenSnippet('home')
	}
};

// Icon fill
export const FilledIcon: Story = {
	args: {
		variant: 'ghost',
		iconFilled: true,
		ariaLabel: 'Filled heart button',
		children: createChildrenSnippet('favorite')
	}
};

// Badge with count
export const WithBadge: Story = {
	args: {
		variant: 'ghost',
		hasBadge: true,
		badgeCount: 5,
		badgeVariant: 'count',
		ariaLabel: 'Notifications (5 unread)',
		children: createChildrenSnippet('notifications')
	}
};

// Badge with dot
export const WithDotBadge: Story = {
	args: {
		variant: 'ghost',
		hasBadge: true,
		badgeVariant: 'dot',
		ariaLabel: 'New notifications',
		children: createChildrenSnippet('notifications')
	}
};

// Custom color
export const CustomColor: Story = {
	args: {
		variant: 'filled',
		color: '#e91e63',
		ariaLabel: 'Pink heart button',
		children: createChildrenSnippet('favorite')
	}
};

// Rounded
export const Rounded: Story = {
	args: {
		variant: 'filled',
		rounded: true,
		ariaLabel: 'Rounded icon button',
		children: createChildrenSnippet('home')
	}
};

// Pressed
export const Pressed: Story = {
	args: {
		variant: 'filled',
		pressed: true,
		ariaLabel: 'Pressed icon button',
		children: createChildrenSnippet('home')
	}
};

// Accessibility example
export const Accessible: Story = {
	args: {
		variant: 'ghost',
		ariaLabel: 'お気に入りに追加/削除',
		ariaPressed: false,
		children: createChildrenSnippet('favorite')
	}
};

// Reduced motion
export const ReducedMotion: Story = {
	args: {
		variant: 'filled',
		reducedMotion: true,
		ariaLabel: 'No animation',
		children: createChildrenSnippet('home')
	}
};

// (No dedicated Playground story; use Default and other stories with controls instead.)
