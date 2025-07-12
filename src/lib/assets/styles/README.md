# Svelte UI Library Styles

この svelte-ui ライブラリは、ライブラリユーザーのスタイルとの競合を避けるために、スタイルを **必須スタイル** と **オプションスタイル** に分離しています。

## 🎯 変更点

- **v0.0.1** から、ライブラリのindex.tsでは必須スタイルのみを自動読み込み
- リセットCSSやフォントなどは **オプション** として分離
- ユーザーが必要に応じて選択的に読み込み可能

## 📁 ファイル構成

```
dist/assets/styles/
├── core.scss              # 🔴 必須 - コンポーネント動作に必要
├── variables.scss          # 🔴 必須 - CSS変数
├── material-symbols.scss   # 🔴 必須 - アイコン表示
├── import.scss            # 🔴 必須 - 上記3つをまとめて読み込み
└── optional/
    ├── reset.scss         # 🔵 オプション - リセットCSS
    └── fonts.scss         # 🔵 オプション - フォント読み込み
```

## 🔴 必須スタイル（自動読み込み）

これらのスタイルは、ライブラリをインポートすると自動的に読み込まれます：

```typescript
// ライブラリをインポートするだけで必須スタイルが読み込まれる
import { Button } from 'svelte-ui';
```

### 含まれる内容

- **Box-sizing**: `box-sizing: border-box` の設定（全コンポーネント）
- **Button reset**: button要素のブラウザデフォルトスタイルをリセット（Button, IconButton, Fab等）
- **Dialog reset**: dialog要素の基本スタイル（Dialog, Drawer等）
- **Form elements**: input autofill、label等の調整（Input, Textarea, Checkbox, Radio等）
- **Accessibility**: `.sr-only` クラス（PopupMenu等で使用）
- **CSS variables**: 全コンポーネントで使用される変数
- **Material Icons**: アイコンフォントの設定

## 🔵 オプションスタイル（選択読み込み）

必要に応じて、以下のスタイルを選択的に読み込むことができます：

### 1. リセットCSS

```scss
// Eric Meyer's CSS Reset + 基本的なレイアウト設定
@import 'svelte-ui/dist/assets/styles/optional/reset.scss';
```

### 2. フォント

```scss
// Google Fonts (Roboto, Noto Sans JP) + YakuHanJP
@import 'svelte-ui/dist/assets/styles/optional/fonts.scss';
```

## 🚀 使用例

### 最小構成（必須スタイルのみ）

```typescript
// main.ts または app.ts
import { Button, Input, Dialog } from 'svelte-ui';

// 必須スタイルは自動的に読み込まれる
// 自分のリセットCSSやフォントを使用可能
```

### 標準構成（オプションスタイルも使用）

```scss
// app.scss
// 必須スタイルは自動読み込みされているので、オプションのみ追加
@import 'svelte-ui/dist/assets/styles/optional/reset.scss';
@import 'svelte-ui/dist/assets/styles/optional/fonts.scss';

// 自分のスタイル
body {
	background-color: #f0f0f0;
}
```

### 部分的な使用

```scss
// app.scss
// 自分のリセットCSSを使用し、フォントだけライブラリのものを使用
@import 'svelte-ui/dist/assets/styles/optional/fonts.scss';
```

## 🔄 移行ガイド

### 旧バージョンからの移行

以前のバージョンではリセットCSSが自動的に読み込まれていました。同じ動作を維持したい場合：

```scss
// app.scss
@import 'svelte-ui/dist/assets/styles/optional/reset.scss';
@import 'svelte-ui/dist/assets/styles/optional/fonts.scss';
```

### 競合を避けたい場合

```scss
// 必須スタイルは自動読み込みされるので、何もしなくてOK
// 自分のリセットCSSやフォントを使用してください
```

## 🎨 カスタマイズ

CSS変数を上書きすることで、簡単にテーマをカスタマイズできます：

```scss
// カスタムテーマ
:root {
	--svelte-ui-primary-color: #ff6b6b;
	--svelte-ui-button-border-radius: 8px;
}
```

## 🔧 トラブルシューティング

### スタイルが適用されない場合

1. **Box-sizing**: 必須スタイルに含まれているため、基本的な要素サイズは正常に表示されます
2. **Button要素**: 基本的なリセットは必須スタイルに含まれています
3. **アイコン**: Material Icons は必須スタイルに含まれています

### 競合が発生した場合

1. **リセットCSS**: optional/reset.scss を読み込まずに、自分のリセットCSSを使用
2. **フォント**: optional/fonts.scss を読み込まずに、自分のフォントを指定
3. **CSS変数**: 必要に応じて上書きしてください

## 📚 詳細情報

- [コンポーネント一覧](../../components/)
- [CSS変数一覧](./variables.scss)
- [TypeScript型定義](../../types/)
