# svelte-ui 実装ガイド

## プロジェクト概要

- パッケージ名: `@14ch/svelte-ui` (現在 v0.0.20)
- **Svelte 5 runes API** ベースのUIコンポーネントライブラリ
- Material Design インスパイア、アクセシビリティ優先設計
- ダークモード / ハイコントラストモード / 多言語 (en/ja/fr/de/es/zh-cn) 対応

## 構成

構成の共通ルールは `~/.claude/rules/sveltekit-structure.md`（全 SvelteKit プロジェクト共通）にある。**ここには、このプロジェクトのドメインと、共通ルールから外れる所（例外とその理由）だけを書く。** 共通ルールと同じ内容を写さない。

### 配布物とショーケース

- **`src/lib/` が配布物（svelte-package の入力）、`src/routes/` と `src/showcase/` はショーケース（デモ・確認用の画面）。** 混ぜない
- **ショーケースの画面の実体は `src/showcase/features/` に置く（共通ルールの例外）。** 共通ルールは画面の実体を `src/lib/features/` に置くが、このリポジトリでは `src/lib` がそのまま配布物になり、置くとデモ画面が配布物に入る。中の並びは共通ルールの `features/` と同じ（`tabDemo/` / `navDemo/` / `tenantDemo/` は画面が複数あるのでもう1階層掘る）。routes は共通ルールどおり最小ラッパーにし、`#showcase/` で参照する
- Storybook の stories と、stories 専用の見本コンポーネント（`*Example.svelte`）は `src/stories/` に置く

### 公開面

- 公開 API は `package.json` の `exports`（`.` と `./styles*`）と、`src/lib/index.ts` から export する名前・props。`dist` の中の並びは公開面ではない
- **`src/lib/assets/styles/` のファイルの並びは公開面（`./styles/*`）。** `component-base.scss`（部品の `<style>` に取り込む mixin）と `optional/` がここにあるのは共通ルール（全画面に効く土台だけを置く）の例外で、利用者が `@14ch/svelte-ui/styles/<file>` で参照する配置のため動かさない

| ファイル              | 役割                                                                    |
| --------------------- | ----------------------------------------------------------------------- |
| `variables.scss`      | 全 CSS 変数の定義（テーマシステム）。`styles/tokens` として単独でも配る |
| `core.scss`           | アプリ全体の素地（ページ全体に効く規則）。部品はこれに頼らない          |
| `component-base.scss` | 部品の `<style>` に取り込む mixin（box-sizing・button のリセット）      |
| `icons.scss`          | Material Symbols の読み込み（`styles/icons`）                           |
| `import.scss`         | 全部入りの入口（`styles`）                                              |

### `src/lib` のドメイン

| ディレクトリ        | 中身                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sharedComponents/` | ライブラリの部品（公開する UI コンポーネント）。Skeleton 系は `skeleton/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `models/<domain>/`  | 部品の Props 型と、それが使う型・定数・純関数。部品ごとのドメインに分ける。複数の部品で1つのドメインを持つもの: `button`（Button / IconButton / Fab）、`overlay`（Modal / Dialog / Drawer / ConfirmDialog と `CloseReason`）、`popup`（Popup / PopupMenu / PopupMenuButton）、`field`（Input / Textarea と `FocusStyle`）、`select`（Select / MultiSelect）、`uploader`（FileUploader / ImageUploader / ImageUploaderPreview）、`nav`（Nav / NavItem）、`checkbox`・`radio`（単体とグループ）、`datepicker`（Datepicker / DatepickerCalendar）、`snackbar`、`skeleton`。部品に属さないドメイン: `menu`（`MenuItem` と経路の照合）、`option`（選択肢）、`component`（`ComponentSize`）、`eventHandler`（コールバックの型）、`i18n`（翻訳データと `t()`）、`config`（`SvelteUiConfig`） |
| `stores/`           | ライブラリ全体で1つの状態: Snackbar の表示列（`snackbar.svelte.ts`）、開いている Popup（`popupManager.ts`）、ロケールなどの設定（`config.ts`）                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `utils/`            | ドメインに依存しない小さな関数                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

