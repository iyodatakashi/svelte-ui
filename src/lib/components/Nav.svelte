<!-- Nav.svelte -->

<script lang="ts">
	import NavItem from './NavItem.svelte';
	import type { NavItemSelectedStyle } from './NavItem.svelte';
	import type { MenuItem } from '$lib/types/menuItem';
	import type { NavVariant, SubMenuMode } from '$lib/types/propOptions';
	import { subscribeUrlChange } from '$lib/utils/urlChange';
	import { getCurrentPath, matchPath } from '$lib/utils/navPath';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/icon';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type NavProps = {
		// 基本プロパティ
		/** `{ label, href, icon?, children?, disabled? }[]` */
		navItems?: MenuItem[];
		/** Layout variant. @default 'horizontal' */
		variant?: NavVariant;
		/** Prepended to each item's href for active-state matching. */
		pathPrefix?: string;
		/** Custom function to determine if an item is active. */
		customPathMatcher?: (currentPath: string, itemHref: string, item: MenuItem) => boolean;
		/** Overrides the auto-detected current path. */
		currentPath?: string;

		// HTML属性
		id?: string;

		// アイコン関連
		iconFilled?: boolean;
		iconWeight?: IconWeight;
		iconGrade?: IconGrade;
		iconOpticalSize?: IconOpticalSize;
		iconVariant?: IconVariant;

		// スタイル/レイアウト
		/** Visual style for the selected item. */
		selectedStyle?: NavItemSelectedStyle;
		gap?: number | string;
		/** Sub-menu display mode for items that have children. @default 'popup' */
		subMenuMode?: SubMenuMode;

		// ARIA/アクセシビリティ
		ariaLabel?: string;
		ariaLabelledby?: string;
	};

	let {
		// 基本プロパティ
		navItems = [],
		variant = 'horizontal',
		pathPrefix = '',
		customPathMatcher,
		currentPath,

		// HTML属性
		id,

		// アイコン関連
		iconFilled = false,
		iconWeight = 300,
		iconGrade = 0,
		iconOpticalSize = 24,
		iconVariant = 'outlined',

		// スタイル/レイアウト
		selectedStyle,
		gap,
		subMenuMode = 'popup',

		// ARIA/アクセシビリティ
		ariaLabel,
		ariaLabelledby
	}: NavProps = $props();

	let resolvedCurrentPath = $state('');

	// bar/accordion モード: 展開中の親アイテム（$state.raw で Proxy ラップを避け === 比較を正常にする）
	let expandedParent: MenuItem | null = $state.raw(null);

	// =========================================================================
	// Effects
	// =========================================================================
	$effect(() => {
		resolvedCurrentPath = getCurrentPath(currentPath);
	});

	$effect(() => {
		return subscribeUrlChange(() => {
			resolvedCurrentPath = getCurrentPath(currentPath);
			if (subMenuMode !== 'accordion') expandedParent = null;
		});
	});

	// accordion モード: アクティブな子を持つ親を自動展開
	$effect(() => {
		if (subMenuMode !== 'accordion' || !resolvedCurrentPath) return;
		const activeParent = navItems.find((item) =>
			item.children?.some(
				(child) =>
					child.href &&
					matchPath(resolvedCurrentPath, child.href, child, pathPrefix, customPathMatcher)
			)
		);
		if (activeParent) expandedParent = activeParent;
	});

	// =========================================================================
	// Methods
	// =========================================================================
	const handleKeyDown = (event: KeyboardEvent) => {
		if (navItems.length === 0 || enabledIndices.length === 0) return;

		const navItemEls = Array.from(
			(event.currentTarget as HTMLElement).querySelectorAll('[data-nav-item]')
		) as HTMLElement[];
		const currentItem = event.target as HTMLElement;
		const currentIndex = navItemEls.indexOf(currentItem);

		if (currentIndex === -1) return;

		const currentEnabledPosition = enabledIndices.indexOf(currentIndex);
		let nextEnabledPosition = currentEnabledPosition;

		const isVertical = variant === 'vertical';
		const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
		const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';

		switch (event.key) {
			case prevKey:
				event.preventDefault();
				nextEnabledPosition =
					currentEnabledPosition > 0 ? currentEnabledPosition - 1 : enabledIndices.length - 1;
				break;
			case nextKey:
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
		navItemEls[nextIndex]?.focus();
	};

	const handleSubMenuToggle = (item: MenuItem) => {
		if (subMenuMode === 'accordion') {
			// accordion: 開くのみ（再クリックで閉じない、他は自動的に閉じる）
			expandedParent = item;
		} else {
			// bar: トグル
			expandedParent = expandedParent === item ? null : item;
		}
	};

	// =========================================================================
	// $derived
	// =========================================================================
	const selectedIndex = $derived.by(() => {
		for (let i = 0; i < navItems.length; i++) {
			const item = navItems[i];
			if (item.href && matchPath(resolvedCurrentPath, item.href, item, pathPrefix, customPathMatcher)) {
				return i;
			}
			// bar モード: 子が選択されていれば親も選択とみなす
			if (subMenuMode === 'bar' && item.children?.some(
				(child) => child.href && matchPath(resolvedCurrentPath, child.href, child, pathPrefix, customPathMatcher)
			)) {
				return i;
			}
		}
		return -1;
	});

	const enabledIndices = $derived(
		navItems.map((item, i) => (item.disabled ? -1 : i)).filter((i) => i >= 0)
	);

	const showSubBar = $derived(
		variant === 'horizontal' && subMenuMode === 'bar' && expandedParent != null
	);

	const isChildSelected = (child: MenuItem) =>
		!!child.href && matchPath(resolvedCurrentPath, child.href, child, pathPrefix, customPathMatcher);
</script>

<nav
	class="nav nav--{variant}"
	aria-label={ariaLabelledby ? undefined : ariaLabel}
	aria-labelledby={ariaLabelledby}
	style:--internal-nav-gap={gap != null ? (typeof gap === 'number' ? `${gap}px` : gap) : undefined}
	{id}
	data-testid="nav"
>
	<div style="display: contents" role="presentation" onkeydown={handleKeyDown}>
	{#each navItems as item, index}
		<NavItem
			{item}
			{variant}
			{pathPrefix}
			isSelected={index === selectedIndex}
			isDisabled={item.disabled ?? false}
			{iconFilled}
			{iconWeight}
			{iconGrade}
			{iconOpticalSize}
			{iconVariant}
			{selectedStyle}
			{subMenuMode}
			{resolvedCurrentPath}
			{customPathMatcher}
			isSubMenuExpanded={(subMenuMode === 'bar' || subMenuMode === 'accordion') && expandedParent === item}
			onSubMenuToggle={handleSubMenuToggle}
			onClose={() => { expandedParent = null; }}
		/>
	{/each}
	</div>
</nav>

<!-- bar モード: 選択中の親の子アイテムを横バーとして表示 -->
{#if showSubBar && expandedParent?.children}
	<div class="nav__sub-bar" role="menu">
		{#each expandedParent.children as child}
			<NavItem
				item={child}
				variant="horizontal"
				{pathPrefix}
				{iconFilled}
				{iconWeight}
				{iconGrade}
				{iconOpticalSize}
				{iconVariant}
				{selectedStyle}
				isChild={true}
				{resolvedCurrentPath}
				{customPathMatcher}
				isSelected={isChildSelected(child)}
				isDisabled={child.disabled ?? false}
			/>
		{/each}
	</div>
{/if}

<style lang="scss">
	.nav {
		display: flex;
		box-sizing: border-box;
	}

	// mobile バリアント
	.nav--mobile {
		flex-direction: row;
		width: 100%;
		min-height: var(--svelte-ui-nav-mobile-min-height);
		overflow: hidden;
	}

	// vertical バリアント
	.nav--vertical {
		flex-direction: column;
		gap: var(--internal-nav-gap, var(--svelte-ui-nav-vertical-item-gap));
		width: 100%;
	}

	// horizontal バリアント（tab エイリアス含む）
	.nav--horizontal {
		flex-direction: row;
		justify-content: start;
		align-items: center;
		gap: var(--internal-nav-gap, var(--svelte-ui-nav-horizontal-item-gap));
		overflow-x: auto;
		overflow-y: visible;
		-ms-overflow-style: none;
		overscroll-behavior: none;
	}

	.nav--horizontal::-webkit-scrollbar {
		display: none;
	}

	// bar モード: サブバー
	.nav__sub-bar {
		display: flex;
		flex-direction: row;
		gap: var(--internal-nav-gap, var(--svelte-ui-nav-horizontal-item-gap));
		align-items: center;
		min-height: var(--svelte-ui-nav-sub-bar-min-height);
	}
</style>
