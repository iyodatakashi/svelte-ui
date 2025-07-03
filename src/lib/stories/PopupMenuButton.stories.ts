import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import type { MenuItem } from '../types/MenuItem';
import PopupMenuButton from '../components/PopupMenuButton.svelte';

// 型安全性のための明示的な型定義
interface PopupMenuButtonArgs {
	children?: Snippet;
	menuItems: (MenuItem | 'separator')[];
}

const meta: Meta<PopupMenuButtonArgs> = {
	title: 'UI/PopupMenuButton',
	component: PopupMenuButton,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A button that opens a popup menu when clicked. Combines IconButton with PopupMenu functionality.'
			}
		}
	},
	tags: ['autodocs'],
	render: (args) => ({
		Component: PopupMenuButton,
		props: args
	}),
	argTypes: {
		menuItems: {
			control: 'object',
			description: 'Array of menu items or separators'
		},
		// Snippetはコントロールから除外
		children: {
			control: false,
			description: 'Custom button content (defaults to more_vert icon)'
		}
	}
};

export default meta;
type Story = StoryObj<PopupMenuButtonArgs>;

// Helper function to create snippet for children
const createChildrenSnippet = (iconName: string) =>
	createRawSnippet(() => ({
		render: () => iconName
	}));

// Default (three dots menu)
export const Default: Story = {
	args: {
		menuItems: [
			{
				title: 'Edit',
				icon: 'edit',
				callback: () => alert('Edit clicked')
			},
			{
				title: 'Copy',
				icon: 'content_copy',
				callback: () => alert('Copy clicked')
			},
			'separator',
			{
				title: 'Delete',
				icon: 'delete',
				callback: () => alert('Delete clicked')
			}
		]
	}
};

// Custom icon
export const CustomIcon: Story = {
	args: {
		children: createChildrenSnippet('settings'),
		menuItems: [
			{
				title: 'General',
				icon: 'tune',
				callback: () => alert('General settings')
			},
			{
				title: 'Account',
				icon: 'account_circle',
				callback: () => alert('Account settings')
			},
			{
				title: 'Privacy',
				icon: 'privacy_tip',
				callback: () => alert('Privacy settings')
			},
			'separator',
			{
				title: 'About',
				icon: 'info',
				callback: () => alert('About')
			}
		]
	}
};

// File operations menu
export const FileOperations: Story = {
	args: {
		children: createChildrenSnippet('folder'),
		menuItems: [
			{
				title: 'New File',
				icon: 'add',
				callback: () => alert('New File')
			},
			{
				title: 'Open',
				icon: 'folder_open',
				callback: () => alert('Open')
			},
			'separator',
			{
				title: 'Save',
				icon: 'save',
				callback: () => alert('Save')
			},
			{
				title: 'Save As...',
				icon: 'save_as',
				callback: () => alert('Save As')
			},
			'separator',
			{
				title: 'Export',
				icon: 'file_download',
				callback: () => alert('Export')
			},
			{
				title: 'Print',
				icon: 'print',
				callback: () => alert('Print')
			}
		]
	}
};

// User menu
export const UserMenu: Story = {
	args: {
		children: createChildrenSnippet('account_circle'),
		menuItems: [
			{
				title: 'Profile',
				icon: 'person',
				href: '/profile'
			},
			{
				title: 'Settings',
				icon: 'settings',
				href: '/settings'
			},
			'separator',
			{
				title: 'Help',
				icon: 'help',
				callback: () => alert('Help')
			},
			{
				title: 'Feedback',
				icon: 'feedback',
				callback: () => alert('Feedback')
			},
			'separator',
			{
				title: 'Logout',
				icon: 'logout',
				callback: () => alert('Logout')
			}
		]
	}
};

// Context menu (right-click style)
export const ContextMenu: Story = {
	args: {
		children: createChildrenSnippet('more_horiz'),
		menuItems: [
			{
				title: 'View Details',
				icon: 'info',
				callback: () => alert('View Details')
			},
			{
				title: 'Rename',
				icon: 'edit',
				callback: () => alert('Rename')
			},
			{
				title: 'Duplicate',
				icon: 'content_copy',
				callback: () => alert('Duplicate')
			},
			'separator',
			{
				title: 'Move to Folder',
				icon: 'drive_file_move',
				callback: () => alert('Move to Folder')
			},
			{
				title: 'Add to Favorites',
				icon: 'star',
				callback: () => alert('Add to Favorites')
			},
			'separator',
			{
				title: 'Share',
				icon: 'share',
				callback: () => alert('Share')
			},
			'separator',
			{
				title: 'Delete',
				icon: 'delete',
				callback: () => alert('Delete')
			}
		]
	}
};

// Simple menu without icons
export const WithoutIcons: Story = {
	args: {
		children: createChildrenSnippet('more_vert'),
		menuItems: [
			{
				title: 'Option A',
				callback: () => alert('Option A')
			},
			{
				title: 'Option B',
				callback: () => alert('Option B')
			},
			{
				title: 'Option C',
				callback: () => alert('Option C')
			}
		]
	}
};
