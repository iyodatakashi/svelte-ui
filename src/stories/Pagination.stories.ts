import type { Meta, StoryObj } from '@storybook/sveltekit';
import Pagination from '../lib/components/Pagination.svelte';

const meta = {
	title: 'Navigation/Pagination',
	component: Pagination,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A pagination component for splitting large datasets across multiple pages.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		total: {
			control: 'number',
			description: 'Total number of items'
		},
		limit: {
			control: 'number',
			description: 'Items per page'
		},
		currentPageNum: {
			control: 'number',
			description: 'Current page number (1-based)'
		},
		visiblePages: {
			control: 'number',
			description: 'Number of page buttons to display',
			defaultValue: 5
		},
		showCount: {
			control: 'boolean',
			description: 'Whether to show the count section',
			defaultValue: true
		},
		showRange: {
			control: 'boolean',
			description: 'Whether to show current item range (e.g. "1 - 50")',
			defaultValue: true
		},
		showTotal: {
			control: 'boolean',
			description: 'Whether to show total count (e.g. "1,000")',
			defaultValue: true
		},
		onchange: {
			control: false,
			action: 'page-changed',
			description: 'Callback fired when the page changes'
		},
		id: {
			control: 'text',
			description: 'ID for the root element'
		}
	}
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
	args: {
		total: 1000,
		limit: 20,
		currentPageNum: 1,
		visiblePages: 5,
		showCount: true,
		showRange: true,
		showTotal: true,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// Large Dataset
export const LargeDataset: Story = {
	args: {
		total: 50000,
		limit: 100,
		currentPageNum: 25,
		visiblePages: 5,
		showCount: true,
		showRange: true,
		showTotal: true,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// Small Dataset
export const SmallDataset: Story = {
	args: {
		total: 150,
		limit: 20,
		currentPageNum: 3,
		visiblePages: 5,
		showCount: true,
		showRange: true,
		showTotal: true,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// First Page
export const FirstPage: Story = {
	args: {
		total: 1000,
		limit: 50,
		currentPageNum: 1,
		visiblePages: 5,
		showCount: true,
		showRange: true,
		showTotal: true,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// Last Page
export const LastPage: Story = {
	args: {
		total: 1000,
		limit: 50,
		currentPageNum: 20,
		visiblePages: 5,
		showCount: true,
		showRange: true,
		showTotal: true,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// Middle Page
export const MiddlePage: Story = {
	args: {
		total: 1000,
		limit: 50,
		currentPageNum: 10,
		visiblePages: 5,
		showCount: true,
		showRange: true,
		showTotal: true,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// Single Page
export const SinglePage: Story = {
	args: {
		total: 15,
		limit: 20,
		currentPageNum: 1,
		visiblePages: 5,
		showCount: true,
		showRange: true,
		showTotal: true,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// Few Pages
export const FewPages: Story = {
	args: {
		total: 85,
		limit: 20,
		currentPageNum: 2,
		visiblePages: 5,
		showCount: true,
		showRange: true,
		showTotal: true,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// Many Pages
export const ManyPages: Story = {
	args: {
		total: 10000,
		limit: 10,
		currentPageNum: 500,
		visiblePages: 5,
		showCount: true,
		showRange: true,
		showTotal: true,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// High Limit
export const HighLimit: Story = {
	args: {
		total: 5000,
		limit: 500,
		currentPageNum: 5,
		visiblePages: 5,
		showCount: true,
		showRange: true,
		showTotal: true,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// Count Display Variants

// No Count Display
export const NoCountDisplay: Story = {
	args: {
		total: 1000,
		limit: 20,
		currentPageNum: 5,
		visiblePages: 5,
		showCount: false,
		showRange: true,
		showTotal: true,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// Range Only
export const RangeOnly: Story = {
	args: {
		total: 1000,
		limit: 20,
		currentPageNum: 5,
		visiblePages: 5,
		showCount: true,
		showRange: true,
		showTotal: false,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// Total Only
export const TotalOnly: Story = {
	args: {
		total: 1000,
		limit: 20,
		currentPageNum: 5,
		visiblePages: 5,
		showCount: true,
		showRange: false,
		showTotal: true,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// Custom Visible Pages
export const CustomVisiblePages: Story = {
	args: {
		total: 1000,
		limit: 20,
		currentPageNum: 10,
		visiblePages: 7,
		showCount: true,
		showRange: true,
		showTotal: true,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// Minimal Visible Pages
export const MinimalVisiblePages: Story = {
	args: {
		total: 1000,
		limit: 20,
		currentPageNum: 10,
		visiblePages: 3,
		showCount: true,
		showRange: true,
		showTotal: true,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};
