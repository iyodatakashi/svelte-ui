<!-- NavItem.svelte -->

<script lang="ts">
	import Icon from './Icon.svelte';
	import type { MenuItem } from '$lib/types/menuItem';
	import type { NavVariant } from '$lib/types/propOptions';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/icon';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type NavItemSelectedStyle = 'color' | 'filled' | 'tonal';

	export type NavItemProps = {
		// 基本プロパティ
		item: MenuItem;
		variant?: NavVariant;
		pathPrefix?: string;

		// アイコン関連
		iconFilled?: boolean;
		iconWeight?: IconWeight;
		iconGrade?: IconGrade;
		iconOpticalSize?: IconOpticalSize;
		iconVariant?: IconVariant;

		// 状態/動作
		isSelected?: boolean;
		isDisabled?: boolean;
		selectedStyle?: NavItemSelectedStyle;
	};

	let {
		// 基本プロパティ
		item,
		variant = 'tab',
		pathPrefix = '',

		// アイコン関連
		iconFilled = false,
		iconWeight = 300,
		iconGrade = 0,
		iconOpticalSize = 24,
		iconVariant = 'outlined',

		// 状態/動作
		isSelected = false,
		isDisabled = false,
		selectedStyle
	}: NavItemProps = $props();

	// =========================================================================
	// $derived
	// =========================================================================
	const hrefWithPrefix = $derived.by(() => {
		if (!item.href) return undefined;
		if (!pathPrefix) return item.href;
		if (item.href === pathPrefix || item.href.startsWith(`${pathPrefix}/`)) return item.href;
		return `${pathPrefix}${item.href.startsWith('/') ? '' : '/'}${item.href}`;
	});

	const isTabVariant = $derived(variant === 'tab');

	// selectedStyle 未指定時のバリアント別デフォルト
	const resolvedSelectedStyle = $derived(
		selectedStyle ?? (variant === 'vertical' || variant === 'horizontal' ? 'tonal' : 'color')
	);
</script>

