import type { Meta, StoryObj } from '@storybook/svelte';
import Skeleton from '../components/skelton/Skeleton.svelte';

const meta = {
	title: 'Components/Skeleton',
	component: Skeleton,
	parameters: {
		layout: 'padded'
	}
} satisfies Meta<Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		patterns: [{ type: 'text' }]
	}
};

export const UserList: Story = {
	args: {
		patterns: [{ type: 'avatar', showName: true }],
		repeat: 3
	}
};

export const ArticleList: Story = {
	args: {
		patterns: [{ type: 'article' }],
		repeat: 3
	}
};

export const Text: Story = {
	args: {
		patterns: [{ type: 'text' }],
		repeat: 3
	}
};

export const Buttons: Story = {
	args: {
		patterns: [{ type: 'buttons', count: 3 }],
		repeat: 1
	}
};

export const SNSPost: Story = {
	args: {
		patterns: [
			{ type: 'avatar', showName: true },
			{ type: 'text', lines: 3 }
		],
		repeat: 3,
		itemGap: '8px',
		gap: '32px'
	}
};

export const NoAnimation: Story = {
	args: {
		patterns: [{ type: 'text', animated: false }]
	}
};
