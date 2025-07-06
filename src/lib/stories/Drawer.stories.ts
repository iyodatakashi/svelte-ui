import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import Drawer from '../components/Drawer.svelte';

// 型安全性のための明示的な型定義
interface DrawerArgs {
	isOpen: boolean;
	scrollable?: boolean;
	closeIfClickOutside?: boolean;
	width?: number;
	position?: 'left' | 'right';
	ariaLabel?: string;
	restoreFocus?: boolean;
	children: Snippet;
}

const meta: Meta<DrawerArgs> = {
	title: 'UI/Drawer',
	component: Drawer,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'A slide-out drawer component that appears from the left or right side of the screen. Perfect for navigation menus, settings panels, or additional content.'
			}
		}
	},
	tags: ['autodocs'],
	render: (args) => ({
		Component: Drawer,
		props: args
	}),
	argTypes: {
		isOpen: {
			control: 'boolean',
			description: 'Whether the drawer is open'
		},
		scrollable: {
			control: 'boolean',
			description: 'Whether the drawer content is scrollable'
		},
		closeIfClickOutside: {
			control: 'boolean',
			description: 'Whether to close drawer when clicking outside'
		},
		width: {
			control: 'number',
			description: 'Drawer width in pixels'
		},
		position: {
			control: 'select',
			options: ['left', 'right'],
			description: 'Which side of the screen the drawer slides from'
		},
		ariaLabel: {
			control: 'text',
			description: 'Accessible label for screen readers'
		},
		restoreFocus: {
			control: 'boolean',
			description: 'Whether to restore focus to the previous element when closing'
		},
		// Snippetはコントロールから除外
		children: {
			control: false,
			description: 'Drawer content'
		}
	}
};

export default meta;
type Story = StoryObj<DrawerArgs>;

// Helper function to create snippet for content
const createContentSnippet = (content: string) =>
	createRawSnippet(() => ({
		render: () => content
	}));

// Default drawer (left side)
export const Default: Story = {
	args: {
		isOpen: true,
		position: 'left',
		width: 240,
		children: createContentSnippet(`
			<div style="padding: 16px; height: 100%; background: white;">
				<h2 style="margin: 0 0 16px 0; font-size: 1.25rem;">Navigation</h2>
				<nav>
					<ul style="list-style: none; padding: 0; margin: 0;">
						<li style="margin-bottom: 8px;">
							<a href="#" style="display: block; padding: 8px 12px; text-decoration: none; color: #333; border-radius: 4px; transition: background-color 0.2s;" 
							   onmouseover="this.style.backgroundColor='#f5f5f5'" 
							   onmouseout="this.style.backgroundColor='transparent'">
								🏠 Home
							</a>
						</li>
						<li style="margin-bottom: 8px;">
							<a href="#" style="display: block; padding: 8px 12px; text-decoration: none; color: #333; border-radius: 4px; transition: background-color 0.2s;"
							   onmouseover="this.style.backgroundColor='#f5f5f5'" 
							   onmouseout="this.style.backgroundColor='transparent'">
								📊 Dashboard
							</a>
						</li>
						<li style="margin-bottom: 8px;">
							<a href="#" style="display: block; padding: 8px 12px; text-decoration: none; color: #333; border-radius: 4px; transition: background-color 0.2s;"
							   onmouseover="this.style.backgroundColor='#f5f5f5'" 
							   onmouseout="this.style.backgroundColor='transparent'">
								⚙️ Settings
							</a>
						</li>
						<li style="margin-bottom: 8px;">
							<a href="#" style="display: block; padding: 8px 12px; text-decoration: none; color: #333; border-radius: 4px; transition: background-color 0.2s;"
							   onmouseover="this.style.backgroundColor='#f5f5f5'" 
							   onmouseout="this.style.backgroundColor='transparent'">
								👤 Profile
							</a>
						</li>
					</ul>
				</nav>
			</div>
		`)
	}
};

// Right side drawer
export const RightSide: Story = {
	args: {
		isOpen: true,
		position: 'right',
		width: 300,
		children: createContentSnippet(`
			<div style="padding: 16px; height: 100%; background: white;">
				<h2 style="margin: 0 0 16px 0; font-size: 1.25rem;">Settings Panel</h2>
				<div style="margin-bottom: 20px;">
					<h3 style="margin: 0 0 8px 0; font-size: 1rem;">Appearance</h3>
					<label style="display: block; margin-bottom: 8px;">
						<input type="checkbox" style="margin-right: 8px;">
						Dark mode
					</label>
					<label style="display: block; margin-bottom: 8px;">
						<input type="checkbox" style="margin-right: 8px;" checked>
						Compact layout
					</label>
				</div>
				<div style="margin-bottom: 20px;">
					<h3 style="margin: 0 0 8px 0; font-size: 1rem;">Notifications</h3>
					<label style="display: block; margin-bottom: 8px;">
						<input type="checkbox" style="margin-right: 8px;" checked>
						Email notifications
					</label>
					<label style="display: block; margin-bottom: 8px;">
						<input type="checkbox" style="margin-right: 8px;">
						Push notifications
					</label>
				</div>
				<button style="padding: 8px 16px; border: none; background: #1976d2; color: white; border-radius: 4px; width: 100%;">
					Save Settings
				</button>
			</div>
		`)
	}
};

