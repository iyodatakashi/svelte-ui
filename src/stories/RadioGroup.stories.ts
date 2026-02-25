import type { Meta, StoryObj } from '@storybook/sveltekit';
import RadioGroup from '../lib/components/RadioGroup.svelte';
import type { Option, OptionValue } from '../lib/types/options';

interface RadioGroupArgs {
	name?: string;
	options: Option[];
	value: OptionValue;
	direction?: 'vertical' | 'horizontal';
	gap?: string | number;
	wrap?: boolean;
	minOptionWidth?: string | number;
	onchange?: (value: OptionValue) => void;
}

const meta: Meta<RadioGroupArgs> = {
	title: 'Forms/RadioGroup',
	component: RadioGroup,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A radio group component that manages multiple radio buttons with flexible layout options.'
			}
		}
	},
	tags: ['autodocs'],
	render: (args) => ({
		Component: RadioGroup,
		props: args
	}),
	argTypes: {
		name: {
			control: { type: 'text' },
			description: 'Group name'
		},
		options: {
			control: { type: 'object' },
			description: 'Array of radio options'
		},
		value: {
			control: { type: 'text' },
			description: 'Currently selected value'
		},
		direction: {
			control: { type: 'radio' },
			options: ['vertical', 'horizontal'],
			description: 'Layout direction (vertical or horizontal)'
		},
		gap: {
			control: { type: 'text' },
			description: 'Gap between items (CSS length)'
		},
		wrap: {
			control: { type: 'boolean' },
			description: 'Enable wrapping when items overflow'
		},
		minOptionWidth: {
			control: { type: 'text' },
			description: 'Minimum width for each option'
		},
		onchange: {
			action: 'changed',
			description: 'Change event when selection updates'
		}
	}
};

export default meta;
type Story = StoryObj<RadioGroupArgs>;

const sampleOptions: Option[] = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
	{ label: 'Option 3', value: 'option3' },
	{ label: 'Option 4', value: 'option4' }
];

export const Default: Story = {
	args: {
		options: sampleOptions
	}
};

export const Vertical: Story = {
	args: {
		options: sampleOptions,
		direction: 'vertical'
	}
};

export const Horizontal: Story = {
	args: {
		options: sampleOptions,
		direction: 'horizontal'
	}
};

export const WithWrap: Story = {
	args: {
		options: [
			{ label: 'Option 1', value: 'option1' },
			{ label: 'Option 2', value: 'option2' },
			{ label: 'Option 3', value: 'option3' },
			{ label: 'Option 4', value: 'option4' },
			{ label: 'Option 5', value: 'option5' },
			{ label: 'Option 6', value: 'option6' },
			{ label: 'Option 7', value: 'option7' },
			{ label: 'Option 8', value: 'option8' }
		],
		direction: 'horizontal',
		wrap: true,
		minOptionWidth: '150px'
	}
};

export const PreSelected: Story = {
	args: {
		options: sampleOptions,
		value: 'option2'
	}
};

export const WithCustomGap: Story = {
	args: {
		options: sampleOptions,
		direction: 'vertical',
		gap: '32px'
	}
};

