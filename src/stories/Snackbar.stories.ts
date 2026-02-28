import type { Meta, StoryObj } from '@storybook/sveltekit';
import Snackbar, { type SnackbarProps } from '../lib/components/Snackbar.svelte';
import SnackbarExample from './SnackbarExample.svelte';

/** Snackbar props + additional display options passed to snackbarManager (outside component props) */
type SnackbarStoryProps = SnackbarProps & {
	closable?: boolean;
	actionLabel?: string;
	color?: string;
	textColor?: string;
	iconVariant?: 'outlined' | 'rounded' | 'sharp';
};

const meta: Meta<SnackbarStoryProps> = {
	title: 'UI/Snackbar',
	component: Snackbar,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A snackbar component that displays brief notifications at the top or bottom of the screen. Supports position, max visible count, filled/outlined variant, duration, and optional close button or action.'
			}
		}
	},
	tags: ['autodocs'],
	render: (args) => ({
		Component: SnackbarExample,
		props: args
	}),
	argTypes: {
		position: {
			control: 'radio',
			options: ['bottom', 'top'],
			description: 'Vertical position of Snackbar (component prop)'
		},
		maxVisible: {
			control: 'number',
			description: 'Maximum number of snackbars visible at once (component prop)'
		},
		variant: {
			control: 'radio',
			options: ['filled', 'outlined'],
			description: 'Visual variant of Snackbar (component prop)'
		},
		duration: {
			control: 'number',
			description: 'Default display duration in milliseconds. 0 means persistent (component prop)'
		}
	}
};

export default meta;
type Story = StoryObj<SnackbarStoryProps>;

export const Default: Story = {
	args: {
		position: 'bottom',
		maxVisible: 5,
		variant: 'filled',
		duration: 3000,
		closable: false,
		actionLabel: '',
		color: '',
		textColor: '',
		iconVariant: 'outlined'
	}
};

