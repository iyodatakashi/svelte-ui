/**
 * customStyle に padding を指定しても、アイコン / クリアボタン / スウォッチ用に
 * 確保した余白が消えないことを検証する（コンポーネント横断の不変条件）。
 * Textarea はルートの padding を保ち、追加のボタン領域を内側で確保する。
 */
import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Input from '../lib/components/Input.svelte';
import Textarea from '../lib/components/Textarea.svelte';
import Combobox from '../lib/components/Combobox.svelte';
import ColorPicker from '../lib/components/ColorPicker.svelte';
import Select from '../lib/components/Select.svelte';
import MultiSelect from '../lib/components/MultiSelect.svelte';
import variables from '../lib/assets/styles/variables.scss?inline';
import core from '../lib/assets/styles/core.scss?inline';

const themeStyle = document.createElement('style');
themeStyle.textContent = `${variables}\n${core}`;
document.head.appendChild(themeStyle);

const CUSTOM_STYLE = 'padding: 8px 12px';

const sidePadding = (container: Element, fieldSelector: string, side: 'Left' | 'Right') => {
	const field = container.querySelector(fieldSelector) as HTMLElement;
	return parseFloat(getComputedStyle(field)[`padding${side}`]);
};

/** 装飾側の余白が customStyle の指定で変わらず、素の余白より広いままであることを確認する */
const expectIconSpaceKept = (
	withoutCustom: Element,
	withCustom: Element,
	plain: Element,
	fieldSelector: string,
	side: 'Left' | 'Right'
) => {
	const expected = sidePadding(withoutCustom, fieldSelector, side);
	const plainPadding = sidePadding(plain, fieldSelector, side);

	expect(expected).toBeGreaterThan(plainPadding);
	expect(sidePadding(withCustom, fieldSelector, side)).toBe(expected);
};

test('Input: rightIcon の余白が customStyle で消えない', () => {
	expectIconSpaceKept(
		render(Input, { value: 'x', rightIcon: 'search' }).container,
		render(Input, { value: 'x', rightIcon: 'search', customStyle: CUSTOM_STYLE }).container,
		render(Input, { value: 'x' }).container,
		'.input',
		'Right'
	);
});

test('Input: leftIcon の余白が customStyle で消えない', () => {
	expectIconSpaceKept(
		render(Input, { value: 'x', leftIcon: 'search' }).container,
		render(Input, { value: 'x', leftIcon: 'search', customStyle: CUSTOM_STYLE }).container,
		render(Input, { value: 'x' }).container,
		'.input',
		'Left'
	);
});

test('Input: clearable の余白が customStyle で消えない', () => {
	expectIconSpaceKept(
		render(Input, { value: 'x', clearable: true }).container,
		render(Input, { value: 'x', clearable: true, customStyle: CUSTOM_STYLE }).container,
		render(Input, { value: 'x' }).container,
		'.input',
		'Right'
	);
});

test('Input: rightIcon と clearable 併用時の余白が customStyle で消えない', () => {
	expectIconSpaceKept(
		render(Input, { value: 'x', rightIcon: 'search', clearable: true }).container,
		render(Input, {
			value: 'x',
			rightIcon: 'search',
			clearable: true,
			customStyle: CUSTOM_STYLE
		}).container,
		render(Input, { value: 'x' }).container,
		'.input',
		'Right'
	);
});

test('Input: inline でも rightIcon の余白が customStyle で消えない', () => {
	expectIconSpaceKept(
		render(Input, { value: 'x', rightIcon: 'search', inline: true }).container,
		render(Input, {
			value: 'x',
			rightIcon: 'search',
			inline: true,
			customStyle: CUSTOM_STYLE
		}).container,
		render(Input, { value: 'x', inline: true }).container,
		'.input',
		'Right'
	);
});

test('Textarea: clearable の余白が customStyle で消えない', () => {
	const plain = render(Textarea, { value: 'x' }).container;
	const base = render(Textarea, { value: 'x', clearable: true }).container;
	const custom = render(Textarea, {
		value: 'x',
		clearable: true,
		customStyle: CUSTOM_STYLE
	}).container;
	const textRightSpace = (container: Element) => {
		const root = container.querySelector('.textarea') as HTMLElement;
		const display = container.querySelector('.textarea__display-text') as HTMLElement;
		return (
			root.getBoundingClientRect().right -
			display.getBoundingClientRect().right +
			parseFloat(getComputedStyle(display).paddingRight)
		);
	};

	expect(textRightSpace(base)).toBeGreaterThan(textRightSpace(plain));
	expect(textRightSpace(custom)).toBeGreaterThan(textRightSpace(base));
	expect(sidePadding(custom, '.textarea', 'Right')).toBe(12);
});

test('Combobox: ドロップダウンアイコンの余白が customStyle で消えない', () => {
	expectIconSpaceKept(
		render(Combobox, { value: '', options: ['a'] }).container,
		render(Combobox, { value: '', options: ['a'], customStyle: CUSTOM_STYLE }).container,
		render(Input, { value: 'x' }).container,
		'.input',
		'Right'
	);
});

test('ColorPicker: スウォッチの余白が customStyle で消えない', () => {
	expectIconSpaceKept(
		render(ColorPicker, { value: '#ff0000' }).container,
		render(ColorPicker, { value: '#ff0000', customStyle: CUSTOM_STYLE }).container,
		render(Input, { value: 'x' }).container,
		'.input',
		'Left'
	);
});

test('Select: ドロップダウンアイコンの余白が customStyle で消えない', () => {
	const withoutCustom = render(Select, { value: 'a', options: [{ value: 'a', label: 'A' }] });
	const withCustom = render(Select, {
		value: 'a',
		options: [{ value: 'a', label: 'A' }],
		customStyle: CUSTOM_STYLE
	});

	const expected = sidePadding(withoutCustom.container, '.select__trigger', 'Right');
	expect(expected).toBeGreaterThan(0);
	expect(sidePadding(withCustom.container, '.select__trigger', 'Right')).toBe(expected);
});

test('MultiSelect: ドロップダウンアイコンの余白が customStyle で消えない', () => {
	const options = [{ value: 'a', label: 'A' }];
	const withoutCustom = render(MultiSelect, { value: ['a'], options });
	const withCustom = render(MultiSelect, { value: ['a'], options, customStyle: CUSTOM_STYLE });

	const expected = sidePadding(withoutCustom.container, '.multi-select__trigger', 'Right');
	expect(expected).toBeGreaterThan(0);
	expect(sidePadding(withCustom.container, '.multi-select__trigger', 'Right')).toBe(expected);
});
