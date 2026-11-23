import type { BivariantValueHandler } from '#lib/models/eventHandler/eventHandler.types';

export type PaginationProps = {
	// 基本プロパティ
	/** Total number of items. */
	total: number;
	/** Items per page. */
	limit: number;
	/** Current page number (1-based). Supports `bind:currentPageNum`. */
	currentPageNum: number;
	/** Number of page buttons shown. @default 5 */
	visiblePages?: number;

	// HTML属性
	id?: string;

	// 状態/動作
	/** Shows "X items" count. @default true */
	showCount?: boolean;
	/** Shows "X–Y of" range. @default true */
	showRange?: boolean;
	/** Shows total count. @default true */
	showTotal?: boolean;

	// イベントハンドラー
	onchange?: BivariantValueHandler<number>;
};
