import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';
import Tab from '../lib/components/Tab.svelte';
import type { MenuItem } from '../lib/types/menuItem';

// テスト用のタブアイテムを作成
const createTabItems = (): MenuItem[] => [
	{ label: 'Home', href: '/', icon: 'home' },
	{ label: 'About', href: '/about', icon: 'info' },
	{ label: 'Contact', href: '/contact', icon: 'mail' },
	{ label: 'Services', href: '/services', icon: 'settings' }
];

test('renders Tab with basic props', async () => {
	const screen = render(ComponentWrapper, {
		component: Tab,
		tabItems: createTabItems(),
		ariaLabel: 'Main navigation'
	});

	const tab = screen.container.querySelector('[data-testid="tab"]');
	await expect.element(tab).toBeVisible();

	// Tab は <nav> でレンダリングされる（role="tablist" は使用しない）
	const nav = screen.container.querySelector('[data-testid="nav"]');
	await expect.element(nav).toHaveAttribute('aria-label', 'Main navigation');
});

test('items（エイリアス）でも tabItems と同様に指定できる', async () => {
	const screen = render(ComponentWrapper, {
		component: Tab,
		items: createTabItems(),
		ariaLabel: 'Main navigation'
	});
	const tab = screen.container.querySelector('[data-testid="tab"]');
	await expect.element(tab).toBeVisible();
	// エイリアスで渡したアイテムが描画される
	expect(screen.container.textContent).toContain('Home');
	expect(screen.container.textContent).toContain('Contact');
});

test('renders Tab with custom aria-labelledby', async () => {
	const screen = render(ComponentWrapper, {
		component: Tab,
		tabItems: createTabItems(),
		ariaLabelledby: 'tab-heading'
	});

	const nav = screen.container.querySelector('[data-testid="nav"]');
	await expect.element(nav).toHaveAttribute('aria-labelledby', 'tab-heading');
	await expect.element(nav).not.toHaveAttribute('aria-label');
});

test('renders all tab items', async () => {
	const screen = render(ComponentWrapper, {
		component: Tab,
		tabItems: createTabItems()
	});

	const navItems = screen.container.querySelectorAll('[data-testid="nav-item"]');
	expect(navItems).toHaveLength(4);

	const homeTab = screen.container.querySelector('[data-testid="nav-item"][href="/"]');
	const aboutTab = screen.container.querySelector('[data-testid="nav-item"][href="/about"]');
	const contactTab = screen.container.querySelector('[data-testid="nav-item"][href="/contact"]');
	const servicesTab = screen.container.querySelector('[data-testid="nav-item"][href="/services"]');

	expect(homeTab).toBeInTheDocument();
	expect(aboutTab).toBeInTheDocument();
	expect(contactTab).toBeInTheDocument();
	expect(servicesTab).toBeInTheDocument();
});

test('renders tab items with correct ARIA attributes', async () => {
	const screen = render(ComponentWrapper, {
		component: Tab,
		tabItems: createTabItems()
	});

	const navItems = screen.container.querySelectorAll('[data-testid="nav-item"]');

	// URLベースのナビゲーション: aria-current="page" を使用
	navItems.forEach((navItem) => {
		expect(navItem).toHaveAttribute('tabindex', '0');
	});
});

test('renders tab items with icons', async () => {
	const screen = render(ComponentWrapper, {
		component: Tab,
		tabItems: createTabItems()
	});

	const navItems = screen.container.querySelectorAll('[data-testid="nav-item"]');

	navItems.forEach((navItem) => {
		const icon = navItem.querySelector('.nav-item__icon');
		expect(icon).toBeInTheDocument();
	});
});

test('renders tab items with text content', async () => {
	const screen = render(ComponentWrapper, {
		component: Tab,
		tabItems: createTabItems()
	});

	const homeTab = screen.container.querySelector('[data-testid="nav-item"][href="/"]');
	expect(homeTab).toHaveTextContent('Home');

	const aboutTab = screen.container.querySelector('[data-testid="nav-item"][href="/about"]');
	expect(aboutTab).toHaveTextContent('About');
});

test('handles empty tab items array', async () => {
	const screen = render(ComponentWrapper, {
		component: Tab,
		tabItems: []
	});

	const tab = screen.container.querySelector('[data-testid="tab"]');
	expect(tab).toBeInTheDocument();

	const navItems = screen.container.querySelectorAll('[data-testid="nav-item"]');
	expect(navItems).toHaveLength(0);
});

test('handles single tab item', async () => {
	const singleTabItem: MenuItem[] = [{ label: 'Home', href: '/', icon: 'home' }];

	const screen = render(ComponentWrapper, {
		component: Tab,
		tabItems: singleTabItem
	});

	const navItems = screen.container.querySelectorAll('[data-testid="nav-item"]');
	expect(navItems).toHaveLength(1);

	const homeTab = screen.container.querySelector('[data-testid="nav-item"][href="/"]');
	expect(homeTab).toHaveTextContent('Home');
});

test('handles tab items without icons', async () => {
	const tabItemsWithoutIcons: MenuItem[] = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about' }
	];

	const screen = render(ComponentWrapper, {
		component: Tab,
		tabItems: tabItemsWithoutIcons
	});

	const navItems = screen.container.querySelectorAll('[data-testid="nav-item"]');
	expect(navItems).toHaveLength(2);

	navItems.forEach((navItem) => {
		const icon = navItem.querySelector('.nav-item__icon');
		expect(icon).toBeNull();
	});
});

