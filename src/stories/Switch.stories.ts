import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import Switch from '../lib/components/Switch.svelte';

// 型安全性のための明示的な型定義
interface SwitchArgs {
	value: boolean;
	children?: Snippet;
	size?: 'small' | 'medium' | 'large';

	disabled?: boolean;
	required?: boolean;
	reducedMotion?: boolean;
	reducedMotion?: boolean;
	// イベントハンドラ
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
	onchange?: (value: boolean) => void;
}

const meta: Meta<SwitchArgs> = {
	title: 'Forms/Switch',
	component: Switch,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A customizable switch component with accessibility features, error/success states, and size variants. Based on checkbox functionality with toggle visual design.'
			}
		}
	},
	tags: ['autodocs'],
	// Enable reactive updates for bindable props
	render: (args) => ({
		Component: Switch,
		props: args
	}),
	argTypes: {
		value: {
			control: { type: 'boolean' },
			description: 'Switch state'
		},
		size: {
			control: { type: 'radio' },
			options: ['small', 'medium', 'large'],
			description: 'Size variant of the switch'
		},

		disabled: {
			control: { type: 'boolean' },
			description: 'Whether the switch is disabled'
		},
		required: {
			control: { type: 'boolean' },
			description: 'Mark the field as required'
		},
		reducedMotion: {
			control: { type: 'boolean' },
			description: 'Disable animations for reduced motion'
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
		onchange: {
			action: 'changed',
			description: 'Change event'
		}
	}
};

export default meta;
type Story = StoryObj<SwitchArgs>;

// Helper function to create snippet for children
const createChildrenSnippet = (text: string) =>
	createRawSnippet(() => ({
		render: () => text
	}));

// Default (off)
export const Default: Story = {
	args: {
		value: false,
		children: createChildrenSnippet('通知を有効にする')
	}
};

// Checked (on)
export const Checked: Story = {
	args: {
		value: true,
		children: createChildrenSnippet('通知が有効です')
	}
};

// Size variants
export const Small: Story = {
	args: {
		value: false,
		size: 'small',
		children: createChildrenSnippet('小サイズ')
	}
};

export const Medium: Story = {
	args: {
		value: false,
		size: 'medium',
		children: createChildrenSnippet('中サイズ')
	}
};

export const Large: Story = {
	args: {
		value: false,
		size: 'large',
		children: createChildrenSnippet('大サイズ')
	}
};

// Disabled
export const Disabled: Story = {
	args: {
		value: false,
		disabled: true,
		children: createChildrenSnippet('無効状態')
	}
};

// Required
export const Required: Story = {
	args: {
		value: false,
		required: true,
		children: createChildrenSnippet('必須項目')
	}
};

// Without label
export const WithoutLabel: Story = {
	args: {
		value: false
	}
};

// Multiple switches
export const MultipleSwitches: Story = {
	render: () => ({
		Component: () => ({
			Component: 'div',
			props: {
				style: 'display: flex; flex-direction: column; gap: 16px;'
			},
			children: [
				{
					Component: Switch,
					props: {
						value: true,
						children: createChildrenSnippet('Wi-Fi')
					}
				},
				{
					Component: Switch,
					props: {
						value: false,
						children: createChildrenSnippet('Bluetooth')
					}
				},
				{
					Component: Switch,
					props: {
						value: true,
						children: createChildrenSnippet('位置情報')
					}
				},
				{
					Component: Switch,
					props: {
						value: false,
						disabled: true,
						children: createChildrenSnippet('機内モード')
					}
				}
			]
		})
	})
};

// Settings example
export const SettingsExample: Story = {
	render: () => ({
		Component: () => ({
			Component: 'div',
			props: {
				style: 'max-width: 400px; padding: 20px; background: #f5f5f5; border-radius: 8px;'
			},
			children: [
				{
					Component: 'h3',
					props: {
						style: 'margin: 0 0 16px 0; color: #333;'
					},
					children: '設定'
				},
				{
					Component: 'div',
					props: {
						style: 'display: flex; flex-direction: column; gap: 12px;'
					},
					children: [
						{
							Component: Switch,
							props: {
								value: true,
								children: createChildrenSnippet('プッシュ通知')
							}
						},
						{
							Component: Switch,
							props: {
								value: false,
								children: createChildrenSnippet('メール通知')
							}
						},
						{
							Component: Switch,
							props: {
								value: true,
								children: createChildrenSnippet('ダークモード')
							}
						},
						{
							Component: Switch,
							props: {
								value: false,
								children: createChildrenSnippet('自動更新')
							}
						}
					]
				}
			]
		})
	})
};
