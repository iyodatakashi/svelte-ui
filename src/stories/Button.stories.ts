import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import type { IconVariant } from '../lib/types/icon';
import Button from '../lib/components/Button.svelte';

// Explicit type definition for better type safety
interface ButtonArgs {
	children: Snippet;
	type?: 'button' | 'submit' | 'reset';
	customStyle?: string;

	align?: 'left' | 'center' | 'right';
	disabled?: boolean;
	loading?: boolean;
	tabindex?: number | null;
	iconFilled?: boolean;
	iconWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
	iconGrade?: number;
	iconOpticalSize?: number | null;
	iconVariant?: IconVariant;
	fullWidth?: boolean;
	minWidth?: string | number;
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
			control: 'radio',
			options: ['small', 'medium', 'large'],
			description: 'Size variant of the button'
		},
		align: {
			control: 'radio',
			options: ['left', 'center', 'right'],
			description: 'Horizontal alignment of the button content'
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
		iconVariant: {
			control: 'radio',
			options: ['outlined', 'rounded', 'sharp'],
			description: 'Icon variant'
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
			control: 'text',
			description:
				'Minimum width (number in px or CSS length string, e.g. "160", "50%", "12rem")'
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
		// Snippet props are excluded from controls
		children: {
			control: false,
			description: 'Button content/label'
		},
		// Event handlers are also excluded from controls
		onclick: {
			control: false,
			action: 'clicked'
		},
		// ArgTypes for additional event handlers
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
		children: createChildrenSnippet('Default (Ghost Button)')
	}
};

// Filled variant
export const Ghost: Story = {
	args: {
		variant: 'ghost',
		children: createChildrenSnippet('Ghost Button')
	}
};

// Filled variant
export const Filled: Story = {
	args: {
		variant: 'filled',
		children: createChildrenSnippet('Filled Button')
	}
};

// Outlined variant
export const Outlined: Story = {
	args: {
		variant: 'outlined',
		children: createChildrenSnippet('Outlined Button')
	}
};

export const Glass: Story = {
	args: {
		variant: 'glass',
		children: createChildrenSnippet('Glass Button')
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

// Size variants
export const Small: Story = {
	args: {
		size: 'small',
		children: createChildrenSnippet('Small Button')
	}
};
export const Large: Story = {
	args: {
		size: 'large',
		children: createChildrenSnippet('Large Button')
	}
};

// Disabled
export const Disabled: Story = {
	args: {
		disabled: true,
		children: createChildrenSnippet('Disabled Button')
	}
};

// Loading
export const Loading: Story = {
	args: {
		loading: true,
		children: createChildrenSnippet('Loading Button')
	}
};

// With icon
export const WithIcon: Story = {
	args: {
		icon: 'add',
		children: createChildrenSnippet('Add Item')
	}
};

// Popup
export const Popup: Story = {
	args: {
		popup: true,
		ariaExpanded: false,
		children: createChildrenSnippet('Options')
	}
};

// Custom color
export const CustomColor: Story = {
	args: {
		color: '#e91e63',
		children: createChildrenSnippet('Custom Color')
	}
};

// Full width
export const FullWidth: Story = {
	args: {
		fullWidth: true,
		children: createChildrenSnippet('Full Width Button')
	},
	parameters: {
		layout: 'padded'
	}
};
