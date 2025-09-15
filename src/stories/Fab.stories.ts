import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import Fab from '../lib/components/Fab.svelte';

// 型安全性のための明示的な型定義
interface FabArgs {
	children?: Snippet;
	icon?: string;
	color?: string;
	variant?: 'filled' | 'outlined' | 'ghost' | 'glass';
	position?: 'left' | 'center' | 'right';
	shadow?: boolean;
	disabled?: boolean;
	loading?: boolean;
	reducedMotion?: boolean;
	iconFilled?: boolean;
	ariaLabel?: string;
	ariaDescribedby?: string;
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

const meta: Meta<FabArgs> = {
	title: 'UI/Fab',
	component: Fab,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Floating Action Button (FAB) - A Button variant positioned as a floating element, typically used for primary actions.'
			}
		}
	},
	tags: ['autodocs'],
	// Enable reactive updates for bindable props
	render: (args) => ({
		Component: Fab,
		props: args
	}),
	argTypes: {
		variant: {
			control: 'select',
			options: ['filled', 'outlined', 'ghost', 'glass'],
			description: 'Visual style variant'
		},
		position: {
			control: 'select',
			options: ['left', 'center', 'right'],
			description: 'Position of the FAB on screen'
		},
		icon: {
			control: 'text',
			description: 'Material Symbol icon name'
		},
		color: {
			control: 'color',
			description: 'Custom color (optional)'
		},
		disabled: {
			control: 'boolean',
			description: 'Disabled state'
		},
		loading: {
			control: 'boolean',
			description: 'Loading state'
		},
		shadow: {
			control: 'boolean',
			description: 'Whether to show drop shadow'
		},
		// 新しいイベントハンドラのargTypes
		onclick: {
			action: 'clicked',
			description: 'クリックイベント'
		},
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
type Story = StoryObj<FabArgs>;

// アイコンのみ（標準）
export const Default: Story = {
	args: {
		icon: 'add',
		position: 'right',
		disabled: false,
		loading: false,
		shadow: true
	}
};

// 異なるポジション
export const PositionLeft: Story = {
	args: {
		icon: 'favorite',
		position: 'left',
		disabled: false
	}
};

export const PositionCenter: Story = {
	args: {
		icon: 'share',
		position: 'center',
		disabled: false
	}
};

// カスタムカラー
export const CustomColor: Story = {
	args: {
		icon: 'delete',
		color: '#f44336',
		position: 'right',
		disabled: false
	}
};

// 無効状態
export const Disabled: Story = {
	args: {
		icon: 'add',
		disabled: true,
		position: 'right'
	}
};

// ローディング状態
export const Loading: Story = {
	args: {
		icon: 'add',
		loading: true,
		position: 'right'
	}
};

// シャドウなし
export const NoShadow: Story = {
	args: {
		icon: 'add',
		shadow: false,
		position: 'right',
		disabled: false
	}
};

// Helper function to create snippet for children
const createChildrenSnippet = (text: string) =>
	createRawSnippet(() => ({
		render: () => text
	}));

// ラベル付きFab
export const WithLabel: Story = {
	args: {
		icon: 'edit',
		position: 'center',
		color: '#6750a4',
		disabled: false,
		children: createChildrenSnippet('Edit')
	}
};

// ラベル付きFab（長いテキスト）
export const WithLongLabel: Story = {
	args: {
		icon: 'download',
		position: 'center',
		color: '#6750a4',
		disabled: false,
		children: createChildrenSnippet('Download File')
	}
};
