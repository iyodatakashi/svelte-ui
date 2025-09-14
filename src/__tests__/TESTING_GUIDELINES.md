# ブラウザテスト作成ガイドライン

## 基本方針

### 1. テスト対象コンポーネントの選定

- Snippetを使用するコンポーネントは`ComponentWrapper`を使用
- 直接レンダリング可能なコンポーネントは`render`を直接使用

### 2. 必須テストケース

#### 基本レンダリング

- コンポーネントが正しく表示される
- テキストコンテンツが正しく表示される（Snippetの場合は`label`要素を確認）

#### 状態管理

- 値の変更が正しく動作する（`value`、`checked`、`selected`など）
- 無効状態（`disabled`）が正しく動作し、操作できない

#### サイズバリエーション

- コンポーネントがサポートするサイズバリエーション（`small`、`medium`、`large`など）のクラスが正しく適用される
- サイズプロパティが存在するコンポーネントのみえ

#### イベントハンドリング

- クリックイベントが正しく発火する
- フォーカス/ブラーイベントが正しく動作する
- 変更イベント（`onchange`）が正しく発火する

#### 属性設定

- `required`、`name`、`value`などの属性が正しく設定される
- ARIA属性が正しく設定される（該当する場合）

#### CSS変数参照チェック

- コンポーネントが実際に使用しているCSS変数のみをテスト対象にする
- `variables.scss`に定義されているが使用されていない変数は除外
- 未定義変数を参照していないことを確認

### 3. テスト実装の注意点

#### セレクタの使用

**重要: 複数のコンポーネントが存在する場合の要素取得**

- **単一コンポーネントの場合**: `getByRole()` を使用可能
- **複数コンポーネントの場合**: 必ず各コンポーネントに一意の `id` を指定し、`querySelector('#id')` で取得
- **理由**: `getByRole()` は複数の同じロール要素がある場合、一意に特定できない

**具体的な使用方法**:

```typescript
// ❌ 間違い: 複数コンポーネントでgetByRoleを使用
const select1 = screen.getByRole('combobox'); // どちらのselectか不明
const select2 = screen.getByRole('combobox'); // 同じ要素を取得してしまう可能性

// ✅ 正しい: 各コンポーネントにidを指定
const screen1 = render(Component, { id: 'component-1' });
const screen2 = render(Component, { id: 'component-2' });
const element1 = screen1.container.querySelector('#component-1');
const element2 = screen2.container.querySelector('#component-2');
```

**実践例: イベントテストでの使用**:

```typescript
// 複数のSelectコンポーネントでイベントテスト
const screen1 = render(Select, {
  options: [...],
  id: 'select-disabled-1',
  disabled: true
});
const screen2 = render(Select, {
  options: [...],
  id: 'select-disabled-2',
  disabled: true
});

// 各selectを個別に取得してテスト
const select1 = screen1.container.querySelector('#select-disabled-1') as HTMLSelectElement;
const select2 = screen2.container.querySelector('#select-disabled-2') as HTMLSelectElement;

select1.dispatchEvent(new Event('change'));
select2.dispatchEvent(new Event('change'));
```

**その他のセレクタ**:

- `querySelector()`: 特定のIDやクラスでの要素取得
- `data-testid`: コンテナ要素の取得
- クラス確認は適切な要素（コンテナ要素や対象要素）で行う

**よくある間違いと対策**:

- ❌ `getByRole('combobox').element()` - 複数要素がある場合に失敗
- ✅ `querySelector('#unique-id')` - 一意の要素を確実に取得
- ❌ 同じidを複数のコンポーネントで使用 - テストが不安定になる
- ✅ 各テストケースで一意のidを使用 - テストの独立性を保証

#### イベントの実行

- ラベル要素がクリックをインターセプトする場合は、ラベルをクリック
- フォーカスは`element().focus()`を使用
- `await`は非同期操作のみに使用

#### CSS変数テスト（動的収集方式）

