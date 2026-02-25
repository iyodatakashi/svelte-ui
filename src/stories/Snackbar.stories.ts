import type { Meta, StoryObj } from '@storybook/sveltekit';
import Snackbar, { type SnackbarProps } from '../lib/components/Snackbar.svelte';
import SnackbarExample from './SnackbarExample.svelte';

/** Snackbar の props + 表示時に snackbarManager に渡すオプション（properties 外） */
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
				component: `
\`<Snackbar>\` の props（\`position\`, \`maxVisible\`, \`variant\`, \`duration\`）と、
properties 外の表示オプション（\`closable\`, \`actionLabel\`, \`color\`, \`textColor\`, \`iconVariant\`）を Controls で変更できます。
				`
			}
		}
	},
	tags: ['autodocs'],
	render: (args) => ({
		Component: SnackbarExample,
		props: args
	}),
	argTypes: {
		// ---- Snackbar コンポーネントの props ----
		position: {
			control: 'radio',
			options: ['bottom', 'top'],
			description: 'Snackbar の表示位置（Snackbar の props）'
		},
		maxVisible: {
			control: 'number',
			description: '同時に表示できる最大件数（Snackbar の props）'
		},
		variant: {
			control: 'radio',
			options: ['filled', 'outlined'],
			description: '表示スタイルのバリアント（Snackbar の props）'
		},
		duration: {
			control: 'number',
			description: 'デフォルトの表示時間ミリ秒。0 で無期限（Snackbar の props）'
		},
		// ---- 表示オプション（snackbarManager → SnackbarItem） ----
		closable: {
			control: 'boolean',
			description: '閉じるボタンを表示するか'
		},
		actionLabel: {
			control: 'text',
			description: 'アクションボタンのラベル。空ならボタンなし'
		},
		color: {
			control: 'color',
			description: 'SnackbarItem のカスタム色'
		},
		textColor: {
			control: 'color',
			description: 'SnackbarItem のカスタム文字色'
		},
		iconVariant: {
			control: 'radio',
			options: ['outlined', 'rounded', 'sharp'],
			description: 'SnackbarItem に渡すアイコンのバリアント（properties 外）'
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

