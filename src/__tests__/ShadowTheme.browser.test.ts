/**
 * 浮き上がりの影が、テーマごとの変数から描かれることを検証する。
 * ダークでは黒い影が暗い背景に沈むため、ライトより濃くする必要がある。
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
import Fab from '../lib/components/Fab.svelte';
import variables from '../lib/assets/styles/variables.scss?inline';
import core from '../lib/assets/styles/core.scss?inline';

const themeStyle = document.createElement('style');
themeStyle.textContent = `${variables}\n${core}`;
document.head.appendChild(themeStyle);

const SHADOW_VARS = [
	'--svelte-ui-shadow-color-strong',
	'--svelte-ui-shadow-color',
	'--svelte-ui-shadow-color-weak'
];

const withTheme = <T>(theme: 'light' | 'dark', fn: () => T): T => {
	document.documentElement.setAttribute('data-theme', theme);
	try {
		return fn();
	} finally {
		document.documentElement.removeAttribute('data-theme');
	}
};

/** rgba(0, 0, 0, 0.2) 形式からアルファ値を取り出す */
const alphaOf = (color: string) => {
	const match = color.match(/rgba?\([^)]*?([\d.]+)\s*\)/);
	return match ? parseFloat(match[1]) : 1;
};

/** box-shadow 文字列に含まれるアルファ値をすべて取り出す */
const shadowAlphas = (el: Element) =>
	(getComputedStyle(el).boxShadow.match(/rgba?\([^)]*\)/g) ?? []).map(alphaOf);

/** box-shadow に transition が掛かっていると遷移中の値が返るため、計測前に止める */
const freezeTransition = (el: Element) => {
	(el as HTMLElement).style.transition = 'none';
	return el;
};

afterEach(() => document.documentElement.removeAttribute('data-theme'));

test('影の色変数はダークのほうが濃い', () => {
	for (const name of SHADOW_VARS) {
		const light = withTheme('light', () =>
			alphaOf(getComputedStyle(document.documentElement).getPropertyValue(name))
		);
		const dark = withTheme('dark', () =>
			alphaOf(getComputedStyle(document.documentElement).getPropertyValue(name))
		);

		expect(light, `${name} がライトで未定義`).toBeGreaterThan(0);
		expect(dark, `${name} がダークで濃くなっていない`).toBeGreaterThan(light);
	}
});

const body = createRawSnippet(() => ({ render: () => '<p>本文</p>' }));

/** 浮き上がりの影を持つコンポーネントと、その影を描く要素 */
const ELEVATED: [string, unknown, Record<string, unknown>, string][] = [
	['Modal', Modal, { children: body }, '.modal'],
	['Dialog', Dialog, { children: body }, '.modal'],
	['Drawer', Drawer, { children: body }, '.modal'],
	['ConfirmDialog', ConfirmDialog, { message: '確認' }, '.modal'],
	['Popup', Popup, { children: body }, '[data-testid="popup"]'],
	['PopupMenu', PopupMenu, { menuItems: [{ label: 'A' }] }, '.popup-menu'],
	['Fab', Fab, { children: body, shadow: true }, '.fab']
];

test.each(ELEVATED)(
	'%s の影がテーマ変数から描かれ、ダークで濃くなる',
	(_name, comp, props, selector) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const { container } = render(comp as any, props as any);
		const el = container.querySelector(selector) as HTMLElement;
		// popover は開いていないと :popover-open のスタイルが当たらない
		if (el.hasAttribute('popover')) el.showPopover();
		freezeTransition(el);

		const light = withTheme('light', () => shadowAlphas(el));
		const dark = withTheme('dark', () => shadowAlphas(el));

		expect(light.length, '影が描かれていない').toBeGreaterThan(0);
		expect(dark).toHaveLength(light.length);
		light.forEach((a, i) => expect(dark[i]).toBeGreaterThan(a));
	}
);
