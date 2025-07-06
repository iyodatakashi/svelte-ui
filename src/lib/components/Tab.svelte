<script lang="ts">
	import TabItem from './TabItem.svelte';
	import type { MenuItem } from '../types/MenuItem';
	import { page } from '$app/state';

	let {
		tabItems = [],
		ariaLabel = 'Navigation tabs',
		ariaLabelledby
	}: {
		tabItems: MenuItem[];
		ariaLabel?: string;
		ariaLabelledby?: string;
	} = $props();

	// 現在のパスを取得
	const currentPath = $derived(page.url.pathname);

	// アクティブなタブのインデックスを現在のパスに基づいて計算
	const selectedTabIndex = $derived.by(() => {
		for (let i = 0; i < tabItems.length; i++) {
			const item = tabItems[i];
			if (!item.href) continue;

			if (item.strictMatch) {
				if (currentPath === item.href) {
					return i;
				}
				if (item.matchingPath && item.matchingPath.some((href) => currentPath.startsWith(href))) {
					return i;
				}
			} else {
				// ルートパス (/) の特別な処理
				if (item.href === '/') {
					if (currentPath === '/') {
						return i;
					}
				} else {
					// その他のパス
					if (currentPath !== '' && currentPath.startsWith(item.href)) {
						return i;
					}
				}

				// matchingPathのチェック
				if (item.matchingPath && item.matchingPath.some((href) => currentPath.startsWith(href))) {
					return i;
				}
			}
		}
		return -1;
	});

	// シンプルなキーボードナビゲーション
	const handleKeyDown = (event: KeyboardEvent) => {
		if (tabItems.length === 0) return;

		const tabList = event.currentTarget as HTMLElement;
		const tabs = Array.from(tabList.querySelectorAll('a[role="tab"]')) as HTMLElement[];
		const currentTab = event.target as HTMLElement;
		const currentIndex = tabs.indexOf(currentTab);

		if (currentIndex === -1) return;

		let nextIndex = currentIndex;

		switch (event.key) {
			case 'ArrowLeft':
				event.preventDefault();
				nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
				break;
			case 'ArrowRight':
				event.preventDefault();
				nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
				break;
			case 'Home':
				event.preventDefault();
				nextIndex = 0;
				break;
			case 'End':
				event.preventDefault();
				nextIndex = tabs.length - 1;
				break;
			default:
				return;
		}

		tabs[nextIndex]?.focus();
	};
</script>

<div
	class="tab"
	role="tablist"
	aria-label={ariaLabelledby ? undefined : ariaLabel}
	aria-labelledby={ariaLabelledby}
	tabindex="-1"
	onkeydown={handleKeyDown}
>
	{#each tabItems as tabItem, index}
		<div class="tab-item">
			<TabItem {tabItem} isSelected={index === selectedTabIndex} />
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
		overflow-y: visible;
		-ms-overflow-style: none;
		overscroll-behavior: contain;
		box-sizing: border-box;
	}
	.tab::-webkit-scrollbar {
		display: none;
	}
	.tab-item {
		display: block;
		height: 100%;
		flex-shrink: 0;
	}
</style>
