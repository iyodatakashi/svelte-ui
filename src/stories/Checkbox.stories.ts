import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import Checkbox from '../lib/components/Checkbox.svelte';

const meta = {
	title: 'Forms/Checkbox',
	component: Checkbox,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A customizable checkbox component with accessibility features, error/success states, and size variants.'
			}
		}
	},
	tags: ['autodocs'],
	// Enable reactive updates for bindable props
	render: (args) => ({
		Component: Checkbox,
		props: args
	}),
	argTypes: {
		value: {
			control: { type: 'boolean' },
			description: 'Checked state'
		},
		children: {
			control: false,
			description: 'Label or content next to the checkbox'
		},
		id: {
			control: { type: 'text' },
			description: 'ID for the input element'
		},
		indeterminate: {
			control: { type: 'boolean' },
			description: 'Indeterminate (mixed) state'
		},
		name: {
			control: { type: 'text' },
			description: 'Form field name attribute'
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Whether the checkbox is disabled'
		},
		required: {
			control: { type: 'boolean' },
			description: 'Whether the field is required'
		},
		size: {
			control: { type: 'radio' },
			options: ['small', 'medium', 'large'],
			description: 'Size variant of the checkbox'
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
} satisfies Meta<typeof Checkbox>;

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
		value: false,
		children: createChildrenSnippet('I agree to the terms and conditions')
	}
};

// Checked
export const Checked: Story = {
	args: {
		value: true,
		children: createChildrenSnippet('Checked')
	}
};

// Indeterminate
export const Indeterminate: Story = {
	args: {
		value: false,
		indeterminate: true,
		children: createChildrenSnippet('Indeterminate')
	}
};

// Size variants
export const Small: Story = {
	args: {
		value: false,
		size: 'small',
		children: createChildrenSnippet('Small')
	}
};
export const Large: Story = {
	args: {
		value: false,
		size: 'large',
		children: createChildrenSnippet('Large')
	}
};

// Disabled
export const Disabled: Story = {
	args: {
		value: false,
		disabled: true,
		children: createChildrenSnippet('Disabled')
	}
};
