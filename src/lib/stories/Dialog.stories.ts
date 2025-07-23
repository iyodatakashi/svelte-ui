import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import Dialog from '../components/Dialog.svelte';

// 型安全性のための明示的な型定義
interface DialogArgs {
	isOpen: boolean;
	title?: string;
	scrollable?: boolean;
	closeIfClickOutside?: boolean;
	width?: string | number;
	restoreFocus?: boolean;
	ariaDescribedby?: string;
	description?: string;
	header?: Snippet;
	children?: Snippet;
	footer?: Snippet;
	bodyStyle?: string;
	noPadding?: boolean;
}

const meta: Meta<DialogArgs> = {
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
		Component: Dialog,
		props: args
	}),
	argTypes: {
		isOpen: {
			control: 'boolean',
			description: 'Whether the dialog is open'
		},
		title: {
			control: 'text',
			description: 'Dialog title (displayed in header)'
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
		// Snippetはコントロールから除外
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
};

export default meta;
type Story = StoryObj<DialogArgs>;

// Helper function to create snippet for content
const createContentSnippet = (content: string) =>
	createRawSnippet(() => ({
		render: () => content
	}));

// Default dialog with title
export const Default: Story = {
	args: {
		isOpen: true,
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

// Dialog with custom header
export const CustomHeader: Story = {
	args: {
		isOpen: true,
		width: 400,
		header: createContentSnippet(`
			<div style="display: flex; align-items: center; gap: 12px; width: 100%;">
				<span style="font-size: 1.5rem;">⚙️</span>
				<h2 style="margin: 0; flex: 1;">Settings</h2>
				<!-- In real usage, use <IconButton icon="close" onclick={close} /> -->
				<button style="padding: 4px 8px; border: 1px solid #ccc; background: white; border-radius: 4px; font-size: 0.875rem; cursor: pointer;">
					✕
				</button>
			</div>
		`),
		children: createContentSnippet(`
			<div>
				<p>This dialog has a custom header with an icon and close button.</p>
				<div style="margin-top: 16px;">
					<label style="display: block; margin-bottom: 8px;">
						<input type="checkbox" style="margin-right: 8px;">
						Enable notifications
					</label>
					<label style="display: block; margin-bottom: 8px;">
						<input type="checkbox" style="margin-right: 8px;" checked>
						Auto-save changes
					</label>
				</div>
			</div>
		`)
	},
	parameters: {
		docs: {
			description: {
				story:
					'Dialog with custom header including icon and close button. In real usage, use IconButton for the close button: `<IconButton icon="close" onclick={closeDialog} />`'
			}
		}
	}
};

// Dialog with footer buttons
export const WithFooter: Story = {
	args: {
		isOpen: true,
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
				<button style="padding: 8px 16px; border: 1px solid var(--svelte-ui-border-color, #ccc); background: var(--svelte-ui-surface-color, white); border-radius: 4px; font-size: 0.875rem; font-weight: 500; cursor: pointer; font-family: inherit; transition: all 0.2s; color: var(--svelte-ui-text-color, #333);" onmouseover="this.style.backgroundColor='var(--svelte-ui-hover-color, #f5f5f5)'" onmouseout="this.style.backgroundColor='var(--svelte-ui-surface-color, white)'">
					Cancel
				</button>
				<button style="padding: 8px 16px; border: none; background: #d32f2f; color: white; border-radius: 4px; font-size: 0.875rem; font-weight: 500; cursor: pointer; font-family: inherit; transition: all 0.2s;" onmouseover="this.style.backgroundColor='#b71c1c'" onmouseout="this.style.backgroundColor='#d32f2f'">
					Delete
				</button>
			`
		}))
	},
	parameters: {
		docs: {
			description: {
				story:
					'Dialog with footer buttons. In real usage, use Button components: `<Button variant="outlined">Cancel</Button>` and `<Button variant="filled">Delete</Button>`'
			}
		}
	}
};

// Scrollable dialog
export const Scrollable: Story = {
	args: {
		isOpen: true,
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
				<button style="padding: 8px 16px; border: 1px solid var(--svelte-ui-border-color, #ccc); background: var(--svelte-ui-surface-color, white); border-radius: 4px; font-size: 0.875rem; font-weight: 500; cursor: pointer; font-family: inherit; transition: all 0.2s; color: var(--svelte-ui-text-color, #333);" onmouseover="this.style.backgroundColor='var(--svelte-ui-hover-color, #f5f5f5)'" onmouseout="this.style.backgroundColor='var(--svelte-ui-surface-color, white)'">
					Cancel
				</button>
				<button style="padding: 8px 16px; border: none; background: #1976d2; color: white; border-radius: 4px; font-size: 0.875rem; font-weight: 500; cursor: pointer; font-family: inherit; transition: all 0.2s;" onmouseover="this.style.backgroundColor='#1565c0'" onmouseout="this.style.backgroundColor='#1976d2'">
					Save
				</button>
			`
		}))
	}
};

