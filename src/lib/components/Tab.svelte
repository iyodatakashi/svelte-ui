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
		/** `tabItems` のエイリアス。両方指定された場合は `tabItems` が優先。 */
		items?: MenuItem[];
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
		/** Inline style applied to the tab container element. */
		customContainerStyle?: string;
		/** Inline style applied to each tab item element. */
		customItemStyle?: string;
		/** Inline style applied to the children container. */
		customChildrenContainerStyle?: string;
		/** Inline style applied to each child item element. */
		customChildrenItemStyle?: string;

		// ARIA/アクセシビリティ
		ariaLabel?: string;
		ariaLabelledby?: string;
	};

	let {
		// 基本プロパティ
		tabItems: tabItemsProp,
		items: itemsAlias,
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
		customContainerStyle,
		customItemStyle,
		customChildrenContainerStyle,
		customChildrenItemStyle,

		// ARIA/アクセシビリティ
		ariaLabel = 'Tabs',
		ariaLabelledby
	}: TabProps = $props();

	// tabItems（正式名）を優先し、items（エイリアス）へフォールバック
	const tabItems = $derived<MenuItem[]>(tabItemsProp ?? itemsAlias ?? []);
</script>

<div class="tab" data-testid="tab">
	<Nav
		navItems={tabItems}
		variant="horizontal"
		selectedVariant="underline"
		{pathPrefix}
		{customPathMatcher}
		{currentPath}
		{id}
		{iconFilled}
		{iconWeight}
		{iconGrade}
		{iconOpticalSize}
		{iconVariant}
		{textColor}
		{selectedTextColor}
		{selectedBarColor}
		{customContainerStyle}
		{customItemStyle}
		{customChildrenContainerStyle}
		{customChildrenItemStyle}
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
