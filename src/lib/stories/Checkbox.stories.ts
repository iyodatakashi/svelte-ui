import type { Meta, StoryObj } from '@storybook/svelte';
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
	component: Checkbox as any, // 型キャストで互換性確保
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

// Custom render function to handle bindable props properly
const renderCheckbox = (args: CheckboxArgs) => {
	return {
		Component: Checkbox,
		props: args
	};
};

// Default story
export const Default: Story = {
	args: {
		value: false,
		children: createChildrenSnippet('I agree to the terms and conditions')
	}
};

// Checked state
export const Checked: Story = {
	args: {
		value: true,
		children: createChildrenSnippet('I agree to the terms and conditions')
	}
};

// Indeterminate state
export const Indeterminate: Story = {
	args: {
		value: false,
		indeterminate: true,
		children: createChildrenSnippet('Select all items (some selected)')
	}
};

// Size variants
export const Small: Story = {
	args: {
		value: false,
		size: 'small',
		children: createChildrenSnippet('Small checkbox')
	}
};

export const Medium: Story = {
	args: {
		value: false,
		size: 'medium',
		children: createChildrenSnippet('Medium checkbox (default)')
	}
};

export const Large: Story = {
	args: {
		value: false,
		size: 'large',
		children: createChildrenSnippet('Large checkbox')
	}
};

// Error state
export const WithError: Story = {
	args: {
		value: false,
		required: true,
		error: 'You must agree to the terms and conditions',
		children: createChildrenSnippet('I agree to the terms and conditions')
	}
};

// Success state
export const WithSuccess: Story = {
	args: {
		value: true,
		success: 'Email verification completed',
		children: createChildrenSnippet('Verify email address')
	}
};

// Disabled states
export const DisabledUnchecked: Story = {
	args: {
		value: false,
		disabled: true,
		children: createChildrenSnippet('Disabled unchecked')
	}
};

export const DisabledChecked: Story = {
	args: {
		value: true,
		disabled: true,
		children: createChildrenSnippet('Disabled checked')
	}
};

export const DisabledIndeterminate: Story = {
	args: {
		value: false,
		indeterminate: true,
		disabled: true,
		children: createChildrenSnippet('Disabled indeterminate')
	}
};

// Required field
export const RequiredField: Story = {
	args: {
		value: false,
		required: true,
		error: 'This field is required',
		children: createChildrenSnippet('I agree to the terms and conditions *')
	}
};

// Parent selection (indeterminate)
export const ParentSelection: Story = {
	args: {
		value: false,
		indeterminate: true,
		children: createChildrenSnippet('Select All (2/4 items selected)')
	}
};

// Reduced motion
export const ReducedMotion: Story = {
	args: {
		reducedMotion: true,
		value: false,
		children: createChildrenSnippet('Checkbox with reduced motion')
	}
};

// Readonly state
export const ReadOnly: Story = {
	args: {
		value: true,
		readonly: true,
		children: createChildrenSnippet('Readonly checkbox (cannot be changed)')
	}
};

// Interactive playground
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
