import { test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Select from '../lib/components/Select.svelte';
import type { Option } from '../lib/types/options';
import { collectCssVarNames } from './helpers/cssVarCollector';
import variables from '../lib/assets/styles/variables.scss?inline';

// トリガーの寸法やハイライト色はテーマ変数に依存するため、テーマを読み込んでおく
const themeStyle = document.createElement('style');
themeStyle.textContent = variables;
document.head.appendChild(themeStyle);

const options: (Option | 'separator')[] = [
	{ value: 'option1', label: 'Option 1' },
	{ value: 'option2', label: 'Option 2' },
	'separator',
	{ value: 'option3', label: 'Option 3', disabled: true }
];

type Screen = ReturnType<typeof render>;

const getTrigger = (screen: Screen) =>
	screen.container.querySelector('.select__trigger') as HTMLButtonElement;

const getPopup = (screen: Screen) =>
	screen.container.querySelector('[data-testid="popup"]') as HTMLElement;

const getOptionEls = (screen: Screen) =>
	Array.from(screen.container.querySelectorAll<HTMLElement>('.select__option'));

const getOptionLabels = (screen: Screen) =>
	Array.from(screen.container.querySelectorAll('.select__option-label')).map((el) =>
		el.textContent?.trim()
	);

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

test('トリガーを combobox として描画し、最上位に data-testid を付与する', async () => {
	const screen = render(Select, { value: undefined, options });

	expect(screen.container.querySelector('[data-testid="select"]')).not.toBeNull();

	const trigger = getTrigger(screen);
	await expect.element(trigger).toBeVisible();
	expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
	expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('未選択なら placeholder、選択済みならラベルをトリガーに表示する', () => {
	const unselected = render(Select, {
		value: undefined,
		options,
		placeholder: 'Choose an option'
	});
	expect(unselected.container.querySelector('.select__placeholder')?.textContent?.trim()).toBe(
		'Choose an option'
	);

	const selected = render(Select, { value: 'option2', options, placeholder: 'Choose an option' });
	expect(selected.container.querySelector('.select__display-text')?.textContent?.trim()).toBe(
		'Option 2'
	);
	expect(selected.container.querySelector('.select__placeholder')).toBeNull();
});

test('options を配列順に描画し、separator を区切りとして挟む', () => {
	const screen = render(Select, { value: undefined, options });

	expect(getOptionLabels(screen)).toEqual(['Option 1', 'Option 2', 'Option 3']);

	const separator = screen.container.querySelector('.select__separator');
	expect(separator).toHaveAttribute('role', 'separator');
	// separator は Option 2 と Option 3 の間に入る
	const items = Array.from(
		screen.container.querySelectorAll('.select__option, .select__separator')
	);
	expect(items[2]).toBe(separator);
});

test('value に一致する選択肢だけが aria-selected になる', () => {
	const screen = render(Select, { value: 'option2', options });

	expect(getOptionEls(screen).map((el) => el.getAttribute('aria-selected'))).toEqual([
		'false',
		'true',
		'false'
	]);
});

test('選択中の選択肢だけにチェックアイコンを表示する', async () => {
	const screen = render(Select, { value: 'option2', options });

	const checks = getOptionEls(screen).map((el) =>
		el.querySelector('.select__option-check [data-testid="icon"]')?.textContent?.trim()
	);
	expect(checks).toEqual([undefined, 'check', undefined]);

	// 選択を変えるとチェックも移動する
	await openPopup(screen);
	getOptionEls(screen)[0].click();
	await vi.waitFor(() => {
		const moved = getOptionEls(screen).map((el) =>
			el.querySelector('.select__option-check [data-testid="icon"]')?.textContent?.trim()
		);
		expect(moved).toEqual(['check', undefined, undefined]);
	});
});

test('トリガーのクリックでポップアップが開き aria-expanded が true になる', async () => {
	const screen = render(Select, { value: undefined, options });

	await openPopup(screen);

	expect(getTrigger(screen)).toHaveAttribute('aria-expanded', 'true');
	const listbox = screen.container.querySelector('.select__options') as HTMLElement;
	expect(listbox).toHaveAttribute('role', 'listbox');
	await expect.element(listbox).toBeVisible();
});

test('選択肢のクリックで値が変わり onchange が呼ばれ、ポップアップが閉じる', async () => {
	let changed: unknown;
	const screen = render(Select, {
		value: undefined,
		options,
		onchange: (value: unknown) => {
			changed = value;
		}
	});

	await openPopup(screen);
	getOptionEls(screen)[1].click();

	expect(changed).toBe('option2');
	await vi.waitFor(() => {
		expect(screen.container.querySelector('.select__display-text')?.textContent?.trim()).toBe(
			'Option 2'
		);
	});
	await vi.waitFor(() => {
		expect(getPopup(screen).matches(':popover-open')).toBe(false);
	});
});

test('disabled な選択肢はクリックしても選択されない', async () => {
	let changed: unknown;
	const screen = render(Select, {
		value: undefined,
		options,
		onchange: (value: unknown) => {
			changed = value;
		}
	});

	await openPopup(screen);
	getOptionEls(screen)[2].click();

	expect(changed).toBeUndefined();
	expect(screen.container.querySelector('.select__display-text')).toBeNull();
});

test('ArrowDown と Enter のキーボード操作で選択できる', async () => {
	let changed: unknown;
	const screen = render(Select, {
		value: undefined,
		options,
		onchange: (value: unknown) => {
			changed = value;
		}
	});

	await openPopup(screen);
	const listbox = screen.container.querySelector('.select__options') as HTMLElement;

	// 開いた直後は先頭がハイライトされるため、ArrowDown で 2 番目へ移動する
	await vi.waitFor(() => {
		expect(listbox.getAttribute('aria-activedescendant')).toBeTruthy();
	});
	listbox.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
	listbox.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

	expect(changed).toBe('option2');
});

test('入力した文字で始まる選択肢へ移動する（type-ahead）', async () => {
	const screen = render(Select, {
		value: undefined,
		options: [
			{ value: 'apple', label: 'Apple' },
			{ value: 'banana', label: 'Banana' },
			'separator',
			{ value: 'cherry', label: 'Cherry' }
		]
	});

	await openPopup(screen);
	const listbox = screen.container.querySelector('.select__options') as HTMLElement;
	listbox.dispatchEvent(new KeyboardEvent('keydown', { key: 'c', bubbles: true }));

	await vi.waitFor(() => {
		const activeId = listbox.getAttribute('aria-activedescendant');
		expect(
			screen.container.querySelector(`#${activeId} .select__option-label`)?.textContent?.trim()
		).toBe('Cherry');
	});
});

test('リストの最小幅はトリガー幅とテーマの下限の大きい方になる', async () => {
	const screen = render(Select, { value: undefined, options, placeholder: 'Choose an option' });
	await openPopup(screen);

	const listbox = screen.container.querySelector('.select__options') as HTMLElement;
	const expected = Math.max(getTrigger(screen).offsetWidth, getThemeMinWidth());
	expect(parseFloat(getComputedStyle(listbox).minWidth)).toBeCloseTo(expected, 0);
});

test('disabled な Select はトリガーが無効でポップアップも開かない', async () => {
	const screen = render(Select, { value: undefined, options, disabled: true });

	const trigger = getTrigger(screen);
	expect(trigger).toHaveAttribute('disabled');
	expect(screen.container.querySelector('[data-testid="select"]')).toHaveClass('select--disabled');

	trigger.click();
	await new Promise((resolve) => setTimeout(resolve, 50));
	expect(getPopup(screen).matches(':popover-open')).toBe(false);
});

test('name を指定すると hidden input でフォーム送信できる', async () => {
	const screen = render(Select, { value: 'option2', options, name: 'test-select' });

	const hidden = screen.container.querySelector('input[type="hidden"]') as HTMLInputElement;
	expect(hidden).toHaveAttribute('name', 'test-select');
	expect(hidden.value).toBe('option2');

	await openPopup(screen);
	getOptionEls(screen)[0].click();
	await vi.waitFor(() => {
		expect(hidden.value).toBe('option1');
	});
});

test('required / tabindex / ariaLabel がトリガーに反映される', () => {
	const screen = render(Select, {
		value: undefined,
		options,
		required: true,
		tabindex: 2,
		ariaLabel: 'Pick one'
	});

	const trigger = getTrigger(screen);
	expect(trigger).toHaveAttribute('aria-required', 'true');
	expect(trigger).toHaveAttribute('tabindex', '2');
	expect(trigger).toHaveAttribute('aria-label', 'Pick one');
});

test('customStyle で padding を指定してもアイコンの領域が消えない', () => {
	const screen = render(Select, { value: 'option2', options, customStyle: 'padding: 8px 12px' });

	const trigger = getTrigger(screen).getBoundingClientRect();
	const icon = (
		screen.container.querySelector('.select__dropdown-icon') as HTMLElement
	).getBoundingClientRect();
	const label = (
		screen.container.querySelector('.select__display-text') as HTMLElement
	).getBoundingClientRect();

	expect(icon.width).toBeGreaterThan(0);
	// アイコンはトリガーからはみ出さず、ラベルと重ならない
	expect(icon.right).toBeLessThanOrEqual(trigger.right + 0.5);
	expect(label.right).toBeLessThanOrEqual(icon.left + 0.5);
});

test('レイアウト系のクラスが適用される', () => {
	const screen = render(Select, {
		value: undefined,
		options,
		inline: true,
		fullWidth: true,
		rounded: true
	});

	const container = screen.container.querySelector('[data-testid="select"]');
	expect(container).toHaveClass('select--inline');
	expect(container).toHaveClass('select--full-width');
	expect(container).toHaveClass('select--rounded');
});

test('フォーカス / ブラーイベントが発火する', () => {
	let focusCalled = false;
	let blurCalled = false;
	const screen = render(Select, {
		value: undefined,
		options,
		onfocus: () => {
			focusCalled = true;
		},
		onblur: () => {
			blurCalled = true;
		}
	});

	const trigger = getTrigger(screen);
	trigger.focus();
	expect(focusCalled).toBe(true);

	trigger.blur();
	expect(blurCalled).toBe(true);
});

test('Select が参照する CSS 変数はすべて定義されている', async () => {
	const screen = render(Select, { value: 'option1', options });
	await openPopup(screen);

	const wrapper = screen.container.querySelector('[data-testid="select"]') as HTMLElement;
	const usedVars = new Set<string>(collectCssVarNames(wrapper));

	const root = document.documentElement;
	for (const varName of usedVars) {
		const value = getComputedStyle(root).getPropertyValue(varName).trim();
		const fallbackValue = getComputedStyle(wrapper).getPropertyValue(varName).trim();
		const finalValue = value || fallbackValue;

		expect(finalValue, varName).not.toBe('');
		expect(finalValue, varName).not.toBe('initial');
		expect(finalValue, varName).not.toBe('unset');
		expect(finalValue, varName).not.toBe('inherit');
	}
});
