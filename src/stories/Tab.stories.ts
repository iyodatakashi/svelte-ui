import type { Meta, StoryObj } from '@storybook/sveltekit';
import Tab from '../lib/components/Tab.svelte';
import TabExample from './TabExample.svelte';

const meta = {
	title: 'Navigation/Tab',
	component: Tab,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A tab navigation component that keeps the active tab in sync with the current URL path. Designed to work with SvelteKit routing. In Storybook you can switch tabs by clicking; the currentPath control simulates the initial URL.'
			}
		}
	},
	tags: ['autodocs'],
	render: (args) => ({
		Component: TabExample,
		props: args
	}),
	argTypes: {
		tabItems: {
			control: 'object',
			description: 'Array of menu items for tabs'
		},
		currentPath: {
			control: 'text',
			description:
				'Current URL path. In an app this comes from the router; in Storybook set this to simulate which tab is selected (e.g. "/about")'
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
		currentPath: '/about',
		tabItems: [
			{ label: 'Home', href: '/' },
			{ label: 'About', href: '/about' },
			{ label: 'Services', href: '/services' },
			{ label: 'Contact', href: '/contact' }
		]
	}
};

// Tabs with icons
export const WithIcons: Story = {
	args: {
		currentPath: '/settings',
		tabItems: [
			{ label: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
			{ label: 'Users', href: '/users', icon: 'people' },
			{ label: 'Settings', href: '/settings', icon: 'settings' },
			{ label: 'Analytics', href: '/analytics', icon: 'analytics' }
		]
	}
};

// Tabs with disabled item
export const WithDisabled: Story = {
	args: {
		currentPath: '/about',
		tabItems: [
			{ label: 'Home', href: '/' },
			{ label: 'About', href: '/about' },
			{ label: 'Services', href: '/services', disabled: true },
			{ label: 'Contact', href: '/contact' }
		]
	}
};

// Tabs with strict matching
export const StrictMatching: Story = {
	args: {
		currentPath: '/blog',
		tabItems: [
			{ label: 'Home', href: '/', strictMatch: true },
			{ label: 'Blog', href: '/blog', strictMatch: true },
			{ label: 'Products', href: '/products', strictMatch: true }
		]
	}
};

// Many tabs (testing scrolling behavior)
export const ManyTabs: Story = {
	args: {
		currentPath: '/tab5',
		tabItems: [
			{ label: 'Tab 1', href: '/tab1' },
			{ label: 'Tab 2', href: '/tab2' },
			{ label: 'Tab 3', href: '/tab3' },
			{ label: 'Tab 4', href: '/tab4' },
			{ label: 'Tab 5', href: '/tab5' },
			{ label: 'Tab 6', href: '/tab6' },
			{ label: 'Tab 7', href: '/tab7' },
			{ label: 'Tab 8', href: '/tab8' },
			{ label: 'Tab 9', href: '/tab9' },
			{ label: 'Tab 10', href: '/tab10' },
			{ label: 'Tab 11', href: '/tab11' },
			{ label: 'Tab 12', href: '/tab12' }
		]
	}
};

// Long tab titles
export const LongTitles: Story = {
	args: {
		currentPath: '/users',
		tabItems: [
			{ label: 'Dashboard Overview', href: '/dashboard', icon: 'dashboard' },
			{ label: 'User Management System', href: '/users', icon: 'people' },
			{ label: 'Advanced Settings Configuration', href: '/settings', icon: 'settings' },
			{ label: 'Analytics & Reporting Tools', href: '/analytics', icon: 'analytics' }
		]
	}
};

// Single tab
export const SingleTab: Story = {
	args: {
		currentPath: '/only',
		tabItems: [{ label: 'Only Tab', href: '/only', icon: 'tab' }]
	}
};

// Empty tabs (edge case)
export const EmptyTabs: Story = {
	args: {
		tabItems: []
	}
};
