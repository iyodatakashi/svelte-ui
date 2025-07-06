<script lang="ts">
	import TabItem from './TabItem.svelte';
	import type { MenuItem } from '../types/MenuItem';
	import { page } from '$app/state';

	let { tabItems = [] }: { tabItems: MenuItem[] } = $props();

	// 現在のパスを取得（リアクティブ）
	const currentPath = $derived(page.url.pathname);
</script>

<div class="tab">
	{#each tabItems as tabItem}
		<div class="tab-item">
			<TabItem {tabItem} {currentPath} />
		</div>
	{/each}
</div>

<style lang="scss">
	.tab {
		display: flex;
		justify-content: start;
		width: 100%;
		height: 100%;
		overflow-x: auto;
		-ms-overflow-style: none;
		overscroll-behavior: contain;
	}
	.tab::-webkit-scrollbar {
		display: none;
	}
	.tab-item {
		display: block;
		height: 100%;
	}
</style>
