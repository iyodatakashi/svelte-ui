<!-- Pagination.svelte -->

<script lang="ts">
	import IconButton from './IconButton.svelte';
	import { announceToScreenReader } from '../utils/accessibility';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let {
		// 基本プロパティ
		total,
		limit = 100,
		currentPageNum = 1,
		visiblePages = 5,

		// 入力イベント
		onchange = () => {}
	}: {
		// 基本プロパティ
		total: number;
		limit: number;
		currentPageNum: number;
		visiblePages?: number;

		// 入力イベント
		onchange: (pageNum: number) => void;
	} = $props();

	// =========================================================================
	// Methods
	// =========================================================================
	const handleClick = (pageNum: number) => {
		onchange(pageNum);
		announceToScreenReader(`Page ${pageNum} of ${totalPages}`);
	};

	const goFirstPage = () => {
		onchange(1);
		announceToScreenReader(`First page, page 1 of ${totalPages}`);
	};

	const goLastPage = () => {
		onchange(totalPages);
		announceToScreenReader(`Last page, page ${totalPages} of ${totalPages}`);
	};

	const goPrevPage = () => {
		const newPage = currentPageNum - 1;
		onchange(newPage);
		announceToScreenReader(`Previous page, page ${newPage} of ${totalPages}`);
	};

	const goNextPage = () => {
		const newPage = currentPageNum + 1;
		onchange(newPage);
		announceToScreenReader(`Next page, page ${newPage} of ${totalPages}`);
	};

	// =========================================================================
	// $derived
	// =========================================================================
	const totalPages = $derived(Math.ceil(total / limit));

	// ページリストとエリプシスを含む表示アイテムを生成
	const pageItems = $derived.by(() => {
		const items: Array<{ type: 'page' | 'ellipsis'; value: number | null }> = [];

		if (totalPages <= visiblePages + 2) {
			// 総ページ数が少ない場合は全て表示
			return Array.from({ length: totalPages }, (_, i) => ({ type: 'page', value: i + 1 }));
		}

		// 現在のページを中心とした連続するページ範囲を計算
		const half = Math.floor(visiblePages / 2);
		let start = Math.max(1, currentPageNum - half);
		let end = Math.min(totalPages, start + visiblePages - 1);

		// 右端に寄りすぎた場合の調整
		if (end === totalPages && end - start + 1 < visiblePages) {
			start = Math.max(1, totalPages - visiblePages + 1);
		}

		// 1ページ目を追加（範囲に含まれていない場合）
		if (start > 1) {
			items.push({ type: 'page', value: 1 });

			// ギャップがある場合はエリプシスを追加
			if (start > 2) {
				items.push({ type: 'ellipsis', value: null });
			}
		}

		// メインの連続ページ範囲を追加
		for (let i = start; i <= end; i++) {
			items.push({ type: 'page', value: i });
		}

		// 最終ページを追加（範囲に含まれていない場合）
		if (end < totalPages) {
			// ギャップがある場合はエリプシスを追加
			if (end < totalPages - 1) {
				items.push({ type: 'ellipsis', value: null });
			}

			items.push({ type: 'page', value: totalPages });
		}

		return items;
	});

	// 現在のページのアイテム範囲を計算
	const currentPageRange = $derived.by(() => {
		const startItem = (currentPageNum - 1) * limit + 1;
		const endItem = Math.min(currentPageNum * limit, total);
		return { start: startItem, end: endItem };
	});

	// 表示用のテキストを生成
	const rangeText = $derived.by(() => {
		const { start, end } = currentPageRange;
		return `${start.toLocaleString()} - ${end.toLocaleString()} / ${total.toLocaleString()}`;
	});
</script>

<div class="pagination">
	<div class="pagination__count">{rangeText}</div>
	<ul class="pagination__list">
		<li>
			<IconButton
				ariaLabel="前のページへ移動"
				color="var(--svelte-ui-pagination-nav-color)"
				disabled={currentPageNum === 1}
				onclick={goPrevPage}
			>
				chevron_left
			</IconButton>
		</li>
		{#each pageItems as item, index (item.type === 'page' ? `page-${item.value}` : `ellipsis-${index}`)}
			<li>
				{#if item.type === 'page'}
					<button
						class="pagination__button"
						class:pagination__button--selected={item.value === currentPageNum}
						aria-label={`${item.value}ページ目へ移動`}
						onclick={() => handleClick(item.value!)}
					>
						{item.value}
					</button>
				{:else}
					<span class="pagination__ellipsis" aria-label="省略されたページ">...</span>
				{/if}
			</li>
		{/each}
		<li>
			<IconButton
				ariaLabel="次のページへ移動"
				color="var(--svelte-ui-pagination-nav-color)"
				disabled={currentPageNum === totalPages}
				onclick={goNextPage}
			>
				chevron_right
			</IconButton>
		</li>
	</ul>
</div>

<style>
	.pagination {
		display: flex;
		align-items: center;
		gap: var(--svelte-ui-pagination-gap);
	}
	.pagination__count {
		white-space: nowrap;
	}
	.pagination__list {
		display: flex;
		gap: var(--svelte-ui-pagination-page-list-gap);
	}
	.pagination__button {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		width: var(--svelte-ui-pagination-button-size);
		height: var(--svelte-ui-pagination-button-size);
		padding: 0;
		background-color: transparent;
		border: none;
		border-radius: var(--svelte-ui-pagination-button-border-radius);
		line-height: 1px;
		overflow: hidden;
		color: var(--svelte-ui-pagination-nav-color);
		transition-duration: 0s;
	}
	.pagination__button:before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--svelte-ui-hover-overlay);
		opacity: 0;
		transition-property: opacity;
		transition-duration: var(--svelte-ui-transition-duration);
		z-index: 0;
	}

	@media (hover: hover) {
		.pagination__button:hover:before {
			opacity: 1;
		}
	}

	.pagination__button--selected {
		background-color: var(--svelte-ui-pagination-selected-color);
		color: var(--svelte-ui-pagination-selected-text-color);
	}

	.pagination__ellipsis {
		display: flex;
		justify-content: center;
		align-items: center;
		width: var(--svelte-ui-pagination-button-size);
		height: var(--svelte-ui-pagination-button-size);
		color: var(--svelte-ui-pagination-nav-color);
		user-select: none;
	}
</style>
