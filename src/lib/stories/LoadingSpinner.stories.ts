// src/lib/components/atoms/LoadingSpinner.stories.ts
import LoadingSpinner from '../components/LoadingSpinner.svelte';

const meta = {
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
	tags: ['autodocs']
};

export default meta;

// 基本パターン
export const Default = {
	render: () => ({
		Component: LoadingSpinner,
		props: {}
	})
};
