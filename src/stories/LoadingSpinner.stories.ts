import type { Meta, StoryObj } from '@storybook/sveltekit';
import LoadingSpinner from '../lib/components/LoadingSpinner.svelte';

interface LoadingSpinnerArgs {
	size?: number;
	color?: string;
	strokeWidth?: number;
	speed?: number;
	reducedMotion?: boolean;
}

const meta: Meta<LoadingSpinnerArgs> = {
	title: 'UI/LoadingSpinner',
	component: LoadingSpinner,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A loading spinner component for indicating pending operations. Size, color, stroke width, and speed can be customized.'
			}
		}
	},
	tags: ['autodocs'],
	// Enable reactive updates for bindable props
	render: (args) => ({
		Component: LoadingSpinner,
		props: args
	}),
	argTypes: {
		size: {
			control: 'number',
			description: 'Size of the spinner in pixels'
		},
		color: {
			control: 'color',
			description: 'Spinner color'
		},
		strokeWidth: {
			control: 'number',
			description: 'Stroke width in pixels'
		},
		speed: {
			control: { type: 'range', min: 0.1, max: 5, step: 0.1 },
			description: 'Animation speed multiplier (1 is default)'
		},
		reducedMotion: {
			control: 'boolean',
			description: 'Disable animation for reduced motion / accessibility'
		}
	}
};

export default meta;
type Story = StoryObj<LoadingSpinnerArgs>;

// 基本パターン
export const Default: Story = {
	args: {}
};
