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
			description: 'グループ名'
		},
		options: {
			control: { type: 'object' },
			description: '選択肢の配列'
		},
		value: {
			control: { type: 'text' },
			description: '選択された値'
		},
		direction: {
			control: { type: 'select' },
			options: ['vertical', 'horizontal'],
			description: 'レイアウト方向'
		},
		gap: {
			control: { type: 'text' },
			description: 'アイテム間の間隔'
		},
		wrap: {
			control: { type: 'boolean' },
			description: '折り返しを有効にする'
		},
		minOptionWidth: {
			control: { type: 'text' },
			description: 'オプションの最小幅'
		},
		onchange: {
			action: 'changed',
			description: '変更イベント'
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
		options: sampleOptions,
		value: null
	}
};

export const Vertical: Story = {
	args: {
		options: sampleOptions,
		value: null,
		direction: 'vertical',
		gap: '16px'
	}
};

export const Horizontal: Story = {
	args: {
		options: sampleOptions,
		value: null,
		direction: 'horizontal',
		gap: '24px'
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
		value: null,
		direction: 'horizontal',
		gap: '16px',
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
		value: null,
		direction: 'vertical',
		gap: '32px'
	}
};

export const NumberValues: Story = {
	args: {
		options: [
			{ label: 'Small', value: 1 },
			{ label: 'Medium', value: 2 },
			{ label: 'Large', value: 3 }
		],
		value: 2
	}
};

export const Playground: Story = {
	args: {
		options: sampleOptions,
		value: null,
		direction: 'vertical',
		gap: '16px',
		wrap: false,
		minOptionWidth: undefined
	}
};

