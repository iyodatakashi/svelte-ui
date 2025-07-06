import type { Meta, StoryObj } from '@storybook/sveltekit';
import Pagination from '../components/Pagination.svelte';

// 型安全性のための明示的な型定義
interface PaginationArgs {
	total: number;
	limit: number;
	currentPageNum: number;
	onchange: (pageNum: number) => void;
}

const meta: Meta<PaginationArgs> = {
	title: 'Navigation/Pagination',
	component: Pagination,
	parameters: {
		layout: 'centered',
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
			description: '総件数'
		},
		limit: {
			control: 'number',
			description: '1ページあたりの表示件数'
		},
		currentPageNum: {
			control: 'number',
			description: '現在のページ番号'
		},
		onchange: {
			control: false,
			action: 'page-changed',
			description: 'ページ変更時のコールバック関数'
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
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// Large Dataset - 大量のデータ
export const LargeDataset: Story = {
	args: {
		total: 50000,
		limit: 100,
		currentPageNum: 25,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// Small Dataset - 少量のデータ
export const SmallDataset: Story = {
	args: {
		total: 150,
		limit: 20,
		currentPageNum: 3,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// First Page - 最初のページ
export const FirstPage: Story = {
	args: {
		total: 1000,
		limit: 50,
		currentPageNum: 1,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// Last Page - 最後のページ
export const LastPage: Story = {
	args: {
		total: 1000,
		limit: 50,
		currentPageNum: 20,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// Middle Page - 中央のページ
export const MiddlePage: Story = {
	args: {
		total: 1000,
		limit: 50,
		currentPageNum: 10,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// Single Page - 1ページのみ
export const SinglePage: Story = {
	args: {
		total: 15,
		limit: 20,
		currentPageNum: 1,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// Few Pages - 少数のページ
export const FewPages: Story = {
	args: {
		total: 85,
		limit: 20,
		currentPageNum: 2,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// Many Pages - 多数のページ（MAX_VISIBLE_PAGES以上）
export const ManyPages: Story = {
	args: {
		total: 10000,
		limit: 10,
		currentPageNum: 500,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};

// High Limit - 1ページあたりの件数が多い場合
export const HighLimit: Story = {
	args: {
		total: 5000,
		limit: 500,
		currentPageNum: 5,
		onchange: (pageNum: number) => console.log('Page changed to:', pageNum)
	}
};
