import type { Meta, StoryObj } from '@storybook/sveltekit';
import Nav from '../lib/components/Nav.svelte';
import NavExample from './NavExample.svelte';

const meta = {
	title: 'Navigation/Nav',
	component: Nav,
	parameters: {
		docs: {
			description: {
				component:
					'URL-based navigation component with four display variants: `tab`, `horizontal`, `vertical`, and `mobile`. Supports hierarchical menus via the `subMenuMode` prop and `children` on `MenuItem`. In Storybook, clicking items updates the active state interactively.'
			}
		}
	},
	tags: ['autodocs'],
	render: (args) => ({
		Component: NavExample,
		props: args
	}),
	argTypes: {
		variant: {
			control: 'radio',
			options: ['tab', 'horizontal', 'vertical', 'mobile'],
			description: 'Display variant'
		},
		subMenuMode: {
			control: 'radio',
			options: ['popup', 'accordion', 'expanded', 'bar', 'bottom-sheet'],
			description: 'Sub-menu display mode for items with children'
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
			description: 'Initial active path (clicking items updates it interactively)'
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

const hierarchicalItems = [
	{ label: 'Home', href: '/', icon: 'home', strictMatch: true },
	{
		label: 'Products',
		href: '/products',
		icon: 'inventory_2',
		strictMatch: true,
		children: [
			{ label: 'Electronics', href: '/products/electronics', icon: 'devices' },
			{ label: 'Clothing', href: '/products/clothing', icon: 'checkroom' },
			{ label: 'Books', href: '/products/books', icon: 'menu_book' }
		]
	},
	{
		label: 'Services',
		icon: 'build',
		children: [
			{ label: 'Consulting', href: '/services/consulting' },
			{ label: 'Support', href: '/services/support' },
			{ label: 'Training', href: '/services/training' }
		]
	},
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
				story: 'Horizontal tab-style navigation with a bottom bar indicator.'
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
// horizontal バリアント
// =========================================================================
export const Horizontal: Story = {
	args: {
		variant: 'horizontal',
		navItems: baseItems,
		currentPath: '/dashboard',
		ariaLabel: 'Main navigation'
	},
	parameters: { layout: 'padded' }
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
// vertical バリアント
// =========================================================================
export const Vertical: Story = {
	args: {
		variant: 'vertical',
		navItems: baseItems,
		currentPath: '/dashboard',
		ariaLabel: 'Vertical navigation'
	},
	parameters: { layout: 'padded' }
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
	parameters: { layout: 'padded' }
};

// =========================================================================
// 階層メニュー: vertical
// =========================================================================
export const VerticalAccordion: Story = {
	args: {
		variant: 'vertical',
		subMenuMode: 'accordion',
		navItems: hierarchicalItems,
		currentPath: '/products/electronics',
		ariaLabel: 'Sidebar navigation'
	},
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				story:
					'Accordion sub-menus. Clicking a parent opens its children (exclusive: other open accordions close). The accordion containing the active child auto-expands on load.'
			}
		}
	}
};

export const VerticalExpanded: Story = {
	args: {
		variant: 'vertical',
		subMenuMode: 'expanded',
		navItems: hierarchicalItems,
		currentPath: '/services/support',
		ariaLabel: 'Sidebar navigation'
	},
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				story: 'All child items are always visible — no collapse toggle.'
			}
		}
	}
};

export const VerticalPopup: Story = {
	args: {
		variant: 'vertical',
		subMenuMode: 'popup',
		navItems: hierarchicalItems,
		currentPath: '/dashboard',
		ariaLabel: 'Sidebar navigation'
	},
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				story: 'Clicking a parent opens a floating panel to the right.'
			}
		}
	}
};

// =========================================================================
// 階層メニュー: horizontal
// =========================================================================
export const HorizontalPopup: Story = {
	args: {
		variant: 'horizontal',
		subMenuMode: 'popup',
		navItems: hierarchicalItems,
		currentPath: '/dashboard',
		ariaLabel: 'Header navigation'
	},
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				story: 'Clicking a parent opens a dropdown below.'
			}
		}
	}
};

export const HorizontalBar: Story = {
	args: {
		variant: 'horizontal',
		subMenuMode: 'bar',
		navItems: hierarchicalItems,
		currentPath: '/dashboard',
		ariaLabel: 'Header navigation'
	},
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				story:
					'Clicking a parent reveals a secondary horizontal bar of child items below the nav.'
			}
		}
	}
};

// =========================================================================
// 階層メニュー: mobile
// =========================================================================
const mobileHierarchicalItems = [
	{ label: 'Home', href: '/', icon: 'home', strictMatch: true },
	{
		label: 'Shop',
		icon: 'storefront',
		children: [
			{ label: 'New', href: '/shop/new', icon: 'fiber_new' },
			{ label: 'Sale', href: '/shop/sale', icon: 'local_offer' },
			{ label: 'All', href: '/shop/all', icon: 'grid_view' }
		]
	},
	{ label: 'Favorites', href: '/favorites', icon: 'favorite' },
	{ label: 'Profile', href: '/profile', icon: 'person' }
];

export const MobilePopup: Story = {
	args: {
		variant: 'mobile',
		subMenuMode: 'popup',
		navItems: mobileHierarchicalItems,
		currentPath: '/',
		ariaLabel: 'Bottom navigation'
	},
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				story: 'Tapping a parent opens a popup panel above the tapped item.'
			}
		}
	}
};

export const MobileBottomSheet: Story = {
	args: {
		variant: 'mobile',
		subMenuMode: 'bottom-sheet',
		navItems: mobileHierarchicalItems,
		currentPath: '/',
		ariaLabel: 'Bottom navigation'
	},
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				story: 'Tapping a parent slides up a bottom-sheet overlay with child items.'
			}
		}
	}
};
