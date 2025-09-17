import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Drawer from '../lib/components/Drawer.svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';

test('Drawer - レンダリング', async () => {
	const { container } = await render(ComponentWrapper, {
		component: Drawer,
		id: 'drawer-test',
		title: 'Test Drawer',
		description: 'Test description'
	});

	const drawer = container.querySelector('[data-testid="modal"]');
	expect(drawer).toBeInTheDocument();
	expect(drawer).toHaveClass('fade-out'); // 初期状態は閉じている
});

test('Drawer - 開閉', async () => {
	const { container } = await render(ComponentWrapper, {
		component: Drawer,
		id: 'drawer-open-test',
		title: 'Open Test',
		isOpen: true
	});

	const openDrawer = container.querySelector('[data-testid="modal"]');
	expect(openDrawer).toHaveClass('fade-in');

	// 閉じた状態のテスト
	const { container: container2 } = await render(ComponentWrapper, {
		component: Drawer,
		id: 'drawer-close-test',
		title: 'Close Test',
		isOpen: false
	});

	const closeDrawer = container2.querySelector('[data-testid="modal"]');
	expect(closeDrawer).toHaveClass('fade-out');
});

test('Drawer - タイトルと説明', async () => {
	const { container } = await render(ComponentWrapper, {
		component: Drawer,
		id: 'drawer-content-test',
		title: 'Content Test',
		description: 'This is a test description',
		isOpen: true
	});

	const title = container.querySelector('#drawer-content-test-drawer-title');
	const description = container.querySelector('#drawer-content-test-drawer-description');

	expect(title).toBeInTheDocument();
	expect(title).toHaveTextContent('Content Test');
	expect(description).toBeInTheDocument();
	expect(description).toHaveTextContent('This is a test description');
});

test('Drawer - カスタム幅', async () => {
	const { container } = await render(ComponentWrapper, {
		component: Drawer,
		id: 'drawer-width-test',
		title: 'Width Test',
		width: 400,
		isOpen: true
	});

	const drawer = container.querySelector('[data-testid="modal"]');
	expect(drawer).toHaveStyle('width: 400px');
});

test('Drawer - 位置指定', async () => {
	// 左側
	const { container } = await render(ComponentWrapper, {
		component: Drawer,
		id: 'drawer-left-test',
		title: 'Left Test',
		position: 'left',
		isOpen: true
	});

	const leftDrawer = container.querySelector('[data-testid="modal"]');
	expect(leftDrawer).toHaveClass('drawer--left');

	// 右側
	const { container: container2 } = await render(ComponentWrapper, {
		component: Drawer,
		id: 'drawer-right-test',
		title: 'Right Test',
		position: 'right',
		isOpen: true
	});

	const rightDrawer = container2.querySelector('[data-testid="modal"]');
	expect(rightDrawer).toHaveClass('drawer--right');
});

test('Drawer - パディングなし', async () => {
	const { container } = await render(ComponentWrapper, {
		component: Drawer,
		id: 'drawer-no-padding-test',
		title: 'No Padding Test',
		noPadding: true,
		isOpen: true
	});

	const body = container.querySelector('.drawer__body');
	expect(body).toHaveStyle('padding: 0');
});

test('Drawer - スクロール可能', async () => {
	const { container } = await render(ComponentWrapper, {
		component: Drawer,
		id: 'drawer-scrollable-test',
		title: 'Scrollable Test',
		scrollable: true,
		isOpen: true
	});

	const drawer = container.querySelector('[data-testid="modal"]');
	expect(drawer).toHaveClass('drawer--scrollable');
});

test('Drawer - カスタムスタイル', async () => {
	const { container } = await render(ComponentWrapper, {
		component: Drawer,
		id: 'drawer-style-test',
		title: 'Style Test',
		bodyStyle: 'background-color: red;',
		isOpen: true
	});

	const body = container.querySelector('.drawer__body');
	expect(body).toHaveStyle('background-color: red');
});

test('Drawer - フォーカス復元', async () => {
	const { container } = await render(ComponentWrapper, {
		component: Drawer,
		id: 'drawer-focus-test',
		title: 'Focus Test',
		restoreFocus: true
	});

	const drawer = container.querySelector('[data-testid="modal"]');
	expect(drawer).toBeInTheDocument();
});

test('Drawer - 外側クリックで閉じる', async () => {
	const { container } = await render(ComponentWrapper, {
		component: Drawer,
		id: 'drawer-click-outside-test',
		title: 'Click Outside Test',
		closeIfClickOutside: true
	});

	const drawer = container.querySelector('[data-testid="modal"]');
	expect(drawer).toBeInTheDocument();
});

test('Drawer - CSS変数', async () => {
	const { container } = await render(ComponentWrapper, {
		component: Drawer,
		id: 'drawer-css-test',
		title: 'CSS Test',
		isOpen: true
	});

	const drawer = container.querySelector('[data-testid="modal"]');
	expect(drawer).toBeInTheDocument();

	// DrawerコンポーネントはModalを内包しているため、実際のCSS変数を確認
	expect(drawer).toHaveStyle('width: 240px'); // デフォルト幅
});

// =========================================================================
// リアクティブ性テスト
// =========================================================================

test('Drawer width property changes reactively', async () => {
	const screen = render(ComponentWrapper, {
		component: Drawer,
		width: 200,
		isOpen: true
	});

	const modal = screen.container.querySelector('[data-testid="modal"]');
	await expect.element(modal).toHaveAttribute('style', expect.stringContaining('width: 200px'));

	// プロパティを更新
	screen.rerender({
		component: Drawer,
		width: 300,
		isOpen: true
	});

	await expect.element(modal).toHaveAttribute('style', expect.stringContaining('width: 300px'));
});
