/**
 * Popup を使うコンポーネントが mobileFullscreen を公開し、既定値が揃っていることを検証する。
 * モバイル判定は実行環境に依存するため、判定だけ差し替えて常にモバイル扱いにする。
 */
import { test, expect, vi } from 'vitest';

vi.mock('$lib/utils/mobile', async (importOriginal) => {
	const actual = await (importOriginal() as Promise<Record<string, unknown>>);
	return { ...actual, isMobileDevice: () => true };
});

import { render } from 'vitest-browser-svelte';
import { createRawSnippet, tick } from 'svelte';
import Popup from '../lib/components/Popup.svelte';
import PopupMenu from '../lib/components/PopupMenu.svelte';
import PopupMenuButton from '../lib/components/PopupMenuButton.svelte';
import Select from '../lib/components/Select.svelte';
import MultiSelect from '../lib/components/MultiSelect.svelte';
import Combobox from '../lib/components/Combobox.svelte';
import NavItem from '../lib/components/NavItem.svelte';
import Datepicker from '../lib/components/Datepicker.svelte';
import Nav from '../lib/components/Nav.svelte';
import variables from '../lib/assets/styles/variables.scss?inline';
import core from '../lib/assets/styles/core.scss?inline';

const themeStyle = document.createElement('style');
themeStyle.textContent = `${variables}\n${core}`;
document.head.appendChild(themeStyle);

const children = createRawSnippet(() => ({ render: () => '<p>中身</p>' }));
const options = [
	{ value: 'a', label: 'A' },
	{ value: 'b', label: 'B' }
];
const menuItems = [{ label: 'A' }, { label: 'B' }];

/**
 * 既定はどのコンポーネントも false で揃えてある。ボトムシートは背面スクロールを止める
 * モーダルな見せ方なので、必要なときだけ明示的に有効にする。
 * 開き方だけコンポーネントごとに違うので、トリガーの指定とあわせて持つ。
 */
const CASES: [string, unknown, Record<string, unknown>, string | null][] = [
	['Popup', Popup, { children, isOpen: true }, null],
	['PopupMenu', PopupMenu, { menuItems, isOpen: true }, null],
	['PopupMenuButton', PopupMenuButton, { menuItems }, 'button'],
	['Select', Select, { value: 'a', options }, '.select__trigger'],
	['MultiSelect', MultiSelect, { value: ['a'], options }, '.multi-select__trigger'],
	['Combobox', Combobox, { value: '', options: ['a', 'b'] }, 'input'],
	['Datepicker', Datepicker, { value: null }, '.datepicker__trigger-overlay']
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const openPopup = async (comp: any, props: any, triggerSelector: string | null) => {
	const { container } = render(comp, props);
	if (triggerSelector) {
		(container.querySelector(triggerSelector) as HTMLElement).click();
		await tick();
	}
	await new Promise((resolve) => setTimeout(resolve, 50));
	return container.querySelector('[data-testid="popup"]') as HTMLElement;
};

test.each(CASES)('%s は既定ではボトムシートにしない', async (_name, comp, props, trigger) => {
	const popup = await openPopup(comp, props, trigger);

	expect(popup.className).not.toContain('popup--fullscreen');
});

test.each(CASES)(
	'%s は mobileFullscreen=true で有効にできる',
	async (_name, comp, props, trigger) => {
		const popup = await openPopup(comp, { ...props, mobileFullscreen: true }, trigger);

		expect(popup.className).toContain('popup--fullscreen');
	}
);

const TRANSPARENT = 'rgba(0, 0, 0, 0)';
const backdropColor = (el: Element) => getComputedStyle(el, '::backdrop').backgroundColor;

test('ボトムシートは背面スクロールを止めるので背景を覆う', async () => {
	const popup = await openPopup(Popup, { children, isOpen: true, mobileFullscreen: true }, null);

	expect(backdropColor(popup)).not.toBe(TRANSPARENT);
});

test('通常のポップアップは非モーダルなので背景を覆わない', async () => {
	const popup = await openPopup(Popup, { children, isOpen: true }, null);

	expect(backdropColor(popup)).toBe(TRANSPARENT);
});

test('背景を覆っても外側クリックで閉じる', async () => {
	const popup = await openPopup(Popup, { children, isOpen: true, mobileFullscreen: true }, null);
	expect(popup.matches(':popover-open')).toBe(true);

	document.body.click();
	await tick();
	await new Promise((resolve) => setTimeout(resolve, 400));

	expect(popup.matches(':popover-open')).toBe(false);
});

/**
 * NavItem の popup サブメニューは開き方が特殊なので個別に見る。
 * 既定が false なのは他と同じ。
 */
const navItemWithChildren = {
	label: '親',
	children: [{ label: '子A' }, { label: '子B' }]
};

const clickAndGetPopup = async (container: Element) => {
	(container.querySelector('a,button') as HTMLElement).click();
	await tick();
	await new Promise((resolve) => setTimeout(resolve, 60));
	return document.querySelector('[data-testid="popup"]') as HTMLElement;
};

const openNavItemSubmenu = async (props: Record<string, unknown>) =>
	clickAndGetPopup(
		render(NavItem, {
			item: navItemWithChildren,
			childrenVariant: 'popup',
			...props
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any).container
	);

test('NavItem は既定ではボトムシートにしない', async () => {
	expect((await openNavItemSubmenu({})).className).not.toContain('popup--fullscreen');
});

test('NavItem は mobileFullscreen=true で有効にできる', async () => {
	expect((await openNavItemSubmenu({ mobileFullscreen: true })).className).toContain(
		'popup--fullscreen'
	);
});

/** Nav 経由でも NavItem の popup サブメニューを制御できること */
const openNavSubmenu = async (props: Record<string, unknown>) =>
	clickAndGetPopup(
		render(Nav, {
			items: [navItemWithChildren],
			childrenVariant: 'popup',
			...props
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any).container
	);

test('Nav は既定ではボトムシートにしない', async () => {
	expect((await openNavSubmenu({})).className).not.toContain('popup--fullscreen');
});

test('Nav 経由でも mobileFullscreen=true で有効にできる', async () => {
	expect((await openNavSubmenu({ mobileFullscreen: true })).className).toContain(
		'popup--fullscreen'
	);
});
