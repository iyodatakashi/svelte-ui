/**
 * Dialog / Drawer に読み上げ用の名前が付くことを検証する。
 * aria-labelledby の参照先が存在しないと名前は付かず、しかも計算上は無視されるだけで
 * エラーにならないため、属性の有無ではなくロールと名前で引けるかどうかを見る。
 */
import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from '@vitest/browser/context';
import { createRawSnippet } from 'svelte';
import Dialog from '../lib/components/Dialog.svelte';
import Drawer from '../lib/components/Drawer.svelte';

const customHeader = createRawSnippet(() => ({ render: () => '<h2>独自ヘッダー</h2>' }));

type Opened = { dialog: HTMLDialogElement; container: Element };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const open = (comp: any, props: any): Opened => {
	const { container } = render(comp, props);
	const dialog = container.querySelector('dialog.modal') as HTMLDialogElement;
	dialog.showModal();
	return { dialog, container };
};

/** aria-labelledby / aria-describedby の参照先が実在することを確かめる */
const expectReferencesResolve = ({ dialog, container }: Opened) => {
	for (const attr of ['aria-labelledby', 'aria-describedby']) {
		const id = dialog.getAttribute(attr);
		if (id === null) continue;
		expect(
			container.querySelector(`#${CSS.escape(id)}`),
			`${attr} の参照先がない: ${id}`
		).not.toBeNull();
	}
};

const expectNamed = async (opened: Opened, name: string) => {
	expectReferencesResolve(opened);
	await expect.element(page.getByRole('dialog', { name })).toBeInTheDocument();
	opened.dialog.close();
};

test('Dialog: title だけで名前が付く', async () => {
	await expectNamed(open(Dialog, { title: 'タイトル' }), 'タイトル');
});

test('Dialog: id を渡しても名前が付く', async () => {
	await expectNamed(open(Dialog, { title: 'タイトル', id: 'foo' }), 'タイトル');
});

test('Dialog: ariaLabel は title より優先される', async () => {
	await expectNamed(open(Dialog, { title: 'タイトル', ariaLabel: 'ラベル' }), 'ラベル');
});

test('Dialog: header を差し替えても title が名前になる', async () => {
	await expectNamed(open(Dialog, { title: 'タイトル', header: customHeader }), 'タイトル');
});

test('Dialog: description の参照先も実在する', async () => {
	const opened = open(Dialog, { title: 'タイトル', description: '説明' });
	expect(opened.dialog.getAttribute('aria-describedby')).not.toBeNull();
	await expectNamed(opened, 'タイトル');
});

test('Dialog: 名前は aria-label と aria-labelledby のどちらか一方だけで与える', () => {
	const { dialog } = open(Dialog, { title: 'タイトル' });

	expect(
		dialog.hasAttribute('aria-label') && dialog.hasAttribute('aria-labelledby'),
		'両方指定すると aria-labelledby が勝ち、aria-label は無視される'
	).toBe(false);
	dialog.close();
});

test('Drawer: title だけで名前が付く', async () => {
	await expectNamed(open(Drawer, { title: 'ドロワー' }), 'ドロワー');
});

test('Drawer: title も ariaLabel も無ければ既定の名前が付く', async () => {
	await expectNamed(open(Drawer, {}), 'Drawer');
});
