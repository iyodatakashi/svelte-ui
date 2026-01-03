import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';
import Pagination from '../lib/components/Pagination.svelte';
import variables from '../lib/assets/styles/variables.scss?inline';
import { collectCssVarNames } from './helpers/cssVarCollector';

test('renders Pagination with basic props', async () => {
	const screen = render(ComponentWrapper, {
		component: Pagination,
		total: 100,
		limit: 10,
		currentPageNum: 1,
		id: 'pagination-basic'
	});

	const pagination = screen.container.querySelector('#pagination-basic');
	await expect.element(pagination).toBeVisible();
	await expect.element(pagination).toHaveClass('pagination');
});

test('shows page count when showCount is true', async () => {
	const screen = render(ComponentWrapper, {
		component: Pagination,
		total: 100,
		limit: 10,
		currentPageNum: 1,
		showCount: true,
		id: 'pagination-count'
	});

	const countElement = screen.container.querySelector('#pagination-count .pagination__count');
	await expect.element(countElement).toBeVisible();
	await expect.element(countElement).toHaveTextContent('1 - 10 / 100');
});

test('hides page count when showCount is false', async () => {
	const screen = render(ComponentWrapper, {
		component: Pagination,
		total: 100,
		limit: 10,
		currentPageNum: 1,
		showCount: false,
		id: 'pagination-no-count'
	});

	const countElement = screen.container.querySelector('#pagination-no-count .pagination__count');
	await expect.element(countElement).toBeNull();
});

test('shows correct page buttons for small total pages', async () => {
	const screen = render(ComponentWrapper, {
		component: Pagination,
		total: 30,
		limit: 10,
		currentPageNum: 1,
		visiblePages: 5,
		id: 'pagination-small'
	});

	const buttons = screen.container.querySelectorAll('#pagination-small .pagination__button');
	// 前へ、1、2、3、次へ = 5個のボタン
	expect(buttons).toHaveLength(5);

	// 現在のページ（1）が選択状態
	const currentButton = screen.container.querySelector(
		'#pagination-small .pagination__button--selected'
	);
	await expect.element(currentButton).toHaveTextContent('1');
});

test('shows ellipsis for large total pages', async () => {
	const screen = render(ComponentWrapper, {
		component: Pagination,
		total: 1000,
		limit: 10,
		currentPageNum: 50,
		visiblePages: 5,
		id: 'pagination-large'
	});

	const ellipsis = screen.container.querySelector('#pagination-large .pagination__ellipsis');
	await expect.element(ellipsis).toBeVisible();
	await expect.element(ellipsis).toHaveTextContent('...');
});

test('prev button is disabled on first page', async () => {
	const screen = render(ComponentWrapper, {
		component: Pagination,
		total: 100,
		limit: 10,
		currentPageNum: 1,
		id: 'pagination-first'
	});

	// 最初のli要素内のボタンを取得
	const prevButton = screen.container.querySelector(
		'#pagination-first .pagination__list li:first-child .pagination__button'
	);
	await expect.element(prevButton).toHaveAttribute('disabled');
});

test('next button is disabled on last page', async () => {
	const screen = render(ComponentWrapper, {
		component: Pagination,
		total: 100,
		limit: 10,
		currentPageNum: 10,
		id: 'pagination-last'
	});

	// 最後のli要素内のボタンを取得
	const nextButton = screen.container.querySelector(
		'#pagination-last .pagination__list li:last-child .pagination__button'
	);
	await expect.element(nextButton).toHaveAttribute('disabled');
});

test('clicking page button triggers onchange', async () => {
	let changedPage = 0;
	const screen = render(ComponentWrapper, {
		component: Pagination,
		total: 100,
		limit: 10,
		currentPageNum: 1,
		onchange: (page: number) => {
			changedPage = page;
		},
		id: 'pagination-click'
	});

	const page2Button = screen.container.querySelector(
		'#pagination-click .pagination__button[aria-label*="2"]'
	) as HTMLElement;
	await page2Button.click();

	expect(changedPage).toBe(2);
});

test('clicking prev button triggers onchange', async () => {
	let changedPage = 0;
	const screen = render(ComponentWrapper, {
		component: Pagination,
		total: 100,
		limit: 10,
		currentPageNum: 3,
		onchange: (page: number) => {
			changedPage = page;
		},
		id: 'pagination-prev'
	});

	// 最初のli要素内のボタンを取得
	const prevButton = screen.container.querySelector(
		'#pagination-prev .pagination__list li:first-child .pagination__button'
	) as HTMLElement;
	await prevButton.click();

	expect(changedPage).toBe(2);
});

test('clicking next button triggers onchange', async () => {
	let changedPage = 0;
	const screen = render(ComponentWrapper, {
		component: Pagination,
		total: 100,
		limit: 10,
		currentPageNum: 3,
		onchange: (page: number) => {
			changedPage = page;
		},
		id: 'pagination-next'
	});

	// 最後のli要素内のボタンを取得
	const nextButton = screen.container.querySelector(
		'#pagination-next .pagination__list li:last-child .pagination__button'
	) as HTMLElement;
	await nextButton.click();

	expect(changedPage).toBe(4);
});

