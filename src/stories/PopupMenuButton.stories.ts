import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import PopupMenuButton from '../lib/components/PopupMenuButton.svelte';

const meta = {
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
		ariaLabel: {
			control: 'text',
			description: 'Accessible label for the button'
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the button is disabled'
		},
		id: {
			control: 'text',
			description: 'ID for the root element'
		},
		mobileFullscreen: {
			control: 'boolean',
			description: 'Use fullscreen layout for menu on mobile'
		},
		cancelParentClick: {
			control: 'boolean',
			description: 'Whether to stop click from propagating to parent'
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
			control: 'radio',
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
			description: 'Focus event'
		},
		onblur: {
			action: 'blurred',
			description: 'Blur event'
		},
		onkeydown: {
			action: 'keydown',
			description: 'Keydown event'
		},
		onkeyup: {
			action: 'keyup',
			description: 'Keyup event'
		},
		onclick: {
			action: 'clicked',
			description: 'Click event'
		},
		onmousedown: {
			action: 'mousedown',
			description: 'Mousedown event'
		},
		onmouseup: {
			action: 'mouseup',
			description: 'Mouseup event'
		},
		onmouseenter: {
			action: 'mouseenter',
			description: 'Mouseenter event'
		},
		onmouseleave: {
			action: 'mouseleave',
			description: 'Mouseleave event'
		},
		onmouseover: {
			action: 'mouseover',
			description: 'Mouseover event'
		},
		onmouseout: {
			action: 'mouseout',
			description: 'Mouseout event'
		},
		oncontextmenu: {
			action: 'contextmenu',
			description: 'Context menu event'
		},
		onauxclick: {
			action: 'auxclick',
			description: 'Auxiliary button click event'
		},
		ontouchstart: {
			action: 'touchstart',
			description: 'Touch start event'
		},
		ontouchend: {
			action: 'touchend',
			description: 'Touch end event'
		},
		ontouchmove: {
			action: 'touchmove',
			description: 'Touch move event'
		},
		ontouchcancel: {
			action: 'touchcancel',
			description: 'Touch cancel event'
		},
		onpointerdown: {
			action: 'pointerdown',
			description: 'Pointer down event'
		},
		onpointerup: {
			action: 'pointerup',
			description: 'Pointer up event'
		},
		onpointerenter: {
			action: 'pointerenter',
			description: 'Pointer enter event'
		},
		onpointerleave: {
			action: 'pointerleave',
			description: 'Pointer leave event'
		},
		onpointermove: {
			action: 'pointermove',
			description: 'Pointer move event'
		},
		onpointercancel: {
			action: 'pointercancel',
			description: 'Pointer cancel event'
		}
	}
} satisfies Meta<typeof PopupMenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

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
			'separator',
			{
				label: 'About',
				icon: 'info',
				callback: () => alert('About')
			}
		]
	}
};

// Simple menu without icons
export const WithoutIcons: Story = {
	args: {
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

// href navigation
export const WithLinks: Story = {
	args: {
		menuItems: [
			{
				label: 'About (internal)',
				icon: 'arrow_forward',
				href: '/about'
			},
			{
				label: 'Settings (internal)',
				icon: 'arrow_forward',
				href: '/settings'
			},
			'separator',
			{
				label: 'GitHub (external)',
				icon: 'open_in_new',
				href: 'https://github.com',
				target: '_blank'
			},
			{
				label: 'MDN (external)',
				icon: 'open_in_new',
				href: 'https://developer.mozilla.org',
				target: '_blank'
			}
		]
	},
	parameters: {
		docs: {
			description: {
				story:
					'Internal links navigate in the same tab. External links (target="_blank") open in a new tab.'
			}
		}
	}
};

// Account switcher with checked item
export const WithCheckedItems: Story = {
	args: {
		menuItems: [
			{
				label: 'work@example.com',
				checked: true,
				callback: () => alert('work@example.com')
			},
			{
				label: 'me@example.com',
				checked: false,
				callback: () => alert('me@example.com')
			},
			{
				label: 'Add account',
				icon: 'person_add',
				callback: () => alert('Add account')
			},
			'separator',
			{
				label: 'Settings',
				icon: 'settings',
				callback: () => alert('Settings')
			}
		]
	}
};

// Disabled items
export const WithDisabledItems: Story = {
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
				disabled: true,
				callback: () => alert('Copy clicked')
			},
			'separator',
			{
				label: 'Delete',
				icon: 'delete',
				disabled: true,
				callback: () => alert('Delete clicked')
			}
		]
	}
};
