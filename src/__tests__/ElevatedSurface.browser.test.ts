/**
 * ポップアップやダイアログなど浮き上がる面が、地の面と区別できることを検証する。
 * 暗いテーマでは黒い影に下げしろがないため、面そのものを一段明るくして奥行きを示す。
 */
import { test, expect, afterEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import Modal from '../lib/components/Modal.svelte';
import Dialog from '../lib/components/Dialog.svelte';
import Drawer from '../lib/components/Drawer.svelte';
import ConfirmDialog from '../lib/components/ConfirmDialog.svelte';
import Popup from '../lib/components/Popup.svelte';
import PopupMenu from '../lib/components/PopupMenu.svelte';
import Combobox from '../lib/components/Combobox.svelte';
import variables from '../lib/assets/styles/variables.scss?inline';
import core from '../lib/assets/styles/core.scss?inline';

const themeStyle = document.createElement('style');
themeStyle.textContent = `${variables}\n${core}`;
document.head.appendChild(themeStyle);

const withTheme = <T>(theme: 'light' | 'dark', fn: () => T): T => {
	document.documentElement.setAttribute('data-theme', theme);
	try {
		return fn();
	} finally {
		document.documentElement.removeAttribute('data-theme');
	}
};

/** 明るさの比較用。変数は 16 進、計算値は rgb() で返るため両方を受ける */
const brightness = (color: string) => {
	const value = color.trim();
	if (value.startsWith('#')) {
		const hex = value.slice(1);
		return [0, 2, 4].reduce((a, i) => a + parseInt(hex.slice(i, i + 2), 16), 0);
	}
	const channels = value.match(/\d+/g);
	if (!channels) throw new Error(`色として解釈できない: ${color}`);
	return channels.slice(0, 3).reduce((a, c) => a + Number(c), 0);
};

const surfaceVars = () => {
	const cs = getComputedStyle(document.documentElement);
	return {
		base: cs.getPropertyValue('--svelte-ui-surface-color'),
		elevated: cs.getPropertyValue('--svelte-ui-surface-elevated-color')
	};
};

afterEach(() => document.documentElement.removeAttribute('data-theme'));

test('ライトでは浮き上がる面と地の面が同じ（白より明るくできないため）', () => {
	const { base, elevated } = withTheme('light', surfaceVars);

	expect(brightness(elevated)).toBe(brightness(base));
});

test('ダークでは浮き上がる面が地の面より明るい', () => {
	const { base, elevated } = withTheme('dark', surfaceVars);

	expect(brightness(elevated)).toBeGreaterThan(brightness(base));
});

const body = createRawSnippet(() => ({ render: () => '<p>本文</p>' }));

/** 浮き上がる面を持つコンポーネントと、その面を描く要素 */
const ELEVATED: [string, unknown, Record<string, unknown>, string][] = [
	['Modal', Modal, { children: body }, '.modal'],
	['Dialog', Dialog, { children: body }, '.modal'],
	['Drawer', Drawer, { children: body }, '.modal'],
	['ConfirmDialog', ConfirmDialog, { message: '確認' }, '.modal'],
	['Popup', Popup, { children: body }, '[data-testid="popup"]'],
	['PopupMenu', PopupMenu, { menuItems: [{ label: 'A' }] }, '.popup-menu'],
	['Combobox', Combobox, { value: '', options: ['a'] }, '.combobox__options']
];

test.each(ELEVATED)('%s は浮き上がる面の色で描かれる', (_name, comp, props, selector) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { container } = render(comp as any, props as any);
	const el = container.querySelector(selector) as HTMLElement;
	// popover は開いていないと :popover-open のスタイルが当たらない
	if (el.hasAttribute('popover')) el.showPopover();

	for (const theme of ['light', 'dark'] as const) {
		withTheme(theme, () => {
			const { elevated } = surfaceVars();
			expect(brightness(getComputedStyle(el).backgroundColor)).toBe(brightness(elevated));
		});
	}
});
