import type { Meta, StoryObj } from '@storybook/svelte';
import Skeleton from '../lib/components/skeleton/Skeleton.svelte';

const meta = {
	title: 'UI/Skeleton',
	component: Skeleton,
	parameters: {
		layout: 'padded'
	}
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {}
};

export const Box: Story = {
	args: {
		patterns: [{ type: 'box' }]
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
		patterns: [{ type: 'button', repeat: 2, repeatDirection: 'horizontal' }],
		repeat: 1
	}
};

export const Heading: Story = {
	args: {
		patterns: [{ type: 'heading' }]
	}
};

export const NoAnimation: Story = {
	args: {
		patterns: [{ type: 'text' }],
		animated: false
	}
};

// プリセットパターンのストーリー
export const ArticleDetailPreset: Story = {
	args: {
		patterns: [{ type: 'article-detail' }]
	}
};

export const ArticleListPreset: Story = {
	args: {
		patterns: [{ type: 'heading' }, { type: 'article-list', repeat: 3 }]
	}
};

export const ProductListPreset: Story = {
	args: {
		patterns: [{ type: 'product-list' }],
		repeat: 4
	}
};

export const VideoListPreset: Story = {
	args: {
		patterns: [{ type: 'video-list' }],
		repeat: 3
	}
};

export const UserListPreset: Story = {
	args: {
		patterns: [{ type: 'user-list', repeat: 5 }]
	}
};

export const ButtonGroupPreset: Story = {
	args: {
		patterns: [{ type: 'button-group' }],
		repeat: 1
	}
};
