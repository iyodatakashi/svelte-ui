import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import RadioGroup from '../lib/components/RadioGroup.svelte';
import type { Option } from '../lib/types/options';

const options: Option[] = [
	{ label: '初級', value: 'beginner' },
	{ label: '中級', value: 'intermediate' },
	{ label: '上級', value: 'advanced' }
];

test('options を配列順に描画し、最上位に data-testid を付与する', () => {
	const screen = render(RadioGroup, { options, value: 'intermediate' });

	expect(screen.container.querySelector('[data-testid="radio-group"]')).not.toBeNull();

	const labels = Array.from(screen.container.querySelectorAll('.radio__label')).map((el) =>
		el.textContent?.trim()
	);
	expect(labels).toEqual(['初級', '中級', '上級']);
});

test('value に一致する radio だけが選択される', () => {
	const screen = render(RadioGroup, { options, value: 'intermediate' });

	const radios = Array.from(
		screen.container.querySelectorAll<HTMLInputElement>('input[type="radio"]')
	);
	expect(radios.map((radio) => radio.checked)).toEqual([false, true, false]);
});

test('value が undefined でもクラッシュせず未選択で描画される', () => {
	const screen = render(RadioGroup, { options, value: undefined });

	const radios = Array.from(
		screen.container.querySelectorAll<HTMLInputElement>('input[type="radio"]')
	);
	expect(radios.length).toBe(3);
	expect(radios.some((radio) => radio.checked)).toBe(false);
});

test('value が null でもクラッシュせず未選択で描画される', () => {
	const screen = render(RadioGroup, { options, value: null });

	const radios = Array.from(
		screen.container.querySelectorAll<HTMLInputElement>('input[type="radio"]')
	);
	expect(radios.some((radio) => radio.checked)).toBe(false);
});

test('radio をクリックすると value が更新され onchange が呼ばれる', async () => {
	let changed: unknown;
	const screen = render(RadioGroup, {
		options,
		value: undefined,
		onchange: (value: unknown) => {
			changed = value;
		}
	});

	const radios = Array.from(
		screen.container.querySelectorAll<HTMLInputElement>('input[type="radio"]')
	);
	radios[2].click();

	expect(changed).toBe('advanced');
	expect(radios[2].checked).toBe(true);
});
