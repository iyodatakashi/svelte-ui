/**
 * 背景・ボーダー・フォーカスリングは、フィールドの「箱」に属するという不変条件を検証する。
 * customStyle は箱に適用されるため、background-color を指定してもボーダーは覆われない。
 */
import { test, expect } from 'vitest';
import { tick } from 'svelte';
import { render } from 'vitest-browser-svelte';
import Input from '../lib/components/Input.svelte';
import Textarea from '../lib/components/Textarea.svelte';
import Select from '../lib/components/Select.svelte';
import MultiSelect from '../lib/components/MultiSelect.svelte';
import variables from '../lib/assets/styles/variables.scss?inline';
import core from '../lib/assets/styles/core.scss?inline';

const themeStyle = document.createElement('style');
themeStyle.textContent = `${variables}\n${core}`;
document.head.appendChild(themeStyle);

const BG = 'rgb(255, 0, 0)';

/** 箱に背景色が乗り、かつボーダー（inset box-shadow）が残ることを確認する */
const expectBoxPainted = (container: Element, boxSelector: string) => {
	const box = container.querySelector(boxSelector) as HTMLElement;
	const style = getComputedStyle(box);

	expect(style.backgroundColor).toBe(BG);
	expect(style.boxShadow).not.toBe('none');
};

test('Input: customStyle の背景色が箱に効き、ボーダーが残る', () => {
	expectBoxPainted(
		render(Input, { value: 'x', customStyle: `background-color: ${BG}` }).container,
		'.input'
	);
});

test('Textarea: customStyle の背景色が箱に効き、ボーダーが残る', () => {
	expectBoxPainted(
		render(Textarea, { value: 'x', customStyle: `background-color: ${BG}` }).container,
		'.textarea'
	);
});

test('Select: customStyle の背景色が箱に効き、ボーダーが残る', () => {
	expectBoxPainted(
		render(Select, {
			value: 'a',
			options: [{ value: 'a', label: 'A' }],
			customStyle: `background-color: ${BG}`
		}).container,
		'.select__trigger'
	);
});

test('MultiSelect: customStyle の背景色が箱に効き、ボーダーが残る', () => {
	expectBoxPainted(
		render(MultiSelect, {
			value: ['a'],
			options: [{ value: 'a', label: 'A' }],
			customStyle: `background-color: ${BG}`
		}).container,
		'.multi-select__trigger'
	);
});

test('Input: 入力要素自体は透明のままで、箱のボーダーを覆わない', () => {
	const { container } = render(Input, { value: 'x', customStyle: `background-color: ${BG}` });
	const field = container.querySelector('input') as HTMLElement;

	expect(getComputedStyle(field).backgroundColor).toBe('rgba(0, 0, 0, 0)');
});

test('Textarea: 入力要素自体は透明のままで、箱のボーダーを覆わない', () => {
	const { container } = render(Textarea, { value: 'x', customStyle: `background-color: ${BG}` });
	const field = container.querySelector('textarea') as HTMLElement;

	expect(getComputedStyle(field).backgroundColor).toBe('rgba(0, 0, 0, 0)');
});

test('Input: フォーカスリングは入力要素ではなく箱に描かれる', async () => {
	const { container } = render(Input, { value: 'x' });
	const field = container.querySelector('input') as HTMLInputElement;
	field.focus();
	await tick();

	expect(getComputedStyle(field).outlineStyle).toBe('none');

	const box = container.querySelector('.input__wrapper') as HTMLElement;
	const boxStyle = getComputedStyle(box);
	expect(boxStyle.outlineStyle).toBe('solid');
	expect(parseFloat(boxStyle.outlineWidth)).toBeGreaterThan(0);
});

test('Textarea: フォーカスリングは箱全体を囲む', async () => {
	const { container } = render(Textarea, { value: 'x' });
	const root = container.querySelector('.textarea') as HTMLElement;
	const field = container.querySelector('textarea') as HTMLTextAreaElement;
	field.focus();
	await tick();

	// textarea は箱の padding box を覆う層なので、textarea に描いた枠が箱全体を囲む
	const fieldStyle = getComputedStyle(field);
	expect(fieldStyle.outlineStyle).toBe('solid');
	expect(parseFloat(fieldStyle.outlineWidth)).toBeGreaterThan(0);
	expect(field.getBoundingClientRect().toJSON()).toEqual(root.getBoundingClientRect().toJSON());
});

test('Input: focusStyle="none" ではフォーカスリングを描かない', async () => {
	const { container } = render(Input, { value: 'x', focusStyle: 'none' });
	(container.querySelector('input') as HTMLInputElement).focus();
	await tick();

	const box = container.querySelector('.input__wrapper') as HTMLElement;
	expect(getComputedStyle(box).outlineStyle).toBe('none');
});

test('Input: customStyle の width が箱に効く', () => {
	const { container } = render(Input, { value: 'x', customStyle: 'width: 333px' });

	expect(getComputedStyle(container.querySelector('.input') as HTMLElement).width).toBe('333px');
});

test('Input: width プロップは customStyle より優先される', () => {
	const { container } = render(Input, { value: 'x', width: 300, customStyle: 'width: 333px' });

	expect(getComputedStyle(container.querySelector('.input') as HTMLElement).width).toBe('300px');
});

test('Textarea: customStyle の width が箱に効く', () => {
	const { container } = render(Textarea, { value: 'x', customStyle: 'width: 333px' });

	expect(getComputedStyle(container.querySelector('.textarea') as HTMLElement).width).toBe('333px');
});
