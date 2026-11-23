/**
 * ヘッダーの高さの決まり方を検証する。
 * scrollable かどうかでヘッダーのデザインが変わる。
 *   - 非 scrollable: 線で区切られず本文と一体に見えるため、高さは padding と中身で決まる
 *   - scrollable: 線で区切られた固定バーになるため、高さはテーマ変数で決まる
 */
import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import Dialog from '#lib/sharedComponents/Dialog.svelte';
import Drawer from '#lib/sharedComponents/Drawer.svelte';
import variables from '#lib/assets/styles/variables.scss?inline';
import core from '#lib/assets/styles/core.scss?inline';

const themeStyle = document.createElement('style');
themeStyle.textContent = `${variables}\n${core}`;
document.head.appendChild(themeStyle);

/** ダイアログが最大高さに達して、フレックスアイテムの縮小が起きる長さ */
const longBody = createRawSnippet(() => ({
	render: () => `<div>${'<p>行</p>'.repeat(200)}</div>`
}));
const footer = createRawSnippet(() => ({ render: () => '<button>OK</button>' }));
/** 中身が詰まったフッター。潰れると中のボタンが切れる */
const tallFooter = createRawSnippet(() => ({
	render: () => '<div style="height:200px;width:100%"></div>'
}));
/** 変数の高さより明らかに高い独自ヘッダー */
const tallHeader = createRawSnippet(() => ({
	render: () =>
		'<div style="display:flex;flex-direction:column;gap:8px;width:100%">' +
		'<h2 style="margin:0;font-size:28px">タイトル</h2><div style="height:48px"></div></div>'
}));

const height = (el: Element) => el.getBoundingClientRect().height;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const openRegion = async (comp: any, props: any, selector: string) => {
	const { container } = await render(comp, props);
	(container.querySelector<HTMLElement>('dialog.modal') as HTMLDialogElement).showModal();
	return container.querySelector<HTMLElement>(selector) as HTMLElement;
};

const openHeader = async (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	comp: any,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	props: any,
	block: string,
	vars: Record<string, string> = {}
) => {
	const { container } = await render(comp, props);
	(container.querySelector<HTMLElement>('dialog.modal') as HTMLDialogElement).showModal();
	const root = container.querySelector<HTMLElement>(`.${block}`) as HTMLElement;
	for (const [name, value] of Object.entries(vars)) root.style.setProperty(name, value);
	return container.querySelector<HTMLElement>(`.${block}__header`) as HTMLElement;
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

test('非 scrollable: 本文が長くてもヘッダーが潰れない', async () => {
	expectFitsContent(await openHeader(Dialog, { title: 'タイトル', children: longBody }, 'dialog'));
});

test('非 scrollable: 背の高い独自ヘッダーは中身に合わせて伸びる', async () => {
	const header = await openHeader(Dialog, { header: tallHeader, children: longBody }, 'dialog');

	expectFitsContent(header);
	expect(height(header)).toBeGreaterThan(100);
});

test('scrollable: ヘッダーの高さはテーマ変数で決まる', async () => {
	const header = await openHeader(
		Dialog,
		{ title: 'タイトル', children: longBody, footer, scrollable: true },
		'dialog'
	);

	expect(height(header)).toBe(parseFloat(getComputedStyle(header).minHeight));
});

test('scrollable: テーマ変数を変えるとヘッダーの高さが追従する', async () => {
	const header = await openHeader(
		Dialog,
		{ title: 'タイトル', children: longBody, footer, scrollable: true },
		'dialog',
		{ '--svelte-ui-dialog-header-height': '64px' }
	);

	expect(height(header)).toBe(64);
});

test('scrollable: 中身が変数の高さを超えたら潰さずに伸ばす', async () => {
	const header = await openHeader(
		Dialog,
		{ header: tallHeader, children: longBody, footer, scrollable: true },
		'dialog'
	);

	expectFitsContent(header);
});

test('Drawer scrollable: ヘッダーの高さがテーマ変数に追従する', async () => {
	const header = await openHeader(
		Drawer,
		{ title: 'タイトル', children: longBody, footer, scrollable: true },
		'drawer',
		{ '--svelte-ui-drawer-header-height': '64px' }
	);

	expect(height(header)).toBe(64);
});

test('Drawer 非 scrollable: 本文が長くてもヘッダーが潰れない', async () => {
	expectFitsContent(await openHeader(Drawer, { title: 'タイトル', children: longBody }, 'drawer'));
});

/**
 * ヘッダー以外の領域も潰れてはいけない。こちらは min-height を持たないため
 * フレックスアイテムの自動最小サイズに守られている。min-height を足すとその保護が
 * 外れるので、不変条件として固定しておく。
 */
const expectNotClipped = (el: HTMLElement) => {
	expect(el.scrollHeight - el.clientHeight).toBeLessThanOrEqual(1);
};

test('フッターは本文が長くても潰れない', async () => {
	expectNotClipped(
		await openRegion(
			Dialog,
			{ title: 'タイトル', children: longBody, footer: tallFooter, scrollable: true },
			'.dialog__footer'
		)
	);
});

test('description は本文が長くても潰れない', async () => {
	expectNotClipped(
		await openRegion(
			Dialog,
			{ title: 'タイトル', description: 'せ'.repeat(400), children: longBody, scrollable: true },
			'.dialog__description'
		)
	);
});

test('Drawer のフッターも本文が長くても潰れない', async () => {
	expectNotClipped(
		await openRegion(
			Drawer,
			{ title: 'タイトル', children: longBody, footer: tallFooter, scrollable: true },
			'.drawer__footer'
		)
	);
});

for (const scrollable of [false, true]) {
	test(`Dialog: padding is independent for each mode (scrollable=${scrollable})`, async () => {
		const header = await openHeader(Dialog, { title: 'Title', scrollable }, 'dialog', {
			'--svelte-ui-dialog-non-scrollable-header-padding': '11px 13px 17px 19px',
			'--svelte-ui-dialog-scrollable-header-padding': '3px 5px 7px 9px'
		});
		const style = getComputedStyle(header);
		expect([style.paddingTop, style.paddingRight, style.paddingBottom, style.paddingLeft]).toEqual(
			scrollable ? ['3px', '5px', '7px', '9px'] : ['11px', '13px', '17px', '19px']
		);
	});
}
