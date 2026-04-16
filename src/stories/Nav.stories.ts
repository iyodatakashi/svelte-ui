import type { Meta, StoryObj } from '@storybook/sveltekit';
import Nav from '../lib/components/Nav.svelte';

const meta = {
	title: 'Navigation/Nav',
	component: Nav,
	parameters: {
		docs: {
			description: {
				component:
					'URL-based navigation component with four display variants: `tab`, `header`, `sidebar`, and `mobile`. Highlights the active item by matching the current URL path.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'radio',
			options: ['tab', 'horizontal', 'vertical', 'mobile'],
			description: 'Display variant'
		},
		navItems: {
			control: 'object',
			description: 'Array of navigation items (MenuItem[])'
		},
		pathPrefix: {
			control: 'text',
			description: 'Path prefix to strip when matching URLs'
		},
		currentPath: {
			control: 'text',
			description: 'Override current path for selection (useful for Storybook preview)'
		},
		ariaLabel: {
			control: 'text',
			description: 'Accessible label for the nav element'
		}
	}
} satisfies Meta<typeof Nav>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseItems = [
	{ label: 'Home', href: '/', icon: 'home', strictMatch: true },
	{ label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
	{ label: 'Projects', href: '/projects', icon: 'folder' },
	{ label: 'Settings', href: '/settings', icon: 'settings' }
];

const itemsWithDisabled = [
	{ label: 'Home', href: '/', icon: 'home', strictMatch: true },
	{ label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
	{ label: 'Projects', href: '/projects', icon: 'folder' },
	{ label: 'Admin', href: '/admin', icon: 'admin_panel_settings', disabled: true },
	{ label: 'Settings', href: '/settings', icon: 'settings' }
];

// =========================================================================
// tab バリアント
// =========================================================================
export const Tab: Story = {
	args: {
		variant: 'tab',
		navItems: baseItems,
		currentPath: '/dashboard',
		ariaLabel: 'Main navigation'
	},
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				story:
					'Horizontal tab-style navigation with a bottom bar indicator. Suitable for page-level navigation.'
			}
		}
	}
};

export const TabWithDisabled: Story = {
	args: {
		variant: 'tab',
		navItems: itemsWithDisabled,
		currentPath: '/projects',
		ariaLabel: 'Main navigation'
	},
	parameters: { layout: 'padded' }
};

// =========================================================================
// header バリアント
// =========================================================================
export const Horizontal: Story = {
	args: {
		variant: 'horizontal',
		navItems: baseItems,
		currentPath: '/dashboard',
		ariaLabel: 'Main navigation'
	},
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				story:
					'Horizontal navigation for use in app headers. Selected item is highlighted with a background color.'
			}
		}
	}
};

export const HorizontalWithoutIcons: Story = {
	args: {
		variant: 'horizontal',
		navItems: [
			{ label: 'Home', href: '/', strictMatch: true },
			{ label: 'About', href: '/about' },
			{ label: 'Pricing', href: '/pricing' },
			{ label: 'Blog', href: '/blog' },
			{ label: 'Contact', href: '/contact' }
		],
		currentPath: '/about',
		ariaLabel: 'Site navigation'
	},
	parameters: { layout: 'padded' }
};

// =========================================================================
// sidebar バリアント
// =========================================================================
export const Vertical: Story = {
	args: {
		variant: 'vertical',
		navItems: baseItems,
		currentPath: '/dashboard',
		ariaLabel: 'Vertical navigation'
	},
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				story:
					'Vertical navigation for sidebars. Items are full-width with a left bar indicator on selection.'
			}
		}
	}
};

export const VerticalWithDisabled: Story = {
	args: {
		variant: 'vertical',
		navItems: itemsWithDisabled,
		currentPath: '/projects',
		ariaLabel: 'Vertical navigation'
	},
	parameters: { layout: 'padded' }
};

// =========================================================================
// mobile バリアント
// =========================================================================
export const MobileTab: Story = {
	args: {
		variant: 'mobile',
		navItems: [
			{ label: 'Home', href: '/', icon: 'home', strictMatch: true },
			{ label: 'Search', href: '/search', icon: 'search' },
			{ label: 'Favorites', href: '/favorites', icon: 'favorite' },
			{ label: 'Profile', href: '/profile', icon: 'person' }
		],
		currentPath: '/search',
		ariaLabel: 'Bottom navigation'
	},
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				story:
					'Bottom navigation bar pattern for mobile. Icons are displayed above labels and items are evenly distributed.'
			}
		}
	}
};
