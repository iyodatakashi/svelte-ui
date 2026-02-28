<!-- TabItem.svelte -->

<script lang="ts">
	import Icon from './Icon.svelte';
	import type { MenuItem } from '$lib/types/menuItem';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/icon';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type TabItemProps = {
		// 基本プロパティ
		tabItem: MenuItem;
		pathPrefix?: string;

		// スタイル/レイアウト（未指定時は variables の tab 用変数を参照）
		textColor?: string;
		selectedTextColor?: string;
		selectedBarColor?: string;

		// アイコン関連
		iconFilled?: boolean;
		iconWeight?: IconWeight;
		iconGrade?: IconGrade;
		iconOpticalSize?: IconOpticalSize;
		iconVariant?: IconVariant;

		// 状態/動作
		isSelected?: boolean;
		isDisabled?: boolean;
	};

	let {
		// 基本プロパティ
		tabItem,
		pathPrefix = '',

		// スタイル/レイアウト
		textColor,
		selectedTextColor,
		selectedBarColor,

		// アイコン関連
		iconFilled = false,
		iconWeight = 300,
		iconGrade = 0,
		iconOpticalSize = 24,
		iconVariant = 'outlined',

		// 状態/動作
		isSelected = false,
		isDisabled = false
	}: TabItemProps = $props();

	// =========================================================================
	// $derived
	// =========================================================================

	// pathPrefixを付与したhrefを計算
	const hrefWithPrefix = $derived.by(() => {
		if (!tabItem.href) return undefined;
		if (!pathPrefix) return tabItem.href;

		// 既にpathPrefixが含まれている場合はそのまま
		// pathPrefixが完全一致、またはpathPrefix + '/'で始まる場合
		if (tabItem.href === pathPrefix || tabItem.href.startsWith(`${pathPrefix}/`)) {
			return tabItem.href;
		}

		// pathPrefixを付与
		return `${pathPrefix}${tabItem.href.startsWith('/') ? '' : '/'}${tabItem.href}`;
	});

	// 明示的に渡されたときだけ style で上書き。未渡しなら variables の tab 用変数をそのまま参照
	const tabItemStyle = $derived.by(() => {
		const parts: string[] = [];
		if (textColor !== undefined) parts.push(`--svelte-ui-tab-item-text-color: ${textColor}`);
		if (selectedTextColor !== undefined)
			parts.push(`--svelte-ui-tab-item-selected-text-color: ${selectedTextColor}`);
		if (selectedBarColor !== undefined)
			parts.push(`--svelte-ui-tab-item-selected-bar-color: ${selectedBarColor}`);
		return parts.length > 0 ? parts.join('; ') : undefined;
	});
</script>

{#if isDisabled}
	<span
		class="tab-item tab-item--disabled"
		class:tab-item--selected={isSelected}
		style={tabItemStyle}
		role="tab"
		aria-selected={isSelected}
		aria-disabled="true"
		tabindex="-1"
		data-testid="tab-item"
	>
		{#if tabItem.icon}
			<div class="tab-item__icon">
				<Icon
					filled={iconFilled || isSelected}
					weight={iconWeight}
					grade={iconGrade}
					opticalSize={iconOpticalSize}
					variant={iconVariant}>{tabItem.icon}</Icon
				>
			</div>
		{/if}
		{#if tabItem.label}
			<div class="tab-item__label">
				{tabItem.label}
			</div>
		{/if}
	</span>
{:else}
	<a
		href={hrefWithPrefix}
		class="tab-item"
		class:tab-item--selected={isSelected}
		style={tabItemStyle}
		role="tab"
		aria-selected={isSelected}
		tabindex={0}
		data-testid="tab-item"
	>
		{#if tabItem.icon}
			<div class="tab-item__icon">
				<Icon
					filled={iconFilled || isSelected}
					weight={iconWeight}
					grade={iconGrade}
					opticalSize={iconOpticalSize}
					variant={iconVariant}>{tabItem.icon}</Icon
				>
			</div>
		{/if}
		{#if tabItem.label}
			<div class="tab-item__label">
				{tabItem.label}
			</div>
		{/if}
	</a>
{/if}

<style lang="scss">
	.tab-item {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: var(--svelte-ui-tab-item-icon-gap);
		position: relative;
		padding: var(--svelte-ui-tab-item-padding);
		color: var(--svelte-ui-tab-item-text-color);
		white-space: nowrap;
		text-decoration: none;
		transition-property: background-color, color, outline;
		transition-duration: var(--svelte-ui-transition-duration);
		outline: none;
	}

	@media (hover: hover) {
		.tab-item:hover:not(.tab-item--selected) {
			color: var(--svelte-ui-tab-item-selected-text-color);
		}

		.tab-item:hover:not(.tab-item--selected)::before {
			opacity: 1;
		}
	}

	/* キーボードフォーカス時のみ枠線を表示 */
	.tab-item:focus-visible {
		outline: var(--svelte-ui-focus-outline-inner);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner);
	}

	/* フォールバック: :focus-visible未対応ブラウザ用 */
	@supports not selector(:focus-visible) {
		.tab-item:focus {
			outline: var(--svelte-ui-focus-outline-inner);
			outline-offset: var(--svelte-ui-focus-outline-offset-inner);
		}

		.tab-item:focus:not(.tab-item--selected) {
			color: var(--svelte-ui-tab-item-selected-text-color);
		}

		.tab-item:focus:not(.tab-item--selected)::before {
			opacity: 1;
		}
	}

	/* 選択状態のインジケーター */
	.tab-item::before {
		content: '';
		display: block;
		position: absolute;
		left: calc(var(--svelte-ui-tab-item-padding-x) - var(--svelte-ui-tab-item-selected-bar-offset));
		bottom: 0;
		width: calc(100% - 2 * var(--svelte-ui-tab-item-padding-x) + 2 * var(--svelte-ui-tab-item-selected-bar-offset));
		height: var(--svelte-ui-tab-item-selected-bar-height);
		background-color: var(--svelte-ui-tab-item-selected-bar-color);
		border-radius: var(--svelte-ui-tab-item-selected-bar-radius);
		opacity: 0;
		transition-property: opacity;
		transition-duration: var(--svelte-ui-transition-duration);
	}

	.tab-item--selected {
		color: var(--svelte-ui-tab-item-selected-text-color);
		background-color: transparent;
	}

	.tab-item--selected::before {
		opacity: 1;
	}

	.tab-item--disabled {
		opacity: var(--svelte-ui-tab-item-disabled-opacity);
		pointer-events: none;
		cursor: default;
	}

	.tab-item__label {
		text-box-trim: trim-both;
		text-box-edge: cap alphabetic;
	}
</style>
