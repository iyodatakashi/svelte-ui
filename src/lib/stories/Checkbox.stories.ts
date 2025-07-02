import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import Checkbox from '../components/Checkbox.svelte';

// 型安全性のための明示的な型定義
interface CheckboxArgs {
	value: boolean;
	indeterminate?: boolean;
	name?: string;
	disabled?: boolean;
	required?: boolean;
	readonly?: boolean;
	error?: string | null;
	success?: string | null;
	size?: 'small' | 'medium' | 'large';
	reducedMotion?: boolean;
	children?: Snippet;
	onfocus?: (event: FocusEvent) => void;
	onblur?: (event: FocusEvent) => void;
	onchange?: (checked: boolean, event: Event) => void;
}

const meta: Meta<CheckboxArgs> = {
	title: 'Forms/Checkbox',
	component: Checkbox,
	parameters: {
		layout: 'centered',
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
			control: 'boolean',
			description: 'The checked state of the checkbox'
		},
		indeterminate: {
			control: 'boolean',
			description: 'Whether the checkbox is in an indeterminate state'
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the checkbox is disabled'
		},
		required: {
			control: 'boolean',
			description: 'Whether the checkbox is required'
		},
		readonly: {
			control: 'boolean',
			description: 'Whether the checkbox is readonly'
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
			description: 'Size variant of the checkbox'
		},
		error: {
			control: 'text',
			description: 'Error message to display'
		},
		success: {
			control: 'text',
			description: 'Success message to display'
		},
		name: {
			control: 'text',
			description: 'Name attribute for the checkbox input'
		},
		reducedMotion: {
			control: 'boolean',
			description: 'Disable animations for reduced motion'
		},
		// Snippetはコントロールから除外
		children: {
			control: false,
			description: 'Content to display as label'
		},
		// イベントハンドラもコントロールから除外
		onfocus: {
			control: false,
			action: 'focus'
		},
		onblur: {
			control: false,
			action: 'blur'
		},
		onchange: {
			control: false,
			action: 'change'
		}
	}
};

export default meta;
type Story = StoryObj<CheckboxArgs>;

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

// Error
export const WithError: Story = {
	args: {
		value: false,
		error: 'You must agree',
		children: createChildrenSnippet('With error')
	}
};

// Success
export const WithSuccess: Story = {
	args: {
		value: true,
		success: 'Success!',
		children: createChildrenSnippet('With success')
	}
};

// Required
export const Required: Story = {
	args: {
		value: false,
		required: true,
		error: 'This field is required',
		children: createChildrenSnippet('Required *')
	}
};

// Readonly
export const ReadOnly: Story = {
	args: {
		value: true,
		readonly: true,
		children: createChildrenSnippet('Readonly')
	}
};

// Reduced motion
export const ReducedMotion: Story = {
	args: {
		reducedMotion: true,
		value: false,
		children: createChildrenSnippet('Reduced motion')
	}
};

// Playground (全props操作用)
export const Playground: Story = {
	args: {
		value: false,
		indeterminate: false,
		disabled: false,
		required: false,
		readonly: false,
		size: 'medium',
		error: '',
		success: '',
		reducedMotion: false
		// children は除外してコントロールの問題を回避
	},
	render: (args) => ({
		Component: Checkbox,
		props: {
			...args,
			children: createChildrenSnippet('Customizable checkbox')
		}
	})
};
