<!-- ComponentWrapper.svelte - 汎用テストラッパーコンポーネント -->
<script lang="ts">
	import { SvelteComponent } from 'svelte';

	let {
		component,
		content = '',
		...props
	}: {
		component: any; // コンポーネントクラス
		content?: string; // Snippet内容
		[key: string]: any; // その他のprops
	} = $props();
</script>

<svelte:component this={component} {...props}>
	{content}
</svelte:component>
