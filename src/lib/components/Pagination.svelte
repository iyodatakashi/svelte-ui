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

		// イベントハンドラー
		onchange = () => {}
	}: {
		// 基本プロパティ
		total: number;
		limit: number;
		currentPageNum: number;

		// イベントハンドラー
		onchange: (pageNum: number) => void;
	} = $props();

	const MAX_VISIBLE_PAGES = 7;

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

	const pageList: number[] = $derived.by(() => {
		const pagesToShow = Math.min(totalPages, MAX_VISIBLE_PAGES);
		let startPage = Math.max(currentPageNum - Math.floor(pagesToShow / 2), 1);
		if (startPage + pagesToShow - 1 > totalPages) {
			startPage = totalPages - pagesToShow + 1;
		}
		return Array.from({ length: pagesToShow }, (_, i) => startPage + i);
	});
</script>

<div class="pagination">
	<div class="pagination__count">{total.toLocaleString()}</div>
	<ul class="pagination__list">
		<li>
			<IconButton
				ariaLabel="最初のページへ移動"
				color="var(--svelte-ui-pagination-nav-color)"
				disabled={currentPageNum === 1}
				onclick={goFirstPage}
			>
				first_page
			</IconButton>
		</li>
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
		{#each pageList as page (page)}
			<li>
				<button
					class="pagination__button"
					class:pagination__button--selected={page === currentPageNum}
					aria-label={`${page}ページ目へ移動`}
					onclick={() => handleClick(page)}
				>
					{page}
				</button>
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
		<li>
			<IconButton
				ariaLabel="最後のページへ移動"
				color="var(--svelte-ui-pagination-nav-color)"
				disabled={currentPageNum === totalPages}
				onclick={goLastPage}
			>
				last_page
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
	.pagination__count::after {
		content: '件';
		margin-left: var(--svelte-ui-pagination-count-label-margin);
		font-size: var(--svelte-ui-font-size-xs);
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
</style>