- **`utils/` には DOM に触る関数も置く（共通ルールの例外）。** 共通ルールの `utils/` は純関数だけだが、部品の土台として読み上げ（`accessibility.ts`）・スクロールの抑止（`mobile.ts`）・URL の変化の購読（`urlChange.ts`）が要り、どれもドメインにも状態にも依存しない。`stores/` に置くと「ライブラリ全体で1つの状態」という区分が崩れるため、ここに置く

### import

- `#lib/` に加え、`#showcase/`（`src/showcase`）と `#tests/`（`src/tests`）を `package.json` の `imports` と `tsconfig.json` の `paths` に置く。TS のモジュールは拡張子を付けずに書く（`#lib/models/button/button.types`）。svelte-package が配布物の中で相対パスに直す
- SCSS の `@use` も `#lib/` で参照する（`@use '#lib/assets/styles/component-base' as base;`）

### テスト

- 部品のテストは `src/tests/sharedComponents/` に置く。複数の部品にまたがる不変条件のテスト（`AriaReferences` / `Cleanup` / `TokensOnly` など）もここに置く
- テストの補助（描画用のラッパー・場面のコンポーネント・CSS 変数の収集）は `src/tests/helpers/`、`$app/*` のモックは `src/tests/mocks/`

## コンポーネント構造パターン

### 基本スケルトン

```typescript
// src/lib/models/myComponent/myComponent.types.ts
import type { Snippet } from 'svelte';
import type { FocusHandler, MouseHandler } from '#lib/models/eventHandler/eventHandler.types';

export type MyComponentProps = {
	// 1. Snippets
	children?: Snippet;

	// 2. 基本プロパティ
	title?: string;

	// 3. HTML属性
	id?: string;

	// 4. スタイル/レイアウト
	customStyle?: string;
	variant?: 'default' | 'filled';
	size?: 'small' | 'medium' | 'large';

	// 5. 状態/動作
	disabled?: boolean;

	// 6. ARIA/アクセシビリティ
	ariaLabel?: string;

	// 7. イベントハンドラ（空関数デフォルトで型推論を可能にする）
	onclick?: MouseHandler;
	onfocus?: FocusHandler;
};
```

```svelte
<!-- src/lib/sharedComponents/MyComponent.svelte -->
<script lang="ts">
	import type { MyComponentProps } from '#lib/models/myComponent/myComponent.types';

	let {
		children,
		title,
		id,
		customStyle,
		variant = 'default',
		disabled = false,
		ariaLabel,
		onclick = () => {},
		onfocus = () => {}
	}: MyComponentProps = $props();
</script>

<!-- data-testid は必ず最上位要素に設定 -->
<div
	class="my-component"
	{id}
	style={customStyle}
	data-testid="my-component"
	aria-label={ariaLabel}
>
	{#if children}
		{@render children()}
	{/if}
</div>
```

### Props記述ルール

- **修正内容をコメントで記録しない**（コードは常にリリース可能な状態を維持する。技術的な理由の説明は許容）
- Props順序: snippets → 基本props → HTML属性 → スタイル → 状態/動作 → ARIA → イベントハンドラ
- `data-testid` は必ず最上位要素に設定（コンポーネント名をベースに命名）
- ラッパーコンポーネント（自前の DOM 最上位要素を持たず単一の子コンポーネントをそのままレンダリングするもの。例: ConfirmDialog）は独自の `data-testid` を付与せず、内包する子コンポーネントの `data-testid` で特定する。薄いアンカー用コンテナ（例: PopupMenuButton のアンカー `div`）も内包要素の testid に委譲してよい
- `customStyle` は背景色とボーダーを描く「箱」＝最上位要素に適用する（`padding` も箱に 1 箇所だけ持たせる）。詳細は `docs/COMPONENT_DESIGN_GUIDELINES.md`
- 公開 API を改名するときは、旧名を移行期間だけ別名として残し、`/** @deprecated Use \`新名\` instead. Remove in x.y.z. */` と削除予定のバージョンを書く。`npm run release` はそのバージョンに達すると公開を止めるので、旧名を外してから公開する
- カスタムインラインスタイルは生の `style` ではなくプロジェクト標準の `customStyle?: string` で受け取る（Modal は歴史的経緯で `customStyles` / `customClass`、一部 Skeleton 系は `className` を使用。後方互換のため統一されていないが、新規コンポーネントは `customStyle` に揃える）

