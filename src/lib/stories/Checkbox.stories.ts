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
	onchange?: (value: boolean) => void;
}

const meta: Meta<CheckboxArgs> = {
	title: 'Forms/Checkbox',
	component: Checkbox,
	parameters: {
		layout: 'padded',
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
			control: { type: 'boolean' },
			description: 'チェック状態'
		},
		name: {
			control: { type: 'text' },
			description: 'フォームの名前属性'
		},
		disabled: {
			control: { type: 'boolean' },
			description: '無効状態'
		},
		required: {
			control: { type: 'boolean' },
			description: '必須項目'
		},
		size: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large'],
			description: 'サイズ'
		},
		reducedMotion: {
			control: { type: 'boolean' },
			description: 'アニメーション無効化'
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
