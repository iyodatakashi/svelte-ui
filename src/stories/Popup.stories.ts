import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import PopupExample from './PopupExample.svelte';

const meta = {
	title: 'UI/Popup',
	component: PopupExample,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component:
					'A basic popup component that displays content relative to an anchor element with positioning and animation.'
			}
		}
	},
	tags: ['autodocs'],
	render: (args) => ({
		Component: PopupExample,
		props: args
	}),
	argTypes: {
		position: {
			control: 'select',
			options: [
				'auto',
				'top',
				'bottom',
				'left',
				'right',
				'top-left',
				'top-center',
				'top-right',
				'bottom-left',
				'bottom-center',
				'bottom-right',
				'left-top',
				'left-center',
				'left-bottom',
				'right-top',
				'right-center',
				'right-bottom'
			],
			description:
				'Position of popup relative to anchor element. Use "auto" for optimal positioning.'
		},
		// Snippet props are excluded from controls
		children: {
			control: false,
			description: 'Popup content'
		}
	}
} satisfies Meta<typeof PopupExample>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create snippet for children
const createChildrenSnippet = (content: string) =>
	createRawSnippet(() => ({
		render: () => content
	}));

// Default (bottom position)
export const Default: Story = {
	args: {
		position: 'bottom',
		children: createChildrenSnippet('<p>Popup at bottom.</p>')
	}
};

// Top position
export const Top: Story = {
	args: {
		position: 'top',
		children: createChildrenSnippet('<p>Popup at top.</p>')
	}
};

// Left position
export const Left: Story = {
	args: {
		position: 'left',
		children: createChildrenSnippet('<p>Popup at left.</p>')
	}
};

// Right position
export const Right: Story = {
	args: {
		position: 'right',
		children: createChildrenSnippet('<p>Popup at right.</p>')
	}
};

// Auto positioning (smart positioning)
export const AutoPositioning: Story = {
	args: {
		position: 'auto',
		children: createChildrenSnippet(
			'<p>Popup automatically chooses the best position based on available space.</p>'
		)
	},
	parameters: {
		docs: {
			description: {
				story:
					'Auto positioning automatically selects the best position based on available viewport space.'
			}
		}
	}
};

// Detailed positioning examples
export const TopLeft: Story = {
	args: {
		position: 'top-left',
		children: createChildrenSnippet('<p>Popup at top-left.</p>')
	}
};

export const TopRight: Story = {
	args: {
		position: 'top-right',
		children: createChildrenSnippet('<p>Popup at top-right.</p>')
	}
};

export const BottomLeft: Story = {
	args: {
		position: 'bottom-left',
		children: createChildrenSnippet('<p>Popup at bottom-left.</p>')
	}
};

export const BottomRight: Story = {
	args: {
		position: 'bottom-right',
		children: createChildrenSnippet('<p>Popup at bottom-right.</p>')
	}
};

export const LeftTop: Story = {
	args: {
		position: 'left-top',
		children: createChildrenSnippet('<p>Popup at left-top.</p>')
	}
};

export const RightBottom: Story = {
	args: {
		position: 'right-bottom',
		children: createChildrenSnippet('<p>Popup at right-bottom.</p>')
	}
};

// Position Matrix Demo
export const PositionMatrix: Story = {
	args: {
		position: 'bottom',
		children: createChildrenSnippet(
			'<p>Popup for checking all supported positions. Change the position control above to see each placement.</p>'
		)
	},
	parameters: {
		docs: {
			description: {
				story:
					'Visual guide showing all available positioning options. Use the position control to test different placements.'
			}
		}
	}
};

// Complex content
export const ComplexContent: Story = {
	args: {
		position: 'bottom',
		children: createChildrenSnippet(`
			<div>
				<h3>Settings</h3>
				<div>
					<label>
						<input type="checkbox" />
						Enable notifications
					</label>
					<label>
						<input type="checkbox" />
						Auto-save
					</label>
					<button>Save</button>
				</div>
			</div>
		`)
	}
};
