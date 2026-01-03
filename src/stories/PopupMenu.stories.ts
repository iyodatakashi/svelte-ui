import type { Meta, StoryObj } from '@storybook/sveltekit';
import type { MenuItem } from '../lib/types/menuItem';
import PopupMenu from '../lib/components/PopupMenu.svelte';

// 型安全性のための明示的な型定義
interface PopupMenuArgs {
	anchorElement: HTMLElement;
	position?: 'top' | 'bottom' | 'left' | 'right';
	menuItems: (MenuItem | 'separator')[];
}

const meta: Meta<PopupMenuArgs> = {
	title: 'UI/PopupMenu',
	component: PopupMenu,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A popup menu component that displays a list of menu items with icons, separators, and actions.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		position: {
			control: 'select',
			options: ['top', 'bottom', 'left', 'right'],
			description: 'Position of menu relative to anchor element'
		},
		menuItems: {
			control: 'object',
			description: 'Array of menu items or separators'
		},
		// anchorElementはコントロールから除外
		anchorElement: {
			control: false,
			description: 'HTML element to position menu relative to'
		}
	}
};

export default meta;
type Story = StoryObj<PopupMenuArgs>;

// モックのアンカー要素を作成する関数
const createMockAnchorElement = (): HTMLElement => {
	const element = document.createElement('button');
	element.textContent = 'Open Menu';
	element.style.padding = '8px 16px';
	element.style.background = 'var(--primary-color)';
	element.style.color = 'white';
	element.style.border = 'none';
	element.style.borderRadius = '4px';
	element.style.cursor = 'pointer';
	return element;
};

// Basic menu
export const Default: Story = {
	args: {
		position: 'bottom',
		anchorElement: createMockAnchorElement(),
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

// Menu with navigation links
export const WithLinks: Story = {
	args: {
		position: 'bottom',
		anchorElement: createMockAnchorElement(),
		menuItems: [
			{
				title: 'Home',
				icon: 'home',
				href: '/'
			},
			{
				title: 'About',
				icon: 'info',
				href: '/about'
			},
			{
				title: 'Contact',
				icon: 'contact_mail',
				href: '/contact'
			}
		]
	}
};

// Menu without icons
export const WithoutIcons: Story = {
	args: {
		position: 'bottom',
		anchorElement: createMockAnchorElement(),
		menuItems: [
			{
				title: 'Save',
				callback: () => alert('Save clicked')
			},
			{
				title: 'Save As...',
				callback: () => alert('Save As clicked')
			},
			'separator',
			{
				title: 'Export',
				callback: () => alert('Export clicked')
			},
			{
				title: 'Print',
				callback: () => alert('Print clicked')
			}
		]
	}
};

// Complex menu with multiple separators
export const Complex: Story = {
	args: {
		position: 'bottom',
		anchorElement: createMockAnchorElement(),
		menuItems: [
			{
				title: 'New File',
				icon: 'add',
				callback: () => alert('New File')
			},
			{
				title: 'Open File',
				icon: 'folder_open',
				callback: () => alert('Open File')
			},
			'separator',
			{
				title: 'Cut',
				icon: 'content_cut',
				callback: () => alert('Cut')
			},
			{
				title: 'Copy',
				icon: 'content_copy',
				callback: () => alert('Copy')
			},
			{
				title: 'Paste',
				icon: 'content_paste',
				callback: () => alert('Paste')
			},
			'separator',
			{
				title: 'Settings',
				icon: 'settings',
				href: '/settings'
			},
			{
				title: 'Help',
				icon: 'help',
				callback: () => alert('Help')
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

// Top position
export const TopPosition: Story = {
	args: {
		position: 'top',
		anchorElement: createMockAnchorElement(),
		menuItems: [
			{
				title: 'Option 1',
				icon: 'check_circle',
				callback: () => alert('Option 1')
			},
			{
				title: 'Option 2',
				icon: 'radio_button_unchecked',
				callback: () => alert('Option 2')
			},
			{
				title: 'Option 3',
				icon: 'radio_button_unchecked',
				callback: () => alert('Option 3')
			}
		]
	}
};

// Left position
export const LeftPosition: Story = {
	args: {
		position: 'left',
		anchorElement: createMockAnchorElement(),
		menuItems: [
			{
				title: 'Bold',
				icon: 'format_bold',
				callback: () => alert('Bold')
			},
			{
				title: 'Italic',
				icon: 'format_italic',
				callback: () => alert('Italic')
			},
			{
				title: 'Underline',
				icon: 'format_underlined',
				callback: () => alert('Underline')
			}
		]
	}
};

// Right position
export const RightPosition: Story = {
	args: {
		position: 'right',
		anchorElement: createMockAnchorElement(),
		menuItems: [
			{
				title: 'Align Left',
				icon: 'format_align_left',
				callback: () => alert('Align Left')
			},
			{
				title: 'Align Center',
				icon: 'format_align_center',
				callback: () => alert('Align Center')
			},
			{
				title: 'Align Right',
				icon: 'format_align_right',
				callback: () => alert('Align Right')
			}
		]
	}
};
