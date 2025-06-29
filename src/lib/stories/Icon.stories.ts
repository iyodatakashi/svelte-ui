import type { Meta, StoryObj } from '@storybook/svelte';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import Icon from '../components/Icon.svelte';

// 型安全性のための明示的な型定義
interface IconArgs {
	children: Snippet;
	size?: number;
	fill?: boolean;
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
	component: Icon as any,
	parameters: {
		layout: 'centered',
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
		fill: {
			control: 'boolean',
			description: 'Whether the icon should be filled'
		},
		color: {
			control: 'color',
			description: 'Icon color'
		},
		variant: {
			control: 'select',
			options: ['outlined', 'filled', 'rounded', 'sharp'],
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

// Default icon
export const Default: Story = {
	args: {
		size: 24,
		children: createChildrenSnippet('search')
	}
};

// Size variants
export const Small: Story = {
	args: {
		size: 16,
		children: createChildrenSnippet('search')
	}
};

export const Medium: Story = {
	args: {
		size: 24,
		children: createChildrenSnippet('search')
	}
};

export const Large: Story = {
	args: {
		size: 32,
		children: createChildrenSnippet('search')
	}
};

export const ExtraLarge: Story = {
	args: {
		size: 48,
		children: createChildrenSnippet('search')
	}
};

// Fill variants
export const Outlined: Story = {
	args: {
		size: 32,
		fill: false,
		children: createChildrenSnippet('favorite')
	}
};

export const Filled: Story = {
	args: {
		size: 32,
		fill: true,
		children: createChildrenSnippet('favorite')
	}
};

// Material Symbols variants
export const VariantOutlined: Story = {
	args: {
		size: 32,
		variant: 'outlined',
		children: createChildrenSnippet('home')
	}
};

export const VariantFilled: Story = {
	args: {
		size: 32,
		variant: 'filled',
		children: createChildrenSnippet('home')
	}
};

export const VariantRounded: Story = {
	args: {
		size: 32,
		variant: 'rounded',
		children: createChildrenSnippet('home')
	}
};

export const VariantSharp: Story = {
	args: {
		size: 32,
		variant: 'sharp',
		children: createChildrenSnippet('home')
	}
};

// Weight variants
export const WeightLight: Story = {
	args: {
		size: 32,
		weight: 200,
		children: createChildrenSnippet('settings')
	}
};

export const WeightRegular: Story = {
	args: {
		size: 32,
		weight: 400,
		children: createChildrenSnippet('settings')
	}
};

export const WeightBold: Story = {
	args: {
		size: 32,
		weight: 700,
		children: createChildrenSnippet('settings')
	}
};

// Grade examples
export const GradeLight: Story = {
	args: {
		size: 32,
		grade: -25,
		children: createChildrenSnippet('brightness_high')
	}
};

export const GradeNormal: Story = {
	args: {
		size: 32,
		grade: 0,
		children: createChildrenSnippet('brightness_high')
	}
};

export const GradeHeavy: Story = {
	args: {
		size: 32,
		grade: 200,
		children: createChildrenSnippet('brightness_high')
	}
};

// Optical size examples
export const OpticalSizeSmall: Story = {
	args: {
		size: 16,
		opticalSize: 20,
		children: createChildrenSnippet('visibility')
	}
};

export const OpticalSizeLarge: Story = {
	args: {
		size: 48,
		opticalSize: 48,
		children: createChildrenSnippet('visibility')
	}
};

// Color examples
export const ColorDefault: Story = {
	args: {
		size: 32,
		children: createChildrenSnippet('palette')
	}
};

export const ColorCustom: Story = {
	args: {
		size: 32,
		color: '#e91e63',
		children: createChildrenSnippet('palette')
	}
};

export const ColorCSS: Story = {
	args: {
		size: 32,
		color: 'var(--primary-color)',
		children: createChildrenSnippet('palette')
	}
};

// Accessibility examples
export const Decorative: Story = {
	args: {
		size: 24,
		decorative: true,
		children: createChildrenSnippet('search')
	}
};

export const Semantic: Story = {
	args: {
		size: 24,
		decorative: false,
		ariaLabel: '検索',
		children: createChildrenSnippet('search')
	}
};

export const WithTooltip: Story = {
	args: {
		size: 24,
		title: 'このアイコンにマウスオーバーしてください',
		children: createChildrenSnippet('info')
	}
};

// Fallback examples
export const WithFallback: Story = {
	args: {
		size: 24,
		fallbackText: '❤️',
		children: createChildrenSnippet('favorite')
	}
};

export const FallbackUnicode: Story = {
	args: {
		size: 24,
		fallbackText: '✓',
		children: createChildrenSnippet('check')
	}
};

// Common icon examples
export const NavigationHome: Story = {
	args: {
		size: 24,
		children: createChildrenSnippet('home')
	}
};

export const NavigationSearch: Story = {
	args: {
		size: 24,
		children: createChildrenSnippet('search')
	}
};

export const NavigationMenu: Story = {
	args: {
		size: 24,
		children: createChildrenSnippet('menu')
	}
};

export const NavigationBack: Story = {
	args: {
		size: 24,
		children: createChildrenSnippet('arrow_back')
	}
};

export const NavigationClose: Story = {
	args: {
		size: 24,
		children: createChildrenSnippet('close')
	}
};

export const ActionIcons: Story = {
	args: {
		size: 24,
		children: createChildrenSnippet('edit')
	}
};

export const StatusIcons: Story = {
	args: {
		size: 24,
		color: '#4caf50',
		children: createChildrenSnippet('check_circle')
	}
};

// Complex examples
export const AdvancedConfiguration: Story = {
	args: {
		size: 40,
		variant: 'rounded',
		weight: 500,
		grade: 25,
		opticalSize: 40,
		color: '#2196f3',
		children: createChildrenSnippet('tune')
	}
};

export const SmallOptimized: Story = {
	args: {
		size: 16,
		weight: 500,
		grade: 25,
		opticalSize: 20,
		children: createChildrenSnippet('notifications')
	}
};

export const LargeOptimized: Story = {
	args: {
		size: 64,
		weight: 300,
		grade: -25,
		opticalSize: 48,
		children: createChildrenSnippet('emoji_emotions')
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

// Interactive playground
export const Playground: Story = {
	args: {
		size: 24,
		fill: false,
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
			children: createChildrenSnippet('search')
		}
	})
};
