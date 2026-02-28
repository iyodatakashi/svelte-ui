import type { Meta, StoryObj } from '@storybook/sveltekit';
import Tab from '../lib/components/Tab.svelte';
import type { MenuItem } from '../lib/types/menuItem';

const meta = {
	title: 'Navigation/Tab',
	component: Tab,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A tab navigation component that keeps the active tab in sync with the current URL path. Designed to work with SvelteKit routing.'
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
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic text tabs
export const Basic: Story = {
	args: {
		tabItems: [
			{
				label: 'Home',
				href: '/'
			},
			{
				label: 'About',
				href: '/about'
			},
			{
				label: 'Services',
				href: '/services'
			},
			{
				label: 'Contact',
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
				label: 'Dashboard',
				href: '/dashboard',
				icon: 'dashboard'
			},
			{
				label: 'Users',
				href: '/users',
				icon: 'people'
			},
			{
				label: 'Settings',
				href: '/settings',
				icon: 'settings'
			},
			{
				label: 'Analytics',
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
				label: 'Home',
				href: '/',
				strictMatch: true
			},
			{
				label: 'Blog',
				href: '/blog',
				strictMatch: true
			},
			{
				label: 'Products',
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
				label: 'Content',
				href: '/content',
				matchingPath: ['/content', '/articles', '/news']
			},
			{
				label: 'User Management',
				href: '/admin/users',
				matchingPath: ['/admin/users', '/admin/roles', '/admin/permissions']
			},
			{
				label: 'Reports',
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
				label: 'Dashboard',
				href: '/dashboard',
				icon: 'dashboard'
			},
			{
				label: 'Articles',
				href: '/articles',
				icon: 'article'
			},
			{
				label: 'Settings',
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
				label: 'Home',
				href: '/',
				icon: 'home'
			},
			{
				label: 'Products',
				href: '/products',
				icon: 'inventory'
			},
			{
				label: 'Analytics',
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
				label: 'Home',
				href: '/',
				icon: 'home',
				strictMatch: true
			},
			{
				label: 'Content',
				href: '/content',
				icon: 'article',
				matchingPath: ['/content', '/articles', '/posts']
			},
			{
				label: 'Admin',
				href: '/admin',
				icon: 'admin_panel_settings',
				matchingPath: ['/admin', '/admin/users', '/admin/settings']
			},
			{
				label: 'Help',
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
				label: 'Dashboard Overview',
				href: '/dashboard',
				icon: 'dashboard'
			},
			{
				label: 'User Management System',
				href: '/users',
				icon: 'people'
			},
			{
				label: 'Advanced Settings Configuration',
				href: '/settings',
				icon: 'settings'
			},
			{
				label: 'Analytics & Reporting Tools',
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
				label: 'Only Tab',
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
				label: 'Home',
				href: '/',
				icon: 'home'
			},
			{
				label: 'Products',
				href: '/products',
				icon: 'inventory'
			},
			{
				label: 'About',
				href: '/about',
				icon: 'info'
			},
			{
				label: 'Contact',
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
