import type { Meta, StoryObj } from '@storybook/sveltekit';
import SegmentedControl from '../lib/components/SegmentedControl.svelte';
import type { SegmentedControlItem } from '../lib/types/segmentedControlItem';

// 型安全性のための明示的な型定義
interface SegmentedControlArgs {
	items: SegmentedControlItem[];
	value?: string;
	size?: 'small' | 'medium' | 'large';
	fullWidth?: boolean;
	color?: string;
	rounded?: boolean;
	disabled?: boolean;
	ariaLabel?: string;
	ariaLabelledby?: string;
	iconFilled?: boolean;
	iconVariant?: 'outlined' | 'rounded' | 'sharp';
	iconWeight?: number;
	iconGrade?: number;
	iconOpticalSize?: number;
	reducedMotion?: boolean;
	onchange?: (value: string) => void;
}

const meta: Meta<SegmentedControlArgs> = {
	title: 'UI/SegmentedControl',
	component: SegmentedControl,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A segmented control component for switching between mutually exclusive options. Unlike Tab which is for navigation, this is for state switching within the same view.'
			}
		}
	},
	tags: ['autodocs'],
	render: (args) => ({
		Component: SegmentedControl,
		props: args
	}),
	argTypes: {
		items: {
			control: 'object',
			description: 'Array of items for the segmented control'
		},
		value: {
			control: 'text',
			description: 'Currently selected value (bindable)'
		},
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
			description: 'Size of the control'
		},
		fullWidth: {
			control: 'boolean',
			description: 'Whether the control should take full width'
		},
		color: {
			control: 'color',
			description: 'Selected segment color'
		},
		rounded: {
			control: 'boolean',
			description: 'Whether the control has rounded corners'
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the entire control is disabled'
		},
		ariaLabel: {
			control: 'text',
			description: 'Accessible label for the control'
		},
		ariaLabelledby: {
			control: 'text',
			description: 'ID of element that labels the control'
		},
		iconFilled: {
			control: 'boolean',
			description: 'Whether icons should be filled'
		},
		iconVariant: {
			control: 'select',
			options: ['outlined', 'rounded', 'sharp'],
			description: 'Icon variant style'
		},
		iconWeight: {
			control: 'select',
			options: [100, 200, 300, 400, 500, 600, 700],
			description: 'Icon weight'
		},
		iconGrade: {
			control: { type: 'range', min: -25, max: 200, step: 25 },
			description: 'Icon grade'
		},
		iconOpticalSize: {
			control: { type: 'range', min: 16, max: 48, step: 4 },
			description: 'Icon optical size'
		},
		reducedMotion: {
			control: 'boolean',
			description: 'Disable animations for reduced motion'
		},
		onchange: {
			action: 'changed',
			description: 'Called when selection changes'
		}
	}
};

export default meta;
type Story = StoryObj<SegmentedControlArgs>;

// Basic text only
export const Basic: Story = {
	args: {
		items: [
			{ label: 'リスト', value: 'list' },
			{ label: 'グリッド', value: 'grid' },
			{ label: '詳細', value: 'detail' }
		],
		value: 'list',
		ariaLabel: '表示モード'
	}
};

// With icons
export const WithIcons: Story = {
	args: {
		items: [
			{ label: 'リスト', value: 'list', icon: 'view_list' },
			{ label: 'グリッド', value: 'grid', icon: 'grid_view' },
			{ label: '詳細', value: 'detail', icon: 'view_agenda' }
		],
		value: 'list',
		ariaLabel: '表示モード'
	}
};

// Icons only (no labels)
export const IconsOnly: Story = {
	args: {
		items: [
			{ value: 'list', icon: 'view_list', ariaLabel: 'リスト表示' },
			{ value: 'grid', icon: 'grid_view', ariaLabel: 'グリッド表示' },
			{ value: 'detail', icon: 'view_agenda', ariaLabel: '詳細表示' }
		],
		value: 'list',
		ariaLabel: '表示モード'
	}
};

