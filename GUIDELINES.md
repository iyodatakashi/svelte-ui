# svelte-ui 実装ガイド

## プロジェクト概要

- パッケージ名: `@14ch/svelte-ui` (現在 v0.0.20)
- **Svelte 5 runes API** ベースのUIコンポーネントライブラリ
- Material Design インスパイア、アクセシビリティ優先設計
- ダークモード / ハイコントラストモード / 多言語 (en/ja/fr/de/es/zh-cn) 対応

## ディレクトリ構造

```
src/lib/
├── components/          # 38+ Svelteコンポーネント
├── types/
│   ├── propOptions.ts   # 共有型ユニオン (ButtonVariant, PopupPosition等)
│   ├── callbackHandlers.ts  # イベントハンドラ型定義
│   ├── icon.ts
│   ├── menuItem.ts
│   └── segmentedControlItem.ts
├── utils/               # style.ts, snackbar, popup, accessibility等
├── assets/styles/
│   ├── variables.scss   # 全CSS変数定義（テーマシステム）
│   ├── core.scss        # グローバルリセット・基底スタイル
│   └── import.scss      # エントリーポイント
├── i18n/                # 多言語対応
├── config.ts            # グローバル設定 (ロケール等)
└── index.ts             # バレルエクスポート
```

## コンポーネント構造パターン

### 基本スケルトン

```svelte
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { FocusHandler, MouseHandler } from '$lib/types/callbackHandlers.js';

  // export type は同ファイルに定義 → index.ts から再エクスポート
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

  let {
    children,
    title,
    id,
    customStyle,
    variant = 'default',
    disabled = false,
    ariaLabel,
    onclick = () => {},
    onfocus = () => {},
  }: MyComponentProps = $props();
</script>

<!-- data-testid は必ず最上位要素に設定 -->
<div class="my-component" {id} style={customStyle} data-testid="my-component" aria-label={ariaLabel}>
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
- カスタムインラインスタイルは生の `style` ではなくプロジェクト標準の `customStyle?: string` で受け取る（Modal は歴史的経緯で `customStyles` / `customClass`、一部 Skeleton 系は `className` を使用。後方互換のため統一されていないが、新規コンポーネントは `customStyle` に揃える）

## CSSシステム

### 変数の3階層

| プレフィックス | 用途 | 定義場所 |
|---|---|---|
| `--svelte-ui-*` | パブリック/テーマ変数（外部カスタマイズ可能） | `variables.scss` |
| `--internal-*` | コンポーネントプライベート変数（動的計算値） | インライン `style:` バインディング |
| `--base-*` / `--primary-*` | カラーパレット原色 | `variables.scss` |

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
// callbackHandlers.ts の型を使用
import type {
  FocusHandler,
  KeyboardHandler,
  MouseHandler,
  TouchHandler,
  PointerHandler,
  BivariantValueHandler
} from '$lib/types/callbackHandlers.js';

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

| ✅ 渡す | ❌ 渡さない |
|---|---|
| 親と1対1の関係（必ず1つだけ存在） | 同じコンポーネントが複数生成される（リスト等） |
| `aria-labelledby` / `aria-describedby` 等ARIA連携が必要 | 外部から参照不要な内部実装の詳細 |
| テストで個別に特定したい要素 | `{#each}` 等で動的生成される要素 |

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

## エクスポートパターン

```typescript
// コンポーネントファイル内に export type を定義
export type ButtonProps = { ... };

// index.ts でデフォルト + 型の両方をエクスポート
export { default as Button } from './components/Button.svelte';
export type { ButtonProps } from './components/Button.svelte';
```

## アクセシビリティ

- ARIA属性: `aria-label`, `aria-describedby`, `aria-labelledby`, `aria-expanded`, `aria-busy`, `aria-invalid`, `aria-required`
- `reducedMotion` prop で個別にモーション制御可能（グローバルの `prefers-reduced-motion` も参照）
- キーボードナビゲーション: Enter/Space/Escape キーハンドリング
- フォーカス管理: `focus-visible` スタイル、Popup/Modal でのフォーカストラップ
- `.sr-only` クラス (`core.scss` 定義) でスクリーンリーダー専用テキスト

## ビルドコマンド

```bash
npm run dev          # 開発サーバー
npm run package      # ライブラリビルド → dist/
npm run storybook    # Storybook (port 6006)
npm run test:unit    # Vitest ユニットテスト
npm run check        # svelte-check + TypeScript検査
```

## 重要ファイル

| ファイル | 役割 |
|---|---|
| `src/lib/assets/styles/variables.scss` | 全CSS変数定義（テーマのカスタマイズ起点） |
| `src/lib/assets/styles/core.scss` | グローバルリセット・`.sr-only`等 |
| `src/lib/types/propOptions.ts` | ButtonVariant, PopupPosition等の共有型 |
| `src/lib/types/callbackHandlers.ts` | イベントハンドラ型 |
| `src/lib/index.ts` | バレルエクスポート（追加時はここも更新） |
| `src/lib/config.ts` | グローバル設定・ロケール |
| `docs/COMPONENT_DESIGN_GUIDELINES.md` | 設計ガイドライン（詳細ルール） |
