/**
 * ヘッダーの高さの決まり方を検証する。
 * scrollable かどうかでヘッダーのデザインが変わる。
 *   - 非 scrollable: 線で区切られず本文と一体に見えるため、高さは padding と中身で決まる
 *   - scrollable: 線で区切られた固定バーになるため、高さはテーマ変数で決まる
 */
import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import Dialog from '../lib/components/Dialog.svelte';
import Drawer from '../lib/components/Drawer.svelte';
import variables from '../lib/assets/styles/variables.scss?inline';
import core from '../lib/assets/styles/core.scss?inline';

const themeStyle = document.createElement('style');
themeStyle.textContent = `${variables}\n${core}`;
document.head.appendChild(themeStyle);

/** ダイアログが最大高さに達して、フレックスアイテムの縮小が起きる長さ */
const longBody = createRawSnippet(() => ({
	render: () => `<div>${'<p>行</p>'.repeat(200)}</div>`
}));
const footer = createRawSnippet(() => ({ render: () => '<button>OK</button>' }));
/** 変数の高さより明らかに高い独自ヘッダー */
const tallHeader = createRawSnippet(() => ({
	render: () =>
		'<div style="display:flex;flex-direction:column;gap:8px;width:100%">' +
		'<h2 style="margin:0;font-size:28px">タイトル</h2><div style="height:48px"></div></div>'
}));

const height = (el: Element) => el.getBoundingClientRect().height;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const openHeader = (comp: any, props: any, block: string, vars: Record<string, string> = {}) => {
	const { container } = render(comp, props);
	(container.querySelector('dialog.modal') as HTMLDialogElement).showModal();
	const root = container.querySelector(`.${block}`) as HTMLElement;
	for (const [name, value] of Object.entries(vars)) root.style.setProperty(name, value);
	return container.querySelector(`.${block}__header`) as HTMLElement;
};

/** ヘッダーが中身を収めきれていること（潰れていないこと） */
const expectFitsContent = (header: HTMLElement) => {
	const style = getComputedStyle(header);
	const needed =
		height(header.firstElementChild as Element) +
		parseFloat(style.paddingTop) +
		parseFloat(style.paddingBottom);

	expect(height(header)).toBeGreaterThanOrEqual(needed - 0.5);
};

test('非 scrollable: 本文が長くてもヘッダーが潰れない', () => {
	expectFitsContent(openHeader(Dialog, { title: 'タイトル', children: longBody }, 'dialog'));
});

test('非 scrollable: 背の高い独自ヘッダーは中身に合わせて伸びる', () => {
	const header = openHeader(Dialog, { header: tallHeader, children: longBody }, 'dialog');

	expectFitsContent(header);
	expect(height(header)).toBeGreaterThan(100);
});

test('scrollable: ヘッダーの高さはテーマ変数で決まる', () => {
	const header = openHeader(
		Dialog,
		{ title: 'タイトル', children: longBody, footer, scrollable: true },
		'dialog'
	);

	expect(height(header)).toBe(parseFloat(getComputedStyle(header).minHeight));
});

test('scrollable: テーマ変数を変えるとヘッダーの高さが追従する', () => {
	const header = openHeader(
		Dialog,
		{ title: 'タイトル', children: longBody, footer, scrollable: true },
		'dialog',
		{ '--svelte-ui-dialog-header-height': '64px' }
	);

	expect(height(header)).toBe(64);
});

test('scrollable: 中身が変数の高さを超えたら潰さずに伸ばす', () => {
	const header = openHeader(
		Dialog,
		{ header: tallHeader, children: longBody, footer, scrollable: true },
		'dialog'
	);

	expectFitsContent(header);
});

test('Drawer scrollable: ヘッダーの高さがテーマ変数に追従する', () => {
	const header = openHeader(
		Drawer,
		{ title: 'タイトル', children: longBody, footer, scrollable: true },
		'drawer',
		{ '--svelte-ui-drawer-header-height': '64px' }
	);

	expect(height(header)).toBe(64);
});

test('Drawer 非 scrollable: 本文が長くてもヘッダーが潰れない', () => {
	expectFitsContent(openHeader(Drawer, { title: 'タイトル', children: longBody }, 'drawer'));
});
