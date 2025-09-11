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
		patterns: [{ type: 'text', lines: 3 }]
	}
};

export const AvatarList: Story = {
	args: {
		patterns: [{ type: 'avatar', showName: true }],
		repeat: 3
	}
};

export const MediaList: Story = {
	args: {
		patterns: [{ type: 'media' }],
		repeat: 3
	}
};

export const Text: Story = {
	args: {
		patterns: [{ type: 'text', lines: 3 }],
		repeat: 3
	}
};

export const Buttons: Story = {
	args: {
		patterns: [{ type: 'button', repeat: 2, direction: 'horizontal', repeatGap: '16px' }],
		repeat: 1
	}
};

export const SNSPost: Story = {
	args: {
		patterns: [
			{ type: 'avatar', showName: true },
			{ type: 'text', lines: 3 },
			{ type: 'button', repeat: 3, direction: 'horizontal', repeatGap: '12px' }
		],
		repeat: 3,
		itemGap: '8px',
		gap: '32px'
	}
};

export const NoAnimation: Story = {
	args: {
		patterns: [{ type: 'text' }],
		animated: false
	}
};

export const ProductList: Story = {
	args: {
		patterns: [
			{
				type: 'media',
				thumbnailConfig: { width: '100px', height: '100px' },
				textConfig: { lines: 2 }
			}
		],
		repeat: 4,
		gap: '24px'
	}
};

export const VideoList: Story = {
	args: {
		patterns: [
			{
				type: 'media',
				thumbnailConfig: { width: '160px', height: '90px' },
				textConfig: { lines: 1 }
			}
		],
		repeat: 3,
		gap: '20px'
	}
};
