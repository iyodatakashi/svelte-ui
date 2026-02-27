import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import Radio from '../lib/components/Radio.svelte';

const meta = {
	title: 'Forms/Radio',
	component: Radio,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A customizable radio button component with accessibility features, error/success states, and size variants.'
			}
		}
	},
	tags: ['autodocs'],
	// Enable reactive updates for bindable props
	render: (args) => ({
		Component: Radio,
		props: args
	}),
	argTypes: {
		name: {
			control: { type: 'text' },
			description: 'Group name the radio belongs to'
		},
		value: {
			control: { type: 'text' },
			description: 'Value represented by this radio'
		},
		currentValue: {
			control: { type: 'text' },
			description: 'Currently selected value in the group'
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Whether the radio is disabled'
		},
		required: {
			control: { type: 'boolean' },
			description: 'Mark the field as required'
		},
		size: {
			control: { type: 'radio' },
			options: ['small', 'medium', 'large'],
			description: 'Size variant of the radio'
		},
		reducedMotion: {
			control: { type: 'boolean' },
			description: 'Disable animations for reduced motion'
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
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create snippet for children
const createChildrenSnippet = (text: string) =>
	createRawSnippet(() => ({
		render: () => text
	}));

// Default (unchecked)
export const Default: Story = {
	args: {
		name: 'example',
		value: 'option1',
		currentValue: undefined,
		children: createChildrenSnippet('Option 1')
	}
};

// Checked
export const Checked: Story = {
	args: {
		name: 'example',
		value: 'option1',
		currentValue: 'option1',
		children: createChildrenSnippet('Checked')
	}
};

// Size variants
export const Small: Story = {
	args: {
		name: 'example',
		value: 'option1',
		currentValue: undefined,
		size: 'small',
		children: createChildrenSnippet('Small')
	}
};
export const Large: Story = {
	args: {
		name: 'example',
		value: 'option1',
		currentValue: undefined,
		size: 'large',
		children: createChildrenSnippet('Large')
	}
};

// Disabled
export const Disabled: Story = {
	args: {
		name: 'example',
		value: 'option1',
		currentValue: undefined,
		disabled: true,
		children: createChildrenSnippet('Disabled')
	}
};