// Wide drawer
export const Wide: Story = {
	args: {
		isOpen: true,
		position: 'left',
		width: 400,
		children: createContentSnippet(`
			<div style="padding: 24px; height: 100%; background: white;">
				<h2 style="margin: 0 0 24px 0; font-size: 1.5rem;">Wide Drawer</h2>
				<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
					<div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">
						<h3 style="margin: 0 0 8px 0; font-size: 1rem;">Quick Stats</h3>
						<p style="margin: 0; font-size: 0.9em; color: #666;">24 items</p>
					</div>
					<div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">
						<h3 style="margin: 0 0 8px 0; font-size: 1rem;">Recent Activity</h3>
						<p style="margin: 0; font-size: 0.9em; color: #666;">5 updates</p>
					</div>
				</div>
				<div style="margin-bottom: 24px;">
					<h3 style="margin: 0 0 12px 0; font-size: 1.1rem;">Navigation</h3>
					<nav>
						<div style="display: flex; flex-direction: column; gap: 8px;">
							<a href="#" style="display: flex; align-items: center; padding: 12px 16px; text-decoration: none; color: #333; border-radius: 8px; border: 1px solid #e0e0e0; transition: all 0.2s;">
								<span style="margin-right: 12px;">📈</span>
								<div>
									<div style="font-weight: 500;">Analytics</div>
									<div style="font-size: 0.8em; color: #666;">View reports</div>
								</div>
							</a>
							<a href="#" style="display: flex; align-items: center; padding: 12px 16px; text-decoration: none; color: #333; border-radius: 8px; border: 1px solid #e0e0e0; transition: all 0.2s;">
								<span style="margin-right: 12px;">👥</span>
								<div>
									<div style="font-weight: 500;">Users</div>
									<div style="font-size: 0.8em; color: #666;">Manage users</div>
								</div>
							</a>
						</div>
					</nav>
				</div>
			</div>
		`)
	}
};

// Scrollable drawer
export const Scrollable: Story = {
	args: {
		isOpen: true,
		position: 'left',
		width: 280,
		scrollable: true,
		children: createContentSnippet(`
			<div style="padding: 16px; background: white;">
				<h2 style="margin: 0 0 16px 0; font-size: 1.25rem;">Long Menu</h2>
				<nav>
					<ul style="list-style: none; padding: 0; margin: 0;">
						${Array.from(
							{ length: 30 },
							(_, i) => `
							<li style="margin-bottom: 4px;">
								<a href="#" style="display: block; padding: 8px 12px; text-decoration: none; color: #333; border-radius: 4px; transition: background-color 0.2s;"
								   onmouseover="this.style.backgroundColor='#f5f5f5'" 
								   onmouseout="this.style.backgroundColor='transparent'">
									📄 Menu Item ${i + 1}
								</a>
							</li>
						`
						).join('')}
					</ul>
				</nav>
			</div>
		`)
	}
};

