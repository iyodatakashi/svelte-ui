import type { Meta, StoryObj } from '@storybook/svelte';
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
	component: Radio as any, // 型キャストで互換性確保
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

// Default story
export const Default: Story = {
	args: {
		name: 'default-group',
		value: 'option1',
		currentValue: null,
		children: createChildrenSnippet('Option 1')
	}
};

// Selected state
export const Selected: Story = {
	args: {
		name: 'selected-group',
		value: 'option1',
		currentValue: 'option1',
		children: createChildrenSnippet('Selected Option')
	}
};

// Size variants
export const Small: Story = {
	args: {
		name: 'size-group',
		value: 'small',
		currentValue: null,
		size: 'small',
		children: createChildrenSnippet('Small radio')
	}
};

export const Medium: Story = {
	args: {
		name: 'size-group',
		value: 'medium',
		currentValue: null,
		size: 'medium',
		children: createChildrenSnippet('Medium radio (default)')
	}
};

export const Large: Story = {
	args: {
		name: 'size-group',
		value: 'large',
		currentValue: null,
		size: 'large',
		children: createChildrenSnippet('Large radio')
	}
};

// Error state
export const WithError: Story = {
	args: {
		name: 'error-group',
		value: 'option1',
		currentValue: null,
		required: true,
		error: 'Please select an option',
		children: createChildrenSnippet('Option with error')
	}
};

// Success state
export const WithSuccess: Story = {
	args: {
		name: 'success-group',
		value: 'option1',
		currentValue: 'option1',
		success: 'Selection confirmed',
		children: createChildrenSnippet('Option with success')
	}
};

// Disabled states
export const DisabledUnselected: Story = {
	args: {
		name: 'disabled-group',
		value: 'option1',
		currentValue: null,
		disabled: true,
		children: createChildrenSnippet('Disabled unselected')
	}
};

export const DisabledSelected: Story = {
	args: {
		name: 'disabled-group',
		value: 'option1',
		currentValue: 'option1',
		disabled: true,
		children: createChildrenSnippet('Disabled selected')
	}
};

// Required field
export const RequiredField: Story = {
	args: {
		name: 'required-group',
		value: 'option1',
		currentValue: null,
		required: true,
		error: 'This field is required',
		children: createChildrenSnippet('Required option *')
	}
};

// Readonly state
export const ReadOnly: Story = {
	args: {
		name: 'readonly-group',
		value: 'option1',
		currentValue: 'option1',
		readonly: true,
		children: createChildrenSnippet('Readonly radio (cannot be changed)')
	}
};

// Reduced motion
export const ReducedMotion: Story = {
	args: {
		name: 'motion-group',
		value: 'option1',
		currentValue: null,
		reducedMotion: true,
		children: createChildrenSnippet('Radio with reduced motion')
	}
};

// Radio group example - Option 1
export const RadioGroupOption1: Story = {
	args: {
		name: 'group-example',
		value: 'option1',
		currentValue: null,
		children: createChildrenSnippet('オプション 1')
	}
};

// Radio group example - Option 2
export const RadioGroupOption2: Story = {
	args: {
		name: 'group-example',
		value: 'option2',
		currentValue: null,
		children: createChildrenSnippet('オプション 2')
	}
};

// Radio group example - Option 3
export const RadioGroupOption3: Story = {
	args: {
		name: 'group-example',
		value: 'option3',
		currentValue: null,
		children: createChildrenSnippet('オプション 3')
	}
};

// Form example - Gender selection
export const FormGenderExample: Story = {
	args: {
		name: 'gender',
		value: 'male',
		currentValue: null,
		required: true,
		error: '性別の選択が必要です',
		children: createChildrenSnippet('男性')
	}
};

// Notification settings example
export const NotificationSettings: Story = {
	args: {
		name: 'notifications',
		value: 'email',
		currentValue: 'email',
		success: '設定が保存されました',
		children: createChildrenSnippet('メール通知のみ')
	}
};

// String value example
export const StringValueExample: Story = {
	args: {
		name: 'string-values',
		value: 'medium',
		currentValue: 'medium',
		children: createChildrenSnippet('Medium (selected)')
	}
};

// Number value example
export const NumberValueExample: Story = {
	args: {
		name: 'number-values',
		value: 5,
		currentValue: null,
		children: createChildrenSnippet('5個')
	}
};

// Boolean value example
export const BooleanValueExample: Story = {
	args: {
		name: 'boolean-values',
		value: true,
		currentValue: true,
		children: createChildrenSnippet('有効 (selected)')
	}
};

// Interactive playground
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
