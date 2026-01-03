# コンポーネント設計ガイドライン

## ID命名ルール

### コンポーネント内包時のID受け渡しルール

#### 基本ルール

- **親コンポーネント**: `id`プロパティを受け取る
- **子コンポーネント**: 受け取った`id`にsuffixを付けて自身のIDを生成
- **内部要素**: 受け取った`id`にsuffixを付けてIDを生成

#### 命名パターン

```typescript
// 親 → 子コンポーネント
<ChildComponent id={id ? `${id}-child-suffix` : undefined} />

// 内部要素
<div id={id ? `${id}-element-suffix` : undefined}>
```

#### 具体例

```typescript
// ConfirmDialog → Dialog → Modal
<Dialog id={id ? `${id}-dialog` : undefined} />
<Modal id={id ? `${id}-modal` : undefined} />

// 内部要素
<div id={id ? `${id}-dialog-title` : undefined}>
<div id={id ? `${id}-modal-description` : undefined}>

// 他の例
<Input id={id ? `${id}-input` : undefined} />
<Popup id={id ? `${id}-popup` : undefined} />
<DatepickerCalendar id={id ? `${id}-calendar` : undefined} />
```

#### 判断基準

- **✅ IDを渡すべき**: 1対1の親子関係、アクセシビリティ上重要な要素、テストで個別特定が必要
- **❌ IDを渡さない**: 同じコンポーネントが複数存在、内部実装の詳細、動的生成要素

### 理由

- **階層構造の明確化**: `${id}-suffix`パターンにより、コンポーネントの階層関係が分かりやすい
- **グローバル一意性**: 親のIDをベースにすることで、DOM全体で一意なIDを保証
- **アクセシビリティ**: ARIA属性との連携で、スクリーンリーダーなどの支援技術に対応
- **テストの安定性**: 一意なIDにより、テストでの要素特定が確実

## コンポーネント設計原則

### プロパティ設計

- **基本プロパティ**: 必須の機能に関わるプロパティ
- **HTML属性**: 標準的なHTML属性（id, class, style等）
- **スタイル/レイアウト**: 見た目やレイアウトに関わるプロパティ
- **状態/動作**: コンポーネントの動作状態に関わるプロパティ
- **ARIA/アクセシビリティ**: アクセシビリティに関わるプロパティ
- **イベントハンドラー**: イベント処理に関わるプロパティ

### イベントハンドラー設計

```typescript
// Svelte 5の推奨パターン
onclick = () => {}, // パラメータなしで型推論を可能にする
onchange = () => {}, // パラメータなしで型推論を可能にする
```

### データテストID

- 最上位のDOM要素に`data-testid`を設定
- テストでの要素特定を容易にする
- コンポーネント名をベースに命名（例: `data-testid="dialog"`）

## 実装例

### 基本的なコンポーネント構造

```svelte
<script lang="ts">
	// Props, States & Constants
	let {
		// 基本プロパティ
		title = 'Default Title',

		// HTML属性
		id,

		// スタイル/レイアウト
		variant = 'default',

		// 状態/動作
		isOpen = $bindable(false),

		// イベントハンドラー
		onclick = () => {}
	}: {
		// 型定義
		title?: string;
		id?: string;
		variant?: 'default' | 'primary';
		isOpen?: boolean;
		onclick?: () => void;
	} = $props();
</script>

<div class="component" {id} data-testid="component">
	<!-- コンテンツ -->
</div>
```

### 内包コンポーネントの例

```svelte
<script lang="ts">
	let { id }: { id?: string } = $props();
</script>

<div class="parent" {id} data-testid="parent">
	<ChildComponent id={id ? `${id}-child` : undefined} />
	<div id={id ? `${id}-element` : undefined}>
		<!-- 内部要素 -->
	</div>
</div>
```
