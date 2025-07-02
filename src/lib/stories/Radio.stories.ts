import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import Radio from '../components/Radio.svelte';

// 型安全性のための明示的な型定義
interface RadioArgs {
	name: string;
	value: string | number | boolean;
	currentValue: string | number | boolean | null;
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
	onchange?: (value: string | number | boolean, event: Event) => void;
}

const meta: Meta<RadioArgs> = {
	title: 'Forms/Radio',
	component: Radio,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A customizable radio button component with accessibility features, error/success states, and size variants.'
			}
		}
	},
	tags: ['autodocs'],
	// Enable reactive updates for bindable props
	render: (args) => ({
		Component: Radio,
		props: args
	}),
	argTypes: {
		name: {
			control: 'text',
			description: 'Name attribute for the radio group'
		},
		value: {
			control: 'text',
			description: 'Value of this radio option'
		},
		currentValue: {
			control: 'text',
			description: 'Currently selected value in the group'
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the radio is disabled'
		},
		required: {
			control: 'boolean',
			description: 'Whether the radio group is required'
		},
		readonly: {
			control: 'boolean',
			description: 'Whether the radio is readonly'
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
			description: 'Size variant of the radio'
		},
		error: {
			control: 'text',
			description: 'Error message to display'
		},
		success: {
			control: 'text',
			description: 'Success message to display'
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
type Story = StoryObj<RadioArgs>;

// Helper function to create snippet for children
const createChildrenSnippet = (text: string) =>
	createRawSnippet(() => ({
		render: () => text
	}));

// Default (unchecked)
export const Default: Story = {
	args: {
		name: 'default-group',
		value: 'option1',
		currentValue: null,
		children: createChildrenSnippet('Option 1')
	}
};

// Checked
export const Checked: Story = {
	args: {
		name: 'checked-group',
		value: 'option1',
		currentValue: 'option1',
		children: createChildrenSnippet('Checked')
	}
};

// Size variants
export const Small: Story = {
	args: {
		name: 'size-group',
		value: 'small',
		currentValue: null,
		size: 'small',
		children: createChildrenSnippet('Small')
	}
};
export const Large: Story = {
	args: {
		name: 'size-group',
		value: 'large',
		currentValue: null,
		size: 'large',
		children: createChildrenSnippet('Large')
	}
};

// Disabled
export const Disabled: Story = {
	args: {
		name: 'disabled-group',
		value: 'option1',
		currentValue: null,
		disabled: true,
		children: createChildrenSnippet('Disabled')
	}
};

// Error
export const WithError: Story = {
	args: {
		name: 'error-group',
		value: 'option1',
		currentValue: null,
		error: 'Please select an option',
		children: createChildrenSnippet('With error')
	}
};

// Success
export const WithSuccess: Story = {
	args: {
		name: 'success-group',
		value: 'option1',
		currentValue: 'option1',
		success: 'Selection confirmed',
		children: createChildrenSnippet('With success')
	}
};

// Required
export const Required: Story = {
	args: {
		name: 'required-group',
		value: 'option1',
		currentValue: null,
		required: true,
		error: 'This field is required',
		children: createChildrenSnippet('Required *')
	}
};

// Readonly
export const ReadOnly: Story = {
	args: {
		name: 'readonly-group',
		value: 'option1',
		currentValue: 'option1',
		readonly: true,
		children: createChildrenSnippet('Readonly')
	}
};

// Reduced motion
export const ReducedMotion: Story = {
	args: {
		name: 'motion-group',
		value: 'option1',
		currentValue: null,
		reducedMotion: true,
		children: createChildrenSnippet('Reduced motion')
	}
};

// String value
export const StringValue: Story = {
	args: {
		name: 'string-values',
		value: 'medium',
		currentValue: 'medium',
		children: createChildrenSnippet('String value')
	}
};
// Number value
export const NumberValue: Story = {
	args: {
		name: 'number-values',
		value: 5,
		currentValue: 5,
		children: createChildrenSnippet('Number value')
	}
};
// Boolean value
export const BooleanValue: Story = {
	args: {
		name: 'boolean-values',
		value: true,
		currentValue: true,
		children: createChildrenSnippet('Boolean value')
	}
};

// Playground (全props操作用)
export const Playground: Story = {
	args: {
		name: 'playground',
		value: 'test-value',
		currentValue: null,
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
		Component: Radio,
		props: {
			...args,
			children: createChildrenSnippet('Customizable radio')
		}
	})
};
