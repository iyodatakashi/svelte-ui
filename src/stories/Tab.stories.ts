import type { Meta, StoryObj } from '@storybook/sveltekit';
import Tab from '../lib/components/Tab.svelte';
import type { MenuItem } from '../types/MenuItem';

// 型安全性のための明示的な型定義
interface TabArgs {
	tabItems: MenuItem[];
	ariaLabel?: string;
	ariaLabelledby?: string;
	pathPrefix?: string;
	customPathMatcher?: (currentPath: string, itemHref: string, item: MenuItem) => boolean;
}

const meta: Meta<TabArgs> = {
	title: 'Navigation/Tab',
	component: Tab,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					"A tab navigation component that automatically manages active state based on current URL path. Uses SvelteKit's page state for efficient reactive updates. Now supports multi-tenant applications with pathPrefix and customPathMatcher."
			}
		}
	},
	tags: ['autodocs'],
	render: (args) => ({
		Component: Tab,
		props: args
	}),
	argTypes: {
		tabItems: {
			control: 'object',
			description: 'Array of menu items for tabs'
		},
		ariaLabel: {
			control: 'text',
			description: 'Accessible label for the tab list'
		},
		ariaLabelledby: {
			control: 'text',
			description: 'ID of element that labels the tab list'
		},
		pathPrefix: {
			control: 'text',
			description: 'Path prefix to strip from current URL for matching (e.g., "/tenant-name")'
		},
		customPathMatcher: {
			control: false,
			description: 'Custom function to match current path against tab href'
		}
	}
};

export default meta;
type Story = StoryObj<TabArgs>;

// Basic text tabs
export const Basic: Story = {
	args: {
		tabItems: [
			{
				title: 'Home',
				href: '/'
			},
			{
				title: 'About',
				href: '/about'
			},
			{
				title: 'Services',
				href: '/services'
			},
			{
				title: 'Contact',
				href: '/contact'
			}
		]
	}
};

// Tabs with icons
export const WithIcons: Story = {
	args: {
		tabItems: [
			{
				title: 'Dashboard',
				href: '/dashboard',
				icon: 'dashboard'
			},
			{
				title: 'Users',
				href: '/users',
				icon: 'people'
			},
			{
				title: 'Settings',
				href: '/settings',
				icon: 'settings'
			},
			{
				title: 'Analytics',
				href: '/analytics',
				icon: 'analytics'
			}
		]
	}
};

// Tabs with strict matching
export const StrictMatching: Story = {
	args: {
		tabItems: [
			{
				title: 'Home',
				href: '/',
				strictMatch: true
			},
			{
				title: 'Blog',
				href: '/blog',
				strictMatch: true
			},
			{
				title: 'Products',
				href: '/products',
				strictMatch: true
			}
		]
	}
};

// Tabs with multiple matching paths
export const MultipleMatchingPaths: Story = {
	args: {
		tabItems: [
			{
				title: 'Content',
				href: '/content',
				matchingPath: ['/content', '/articles', '/news']
			},
			{
				title: 'User Management',
				href: '/admin/users',
				matchingPath: ['/admin/users', '/admin/roles', '/admin/permissions']
			},
			{
				title: 'Reports',
				href: '/reports',
				matchingPath: ['/reports', '/analytics', '/metrics']
			}
		]
	}
};

// Multi-tenant with pathPrefix
export const MultiTenantWithPathPrefix: Story = {
	args: {
		pathPrefix: '/tenant-name',
		tabItems: [
			{
				title: 'Dashboard',
				href: '/dashboard',
				icon: 'dashboard'
			},
			{
				title: 'Articles',
				href: '/articles',
				icon: 'article'
			},
			{
				title: 'Settings',
				href: '/settings',
				icon: 'settings'
			}
		]
	}
};

