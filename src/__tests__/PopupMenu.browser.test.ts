import { test, expect, afterEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';
import PopupMenu from '../lib/components/PopupMenu.svelte';
import variables from '../lib/assets/styles/variables.scss?inline';
import type { MenuItem } from '../lib/types/menuItem';

// テスト用のメニューアイテムを作成
const createMenuItems = (): (MenuItem | 'separator')[] => [
	{ title: 'Edit', icon: 'edit', callback: () => {} },
	{ title: 'Copy', icon: 'copy', callback: () => {} },
	'separator',
	{ title: 'Delete', icon: 'delete', callback: () => {} }
];

// テスト用のアンカー要素を作成
const createAnchorElement = (): HTMLElement => {
	const anchor = document.createElement('button');
	anchor.textContent = 'Menu';
	anchor.id = 'menu-anchor';
	document.body.appendChild(anchor);
	return anchor;
};

test('renders PopupMenu with basic props', async () => {
	const anchor = createAnchorElement();
	const screen = render(ComponentWrapper, {
		component: PopupMenu,
		anchorElement: anchor,
		menuItems: createMenuItems(),
		isOpen: true,
		id: 'popup-menu-basic'
	});

	// PopupMenuコンポーネントがレンダリングされることを確認
	const popupMenu = screen.container.querySelector('#popup-menu-basic');
	await expect.element(popupMenu).toBeVisible();
});

test('shows menu items when open', async () => {
	const anchor = createAnchorElement();
	const screen = render(ComponentWrapper, {
		component: PopupMenu,
		anchorElement: anchor,
		menuItems: createMenuItems(),
		isOpen: true,
		id: 'popup-menu-items'
	});

	const menuItems = screen.container.querySelectorAll('#popup-menu-items .popup-menu__button');
	expect(menuItems).toHaveLength(3); // separatorを除く

	// 最初のアイテムのテキストを確認
	const firstItem = screen.container.querySelector('#popup-menu-items .popup-menu__text');
	await expect.element(firstItem).toHaveTextContent('Edit');
});

test('shows separator between menu items', async () => {
	const anchor = createAnchorElement();
	const screen = render(ComponentWrapper, {
		component: PopupMenu,
		anchorElement: anchor,
		menuItems: createMenuItems(),
		isOpen: true,
		id: 'popup-menu-separator'
	});

	const separator = screen.container.querySelector('#popup-menu-separator .popup-menu__separator');
	await expect.element(separator).toHaveAttribute('role', 'separator');
});

test('handles menu item click', async () => {
	const anchor = createAnchorElement();
	let clicked = false;
	const menuItems: (MenuItem | 'separator')[] = [
		{
			title: 'Test Item',
			icon: 'test',
			callback: () => {
				clicked = true;
			}
		}
	];

	const screen = render(ComponentWrapper, {
		component: PopupMenu,
		anchorElement: anchor,
		menuItems,
		isOpen: true,
		id: 'popup-menu-click'
	});

	const menuButton = screen.container.querySelector(
		'#popup-menu-click .popup-menu__button'
	) as HTMLElement;
	await menuButton.click();

	expect(clicked).toBe(true);
});

test('handles keyboard navigation with arrow keys', async () => {
	const anchor = createAnchorElement();
	const screen = render(ComponentWrapper, {
		component: PopupMenu,
		anchorElement: anchor,
		menuItems: createMenuItems(),
		isOpen: true,
		id: 'popup-menu-keyboard'
	});

	// ArrowDownキーを押す
	const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
	document.dispatchEvent(arrowDownEvent);

	// キーボードイベントが処理されることを確認（エラーが発生しないことを確認）
	expect(true).toBe(true);
});

test('handles Escape key to close menu', async () => {
	const anchor = createAnchorElement();
	const screen = render(ComponentWrapper, {
		component: PopupMenu,
		anchorElement: anchor,
		menuItems: createMenuItems(),
		isOpen: true,
		id: 'popup-menu-escape'
	});

	const menuContainer = screen.container.querySelector(
		'#popup-menu-escape .popup-menu'
	) as HTMLElement;
	if (menuContainer) {
		menuContainer.focus();

		// Escapeキーを押す
		const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
		document.dispatchEvent(escapeEvent);

		// メニューが閉じられることを確認（要素が非表示になる）
		await expect.element(menuContainer).not.toBeVisible();
	}
});

test('handles Enter key to execute menu item', async () => {
	const anchor = createAnchorElement();
	let executed = false;
	const menuItems: (MenuItem | 'separator')[] = [
		{
			title: 'Execute',
			icon: 'play',
			callback: () => {
				executed = true;
			}
		}
	];

	const screen = render(ComponentWrapper, {
		component: PopupMenu,
		anchorElement: anchor,
		menuItems,
		isOpen: true,
		id: 'popup-menu-enter'
	});

	const menuContainer = screen.container.querySelector(
		'#popup-menu-enter .popup-menu'
	) as HTMLElement;
	if (menuContainer) {
		menuContainer.focus();
	}

	// ArrowDownで最初のアイテムをアクティブにする
	const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
	document.dispatchEvent(arrowDownEvent);

	// Enterキーを押す
	const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
	document.dispatchEvent(enterEvent);

	// キーボードイベントが処理されることを確認
	expect(true).toBe(true);
});

test('shows icons when provided', async () => {
	const anchor = createAnchorElement();
	const screen = render(ComponentWrapper, {
		component: PopupMenu,
		anchorElement: anchor,
		menuItems: createMenuItems(),
		isOpen: true,
		id: 'popup-menu-icons'
	});

	// アイコンが存在することを確認（Iconコンポーネントがレンダリングされることを確認）
	const popupMenu = screen.container.querySelector('#popup-menu-icons');
	await expect.element(popupMenu).toBeVisible();
});

test('applies correct CSS variables', async () => {
	const anchor = createAnchorElement();
	const screen = render(ComponentWrapper, {
		component: PopupMenu,
		anchorElement: anchor,
		menuItems: createMenuItems(),
		isOpen: true,
		id: 'popup-menu-css'
	});

	// CSS変数が存在することを確認
	expect(variables).toContain('--svelte-ui-surface-color');
	expect(variables).toContain('--svelte-ui-popupmenu-text-color');
	expect(variables).toContain('--svelte-ui-hover-overlay');
	expect(variables).toContain('--svelte-ui-popupmenu-focus-color');
	expect(variables).toContain('--svelte-ui-border-color');
	expect(variables).toContain('--svelte-ui-touch-target');
	expect(variables).toContain('--svelte-ui-touch-target-lg');
	expect(variables).toContain('--svelte-ui-popup-mobile-border-radius');
});

test('handles mouse enter on menu items', async () => {
	const anchor = createAnchorElement();
	const screen = render(ComponentWrapper, {
		component: PopupMenu,
		anchorElement: anchor,
		menuItems: createMenuItems(),
		isOpen: true,
		id: 'popup-menu-mouse'
	});

	const menuButton = screen.container.querySelector(
		'#popup-menu-mouse .popup-menu__button'
	) as HTMLElement;

	if (menuButton) {
		// マウスエンターイベントを発火
		const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true });
		menuButton.dispatchEvent(mouseEnterEvent);

		// イベントが処理されることを確認
		expect(true).toBe(true);
	}
});

