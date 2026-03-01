import type { Meta, StoryObj } from '@storybook/sveltekit';
import ConfirmDialog from '../lib/components/ConfirmDialog.svelte';
import ConfirmDialogExample from './ConfirmDialogExample.svelte';

const meta = {
	title: 'UI/ConfirmDialog',
	component: ConfirmDialog,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A specialized dialog component for confirmation actions. Built on top of the Dialog component with predefined buttons and variants for different types of confirmations.'
			}
		}
	},
	tags: ['autodocs'],
	render: (args) => ({
		Component: ConfirmDialogExample,
		props: args
	}),
	argTypes: {
		title: {
			control: 'text',
			description: 'Dialog title'
		},
		description: {
			control: 'text',
			description: 'Confirmation message to display (supports line breaks with \\n)'
		},
		submitLabel: {
			control: 'text',
			description: 'Text for the submit button'
		},
		cancelLabel: {
			control: 'text',
			description: 'Text for the cancel button'
		},
		danger: {
			control: 'boolean',
			description: 'Whether this is a dangerous action (uses danger color)'
		},
		width: {
			control: 'text',
			description: 'Dialog width (number for pixels, string for calc/vw/% etc.)'
		},
		scrollable: {
			control: 'boolean',
			description: 'Whether the dialog body is scrollable when content overflows'
		},
		closeIfClickOutside: {
			control: 'boolean',
			description: 'Whether to close dialog when clicking outside'
		},
		id: {
			control: 'text',
			description: 'ID for the dialog element'
		},
		isOpen: {
			control: 'boolean',
			description: 'Whether the dialog is open (bindable)'
		},
		onSubmit: {
			action: 'submitted',
			description: 'Callback when submit button is clicked'
		},
		onCancel: {
			action: 'cancelled',
			description: 'Callback when cancel button is clicked'
		}
	}
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {}
};

export const Danger: Story = {
	args: {
		title: 'Delete Item',
		description: 'This action cannot be undone. Are you sure you want to delete this item?',
		submitLabel: 'Delete',
		cancelLabel: 'Cancel',
		danger: true,
		width: 400
	}
};

export const Scrollable: Story = {
	args: {
		title: 'Terms and Conditions',
		description:
			'By clicking "Accept", you agree to our Terms of Service and Privacy Policy.\n\n' +
			'1. Acceptance of Terms\n' +
			'By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.\n\n' +
			'2. Use License\n' +
			'Permission is granted to temporarily access the materials on this service for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose; attempt to decompile or reverse engineer any software contained on this service; or remove any copyright or other proprietary notations from the materials.\n\n' +
			'3. Data and Privacy\n' +
			'We may collect and use your data for analytics, improving our service, and sharing with third-party service providers where necessary. You can withdraw your consent at any time through your account settings. We will not sell your personal information to third parties.\n\n' +
			'4. Disclaimer\n' +
			'The materials on this service are provided on an "as is" basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
		submitLabel: 'Accept',
		cancelLabel: 'Decline',
		scrollable: true,
		danger: false,
		width: 500
	}
};
