# Svelte UI Library Styles

## 入口

| 入口                            | 中身                             | 使う場面                           |
| ------------------------------- | -------------------------------- | ---------------------------------- |
| `@14ch/svelte-ui/styles`        | icons + tokens + core            | アプリ（推奨）                     |
| `@14ch/svelte-ui/styles/tokens` | CSS 変数だけ（`variables.scss`） | 他のアプリへ組み込まれるパッケージ |
| `@14ch/svelte-ui/styles/icons`  | Material Symbols の読み込みだけ  | アイコンを描く部品を使うとき       |

部品は `styles/tokens` だけを読み込んだページでも、`styles` を全部読み込んだときと同じ見た目で描かれる。部品が前提にする規則（box-sizing・button のリセットなど）は、各部品の `<style>` が持つ。

## ファイル構成

```
dist/assets/styles/
├── import.css / import.scss   # styles の入口（下の 3 つをまとめたもの）
├── tokens.css                 # styles/tokens の入口（variables.scss を変換したもの）
├── icons.css / icons.scss     # styles/icons の入口
├── variables.scss             # CSS 変数（:where(:root) と明暗・ハイコントラストの切り替えだけ）
├── core.scss                  # アプリ全体の素地（ページ全体の要素に効く規則）
├── component-base.scss        # 部品の <style> に取り込む mixin（box-sizing・button のリセット）
└── optional/
    ├── reset.scss             # リセット CSS
    └── fonts.scss             # Roboto・Noto Sans JP・YakuHanJP の読み込み
```

## 各ファイルの決まり

- **variables.scss**: 変数の定義だけを書く。`@import` も、要素や `*` へのセレクタも書かない（`styles/tokens` として単独で配るため）
- **core.scss**: ページ全体に効く規則を置く。部品はこのファイルに頼らない。部品が前提にする規則を足すときは、その部品の `<style>` に書く（複数の部品で同じなら `component-base.scss` の mixin にする）
- **icons.scss**: 外部フォントの読み込みだけを書く

## オプション

```scss
@use '@14ch/svelte-ui/styles/optional/reset.scss';
@use '@14ch/svelte-ui/styles/optional/fonts.scss';
```

`.scss` を直接読み込むには、利用側のビルドに `sass` が必要（svelte-ui の任意の peerDependency）。

## カスタマイズ

変数はすべて `:where()`（詳細度 0）で定義しているので、同じ要素に対する指定なら、利用側の指定が読み込み順に関係なく勝つ。ダークの値は `data-theme="dark"` を付けた要素に定義されるため、ダークの値を変えるときは `[data-theme='dark']` で上書きする。

```css
:root {
	--svelte-ui-primary-color: #ff6b6b;
	--svelte-ui-button-border-radius: 8px;
}

[data-theme='dark'] {
	--svelte-ui-primary-color: #ff9b9b;
}
```
