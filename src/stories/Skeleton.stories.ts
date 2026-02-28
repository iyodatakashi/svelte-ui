import type { Meta, StoryObj } from '@storybook/svelte';
import Skeleton from '../lib/components/skeleton/Skeleton.svelte';

const meta = {
	title: 'UI/Skeleton',
	component: Skeleton,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A skeleton loading component that displays placeholder content with configurable patterns (box, text, avatar, media, etc.) and presets for common layouts.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		patterns: {
			control: 'object',
			description: 'Array of skeleton pattern configs (e.g. { type: "box" }, { type: "text", lines: 3 })'
		},
		repeat: {
			control: 'number',
			description: 'Number of times to repeat the pattern set'
		},
		repeatGap: {
			control: 'text',
			description: 'Gap between repeated pattern groups (CSS length)'
		},
		patternGap: {
			control: 'text',
			description: 'Gap between patterns within a group (CSS length)'
		},
		animated: {
			control: 'boolean',
			description: 'Whether to show loading animation'
		},
		customStyle: {
			control: 'text',
			description: 'Custom CSS styles for the wrapper'
		},
		className: {
			control: 'text',
			description: 'Additional CSS class for the wrapper'
		}
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

// Preset patterns
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
