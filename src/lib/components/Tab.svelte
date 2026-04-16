<!-- Tab.svelte -->

<script lang="ts">
	import TabItem from './TabItem.svelte';
	import type { MenuItem } from '$lib/types/menuItem';
	import { subscribeUrlChange } from '$lib/utils/urlChange';
	import { getCurrentPath as resolveCurrentPath, matchPath as doMatchPath } from '$lib/utils/navPath';

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
	// Effects
	// =========================================================================
	$effect(() => {
		// props の currentPath が変更されたとき
		resolvedCurrentPath = resolveCurrentPath(currentPath);
	});

	$effect(() => {
		// URL の変更を subscribe
		return subscribeUrlChange(() => {
			resolvedCurrentPath = resolveCurrentPath(currentPath);
		});
	});

	// =========================================================================
	// Methods
	// =========================================================================

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

			if (doMatchPath(resolvedCurrentPath, item.href, item, pathPrefix, customPathMatcher)) {
				return i;
			}
		}
		return -1;
	});

	// 有効なタブのインデックス一覧（disabled を除く）
	const enabledIndices = $derived(
		tabItems.map((item, i) => (item.disabled ? -1 : i)).filter((i) => i >= 0)
	);
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
