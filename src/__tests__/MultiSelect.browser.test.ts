import { test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import MultiSelect from '../lib/components/MultiSelect.svelte';
import type { Option, OptionValue } from '../lib/types/options';
import variables from '../lib/assets/styles/variables.scss?inline';

// トリガーの寸法や区切り線の色はテーマ変数に依存するため、テーマを読み込んでおく
const themeStyle = document.createElement('style');
themeStyle.textContent = variables;
document.head.appendChild(themeStyle);

const options: (Option | 'separator')[] = [
	{ value: 'all', label: 'All items' },
	'separator',
	{ value: 'active', label: 'Active' },
	{ value: 'archived', label: 'Archived' }
];

type Screen = ReturnType<typeof render>;

const getTrigger = (screen: Screen) =>
	screen.container.querySelector('.multi-select__trigger') as HTMLButtonElement;

const getPopup = (screen: Screen) =>
	screen.container.querySelector('[data-testid="popup"]') as HTMLElement;

const getThemeMinWidth = () =>
	parseFloat(
		getComputedStyle(document.documentElement).getPropertyValue(
			'--svelte-ui-select-options-min-width'
		)
	);

const openPopup = async (screen: Screen) => {
	getTrigger(screen).click();
	await vi.waitFor(() => {
		expect(getPopup(screen).matches(':popover-open')).toBe(true);
	});
};

test('options を配列順に描画し、separator を区切りとして挟む', () => {
	const screen = render(MultiSelect, { value: [], options });

	const labels = Array.from(screen.container.querySelectorAll('.checkbox__label')).map((el) =>
		el.textContent?.trim()
	);
	expect(labels).toEqual(['All items', 'Active', 'Archived']);

	const separator = screen.container.querySelector('.multi-select__separator');
	expect(separator).toHaveAttribute('role', 'separator');

	const items = Array.from(
		screen.container.querySelectorAll('.multi-select__item, .multi-select__separator')
	);
	expect(items[1]).toBe(separator);
});

test('separator はトリガーの表示ラベルに含まれない', () => {
	const screen = render(MultiSelect, { value: ['all', 'archived'], options });

	expect(screen.container.querySelector('.multi-select__display-text')?.textContent?.trim()).toBe(
		'All items,Archived'
	);
});

test('リストの最小幅はトリガー幅とテーマの下限の大きい方になる', async () => {
	const screen = render(MultiSelect, { value: [], options, placeholder: 'Filter' });
	await openPopup(screen);

	const listbox = screen.container.querySelector('.multi-select__options') as HTMLElement;
	const expected = Math.max(getTrigger(screen).offsetWidth, getThemeMinWidth());
	expect(parseFloat(getComputedStyle(listbox).minWidth)).toBeCloseTo(expected, 0);
});

test('separator を挟んでも選択の切り替えが動作する', async () => {
	let changed: OptionValue[] | undefined;
	const screen = render(MultiSelect, {
		value: [],
		options,
		onchange: (value: OptionValue[]) => {
			changed = value;
		}
	});

	await openPopup(screen);
	const checkboxes = Array.from(
		screen.container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')
	);
	expect(checkboxes).toHaveLength(3);

	checkboxes[2].click();
	await vi.waitFor(() => {
		expect(changed).toEqual(['archived']);
	});

	checkboxes[1].click();
	await vi.waitFor(() => {
		expect(changed).toEqual(['archived', 'active']);
	});

	checkboxes[2].click();
	await vi.waitFor(() => {
		expect(changed).toEqual(['active']);
	});
});
