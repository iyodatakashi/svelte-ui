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
		patterns: [{ type: 'button', repeat: 2, repeatDirection: 'horizontal', repeatGap: '16px' }],
		repeat: 1
	}
};

export const SNSPost: Story = {
	args: {
		patterns: [
			{ type: 'avatar', showName: true },
			{ type: 'text', lines: 3 },
			{ type: 'button', repeat: 3, repeatDirection: 'horizontal', repeatGap: '12px' }
		],
		repeat: 3
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
				thumbnailConfig: { width: '100%', aspectRatio: '16/9' },
				textConfig: { lines: 2 },
				layout: 'vertical',
				repeat: 3,
				repeatDirection: 'horizontal'
			}
		],
		repeat: 2,
		repeatGap: '24px'
	}
};

export const VideoList: Story = {
	args: {
		patterns: [
			{
				type: 'media',
				layout: 'horizontal',
				thumbnailConfig: { width: '160px', height: '90px' },
				textConfig: { lines: 1 }
			}
		],
		repeat: 3,
		repeatGap: '20px'
	}
};

export const VerticalMedia: Story = {
	args: {
		patterns: [
			{
				type: 'media'
			}
		]
	}
};

// プリセットパターンのストーリー
export const ArticleListPreset: Story = {
	args: {
		patterns: [
			{
				type: 'text',
				width: '240px',
				fontSize: '2rem'
			},
			{ presetPatterns: 'article-list', repeat: 3 }
		]
	}
};

export const ProductListPreset: Story = {
	args: {
		presetPatterns: 'product-list',
		repeat: 4
	}
};

export const VideoListPreset: Story = {
	args: {
		presetPatterns: 'video-list',
		repeat: 3
	}
};

export const UserListPreset: Story = {
	args: {
		presetPatterns: 'user-list',
		repeat: 5
	}
};

export const ButtonGroupPreset: Story = {
	args: {
		presetPatterns: 'button-group',
		repeat: 1
	}
};
