/**
 * padding を指定しても、アイコンやクリアボタンがテキストと同じ高さに揃うことを検証する
 * （コンポーネント横断の不変条件）。
 * 装飾は絶対配置だが、基準は箱の padding box なので、テキストと同じ content box に
 * そろえないと padding が上下非対称なときにズレる。
 */
import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Input from '../lib/components/Input.svelte';
import Combobox from '../lib/components/Combobox.svelte';
import Select from '../lib/components/Select.svelte';
import MultiSelect from '../lib/components/MultiSelect.svelte';
import variables from '../lib/assets/styles/variables.scss?inline';
import core from '../lib/assets/styles/core.scss?inline';

const themeStyle = document.createElement('style');
themeStyle.textContent = `${variables}\n${core}`;
document.head.appendChild(themeStyle);

/** 上下非対称にして、箱の中央と content box の中央をずらす */
const ASYMMETRIC_PADDING = 'padding: 24px 12px 8px';

const centerY = (el: Element | null) => {
	const rect = (el as HTMLElement).getBoundingClientRect();
	return rect.top + rect.height / 2;
};

/** 装飾ラッパーではなく、中に描かれるアイコン本体の位置を見る */
const decorationCenterY = (container: Element, selector: string) => {
	const wrapper = container.querySelector(selector) as HTMLElement;
	return centerY(wrapper.firstElementChild ?? wrapper);
};

const expectAligned = (container: Element, textSelector: string, decorationSelector: string) => {
	expect(decorationCenterY(container, decorationSelector)).toBe(
		centerY(container.querySelector(textSelector))
	);
};

test('Input: rightIcon が padding 指定時もテキストに揃う', () => {
	expectAligned(
		render(Input, { value: 'x', rightIcon: 'search', customStyle: ASYMMETRIC_PADDING }).container,
		'.input__display-text',
		'.input__icon-right'
	);
});

test('Input: leftIcon が padding 指定時もテキストに揃う', () => {
	expectAligned(
		render(Input, { value: 'x', leftIcon: 'search', customStyle: ASYMMETRIC_PADDING }).container,
		'.input__display-text',
		'.input__icon-left'
	);
});

test('Input: クリアボタンが padding 指定時もテキストに揃う', () => {
	expectAligned(
		render(Input, { value: 'x', clearable: true, customStyle: ASYMMETRIC_PADDING }).container,
		'.input__display-text',
		'.input__clear-button'
	);
});

test('Combobox: ドロップダウンアイコンが padding 指定時もテキストに揃う', () => {
	expectAligned(
		render(Combobox, { value: 'x', options: ['a'], customStyle: ASYMMETRIC_PADDING }).container,
		'.input__display-text',
		'.input__icon-right'
	);
});

test('Select: ドロップダウンアイコンが padding 指定時もテキストに揃う', () => {
	expectAligned(
		render(Select, {
			value: 'a',
			options: [{ value: 'a', label: 'A' }],
			customStyle: ASYMMETRIC_PADDING
		}).container,
		'.select__display-text',
		'.select__dropdown-icon'
	);
});

test('Select: inline でも padding 指定時にテキストに揃う', () => {
	expectAligned(
		render(Select, {
			value: 'a',
			options: [{ value: 'a', label: 'A' }],
			inline: true,
			customStyle: ASYMMETRIC_PADDING
		}).container,
		'.select__display-text',
		'.select__dropdown-icon'
	);
});

test('MultiSelect: ドロップダウンアイコンが padding 指定時もテキストに揃う', () => {
	expectAligned(
		render(MultiSelect, {
			value: ['a'],
			options: [{ value: 'a', label: 'A' }],
			customStyle: ASYMMETRIC_PADDING
		}).container,
		'.multi-select__display-text',
		'.multi-select__dropdown-icon'
	);
});

test('MultiSelect: inline でも padding 指定時にテキストに揃う', () => {
	expectAligned(
		render(MultiSelect, {
			value: ['a'],
			options: [{ value: 'a', label: 'A' }],
			inline: true,
			customStyle: ASYMMETRIC_PADDING
		}).container,
		'.multi-select__display-text',
		'.multi-select__dropdown-icon'
	);
});
