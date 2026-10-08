/**
 * 完了ステップ以外のマーカーは塗らず、背景が透けて見えることを検証する。
 * テーマ変数を読み込まないと var() が解決されず塗りの有無を判別できないため、
 * このファイルでは variables.scss を適用して検証する。
 */
import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import StepNav from '../lib/components/StepNav.svelte';
import type { StepItem } from '../lib/types/stepItem';
import variables from '../lib/assets/styles/variables.scss?inline';
import core from '../lib/assets/styles/core.scss?inline';

const themeStyle = document.createElement('style');
themeStyle.textContent = `${variables}\n${core}`;
document.head.appendChild(themeStyle);

const TRANSPARENT = 'rgba(0, 0, 0, 0)';

const items: StepItem[] = [
	{ label: 'アカウント', value: 'account' },
	{ label: '住所', value: 'address' },
	{ label: '確認', value: 'confirm' },
	{ label: 'エラー', value: 'error', error: true }
];

const markerBackground = (container: Element, status: string) =>
	getComputedStyle(
		container.querySelector(`.step-nav__step--${status} .step-nav__marker`) as HTMLElement
	).backgroundColor;

test('upcoming / in-progress / error のマーカーは塗らない', () => {
	const { container } = render(StepNav, { items, value: 'address', progress: 1 });

	// テーマのサーフェス色が透明ではないことを確認してから、マーカーが塗られていないことを見る
	const surface = getComputedStyle(document.documentElement).getPropertyValue(
		'--svelte-ui-surface-color'
	);
	expect(surface.trim()).not.toBe('');

	expect(markerBackground(container, 'upcoming')).toBe(TRANSPARENT);
	expect(markerBackground(container, 'in-progress')).toBe(TRANSPARENT);
	expect(markerBackground(container, 'error')).toBe(TRANSPARENT);
});

test('done のマーカーは強調色で塗る', () => {
	const { container } = render(StepNav, {
		items,
		value: 'address',
		progress: 1,
		color: 'rgb(255, 0, 0)'
	});

	expect(markerBackground(container, 'done')).toBe('rgb(255, 0, 0)');
});

test('表示中リングは隙間に背景が透けるよう outline で描く', () => {
	const { container } = render(StepNav, { items, value: 'address', progress: 1 });
	const marker = container.querySelector(
		'.step-nav__step--viewing .step-nav__marker'
	) as HTMLElement;
	const style = getComputedStyle(marker);

	// box-shadow だとリングとマーカーの隙間が塗りつぶされる
	expect(style.boxShadow).toBe('none');
	expect(style.outlineStyle).toBe('solid');
	expect(parseFloat(style.outlineWidth)).toBeGreaterThan(0);
	expect(parseFloat(style.outlineOffset)).toBeGreaterThan(0);
});
