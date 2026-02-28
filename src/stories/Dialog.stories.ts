import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import Dialog from '../lib/components/Dialog.svelte';
import DialogExample from './DialogExample.svelte';

const meta = {
	title: 'UI/Dialog',
	component: Dialog,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A modal dialog component with flexible content areas (header, body, footer) and accessibility features. For footer buttons, use the Button component: `<Button variant="outlined">Cancel</Button>` and `<Button variant="filled">Confirm</Button>`'
			}
		}
	},
	tags: ['autodocs'],
	render: (args) => ({
		Component: DialogExample,
		props: args
	}),
	argTypes: {
		title: {
			control: 'text',
			description: 'Dialog title (displayed in header)'
		},
		ariaLabel: {
			control: 'text',
			description: 'Accessible label for screen readers'
		},
		id: {
			control: 'text',
			description: 'ID for the dialog element'
		},
		isOpen: {
			control: 'boolean',
			description: 'Whether the dialog is open (bindable)'
		},
		scrollable: {
			control: 'boolean',
			description: 'Whether the dialog content is scrollable'
		},
		closeIfClickOutside: {
			control: 'boolean',
			description: 'Whether to close dialog when clicking outside'
		},
		width: {
			control: 'text',
			description: 'Dialog width in pixels or percentage'
		},
		restoreFocus: {
			control: 'boolean',
			description: 'Whether to restore focus to the previous element when closing'
		},
		ariaDescribedby: {
			control: 'text',
			description: 'ID of element that describes the dialog'
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
			description: 'Main dialog content'
		},
		footer: {
			control: false,
			description: 'Footer content with action buttons'
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
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create snippet for content
const createContentSnippet = (content: string) =>
	createRawSnippet(() => ({
		render: () => content
	}));

// Default dialog with title
export const Default: Story = {
	args: {
		title: 'Dialog Title',
		width: 320,
		children: createContentSnippet(`
			<div>
				<p>This is a basic dialog with a title and some content.</p>
				<p>You can interact with the dialog by clicking outside or pressing ESC to close it.</p>
			</div>
		`)
	}
};

// Dialog with footer buttons
export const WithFooter: Story = {
	args: {
		title: 'Confirm Action',
		width: 400,
		children: createContentSnippet(`
			<div>
				<p>Are you sure you want to delete this item?</p>
				<p style="color: #666; font-size: 0.9em;">This action cannot be undone.</p>
			</div>
		`),
		footer: createRawSnippet(() => ({
			render: () => `
				<button style="padding: 8px 16px; border: 1px solid var(--svelte-ui-border-color, #ccc); background: var(--svelte-ui-surface-color, white); border-radius: 4px; font-size: 0.875rem; font-weight: 500; cursor: pointer; font-family: inherit;">Cancel</button>
				<button style="padding: 8px 16px; border: none; background: #d32f2f; color: white; border-radius: 4px; font-size: 0.875rem; font-weight: 500; cursor: pointer; font-family: inherit;">Delete</button>
			`
		}))
	}
};

// Scrollable dialog
export const Scrollable: Story = {
	args: {
		title: 'Long Content',
		scrollable: true,
		width: 500,
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
			</div>
		`),
		footer: createRawSnippet(() => ({
			render: () => `
				<button style="padding: 8px 16px; border: 1px solid var(--svelte-ui-border-color, #ccc); background: var(--svelte-ui-surface-color, white); border-radius: 4px; font-size: 0.875rem; font-weight: 500; cursor: pointer; font-family: inherit;">Cancel</button>
				<button style="padding: 8px 16px; border: none; background: #1976d2; color: white; border-radius: 4px; font-size: 0.875rem; font-weight: 500; cursor: pointer; font-family: inherit;">Save</button>
			`
		}))
	}
};

// Custom body styling - no padding for full-width layouts
export const NoPadding: Story = {
	args: {
		title: 'Custom Layout Dialog',
		noPadding: true,
		children: createContentSnippet(`
			<ul>
				<li style="padding: 16px 24px; border-top: 1px solid #dee2e6;">
					Section 1
				</li>
				<li style="padding: 16px 24px; border-top: 1px solid #dee2e6;">
					Section 2
				</li>
				<li style="padding: 16px 24px; border-top: 1px solid #dee2e6;">
					Section 3
				</li>
			</ul>
		`)
	}
};
