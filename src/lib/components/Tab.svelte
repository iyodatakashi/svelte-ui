<!-- Tab.svelte -->

<script lang="ts">
	import TabItem from './TabItem.svelte';
	import type { MenuItem } from '$lib/types/menuItem';
	import { afterNavigate } from '$app/navigation';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type TabProps = {
		// 基本プロパティ
		tabItems: MenuItem[];
		pathPrefix?: string;
		customPathMatcher?: (currentPath: string, itemHref: string, item: MenuItem) => boolean;
		currentPath?: string;

		// スタイル/レイアウト
		textColor?: string;
		selectedTextColor?: string;
		selectedBarColor?: string;

		// ARIA/アクセシビリティ
		ariaLabel?: string;
		ariaLabelledby?: string;
	};

	let {
		// 基本プロパティ
		tabItems = [],
		pathPrefix = '',
		customPathMatcher,
		currentPath,

		// スタイル/レイアウト（未指定時は TabItem が variables の tab 用変数を直接参照）
		textColor,
		selectedTextColor,
		selectedBarColor,

		// ARIA/アクセシビリティ
		ariaLabel = 'Tabs',
		ariaLabelledby
	}: TabProps = $props();

	let resolvedCurrentPath = $state('');

	// =========================================================================
	// Methods
	// =========================================================================
	const getCurrentPath = () => {
		// アプリ側から現在パスが明示的に渡されていればそれを優先（SSR対応）
		if (currentPath && currentPath !== '') {
			return currentPath;
		}

		// それ以外の場合はクライアント実行時のみ window.location から取得
		if (typeof window !== 'undefined') {
			return window.location.pathname;
		}
		return '';
	};

	// currentPath が渡されたときやマウント時に選択状態を反映
	$effect(() => {
		resolvedCurrentPath = getCurrentPath();
	});

	afterNavigate(() => {
		resolvedCurrentPath = getCurrentPath();
	});

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

	// 有効なタブのインデックス一覧（disabled を除く）
	const enabledIndices = $derived(
		tabItems.map((item, i) => (item.disabled ? -1 : i)).filter((i) => i >= 0)
	);

	// シンプルなキーボードナビゲーション（disabled タブはスキップ）
	const handleKeyDown = (event: KeyboardEvent) => {
		if (tabItems.length === 0 || enabledIndices.length === 0) return;

		const tabList = event.currentTarget as HTMLElement;
		const tabs = Array.from(tabList.querySelectorAll('[role="tab"]')) as HTMLElement[];
		const currentTab = event.target as HTMLElement;
		const currentIndex = tabs.indexOf(currentTab);

		if (currentIndex === -1) return;

		const currentEnabledPosition = enabledIndices.indexOf(currentIndex);
		let nextEnabledPosition = currentEnabledPosition;

		switch (event.key) {
			case 'ArrowLeft':
				event.preventDefault();
				nextEnabledPosition =
					currentEnabledPosition > 0 ? currentEnabledPosition - 1 : enabledIndices.length - 1;
				break;
			case 'ArrowRight':
				event.preventDefault();
				nextEnabledPosition =
					currentEnabledPosition < enabledIndices.length - 1 ? currentEnabledPosition + 1 : 0;
				break;
			case 'Home':
				event.preventDefault();
				nextEnabledPosition = 0;
				break;
			case 'End':
				event.preventDefault();
				nextEnabledPosition = enabledIndices.length - 1;
				break;
			default:
				return;
		}

		const nextIndex = enabledIndices[nextEnabledPosition];
		tabs[nextIndex]?.focus();
	};

	// =========================================================================
	// $derived
	// =========================================================================

	// アクティブなタブのインデックスを現在のパスに基づいて計算
	const selectedTabIndex = $derived.by(() => {
		for (let i = 0; i < tabItems.length; i++) {
			const item = tabItems[i];
			if (!item.href) continue;

			if (matchPath(resolvedCurrentPath, item.href, item)) {
				return i;
			}
		}
		return -1;
	});
</script>

<div
	class="tab"
	role="tablist"
	aria-label={ariaLabelledby ? undefined : ariaLabel}
	aria-labelledby={ariaLabelledby}
	tabindex="-1"
	onkeydown={handleKeyDown}
	data-testid="tab"
>
	{#each tabItems as tabItem, index}
		<TabItem
			{tabItem}
			{pathPrefix}
			isSelected={index === selectedTabIndex}
			isDisabled={tabItem.disabled ?? false}
			{textColor}
			{selectedTextColor}
			{selectedBarColor}
		/>
	{/each}
</div>

<style lang="scss">
	.tab {
		display: flex;
		justify-content: start;
		position: relative;
		width: 100%;
		height: 100%;
		min-height: var(--svelte-ui-tab-min-height);
		overflow-x: auto;
		overflow-y: visible;
		-ms-overflow-style: none;
		overscroll-behavior: contain;
		box-sizing: border-box;
	}
	.tab::-webkit-scrollbar {
		display: none;
	}
</style>
