import type { Meta, StoryObj } from '@storybook/sveltekit';
import ConfirmDialog from '../components/ConfirmDialog.svelte';

// 型安全性のための明示的な型定義
interface ConfirmDialogArgs {
	title?: string;
	message?: string;
	confirmText?: string;
	cancelText?: string;
	variant?: 'info' | 'warning' | 'danger';
	width?: string | number;
	onConfirm?: () => void;
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
		confirmText: {
			control: 'text',
			description: 'Text for the confirm button'
		},
		cancelText: {
			control: 'text',
			description: 'Text for the cancel button'
		},
		variant: {
			control: 'select',
			options: ['info', 'warning', 'danger'],
			description: 'Visual variant of the confirmation dialog'
		},
		width: {
			control: 'text',
			description: 'Dialog width (number for pixels, string for calc/vw/% etc.)'
		},
		onConfirm: {
			action: 'confirmed',
			description: 'Callback when confirm button is clicked'
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
		confirmText: 'Confirm',
		cancelText: 'Cancel',
		variant: 'info',
		width: 400
	}
};

export const Warning: Story = {
	args: {
		title: 'Warning',
		message: 'This action may have unintended consequences. Do you want to continue?',
		confirmText: 'Continue',
		cancelText: 'Cancel',
		variant: 'warning',
		width: 450
	}
};

export const Danger: Story = {
	args: {
		title: 'Delete Item',
		message: 'This action cannot be undone. Are you sure you want to delete this item?',
		confirmText: 'Delete',
		cancelText: 'Cancel',
		variant: 'danger',
		width: 400
	}
};

export const CustomLabels: Story = {
	args: {
		title: 'Save Changes',
		message: 'You have unsaved changes. Would you like to save them before leaving?',
		confirmText: 'Save',
		cancelText: 'Discard',
		variant: 'info',
		width: 450
	}
};

export const LongMessage: Story = {
	args: {
		title: 'Terms and Conditions',
		message:
			'By clicking "Accept", you agree to our Terms of Service and Privacy Policy. This includes sharing your data with third-party services for analytics and improving our service. You can withdraw your consent at any time through your account settings.',
		confirmText: 'Accept',
		cancelText: 'Decline',
		variant: 'info',
		width: 500
	}
};

export const MinimalWidth: Story = {
	args: {
		title: 'Confirm',
		message: 'Continue?',
		confirmText: 'Yes',
		cancelText: 'No',
		variant: 'info',
		width: 300
	}
};

export const MessageWithLineBreaks: Story = {
	args: {
		title: 'Multi-line Message',
		message:
			'This is the first line of the message.\nThis is the second line.\n\nThis is after an empty line.\n\nPlease confirm your action.',
		confirmText: 'Confirm',
		cancelText: 'Cancel',
		variant: 'info',
		width: 450
	}
};