// Menu drawer with icons
export const MenuWithIcons: Story = {
	args: {
		isOpen: true,
		position: 'left',
		width: 260,
		ariaLabel: 'Main navigation menu',
		children: createContentSnippet(`
			<div style="padding: 16px; height: 100%; background: white; display: flex; flex-direction: column;">
				<div style="margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #e0e0e0;">
					<h2 style="margin: 0 0 4px 0; font-size: 1.25rem;">MyApp</h2>
					<p style="margin: 0; font-size: 0.9em; color: #666;">Welcome back, User!</p>
				</div>
				<nav style="flex: 1;">
					<ul style="list-style: none; padding: 0; margin: 0;">
						<li style="margin-bottom: 4px;">
							<a href="#" style="display: flex; align-items: center; padding: 12px 16px; text-decoration: none; color: #333; border-radius: 8px; background: #e3f2fd; transition: all 0.2s;">
								<span style="margin-right: 12px; font-size: 1.2em;">🏠</span>
								<span style="font-weight: 500;">Home</span>
							</a>
						</li>
						<li style="margin-bottom: 4px;">
							<a href="#" style="display: flex; align-items: center; padding: 12px 16px; text-decoration: none; color: #333; border-radius: 8px; transition: all 0.2s;"
							   onmouseover="this.style.backgroundColor='#f5f5f5'" 
							   onmouseout="this.style.backgroundColor='transparent'">
								<span style="margin-right: 12px; font-size: 1.2em;">📊</span>
								<span>Dashboard</span>
							</a>
						</li>
						<li style="margin-bottom: 4px;">
							<a href="#" style="display: flex; align-items: center; padding: 12px 16px; text-decoration: none; color: #333; border-radius: 8px; transition: all 0.2s;"
							   onmouseover="this.style.backgroundColor='#f5f5f5'" 
							   onmouseout="this.style.backgroundColor='transparent'">
								<span style="margin-right: 12px; font-size: 1.2em;">📈</span>
								<span>Analytics</span>
							</a>
						</li>
						<li style="margin-bottom: 4px;">
							<a href="#" style="display: flex; align-items: center; padding: 12px 16px; text-decoration: none; color: #333; border-radius: 8px; transition: all 0.2s;"
							   onmouseover="this.style.backgroundColor='#f5f5f5'" 
							   onmouseout="this.style.backgroundColor='transparent'">
								<span style="margin-right: 12px; font-size: 1.2em;">👥</span>
								<span>Users</span>
							</a>
						</li>
						<li style="margin-bottom: 4px;">
							<a href="#" style="display: flex; align-items: center; padding: 12px 16px; text-decoration: none; color: #333; border-radius: 8px; transition: all 0.2s;"
							   onmouseover="this.style.backgroundColor='#f5f5f5'" 
							   onmouseout="this.style.backgroundColor='transparent'">
								<span style="margin-right: 12px; font-size: 1.2em;">⚙️</span>
								<span>Settings</span>
							</a>
						</li>
					</ul>
				</nav>
				<div style="margin-top: auto; padding-top: 16px; border-top: 1px solid #e0e0e0;">
					<a href="#" style="display: flex; align-items: center; padding: 12px 16px; text-decoration: none; color: #333; border-radius: 8px; transition: all 0.2s;"
					   onmouseover="this.style.backgroundColor='#f5f5f5'" 
					   onmouseout="this.style.backgroundColor='transparent'">
						<span style="margin-right: 12px; font-size: 1.2em;">🚪</span>
						<span>Logout</span>
					</a>
				</div>
			</div>
		`)
	}
};

// Narrow drawer
export const Narrow: Story = {
	args: {
		isOpen: true,
		position: 'left',
		width: 180,
		children: createContentSnippet(`
			<div style="padding: 12px; height: 100%; background: white;">
				<h3 style="margin: 0 0 16px 0; font-size: 1rem;">Quick Nav</h3>
				<nav>
					<ul style="list-style: none; padding: 0; margin: 0;">
						<li style="margin-bottom: 8px;">
							<a href="#" style="display: block; padding: 8px; text-decoration: none; color: #333; border-radius: 4px; text-align: center; transition: background-color 0.2s;"
							   onmouseover="this.style.backgroundColor='#f5f5f5'" 
							   onmouseout="this.style.backgroundColor='transparent'">
								<div style="font-size: 1.5em; margin-bottom: 4px;">🏠</div>
								<div style="font-size: 0.8em;">Home</div>
							</a>
						</li>
						<li style="margin-bottom: 8px;">
							<a href="#" style="display: block; padding: 8px; text-decoration: none; color: #333; border-radius: 4px; text-align: center; transition: background-color 0.2s;"
							   onmouseover="this.style.backgroundColor='#f5f5f5'" 
							   onmouseout="this.style.backgroundColor='transparent'">
								<div style="font-size: 1.5em; margin-bottom: 4px;">📊</div>
								<div style="font-size: 0.8em;">Charts</div>
							</a>
						</li>
						<li style="margin-bottom: 8px;">
							<a href="#" style="display: block; padding: 8px; text-decoration: none; color: #333; border-radius: 4px; text-align: center; transition: background-color 0.2s;"
							   onmouseover="this.style.backgroundColor='#f5f5f5'" 
							   onmouseout="this.style.backgroundColor='transparent'">
								<div style="font-size: 1.5em; margin-bottom: 4px;">⚙️</div>
								<div style="font-size: 0.8em;">Settings</div>
							</a>
						</li>
					</ul>
				</nav>
			</div>
		`)
	}
};

// Closed drawer (for demonstration)
export const Closed: Story = {
	args: {
		isOpen: false,
		position: 'left',
		width: 240,
		children: createContentSnippet(`
			<div style="padding: 16px; height: 100%; background: white;">
				<h2 style="margin: 0 0 16px 0; font-size: 1.25rem;">Hidden Drawer</h2>
				<p>This drawer is closed. Toggle the 'isOpen' control to see it.</p>
			</div>
		`)
	}
};
