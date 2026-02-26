import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import Fab from '../lib/components/Fab.svelte';

// Explicit type definition for better type safety
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
	iconWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
	iconGrade?: number;
	iconOpticalSize?: number | null;
	iconVariant?: 'outlined' | 'rounded' | 'sharp';
	ariaLabel?: string;
	ariaDescribedby?: string;
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

const meta: Meta<FabArgs> = {
	title: 'UI/Fab',
	component: Fab,
	parameters: {
		layout: 'padded',
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
			control: 'radio',
			options: ['filled', 'outlined', 'ghost', 'glass'],
			description: 'Visual style variant'
		},
		position: {
			control: 'radio',
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
		// ArgTypes for additional event handlers
		onclick: {
			action: 'clicked',
			description: 'Click event'
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
type Story = StoryObj<FabArgs>;

// Icon only (default)
export const Default: Story = {
	args: {
		icon: 'add',
		position: 'right'
	}
};

// Different positions
export const PositionLeft: Story = {
	args: {
		icon: 'favorite',
		position: 'left'
	}
};

export const PositionCenter: Story = {
	args: {
		icon: 'share',
		position: 'center'
	}
};

// Custom color
export const CustomColor: Story = {
	args: {
		icon: 'delete',
		color: '#f44336',
		position: 'right'
	}
};

// Disabled state
export const Disabled: Story = {
	args: {
		icon: 'add',
		disabled: true,
		position: 'right'
	}
};

// Loading state
export const Loading: Story = {
	args: {
		icon: 'add',
		loading: true,
		position: 'right'
	}
};

// With shadow
export const WithShadow: Story = {
	args: {
		icon: 'add',
		position: 'right',
		shadow: true
	}
};

// Helper function to create snippet for children
const createChildrenSnippet = (text: string) =>
	createRawSnippet(() => ({
		render: () => text
	}));

// FAB with label
export const WithLabel: Story = {
	args: {
		icon: 'edit',
		position: 'center',
		children: createChildrenSnippet('Edit')
	}
};
