/**
 * 中身があふれて textarea がスクロールするとき、スクロールバーが箱（ルート）の余白の内側ではなく箱の端に出ることを検証する。
 * textarea は箱の padding box を覆い、余白を自分で持つ。そのうえで、文字が並ぶ領域は
 * display-text・link-text と一致している必要がある（位置・幅がずれると、表示を切り替えたときに文字が動く）。
 */
import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Textarea from '#lib/sharedComponents/Textarea.svelte';
import variables from '#lib/assets/styles/variables.scss?inline';
import { textBox } from '#tests/helpers/textBox';

const style = document.createElement('style');
style.textContent = variables;
document.head.appendChild(style);

const value = Array.from({ length: 20 }, (_, i) => `line ${i + 1} https://example.com`).join('\n');

/** 描画の丸め（1/64px）で小数がわずかに違うことがあるため、0.1px 未満の差は同じとみなす */
const expectSameTextBox = (a: HTMLElement, b: HTMLElement) => {
	const boxA = textBox(a);
	const boxB = textBox(b);
	expect(boxA.left).toBeCloseTo(boxB.left, 1);
	expect(boxA.top).toBeCloseTo(boxB.top, 1);
	expect(boxA.width).toBeCloseTo(boxB.width, 1);
};

const contentHeight = (el: HTMLElement) => {
	const s = getComputedStyle(el);
	return el.scrollHeight - parseFloat(s.paddingTop) - parseFloat(s.paddingBottom);
};

test.each([
	['autoResize + maxHeight', { maxHeight: 120 }],
	['autoResize + maxHeight + clearable', { maxHeight: 120, clearable: true }],
	['autoResize=false', { autoResize: false, rows: 3 }],
	['autoResize=false + clearable', { autoResize: false, rows: 3, clearable: true }]
])('%s: textarea が箱を覆い、文字の領域が他の層と一致する', async (_label, props) => {
	const screen = await render(Textarea, { value, width: 240, linkify: true, ...props });
	await new Promise((resolve) => setTimeout(resolve, 100));

	const root = screen.container.querySelector<HTMLElement>(
		'[data-testid="textarea"]'
	) as HTMLElement;
	const textarea = screen.container.querySelector<HTMLElement>('textarea') as HTMLTextAreaElement;
	const displayText = screen.container.querySelector<HTMLElement>(
		'.textarea__display-text'
	) as HTMLElement;
	const linkText = screen.container.querySelector<HTMLElement>(
		'.textarea__link-text'
	) as HTMLElement;

	expect(textarea.scrollHeight).toBeGreaterThan(textarea.clientHeight);

	const rootRect = root.getBoundingClientRect();
	const textareaRect = textarea.getBoundingClientRect();
	expect(textareaRect.left).toBe(rootRect.left);
	expect(textareaRect.right).toBe(rootRect.right);
	expect(textareaRect.top).toBe(rootRect.top);
	expect(textareaRect.bottom).toBe(rootRect.bottom);

	expectSameTextBox(textarea, displayText);
	expectSameTextBox(linkText, displayText);
	// 折り返し（行数）が一致することを、余白を除いた中身の高さで比べる。
	// scrollHeight は整数に丸められるので 0.5px 未満の差は同じとみなす（1 行ぶんの差は見逃さない）
	expect(contentHeight(textarea)).toBeCloseTo(contentHeight(displayText), 0);
	expect(contentHeight(linkText)).toBeCloseTo(contentHeight(displayText), 0);
});

test('resizable でドラッグして textarea の大きさが変わると、箱がその大きさに合わせる', async () => {
	const screen = await render(Textarea, { value: 'x', autoResize: false, resizable: true });
	const root = screen.container.querySelector<HTMLElement>(
		'[data-testid="textarea"]'
	) as HTMLElement;
	const textarea = screen.container.querySelector<HTMLElement>('textarea') as HTMLTextAreaElement;

	// ドラッグでのリサイズは、ブラウザが textarea にインラインの width / height を付ける
	textarea.style.width = '300px';
	textarea.style.height = '200px';
	await new Promise((resolve) => setTimeout(resolve, 100));

	const rootRect = root.getBoundingClientRect();
	expect(rootRect.width).toBe(300);
	expect(rootRect.height).toBe(200);
	expect(textarea.getBoundingClientRect().toJSON()).toEqual(rootRect.toJSON());
});

for (const autoResize of [true, false]) {
	for (const customStyle of ['', 'padding: 24px 12px 8px', 'padding: 8px 40px 8px 12px']) {
		test(`クリアボタンは textarea に覆われず押せる（autoResize=${autoResize}, customStyle="${customStyle}"）`, async () => {
			const screen = await render(Textarea, {
				value,
				width: 240,
				clearable: true,
				autoResize,
				customStyle
			});
			const button = screen.container.querySelector<HTMLElement>(
				'.textarea__clear-button button'
			) as HTMLButtonElement;
			const rect = button.getBoundingClientRect();
			const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
			expect(button.contains(hit)).toBe(true);
		});
	}
}

test.each([true, false])(
	'customStyle で余白を変えても、文字の領域は rows の高さを保つ（autoResize=%s）',
	async (autoResize) => {
		const contentHeightOf = async (customStyle: string) => {
			const { container } = await render(Textarea, {
				value: 'x',
				rows: 2,
				autoResize,
				customStyle
			});
			return (
				container.querySelector<HTMLElement>('.textarea__display-text') as HTMLElement
			).getBoundingClientRect().height;
		};
		expect(await contentHeightOf('padding: 20px 12px')).toBe(await contentHeightOf(''));
	}
);