// Large width dialog
export const LargeWidth: Story = {
	args: {
		isOpen: true,
		title: 'Large Dialog',
		width: 800,
		children: createContentSnippet(`
			<div>
				<h3>Wide Content Area</h3>
				<p>This dialog is wider to accommodate more content.</p>
				<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 16px;">
					<div style="padding: 16px; background: #f5f5f5; border-radius: 4px;">
						<h4>Left Column</h4>
						<p>Content for the left side.</p>
					</div>
					<div style="padding: 16px; background: #f5f5f5; border-radius: 4px;">
						<h4>Right Column</h4>
						<p>Content for the right side.</p>
					</div>
				</div>
			</div>
		`)
	}
};

// Form dialog
export const FormDialog: Story = {
	args: {
		isOpen: true,
		title: 'Add New Item',
		width: 450,
		description: 'Fill out the form below to create a new item',
		children: createContentSnippet(`
			<div>
				<form>
					<div style="margin-bottom: 16px;">
						<label style="display: block; margin-bottom: 4px; font-weight: 500;">Name</label>
						<input type="text" style="width: 100%; padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
					</div>
					<div style="margin-bottom: 16px;">
						<label style="display: block; margin-bottom: 4px; font-weight: 500;">Description</label>
						<textarea style="width: 100%; padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; resize: vertical; min-height: 80px;"></textarea>
					</div>
					<div style="margin-bottom: 16px;">
						<label style="display: block; margin-bottom: 4px; font-weight: 500;">Category</label>
						<select style="width: 100%; padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
							<option>Select a category</option>
							<option>Work</option>
							<option>Personal</option>
							<option>Other</option>
						</select>
					</div>
				</form>
			</div>
		`),
		footer: createContentSnippet(`
			<!-- In real usage, use <Button variant="outlined">Cancel</Button> -->
			<button style="padding: 8px 16px; border: 1px solid #ccc; background: white; border-radius: 4px; font-size: 0.875rem; font-weight: 500; cursor: pointer;">
				Cancel
			</button>
			<!-- In real usage, use <Button variant="filled">Add Item</Button> -->
			<button style="padding: 8px 16px; border: none; background: #1976d2; color: white; border-radius: 4px; font-size: 0.875rem; font-weight: 500; cursor: pointer;">
				Add Item
			</button>
		`)
	},
	parameters: {
		docs: {
			description: {
				story:
					'Form dialog with input fields and action buttons. Use Button components in the footer: `<Button variant="outlined">Cancel</Button>` and `<Button variant="filled">Submit</Button>`'
			}
		}
	}
};

// Custom body styling - no padding for full-width layouts
export const NoPadding: Story = {
	args: {
		isOpen: true,
		title: 'Custom Layout Dialog',
		width: 500,
		noPadding: true,
		children: createContentSnippet(`
			<div>
				<div style="padding: 20px; background: #f8f9fa; border-bottom: 1px solid #dee2e6;">
					<h3 style="margin: 0;">Section 1</h3>
					<p style="margin: 8px 0 0 0;">Full-width section with custom padding</p>
				</div>
				<div style="padding: 20px;">
					<h3 style="margin: 0 0 12px 0;">Section 2</h3>
					<p style="margin: 0;">Normal content section</p>
				</div>
				<div style="padding: 20px; background: #e9ecef; border-top: 1px solid #dee2e6;">
					<h3 style="margin: 0;">Section 3</h3>
					<p style="margin: 8px 0 0 0;">Another full-width section</p>
				</div>
			</div>
		`)
	},
	parameters: {
		docs: {
			description: {
				story:
					'Dialog with noPadding=true to allow custom layouts with full-width sections and border lines.'
			}
		}
	}
};

// Custom body styling with CSS
export const CustomBodyStyle: Story = {
	args: {
		isOpen: true,
		title: 'Custom Styled Dialog',
		width: 400,
		bodyStyle: 'padding: 0; background: linear-gradient(45deg, #f0f9ff, #e0f2fe);',
		children: createContentSnippet(`
			<div style="padding: 24px;">
				<h3 style="margin: 0 0 16px 0; color: #0369a1;">Custom Styling</h3>
				<p style="margin: 0 0 16px 0;">This dialog uses bodyStyle to apply custom CSS including gradient background and custom padding.</p>
				<div style="padding: 16px; background: rgba(255,255,255,0.8); border-radius: 8px; border: 1px solid #0284c7;">
					<strong>Custom styled content area</strong>
				</div>
			</div>
		`)
	},
	parameters: {
		docs: {
			description: {
				story: 'Dialog with custom bodyStyle CSS to create unique layouts and styling.'
			}
		}
	}
};
