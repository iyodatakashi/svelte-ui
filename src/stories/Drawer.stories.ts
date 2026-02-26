import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import Drawer from '../lib/components/Drawer.svelte';
import DrawerExample from './DrawerExample.svelte';

// Explicit type definition for better type safety
interface DrawerArgs {
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
		layout: 'padded',
		docs: {
			description: {
				component:
					'A slide-out drawer component that appears from the left or right side of the screen. Perfect for navigation menus, settings panels, or additional content. Supports header, body, and footer sections.'
			}
		}
	},
	tags: ['autodocs'],
	render: (args) => ({
		Component: DrawerExample,
		props: args
	}),
	argTypes: {
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
			control: 'radio',
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
		// Snippet props are excluded from controls
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

// Default drawer
export const Default: Story = {
	args: {
		position: 'left',
		width: 240,
		title: 'Drawer Title',
		children: createContentSnippet(`
			<div>
				<p>This is a basic drawer with a title and some content.</p>
				<p>You can interact with the drawer by clicking outside or pressing ESC to close it.</p>
			</div>

		`)
	}
};

// Position Right drawer
export const PositionRight: Story = {
	args: {
		position: 'right',
		width: 240,
		title: 'Drawer Title',
		children: createContentSnippet(`
			<div>
				<p>This is a basic drawer with a title and some content.</p>
				<p>You can interact with the drawer by clicking outside or pressing ESC to close it.</p>
			</div>

		`)
	}
};

// Scrollable drawer
export const Scrollable: Story = {
	args: {
		position: 'left',
		width: 280,
		scrollable: true,
		title: 'Long Content',
		children: createContentSnippet(`
			<div>
				<h3>Lorem Ipsum</h3>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
				<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
				<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
				<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
				<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
				<p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p>
				<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>
			</div>		`)
	}
};

// Custom body styling - no padding for navigation sections
export const NoPadding: Story = {
	args: {
		position: 'left',
		title: 'Menu',
		width: 280,
		noPadding: true,
		children: createContentSnippet(`
				<nav style="border-top: 1px solid var(--svelte-ui-border-weak-color)">
					<a href="#" style="display: block; padding: 12px 24px; color: var(--svelte-ui-text-color); border-bottom: 1px solid var(--svelte-ui-border-weak-color)">Home</a>
					<a href="#" style="display: block; padding: 12px 24px; color: var(--svelte-ui-text-color); border-bottom: 1px solid var(--svelte-ui-border-weak-color)">Dashboard</a>
					<a href="#" style="display: block; padding: 12px 24px; color: var(--svelte-ui-text-color); border-bottom: 1px solid var(--svelte-ui-border-weak-color)">Settings</a>
				</nav>
		`)
	}
};
