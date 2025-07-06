import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import Fab from '../components/Fab.svelte';

// 型安全性のための明示的な型定義
interface FabArgs {
	children?: Snippet;
	icon?: string;
	color?: string;
	variant?: 'filled' | 'outlined' | 'text';
	position?: 'left' | 'center' | 'right';
	shadow?: boolean;
	disabled?: boolean;
	loading?: boolean;
	reducedMotion?: boolean;
	iconFill?: boolean;
	ariaLabel?: string;
	ariaDescribedby?: string;
	onclick?: (event: MouseEvent & { currentTarget: HTMLButtonElement }) => void;
	onfocus?: (event: FocusEvent & { currentTarget: HTMLButtonElement }) => void;
	onblur?: (event: FocusEvent & { currentTarget: HTMLButtonElement }) => void;
	onkeydown?: (event: KeyboardEvent & { currentTarget: HTMLButtonElement }) => void;
}

const meta: Meta<FabArgs> = {
	title: 'Actions/Fab',
	component: Fab,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'Floating Action Button (FAB) - A Button variant positioned as a floating element, typically used for primary actions.'
			}
		}
	},
	tags: ['autodocs'],
	// Enable reactive updates for bindable props
	render: (args) => ({
		Component: Fab,
		props: args
	}),
	argTypes: {
		position: {
			control: 'select',
			options: ['left', 'center', 'right'],
			description: 'Position of the FAB on screen'
		},
		icon: {
			control: 'text',
			description: 'Material Symbol icon name'
		},
		color: {
			control: 'color',
			description: 'Custom color (optional)'
		},
		disabled: {
			control: 'boolean',
			description: 'Disabled state'
		},
		loading: {
			control: 'boolean',
			description: 'Loading state'
		},
		shadow: {
			control: 'boolean',
			description: 'Whether to show drop shadow'
		}
	}
};

export default meta;
type Story = StoryObj<FabArgs>;

// アイコンのみ（標準）
export const Default: Story = {
	args: {
		icon: 'add',
		position: 'right',
		disabled: false,
		loading: false,
		shadow: true
	}
};

// 異なるポジション
export const PositionLeft: Story = {
	args: {
		icon: 'favorite',
		position: 'left',
		disabled: false
	}
};

export const PositionCenter: Story = {
	args: {
		icon: 'share',
		position: 'center',
		disabled: false
	}
};

// カスタムカラー
export const CustomColor: Story = {
	args: {
		icon: 'delete',
		color: '#f44336',
		position: 'right',
		disabled: false
	}
};

// 無効状態
export const Disabled: Story = {
	args: {
		icon: 'add',
		disabled: true,
		position: 'right'
	}
};

// ローディング状態
export const Loading: Story = {
	args: {
		icon: 'add',
		loading: true,
		position: 'right'
	}
};

// シャドウなし
export const NoShadow: Story = {
	args: {
		icon: 'add',
		shadow: false,
		position: 'right',
		disabled: false
	}
};

// Helper function to create snippet for children
const createChildrenSnippet = (text: string) =>
	createRawSnippet(() => ({
		render: () => text
	}));

// ラベル付きFab
export const WithLabel: Story = {
	args: {
		icon: 'edit',
		position: 'center',
		color: '#6750a4',
		disabled: false,
		children: createChildrenSnippet('Edit')
	}
};

// ラベル付きFab（長いテキスト）
export const WithLongLabel: Story = {
	args: {
		icon: 'download',
		position: 'center',
		color: '#6750a4',
		disabled: false,
		children: createChildrenSnippet('Download File')
	}
};