// Size variants
export const Small: Story = {
	args: {
		items: [
			{ label: '日', value: 'day' },
			{ label: '週', value: 'week' },
			{ label: '月', value: 'month' }
		],
		value: 'day',
		size: 'small',
		ariaLabel: '期間'
	}
};

export const Large: Story = {
	args: {
		items: [
			{ label: '日', value: 'day' },
			{ label: '週', value: 'week' },
			{ label: '月', value: 'month' }
		],
		value: 'day',
		size: 'large',
		ariaLabel: '期間'
	}
};

// Full width
export const FullWidth: Story = {
	args: {
		items: [
			{ label: 'すべて', value: 'all' },
			{ label: 'アクティブ', value: 'active' },
			{ label: '完了', value: 'completed' }
		],
		value: 'all',
		fullWidth: true,
		ariaLabel: 'フィルタ'
	}
};

// Rounded
export const Rounded: Story = {
	args: {
		items: [
			{ label: '日', value: 'day' },
			{ label: '週', value: 'week' },
			{ label: '月', value: 'month' }
		],
		value: 'day',
		rounded: true,
		ariaLabel: '期間'
	}
};

// Custom color
export const CustomColor: Story = {
	args: {
		items: [
			{ label: 'リスト', value: 'list' },
			{ label: 'グリッド', value: 'grid' },
			{ label: '詳細', value: 'detail' }
		],
		value: 'list',
		color: '#e91e63',
		ariaLabel: '表示モード'
	}
};

// Disabled
export const Disabled: Story = {
	args: {
		items: [
			{ label: 'リスト', value: 'list' },
			{ label: 'グリッド', value: 'grid' },
			{ label: '詳細', value: 'detail' }
		],
		value: 'list',
		disabled: true,
		ariaLabel: '表示モード'
	}
};

// With disabled items
export const WithDisabledItems: Story = {
	args: {
		items: [
			{ label: 'リスト', value: 'list' },
			{ label: 'グリッド', value: 'grid', disabled: true },
			{ label: '詳細', value: 'detail' }
		],
		value: 'list',
		ariaLabel: '表示モード'
	}
};

// Many items
export const ManyItems: Story = {
	args: {
		items: [
			{ label: 'オプション1', value: 'opt1' },
			{ label: 'オプション2', value: 'opt2' },
			{ label: 'オプション3', value: 'opt3' },
			{ label: 'オプション4', value: 'opt4' },
			{ label: 'オプション5', value: 'opt5' },
			{ label: 'オプション6', value: 'opt6' }
		],
		value: 'opt1',
		ariaLabel: 'オプション選択'
	}
};

// Two items
export const TwoItems: Story = {
	args: {
		items: [
			{ label: 'オン', value: 'on' },
			{ label: 'オフ', value: 'off' }
		],
		value: 'on',
		ariaLabel: 'トグル'
	}
};

// Accessibility example
export const AccessibilityExample: Story = {
	args: {
		items: [
			{ label: 'リスト', value: 'list', icon: 'view_list' },
			{ label: 'グリッド', value: 'grid', icon: 'grid_view' },
			{ label: '詳細', value: 'detail', icon: 'view_agenda' }
		],
		value: 'list',
		ariaLabel: '表示モードの切り替え'
	},
	parameters: {
		docs: {
			description: {
				story:
					'Demonstrates accessibility features including keyboard navigation (arrow keys, Home/End, Space/Enter), focus management, and screen reader support. Try using Tab to focus the control, then arrow keys to navigate between segments.'
			}
		}
	}
};

// Playground
export const Playground: Story = {
	args: {
		items: [
			{ label: 'オプション1', value: 'opt1', icon: 'home' },
			{ label: 'オプション2', value: 'opt2', icon: 'settings' },
			{ label: 'オプション3', value: 'opt3', icon: 'info' }
		],
		value: 'opt1',
		size: 'medium',
		fullWidth: false,
		rounded: true,
		disabled: false,
		ariaLabel: 'カスタマイズ可能なセグメントコントロール',
		iconFilled: false,
		iconVariant: 'outlined',
		iconWeight: 300,
		iconGrade: 0,
		reducedMotion: false
	}
};
