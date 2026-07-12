import { test, expect, vi } from 'vitest';
import { flushSync } from 'svelte';
import { render } from 'vitest-browser-svelte';
import StepNav from '../lib/components/StepNav.svelte';
import type { StepItem } from '../lib/types/stepItem';

const baseItems: StepItem[] = [
	{ label: 'アカウント', value: 'account' },
	{ label: '住所', value: 'address' },
	{ label: '確認', value: 'confirm' }
];

// 2.1 一覧描画・testid・番号・空配列耐性
test('items を配列順に描画し、最上位に data-testid を付与する', () => {
	const screen = render(StepNav, { items: baseItems });
	const root = screen.container.querySelector('[data-testid="step-nav"]');
	expect(root).not.toBeNull();

	const labels = Array.from(screen.container.querySelectorAll('.step-nav__label')).map(
		(el) => el.textContent?.trim()
	);
	expect(labels).toEqual(['アカウント', '住所', '確認']);

	const markers = Array.from(screen.container.querySelectorAll('.step-nav__marker')).map(
		(el) => el.textContent?.trim()
	);
	expect(markers).toEqual(['1', '2', '3']);
});

test('description を表示する', () => {
	const screen = render(StepNav, {
		items: [{ label: 'アカウント', value: 'a', description: '氏名を入力' }]
	});
	expect(screen.container.querySelector('.step-nav__description')?.textContent).toContain(
		'氏名を入力'
	);
});

test('空配列では何も描画せず例外を出さない', () => {
	const screen = render(StepNav, { items: [] });
	expect(screen.container.querySelector('.step-nav')).toBeNull();
});

// 2.2 / 2.3 進捗軸の状態導出と 2 軸合成
test('progress 指定で completed / current / upcoming を導出する', () => {
	const screen = render(StepNav, { items: baseItems, value: 'account', progress: 1 });
	const steps = screen.container.querySelectorAll('.step-nav__step');
	expect(steps[0].classList.contains('step-nav__step--completed')).toBe(true);
	expect(steps[1].classList.contains('step-nav__step--current')).toBe(true);
	expect(steps[2].classList.contains('step-nav__step--upcoming')).toBe(true);
});

test('進捗と表示中がズレたとき、完了表示と表示中強調を同一ステップで両立する', () => {
	// step3 まで到達(progress=2) しつつ step1 を閲覧(value=account)
	const screen = render(StepNav, { items: baseItems, value: 'account', progress: 2 });
	const step0 = screen.container.querySelectorAll('.step-nav__step')[0];
	expect(step0.classList.contains('step-nav__step--completed')).toBe(true);
	expect(step0.classList.contains('step-nav__step--viewing')).toBe(true);
	expect(step0.getAttribute('aria-current')).toBe('step');
	// 完了マーカーは check アイコン
	expect(step0.querySelector('.step-nav__marker')?.textContent).toContain('check');
});

test('error ステップはエラー表示と aria-invalid を付与する', () => {
	const screen = render(StepNav, {
		items: [{ label: '確認', value: 'c', error: true }]
	});
	const step = screen.container.querySelector('.step-nav__step');
	expect(step?.classList.contains('step-nav__step--error')).toBe(true);
	expect(step?.getAttribute('aria-invalid')).toBe('true');
});

test('隣接ステップ間にコネクターを描画し、到達点で完了区間を区別する', () => {
	const screen = render(StepNav, { items: baseItems, value: 'account', progress: 1 });
	const connectors = screen.container.querySelectorAll('.step-nav__connector');
	// 先頭以外に (items-1) 本
	expect(connectors.length).toBe(2);
	// step0→step1 の区間は完了
	expect(connectors[0].classList.contains('step-nav__connector--completed')).toBe(true);
	// step1→step2 の区間は未完了
	expect(connectors[1].classList.contains('step-nav__connector--completed')).toBe(false);
});

// 2.2 value 制御と 2.4 クリック操作
test('value に一致するステップが表示中になる', () => {
	const screen = render(StepNav, { items: baseItems, value: 'address' });
	const steps = screen.container.querySelectorAll('.step-nav__step');
	expect(steps[1].classList.contains('step-nav__step--viewing')).toBe(true);
	expect(steps[1].getAttribute('aria-current')).toBe('step');
});

test('value 未指定の項目は配列 index の文字列にフォールバックする', () => {
	const items: StepItem[] = [{ label: 'A' }, { label: 'B' }, { label: 'C' }];
	const screen = render(StepNav, { items, value: '1' });
	const steps = screen.container.querySelectorAll('.step-nav__step');
	expect(steps[1].classList.contains('step-nav__step--viewing')).toBe(true);
});

