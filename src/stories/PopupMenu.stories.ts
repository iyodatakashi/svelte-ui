import type { Meta, StoryObj } from '@storybook/sveltekit';
import type { MenuItem } from '../lib/types/menuItem';
import PopupMenu from '../lib/components/PopupMenu.svelte';

const meta = {
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
			control: 'radio',
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
} satisfies Meta<typeof PopupMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

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

// Menu with navigation links
export const WithLinks: Story = {
	args: {
		position: 'bottom',
		anchorElement: createMockAnchorElement(),
		menuItems: [
			{
				label: 'Home',
				icon: 'home',
				href: '/'
			},
			{
				label: 'About',
				icon: 'info',
				href: '/about'
			},
			{
				label: 'Contact',
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
				label: 'Save',
				callback: () => alert('Save clicked')
			},
			{
				label: 'Save As...',
				callback: () => alert('Save As clicked')
			},
			'separator',
			{
				label: 'Export',
				callback: () => alert('Export clicked')
			},
			{
				label: 'Print',
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
				label: 'New File',
				icon: 'add',
				callback: () => alert('New File')
			},
			{
				label: 'Open File',
				icon: 'folder_open',
				callback: () => alert('Open File')
			},
			'separator',
			{
				label: 'Cut',
				icon: 'content_cut',
				callback: () => alert('Cut')
			},
			{
				label: 'Copy',
				icon: 'content_copy',
				callback: () => alert('Copy')
			},
			{
				label: 'Paste',
				icon: 'content_paste',
				callback: () => alert('Paste')
			},
			'separator',
			{
				label: 'Settings',
				icon: 'settings',
				href: '/settings'
			},
			{
				label: 'Help',
				icon: 'help',
				callback: () => alert('Help')
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

// Top position
export const TopPosition: Story = {
	args: {
		position: 'top',
		anchorElement: createMockAnchorElement(),
		menuItems: [
			{
				label: 'Option 1',
				icon: 'check_circle',
				callback: () => alert('Option 1')
			},
			{
				label: 'Option 2',
				icon: 'radio_button_unchecked',
				callback: () => alert('Option 2')
			},
			{
				label: 'Option 3',
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
				label: 'Bold',
				icon: 'format_bold',
				callback: () => alert('Bold')
			},
			{
				label: 'Italic',
				icon: 'format_italic',
				callback: () => alert('Italic')
			},
			{
				label: 'Underline',
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
				label: 'Align Left',
				icon: 'format_align_left',
				callback: () => alert('Align Left')
			},
			{
				label: 'Align Center',
				icon: 'format_align_center',
				callback: () => alert('Align Center')
			},
			{
				label: 'Align Right',
				icon: 'format_align_right',
				callback: () => alert('Align Right')
			}
		]
	}
};