## CSSシステム

### 部品の基礎の規則

部品は `styles/tokens`（CSS 変数だけ）を読み込んだページでも同じ見た目で描かれる必要がある。ページ全体の規則（`core.scss`）に頼らず、前提にする規則は部品の `<style>` に持たせる。

```svelte
<style lang="scss">
	@use '#lib/assets/styles/component-base' as base;

	@include base.box-sizing;
	@include base.button-reset; /* <button> を描く部品だけ */
</style>
```

### 変数の3階層

| プレフィックス             | 用途                                          | 定義場所                           |
| -------------------------- | --------------------------------------------- | ---------------------------------- |
| `--svelte-ui-*`            | パブリック/テーマ変数（外部カスタマイズ可能） | `variables.scss`                   |
| `--internal-*`             | コンポーネントプライベート変数（動的計算値）  | インライン `style:` バインディング |
| `--base-*` / `--primary-*` | カラーパレット原色                            | `variables.scss`                   |

### 変数フォールバックパターン

```scss
.my-component {
	/* internal（インスタンス固有） → svelte-ui（テーマ） の順でフォールバック */
	gap: var(--internal-my-component-gap, var(--svelte-ui-my-component-gap));
	flex-direction: var(
		--internal-my-component-flex-direction,
		var(--svelte-ui-my-component-flex-direction)
	);
}
```

```svelte
<!-- Props から --internal-* 変数を動的設定 -->
<ul
  style:--internal-my-component-gap={gapStyle}
  style:--internal-my-component-flex-direction={direction === 'vertical' ? 'column' : 'row'}
>
```

### クラス命名規則（BEMライク）

```
.button              # ブロック
.button--ghost       # バリアント（modifier）
.button--small       # サイズ（modifier）
.button--disabled    # 状態（modifier）
.button__icon        # 子要素（element）
.button__label       # 子要素（element）
```

## イベントハンドラパターン

```typescript
// eventHandler.types.ts の型を使用
import type {
  FocusHandler,
  KeyboardHandler,
  MouseHandler,
  TouchHandler,
  PointerHandler,
  BivariantValueHandler
} from '#lib/models/eventHandler/eventHandler.types';

// 値変更系コールバックは BivariantValueHandler を使用
onchange?: BivariantValueHandler<string>;
```

```svelte
<script>
	let { onclick = () => {}, onchange }: Props = $props();

	const handleClick = (event: MouseEvent) => {
		if (disabled) return;
		onclick(event);
	};

	const handleChange = (newValue: string) => {
		value = newValue;
		onchange?.(value);
	};
</script>

<!-- DOMへの直接転送 -->
<input {onclick} {onfocus} {onblur} {onkeydown} />
```

## ID命名ルール（階層構造）

```svelte
<!-- 親コンポーネント: id を受け取り、子へ suffix 付きで渡す -->
<Modal id={id ? `${id}-modal` : undefined} />
<Dialog id={id ? `${id}-dialog` : undefined} />

<!-- 内部要素も同パターン -->
<div id={id ? `${id}-dialog-title` : undefined}>{title}</div>
<div id={id ? `${id}-dialog-description` : undefined}>{description}</div>
```

**子コンポーネント・内部要素にIDを渡すかどうかの判断基準:**

| ✅ 渡す                                                 | ❌ 渡さない                                    |
| ------------------------------------------------------- | ---------------------------------------------- |
| 親と1対1の関係（必ず1つだけ存在）                       | 同じコンポーネントが複数生成される（リスト等） |
| `aria-labelledby` / `aria-describedby` 等ARIA連携が必要 | 外部から参照不要な内部実装の詳細               |
| テストで個別に特定したい要素                            | `{#each}` 等で動的生成される要素               |

