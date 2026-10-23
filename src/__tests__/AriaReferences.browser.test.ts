/**
 * ID 参照の aria 属性が、実在する要素を指していることを検証する（コンポーネント横断の不変条件）。
 * 参照先が無くてもエラーにはならず、計算上は無視されるだけなので、気づかないまま
 * 読み上げ用の名前や説明が失われる。属性の有無ではなく参照の解決を見る。
 */
import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { createRawSnippet, tick } from 'svelte';

const label = createRawSnippet(() => ({ render: () => '<span>ラベル</span>' }));

const IDREF_ATTRIBUTES = [
	'aria-labelledby',
	'aria-describedby',
	'aria-controls',
	'aria-owns',
	'aria-activedescendant',
	'aria-details',
	'aria-errormessage'
];

type Scan = { checked: number; dangling: string[] };

const scan = (name: string): Scan => {
	const result: Scan = { checked: 0, dangling: [] };
	for (const el of Array.from(document.querySelectorAll('*'))) {
		for (const attr of [...IDREF_ATTRIBUTES, ...(el.tagName === 'LABEL' ? ['for'] : [])]) {
			const raw = el.getAttribute(attr);
			if (!raw) continue;
			for (const id of raw.trim().split(/\s+/)) {
				result.checked++;
				let found: Element | null = null;
				try {
					found = document.querySelector(`#${CSS.escape(id)}`);
				} catch {
					found = null;
				}
				if (!found) {
					result.dangling.push(`${name}: <${el.tagName.toLowerCase()}> ${attr}="${id}"`);
				}
			}
		}
	}
	return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mount = async (name: string, props: any) => {
	const mod = await import(/* @vite-ignore */ `../lib/components/${name}.svelte`);
	return render(mod.default, props);
};

const opts = [
	{ value: 'a', label: 'A' },
	{ value: 'b', label: 'B' }
];
const menuItems = [{ label: 'A', icon: 'home' }, { label: 'B' }];
const navItems = [{ label: 'A', href: '/a' }];

/** そのまま描画するだけで検査できるもの */
const STATIC: [string, Record<string, unknown>][] = [
	['Button', { children: label }],
	['Checkbox', { checked: false, children: label }],
	['CheckboxGroup', { value: [], options: opts }],
	['ColorPicker', { value: '#ff0000' }],
	['Fab', { children: label }],
	['FileUploader', {}],
	['IconButton', { children: label }],
	['ImageUploader', {}],
	['Input', { value: 'x' }],
	['Nav', { items: navItems }],
	['NavItem', { item: navItems[0] }],
	['Pagination', { total: 100, limit: 10, currentPageNum: 1 }],
	['Radio', { currentValue: 'a', value: 'a', children: label }],
	['RadioGroup', { value: 'a', options: opts }],
	['SegmentedControl', { value: 'a', items: opts }],
	['Slider', { value: 1 }],
	['StepNav', { stepItems: opts, value: 'a' }],
	['Switch', { checked: false, children: label }],
	['Tab', { items: opts, value: 'a' }],
	['Textarea', { value: 'x' }]
];

/** オーバーレイ。開かないと aria 属性が出ないので開いてから検査する */
const OVERLAY: [string, Record<string, unknown>][] = [
	['Modal', { children: label }],
	['Dialog', { title: 'タイトル', description: '説明', children: label }],
	['Drawer', { title: 'タイトル', description: '説明', children: label }],
	['ConfirmDialog', { message: '確認' }],
	['Popup', { children: label }]
];

/** トリガーを押して開くもの。開いた状態で aria-controls などが出る */
const TRIGGERED: [string, Record<string, unknown>, string][] = [
	['Select', { value: 'a', options: opts }, '.select__trigger'],
	['MultiSelect', { value: ['a'], options: opts }, '.multi-select__trigger'],
	['Combobox', { value: '', options: ['a', 'b'] }, 'input'],
	['PopupMenuButton', { menuItems }, 'button'],
	['Datepicker', { value: null }, '.datepicker__trigger-overlay']
];

test.each(STATIC)('%s の aria 参照が解決する', async (name, props) => {
	await mount(name, props);

	expect(scan(name).dangling).toEqual([]);
});

test.each(OVERLAY)('%s の aria 参照が解決する（開いた状態）', async (name, props) => {
	const { container } = await mount(name, props);
	(container.querySelector('dialog.modal') as HTMLDialogElement | null)?.showModal();
	const popover = container.querySelector('[popover]') as HTMLElement | null;
	if (popover) popover.showPopover();

	expect(scan(name).dangling).toEqual([]);
});

test.each(TRIGGERED)(
	'%s の aria 参照が解決する（開いた状態）',
	async (name, props, triggerSelector) => {
		const { container } = await mount(name, props);
		const trigger = container.querySelector(triggerSelector) as HTMLElement;
		trigger.click();
		await tick();
		await new Promise((resolve) => setTimeout(resolve, 50));
		trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
		await tick();

		const result = scan(name);
		// 開けていないと検査が素通りしてしまうため、参照が出ていること自体も確かめる
		expect(result.checked, '検査対象の aria 参照が 1 つも無い').toBeGreaterThan(0);
		expect(result.dangling).toEqual([]);
	}
);
