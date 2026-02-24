import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';
import LoadingSpinner from '../lib/components/LoadingSpinner.svelte';

test('renders LoadingSpinner with default props', async () => {
	const screen = render(ComponentWrapper, {
		component: LoadingSpinner
	});
	const spinner = screen.getByTestId('loading-spinner');
	await expect.element(spinner).toBeVisible();
});

test('renders LoadingSpinner with custom size', async () => {
	const screen = render(ComponentWrapper, {
		component: LoadingSpinner,
		size: 48
	});
	const spinner = screen.getByTestId('loading-spinner');
	await expect.element(spinner).toBeVisible();
});

test('renders LoadingSpinner with custom color', async () => {
	const screen = render(ComponentWrapper, {
		component: LoadingSpinner,
		color: 'red'
	});
	const spinner = screen.getByTestId('loading-spinner');
	await expect.element(spinner).toBeVisible();
});

// =========================================================================
// リアクティブ性テスト
// =========================================================================

test('LoadingSpinner size property changes reactively', async () => {
	const screen = render(ComponentWrapper, {
		component: LoadingSpinner,
		size: 24
	});

	const spinner = screen.getByTestId('loading-spinner');
	await expect
		.element(spinner)
		.toHaveAttribute('style', expect.stringContaining('--svelte-ui-loading-spinner-size: 24px'));

	// プロパティを更新
	screen.rerender({
		component: LoadingSpinner,
		size: 32
	});

	await expect
		.element(spinner)
		.toHaveAttribute('style', expect.stringContaining('--svelte-ui-loading-spinner-size: 32px'));
});

test('LoadingSpinner color property changes reactively', async () => {
	const screen = render(ComponentWrapper, {
		component: LoadingSpinner,
		color: 'red'
	});

	const spinner = screen.getByTestId('loading-spinner');
	await expect
		.element(spinner)
		.toHaveAttribute('style', expect.stringContaining('--svelte-ui-loading-spinner-color: red'));

	// プロパティを更新
	screen.rerender({
		component: LoadingSpinner,
		color: 'blue'
	});

	await expect
		.element(spinner)
		.toHaveAttribute('style', expect.stringContaining('--svelte-ui-loading-spinner-color: blue'));
});
