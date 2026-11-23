/**
 * customStyle に padding を指定しても、アイコン / クリアボタン / スウォッチ用に
 * 確保した余白が消えないことを検証する（コンポーネント横断の不変条件）。
 * Textarea はルートの padding を保ち、追加のボタン領域を内側で確保する。
 */
import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Input from '#lib/sharedComponents/Input.svelte';
import Textarea from '#lib/sharedComponents/Textarea.svelte';
import Combobox from '#lib/sharedComponents/Combobox.svelte';
import ColorPicker from '#lib/sharedComponents/ColorPicker.svelte';
import Select from '#lib/sharedComponents/Select.svelte';
import MultiSelect from '#lib/sharedComponents/MultiSelect.svelte';
import variables from '#lib/assets/styles/variables.scss?inline';
import core from '#lib/assets/styles/core.scss?inline';
import { textBox } from '#tests/helpers/textBox';

const themeStyle = document.createElement('style');
themeStyle.textContent = `${variables}\n${core}`;
document.head.appendChild(themeStyle);

const CUSTOM_STYLE = 'padding: 8px 12px';

const sidePadding = async (container: Element, fieldSelector: string, side: 'Left' | 'Right') => {
	const field = container.querySelector<HTMLElement>(fieldSelector) as HTMLElement;
	return parseFloat(getComputedStyle(field)[`padding${side}`]);
};

/** 装飾側の余白が customStyle の指定で変わらず、素の余白より広いままであることを確認する */
const expectIconSpaceKept = async (
	withoutCustom: Element,
	withCustom: Element,
	plain: Element,
	fieldSelector: string,
	side: 'Left' | 'Right'
) => {
	const expected = await sidePadding(withoutCustom, fieldSelector, side);
	const plainPadding = await sidePadding(plain, fieldSelector, side);

	expect(expected).toBeGreaterThan(plainPadding);
	expect(await sidePadding(withCustom, fieldSelector, side)).toBe(expected);
};

test('Input: rightIcon の余白が customStyle で消えない', async () => {
	expectIconSpaceKept(
		(await render(Input, { value: 'x', rightIcon: 'search' })).container,
		(await render(Input, { value: 'x', rightIcon: 'search', customStyle: CUSTOM_STYLE })).container,
		(await render(Input, { value: 'x' })).container,
		'.input',
		'Right'
	);
});

test('Input: leftIcon の余白が customStyle で消えない', async () => {
	expectIconSpaceKept(
		(await render(Input, { value: 'x', leftIcon: 'search' })).container,
		(await render(Input, { value: 'x', leftIcon: 'search', customStyle: CUSTOM_STYLE })).container,
		(await render(Input, { value: 'x' })).container,
		'.input',
		'Left'
	);
});

test('Input: clearable の余白が customStyle で消えない', async () => {
	expectIconSpaceKept(
		(await render(Input, { value: 'x', clearable: true })).container,
		(await render(Input, { value: 'x', clearable: true, customStyle: CUSTOM_STYLE })).container,
		(await render(Input, { value: 'x' })).container,
		'.input',
		'Right'
	);
});

test('Input: rightIcon と clearable 併用時の余白が customStyle で消えない', async () => {
	expectIconSpaceKept(
		(await render(Input, { value: 'x', rightIcon: 'search', clearable: true })).container,
		(
			await render(Input, {
				value: 'x',
				rightIcon: 'search',
				clearable: true,
				customStyle: CUSTOM_STYLE
			})
		).container,
		(await render(Input, { value: 'x' })).container,
		'.input',
		'Right'
	);
});

test('Input: inline でも rightIcon の余白が customStyle で消えない', async () => {
	expectIconSpaceKept(
		(await render(Input, { value: 'x', rightIcon: 'search', inline: true })).container,
		(
			await render(Input, {
				value: 'x',
				rightIcon: 'search',
				inline: true,
				customStyle: CUSTOM_STYLE
			})
		).container,
		(await render(Input, { value: 'x', inline: true })).container,
		'.input',
		'Right'
	);
});

test('Textarea: clearable の余白が customStyle で消えない', async () => {
	const plain = (await render(Textarea, { value: 'x' })).container;
	const base = (await render(Textarea, { value: 'x', clearable: true })).container;
	const custom = (
		await render(Textarea, {
			value: 'x',
			clearable: true,
			customStyle: CUSTOM_STYLE
		})
	).container;
	const textRightSpace = (container: Element) => {
		const root = container.querySelector<HTMLElement>('.textarea') as HTMLElement;
		const display = container.querySelector<HTMLElement>('.textarea__display-text') as HTMLElement;
		return root.getBoundingClientRect().right - textBox(display).right;
	};

	expect(textRightSpace(base)).toBeGreaterThan(textRightSpace(plain));
	expect(textRightSpace(custom)).toBeGreaterThan(textRightSpace(base));
	expect(await sidePadding(custom, '.textarea', 'Right')).toBe(12);
});

test('Combobox: ドロップダウンアイコンの余白が customStyle で消えない', async () => {
	expectIconSpaceKept(
		(await render(Combobox, { value: '', options: ['a'] })).container,
		(await render(Combobox, { value: '', options: ['a'], customStyle: CUSTOM_STYLE })).container,
		(await render(Input, { value: 'x' })).container,
		'.input',
		'Right'
	);
});

test('ColorPicker: スウォッチの余白が customStyle で消えない', async () => {
	expectIconSpaceKept(
		(await render(ColorPicker, { value: '#ff0000' })).container,
		(await render(ColorPicker, { value: '#ff0000', customStyle: CUSTOM_STYLE })).container,
		(await render(Input, { value: 'x' })).container,
		'.input',
		'Left'
	);
});

test('Select: ドロップダウンアイコンの余白が customStyle で消えない', async () => {
	const withoutCustom = await render(Select, { value: 'a', options: [{ value: 'a', label: 'A' }] });
	const withCustom = await render(Select, {
		value: 'a',
		options: [{ value: 'a', label: 'A' }],
		customStyle: CUSTOM_STYLE
	});

	const expected = await sidePadding(withoutCustom.container, '.select__trigger', 'Right');
	expect(expected).toBeGreaterThan(0);
	expect(await sidePadding(withCustom.container, '.select__trigger', 'Right')).toBe(expected);
});

test('MultiSelect: ドロップダウンアイコンの余白が customStyle で消えない', async () => {
	const options = [{ value: 'a', label: 'A' }];
	const withoutCustom = await render(MultiSelect, { value: ['a'], options });
	const withCustom = await render(MultiSelect, {
		value: ['a'],
		options,
		customStyle: CUSTOM_STYLE
	});

	const expected = await sidePadding(withoutCustom.container, '.multi-select__trigger', 'Right');
	expect(expected).toBeGreaterThan(0);
	expect(await sidePadding(withCustom.container, '.multi-select__trigger', 'Right')).toBe(expected);
});
