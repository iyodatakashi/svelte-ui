import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import Popup from '../components/Popup.svelte';

// 型安全性のための明示的な型定義
interface PopupArgs {
	anchorElement: HTMLElement;
	position?:
		| 'top'
		| 'bottom'
		| 'left'
		| 'right'
		| 'top-left'
		| 'top-center'
		| 'top-right'
		| 'bottom-left'
		| 'bottom-center'
		| 'bottom-right'
		| 'left-top'
		| 'left-center'
		| 'left-bottom'
		| 'right-top'
		| 'right-center'
		| 'right-bottom'
		| 'auto';
	children: Snippet;
}

const meta: Meta<PopupArgs> = {
	title: 'UI/Popup',
	component: Popup,
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
		Component: Popup,
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
		// SnippetとanchorElementはコントロールから除外
		children: {
			control: false,
			description: 'Popup content'
		},
		anchorElement: {
			control: false,
			description: 'HTML element to position popup relative to'
		}
	}
};

export default meta;
type Story = StoryObj<PopupArgs>;

// Helper function to create snippet for children
const createChildrenSnippet = (content: string) =>
	createRawSnippet(() => ({
		render: () => content
	}));

// モックのアンカー要素を作成する関数
const createMockAnchorElement = (): HTMLElement => {
	const element = document.createElement('button');
	element.textContent = 'Anchor Button';
	element.style.padding = '8px 16px';
	element.style.background = 'var(--primary-color)';
	element.style.color = 'white';
	element.style.border = 'none';
	element.style.borderRadius = '4px';
	element.style.cursor = 'pointer';
	return element;
};

// Default (bottom position)
export const Default: Story = {
	args: {
		position: 'bottom',
		anchorElement: createMockAnchorElement(),
		children: createChildrenSnippet(`
			<div style="padding: 16px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
				<h3 style="margin: 0 0 8px 0;">Popup Title</h3>
				<p style="margin: 0;">This is popup content positioned at the bottom.</p>
			</div>
		`)
	}
};

// Top position
export const Top: Story = {
	args: {
		position: 'top',
		anchorElement: createMockAnchorElement(),
		children: createChildrenSnippet(`
			<div style="padding: 16px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
				<h3 style="margin: 0 0 8px 0;">Top Popup</h3>
				<p style="margin: 0;">This popup appears above the anchor element.</p>
			</div>
		`)
	}
};

// Left position
export const Left: Story = {
	args: {
		position: 'left',
		anchorElement: createMockAnchorElement(),
		children: createChildrenSnippet(`
			<div style="padding: 16px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
				<h3 style="margin: 0 0 8px 0;">Left Popup</h3>
				<p style="margin: 0;">This popup appears to the left of the anchor.</p>
			</div>
		`)
	}
};

// Right position
export const Right: Story = {
	args: {
		position: 'right',
		anchorElement: createMockAnchorElement(),
		children: createChildrenSnippet(`
			<div style="padding: 16px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
				<h3 style="margin: 0 0 8px 0;">Right Popup</h3>
				<p style="margin: 0;">This popup appears to the right of the anchor.</p>
			</div>
		`)
	}
};

// Auto positioning (智能定位)
export const AutoPositioning: Story = {
	args: {
		position: 'auto',
		anchorElement: createMockAnchorElement(),
		children: createChildrenSnippet(`
			<div style="padding: 16px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
				<h3 style="margin: 0 0 8px 0;">🤖 Auto Positioning</h3>
				<p style="margin: 0;">This popup automatically finds the best position based on available space!</p>
			</div>
		`)
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
		anchorElement: createMockAnchorElement(),
		children: createChildrenSnippet(`
			<div style="padding: 12px; background: #e3f2fd; border-radius: 4px; border-left: 4px solid #2196f3;">
				<strong>Top-Left</strong><br/>Aligned to top-left corner
			</div>
		`)
	}
};

export const TopRight: Story = {
	args: {
		position: 'top-right',
		anchorElement: createMockAnchorElement(),
		children: createChildrenSnippet(`
			<div style="padding: 12px; background: #f3e5f5; border-radius: 4px; border-left: 4px solid #9c27b0;">
				<strong>Top-Right</strong><br/>Aligned to top-right corner
			</div>
		`)
	}
};

export const BottomLeft: Story = {
	args: {
		position: 'bottom-left',
		anchorElement: createMockAnchorElement(),
		children: createChildrenSnippet(`
			<div style="padding: 12px; background: #e8f5e8; border-radius: 4px; border-left: 4px solid #4caf50;">
				<strong>Bottom-Left</strong><br/>Aligned to bottom-left corner
			</div>
		`)
	}
};