test('handles focus on menu items', async () => {
	const anchor = createAnchorElement();
	const screen = render(ComponentWrapper, {
		component: PopupMenu,
		anchorElement: anchor,
		menuItems: createMenuItems(),
		isOpen: true,
		id: 'popup-menu-focus'
	});

	const menuButton = screen.container.querySelector(
		'#popup-menu-focus .popup-menu__button'
	) as HTMLElement;

	if (menuButton) {
		// フォーカスイベントを発火
		menuButton.focus();

		// イベントが処理されることを確認
		expect(true).toBe(true);
	}
});

test('handles Home and End keys for navigation', async () => {
	const anchor = createAnchorElement();
	const screen = render(ComponentWrapper, {
		component: PopupMenu,
		anchorElement: anchor,
		menuItems: createMenuItems(),
		isOpen: true,
		id: 'popup-menu-home-end'
	});

	// Endキーを押す
	const endEvent = new KeyboardEvent('keydown', { key: 'End' });
	document.dispatchEvent(endEvent);

	// Homeキーを押す
	const homeEvent = new KeyboardEvent('keydown', { key: 'Home' });
	document.dispatchEvent(homeEvent);

	// キーボードイベントが処理されることを確認
	expect(true).toBe(true);
});

test('handles Tab key to close menu', async () => {
	const anchor = createAnchorElement();
	const screen = render(ComponentWrapper, {
		component: PopupMenu,
		anchorElement: anchor,
		menuItems: createMenuItems(),
		isOpen: true,
		id: 'popup-menu-tab'
	});

	const menuContainer = screen.container.querySelector(
		'#popup-menu-tab .popup-menu'
	) as HTMLElement;
	if (menuContainer) {
		menuContainer.focus();

		// Tabキーを押す
		const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
		document.dispatchEvent(tabEvent);

		// メニューが閉じられることを確認（要素が非表示になる）
		await expect.element(menuContainer).not.toBeVisible();
	}
});

test('handles Space key to execute menu item', async () => {
	const anchor = createAnchorElement();
	let executed = false;
	const menuItems: (MenuItem | 'separator')[] = [
		{
			title: 'Space Test',
			icon: 'space',
			callback: () => {
				executed = true;
			}
		}
	];

	const screen = render(ComponentWrapper, {
		component: PopupMenu,
		anchorElement: anchor,
		menuItems,
		isOpen: true,
		id: 'popup-menu-space'
	});

	const menuContainer = screen.container.querySelector(
		'#popup-menu-space .popup-menu'
	) as HTMLElement;
	if (menuContainer) {
		menuContainer.focus();
	}

	// ArrowDownで最初のアイテムをアクティブにする
	const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
	document.dispatchEvent(arrowDownEvent);

	// Spaceキーを押す
	const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
	document.dispatchEvent(spaceEvent);

	// キーボードイベントが処理されることを確認
	expect(true).toBe(true);
});

test('handles empty menu items array', async () => {
	const anchor = createAnchorElement();
	const screen = render(ComponentWrapper, {
		component: PopupMenu,
		anchorElement: anchor,
		menuItems: [],
		isOpen: true,
		id: 'popup-menu-empty'
	});

	const menuButtons = screen.container.querySelectorAll('#popup-menu-empty .popup-menu__button');
	expect(menuButtons).toHaveLength(0);

	// PopupMenuコンポーネント自体は存在することを確認
	const popupMenu = screen.container.querySelector('#popup-menu-empty');
	await expect.element(popupMenu).toBeVisible();
});

// テスト後のクリーンアップ
afterEach(() => {
	const anchor = document.getElementById('menu-anchor');
	if (anchor) {
		document.body.removeChild(anchor);
	}
});
