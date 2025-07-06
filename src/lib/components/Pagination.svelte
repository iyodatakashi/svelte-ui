<script lang="ts">
	import IconButton from './IconButton.svelte';
	let {
		total,
		limit = 100,
		currentPageNum = 1,
		onchange = () => {}
	}: {
		total: number;
		limit: number;
		currentPageNum: number;
		onchange: (pageNum: number) => void;
	} = $props();
	const totalPages = $derived(Math.ceil(total / limit));
	const pageList: number[] = $derived.by(() => {
		const maxButtons = 7;
		const pagesToShow = Math.min(totalPages, maxButtons);
		// 表示開始ページを計算
		let startPage = Math.max(currentPageNum - Math.floor(pagesToShow / 2), 1);
		// 最大ページ数を超えないように補正
		if (startPage + pagesToShow - 1 > totalPages) {
			startPage = totalPages - pagesToShow + 1;
		}
		// 指定した範囲の連番配列を作成
		return Array.from({ length: pagesToShow }, (_, i) => startPage + i);
	});
	const handleClick = (pageNum: number) => {
		onchange(pageNum);
	};
	const goFirstPage = () => {
		onchange(1);
	};
	const goLastPage = () => {
		onchange(totalPages);
	};
	const goPrevPage = () => {
		onchange(currentPageNum - 1);
	};
	const goNextPage = () => {
		onchange(currentPageNum + 1);
	};
</script>

<div class="pagination">
	<div class="count-block">{total.toLocaleString()}</div>
	<ul class="page-list">
		<li>
			<IconButton
				ariaLabel="最初のページへ移動"
				color="var(--text-light)"
				disabled={currentPageNum === 1}
				onclick={goFirstPage}
			>
				first_page
			</IconButton>
		</li>
		<li>
			<IconButton
				ariaLabel="前のページへ移動"
				color="var(--text-light)"
				disabled={currentPageNum === 1}
				onclick={goPrevPage}
			>
				chevron_left
			</IconButton>
		</li>
		{#each pageList as page (page)}
			<li>
				<button
					class:is-selected={page === currentPageNum}
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
				color="var(--text-light)"
				disabled={currentPageNum === totalPages}
				onclick={goNextPage}
			>
				chevron_right
			</IconButton>
		</li>
		<li>
			<IconButton
				ariaLabel="最後のページへ移動"
				color="var(--text-light)"
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
		gap: 16px;
	}
	.count-block::after {
		content: '件';
		margin-left: 0.5em;
		font-size: 0.7rem;
	}
	.page-list {
		display: flex;
		gap: 8px;
	}
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 32px;
		height: 32px;
		padding: 0;
		background-color: transparent;
		border: none;
		border-radius: 50%;
		line-height: 1px;
		overflow: hidden;
		color: var(--text-light);
		transition-duration: 0s;
	}
	button:before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--hover-color);
		opacity: 0;
		transition-property: opacity;
		transition-duration: 0.3s;
		z-index: 0;
	}
	button:hover:before {
		opacity: 1;
	}
	button.is-selected {
		background-color: var(--primary-color);
		color: var(--text-white);
	}
</style>
