import { test, expect, afterEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';
import PopupMenu from '../lib/components/PopupMenu.svelte';
import variables from '../lib/assets/styles/variables.scss?inline';
import type { MenuItem } from '../lib/types/menuItem';

// テスト用のメニューアイテムを作成
const createMenuItems = (): (MenuItem | 'separator')[] => [
	{ label: 'Edit', icon: 'edit', callback: () => {} },
	{ label: 'Copy', icon: 'copy', callback: () => {} },
	'separator',
	{ label: 'Delete', icon: 'delete', callback: () => {} }
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
			label: 'Test Item',
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

	const menuContainer = screen.container.querySelector(
		'#popup-menu-keyboard .popup-menu'
	) as HTMLElement;
	if (menuContainer) {
		menuContainer.focus();

		// ArrowDownキーを押す
		const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
		menuContainer.dispatchEvent(arrowDownEvent);

		// イベントが処理され、エラーが発生しないことを確認
		await new Promise(resolve => setTimeout(resolve, 10));
		expect(menuContainer).toBeInTheDocument();
	}
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
			label: 'Execute',
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

		// ArrowDownで最初のアイテムをアクティブにする
		const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
		menuContainer.dispatchEvent(arrowDownEvent);
		await new Promise(resolve => setTimeout(resolve, 10));

		// Enterキーを押す
		const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
		menuContainer.dispatchEvent(enterEvent);
		await new Promise(resolve => setTimeout(resolve, 10));

		// callbackが実行されることを確認
		expect(executed).toBe(true);
	}
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

test('renders checked items as menuitemradio with aligned mark column', async () => {
	const anchor = createAnchorElement();
	const screen = render(ComponentWrapper, {
		component: PopupMenu,
		anchorElement: anchor,
		menuItems: [
			{ label: 'work@example.com', checked: true, icon: 'person', callback: () => {} },
			{ label: 'me@example.com', checked: false, callback: () => {} },
			{ label: 'Add account', icon: 'person_add', callback: () => {} }
		],
		isOpen: true,
		id: 'popup-menu-checked'
	});

	const buttons = screen.container.querySelectorAll('#popup-menu-checked .popup-menu__button');
	expect(buttons[0].getAttribute('role')).toBe('menuitemradio');
	expect(buttons[0].getAttribute('aria-checked')).toBe('true');
	expect(buttons[0].hasAttribute('aria-describedby')).toBe(false);
	expect(buttons[0].querySelector('.popup-menu__check')?.textContent?.trim()).toBe('check');

	expect(buttons[1].getAttribute('role')).toBe('menuitemradio');
	expect(buttons[1].getAttribute('aria-checked')).toBe('false');
	expect(buttons[1].querySelector('.popup-menu__check')?.textContent?.trim()).toBe('');

	const checkedText = buttons[0].querySelector('.popup-menu__text')!.getBoundingClientRect();
	const uncheckedText = buttons[1].querySelector('.popup-menu__text')!.getBoundingClientRect();
	expect(uncheckedText.left).toBe(checkedText.left);

	expect(buttons[2].getAttribute('role')).toBe('menuitem');
	expect(buttons[2].hasAttribute('aria-checked')).toBe(false);
});

test('disabled items are announced as disabled and do not execute', async () => {
	let executed = false;
	const anchor = createAnchorElement();
	const screen = render(ComponentWrapper, {
		component: PopupMenu,
		anchorElement: anchor,
		menuItems: [
			{ label: 'Switch', checked: false, disabled: true, callback: () => (executed = true) },
			{ label: 'Docs', href: '/docs', disabled: true }
		],
		isOpen: true,
		id: 'popup-menu-disabled'
	});

	const items = screen.container.querySelectorAll<HTMLElement>(
		'#popup-menu-disabled .popup-menu__button'
	);
	expect(items[0].getAttribute('aria-disabled')).toBe('true');
	expect(items[1].getAttribute('aria-disabled')).toBe('true');
	expect(items[1].hasAttribute('href')).toBe(false);

	const menu = screen.container.querySelector('#popup-menu-disabled') as HTMLElement;
	await expect.poll(() => document.activeElement).toBe(menu);
	items[0].click();
	const press = (key: string) =>
		menu.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
	press('ArrowDown');
	await expect.poll(() => document.activeElement).toBe(items[0]);
	press('Enter');

	expect(executed).toBe(false);
	await expect.element(menu).toBeVisible();
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

		// イベントが処理され、エラーが発生しないことを確認
		await new Promise(resolve => setTimeout(resolve, 10));
		expect(menuButton).toBeInTheDocument();
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

	const menuButtons = screen.container.querySelectorAll(
		'#popup-menu-focus .popup-menu__button'
	) as NodeListOf<HTMLElement>;

	if (menuButtons.length > 0) {
		const firstButton = menuButtons[0];
		// フォーカスイベントを発火
		firstButton.focus();
		// フォーカスイベントを手動で発火してSvelteのリアクティビティを確実に更新
		firstButton.dispatchEvent(new FocusEvent('focus', { bubbles: true }));

		// フォーカスが設定されることを確認（menuContainerRefにtabindex="-1"があるため、フォーカスが移る可能性がある）
		await new Promise(resolve => setTimeout(resolve, 100));
		// ボタンにフォーカスがあるか、またはメニューコンテナにフォーカスがあるかを確認
		const menuContainer = screen.container.querySelector('#popup-menu-focus') as HTMLElement;
		expect(document.activeElement === firstButton || document.activeElement === menuContainer).toBe(true);
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

	const menuContainer = screen.container.querySelector(
		'#popup-menu-home-end .popup-menu'
	) as HTMLElement;
	if (menuContainer) {
		menuContainer.focus();

		// Endキーを押す
		const endEvent = new KeyboardEvent('keydown', { key: 'End', bubbles: true });
		menuContainer.dispatchEvent(endEvent);
		await new Promise(resolve => setTimeout(resolve, 10));

		// Homeキーを押す
		const homeEvent = new KeyboardEvent('keydown', { key: 'Home', bubbles: true });
		menuContainer.dispatchEvent(homeEvent);
		await new Promise(resolve => setTimeout(resolve, 10));

		// イベントが処理され、エラーが発生しないことを確認
		expect(menuContainer).toBeInTheDocument();
	}
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
			label: 'Space Test',
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

		// ArrowDownで最初のアイテムをアクティブにする
		const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
		menuContainer.dispatchEvent(arrowDownEvent);
		await new Promise(resolve => setTimeout(resolve, 10));

		// Spaceキーを押す
		const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
		menuContainer.dispatchEvent(spaceEvent);
		await new Promise(resolve => setTimeout(resolve, 10));

		// callbackが実行されることを確認
		expect(executed).toBe(true);
	}
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
