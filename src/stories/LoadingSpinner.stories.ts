import type { Meta, StoryObj } from '@storybook/sveltekit';
import LoadingSpinner from '../lib/components/LoadingSpinner.svelte';

interface LoadingSpinnerArgs {
	size?: number;
	color?: string;
	strokeWidth?: number;
	speed?: number;
	reducedMotion?: boolean;
}

const meta: Meta<LoadingSpinnerArgs> = {
	title: 'UI/LoadingSpinner',
	component: LoadingSpinner,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'ローディング表示用のスピナーコンポーネント。速度と色のカスタマイズが可能です。'
			}
		}
	},
	tags: ['autodocs'],
	// Enable reactive updates for bindable props
	render: (args) => ({
		Component: LoadingSpinner,
		props: args
	}),
	argTypes: {
		size: {
			control: 'number',
			description: 'サイズ（ピクセル）'
		},
		color: {
			control: 'color',
			description: 'スピナーの色'
		},
		strokeWidth: {
			control: 'number',
			description: 'ストロークの幅（ピクセル）'
		},
		speed: {
			control: { type: 'range', min: 0.1, max: 5, step: 0.1 },
			description: 'アニメーション速度（1が標準）'
		},
		reducedMotion: {
			control: 'boolean',
			description: 'アニメーションを無効化（アクセシビリティ対応）'
		}
	}
};

export default meta;
type Story = StoryObj<LoadingSpinnerArgs>;

// 基本パターン
export const Default: Story = {
	args: {}
};
