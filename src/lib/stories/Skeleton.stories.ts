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
		pattern: 'default',
		repeat: 1,
		animated: true,
		rounded: false
	}
};

export const Card: Story = {
	args: {
		pattern: 'card',
		repeat: 1,
		animated: true,
		rounded: true
	}
};

export const UserList: Story = {
	args: {
		pattern: 'user-list',
		repeat: 3,
		animated: true,
		rounded: false
	}
};

export const ItemList: Story = {
	args: {
		pattern: 'item-list',
		repeat: 3,
		animated: true,
		rounded: false
	}
};

export const MultipleCards: Story = {
	args: {
		pattern: 'card',
		repeat: 3,
		animated: true,
		rounded: true
	}
};

export const NoAnimation: Story = {
	args: {
		pattern: 'default',
		repeat: 1,
		animated: false,
		rounded: false
	}
};