export const BottomRight: Story = {
	args: {
		position: 'bottom-right',
		anchorElement: createMockAnchorElement(),
		children: createChildrenSnippet(`
			<div style="padding: 12px; background: #fff3e0; border-radius: 4px; border-left: 4px solid #ff9800;">
				<strong>Bottom-Right</strong><br/>Aligned to bottom-right corner
			</div>
		`)
	}
};

export const LeftTop: Story = {
	args: {
		position: 'left-top',
		anchorElement: createMockAnchorElement(),
		children: createChildrenSnippet(`
			<div style="padding: 12px; background: #fce4ec; border-radius: 4px; border-left: 4px solid #e91e63;">
				<strong>Left-Top</strong><br/>Left side, top aligned
			</div>
		`)
	}
};

export const RightBottom: Story = {
	args: {
		position: 'right-bottom',
		anchorElement: createMockAnchorElement(),
		children: createChildrenSnippet(`
			<div style="padding: 12px; background: #e0f2f1; border-radius: 4px; border-left: 4px solid #009688;">
				<strong>Right-Bottom</strong><br/>Right side, bottom aligned
			</div>
		`)
	}
};

// Position Matrix Demo
export const PositionMatrix: Story = {
	render: () => ({
		Component: Popup,
		props: {
			anchorElement: createMockAnchorElement(),
			position: 'bottom',
			children: createChildrenSnippet(`
				<div style="padding: 20px; background: white; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,0.1); max-width: 400px;">
					<h3 style="margin: 0 0 16px 0; text-align: center;">📍 Available Positions</h3>
					<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px;">
						<div style="padding: 8px; background: #e3f2fd; border-radius: 4px; text-align: center; font-size: 12px;">top-left</div>
						<div style="padding: 8px; background: #e3f2fd; border-radius: 4px; text-align: center; font-size: 12px;">top-center</div>
						<div style="padding: 8px; background: #e3f2fd; border-radius: 4px; text-align: center; font-size: 12px;">top-right</div>
						<div style="padding: 8px; background: #f3e5f5; border-radius: 4px; text-align: center; font-size: 12px;">left-top</div>
						<div style="padding: 8px; background: #fff3e0; border-radius: 4px; text-align: center; font-size: 12px; font-weight: bold;">🎯 ANCHOR</div>
						<div style="padding: 8px; background: #e8f5e8; border-radius: 4px; text-align: center; font-size: 12px;">right-top</div>
						<div style="padding: 8px; background: #f3e5f5; border-radius: 4px; text-align: center; font-size: 12px;">left-center</div>
						<div style="padding: 8px; background: #ffebee; border-radius: 4px; text-align: center; font-size: 12px;">AUTO</div>
						<div style="padding: 8px; background: #e8f5e8; border-radius: 4px; text-align: center; font-size: 12px;">right-center</div>
						<div style="padding: 8px; background: #f3e5f5; border-radius: 4px; text-align: center; font-size: 12px;">left-bottom</div>
						<div style="padding: 8px; background: #e0f2f1; border-radius: 4px; text-align: center; font-size: 12px;">bottom-center</div>
						<div style="padding: 8px; background: #e8f5e8; border-radius: 4px; text-align: center; font-size: 12px;">right-bottom</div>
						<div style="padding: 8px; background: #e0f2f1; border-radius: 4px; text-align: center; font-size: 12px;">bottom-left</div>
						<div style="padding: 8px; background: #e0f2f1; border-radius: 4px; text-align: center; font-size: 12px;">bottom-center</div>
						<div style="padding: 8px; background: #e0f2f1; border-radius: 4px; text-align: center; font-size: 12px;">bottom-right</div>
					</div>
					<p style="margin: 0; font-size: 14px; color: #666; text-align: center;">
						Use the position control above to test different placements!
					</p>
				</div>
			`)
		}
	}),
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
		anchorElement: createMockAnchorElement(),
		children: createChildrenSnippet(`
			<div style="padding: 16px; background: white; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); min-width: 200px;">
				<h3 style="margin: 0 0 12px 0;">Settings</h3>
				<div style="display: flex; flex-direction: column; gap: 8px;">
					<label style="display: flex; align-items: center; gap: 8px;">
						<input type="checkbox" />
						Enable notifications
					</label>
					<label style="display: flex; align-items: center; gap: 8px;">
						<input type="checkbox" />
						Auto-save
					</label>
					<hr style="margin: 8px 0; border: none; border-top: 1px solid #e0e0e0;" />
					<button style="padding: 4px 8px; background: var(--primary-color); color: white; border: none; border-radius: 2px;">
						Save
					</button>
				</div>
			</div>
		`)
	}
};
