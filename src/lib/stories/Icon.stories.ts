import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import Icon from '../components/Icon.svelte';

// 型安全性のための明示的な型定義
interface IconArgs {
	children: Snippet;
	size?: number;
	filled?: boolean;
	color?: string;
	style?: string;
	variant?: 'outlined' | 'filled' | 'rounded' | 'sharp';
	weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
	grade?: number;
	opticalSize?: number;
	decorative?: boolean;
	ariaLabel?: string;
	title?: string;
	fallbackText?: string;
	reducedMotion?: boolean;
}

const meta: Meta<IconArgs> = {
	title: 'UI/Icon',
	component: Icon,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A Material Symbols icon component with full Variable Font Features support and automatic font loading.'
			}
		}
	},
	tags: ['autodocs'],
	// Enable reactive updates for bindable props
	render: (args) => ({
		Component: Icon,
		props: args
	}),
	argTypes: {
		size: {
			control: 'number',
			description: 'Size of the icon in pixels'
		},
		filled: {
			control: 'boolean',
			description: 'Whether the icon should be filled'
		},
		color: {
			control: 'color',
			description: 'Icon color'
		},
		variant: {
			control: 'select',
			options: ['outlined', 'rounded', 'sharp'],
			description: 'Material Symbols variant'
		},
		weight: {
			control: 'select',
			options: [100, 200, 300, 400, 500, 600, 700],
			description: 'Font weight (thickness of strokes)'
		},
		grade: {
			control: { type: 'range', min: -25, max: 200, step: 25 },
			description: 'Grade adjustment for contrast (-25 to 200)'
		},
		opticalSize: {
			control: { type: 'range', min: 20, max: 48, step: 4 },
			description: 'Optical size optimization (20-48)'
		},
		decorative: {
			control: 'boolean',
			description: 'Whether the icon is decorative (hidden from screen readers)'
		},
		reducedMotion: {
			control: 'boolean',
			description: 'Disable animations for reduced motion'
		},
		style: {
			control: 'text',
			description: 'Custom CSS styles'
		},
		ariaLabel: {
			control: 'text',
			description: 'Accessible label for screen readers'
		},
		title: {
			control: 'text',
			description: 'Tooltip text'
		},
		fallbackText: {
			control: 'text',
			description: 'Fallback text when font fails to load (Unicode recommended)'
		},
		// Snippetはコントロールから除外
		children: {
			control: false,
			description: 'Material Symbols icon name'
		}
	}
};

export default meta;
type Story = StoryObj<IconArgs>;

// Helper function to create snippet for children
const createChildrenSnippet = (iconName: string) =>
	createRawSnippet(() => ({
		render: () => iconName
	}));

// Default (outlined, medium)
export const Default: Story = {
	args: {
		size: 24,
		variant: 'outlined',
		children: createChildrenSnippet('home')
	}
};

// Variant examples
export const Filled: Story = {
	args: {
		size: 24,
		variant: 'filled',
		children: createChildrenSnippet('home')
	}
};
export const Rounded: Story = {
	args: {
		size: 24,
		variant: 'rounded',
		children: createChildrenSnippet('home')
	}
};
export const Sharp: Story = {
	args: {
		size: 24,
		variant: 'sharp',
		children: createChildrenSnippet('home')
	}
};

// Size examples
export const Small: Story = {
	args: {
		size: 16,
		children: createChildrenSnippet('search')
	}
};
export const Large: Story = {
	args: {
		size: 48,
		children: createChildrenSnippet('search')
	}
};

// Fill
export const FilledIcon: Story = {
	args: {
		size: 32,
		filled: true,
		children: createChildrenSnippet('home')
	}
};

// Color
export const CustomColor: Story = {
	args: {
		size: 32,
		color: '#e91e63',
		children: createChildrenSnippet('palette')
	}
};

// Weight
export const WeightBold: Story = {
	args: {
		size: 32,
		weight: 700,
		children: createChildrenSnippet('settings')
	}
};

// Grade
export const GradeHeavy: Story = {
	args: {
		size: 32,
		grade: 200,
		children: createChildrenSnippet('brightness_high')
	}
};

// Optical size
export const OpticalSizeLarge: Story = {
	args: {
		size: 48,
		opticalSize: 48,
		children: createChildrenSnippet('visibility')
	}
};

// Decorative
export const Decorative: Story = {
	args: {
		size: 24,
		decorative: true,
		children: createChildrenSnippet('search')
	}
};

// Accessibility example
export const Accessible: Story = {
	args: {
		size: 24,
		ariaLabel: '検索',
		children: createChildrenSnippet('search')
	}
};

// Reduced motion
export const ReducedMotion: Story = {
	args: {
		size: 32,
		reducedMotion: true,
		children: createChildrenSnippet('animation')
	}
};

// Playground (全props操作用)
export const Playground: Story = {
	args: {
		size: 24,
		filled: false,
		color: '',
		style: '',
		variant: 'outlined',
		weight: 400,
		grade: 0,
		opticalSize: 24,
		decorative: true,
		reducedMotion: false,
		ariaLabel: '',
		title: '',
		fallbackText: ''
		// children は除外してコントロールの問題を回避
	},
	render: (args) => ({
		Component: Icon,
		props: {
			...args,
			children: createChildrenSnippet('home')
		}
	})
};
