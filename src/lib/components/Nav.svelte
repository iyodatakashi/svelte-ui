<!-- Nav.svelte -->

<script lang="ts">
	import NavItem from './NavItem.svelte';
	import type { NavItemSelectedStyle } from './NavItem.svelte';
	import type { MenuItem } from '$lib/types/menuItem';
	import type { NavVariant } from '$lib/types/propOptions';
	import { subscribeUrlChange } from '$lib/utils/urlChange';
	import { getCurrentPath, matchPath } from '$lib/utils/navPath';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/icon';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type NavProps = {
		// 基本プロパティ
		navItems?: MenuItem[];
		variant?: NavVariant;
		pathPrefix?: string;
		customPathMatcher?: (currentPath: string, itemHref: string, item: MenuItem) => boolean;
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
		selectedStyle?: NavItemSelectedStyle;
		gap?: number | string;

		// ARIA/アクセシビリティ
		ariaLabel?: string;
		ariaLabelledby?: string;
	};

	let {
		// 基本プロパティ
		navItems = [],
		variant = 'tab',
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

		// ARIA/アクセシビリティ
		ariaLabel,
		ariaLabelledby
	}: NavProps = $props();

	let resolvedCurrentPath = $state('');

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

	// =========================================================================
	// $derived
	// =========================================================================
	const selectedIndex = $derived.by(() => {
		for (let i = 0; i < navItems.length; i++) {
			const item = navItems[i];
			if (!item.href) continue;
			if (matchPath(resolvedCurrentPath, item.href, item, pathPrefix, customPathMatcher)) {
				return i;
			}
		}
		return -1;
	});

	const enabledIndices = $derived(
		navItems.map((item, i) => (item.disabled ? -1 : i)).filter((i) => i >= 0)
	);

	const isTabVariant = $derived(variant === 'tab');
</script>

<nav
	class="nav nav--{variant}"
	role={isTabVariant ? 'tablist' : undefined}
	aria-label={ariaLabelledby ? undefined : ariaLabel}
	aria-labelledby={ariaLabelledby}
	aria-orientation={variant === 'vertical' ? 'vertical' : 'horizontal'}
	style:--internal-nav-gap={gap != null ? (typeof gap === 'number' ? `${gap}px` : gap) : undefined}
	tabindex="-1"
	{id}
	onkeydown={handleKeyDown}
	data-testid="nav"
>
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
		/>
	{/each}
</nav>

<style lang="scss">
	.nav {
		display: flex;
		box-sizing: border-box;
	}

	// tab バリアント（現行 Tab と同様）
	.nav--tab {
		flex-direction: row;
		justify-content: start;
		position: relative;
		width: 100%;
		height: 100%;
		min-height: var(--svelte-ui-tab-min-height);
		overflow-x: auto;
		overflow-y: visible;
		-ms-overflow-style: none;
		overscroll-behavior: contain;
	}

	.nav--tab::-webkit-scrollbar {
		display: none;
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

	// horizontal バリアント
	.nav--horizontal {
		flex-direction: row;
		gap: var(--internal-nav-gap, var(--svelte-ui-nav-horizontal-item-gap));
		align-items: center;
	}
</style>
