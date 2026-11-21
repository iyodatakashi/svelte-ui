import type { Meta, StoryObj } from '@storybook/sveltekit';
import TooltipExample from './TooltipExample.svelte';
import TooltipToolbarExample from './TooltipToolbarExample.svelte';

const meta = {
	title: 'UI/Tooltip',
	component: TooltipExample,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A small label that describes the wrapped element. It appears 0.4 seconds after the pointer rests on the element, and at once when the element gets keyboard focus. The text is also read as the element’s description (`aria-describedby`).'
			}
		}
	},
	tags: ['autodocs'],
	render: (args) => ({
		Component: TooltipExample,
		props: args
	}),
	argTypes: {
		text: {
			control: 'text',
			description: 'Text of the tooltip'
		},
		id: {
			control: 'text',
			description: 'ID of the tooltip element'
		},
		customStyle: {
			control: 'text',
			description: 'Inline style for the tooltip label'
		},
		position: {
			control: 'radio',
			options: ['top', 'bottom', 'left', 'right'],
			description: 'Side of the target to show on. Flips when there is no room.'
		},
		margin: {
			control: 'number',
			description: 'Gap in pixels between the target and the tooltip'
		},
		delay: {
			control: 'number',
			description: 'Delay in milliseconds before showing on hover'
		}
	}
} satisfies Meta<typeof TooltipExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		text: 'Bold (⌘B)'
	}
};

export const Top: Story = {
	args: {
		text: 'Bold (⌘B)',
		position: 'top'
	}
};

export const Left: Story = {
	args: {
		text: 'Bold (⌘B)',
		position: 'left'
	}
};

export const Right: Story = {
	args: {
		text: 'Bold (⌘B)',
		position: 'right'
	}
};

export const LongText: Story = {
	args: {
		text: 'Long descriptions wrap at --svelte-ui-tooltip-max-width instead of running off the screen.'
	}
};

export const Toolbars: Story = {
	render: (args) => ({
		Component: TooltipToolbarExample,
		props: args
	}),
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				story:
					'Toolbars placed on each edge show their tooltips on the side facing away from the edge.'
			}
		}
	}
};