test('clickable 時はクリックで表示中が変わり onchange が発火する', async () => {
	const onchange = vi.fn();
	const screen = render(StepNav, {
		items: baseItems,
		value: 'account',
		clickable: true,
		onchange
	});
	const buttons = screen.container.querySelectorAll('button.step-nav__step');
	expect(buttons.length).toBe(3);
	(buttons[2] as HTMLButtonElement).click();
	flushSync();
	expect(onchange).toHaveBeenCalledWith('confirm');
	const steps = screen.container.querySelectorAll('.step-nav__step');
	expect(steps[2].classList.contains('step-nav__step--viewing')).toBe(true);
});

test('clickable でない場合はクリックしても表示中を変更しない', () => {
	const onchange = vi.fn();
	const screen = render(StepNav, { items: baseItems, value: 'account', onchange });
	// button ではなく非対話要素で描画される
	expect(screen.container.querySelectorAll('button.step-nav__step').length).toBe(0);
	const step = screen.container.querySelector('.step-nav__step') as HTMLElement;
	step.click();
	expect(onchange).not.toHaveBeenCalled();
});

// 2.4 disabled（インページ方式では非対話要素として選択を無効化する）
test('個別 disabled ステップは対話要素にならず選択を無効化する', () => {
	const onchange = vi.fn();
	const items: StepItem[] = [
		{ label: 'A', value: 'a' },
		{ label: 'B', value: 'b', disabled: true }
	];
	const screen = render(StepNav, { items, clickable: true, onchange });
	const steps = screen.container.querySelectorAll('.step-nav__step');
	// 有効な A は button、無効な B は button ではない
	expect(steps[0].tagName).toBe('BUTTON');
	expect(steps[1].tagName).not.toBe('BUTTON');
	expect(steps[1].classList.contains('step-nav__step--disabled')).toBe(true);
	(steps[1] as HTMLElement).click();
	expect(onchange).not.toHaveBeenCalled();
});

test('全体 disabled ではクリック操作を無効化する', () => {
	const onchange = vi.fn();
	const screen = render(StepNav, {
		items: baseItems,
		clickable: true,
		disabled: true,
		onchange
	});
	// 無効時は button を描画しない
	expect(screen.container.querySelectorAll('button.step-nav__step').length).toBe(0);
});

// 2.2 / 2.4 URL 方式（モード自動判定）
test('href を持つ items はリンク(<a>)として描画される', () => {
	const items: StepItem[] = [
		{ label: 'A', href: '/a' },
		{ label: 'B', href: '/b' }
	];
	const screen = render(StepNav, { items, currentPath: '/a' });
	const links = screen.container.querySelectorAll('a.step-nav__step');
	expect(links.length).toBe(2);
	expect(links[0].getAttribute('href')).toBe('/a');
	// currentPath=/a なので step0 が表示中
	expect(links[0].getAttribute('aria-current')).toBe('step');
});

test('URL 方式で個別 disabled はリンク化しない', () => {
	const items: StepItem[] = [
		{ label: 'A', href: '/a' },
		{ label: 'B', href: '/b', disabled: true }
	];
	const screen = render(StepNav, { items, currentPath: '/a' });
	const links = screen.container.querySelectorAll('a.step-nav__step');
	expect(links.length).toBe(1);
});

// 2.5 レイアウト/バリアント
test('orientation / size / showIcon が見た目のクラス・アイコンに反映される', () => {
	const items: StepItem[] = [{ label: 'A', value: 'a', icon: 'home' }];
	const screen = render(StepNav, {
		items,
		orientation: 'vertical',
		size: 'large',
		showIcon: true
	});
	const root = screen.container.querySelector('.step-nav');
	expect(root?.classList.contains('step-nav--vertical')).toBe(true);
	expect(root?.classList.contains('step-nav--large')).toBe(true);
	// 番号ではなくアイコン(home)を表示
	expect(screen.container.querySelector('.step-nav__marker')?.textContent).toContain('home');
});

// 2.6 テーマ/スタイル
test('color を渡すと強調色の internal 変数が設定される', () => {
	const screen = render(StepNav, { items: baseItems, color: 'rgb(255, 0, 0)' });
	const root = screen.container.querySelector('.step-nav') as HTMLElement;
	expect(root.style.getPropertyValue('--internal-step-nav-accent')).toBe('rgb(255, 0, 0)');
});

test('reducedMotion でモーション抑制クラスが付く', () => {
	const screen = render(StepNav, { items: baseItems, reducedMotion: true });
	expect(
		screen.container.querySelector('.step-nav')?.classList.contains('step-nav--no-motion')
	).toBe(true);
});

