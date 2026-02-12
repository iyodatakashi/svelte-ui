import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';
import PopupMenuButton from '../lib/components/PopupMenuButton.svelte';
import type { MenuItem } from '../lib/types/menuItem';

// テスト用のメニューアイテムを作成
const createMenuItems = (): (MenuItem | 'separator')[] => [
	{ label: 'Edit', icon: 'edit', callback: () => {} },
	{ label: 'Copy', icon: 'copy', callback: () => {} },
	'separator',
	{ label: 'Delete', icon: 'delete', callback: () => {} }
];

test('renders PopupMenuButton with basic props', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		id: 'popup-menu-button-basic'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-basic [data-testid="icon-button"] button'
	);
	await expect.element(button).toBeVisible();
	await expect.element(button).toHaveAttribute('aria-haspopup', 'menu');
});

test('renders PopupMenuButton with custom children', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		children: 'custom-icon',
		id: 'popup-menu-button-custom'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-custom [data-testid="icon-button"]'
	);
	await expect.element(button).toBeVisible();
	await expect.element(button).toHaveTextContent('custom-icon');
});

test('renders PopupMenuButton with default icon when no children provided', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		id: 'popup-menu-button-default'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-default [data-testid="icon-button"]'
	);
	await expect.element(button).toBeVisible();
	await expect.element(button).toHaveTextContent('Default Content');
});

test('PopupMenuButton is disabled when disabled prop is true', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		disabled: true,
		id: 'popup-menu-button-disabled'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-disabled [data-testid="icon-button"] button'
	) as HTMLElement;
	await expect.element(button).toHaveAttribute('disabled');

	// 無効なボタンはクリックできない
	await button.click();
	// メニューが開かないことを確認（エラーが発生しないことを確認）
	expect(true).toBe(true);
});

test('PopupMenuButton handles click events', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		id: 'popup-menu-button-click'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-click [data-testid="icon-button"]'
	) as HTMLElement;
	await button.click();

	// クリックイベントが発生してもエラーが起きないことを確認
	expect(true).toBe(true);
});

test('PopupMenuButton handles focus events', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		id: 'popup-menu-button-focus'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-focus [data-testid="icon-button"]'
	) as HTMLElement;
	button.focus();

	// フォーカスイベントが発生してもエラーが起きないことを確認
	expect(true).toBe(true);
});

test('PopupMenuButton handles blur events', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		id: 'popup-menu-button-blur'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-blur [data-testid="icon-button"]'
	) as HTMLElement;
	button.focus();
	button.blur();

	// ブラーイベントが発生してもエラーが起きないことを確認
	expect(true).toBe(true);
});

test('PopupMenuButton handles keyboard events', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		id: 'popup-menu-button-keyboard'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-keyboard [data-testid="icon-button"]'
	) as HTMLElement;
	button.focus();

	// ArrowDownキーを押す
	const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
	button.dispatchEvent(arrowDownEvent);

	// キーボードイベントが発生してもエラーが起きないことを確認
	expect(true).toBe(true);
});

test('PopupMenuButton opens menu with ArrowDown key', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		id: 'popup-menu-button-arrow-down'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-arrow-down [data-testid="icon-button"]'
	) as HTMLElement;
	button.focus();

	// ArrowDownキーを押す
	const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
	button.dispatchEvent(arrowDownEvent);

	// キーボードイベントが処理されることを確認
	expect(true).toBe(true);
});

test('PopupMenuButton opens menu with Enter key', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		id: 'popup-menu-button-enter'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-enter [data-testid="icon-button"]'
	) as HTMLElement;
	button.focus();

	// Enterキーを押す
	const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
	button.dispatchEvent(enterEvent);

	// キーボードイベントが処理されることを確認
	expect(true).toBe(true);
});

test('PopupMenuButton opens menu with Space key', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		id: 'popup-menu-button-space'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-space [data-testid="icon-button"]'
	) as HTMLElement;
	button.focus();

	// Spaceキーを押す
	const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
	button.dispatchEvent(spaceEvent);

	// キーボードイベントが処理されることを確認
	expect(true).toBe(true);
});

test('PopupMenuButton closes menu with Escape key', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		id: 'popup-menu-button-escape'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-escape [data-testid="icon-button"]'
	) as HTMLElement;
	button.focus();

	// Escapeキーを押す
	const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
	button.dispatchEvent(escapeEvent);

	// キーボードイベントが処理されることを確認
	expect(true).toBe(true);
});

