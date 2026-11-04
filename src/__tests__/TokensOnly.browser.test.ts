/**
 * styles/tokens（CSS 変数だけ）を読み込んだページでも、部品が styles（全部入り）と同じ見た目で描かれることを検証する。
 * 同じ DOM のまま読み込む CSS だけを差し替え、部品の中の全要素の計算済みスタイルを比べる。
 * 一致しないときは、部品が core.scss のページ全体の規則に頼っているので、その規則を部品の <style> へ移す。
 */
import { test, expect, afterEach } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { page } from '@vitest/browser/context';
import TokensOnlyScene from './helpers/TokensOnlyScene.svelte';
import { announceToScreenReader } from '../lib/utils/accessibility';
import full from '../lib/assets/styles/import.scss?inline';
import tokens from '../lib/assets/styles/variables.scss?inline';

const PROPERTIES = [
	'box-sizing',
	'width',
	'height',
	'padding-top',
	'padding-right',
	'padding-bottom',
	'padding-left',
	'margin-top',
	'margin-right',
	'margin-bottom',
	'margin-left',
	'border-top-width',
	'border-right-width',
	'border-bottom-width',
	'border-left-width',
	'border-top-color',
	'border-right-color',
	'border-bottom-color',
	'border-left-color',
	'border-top-left-radius',
	'border-top-right-radius',
	'border-bottom-right-radius',
	'border-bottom-left-radius',
	'background-color',
	'color',
	'font-size',
	'font-weight',
	'line-height',
	'box-shadow'
];

const SCENES = ['button', 'input', 'dialog', 'popup', 'popupmenu'] as const;
const THEMES = ['light', 'dark'] as const;

const styleEl = document.createElement('style');
document.head.appendChild(styleEl);

afterEach(() => {
	styleEl.textContent = '';
	document.documentElement.removeAttribute('data-theme');
});

const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => resolve(undefined)));

/** 開閉アニメーションなどが落ち着くのを待つ */
const settle = async () => {
	await new Promise((resolve) => setTimeout(resolve, 600));
	await nextFrame();
};

/** 部品の中の全要素を、部品の中での位置（パス）で識別して計算済みスタイルを集める */
const collect = (roots: Element[]) => {
	const result: Record<string, Record<string, string>> = {};
	const walk = (el: Element, path: string) => {
		const style = getComputedStyle(el);
		result[path] = Object.fromEntries(PROPERTIES.map((p) => [p, style.getPropertyValue(p)]));
		Array.from(el.children).forEach((child, i) =>
			walk(child, `${path} > ${child.tagName.toLowerCase()}:nth-child(${i + 1})`)
		);
	};
	roots.forEach((root, i) =>
		walk(root, `root${i}(${root.tagName.toLowerCase()}.${root.classList[0] ?? ''})`)
	);
	return result;
};

const diff = (
	a: Record<string, Record<string, string>>,
	b: Record<string, Record<string, string>>
) =>
	Object.keys(a).flatMap((path) =>
		PROPERTIES.filter((p) => a[path][p] !== b[path]?.[p]).map(
			(p) => `${path} ${p}: full=${a[path][p]} tokens=${b[path]?.[p]}`
		)
	);

for (const theme of THEMES) {
	test.each(SCENES)(
		`%s は tokens だけでも全部入りと同じスタイルになる（${theme}）`,
		async (scene) => {
			document.documentElement.setAttribute('data-theme', theme);
			styleEl.textContent = full;

			const { container } = render(TokensOnlyScene, { scene });
			await settle();

			const anchor = container.firstElementChild;
			const roots = Array.from(container.children).filter((el) => el !== anchor);
			expect(roots.length).toBeGreaterThan(0);

			const fullStyles = collect(roots);
			await page.screenshot({ path: `__screenshots__/tokens-only/${scene}-${theme}-full.png` });

			styleEl.textContent = tokens;
			await nextFrame();

			const tokensStyles = collect(roots);
			await page.screenshot({ path: `__screenshots__/tokens-only/${scene}-${theme}-tokens.png` });

			expect(diff(fullStyles, tokensStyles)).toEqual([]);
		}
	);
}

test('読み上げ用のお知らせは tokens だけでも画面に出ない', () => {
	styleEl.textContent = tokens;
	announceToScreenReader('announcement', 'polite', 0);

	const el = Array.from(document.body.children).find(
		(child) => child.textContent === 'announcement'
	);
	const rect = el!.getBoundingClientRect();
	expect(rect.width).toBeLessThanOrEqual(1);
	expect(rect.height).toBeLessThanOrEqual(1);
});

test('Popup はリセット CSS が無くてもアンカーの下に出る', async () => {
	styleEl.textContent = tokens;
	const { container } = render(TokensOnlyScene, { scene: 'popup' });
	await settle();

	const anchor = container.firstElementChild!.getBoundingClientRect();
	const popup = container.querySelector('[data-testid="popup"]')!.getBoundingClientRect();
	expect(popup.top).toBeGreaterThanOrEqual(anchor.bottom);
	expect(popup.top - anchor.bottom).toBeLessThan(20);
});