{#if isDisabled}
	<span
		class="nav-item nav-item--{variant} nav-item--disabled"
		class:nav-item--selected={isSelected}
		class:nav-item--style-color={isSelected && resolvedSelectedStyle === 'color'}
		class:nav-item--style-filled={isSelected && resolvedSelectedStyle === 'filled'}
		class:nav-item--style-tonal={isSelected && resolvedSelectedStyle === 'tonal'}
		role={isTabVariant ? 'tab' : undefined}
		aria-selected={isTabVariant ? isSelected : undefined}
		aria-disabled="true"
		tabindex="-1"
		data-nav-item
		data-testid="nav-item"
	>
		{#if item.icon}
			<div class="nav-item__icon">
				<Icon
					filled={iconFilled || isSelected}
					weight={iconWeight}
					grade={iconGrade}
					opticalSize={iconOpticalSize}
					variant={iconVariant}>{item.icon}</Icon
				>
			</div>
		{/if}
		{#if item.label}
			<div class="nav-item__label">{item.label}</div>
		{/if}
	</span>
{:else}
	<a
		href={hrefWithPrefix}
		class="nav-item nav-item--{variant}"
		class:nav-item--selected={isSelected}
		class:nav-item--style-color={isSelected && resolvedSelectedStyle === 'color'}
		class:nav-item--style-filled={isSelected && resolvedSelectedStyle === 'filled'}
		class:nav-item--style-tonal={isSelected && resolvedSelectedStyle === 'tonal'}
		role={isTabVariant ? 'tab' : undefined}
		aria-selected={isTabVariant ? isSelected : undefined}
		aria-current={!isTabVariant && isSelected ? 'page' : undefined}
		tabindex={0}
		data-nav-item
		data-testid="nav-item"
	>
		{#if item.icon}
			<div class="nav-item__icon">
				<Icon
					filled={iconFilled || isSelected}
					weight={iconWeight}
					grade={iconGrade}
					opticalSize={iconOpticalSize}
					variant={iconVariant}>{item.icon}</Icon
				>
			</div>
		{/if}
		{#if item.label}
			<div class="nav-item__label">{item.label}</div>
		{/if}
	</a>
{/if}

<style lang="scss">
	// =========================================================================
	// 共通スタイル
	// =========================================================================
	.nav-item {
		display: flex;
		align-items: center;
		gap: var(--svelte-ui-nav-item-icon-gap);
		position: relative;
		color: var(--svelte-ui-nav-item-text-color);
		white-space: nowrap;
		text-decoration: none;
		cursor: pointer;
		outline: none;
		transition-property: background-color, color, outline;
		transition-duration: var(--svelte-ui-transition-duration);
		box-sizing: border-box;
	}

	// hover overlay（Button と同じ疑似要素方式）
	// tab の ::before は下線バーで使用中のため ::after を使用
	.nav-item::after {
		content: '';
		position: absolute;
		inset: 0;
		background-color: var(--svelte-ui-hover-overlay);
		opacity: 0;
		pointer-events: none;
		transition-property: opacity;
		transition-duration: var(--svelte-ui-transition-duration);
	}

	.nav-item--disabled {
		opacity: var(--svelte-ui-nav-item-disabled-opacity);
		pointer-events: none;
		cursor: default;
	}

	.nav-item:focus-visible {
		outline: var(--svelte-ui-focus-outline-inner);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner);
	}

	@supports not selector(:focus-visible) {
		.nav-item:focus {
			outline: var(--svelte-ui-focus-outline-inner);
			outline-offset: var(--svelte-ui-focus-outline-offset-inner);
		}
	}

	// =========================================================================
	// tab バリアント（TabItem と同様のスタイル）
	// =========================================================================
	.nav-item--tab {
		justify-content: center;
		padding: var(--svelte-ui-tab-item-padding);
		min-height: var(--svelte-ui-nav-item-min-height);
		color: var(--svelte-ui-tab-item-text-color);
	}

	@media (hover: hover) {
		.nav-item--tab:hover {
			color: var(--svelte-ui-tab-item-selected-text-color);
		}

		.nav-item--tab:hover::before {
			opacity: 1;
		}
	}

	// 選択インジケーター（下線バー）
	.nav-item--tab::before {
		content: '';
		display: block;
		position: absolute;
		left: calc(
			var(--svelte-ui-tab-item-padding-x) - var(--svelte-ui-tab-item-selected-bar-offset)
		);
		bottom: 0;
		width: calc(
			100% - 2 * var(--svelte-ui-tab-item-padding-x) + 2 *
				var(--svelte-ui-tab-item-selected-bar-offset)
		);
		height: var(--svelte-ui-tab-item-selected-bar-height);
		background-color: var(--svelte-ui-tab-item-selected-bar-color);
		border-radius: var(--svelte-ui-tab-item-selected-bar-radius);
		opacity: 0;
		transition-property: opacity;
		transition-duration: var(--svelte-ui-transition-duration);
	}

	.nav-item--tab.nav-item--selected::before {
		opacity: 1;
	}

	// =========================================================================
	// mobile バリアント（アイコンが上、ラベルが下）
	// =========================================================================
	.nav-item--mobile {
		flex-direction: column;
		justify-content: center;
		flex: 1;
		padding: var(--svelte-ui-nav-mobile-item-padding);
		height: var(--svelte-ui-nav-mobile-min-height);
		font-size: var(--svelte-ui-nav-mobile-item-font-size);
		gap: var(--svelte-ui-nav-mobile-item-icon-gap);
	}



	// =========================================================================
	// vertical バリアント（縦並び、左バーインジケーター）
	// =========================================================================
	.nav-item--vertical {
		width: 100%;
		padding: var(--svelte-ui-nav-item-padding);
		min-height: var(--svelte-ui-nav-item-min-height);
		border-radius: var(--svelte-ui-nav-item-border-radius);
	}

	.nav-item--vertical::after {
		border-radius: var(--svelte-ui-nav-item-border-radius);
	}

	@media (hover: hover) {
		.nav-item--vertical:hover::after {
			opacity: 1;
		}
	}


	// =========================================================================
	// horizontal バリアント（横並び、背景ハイライト）
	// =========================================================================
	.nav-item--horizontal {
		padding: var(--svelte-ui-nav-item-padding);
		min-height: var(--svelte-ui-nav-item-min-height);
		border-radius: var(--svelte-ui-nav-item-border-radius);
	}

	.nav-item--horizontal::after {
		border-radius: var(--svelte-ui-nav-item-border-radius);
	}

	@media (hover: hover) {
		.nav-item--horizontal:hover::after {
			opacity: 1;
		}
	}


	// =========================================================================
	// selectedStyle: 選択状態の表示バリアント
	// =========================================================================

	// color: テキスト・アイコンを primary-color に
	.nav-item--style-color {
		color: var(--svelte-ui-nav-item-selected-text-color);
	}

	// tab バリアントは tab 用カラー変数を使用
	.nav-item--tab.nav-item--style-color {
		color: var(--svelte-ui-tab-item-selected-text-color);
		background-color: transparent;
	}

	// filled: 背景を primary-color に
	.nav-item--style-filled {
		background-color: var(--svelte-ui-primary-color);
		color: var(--svelte-ui-nav-item-filled-text-color);
	}

	// tonal: 背景を primary-color の薄いティントに
	.nav-item--style-tonal {
		background-color: var(--svelte-ui-nav-item-tonal-bg-color);
		color: var(--svelte-ui-nav-item-selected-text-color);
	}

	// =========================================================================
	// ラベル・アイコン
	// =========================================================================
	.nav-item__label {
		text-box-trim: trim-both;
		text-box-edge: cap alphabetic;
	}

	.nav-item--mobile .nav-item__label {
		text-align: center;
	}
</style>
