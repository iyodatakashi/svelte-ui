<!-- Nav.svelte -->

<script lang="ts">
	import NavItem from './NavItem.svelte';
	import type { NavItemSelectedVariant } from './NavItem.svelte';
	import type { MenuItem } from '$lib/types/menuItem';
	import type { NavVariant, ChildrenVariant } from '$lib/types/propOptions';
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
		selectedVariant?: NavItemSelectedVariant;
		gap?: number | string;
		/** How child items are displayed. Defaults to `accordion` (vertical), `bar` (horizontal), `bottom-sheet` (mobile). */
		childrenVariant?: ChildrenVariant;
		/** Show chevron icon on parent items. @default true */
		chevron?: boolean;
		/** Inline style applied to the nav container element. */
		customContainerStyle?: string;
		/** Inline style applied to each nav item element. */
		customItemStyle?: string;
		/** Inline style applied to each child nav item element. */
		customChildrenItemStyle?: string;
		/** Inline style applied to the children container (accordion/expanded list, bar row). */
		customChildrenContainerStyle?: string;

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
		selectedVariant,
		gap,
		childrenVariant = variant === 'mobile'
			? 'bottom-sheet'
			: variant === 'vertical'
				? 'accordion'
				: 'bar',
		chevron,
		customContainerStyle,
		customItemStyle,
		customChildrenItemStyle,
		customChildrenContainerStyle,

		// ARIA/アクセシビリティ
		ariaLabel,
		ariaLabelledby
	}: NavProps = $props();

	let resolvedCurrentPath = $state('');
	let navEl: HTMLElement | undefined = $state();
	let subBarEl: HTMLElement | undefined = $state();

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
		});
	});

	// accordion / bar モード: アクティブな親を自動展開
	$effect(() => {
		if ((childrenVariant !== 'accordion' && childrenVariant !== 'bar') || !resolvedCurrentPath)
			return;
		const selected = navItems[selectedIndex];
		const activeParent = navItems.find(
			(item) =>
				(item === selected && !!item.children?.length) ||
				item.children?.some(
					(child) =>
						child.href &&
						matchPath(resolvedCurrentPath, child.href, child, pathPrefix, customPathMatcher)
				)
		);
		expandedParent = activeParent ?? null;
	});

	// =========================================================================
	// Methods
	// =========================================================================
	const focusExpandedParent = () => {
		if (!expandedParent || !navEl) return;
		const idx = navItems.indexOf(expandedParent);
		const parentEls = Array.from(navEl.querySelectorAll<HTMLElement>('[data-nav-item]'));
		parentEls[idx]?.focus();
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		// accordion/expanded は子アイテムも DOM 順で含める
		const includeChildren = childrenVariant === 'accordion' || childrenVariant === 'expanded';
		const selector = includeChildren ? '[data-nav-item], [data-nav-item-child]' : '[data-nav-item]';
		const navItemEls = Array.from(
			(event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>(selector)
		).filter((el) => el.tabIndex !== -1);

		if (navItemEls.length === 0) return;

		const currentIndex = navItemEls.indexOf(event.target as HTMLElement);
		if (currentIndex === -1) return;

		// bar モード: 展開中の親で ArrowDown → サブバーの最初の子へ
		if (childrenVariant === 'bar' && event.key === 'ArrowDown' && showSubBar) {
			const allNavItemEls = Array.from(
				(event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>('[data-nav-item]')
			);
			const expandedEl = allNavItemEls[navItems.indexOf(expandedParent!)];
			if (expandedEl && expandedEl.contains(event.target as Node)) {
				event.preventDefault();
				subBarEl?.querySelector<HTMLElement>('[data-nav-item-child]:not([tabindex="-1"])')?.focus();
				return;
			}
		}

		const isVertical = variant === 'vertical';
		const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
		const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';

		switch (event.key) {
			case prevKey:
				event.preventDefault();
				navItemEls[currentIndex > 0 ? currentIndex - 1 : navItemEls.length - 1]?.focus();
				break;
			case nextKey:
				event.preventDefault();
				navItemEls[currentIndex < navItemEls.length - 1 ? currentIndex + 1 : 0]?.focus();
				break;
			case 'Home':
				event.preventDefault();
				navItemEls[0]?.focus();
				break;
			case 'End':
				event.preventDefault();
				navItemEls[navItemEls.length - 1]?.focus();
				break;
			default:
				return;
		}
	};

	const handleSubBarKeyDown = (event: KeyboardEvent) => {
		const container = event.currentTarget as HTMLElement;
		const items = Array.from(
			container.querySelectorAll<HTMLElement>('[data-nav-item-child]:not([tabindex="-1"])')
		);
		const currentIndex = items.indexOf(event.target as HTMLElement);
		if (currentIndex === -1) return;

		switch (event.key) {
			case 'ArrowLeft':
				event.preventDefault();
				items[currentIndex > 0 ? currentIndex - 1 : items.length - 1]?.focus();
				break;
			case 'ArrowRight':
				event.preventDefault();
				items[currentIndex < items.length - 1 ? currentIndex + 1 : 0]?.focus();
				break;
			case 'ArrowUp':
				event.preventDefault();
				focusExpandedParent();
				break;
			case 'Home':
				event.preventDefault();
				items[0]?.focus();
				break;
			case 'End':
				event.preventDefault();
				items[items.length - 1]?.focus();
				break;
			case 'Escape':
				event.preventDefault();
				focusExpandedParent();
				expandedParent = null;
				break;
		}
	};

	// =========================================================================
	// $derived
	// =========================================================================
	const selectedIndex = $derived.by(() => {
		for (let i = 0; i < navItems.length; i++) {
			const item = navItems[i];
			if (
				item.href &&
				matchPath(resolvedCurrentPath, item.href, item, pathPrefix, customPathMatcher)
			) {
				return i;
			}
			// bar モード: 子が選択されていれば親も選択とみなす
			if (
				childrenVariant === 'bar' &&
				item.children?.some(
					(child) =>
						child.href &&
						matchPath(resolvedCurrentPath, child.href, child, pathPrefix, customPathMatcher)
				)
			) {
				return i;
			}
		}
		return -1;
	});

	const showSubBar = $derived(
		variant === 'horizontal' && childrenVariant === 'bar' && expandedParent != null
	);

	const isChildSelected = (child: MenuItem) =>
		!!child.href &&
		matchPath(resolvedCurrentPath, child.href, child, pathPrefix, customPathMatcher);
</script>

<nav
	class="nav nav--{variant}"
	aria-label={ariaLabelledby ? undefined : ariaLabel}
	aria-labelledby={ariaLabelledby}
	style:--internal-nav-gap={gap != null ? (typeof gap === 'number' ? `${gap}px` : gap) : undefined}
	style={customContainerStyle}
	{id}
	data-testid="nav"
	bind:this={navEl}
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
				{selectedVariant}
				{childrenVariant}
				{chevron}
				customStyle={customItemStyle}
				customChildrenStyle={customChildrenItemStyle}
				{customChildrenContainerStyle}
				{resolvedCurrentPath}
				{customPathMatcher}
				isChildrenVisible={(childrenVariant === 'bar' || childrenVariant === 'accordion') &&
					expandedParent === item}
			/>
		{/each}
	</div>
</nav>

<!-- bar モード: 選択中の親の子アイテムを横バーとして表示 -->
{#if showSubBar && expandedParent?.children}
	<div
		class="nav__children-bar"
		role="menu"
		tabindex="-1"
		style={customChildrenContainerStyle}
		onkeydown={handleSubBarKeyDown}
		bind:this={subBarEl}
	>
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
				{selectedVariant}
				customStyle={customChildrenItemStyle}
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
	.nav__children-bar {
		display: flex;
		flex-direction: row;
		gap: var(--internal-nav-gap, var(--svelte-ui-nav-horizontal-item-gap));
		align-items: center;
		padding-top: var(--svelte-ui-nav-children-offset);
	}
</style>
