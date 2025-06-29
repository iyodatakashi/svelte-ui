import type { Meta, StoryObj } from '@storybook/svelte';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import Button from '../components/Button.svelte';

// 型安全性のための明示的な型定義
interface ButtonArgs {
	children: Snippet;
	type?: 'button' | 'submit' | 'reset';
	customStyle?: string;
	theme?: 'light' | 'dark';
	disabled?: boolean;
	loading?: boolean;
	tabindex?: number | null;
	iconFill?: boolean;
	fullWidth?: boolean;
	minWidth?: number;
	popup?: boolean;
	rounded?: boolean;
	icon?: string;
	color?: string;
	variant?: 'filled' | 'outlined' | 'text';
	size?: 'small' | 'medium' | 'large';
	reducedMotion?: boolean;
	ariaLabel?: string;
	ariaDescribedby?: string;
	ariaExpanded?: boolean;
	onclick?: (event: MouseEvent & { currentTarget: HTMLButtonElement }) => void;
}

const meta: Meta<ButtonArgs> = {
	title: 'Forms/Button',
	component: Button as any,
	parameters: {
		layout: 'centered',
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
			options: ['filled', 'outlined', 'text'],
			description: 'Visual style variant'
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
			description: 'Size variant of the button'
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
		iconFill: {
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

// Default button
export const Default: Story = {
	args: {
		variant: 'text',
		size: 'medium',
		children: createChildrenSnippet('Default Button')
	}
};

// Variant examples
export const Filled: Story = {
	args: {
		variant: 'filled',
		size: 'medium',
		children: createChildrenSnippet('Filled Button')
	}
};

export const Outlined: Story = {
	args: {
		variant: 'outlined',
		size: 'medium',
		children: createChildrenSnippet('Outlined Button')
	}
};

export const TextButton: Story = {
	args: {
		variant: 'text',
		size: 'medium',
		children: createChildrenSnippet('Text Button')
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

export const Medium: Story = {
	args: {
		variant: 'filled',
		size: 'medium',
		children: createChildrenSnippet('Medium Button')
	}
};

export const Large: Story = {
	args: {
		variant: 'filled',
		size: 'large',
		children: createChildrenSnippet('Large Button')
	}
};

// State examples
export const Disabled: Story = {
	args: {
		variant: 'filled',
		size: 'medium',
		disabled: true,
		children: createChildrenSnippet('Disabled Button')
	}
};

export const Loading: Story = {
	args: {
		variant: 'filled',
		size: 'medium',
		loading: true,
		children: createChildrenSnippet('Loading Button')
	}
};

// With icons
export const WithIcon: Story = {
	args: {
		variant: 'filled',
		size: 'medium',
		icon: 'add',
		children: createChildrenSnippet('Add Item')
	}
};

export const IconOnly: Story = {
	args: {
		variant: 'filled',
		size: 'medium',
		icon: 'edit',
		ariaLabel: 'Edit item',
		children: createChildrenSnippet('')
	}
};

export const WithFilledIcon: Story = {
	args: {
		variant: 'outlined',
		size: 'medium',
		icon: 'favorite',
		iconFill: true,
		children: createChildrenSnippet('Like')
	}
};

// Popup button
export const PopupButton: Story = {
	args: {
		variant: 'outlined',
		size: 'medium',
		popup: true,
		ariaExpanded: false,
		children: createChildrenSnippet('Options')
	}
};

// Full width
export const FullWidth: Story = {
	args: {
		variant: 'filled',
		size: 'medium',
		fullWidth: true,
		children: createChildrenSnippet('Full Width Button')
	},
	parameters: {
		layout: 'padded'
	}
};

// Rounded button
export const Rounded: Story = {
	args: {
		variant: 'filled',
		size: 'medium',
		rounded: true,
		children: createChildrenSnippet('Rounded Button')
	}
};

// Custom color
export const CustomColor: Story = {
	args: {
		variant: 'filled',
		size: 'medium',
		color: '#e91e63',
		children: createChildrenSnippet('Custom Color')
	}
};

// Dark theme
export const DarkTheme: Story = {
	args: {
		variant: 'filled',
		size: 'medium',
		theme: 'dark',
		children: createChildrenSnippet('Dark Theme')
	},
	parameters: {
		backgrounds: { default: 'dark' }
	}
};

// Button types
export const SubmitButton: Story = {
	args: {
		type: 'submit',
		variant: 'filled',
		size: 'medium',
		children: createChildrenSnippet('Submit Form')
	}
};

export const ResetButton: Story = {
	args: {
		type: 'reset',
		variant: 'outlined',
		size: 'medium',
		children: createChildrenSnippet('Reset Form')
	}
};

// Accessibility examples
export const AccessibleButton: Story = {
	args: {
		variant: 'filled',
		size: 'medium',
		ariaLabel: 'Save document as PDF',
		icon: 'download',
		children: createChildrenSnippet('Download PDF')
	}
};

export const ExpandableButton: Story = {
	args: {
		variant: 'outlined',
		size: 'medium',
		popup: true,
		ariaExpanded: false,
		ariaLabel: 'More options menu',
		children: createChildrenSnippet('More')
	}
};

// Reduced motion
export const ReducedMotion: Story = {
	args: {
		variant: 'filled',
		size: 'medium',
		reducedMotion: true,
		children: createChildrenSnippet('No Animation')
	}
};

// Complex examples
export const IconLoadingButton: Story = {
	args: {
		variant: 'filled',
		size: 'large',
		icon: 'send',
		loading: true,
		children: createChildrenSnippet('Sending Message')
	}
};

export const MinWidthButton: Story = {
	args: {
		variant: 'outlined',
		size: 'medium',
		minWidth: 120,
		children: createChildrenSnippet('OK')
	}
};

// Button group example (simplified)
export const ButtonGroupExample: Story = {
	args: {
		variant: 'outlined',
		size: 'medium',
		children: createChildrenSnippet('Cancel')
	}
};

// Interactive playground
export const Playground: Story = {
	args: {
		type: 'button',
		variant: 'filled',
		size: 'medium',
		theme: 'light',
		disabled: false,
		loading: false,
		fullWidth: false,
		rounded: false,
		popup: false,
		iconFill: false,
		reducedMotion: false,
		icon: '',
		color: 'var(--primary-color)',
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