test('shows correct range text with different showRange/showTotal settings', async () => {
	// showRange: true, showTotal: true
	const screen1 = render(ComponentWrapper, {
		component: Pagination,
		total: 100,
		limit: 10,
		currentPageNum: 2,
		showCount: true,
		showRange: true,
		showTotal: true,
		id: 'pagination-range-total'
	});

	const count1 = screen1.container.querySelector('#pagination-range-total .pagination__count');
	await expect.element(count1).toHaveTextContent('11 - 20 / 100');

	// showRange: true, showTotal: false
	const screen2 = render(ComponentWrapper, {
		component: Pagination,
		total: 100,
		limit: 10,
		currentPageNum: 2,
		showCount: true,
		showRange: true,
		showTotal: false,
		id: 'pagination-range-only'
	});

	const count2 = screen2.container.querySelector('#pagination-range-only .pagination__count');
	await expect.element(count2).toHaveTextContent('11 - 20');

	// showRange: false, showTotal: true
	const screen3 = render(ComponentWrapper, {
		component: Pagination,
		total: 100,
		limit: 10,
		currentPageNum: 2,
		showCount: true,
		showRange: false,
		showTotal: true,
		id: 'pagination-total-only'
	});

	const count3 = screen3.container.querySelector('#pagination-total-only .pagination__count');
	await expect.element(count3).toHaveTextContent('100');
});

test('applies correct CSS variables', async () => {
	const screen = render(ComponentWrapper, {
		component: Pagination,
		total: 100,
		limit: 10,
		currentPageNum: 1,
		id: 'pagination-css'
	});

	const pagination = screen.container.querySelector('#pagination-css');
	await expect.element(pagination).toBeVisible();

	// CSS変数が存在することを確認（variablesファイルから）
	expect(variables).toContain('--svelte-ui-pagination-gap');
	expect(variables).toContain('--svelte-ui-pagination-count-text-color');
	expect(variables).toContain('--svelte-ui-pagination-page-list-gap');
	expect(variables).toContain('--svelte-ui-pagination-button-size');
	expect(variables).toContain('--svelte-ui-pagination-button-border-radius');
	expect(variables).toContain('--svelte-ui-pagination-button-box-shadow');
	expect(variables).toContain('--svelte-ui-pagination-button-text-color');
	expect(variables).toContain('--svelte-ui-pagination-selected-button-bg');
	expect(variables).toContain('--svelte-ui-pagination-selected-button-box-shadow');
	expect(variables).toContain('--svelte-ui-pagination-selected-button-text-color');
	expect(variables).toContain('--svelte-ui-pagination-ellipsis-text-color');
});

test('handles edge case with single page', async () => {
	const screen = render(ComponentWrapper, {
		component: Pagination,
		total: 5,
		limit: 10,
		currentPageNum: 1,
		id: 'pagination-single'
	});

	// 1ページのみの場合、前へ・次へボタンは無効
	const prevButton = screen.container.querySelector(
		'#pagination-single .pagination__list li:first-child .pagination__button'
	);
	const nextButton = screen.container.querySelector(
		'#pagination-single .pagination__list li:last-child .pagination__button'
	);

	await expect.element(prevButton).toHaveAttribute('disabled');
	await expect.element(nextButton).toHaveAttribute('disabled');

	// ページ1のボタンが選択状態
	const page1Button = screen.container.querySelector(
		'#pagination-single .pagination__button--selected'
	);
	await expect.element(page1Button).toHaveTextContent('1');
});

test('handles edge case with zero total', async () => {
	const screen = render(ComponentWrapper, {
		component: Pagination,
		total: 0,
		limit: 10,
		currentPageNum: 1,
		id: 'pagination-zero'
	});

	// 0件の場合、前へ・次へボタンは無効
	const prevButton = screen.container.querySelector(
		'#pagination-zero .pagination__list li:first-child .pagination__button'
	);
	const nextButton = screen.container.querySelector(
		'#pagination-zero .pagination__list li:last-child .pagination__button'
	);

	await expect.element(prevButton).toHaveAttribute('disabled');
	await expect.element(nextButton).toHaveAttribute('disabled');
});

test('shows correct visible pages count', async () => {
	const screen = render(ComponentWrapper, {
		component: Pagination,
		total: 1000,
		limit: 10,
		currentPageNum: 50,
		visiblePages: 3,
		id: 'pagination-visible'
	});

	// visiblePages=3の場合、現在ページを中心に3ページ表示
	// 前へ、1、...、49、50、51、...、100、次へ
	const pageButtons = screen.container.querySelectorAll(
		'#pagination-visible .pagination__button:not([aria-label*="Previous"]):not([aria-label*="Next"])'
	);

	// 実際の構造を確認：1, ..., 49, 50, 51, ..., 100 = 7個のページボタン
	expect(pageButtons).toHaveLength(7);
});
