import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import type { MenuItem } from '../types/MenuItem';
import PopupMenuButton from '../components/PopupMenuButton.svelte';

// 型安全性のための明示的な型定義
interface PopupMenuButtonArgs {
	children?: Snippet;
	menuItems: (MenuItem | 'separator')[];
	position?:
		| 'top'
		| 'bottom'
		| 'left'
		| 'right'
		| 'top-left'
		| 'top-center'
		| 'top-right'
		| 'bottom-left'
		| 'bottom-center'
		| 'bottom-right'
		| 'left-top'
		| 'left-center'
		| 'left-bottom'
		| 'right-top'
		| 'right-center'
		| 'right-bottom'
		| 'auto';
}

const meta: Meta<PopupMenuButtonArgs> = {
	title: 'UI/PopupMenuButton',
	component: PopupMenuButton,
	parameters: {
		layout: 'padded',
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
		position: {
			control: 'select',
			options: [
				'auto',
				'top',
				'bottom',
				'left',
				'right',
				'top-left',
				'top-center',
				'top-right',
				'bottom-left',
				'bottom-center',
				'bottom-right',
				'left-top',
				'left-center',
				'left-bottom',
				'right-top',
				'right-center',
				'right-bottom'
			],
			description: 'Position of popup menu relative to button. Use "auto" for optimal positioning.'
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

// === NEW POSITIONING FEATURES ===

// Auto positioning demo
export const AutoPositioning: Story = {
	args: {
		position: 'auto',
		children: createChildrenSnippet('auto_fix_high'),
		menuItems: [
			{
				title: '🤖 Auto Position',
				icon: 'auto_fix_high',
				callback: () => alert('Auto positioning finds the best spot!')
			},
			{
				title: 'Smart Placement',
				icon: 'psychology',
				callback: () => alert('Automatically adjusts to viewport')
			},
			'separator',
			{
				title: 'Try moving to screen edges',
				icon: 'info',
				callback: () =>
					alert('Position this button near screen edges to see auto positioning in action')
			}
		]
	},
	parameters: {
		docs: {
			description: {
				story:
					'Auto positioning automatically selects the best position based on available viewport space. Try moving this button to different screen edges!'
			}
		}
	}
};

// Corner positioning examples
export const TopLeftPosition: Story = {
	args: {
		position: 'top-left',
		children: createChildrenSnippet('north_west'),
		menuItems: [
			{
				title: '📍 Top-Left',
				icon: 'north_west',
				callback: () => alert('Top-Left aligned')
			},
			{
				title: 'Corner alignment',
				callback: () => alert('Aligned to top-left corner')
			}
		]
	}
};

export const BottomRightPosition: Story = {
	args: {
		position: 'bottom-right',
		children: createChildrenSnippet('south_east'),
		menuItems: [
			{
				title: '📍 Bottom-Right',
				icon: 'south_east',
				callback: () => alert('Bottom-Right aligned')
			},
			{
				title: 'Corner alignment',
				callback: () => alert('Aligned to bottom-right corner')
			}
		]
	}
};

// Side positioning examples
export const LeftTopPosition: Story = {
	args: {
		position: 'left-top',
		children: createChildrenSnippet('keyboard_arrow_left'),
		menuItems: [
			{
				title: '← Left-Top',
				icon: 'keyboard_arrow_left',
				callback: () => alert('Left side, top aligned')
			},
			{
				title: 'Side placement',
				callback: () => alert('Perfect for toolbar buttons')
			}
		]
	}
};

export const RightBottomPosition: Story = {
	args: {
		position: 'right-bottom',
		children: createChildrenSnippet('keyboard_arrow_right'),
		menuItems: [
			{
				title: 'Right-Bottom →',
				icon: 'keyboard_arrow_right',
				callback: () => alert('Right side, bottom aligned')
			},
			{
				title: 'Side placement',
				callback: () => alert('Great for contextual menus')
			}
		]
	}
};

// Position testing playground
export const PositionPlayground: Story = {
	args: {
		position: 'bottom',
		children: createChildrenSnippet('tune'),
		menuItems: [
			{
				title: '🎯 Position Test',
				icon: 'tune',
				callback: () => alert('Use the position control above to test different placements!')
			},
			'separator',
			{
				title: 'Available Positions:',
				icon: 'list'
			},
			{
				title: '• auto (smart)',
				callback: () => alert('Auto selects best position')
			},
			{
				title: '• 4 basic (top/bottom/left/right)',
				callback: () => alert('Traditional positioning')
			},
			{
				title: '• 12 detailed positions',
				callback: () => alert('Precise corner & side alignment')
			},
			'separator',
			{
				title: 'Test Instructions',
				icon: 'help',
				callback: () =>
					alert(
						'1. Use position control above\n2. Try all 17 positions\n3. Move to screen edges\n4. Test auto positioning'
					)
			}
		]
	},
	parameters: {
		docs: {
			description: {
				story:
					'Interactive playground for testing all positioning options. Use the position control in the Controls panel to test different placements.'
			}
		}
	}
};