```svelte
<!-- ✅ 渡す: 1対1 & ARIA連携あり -->
<Input id={id ? `${id}-input` : undefined} aria-labelledby={id ? `${id}-label` : undefined} />

<!-- ❌ 渡さない: リスト内で複数生成される -->
{#each options as option}
	<Checkbox>{option.label}</Checkbox>
{/each}
```

## Bindableパターン

```typescript
// フォーム値: 外部からbind:valueで双方向バインディング可能
let { value = $bindable('') }: Props = $props();

// モーダル開閉: 外部からbind:isOpenも可能だが原則使わない
let { isOpen = $bindable(false) }: Props = $props();
```

**重要**: Dialog / Popup / Drawer 等のオーバーレイは、`bind:isOpen` で外部制御せず、`bind:this={ref}` で参照を取得して `ref.open()` / `ref.close()` を使う。

```svelte
<!-- ✅ 正しい使い方 -->
<script>
  let dialogRef: Dialog;
</script>
<Dialog bind:this={dialogRef} />
<button onclick={() => dialogRef?.open()}>Open</button>

<!-- ❌ 避けるべき使い方 -->
<script>
  let isOpen = $state(false);
</script>
<Dialog bind:isOpen />
```

開閉に伴う副作用は `onOpen` / `onClose` で受け取る。`onClose` は閉じるアニメーション完了後に `CloseReason`（`'escape'` / `'outside'` / `'explicit'`）を伴って呼ばれる。Modal / Dialog / Drawer / ConfirmDialog / Popup で共通。

```svelte
<Dialog
	bind:this={dialogRef}
	onClose={(reason) => {
		if (reason !== 'explicit') discardDraft();
	}}
/>
```

## エクスポートパターン

```typescript
// Props 型は models/<domain>/<domain>.types.ts に定義し、index.ts でコンポーネントと型の両方をエクスポート
export { default as Button } from '#lib/sharedComponents/Button.svelte';
export type { ButtonProps } from '#lib/models/button/button.types';
```

## アクセシビリティ

- ARIA属性: `aria-label`, `aria-describedby`, `aria-labelledby`, `aria-expanded`, `aria-busy`, `aria-invalid`, `aria-required`
- `reducedMotion` prop で個別にモーション制御可能（グローバルの `prefers-reduced-motion` も参照）
- キーボードナビゲーション: Enter/Space/Escape キーハンドリング
- フォーカス管理: `focus-visible` スタイル、Popup/Modal でのフォーカストラップ
- スクリーンリーダー専用テキストは、使う部品の `<style>` に `.sr-only` を定義する（`core.scss` の `.sr-only` はアプリ向けで、部品は頼らない）

## ビルドコマンド

```bash
npm run dev          # 開発サーバー
npm run package      # ライブラリビルド → dist/
npm run storybook    # Storybook (port 6006)
npm run test:unit    # Vitest ユニットテスト
npm run check        # svelte-check + TypeScript検査
npm run release      # npm 公開 → タグ付け → main を develop に早送り → push（ver コミット直後に実行）
```

## 重要ファイル

| ファイル                                            | 役割                                          |
| --------------------------------------------------- | --------------------------------------------- |
| `src/lib/assets/styles/variables.scss`              | 全CSS変数定義（テーマのカスタマイズ起点）     |
| `src/lib/assets/styles/core.scss`                   | アプリ全体の素地（`styles` からだけ読まれる） |
| `src/lib/models/eventHandler/eventHandler.types.ts` | イベントハンドラ型                            |
| `src/lib/index.ts`                                  | バレルエクスポート（追加時はここも更新）      |
| `src/lib/stores/config.ts`                          | グローバル設定・ロケール                      |
| `docs/COMPONENT_DESIGN_GUIDELINES.md`               | 設計ガイドライン（詳細ルール）                |