test('handles tab items with custom path prefix', async () => {
	const screen = render(ComponentWrapper, {
		component: Tab,
		tabItems: createTabItems(),
		pathPrefix: '/app'
	});

	const tab = screen.container.querySelector('[data-testid="tab"]');
	await expect.element(tab).toBeVisible();

	// pathPrefixが設定されている場合、hrefはpathPrefixが付与される
	const homeTab = screen.container.querySelector('[data-testid="nav-item"][href="/app/"]');
	expect(homeTab).toBeInTheDocument();
});

test('handles keyboard navigation', async () => {
	const screen = render(ComponentWrapper, {
		component: Tab,
		tabItems: createTabItems()
	});

	const navItems = screen.container.querySelectorAll('[data-testid="nav-item"]') as NodeListOf<HTMLElement>;
	const firstTab = navItems[0];
	const secondTab = navItems[1];

	// 最初のタブにフォーカス
	firstTab.focus();
	await new Promise(resolve => setTimeout(resolve, 10));
	expect(document.activeElement).toBe(firstTab);

	// ArrowRightキーを押す（イベントはバブリングで nav の keydown ハンドラに届く）
	const arrowRightEvent = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });
	firstTab.dispatchEvent(arrowRightEvent);

	// フォーカスが2番目のタブに移動することを確認
	await new Promise(resolve => setTimeout(resolve, 50));
	expect(document.activeElement).toBe(secondTab);
});

test('handles ArrowLeft key navigation', async () => {
	const screen = render(ComponentWrapper, {
		component: Tab,
		tabItems: createTabItems()
	});

	const navItems = screen.container.querySelectorAll('[data-testid="nav-item"]') as NodeListOf<HTMLElement>;
	const firstTab = navItems[0];
	const lastTab = navItems[navItems.length - 1];

	// 最初のタブにフォーカス
	firstTab.focus();
	await new Promise(resolve => setTimeout(resolve, 10));
	expect(document.activeElement).toBe(firstTab);

	// ArrowLeftキーを押す（最初のタブから左に移動すると最後のタブに循環）
	const arrowLeftEvent = new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, cancelable: true });
	firstTab.dispatchEvent(arrowLeftEvent);

	// フォーカスが最後のタブに移動することを確認（循環）
	await new Promise(resolve => setTimeout(resolve, 50));
	expect(document.activeElement).toBe(lastTab);
});

test('handles Home key navigation', async () => {
	const screen = render(ComponentWrapper, {
		component: Tab,
		tabItems: createTabItems()
	});

	const navItems = screen.container.querySelectorAll('[data-testid="nav-item"]') as NodeListOf<HTMLElement>;
	const firstTab = navItems[0];
	const lastTab = navItems[navItems.length - 1];

	// 最後のタブにフォーカス
	lastTab.focus();
	await new Promise(resolve => setTimeout(resolve, 10));
	expect(document.activeElement).toBe(lastTab);

	// Homeキーを押す
	const homeEvent = new KeyboardEvent('keydown', { key: 'Home', bubbles: true, cancelable: true });
	lastTab.dispatchEvent(homeEvent);

	// フォーカスが最初のタブに移動することを確認
	await new Promise(resolve => setTimeout(resolve, 50));
	expect(document.activeElement).toBe(firstTab);
});

test('handles End key navigation', async () => {
	const screen = render(ComponentWrapper, {
		component: Tab,
		tabItems: createTabItems()
	});

	const navItems = screen.container.querySelectorAll('[data-testid="nav-item"]') as NodeListOf<HTMLElement>;
	const firstTab = navItems[0];
	const lastTab = navItems[navItems.length - 1];

	// 最初のタブにフォーカス
	firstTab.focus();
	await new Promise(resolve => setTimeout(resolve, 10));
	expect(document.activeElement).toBe(firstTab);

	// Endキーを押す
	const endEvent = new KeyboardEvent('keydown', { key: 'End', bubbles: true, cancelable: true });
	firstTab.dispatchEvent(endEvent);

	// フォーカスが最後のタブに移動することを確認
	await new Promise(resolve => setTimeout(resolve, 50));
	expect(document.activeElement).toBe(lastTab);
});

test('handles non-navigation keys', async () => {
	const screen = render(ComponentWrapper, {
		component: Tab,
		tabItems: createTabItems()
	});

	const navItems = screen.container.querySelectorAll('[data-testid="nav-item"]') as NodeListOf<HTMLElement>;
	const firstTab = navItems[0];

	// 最初のタブにフォーカス
	firstTab.focus();
	expect(document.activeElement).toBe(firstTab);

	// 非ナビゲーションキーを押す
	const spaceEvent = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
	firstTab.dispatchEvent(spaceEvent);

	// フォーカスが変わらないことを確認
	await new Promise(resolve => setTimeout(resolve, 10));
	expect(document.activeElement).toBe(firstTab);
});

test('applies correct CSS classes', async () => {
	const screen = render(ComponentWrapper, {
		component: Tab,
		tabItems: createTabItems()
	});

	const tab = screen.container.querySelector('[data-testid="tab"]');
	await expect.element(tab).toHaveClass('tab');

	const navItems = screen.container.querySelectorAll('[data-testid="nav-item"]');
	navItems.forEach((navItem) => {
		expect(navItem).toHaveClass('nav-item');
	});
});

test('renders tab items with correct structure', async () => {
	const screen = render(ComponentWrapper, {
		component: Tab,
		tabItems: createTabItems()
	});

	const tab = screen.container.querySelector('[data-testid="tab"]');
	const navItems = tab?.querySelectorAll('[data-testid="nav-item"]');

	expect(navItems).toHaveLength(4);

	navItems?.forEach((navItem) => {
		expect(navItem).toBeInTheDocument();
	});
});
