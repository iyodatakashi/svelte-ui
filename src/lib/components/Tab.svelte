<script lang="ts">
	import TabItem from './TabItem.svelte';
	import type { MenuItem } from '../types/MenuItem';
	import { page } from '$app/state';

	let {
		tabItems = [],
		ariaLabel = 'Navigation tabs',
		ariaLabelledby,
		pathPrefix = '',
		customPathMatcher
	}: {
		tabItems: MenuItem[];
		ariaLabel?: string;
		ariaLabelledby?: string;
		pathPrefix?: string;
		customPathMatcher?: (currentPath: string, itemHref: string, item: MenuItem) => boolean;
	} = $props();

	// 現在のパスを取得
	const currentPath = $derived(page.url.pathname);

	// パスの正規化処理
	const normalizePath = (path: string): string => {
		if (!pathPrefix) return path;

		// pathPrefixが設定されている場合、それを除去
		if (path.startsWith(pathPrefix)) {
			const normalized = path.substring(pathPrefix.length);
			return normalized.startsWith('/') ? normalized : '/' + normalized;
		}

		return path;
	};

	// パスマッチング関数
	const matchPath = (currentPath: string, itemHref: string, item: MenuItem): boolean => {
		if (customPathMatcher) {
			return customPathMatcher(currentPath, itemHref, item);
		}

		const normalizedCurrentPath = normalizePath(currentPath);

		// matchingPathのチェック
		if (item.matchingPath?.some((href) => normalizedCurrentPath.startsWith(href))) {
			return true;
		}

		// strictMatchの場合
		if (item.strictMatch) {
			return normalizedCurrentPath === itemHref;
		}

		// ルートパス (/) の特別な処理
		if (itemHref === '/') {
			return normalizedCurrentPath === '/';
		}

		// その他のパス
		return normalizedCurrentPath !== '' && normalizedCurrentPath.startsWith(itemHref);
	};

	// アクティブなタブのインデックスを現在のパスに基づいて計算
	const selectedTabIndex = $derived.by(() => {
		for (let i = 0; i < tabItems.length; i++) {
			const item = tabItems[i];
			if (!item.href) continue;

			if (matchPath(currentPath, item.href, item)) {
				return i;
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
