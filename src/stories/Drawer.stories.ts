import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import Drawer from '../lib/components/Drawer.svelte';

// 型安全性のための明示的な型定義
interface DrawerArgs {
	isOpen: boolean;
	title?: string;
	scrollable?: boolean;
	closeIfClickOutside?: boolean;
	width?: string | number;
	position?: 'left' | 'right';
	ariaLabel?: string;
	restoreFocus?: boolean;
	ariaDescribedby?: string;
	description?: string;
	header?: Snippet;
	children?: Snippet;
	footer?: Snippet;
	bodyStyle?: string;
	noPadding?: boolean;
}

const meta: Meta<DrawerArgs> = {
	title: 'UI/Drawer',
	component: Drawer,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component:
					'A slide-out drawer component that appears from the left or right side of the screen. Perfect for navigation menus, settings panels, or additional content. Supports header, body, and footer sections.'
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
		title: {
			control: 'text',
			description: 'Title displayed in the header'
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
			control: 'text',
			description: 'Drawer width (number for pixels, string for calc/vw/% etc.)'
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
		ariaDescribedby: {
			control: 'text',
			description: 'ID of element that describes the drawer'
		},
		description: {
			control: 'text',
			description: 'Description text for screen readers'
		},
		// Snippetはコントロールから除外
		header: {
			control: false,
			description: 'Custom header content'
		},
		children: {
			control: false,
			description: 'Main drawer content'
		},
		footer: {
			control: false,
			description: 'Footer content'
		},
		bodyStyle: {
			control: 'text',
			description: 'Custom CSS styles for the body section'
		},
		noPadding: {
			control: 'boolean',
			description: 'Remove default padding from body section'
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
		title: 'Navigation',
		children: createContentSnippet(`
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
		`)
	}
};

// Drawer with custom header and footer
export const WithHeaderFooter: Story = {
	args: {
		isOpen: true,
		position: 'left',
		width: 280,
		description: 'Navigation drawer with header and footer sections',
		header: createRawSnippet(() => ({
			render: () => `
				<div style="display: flex; align-items: center; gap: 12px; width: 100%;">
					<span style="font-size: 1.5rem;">📱</span>
					<h2 style="margin: 0; flex: 1; font-size: 1.25rem;">My App</h2>
					<button style="padding: 4px 8px; border: 1px solid #ccc; background: white; border-radius: 4px; font-size: 0.875rem; cursor: pointer;">
						✕
					</button>
				</div>
			`
		})),
		children: createContentSnippet(`
			<div style="padding: 16px; display: flex; flex-direction: column; gap: 16px;">
				<div style="display: flex; align-items: center; gap: 8px;">
					<span style="font-size: 1rem;">👤</span>
					<span>Profile</span>
				</div>
				<div style="display: flex; align-items: center; gap: 8px;">
					<span style="font-size: 1rem;">🔔</span>
					<span>Notifications</span>
				</div>
				<div style="display: flex; align-items: center; gap: 8px;">
					<span style="font-size: 1rem;">🎨</span>
					<span>Theme</span>
				</div>
				<div style="display: flex; align-items: center; gap: 8px;">
					<span style="font-size: 1rem;">🌐</span>
					<span>Language</span>
				</div>
			</div>
		`),
		footer: createRawSnippet(() => ({
			render: () => `
				<div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
					<button style="padding: 8px 16px; border: none; background: #1976d2; color: white; border-radius: 4px; font-size: 0.875rem; font-weight: 500; cursor: pointer; width: 100%;">
						Sign Out
					</button>
					<div style="text-align: center; font-size: 0.75rem; color: #666;">
						v1.0.0
					</div>
				</div>
			`
		}))
	},
	parameters: {
		docs: {
			description: {
				story:
					'Drawer with custom header including logo and close button, and footer with actions and version info.'
			}
		}
	}
};

// Scrollable drawer with borders
export const ScrollableWithBorders: Story = {
	args: {
		isOpen: true,
		position: 'left',
		width: 300,
		scrollable: true,
		title: 'Long Content',
		children: createContentSnippet(`
			<div>
				<h3>Section 1</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
				<h3>Section 2</h3>
				<p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				<h3>Section 3</h3>
				<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
				<h3>Section 4</h3>
				<p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				<h3>Section 5</h3>
				<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.</p>
				<h3>Section 6</h3>
				<p>Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
				<h3>Section 7</h3>
				<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores.</p>
				<h3>Section 8</h3>
				<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
			</div>
		`),
		footer: createRawSnippet(() => ({
			render: () => `
				<button style="padding: 8px 16px; border: 1px solid var(--svelte-ui-border-color, #ccc); background: var(--svelte-ui-surface-color, white); border-radius: 4px; font-size: 0.875rem; font-weight: 500; cursor: pointer;">
					Close
				</button>
			`
		}))
	},
	parameters: {
		docs: {
			description: {
				story: 'Scrollable drawer with borders separating header, body, and footer sections.'
			}
		}
	}
};

// Right side drawer
export const RightSide: Story = {
	args: {
		isOpen: true,
		position: 'right',
		width: 300,
		title: 'Settings Panel',
		children: createContentSnippet(`
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
		`),
		footer: createRawSnippet(() => ({
			render: () => `
				<button style="padding: 8px 16px; border: none; background: #1976d2; color: white; border-radius: 4px; font-size: 0.875rem; font-weight: 500; cursor: pointer; width: 100%;">
					Save Settings
				</button>
			`
		}))
	}
};

// Wide drawer
export const Wide: Story = {
	args: {
		isOpen: true,
		position: 'left',
		width: 400,
		title: 'Wide Drawer',
		children: createContentSnippet(`
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

// Responsive width drawer - ウィンドウ幅マイナスピクセル
export const ResponsiveWidth: Story = {
	args: {
		isOpen: true,
		position: 'left',
		width: 'calc(100vw - 80px)',
		title: 'Responsive Drawer',
		children: createContentSnippet(`
			<div style="padding: 16px;">
				<h3 style="margin: 0 0 16px 0; font-size: 1.2rem;">Responsive Width Example</h3>
				<p style="margin-bottom: 16px;">
					This drawer uses <code>calc(100vw - 80px)</code> as its width, 
					making it fill almost the entire viewport width minus 80 pixels.
				</p>
				<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
					<div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">
						<h4 style="margin: 0 0 8px 0;">Feature 1</h4>
						<p style="margin: 0; font-size: 0.9em; color: #666;">Content that adapts to the available width</p>
					</div>
					<div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">
						<h4 style="margin: 0 0 8px 0;">Feature 2</h4>
						<p style="margin: 0; font-size: 0.9em; color: #666;">Responsive grid layout</p>
					</div>
					<div style="padding: 16px; background: #f8f9fa; border-radius: 8px;">
						<h4 style="margin: 0 0 8px 0;">Feature 3</h4>
						<p style="margin: 0; font-size: 0.9em; color: #666;">Scales with viewport</p>
					</div>
				</div>
				<div style="margin-top: 24px; padding: 16px; background: #e8f5e8; border-radius: 8px; border-left: 4px solid #4caf50;">
					<h4 style="margin: 0 0 8px 0; color: #2e7d32;">Width Options</h4>
					<ul style="margin: 0; padding-left: 20px; color: #2e7d32;">
						<li><code>calc(100vw - 40px)</code> - ウィンドウ幅マイナス40px</li>
						<li><code>80%</code> - ウィンドウ幅の80%</li>
						<li><code>90vw</code> - ビューポート幅の90%</li>
						<li><code>320</code> - 固定320ピクセル</li>
					</ul>
				</div>
			</div>
		`)
	},
	parameters: {
		docs: {
			description: {
				story:
					'Drawer with responsive width using calc(100vw - 80px). This makes the drawer width adapt to the viewport size while maintaining a fixed margin.'
			}
		}
	}
};

// Percentage width drawer
export const PercentageWidth: Story = {
	args: {
		isOpen: true,
		position: 'right',
		width: '60%',
		title: 'Percentage Width',
		children: createContentSnippet(`
			<div style="padding: 16px;">
				<h3 style="margin: 0 0 16px 0;">60% Width Drawer</h3>
				<p style="margin-bottom: 16px;">
					This drawer takes up 60% of the viewport width, making it responsive to different screen sizes.
				</p>
				<div style="display: flex; flex-direction: column; gap: 12px;">
					<div style="padding: 12px; background: #fff3e0; border-radius: 6px;">
						<strong>Small screens:</strong> Optimal for mobile
					</div>
					<div style="padding: 12px; background: #e8f5e8; border-radius: 6px;">
						<strong>Medium screens:</strong> Good for tablets
					</div>
					<div style="padding: 12px; background: #e3f2fd; border-radius: 6px;">
						<strong>Large screens:</strong> Perfect for desktop
					</div>
				</div>
			</div>
		`)
	},
	parameters: {
		docs: {
			description: {
				story:
					'Drawer with percentage-based width (60%). This creates a responsive drawer that scales with the viewport size.'
			}
		}
	}
};

// Custom body styling - no padding for navigation sections
export const NoPadding: Story = {
	args: {
		isOpen: true,
		position: 'left',
		title: 'Custom Navigation',
		width: 280,
		noPadding: true,
		children: createContentSnippet(`
			<div>
				<div style="padding: 16px 20px; background: #f8f9fa; border-bottom: 1px solid #dee2e6;">
					<h4 style="margin: 0; font-size: 0.875rem; font-weight: 600; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px;">Main Menu</h4>
				</div>
				<nav style="padding: 8px 0;">
					<a href="#" style="display: block; padding: 12px 20px; text-decoration: none; color: #333; border-bottom: 1px solid #f1f3f4; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#f8f9fa'" onmouseout="this.style.backgroundColor='transparent'">
						🏠 Home
					</a>
					<a href="#" style="display: block; padding: 12px 20px; text-decoration: none; color: #333; border-bottom: 1px solid #f1f3f4; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#f8f9fa'" onmouseout="this.style.backgroundColor='transparent'">
						📊 Dashboard  
					</a>
					<a href="#" style="display: block; padding: 12px 20px; text-decoration: none; color: #333; border-bottom: 1px solid #f1f3f4; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#f8f9fa'" onmouseout="this.style.backgroundColor='transparent'">
						⚙️ Settings
					</a>
				</nav>
				<div style="padding: 16px 20px; background: #e9ecef; border-top: 1px solid #dee2e6; margin-top: auto;">
					<p style="margin: 0; font-size: 0.875rem; color: #6c757d;">Navigation with full-width borders</p>
				</div>
			</div>
		`)
	},
	parameters: {
		docs: {
			description: {
				story:
					'Drawer with noPadding=true to create navigation menus with full-width separators and custom section styling.'
			}
		}
	}
};

// Custom body styling with gradient
export const CustomBodyStyle: Story = {
	args: {
		isOpen: true,
		position: 'right',
		title: 'Styled Panel',
		width: 320,
		bodyStyle:
			'padding: 0; background: linear-gradient(180deg, #667eea 0%, #764ba2 100%); color: white;',
		children: createContentSnippet(`
			<div style="padding: 24px;">
				<h3 style="margin: 0 0 16px 0; color: white;">Custom Styled Panel</h3>
				<p style="margin: 0 0 20px 0; opacity: 0.9;">This drawer uses bodyStyle for gradient background and custom styling.</p>
				<div style="background: rgba(255,255,255,0.1); padding: 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.2);">
					<h4 style="margin: 0 0 8px 0; color: white;">Features</h4>
					<ul style="margin: 0; padding-left: 20px; opacity: 0.9;">
						<li>Gradient background</li>
						<li>Custom padding</li>
						<li>Custom colors</li>
					</ul>
				</div>
			</div>
		`)
	},
	parameters: {
		docs: {
			description: {
				story:
					'Drawer with custom bodyStyle CSS to create visually striking panels with gradients and custom styling.'
			}
		}
	}
};