// 2.7 アクセシビリティ
test('nav ランドマークとリスト構造・aria-label を付与する', () => {
	const screen = render(StepNav, { items: baseItems, ariaLabel: '登録手順' });
	const nav = screen.container.querySelector('nav.step-nav');
	expect(nav?.getAttribute('aria-label')).toBe('登録手順');
	expect(screen.container.querySelector('[role="list"]')).not.toBeNull();
	expect(screen.container.querySelectorAll('[role="listitem"]').length).toBe(3);
});

// 3.7 不整合入力の非破綻
test('未一致 value や範囲外 progress でも例外を出さず描画を継続する', () => {
	const screen = render(StepNav, { items: baseItems, value: 'nope', progress: 99 });
	expect(screen.container.querySelectorAll('.step-nav__step').length).toBe(3);
	// どのステップも表示中にならない
	expect(screen.container.querySelectorAll('.step-nav__step--viewing').length).toBe(0);
});

// 2.3/2.7 コネクター整列（ラベル長が異なっても等幅カラムでマーカー中心が揃う）
test('ラベル長が異なっても水平カラムは等幅で、コネクターが隣のマーカーへ届く', () => {
	const items: StepItem[] = [
		{ label: 'アカウント', value: 'account', description: 'メールとパスワード' },
		{ label: '住所', value: 'address', description: '配送先の入力' },
		{ label: '支払い', value: 'payment', description: 'カード情報' },
		{ label: '確認', value: 'confirm', description: '内容の最終確認' }
	];
	const screen = render(StepNav, { items, value: 'address', progress: 1 });
	const container = screen.container.querySelector('.step-nav') as HTMLElement;
	// テスト環境ではグローバルのテーマ変数が読み込まれないため、寸法系の変数を明示的に注入する
	container.style.setProperty('--svelte-ui-step-nav-marker-size', '32px');
	container.style.setProperty('--svelte-ui-step-nav-connector-thickness', '2px');
	container.style.setProperty('--svelte-ui-step-nav-step-gap', '8px');
	// レイアウト幅を固定（等幅・スクロールなしの領域を確保）
	container.style.maxWidth = 'none';
	container.style.width = '800px';
	flushSync();

	const itemEls = Array.from(screen.container.querySelectorAll('.step-nav__item'));
	const widths = itemEls.map((el) => Math.round(el.getBoundingClientRect().width));
	// 全カラムが等幅（1px 程度の丸め誤差は許容）
	for (const w of widths) {
		expect(Math.abs(w - widths[0])).toBeLessThanOrEqual(1);
	}

	const markers = Array.from(screen.container.querySelectorAll('.step-nav__marker'));
	const connectors = Array.from(screen.container.querySelectorAll('.step-nav__connector'));
	// コネクター i の右端が次マーカー(i+1)の左端付近に到達している（途中で切れない）
	connectors.forEach((conn, i) => {
		const connRight = conn.getBoundingClientRect().right;
		const nextMarkerLeft = markers[i + 1].getBoundingClientRect().left;
		expect(Math.abs(connRight - nextMarkerLeft)).toBeLessThanOrEqual(2);
	});
});

test('垂直方向でもコネクターが次のマーカーへ届く（自身の高さ基準・可変高さ対応）', () => {
	const items: StepItem[] = [
		{ label: 'アカウント', value: 'account', description: 'メールとパスワード' },
		{ label: '住所', value: 'address', description: '配送先の入力' },
		{ label: '支払い', value: 'payment', description: 'カード情報' },
		{ label: '確認', value: 'confirm', description: '内容の最終確認' }
	];
	const screen = render(StepNav, { items, value: 'address', progress: 1, orientation: 'vertical' });
	const container = screen.container.querySelector('.step-nav') as HTMLElement;
	container.style.setProperty('--svelte-ui-step-nav-marker-size', '32px');
	container.style.setProperty('--svelte-ui-step-nav-connector-thickness', '2px');
	container.style.setProperty('--svelte-ui-step-nav-step-gap', '8px');
	flushSync();

	const markers = Array.from(screen.container.querySelectorAll('.step-nav__marker'));
	const connectors = Array.from(screen.container.querySelectorAll('.step-nav__connector'));
	// コネクター i の下端が次マーカー(i+1)の上端付近に到達している（途中で切れない）
	connectors.forEach((conn, i) => {
		const connBottom = conn.getBoundingClientRect().bottom;
		const nextMarkerTop = markers[i + 1].getBoundingClientRect().top;
		expect(Math.abs(connBottom - nextMarkerTop)).toBeLessThanOrEqual(2);
	});
});

// =========================================================================
// 4.2 キーボード・URL 連動
// =========================================================================
const dispatchKey = (el: HTMLElement, key: string) => {
	el.focus();
	el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
};

