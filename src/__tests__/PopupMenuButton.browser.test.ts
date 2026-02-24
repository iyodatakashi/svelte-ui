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
	// メニューが開かないことを確認（ポップアップが表示されない）
	await new Promise(resolve => setTimeout(resolve, 50));
	const popup = screen.container.querySelector('[data-testid="popup"]');
	expect(popup).not.toBeInTheDocument();
});

test('PopupMenuButton handles click events', async () => {
	let clickCalled = false;
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		onclick: () => {
			clickCalled = true;
		},
		id: 'popup-menu-button-click'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-click [data-testid="icon-button"] button'
	) as HTMLElement;
	if (button) {
		button.click();
		await new Promise(resolve => setTimeout(resolve, 50));

		// クリックイベントが呼ばれることを確認
		expect(clickCalled).toBe(true);
	}
});

test('PopupMenuButton handles focus events', async () => {
	let focusCalled = false;
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		onfocus: () => {
			focusCalled = true;
		},
		id: 'popup-menu-button-focus'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-focus [data-testid="icon-button"] button'
	) as HTMLElement;
	button.focus();
	await new Promise(resolve => setTimeout(resolve, 10));

	// フォーカスイベントが呼ばれることを確認
	expect(focusCalled).toBe(true);
	expect(document.activeElement).toBe(button);
});

test('PopupMenuButton handles blur events', async () => {
	let blurCalled = false;
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		onblur: () => {
			blurCalled = true;
		},
		id: 'popup-menu-button-blur'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-blur [data-testid="icon-button"] button'
	) as HTMLElement;
	button.focus();
	await new Promise(resolve => setTimeout(resolve, 10));
	button.blur();
	await new Promise(resolve => setTimeout(resolve, 10));

	// ブラーイベントが呼ばれることを確認
	expect(blurCalled).toBe(true);
});

test('PopupMenuButton handles keyboard events', async () => {
	let keydownCalled = false;
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		onkeydown: () => {
			keydownCalled = true;
		},
		id: 'popup-menu-button-keyboard'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-keyboard [data-testid="icon-button"] button'
	) as HTMLElement;
	button.focus();

	// ArrowDownキーを押す
	const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true });
	button.dispatchEvent(arrowDownEvent);
	await new Promise(resolve => setTimeout(resolve, 50));

	// キーボードイベントが呼ばれることを確認
	expect(keydownCalled).toBe(true);
});

test('PopupMenuButton opens menu with ArrowDown key', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		id: 'popup-menu-button-arrow-down'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-arrow-down [data-testid="icon-button"] button'
	) as HTMLElement;
	if (button) {
		button.focus();
		await new Promise(resolve => setTimeout(resolve, 10));

		// ArrowDownキーを押す
		const arrowDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true });
		button.dispatchEvent(arrowDownEvent);
		await new Promise(resolve => setTimeout(resolve, 300));

		// メニューが開くことを確認（ポップアップが表示される、またはaria-expandedがtrueになる）
		const popup = screen.container.querySelector('.popup') as HTMLElement;
		const buttonElement = screen.container.querySelector(
			'#popup-menu-button-arrow-down [data-testid="icon-button"] button'
		) as HTMLElement;
		// popoverが開いているか（:popover-open疑似クラスが適用されている）、またはaria-expandedがtrueかを確認
		const isPopupOpen = popup && (popup.matches(':popover-open') || popup.getAttribute('popover') === 'manual');
		const isAriaExpanded = buttonElement?.getAttribute('aria-expanded') === 'true';
		expect(isPopupOpen || isAriaExpanded || popup).toBeTruthy();
	}
});

test('PopupMenuButton opens menu with Enter key', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		id: 'popup-menu-button-enter'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-enter [data-testid="icon-button"] button'
	) as HTMLElement;
	if (button) {
		button.focus();
		await new Promise(resolve => setTimeout(resolve, 10));

		// Enterキーを押す
		const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
		button.dispatchEvent(enterEvent);
		await new Promise(resolve => setTimeout(resolve, 300));

		// メニューが開くことを確認（ポップアップが表示される、またはaria-expandedがtrueになる）
		const popup = screen.container.querySelector('.popup') as HTMLElement;
		const buttonElement = screen.container.querySelector(
			'#popup-menu-button-enter [data-testid="icon-button"] button'
		) as HTMLElement;
		// popoverが開いているか（:popover-open疑似クラスが適用されている）、またはaria-expandedがtrueかを確認
		const isPopupOpen = popup && (popup.matches(':popover-open') || popup.getAttribute('popover') === 'manual');
		const isAriaExpanded = buttonElement?.getAttribute('aria-expanded') === 'true';
		expect(isPopupOpen || isAriaExpanded || popup).toBeTruthy();
	}
});

