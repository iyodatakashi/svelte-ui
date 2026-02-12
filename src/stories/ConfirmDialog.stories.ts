import type { Meta, StoryObj } from '@storybook/sveltekit';
import ConfirmDialog from '../lib/components/ConfirmDialog.svelte';

// 型安全性のための明示的な型定義
interface ConfirmDialogArgs {
	title?: string;
	message?: string;
	submitLabel?: string;
	cancelLabel?: string;
	danger?: boolean;
	width?: string | number;
	onSubmit?: () => void;
	onCancel?: () => void;
}

const meta: Meta<ConfirmDialogArgs> = {
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
		Component: ConfirmDialog,
		props: args
	}),
	argTypes: {
		title: {
			control: 'text',
			description: 'Dialog title'
		},
		message: {
			control: 'text',
			description: 'Confirmation message to display'
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
		onSubmit: {
			action: 'submitted',
			description: 'Callback when submit button is clicked'
		},
		onCancel: {
			action: 'cancelled',
			description: 'Callback when cancel button is clicked'
		}
	}
};

export default meta;
type Story = StoryObj<ConfirmDialogArgs>;

export const Default: Story = {
	args: {
		title: 'Confirm Action',
		message: 'Are you sure you want to proceed?',
		submitLabel: 'Confirm',
		cancelLabel: 'Cancel',
		danger: false,
		width: 400
	}
};

export const Warning: Story = {
	args: {
		title: 'Warning',
		message: 'This action may have unintended consequences. Do you want to continue?',
		submitLabel: 'Continue',
		cancelLabel: 'Cancel',
		danger: false,
		width: 450
	}
};

export const Danger: Story = {
	args: {
		title: 'Delete Item',
		message: 'This action cannot be undone. Are you sure you want to delete this item?',
		submitLabel: 'Delete',
		cancelLabel: 'Cancel',
		danger: true,
		width: 400
	}
};

export const CustomLabels: Story = {
	args: {
		title: 'Save Changes',
		message: 'You have unsaved changes. Would you like to save them before leaving?',
		submitLabel: 'Save',
		cancelLabel: 'Discard',
		danger: false,
		width: 450
	}
};

export const LongMessage: Story = {
	args: {
		title: 'Terms and Conditions',
		message:
			'By clicking "Accept", you agree to our Terms of Service and Privacy Policy. This includes sharing your data with third-party services for analytics and improving our service. You can withdraw your consent at any time through your account settings.',
		submitLabel: 'Accept',
		cancelLabel: 'Decline',
		danger: false,
		width: 500
	}
};

export const MinimalWidth: Story = {
	args: {
		title: 'Confirm',
		message: 'Continue?',
		submitLabel: 'Yes',
		cancelLabel: 'No',
		danger: false,
		width: 300
	}
};

export const MessageWithLineBreaks: Story = {
	args: {
		title: 'Multi-line Message',
		message:
			'This is the first line of the message.\nThis is the second line.\n\nThis is after an empty line.\n\nPlease confirm your action.',
		submitLabel: 'Confirm',
		cancelLabel: 'Cancel',
		danger: false,
		width: 450
	}
};
