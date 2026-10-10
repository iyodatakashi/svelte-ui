/**
 * ボタンの文字色がテーマに追従することを検証する。
 * UA 既定の `color: buttontext` は継承より優先されるため、リセットで `color: inherit`
 * を当てていないと、ダークテーマでもボタンの文字だけ黒のまま残る。
 */
import { test, expect, afterEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Datepicker from '../lib/components/Datepicker.svelte';
import FileUploader from '../lib/components/FileUploader.svelte';
import variables from '../lib/assets/styles/variables.scss?inline';
import core from '../lib/assets/styles/core.scss?inline';

const themeStyle = document.createElement('style');
// アプリ側が文字色を当てている状態を再現する
themeStyle.textContent = `${variables}\n${core}\n[data-theme] { color: var(--svelte-ui-text-color); }`;
document.head.appendChild(themeStyle);

const withTheme = <T>(theme: 'light' | 'dark', fn: () => T): T => {
	document.documentElement.setAttribute('data-theme', theme);
	try {
		return fn();
	} finally {
		document.documentElement.removeAttribute('data-theme');
	}
};

afterEach(() => document.documentElement.removeAttribute('data-theme'));

test('色を指定していない button はテーマの文字色を継承する', () => {
	const button = document.createElement('button');
	button.textContent = 'ラベル';
	document.body.appendChild(button);

	try {
		const light = withTheme('light', () => getComputedStyle(button).color);
		const dark = withTheme('dark', () => getComputedStyle(button).color);
		const expected = (theme: 'light' | 'dark') =>
			withTheme(theme, () => getComputedStyle(document.documentElement).color);

		expect(light).toBe(expected('light'));
		expect(dark).toBe(expected('dark'));
		expect(dark).not.toBe(light);
	} finally {
		button.remove();
	}
});

/** 自前で色を持たず、リセットの継承に依存しているボタン */
const INHERITING: [string, unknown, Record<string, unknown>, string][] = [
	['Datepicker', Datepicker, { value: null }, '.datepicker__trigger-overlay'],
	['FileUploader', FileUploader, {}, 'button.file-uploader']
];

test.each(INHERITING)('%s のボタンがテーマの文字色に追従する', (_name, comp, props, selector) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { container } = render(comp as any, props as any);
	const el = container.querySelector(selector) as HTMLElement;

	const light = withTheme('light', () => getComputedStyle(el).color);
	const dark = withTheme('dark', () => getComputedStyle(el).color);

	expect(dark).not.toBe(light);
	expect(dark).not.toBe('rgb(0, 0, 0)');
});
