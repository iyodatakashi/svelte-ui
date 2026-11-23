<!-- Tab.svelte -->

<script lang="ts">
	import Nav from './Nav.svelte';
	import type { MenuItem } from '#lib/models/menu/menu.types';
	import type { TabProps } from '#lib/models/tab/tab.types';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================

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
	@use '#lib/assets/styles/component-base' as base;

	@include base.box-sizing;

	.tab {
		min-height: var(--svelte-ui-tab-min-height);
		width: 100%;
		box-sizing: border-box;
	}
</style>
