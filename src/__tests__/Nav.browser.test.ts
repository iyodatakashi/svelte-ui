import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';
import Nav from '../lib/components/Nav.svelte';
import type { MenuItem } from '../lib/types/menuItem';

const createNavItems = (): MenuItem[] => [
	{ label: 'Home', href: '/', icon: 'home' },
	{ label: 'About', href: '/about', icon: 'info' },
	{ label: 'Contact', href: '/contact', icon: 'mail' }
];

test('navItems（正式名）でアイテムを指定できる', async () => {
	const screen = render(ComponentWrapper, {
		component: Nav,
		navItems: createNavItems(),
		ariaLabel: 'Main navigation'
	});
	const nav = screen.container.querySelector('[data-testid="nav"]');
	await expect.element(nav).toBeVisible();
	expect(screen.container.textContent).toContain('Home');
	expect(screen.container.textContent).toContain('Contact');
});

test('items（エイリアス）でも指定でき、両方指定時は navItems が優先される', async () => {
	// エイリアス単体
	const aliasOnly = render(ComponentWrapper, {
		component: Nav,
		items: createNavItems(),
		ariaLabel: 'Main navigation'
	});
	expect(aliasOnly.container.textContent).toContain('Home');

	// 両方指定 → navItems が優先
	const both = render(ComponentWrapper, {
		component: Nav,
		navItems: [{ label: '正式', href: '/formal' }],
		items: createNavItems(),
		ariaLabel: 'Main navigation'
	});
	expect(both.container.textContent).toContain('正式');
	expect(both.container.textContent).not.toContain('Home');
});

const colorCases = [
	...(['vertical', 'horizontal', 'mobile'] as const).flatMap((variant) =>
		(['color', 'tonal', 'filled'] as const).map((selectedVariant) => ({ variant, selectedVariant }))
	),
	{ variant: 'horizontal', selectedVariant: 'underline' } as const
];

test.each(colorCases)(
	'textColor と selectedTextColor が $variant / $selectedVariant で効く',
	async ({ variant, selectedVariant }) => {
		const screen = render(ComponentWrapper, {
			component: Nav,
			navItems: createNavItems(),
			variant,
			selectedVariant,
			currentPath: '/about',
			textColor: 'rgb(1, 2, 3)',
			selectedTextColor: 'rgb(4, 5, 6)',
			ariaLabel: 'Main navigation'
		});
		const items = screen.container.querySelectorAll('.nav-item');
		const selected = screen.container.querySelector('.nav-item--selected');
		const unselected = Array.from(items).find((item) => item !== selected);
		expect(selected).not.toBeNull();
		expect(getComputedStyle(unselected!).color).toBe('rgb(1, 2, 3)');
		expect(getComputedStyle(selected!).color).toBe('rgb(4, 5, 6)');
	}
);

test('textColor と selectedTextColor が子アイテムにも効く', async () => {
	const screen = render(ComponentWrapper, {
		component: Nav,
		navItems: [
			{
				label: 'Parent',
				href: '/parent',
				children: [
					{ label: 'A', href: '/parent/a' },
					{ label: 'B', href: '/parent/b' }
				]
			}
		],
		variant: 'vertical',
		childrenVariant: 'expanded',
		currentPath: '/parent/a',
		textColor: 'rgb(1, 2, 3)',
		selectedTextColor: 'rgb(4, 5, 6)',
		ariaLabel: 'Main navigation'
	});
	const [childA, childB] = screen.container.querySelectorAll('.nav-item__children .nav-item');
	expect(getComputedStyle(childA).color).toBe('rgb(4, 5, 6)');
	expect(getComputedStyle(childB).color).toBe('rgb(1, 2, 3)');
});
