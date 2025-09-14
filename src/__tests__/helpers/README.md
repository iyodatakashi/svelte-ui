# Test Helpers

このディレクトリには、ブラウザテスト用のヘルパーコンポーネントが含まれています。

## ComponentWrapper.svelte

Snippetを使用するコンポーネントをテストするための汎用ラッパーコンポーネントです。

### 使用方法

```svelte
<script>
	import ComponentWrapper from './helpers/ComponentWrapper.svelte';
	import MyComponent from '../lib/components/MyComponent.svelte';
</script>

<ComponentWrapper component={MyComponent} prop1="value1" prop2="value2">
	Content for the snippet
</ComponentWrapper>
```

### Props

- `component`: ラップするコンポーネント
- `children`: Snippetの内容（文字列またはSnippet）
- その他のprops: コンポーネントに渡されるprops

## 専用ラッパーコンポーネント

特定のコンポーネント用に最適化されたラッパーも提供されています：

- `ButtonWrapper.svelte` - Buttonコンポーネント用
- `IconButtonWrapper.svelte` - IconButtonコンポーネント用
- `PopupWrapper.svelte` - Popupコンポーネント用
- `IconWrapper.svelte` - Iconコンポーネント用

### 使用方法

```svelte
<script>
	import ButtonWrapper from './helpers/ButtonWrapper.svelte';
</script>

<ButtonWrapper buttonText="Click me" variant="filled" size="large">
	<!-- または、buttonTextプロパティを使用 -->
</ButtonWrapper>
```

## 新しいラッパーの作成

新しいコンポーネント用のラッパーを作成する場合：

1. **ComponentWrapperを使用する方法**（推奨）:

```svelte
<!-- MyComponentWrapper.svelte -->
<script>
	import ComponentWrapper from './ComponentWrapper.svelte';
	import MyComponent from '../../lib/components/MyComponent.svelte';

	let { content = 'Default', ...props } = $props();
</script>

<ComponentWrapper component={MyComponent} {...props}>
	{content}
</ComponentWrapper>
```

2. **専用ラッパーを作成する方法**:

```svelte
<!-- MyComponentWrapper.svelte -->
<script>
	import MyComponent from '../../lib/components/MyComponent.svelte';

	let { myContent = 'Default', ...props } = $props();
</script>

<MyComponent {...props}>
	{myContent}
</MyComponent>
```

## テストでの使用例

```typescript
// MyComponent.browser.test.ts
import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import MyComponentWrapper from './helpers/MyComponentWrapper.svelte';

test('renders MyComponent with content', async () => {
	const screen = render(MyComponentWrapper, {
		content: 'Test Content',
		variant: 'primary'
	});

	const element = screen.getByRole('button'); // または適切なロール
	await expect.element(element).toHaveTextContent('Test Content');
});
```
