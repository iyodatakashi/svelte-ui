<!-- Tab.svelte -->

<script lang="ts">
	import Nav from './Nav.svelte';
	import type { MenuItem } from '$lib/types/menuItem';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/icon';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type TabProps = {
		// 基本プロパティ
		/** `{ label, href, icon?, disabled? }[]` */
		tabItems?: MenuItem[];
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
		/** Custom CSS color for tab labels. */
		textColor?: string;
		/** Custom CSS color for the active tab label. */
		selectedTextColor?: string;
		/** Custom CSS color for the active tab indicator bar. */
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

		// HTML属性
		id,

		// アイコン関連
		iconFilled = false,
		iconWeight = 300,
		iconGrade = 0,
		iconOpticalSize = 24,
		iconVariant = 'outlined',

		// スタイル/レイアウト
		textColor,
		selectedTextColor,
		selectedBarColor,

		// ARIA/アクセシビリティ
		ariaLabel = 'Tabs',
		ariaLabelledby
	}: TabProps = $props();
</script>

<div
	class="tab"
	style:--svelte-ui-nav-item-underline-text-color={textColor}
	style:--svelte-ui-nav-item-underline-selected-text-color={selectedTextColor}
	style:--svelte-ui-nav-item-underline-bar-color={selectedBarColor}
	data-testid="tab"
>
	<Nav
		navItems={tabItems}
		variant="horizontal"
		selectedStyle="underline"
		{pathPrefix}
		{customPathMatcher}
		{currentPath}
		{id}
		{iconFilled}
		{iconWeight}
		{iconGrade}
		{iconOpticalSize}
		{iconVariant}
		{ariaLabel}
		{ariaLabelledby}
	/>
</div>

<style lang="scss">
	.tab {
		min-height: var(--svelte-ui-tab-min-height);
		width: 100%;
		box-sizing: border-box;
	}
</style>