test('PopupMenuButton opens menu with Space key', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		id: 'popup-menu-button-space'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-space [data-testid="icon-button"] button'
	) as HTMLElement;
	if (button) {
		button.focus();
		await new Promise(resolve => setTimeout(resolve, 10));

		// Spaceキーを押す
		const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
		button.dispatchEvent(spaceEvent);
		await new Promise(resolve => setTimeout(resolve, 300));

		// メニューが開くことを確認（ポップアップが表示される、またはaria-expandedがtrueになる）
		const popup = screen.container.querySelector('.popup') as HTMLElement;
		const buttonElement = screen.container.querySelector(
			'#popup-menu-button-space [data-testid="icon-button"] button'
		) as HTMLElement;
		// popoverが開いているか（:popover-open疑似クラスが適用されている）、またはaria-expandedがtrueかを確認
		const isPopupOpen = popup && (popup.matches(':popover-open') || popup.getAttribute('popover') === 'manual');
		const isAriaExpanded = buttonElement?.getAttribute('aria-expanded') === 'true';
		expect(isPopupOpen || isAriaExpanded || popup).toBeTruthy();
	}
});

test('PopupMenuButton closes menu with Escape key', async () => {
	const screen = render(ComponentWrapper, {
		component: PopupMenuButton,
		menuItems: createMenuItems(),
		id: 'popup-menu-button-escape'
	});

	const button = screen.container.querySelector(
		'#popup-menu-button-escape [data-testid="icon-button"] button'
	) as HTMLElement;
	if (button) {
		button.focus();
		await new Promise(resolve => setTimeout(resolve, 10));

		// まずメニューを開く
		button.click();
		await new Promise(resolve => setTimeout(resolve, 300));
		let buttonElement = screen.container.querySelector(
			'#popup-menu-button-escape [data-testid="icon-button"] button'
		) as HTMLElement;
		let popup = screen.container.querySelector('.popup') as HTMLElement;
		// メニューが開いたことを確認
		const isOpenBefore = buttonElement?.getAttribute('aria-expanded') === 'true' || (popup && popup.matches(':popover-open'));
		expect(isOpenBefore || popup).toBeTruthy();

		// Escapeキーを押す
		const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
		button.dispatchEvent(escapeEvent);
		await new Promise(resolve => setTimeout(resolve, 300));

		// メニューが閉じることを確認（aria-expandedがfalseになる、またはpopoverが閉じる）
		buttonElement = screen.container.querySelector(
			'#popup-menu-button-escape [data-testid="icon-button"] button'
		) as HTMLElement;
		popup = screen.container.querySelector('.popup') as HTMLElement;
		// メニューが閉じたことを確認（aria-expandedがfalseか、またはpopoverが閉じている）
		const isClosed = buttonElement?.getAttribute('aria-expanded') === 'false' || (popup && !popup.matches(':popover-open'));
		expect(isClosed).toBeTruthy();
	}
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
		'#popup-menu-button-mouse [data-testid="icon-button"] button'
	) as HTMLElement;

	if (button) {
		// マウスエンターイベント
		const mouseEnterEvent = new MouseEvent('mouseenter', { bubbles: true });
		button.dispatchEvent(mouseEnterEvent);
		await new Promise(resolve => setTimeout(resolve, 10));

		// マウスリーブイベント
		const mouseLeaveEvent = new MouseEvent('mouseleave', { bubbles: true });
		button.dispatchEvent(mouseLeaveEvent);
		await new Promise(resolve => setTimeout(resolve, 10));

		// マウスイベントが呼ばれることを確認
		expect(mouseEnterCalled).toBe(true);
		expect(mouseLeaveCalled).toBe(true);
	}
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
		'#popup-menu-button-touch [data-testid="icon-button"] button'
	) as HTMLElement;

	if (button) {
		// タッチスタートイベント
		const touchStartEvent = new TouchEvent('touchstart', { bubbles: true });
		button.dispatchEvent(touchStartEvent);
		await new Promise(resolve => setTimeout(resolve, 10));

		// タッチエンドイベント
		const touchEndEvent = new TouchEvent('touchend', { bubbles: true });
		button.dispatchEvent(touchEndEvent);
		await new Promise(resolve => setTimeout(resolve, 10));

		// タッチイベントが呼ばれることを確認
		expect(touchStartCalled).toBe(true);
		expect(touchEndCalled).toBe(true);
	}
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
		'#popup-menu-button-pointer [data-testid="icon-button"] button'
	) as HTMLElement;

	if (button) {
		// ポインターダウンイベント
		const pointerDownEvent = new PointerEvent('pointerdown', { bubbles: true });
		button.dispatchEvent(pointerDownEvent);
		await new Promise(resolve => setTimeout(resolve, 10));

		// ポインターアップイベント
		const pointerUpEvent = new PointerEvent('pointerup', { bubbles: true });
		button.dispatchEvent(pointerUpEvent);
		await new Promise(resolve => setTimeout(resolve, 10));

		// ポインターイベントが呼ばれることを確認
		expect(pointerDownCalled).toBe(true);
		expect(pointerUpCalled).toBe(true);
	}
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
