import type { Meta, StoryObj } from '@storybook/svelte';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import IconButton from '../components/IconButton.svelte';

// 型安全性のための明示的な型定義
interface IconButtonArgs {
	children: Snippet;
	type?: 'button' | 'submit' | 'reset' | null | undefined;
	size?: number;
	fontSize?: number;
	variant?: 'filled' | 'outlined' | 'text';
	color?: string;
	theme?: 'light' | 'dark';
	disabled?: boolean;
	loading?: boolean;
	tabindex?: number | null;
	iconFill?: boolean;
	customStyle?: string;
	rounded?: boolean;
	pressed?: boolean;
	showBadge?: boolean;
	badgeCount?: number;
	badgeVariant?: 'dot' | 'count';
	badgeColor?: string;
	badgeMax?: number;
	reducedMotion?: boolean;
	ariaLabel: string;
	ariaDescribedby?: string;
	ariaPressed?: boolean;
	onclick?: (event: MouseEvent & { currentTarget: HTMLButtonElement }) => void;
}

const meta: Meta<IconButtonArgs> = {
	title: 'Forms/IconButton',
	component: IconButton as any,
	parameters: {
		layout: 'centered',
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
			control: 'select',
			options: ['button', 'submit', 'reset'],
			description: 'HTML button type attribute'
		},
		variant: {
			control: 'select',
			options: ['filled', 'outlined', 'text'],
			description: 'Visual style variant'
		},
		size: {
			control: 'number',
			description: 'Size of the button in pixels'
		},
		fontSize: {
			control: 'number',
			description: 'Font size of the icon (defaults to size * 0.75)'
		},
		theme: {
			control: 'select',
			options: ['light', 'dark'],
			description: 'Theme variant'
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
		iconFill: {
			control: 'boolean',
			description: 'Whether the icon should be filled'
		},
		showBadge: {
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

// Default icon button
export const Default: Story = {
	args: {
		variant: 'text',
		size: 32,
		ariaLabel: 'Default icon button',
		children: createChildrenSnippet('search')
	}
};

// Variant examples
export const Filled: Story = {
	args: {
		variant: 'filled',
		size: 32,
		ariaLabel: 'Filled star button',
		children: createChildrenSnippet('search')
	}
};

export const Outlined: Story = {
	args: {
		variant: 'outlined',
		size: 32,
		ariaLabel: 'Outlined star button',
		children: createChildrenSnippet('search')
	}
};

export const TextVariant: Story = {
	args: {
		variant: 'text',
		size: 32,
		ariaLabel: 'Text star button',
		children: createChildrenSnippet('search')
	}
};

// Size variants
export const Small: Story = {
	args: {
		variant: 'filled',
		size: 24,
		ariaLabel: 'Small star button',
		children: createChildrenSnippet('search')
	}
};

export const Medium: Story = {
	args: {
		variant: 'filled',
		size: 32,
		ariaLabel: 'Medium star button',
		children: createChildrenSnippet('search')
	}
};

export const Large: Story = {
	args: {
		variant: 'filled',
		size: 40,
		ariaLabel: 'Large star button',
		children: createChildrenSnippet('search')
	}
};

// State examples
export const Disabled: Story = {
	args: {
		variant: 'filled',
		size: 32,
		disabled: true,
		ariaLabel: 'Disabled star button',
		children: createChildrenSnippet('search')
	}
};

export const Loading: Story = {
	args: {
		variant: 'filled',
		size: 32,
		loading: true,
		ariaLabel: 'Loading star button',
		children: createChildrenSnippet('search')
	}
};

export const Pressed: Story = {
	args: {
		variant: 'filled',
		size: 32,
		pressed: true,
		ariaLabel: 'Pressed star button',
		children: createChildrenSnippet('search')
	}
};

// Shape variants
export const Circular: Story = {
	args: {
		variant: 'filled',
		size: 32,
		rounded: true,
		ariaLabel: 'Circular star button',
		children: createChildrenSnippet('search')
	}
};

export const RoundedRectangle: Story = {
	args: {
		variant: 'filled',
		size: 32,
		rounded: false,
		ariaLabel: 'Rounded rectangle star button',
		children: createChildrenSnippet('search')
	}
};

// Icon variants
export const FilledIcon: Story = {
	args: {
		variant: 'text',
		size: 32,
		iconFill: true,
		ariaLabel: 'Filled heart button',
		children: createChildrenSnippet('favorite')
	}
};

export const OutlinedIcon: Story = {
	args: {
		variant: 'text',
		size: 32,
		iconFill: false,
		ariaLabel: 'Outlined heart button',
		children: createChildrenSnippet('favorite')
	}
};

// Badge examples
export const WithBadgeCount: Story = {
	args: {
		variant: 'text',
		size: 32,
		showBadge: true,
		badgeCount: 5,
		badgeVariant: 'count',
		ariaLabel: 'Notifications (5 unread)',
		children: createChildrenSnippet('notifications')
	}
};

export const WithBadgeDot: Story = {
	args: {
		variant: 'text',
		size: 32,
		showBadge: true,
		badgeVariant: 'dot',
		ariaLabel: 'Notifications (new)',
		children: createChildrenSnippet('notifications')
	}
};

export const BadgeOverflow: Story = {
	args: {
		variant: 'text',
		size: 32,
		showBadge: true,
		badgeCount: 150,
		badgeMax: 99,
		badgeVariant: 'count',
		ariaLabel: 'Messages (99+ unread)',
		children: createChildrenSnippet('mail')
	}
};

export const CustomBadgeColor: Story = {
	args: {
		variant: 'text',
		size: 32,
		showBadge: true,
		badgeCount: 3,
		badgeVariant: 'count',
		badgeColor: '#ff4444',
		ariaLabel: 'Errors (3 items)',
		children: createChildrenSnippet('error')
	}
};

// Custom colors
export const CustomColor: Story = {
	args: {
		variant: 'filled',
		size: 32,
		color: '#e91e63',
		ariaLabel: 'Pink heart button',
		children: createChildrenSnippet('favorite')
	}
};

// Dark theme
export const DarkTheme: Story = {
	args: {
		variant: 'filled',
		size: 32,
		theme: 'dark',
		ariaLabel: 'Dark theme star button',
		children: createChildrenSnippet('search')
	},
	parameters: {
		backgrounds: { default: 'dark' }
	}
};

// Common use cases
export const LikeButton: Story = {
	args: {
		variant: 'text',
		size: 32,
		iconFill: false,
		ariaLabel: 'いいね',
		children: createChildrenSnippet('favorite')
	}
};

export const ShareButton: Story = {
	args: {
		variant: 'text',
		size: 32,
		ariaLabel: '共有',
		children: createChildrenSnippet('share')
	}
};

export const MoreOptionsButton: Story = {
	args: {
		variant: 'text',
		size: 32,
		ariaLabel: 'その他のオプション',
		children: createChildrenSnippet('more_vert')
	}
};

export const CloseButton: Story = {
	args: {
		variant: 'text',
		size: 24,
		ariaLabel: '閉じる',
		children: createChildrenSnippet('close')
	}
};

export const EditButton: Story = {
	args: {
		variant: 'outlined',
		size: 32,
		ariaLabel: '編集',
		children: createChildrenSnippet('edit')
	}
};

export const DeleteButton: Story = {
	args: {
		variant: 'text',
		size: 32,
		color: '#dc3545',
		ariaLabel: '削除',
		children: createChildrenSnippet('delete')
	}
};

// Accessibility examples
export const ToggleButton: Story = {
	args: {
		variant: 'text',
		size: 32,
		pressed: false,
		ariaPressed: false,
		ariaLabel: 'お気に入りに追加/削除',
		children: createChildrenSnippet('favorite')
	}
};

export const NotificationButton: Story = {
	args: {
		variant: 'text',
		size: 32,
		showBadge: true,
		badgeCount: 12,
		badgeVariant: 'count',
		ariaLabel: '通知 (12件の未読メッセージ)',
		children: createChildrenSnippet('notifications')
	}
};

// Complex examples
export const LoadingWithBadge: Story = {
	args: {
		variant: 'filled',
		size: 32,
		loading: true,
		showBadge: true,
		badgeCount: 3,
		badgeVariant: 'count',
		ariaLabel: '同期中 (3件の更新)',
		children: createChildrenSnippet('sync')
	}
};

// Reduced motion
export const ReducedMotion: Story = {
	args: {
		variant: 'filled',
		size: 32,
		reducedMotion: true,
		ariaLabel: 'アニメーションなし',
		children: createChildrenSnippet('search')
	}
};

// Playground用のargsも標準サイズ32に修正
export const Playground: Story = {
	args: {
		type: 'button',
		variant: 'filled',
		size: 32,
		fontSize: 24, // デフォルトのsize * 0.75
		theme: 'light',
		disabled: false,
		loading: false,
		rounded: true,
		pressed: false,
		iconFill: false,
		showBadge: false,
		badgeCount: 0,
		badgeVariant: 'count',
		badgeMax: 99,
		reducedMotion: false,
		color: '',
		badgeColor: '',
		customStyle: '',
		tabindex: null,
		ariaLabel: 'Customizable icon button',
		ariaDescribedby: '',
		ariaPressed: false
		// children は除外してコントロールの問題を回避
	},
	render: (args) => ({
		Component: IconButton,
		props: {
			...args,
			children: createChildrenSnippet('search')
		}
	})
};
