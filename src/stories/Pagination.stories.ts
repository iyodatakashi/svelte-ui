import type { Meta, StoryObj } from '@storybook/sveltekit';
import Pagination from '../lib/components/Pagination.svelte';

// 型安全性のための明示的な型定義
interface PaginationArgs {
	total: number;
	limit: number;
	currentPageNum: number;
	visiblePages: number;
	showCount: boolean;
	showRange: boolean;
	showTotal: boolean;
	onchange: (pageNum: number) => void;
}

const meta: Meta<PaginationArgs> = {
	title: 'Navigation/Pagination',
	component: Pagination,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'ページネーションコンポーネント。大量のデータを複数のページに分割して表示する際に使用します。'
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
		}
	}
};

export default meta;
type Story = StoryObj<PaginationArgs>;

// Default - 標準的なページネーション
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

// Large Dataset - 大量のデータ
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

// Small Dataset - 少量のデータ
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

// First Page - 最初のページ
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

// Last Page - 最後のページ
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

// Middle Page - 中央のページ
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

// Single Page - 1ページのみ
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

// Few Pages - 少数のページ
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

// Many Pages - 多数のページ（MAX_VISIBLE_PAGES以上）
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

// High Limit - 1ページあたりの件数が多い場合
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

// Count Display Variants - count表示のバリエーション

// No Count Display - count表示なし
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

// Range Only - 範囲のみ表示
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

// Total Only - 総件数のみ表示
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

// Custom Visible Pages - 表示ページ数カスタム
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

// Minimal Visible Pages - 最小表示ページ数
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