// 4.4/4.5 方向キーによるフォーカス移動
test('方向キーで対話ステップ間をフォーカス移動する（水平: ArrowRight/Left）', () => {
	const screen = render(StepNav, {
		items: baseItems,
		value: 'account',
		clickable: true,
		orientation: 'horizontal'
	});
	const buttons = Array.from(
		screen.container.querySelectorAll<HTMLButtonElement>('button.step-nav__step')
	);
	dispatchKey(buttons[0], 'ArrowRight');
	expect(document.activeElement).toBe(buttons[1]);
	dispatchKey(buttons[1], 'ArrowLeft');
	expect(document.activeElement).toBe(buttons[0]);
});

test('Home / End で先頭・末尾の対話ステップへフォーカス移動する', () => {
	const screen = render(StepNav, { items: baseItems, value: 'account', clickable: true });
	const buttons = Array.from(
		screen.container.querySelectorAll<HTMLButtonElement>('button.step-nav__step')
	);
	dispatchKey(buttons[1], 'End');
	expect(document.activeElement).toBe(buttons[2]);
	dispatchKey(buttons[2], 'Home');
	expect(document.activeElement).toBe(buttons[0]);
});

test('方向キー移動は無効ステップをスキップする', () => {
	const items: StepItem[] = [
		{ label: 'A', value: 'a' },
		{ label: 'B', value: 'b', disabled: true },
		{ label: 'C', value: 'c' }
	];
	const screen = render(StepNav, { items, value: 'a', clickable: true });
	// 無効な B は button にならないため、フォーカス可能なのは A と C
	const buttons = Array.from(
		screen.container.querySelectorAll<HTMLButtonElement>('button.step-nav__step')
	);
	expect(buttons.length).toBe(2);
	dispatchKey(buttons[0], 'ArrowRight');
	expect(document.activeElement).toBe(buttons[1]); // = C（B をスキップ）
});

test('垂直方向では ArrowDown/ArrowUp でフォーカス移動する', () => {
	const screen = render(StepNav, {
		items: baseItems,
		value: 'account',
		clickable: true,
		orientation: 'vertical'
	});
	const buttons = Array.from(
		screen.container.querySelectorAll<HTMLButtonElement>('button.step-nav__step')
	);
	dispatchKey(buttons[0], 'ArrowDown');
	expect(document.activeElement).toBe(buttons[1]);
	dispatchKey(buttons[1], 'ArrowUp');
	expect(document.activeElement).toBe(buttons[0]);
});

// 3.4 URL 方式: SPA 遷移時の再評価
test('URL 方式で SPA 遷移（pushState）に応じてアクティブ表示が再評価される', () => {
	const items: StepItem[] = [
		{ label: 'Foo', href: '/sn-foo' },
		{ label: 'Bar', href: '/sn-bar' }
	];
	const original = window.location.pathname;
	try {
		window.history.pushState({}, '', '/sn-foo');
		const screen = render(StepNav, { items });
		const links = screen.container.querySelectorAll('a.step-nav__step');
		expect(links[0].getAttribute('aria-current')).toBe('step');
		expect(links[1].getAttribute('aria-current')).toBeNull();

		// SPA 遷移
		window.history.pushState({}, '', '/sn-bar');
		flushSync();
		expect(links[0].getAttribute('aria-current')).toBeNull();
		expect(links[1].getAttribute('aria-current')).toBe('step');
	} finally {
		window.history.pushState({}, '', original);
	}
});

// 4.6 全体無効・4.4 個別無効でリンク遷移を無効化
test('URL 方式で個別 disabled はリンク化せず遷移を無効化する', () => {
	const items: StepItem[] = [
		{ label: 'A', href: '/a' },
		{ label: 'B', href: '/b', disabled: true }
	];
	const screen = render(StepNav, { items, currentPath: '/a' });
	const steps = screen.container.querySelectorAll('.step-nav__step');
	expect(steps[0].tagName).toBe('A');
	expect(steps[1].tagName).not.toBe('A');
	expect(steps[1].getAttribute('aria-disabled')).toBe('true');
});

test('URL 方式で全体 disabled は全ステップをリンク化しない', () => {
	const items: StepItem[] = [
		{ label: 'A', href: '/a' },
		{ label: 'B', href: '/b' }
	];
	const screen = render(StepNav, { items, currentPath: '/a', disabled: true });
	expect(screen.container.querySelectorAll('a.step-nav__step').length).toBe(0);
	expect(
		screen.container.querySelector('.step-nav')?.classList.contains('step-nav--disabled')
	).toBe(true);
});
