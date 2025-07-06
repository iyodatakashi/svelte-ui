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
		console.log('🔍 Debug - Current path:', currentPath);
		console.log('🔍 Debug - Tab items:', tabItems);

		for (let i = 0; i < tabItems.length; i++) {
			const item = tabItems[i];
			if (!item.href) continue;

			console.log(`🔍 Debug - Checking tab ${i}: ${item.href} against ${currentPath}`);

			if (item.strictMatch) {
				if (currentPath === item.href) {
					console.log(`✅ Debug - Match found (strict): ${item.href} at index ${i}`);
					return i;
				}
				if (item.matchingPath && item.matchingPath.some((href) => currentPath.startsWith(href))) {
					console.log(`✅ Debug - Match found (matching path): ${item.href} at index ${i}`);
					return i;
				}
			} else {
				// ルートパス (/) の特別な処理
				if (item.href === '/') {
					if (currentPath === '/') {
						console.log(`✅ Debug - Match found (root): ${item.href} at index ${i}`);
						return i;
					}
				} else {
					// その他のパス
					if (currentPath !== '' && currentPath.startsWith(item.href)) {
						console.log(`✅ Debug - Match found (starts with): ${item.href} at index ${i}`);
						return i;
					}
				}

				// matchingPathのチェック
				if (item.matchingPath && item.matchingPath.some((href) => currentPath.startsWith(href))) {
					console.log(`✅ Debug - Match found (matching path): ${item.href} at index ${i}`);
					return i;
				}
			}
		}
		console.log('❌ Debug - No match found, returning -1');
		return -1;
	});

	// デバッグ用：selectedTabIndexの変化を監視
	$effect(() => {
		console.log('🎯 Debug - Selected tab index:', selectedTabIndex);
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
