import type { Meta, StoryObj } from '@storybook/sveltekit';
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
	component: IconButton,
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

// Default (text, medium)
export const Default: Story = {
	args: {
		variant: 'text',
		size: 32,
		ariaLabel: 'Default icon button',
		children: createChildrenSnippet('search')
	}
};

// Filled variant
export const Filled: Story = {
	args: {
		variant: 'filled',
		size: 32,
		ariaLabel: 'Filled icon button',
		children: createChildrenSnippet('search')
	}
};

// Outlined variant
export const Outlined: Story = {
	args: {
		variant: 'outlined',
		size: 32,
		ariaLabel: 'Outlined icon button',
		children: createChildrenSnippet('search')
	}
};

// Size variants
export const Small: Story = {
	args: {
		variant: 'filled',
		size: 24,
		ariaLabel: 'Small icon button',
		children: createChildrenSnippet('search')
	}
};
export const Large: Story = {
	args: {
		variant: 'filled',
		size: 40,
		ariaLabel: 'Large icon button',
		children: createChildrenSnippet('search')
	}
};

// Disabled
export const Disabled: Story = {
	args: {
		variant: 'filled',
		disabled: true,
		ariaLabel: 'Disabled icon button',
		children: createChildrenSnippet('search')
	}
};

// Loading
export const Loading: Story = {
	args: {
		variant: 'filled',
		loading: true,
		ariaLabel: 'Loading icon button',
		children: createChildrenSnippet('search')
	}
};

// Icon fill
export const FilledIcon: Story = {
	args: {
		variant: 'text',
		iconFill: true,
		ariaLabel: 'Filled heart button',
		children: createChildrenSnippet('favorite')
	}
};

// Badge
export const WithBadge: Story = {
	args: {
		variant: 'text',
		showBadge: true,
		badgeCount: 5,
		badgeVariant: 'count',
		ariaLabel: 'Notifications (5 unread)',
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
		children: createChildrenSnippet('search')
	}
};

// Pressed
export const Pressed: Story = {
	args: {
		variant: 'filled',
		pressed: true,
		ariaLabel: 'Pressed icon button',
		children: createChildrenSnippet('search')
	}
};

// Accessibility example
export const Accessible: Story = {
	args: {
		variant: 'text',
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
		children: createChildrenSnippet('search')
	}
};

// Playground (全props操作用)
export const Playground: Story = {
	args: {
		type: 'button',
		variant: 'filled',
		size: 32,
		fontSize: 24,

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