```typescript
// 1. CSS変数を動的に収集する関数を定義
function collectCssVarNames(element: Element): string[] {
	const vars = new Set<string>();
	const walk = (el: Element) => {
		const style = (el as HTMLElement).style;
		for (let i = 0; i < style.length; i++) {
			const prop = style.item(i);
			const val = style.getPropertyValue(prop);
			const matches = val.match(/var\((--svelte-ui-[^)]+)\)/g) || [];
			matches.forEach((m) => vars.add(m.replace(/var\(|\)/g, '')));
		}
		Array.from(el.children).forEach((c) => walk(c));
	};
	walk(element);
	return Array.from(vars);
}

// 2. テストで動的収集と期待値リストを組み合わせて使用
test('[Component] CSS variables used are defined (computed) in the page', async () => {
	const screen = render([Component], {
		/* props */
	});
	const wrapper = screen.getByTestId('[component]');
	const usedVars = new Set<string>();

	// インラインスタイルと子要素から動的に収集
	collectCssVarNames(wrapper.element()).forEach((v) => usedVars.add(v));

	// スタイルシート経由で使用される期待値変数も追加
	const expectedVars = [
		// コンポーネントが依存する変数のリスト
	];
	expectedVars.forEach((v) => usedVars.add(v));

	// 各変数が未定義でないことを確認
	const root = document.documentElement;
	for (const varName of usedVars) {
		const value = getComputedStyle(root).getPropertyValue(varName).trim();
		// 要素レベルで解決される変数の場合はフォールバック
		const fallbackValue = getComputedStyle(wrapper).getPropertyValue(varName).trim();
		const finalValue = value || fallbackValue;
		expect(finalValue).not.toBe('');
		expect(finalValue).not.toBe('initial');
		expect(finalValue).not.toBe('unset');
		expect(finalValue).not.toBe('inherit');
	}
});
```

**動的収集の利点：**

- コンポーネントの実装変更に自動的に対応
- 手動での変数リスト管理が不要
- 見落としやタイポを防止
- 保守性が高い

### 4. ファイル命名規則

- ブラウザテスト: `[Component].browser.test.ts`
- ユニットテスト: `[Component].test.ts`

### 5. インポート

```typescript
import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';
import [Component] from '../lib/components/[Component].svelte';
import variables from '../lib/assets/styles/variables.scss?inline';
```

### 6. テスト構造

```typescript
test('renders [Component] with content', async () => {
	// 基本レンダリングテスト
});

test('[Component] state management', async () => {
	// 状態管理テスト
});

test('disabled [Component] is not interactable', async () => {
	// 無効状態テスト
});

test('[Component] sizes render correctly', async () => {
	// サイズバリエーションテスト（サイズプロパティが存在する場合のみ）
});

test('[Component] events work correctly', async () => {
	// イベントテスト
});

test('[Component] attributes work correctly', async () => {
	// 属性テスト
});

test('[Component] CSS variables used are defined (computed) in the page', async () => {
	// CSS変数テスト（動的収集方式）
});
```

## 既存テストの修正が必要な項目

### Input.browser.test.ts

- ✅ 既に動的収集方式を使用済み

### Textarea.browser.test.ts

- ✅ 既に動的収集方式を使用済み

### Button.browser.test.ts

- ❌ 静的リスト方式を使用中 → 動的収集方式に変更が必要

### Checkbox.browser.test.ts

- ❌ 静的リスト方式を使用中 → 動的収集方式に変更が必要

### Radio.browser.test.ts

- ❌ 静的リスト方式を使用中 → 動的収集方式に変更が必要

## 品質保証

### テスト実行前の確認事項

1. コンポーネントの実装を確認し、実際のAPIを理解する
2. 使用されているCSS変数を特定する
3. イベントハンドリングの仕組みを理解する
4. セレクタが正しく要素を取得できることを確認する

## 重要: dispatchEventの使用禁止

**Svelte 5では`dispatchEvent`の使用は推奨されていません。**

### ❌ 間違い: dispatchEventの使用

```typescript
// 避けるべき方法
element.dispatchEvent(new Event('click'));
element.dispatchEvent(new Event('change'));
element.dispatchEvent(new Event('input'));
```

### ✅ 正しい: Svelte 5推奨の方法

```typescript
// ユーザーインタラクションのシミュレート
element.focus();
element.blur(); // changeイベントをトリガー

// クリックのシミュレート
element.click();

// フォーカスの確認
element.focus();
expect(document.activeElement).toBe(element);

// disabled状態の確認
element.focus();
expect(document.activeElement).not.toBe(element);
expect(element).toHaveAttribute('disabled');
```

### 理由

- **Svelte 5ではイベントがプロパティとして扱われる** (`onclick` → `let { onclick } = $props()`)
- `dispatchEvent`はDOMイベントを発火するが、Svelte 5のプロパティベースのイベントハンドラーは呼ばれない
- 実際のユーザーインタラクション（`click()`, `focus()`, `blur()`）はSvelte 5のイベントハンドラーを正しくトリガーする
- DOM要素の状態を直接確認する方が信頼性が高い

### テスト実行後の確認事項

1. 全テストが成功する
2. タイムアウトエラーが発生しない
3. 未定義変数エラーが発生しない
4. セレクタエラーが発生しない
