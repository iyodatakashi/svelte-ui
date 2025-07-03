import type { Meta, StoryObj } from '@storybook/sveltekit';
import { createRawSnippet } from 'svelte';
import type { Snippet } from 'svelte';
import Popup from '../components/Popup.svelte';

// 型安全性のための明示的な型定義
interface PopupArgs {
	anchorElement: HTMLElement;
	position?: 'top' | 'bottom' | 'left' | 'right';
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
			options: ['top', 'bottom', 'left', 'right'],
			description: 'Position of popup relative to anchor element'
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
