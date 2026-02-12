import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import type { MenuItem } from '../lib/types/menuItem';
import PopupMenuButton from '../lib/components/PopupMenuButton.svelte';

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
	variant?: 'filled' | 'outlined' | 'ghost' | 'glass';
	size?: number;
	color?: string;
	rounded?: boolean;
	// 新しいイベントハンドラ
	onfocus?: (event: FocusEvent) => void;
	onblur?: (event: FocusEvent) => void;
	onkeydown?: (event: KeyboardEvent) => void;
	onkeyup?: (event: KeyboardEvent) => void;
	onclick?: (event: MouseEvent) => void;
	onmousedown?: (event: MouseEvent) => void;
	onmouseup?: (event: MouseEvent) => void;
	onmouseenter?: (event: MouseEvent) => void;
	onmouseleave?: (event: MouseEvent) => void;
	onmouseover?: (event: MouseEvent) => void;
	onmouseout?: (event: MouseEvent) => void;
	oncontextmenu?: (event: MouseEvent) => void;
	onauxclick?: (event: MouseEvent) => void;
	ontouchstart?: (event: TouchEvent) => void;
	ontouchend?: (event: TouchEvent) => void;
	ontouchmove?: (event: TouchEvent) => void;
	ontouchcancel?: (event: TouchEvent) => void;
	onpointerdown?: (event: PointerEvent) => void;
	onpointerup?: (event: PointerEvent) => void;
	onpointerenter?: (event: PointerEvent) => void;
	onpointerleave?: (event: PointerEvent) => void;
	onpointermove?: (event: PointerEvent) => void;
	onpointercancel?: (event: PointerEvent) => void;
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
		},
		variant: {
			control: 'select',
			options: ['filled', 'outlined', 'ghost', 'glass'],
			description: 'Visual style variant of the IconButton'
		},
		size: {
			control: 'number',
			description: 'Size of the IconButton in pixels'
		},
		color: {
			control: 'color',
			description: 'Custom color for the IconButton'
		},
		rounded: {
			control: 'boolean',
			description: 'Whether the IconButton should be rounded'
		},
		// 新しいイベントハンドラのargTypes
		onfocus: {
			action: 'focused',
			description: 'フォーカスイベント'
		},
		onblur: {
			action: 'blurred',
			description: 'ブラーイベント'
		},
		onkeydown: {
			action: 'keydown',
			description: 'キーダウンイベント'
		},
		onkeyup: {
			action: 'keyup',
			description: 'キーアップイベント'
		},
		onclick: {
			action: 'clicked',
			description: 'クリックイベント'
		},
		onmousedown: {
			action: 'mousedown',
			description: 'マウスダウンイベント'
		},
		onmouseup: {
			action: 'mouseup',
			description: 'マウスアップイベント'
		},
		onmouseenter: {
			action: 'mouseenter',
			description: 'マウスエンターイベント'
		},
		onmouseleave: {
			action: 'mouseleave',
			description: 'マウスリーブイベント'
		},
		onmouseover: {
			action: 'mouseover',
			description: 'マウスオーバーイベント'
		},
		onmouseout: {
			action: 'mouseout',
			description: 'マウスアウトイベント'
		},
		oncontextmenu: {
			action: 'contextmenu',
			description: 'コンテキストメニューイベント'
		},
		onauxclick: {
			action: 'auxclick',
			description: '補助ボタンクリックイベント'
		},
		ontouchstart: {
			action: 'touchstart',
			description: 'タッチ開始イベント'
		},
		ontouchend: {
			action: 'touchend',
			description: 'タッチ終了イベント'
		},
		ontouchmove: {
			action: 'touchmove',
			description: 'タッチ移動イベント'
		},
		ontouchcancel: {
			action: 'touchcancel',
			description: 'タッチキャンセルイベント'
		},
		onpointerdown: {
			action: 'pointerdown',
			description: 'ポインターダウンイベント'
		},
		onpointerup: {
			action: 'pointerup',
			description: 'ポインターアップイベント'
		},
		onpointerenter: {
			action: 'pointerenter',
			description: 'ポインターエンターイベント'
		},
		onpointerleave: {
			action: 'pointerleave',
			description: 'ポインターリーブイベント'
		},
		onpointermove: {
			action: 'pointermove',
			description: 'ポインター移動イベント'
		},
		onpointercancel: {
			action: 'pointercancel',
			description: 'ポインターキャンセルイベント'
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
				label: 'Edit',
				icon: 'edit',
				callback: () => alert('Edit clicked')
			},
			{
				label: 'Copy',
				icon: 'content_copy',
				callback: () => alert('Copy clicked')
			},
			'separator',
			{
				label: 'Delete',
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
				label: 'General',
				icon: 'tune',
				callback: () => alert('General settings')
			},
			{
				label: 'Account',
				icon: 'account_circle',
				callback: () => alert('Account settings')
			},
			{
				label: 'Privacy',
				icon: 'privacy_tip',
				callback: () => alert('Privacy settings')
			},
			'separator',
			{
				label: 'About',
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
				label: 'New File',
				icon: 'add',
				callback: () => alert('New File')
			},
			{
				label: 'Open',
				icon: 'folder_open',
				callback: () => alert('Open')
			},
			'separator',
			{
				label: 'Save',
				icon: 'save',
				callback: () => alert('Save')
			},
			{
				label: 'Save As...',
				icon: 'save_as',
				callback: () => alert('Save As')
			},
			'separator',
			{
				label: 'Export',
				icon: 'file_download',
				callback: () => alert('Export')
			},
			{
				label: 'Print',
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
				label: 'Profile',
				icon: 'person',
				href: '/profile'
			},
			{
				label: 'Settings',
				icon: 'settings',
				href: '/settings'
			},
			'separator',
			{
				label: 'Help',
				icon: 'help',
				callback: () => alert('Help')
			},
			{
				label: 'Feedback',
				icon: 'feedback',
				callback: () => alert('Feedback')
			},
			'separator',
			{
				label: 'Logout',
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
				label: 'View Details',
				icon: 'info',
				callback: () => alert('View Details')
			},
			{
				label: 'Rename',
				icon: 'edit',
				callback: () => alert('Rename')
			},
			{
				label: 'Duplicate',
				icon: 'content_copy',
				callback: () => alert('Duplicate')
			},
			'separator',
			{
				label: 'Move to Folder',
				icon: 'drive_file_move',
				callback: () => alert('Move to Folder')
			},
			{
				label: 'Add to Favorites',
				icon: 'star',
				callback: () => alert('Add to Favorites')
			},
			'separator',
			{
				label: 'Share',
				icon: 'share',
				callback: () => alert('Share')
			},
			'separator',
			{
				label: 'Delete',
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
				label: 'Option A',
				callback: () => alert('Option A')
			},
			{
				label: 'Option B',
				callback: () => alert('Option B')
			},
			{
				label: 'Option C',
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
				label: '🤖 Auto Position',
				icon: 'auto_fix_high',
				callback: () => alert('Auto positioning finds the best spot!')
			},
			{
				label: 'Smart Placement',
				icon: 'psychology',
				callback: () => alert('Automatically adjusts to viewport')
			},
			'separator',
			{
				label: 'Try moving to screen edges',
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
				label: '📍 Top-Left',
				icon: 'north_west',
				callback: () => alert('Top-Left aligned')
			},
			{
				label: 'Corner alignment',
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
				label: '📍 Bottom-Right',
				icon: 'south_east',
				callback: () => alert('Bottom-Right aligned')
			},
			{
				label: 'Corner alignment',
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
				label: '← Left-Top',
				icon: 'keyboard_arrow_left',
				callback: () => alert('Left side, top aligned')
			},
			{
				label: 'Side placement',
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
				label: 'Right-Bottom →',
				icon: 'keyboard_arrow_right',
				callback: () => alert('Right side, bottom aligned')
			},
			{
				label: 'Side placement',
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
				label: '🎯 Position Test',
				icon: 'tune',
				callback: () => alert('Use the position control above to test different placements!')
			},
			'separator',
			{
				label: 'Available Positions:',
				icon: 'list'
			},
			{
				label: '• auto (smart)',
				callback: () => alert('Auto selects best position')
			},
			{
				label: '• 4 basic (top/bottom/left/right)',
				callback: () => alert('Traditional positioning')
			},
			{
				label: '• 12 detailed positions',
				callback: () => alert('Precise corner & side alignment')
			},
			'separator',
			{
				label: 'Test Instructions',
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
