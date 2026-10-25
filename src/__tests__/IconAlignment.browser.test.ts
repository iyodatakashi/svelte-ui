/**
 * padding を指定しても、アイコンやクリアボタンがテキストと同じ高さに揃うことを検証する
 * （コンポーネント横断の不変条件）。
 * 装飾は絶対配置だが、基準は箱の padding box なので、テキストと同じ content box に
 * そろえないと padding が上下非対称なときにズレる。
 */
import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Textarea from '../lib/components/Textarea.svelte';
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

for (const inline of [false, true]) {
	test(`Textarea: explicitly specifying the same padding does not move the button (inline=${inline})`, () => {
		const baseline = render(Textarea, { value: 'first\nsecond', clearable: true, inline });
		const explicit = render(Textarea, {
			value: 'first\nsecond',
			clearable: true,
			inline,
			customStyle: inline
				? 'padding: 0 4px'
				: 'padding: var(--svelte-ui-textarea-padding); padding-right: 4px'
		});
		const geometry = (container: HTMLElement) => {
			const root = container.querySelector('.textarea') as HTMLElement;
			const button = container.querySelector('.textarea__clear-button button') as HTMLElement;
			const rootRect = root.getBoundingClientRect();
			const buttonRect = button.getBoundingClientRect();
			return {
				top: buttonRect.top - rootRect.top,
				right: rootRect.right - buttonRect.right,
				paddingTop: getComputedStyle(root).paddingTop,
				paddingRight: getComputedStyle(root).paddingRight
			};
		};
		const before = geometry(baseline.container);
		const after = geometry(explicit.container);
		expect(after.paddingTop).toBe(before.paddingTop);
		expect(after.paddingRight).toBe(before.paddingRight);
		expect(after.top).toBeCloseTo(before.top, 1);
		expect(after.right).toBeCloseTo(before.right, 1);
	});
}

for (const inline of [false, true]) {
	for (const customStyle of ['', 'width: 260px', 'padding-left: 28px']) {
		test(`Textarea: default clear button position is preserved (inline=${inline}, style=${customStyle})`, () => {
			const { container } = render(Textarea, {
				value: 'first\nsecond',
				clearable: true,
				inline,
				customStyle
			});
			const root = container.querySelector('.textarea') as HTMLElement;
			const button = container.querySelector('.textarea__clear-button button') as HTMLElement;
			const rootRect = root.getBoundingClientRect();
			const buttonRect = button.getBoundingClientRect();

			expect(buttonRect.top - rootRect.top).toBeCloseTo(inline ? -2 : 2, 1);
			expect(rootRect.right - buttonRect.right).toBeCloseTo(4, 1);
			expect(getComputedStyle(root).paddingRight).toBe('4px');
		});
	}
}

for (const inline of [false, true]) {
	for (const [customStyle, expectedTop, expectedRight] of [
		['padding-top: 24px; line-height: 28px', 24, 4],
		['padding-right: 48px', inline ? -2 : 2, 48]
	] as const) {
		test(`Textarea: only changed padding axis moves button (inline=${inline}, ${customStyle})`, () => {
			const { container } = render(Textarea, {
				value: 'first\nsecond',
				clearable: true,
				inline,
				customStyle
			});
			const root = container.querySelector('.textarea') as HTMLElement;
			const button = container.querySelector('.textarea__clear-button button') as HTMLElement;
			const rootRect = root.getBoundingClientRect();
			const buttonRect = button.getBoundingClientRect();

			if (customStyle.startsWith('padding-top')) {
				const firstLine = container.querySelector('.textarea__display-text') as HTMLElement;
				expect(centerY(button)).toBeCloseTo(
					firstLine.getBoundingClientRect().top +
						0.5 * parseFloat(getComputedStyle(firstLine).lineHeight),
					0
				);
			} else {
				expect(buttonRect.top - rootRect.top).toBeCloseTo(expectedTop, 1);
			}
			expect(rootRect.right - buttonRect.right).toBeCloseTo(expectedRight, 1);
		});
	}
}

for (const inline of [false, true]) {
	for (const padding of ['4px 12px', '24px 12px 8px']) {
		test(`Textarea: clear button follows first line (inline=${inline}, padding=${padding})`, () => {
			const { container } = render(Textarea, {
				value: 'first\nsecond\nthird',
				clearable: true,
				inline,
				customStyle: `padding: ${padding}; line-height: 28px`
			});
			const text = container.querySelector('.textarea__display-text') as HTMLElement;
			const button = container.querySelector('.textarea__clear-button button') as HTMLElement;
			const firstLineCenter = text.getBoundingClientRect().top + 14;
			expect(centerY(button)).toBeCloseTo(firstLineCenter, 0);
		});
	}
}

for (const inline of [false, true]) {
	for (const [customStyle, rightPadding] of [
		['padding: 24px 12px 8px 40px', 12],
		['padding: 24px 40px 8px 12px', 40],
		['padding: 24px 12px 8px; padding-right: 48px', 48],
		['padding: 24px 0 8px 12px', 0]
	] as const) {
		test(`Textarea: right padding remains effective (inline=${inline}, ${customStyle})`, () => {
			const { container } = render(Textarea, {
				value: 'first\nsecond',
				clearable: true,
				linkify: true,
				inline,
				customStyle
			});
			const root = container.querySelector('.textarea') as HTMLElement;
			const button = container.querySelector('.textarea__clear-button button') as HTMLElement;
			const display = container.querySelector('.textarea__display-text') as HTMLElement;
			const links = container.querySelector('.textarea__link-text') as HTMLElement;
			const input = container.querySelector('textarea') as HTMLTextAreaElement;
			const buttonRight = button.getBoundingClientRect().right;
			const contentRight = display.getBoundingClientRect().right;

			expect(getComputedStyle(root).paddingRight).toBe(`${rightPadding}px`);
			expect(root.getBoundingClientRect().right - buttonRight).toBeCloseTo(rightPadding, 1);
			expect(contentRight - parseFloat(getComputedStyle(display).paddingRight)).toBeLessThanOrEqual(
				button.getBoundingClientRect().left
			);
			expect(getComputedStyle(input).paddingRight).toBe(getComputedStyle(display).paddingRight);
			expect(links.getBoundingClientRect().right - rightPadding).toBeCloseTo(
				contentRight - parseFloat(getComputedStyle(display).paddingRight),
				1
			);
		});
	}
}