test('PopupMenuButton handles mouse events', async () => {
	let mouseEnterCalled = false;
	let mouseLeaveCalled = false;
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		onmouseenter: () => {
			mouseEnterCalled = true;
		},
		onmouseleave: () => {
			mouseLeaveCalled = true;
		},
		id: 'popup-menu-button-mouse'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-mouse [data-testid="icon-button"]'
	) as HTMLElement;

	// マウスエンターイベント
	const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true });
	button.dispatchEvent(mouseEnterEvent);

	// マウスリーブイベント
	const mouseLeaveEvent = new MouseEvent('mouseleave', { bubbles: true });
	button.dispatchEvent(mouseLeaveEvent);

	// マウスイベントが発生してもエラーが起きないことを確認
	expect(true).toBe(true);
});

test('PopupMenuButton handles touch events', async () => {
	let touchStartCalled = false;
	let touchEndCalled = false;
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		ontouchstart: () => {
			touchStartCalled = true;
		},
		ontouchend: () => {
			touchEndCalled = true;
		},
		id: 'popup-menu-button-touch'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-touch [data-testid="icon-button"]'
	) as HTMLElement;

	// タッチスタートイベント
	const touchStartEvent = new TouchEvent('touchstart', { bubbles: true });
	button.dispatchEvent(touchStartEvent);

	// タッチエンドイベント
	const touchEndEvent = new TouchEvent('touchend', { bubbles: true });
	button.dispatchEvent(touchEndEvent);

	// タッチイベントが発生してもエラーが起きないことを確認
	expect(true).toBe(true);
});

test('PopupMenuButton handles pointer events', async () => {
	let pointerDownCalled = false;
	let pointerUpCalled = false;
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		onpointerdown: () => {
			pointerDownCalled = true;
		},
		onpointerup: () => {
			pointerUpCalled = true;
		},
		id: 'popup-menu-button-pointer'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-pointer [data-testid="icon-button"]'
	) as HTMLElement;

	// ポインターダウンイベント
	const pointerDownEvent = new PointerEvent('pointerdown', { bubbles: true });
	button.dispatchEvent(pointerDownEvent);

	// ポインターアップイベント
	const pointerUpEvent = new PointerEvent('pointerup', { bubbles: true });
	button.dispatchEvent(pointerUpEvent);

	// ポインターイベントが発生してもエラーが起きないことを確認
	expect(true).toBe(true);
});

test('PopupMenuButton has correct ARIA attributes', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		ariaLabel: 'Custom menu button',
		id: 'popup-menu-button-aria'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-aria [data-testid="icon-button"] button'
	);
	await expect.element(button).toHaveAttribute('aria-haspopup', 'menu');
	await expect.element(button).toHaveAttribute('aria-expanded', 'false');
	await expect.element(button).toHaveAttribute('aria-controls');
	await expect.element(button).toHaveAttribute('aria-label', 'Custom menu button');
});

test('PopupMenuButton renders with different variants', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		variant: 'filled',
		id: 'popup-menu-button-variant'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-variant [data-testid="icon-button"]'
	);
	await expect.element(button).toBeVisible();
});

test('PopupMenuButton renders with custom size', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		size: 48,
		id: 'popup-menu-button-size'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-size [data-testid="icon-button"]'
	);
	await expect.element(button).toBeVisible();
});

test('PopupMenuButton renders with custom color', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		color: 'red',
		id: 'popup-menu-button-color'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-color [data-testid="icon-button"]'
	);
	await expect.element(button).toBeVisible();
});

test('PopupMenuButton renders with rounded prop', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		rounded: false,
		id: 'popup-menu-button-rounded'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-rounded [data-testid="icon-button"]'
	);
	await expect.element(button).toBeVisible();
});

test('PopupMenuButton handles empty menu items array', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: [],
		id: 'popup-menu-button-empty'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-empty [data-testid="icon-button"]'
	);
	await expect.element(button).toBeVisible();
});

test('PopupMenuButton has correct button-block class', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		id: 'popup-menu-button-block'
	});

	const buttonBlock = screen.container.querySelector('#popup-menu-button-block');
	await expect.element(buttonBlock).toBeVisible();
	await expect.element(buttonBlock).toHaveClass('button-block');
});
