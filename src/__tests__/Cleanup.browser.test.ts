// オーバーレイ系コンポーネントの後始末に関する回帰テスト。
//
// 検証する2点:
//   1. 開いている間だけ登録するグローバルリスナーが、unmount 後に残らないこと
//   2. 閉じる処理が animationend に依存せず、アニメーションが動かない環境でも完了すること
//      （完了しないと popover / <dialog> / Snackbar が画面に残り、以降のクリックを奪う）

import { test, expect, beforeAll, beforeEach, afterEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from '@vitest/browser/context';
import { popupManager } from '../lib/utils/popupManager';
import { snackbar } from '../lib/utils/snackbar.svelte';
import Snackbar from '../lib/components/Snackbar.svelte';
import CleanupCalendar from './helpers/CleanupCalendar.svelte';
import CleanupPopupMenu from './helpers/CleanupPopupMenu.svelte';
import DialogCallbacks from './helpers/DialogCallbacks.svelte';

// add されて remove されていないグローバルリスナーを追跡する。
// Svelte の delegated listener も含まれるため、判定は必ず unmount 後に行うこと。
const live = new Map<string, Set<unknown>>();

const track = (target: EventTarget, name: string) => {
	const add = target.addEventListener.bind(target);
	const remove = target.removeEventListener.bind(target);
	const bucket = (type: string) => {
		const key = `${name}:${type}`;
		if (!live.has(key)) live.set(key, new Set());
		return live.get(key)!;
	};
	target.addEventListener = (type: string, fn: never, opts: never) => {
		bucket(type).add(fn);
		add(type, fn, opts);
	};
	target.removeEventListener = (type: string, fn: never, opts: never) => {
		bucket(type).delete(fn);
		remove(type, fn, opts);
	};
};

const leakedListeners = () =>
	Object.fromEntries(
		[...live].filter(([, fns]) => fns.size > 0).map(([key, fns]) => [key, fns.size])
	);

const settle = () => new Promise((resolve) => setTimeout(resolve, 50));

const disableAnimations = () => {
	const style = document.createElement('style');
	style.textContent = '*, *::backdrop { animation: none !important; }';
	document.head.appendChild(style);
	return () => style.remove();
};

const isMenuOpen = () => document.querySelector('#cleanup-menu-popup')!.matches(':popover-open');

beforeAll(() => {
	track(document, 'document');
	track(document.body, 'body');
	track(window, 'window');
});

beforeEach(() => {
	live.clear();
});

afterEach(() => {
	snackbar.clear();
});

test('Popup: unmounting right after mount leaves no global listener', async () => {
	const { unmount } = render(CleanupPopupMenu);
	unmount();

	await settle();
	expect(leakedListeners()).toEqual({});
});

test('Popup: unmounting right after open() leaves no listener and no popupManager entry', async () => {
	const registeredBefore = popupManager.getOpenCount();

	const { unmount } = render(CleanupPopupMenu);
	document.querySelector<HTMLButtonElement>('#cleanup-anchor')!.click();
	unmount();

	await settle();
	expect(leakedListeners()).toEqual({});
	expect(popupManager.getOpenCount()).toBe(registeredBefore);
});

test('Popup: unmounting while open leaves no global listener', async () => {
	const { unmount } = render(CleanupPopupMenu);
	await userEvent.click(document.querySelector('#cleanup-anchor')!);
	await expect.poll(isMenuOpen).toBe(true);
	unmount();

	await settle();
	expect(leakedListeners()).toEqual({});
});

test('Popup: close() hides the popover even when animations are disabled', async () => {
	const restoreAnimations = disableAnimations();

	const { unmount } = render(CleanupPopupMenu);
	await userEvent.click(document.querySelector('#cleanup-anchor')!);
	await expect.poll(isMenuOpen).toBe(true);

	await userEvent.keyboard('{Escape}');
	await expect.poll(isMenuOpen).toBe(false);

	unmount();
	await settle();
	expect(leakedListeners()).toEqual({});
	restoreAnimations();
});

test('Modal: close() closes the dialog and reports the reason when animations are disabled', async () => {
	const restoreAnimations = disableAnimations();

	const screen = render(DialogCallbacks);
	screen.component.open();
	await settle();
	const dialog = document.querySelector('dialog') as HTMLDialogElement;
	expect(dialog.open).toBe(true);

	screen.component.close();
	await expect.poll(() => dialog.open).toBe(false);
	expect(screen.component.getCloseReasons()).toEqual(['explicit']);

	restoreAnimations();
});

test('Snackbar: auto-dismiss removes the item when animations are disabled', async () => {
	const restoreAnimations = disableAnimations();

	render(Snackbar, { duration: 50 });
	snackbar.info('hello');

	await expect.poll(() => snackbar.items.length).toBe(0);
	expect(document.querySelectorAll('[data-testid="snackbar-item"]')).toHaveLength(0);

	restoreAnimations();
});

test('DatepickerCalendar: unmounting while open removes the document keydown listener', async () => {
	const screen = render(CleanupCalendar);
	screen.component.openCalendar();
	screen.unmount();

	await settle();
	expect(leakedListeners()).toEqual({});
});
