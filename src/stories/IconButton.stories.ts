import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import IconButton from '../lib/components/IconButton.svelte';

// Explicit type definition for better type safety
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
	// Additional event handler props
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
		// Event handlers are excluded from controls
		onclick: {
			control: false,
			action: 'clicked'
		},
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
			description: 'Key down event'
		},
		onkeyup: {
			action: 'keyup',
			description: 'Key up event'
		},
		onmousedown: {
			action: 'mousedown',
			description: 'Mouse down event'
		},
		onmouseup: {
			action: 'mouseup',
			description: 'Mouse up event'
		},
		onmouseenter: {
			action: 'mouseenter',
			description: 'Mouse enter event'
		},
		onmouseleave: {
			action: 'mouseleave',
			description: 'Mouse leave event'
		},
		onmouseover: {
			action: 'mouseover',
			description: 'Mouse over event'
		},
		onmouseout: {
			action: 'mouseout',
			description: 'Mouse out event'
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
		ariaLabel: 'Default icon button',
		iconFilled: true,
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

// Glass variant
export const Glass: Story = {
	args: {
		variant: 'glass',
		size: 32,
		ariaLabel: 'Glass icon button',
		children: createChildrenSnippet('search')
	}
};

// Size variants
export const Small: Story = {
	args: {
		size: 24,
		ariaLabel: 'Small icon button',
		children: createChildrenSnippet('home')
	}
};
export const Large: Story = {
	args: {
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

// Custom color
export const Square: Story = {
	args: {
		variant: 'outlined',
		rounded: false,
		ariaLabel: 'Squqre Home button',
		children: createChildrenSnippet('home')
	}
};