// Multi-tenant with custom path matcher
export const MultiTenantWithCustomMatcher: Story = {
	args: {
		customPathMatcher: (currentPath: string, itemHref: string, item: MenuItem) => {
			// Remove tenant prefix from current path for matching
			// Pattern: /tenant-name/path -> /path
			const pathWithoutTenant = currentPath.replace(/^\/[^/]+/, '');

			if (item.strictMatch) {
				return pathWithoutTenant === itemHref;
			} else {
				// Handle root path
				if (itemHref === '/') {
					return pathWithoutTenant === '/' || pathWithoutTenant === '';
				}
				return pathWithoutTenant.startsWith(itemHref);
			}
		},
		tabItems: [
			{
				title: 'Home',
				href: '/',
				icon: 'home'
			},
			{
				title: 'Products',
				href: '/products',
				icon: 'inventory'
			},
			{
				title: 'Analytics',
				href: '/analytics',
				icon: 'analytics'
			}
		]
	}
};

// Mixed configuration (icons, strict match, multiple paths)
export const ComplexConfiguration: Story = {
	args: {
		tabItems: [
			{
				title: 'Home',
				href: '/',
				icon: 'home',
				strictMatch: true
			},
			{
				title: 'Content',
				href: '/content',
				icon: 'article',
				matchingPath: ['/content', '/articles', '/posts']
			},
			{
				title: 'Admin',
				href: '/admin',
				icon: 'admin_panel_settings',
				matchingPath: ['/admin', '/admin/users', '/admin/settings']
			},
			{
				title: 'Help',
				href: '/help',
				icon: 'help',
				strictMatch: true
			}
		]
	}
};

// Many tabs (testing scrolling behavior)
export const ManyTabs: Story = {
	args: {
		tabItems: [
			{ title: 'Tab 1', href: '/tab1' },
			{ title: 'Tab 2', href: '/tab2' },
			{ title: 'Tab 3', href: '/tab3' },
			{ title: 'Tab 4', href: '/tab4' },
			{ title: 'Tab 5', href: '/tab5' },
			{ title: 'Tab 6', href: '/tab6' },
			{ title: 'Tab 7', href: '/tab7' },
			{ title: 'Tab 8', href: '/tab8' },
			{ title: 'Tab 9', href: '/tab9' },
			{ title: 'Tab 10', href: '/tab10' },
			{ title: 'Tab 11', href: '/tab11' },
			{ title: 'Tab 12', href: '/tab12' }
		]
	}
};

// Long tab titles
export const LongTitles: Story = {
	args: {
		tabItems: [
			{
				title: 'Dashboard Overview',
				href: '/dashboard',
				icon: 'dashboard'
			},
			{
				title: 'User Management System',
				href: '/users',
				icon: 'people'
			},
			{
				title: 'Advanced Settings Configuration',
				href: '/settings',
				icon: 'settings'
			},
			{
				title: 'Analytics & Reporting Tools',
				href: '/analytics',
				icon: 'analytics'
			}
		]
	}
};

// Single tab
export const SingleTab: Story = {
	args: {
		tabItems: [
			{
				title: 'Only Tab',
				href: '/only',
				icon: 'tab'
			}
		]
	}
};

// Empty tabs (edge case)
export const EmptyTabs: Story = {
	args: {
		tabItems: []
	}
};

// Accessibility features demonstration
export const AccessibilityFeatures: Story = {
	args: {
		tabItems: [
			{
				title: 'Home',
				href: '/',
				icon: 'home'
			},
			{
				title: 'Products',
				href: '/products',
				icon: 'inventory'
			},
			{
				title: 'About',
				href: '/about',
				icon: 'info'
			},
			{
				title: 'Contact',
				href: '/contact',
				icon: 'contact_mail'
			}
		],
		ariaLabel: 'Main navigation tabs'
	},
	parameters: {
		docs: {
			description: {
				story:
					'Demonstrates accessibility features including keyboard navigation (arrow keys, Home/End), focus management, and screen reader support. Try using Tab to focus the tab list, then arrow keys to navigate between tabs.'
			}
		}
	}
};
