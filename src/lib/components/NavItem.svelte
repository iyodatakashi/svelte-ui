<!-- NavItem.svelte -->

<script lang="ts">
	import Icon from './Icon.svelte';
	import NavItem from './NavItem.svelte';
	import Popup from './Popup.svelte';
	import { fade, fly, slide } from 'svelte/transition';
	import type { PopupPosition } from '$lib/types/propOptions';
	import type { MenuItem } from '$lib/types/menuItem';
	import type { NavVariant, SubMenuMode } from '$lib/types/propOptions';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/icon';
	import { matchPath } from '$lib/utils/navPath';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type NavItemSelectedStyle = 'color' | 'filled' | 'tonal' | 'underline';

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

		// サブメニュー関連
		/** Sub-menu display mode. @default 'popup' */
		subMenuMode?: SubMenuMode;
		/** When true, this item does not render its own children (prevents infinite recursion). */
		isChild?: boolean;
		/** Current URL path passed from Nav for computing child selected state. */
		resolvedCurrentPath?: string;
		/** Custom function to determine if a child item is active. */
		customPathMatcher?: (currentPath: string, itemHref: string, item: MenuItem) => boolean;
		/** For bar/accordion mode: whether this item's sub-menu is currently expanded. */
		isSubMenuExpanded?: boolean;
		/** For bar/accordion mode: called when this parent is clicked. */
		onSubMenuToggle?: (item: MenuItem) => void;
		/** Called when a leaf item (no children) is clicked — used to close any open sub-menu. */
		onClose?: () => void;
	};

	let {
		// 基本プロパティ
		item,
		variant = 'horizontal',
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
		selectedStyle,

		// サブメニュー関連
		subMenuMode = 'popup',
		isChild = false,
		resolvedCurrentPath = '',
		customPathMatcher,
		isSubMenuExpanded = false,
		onSubMenuToggle,
		onClose
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

	const resolvedSelectedStyle = $derived(
		selectedStyle ?? (variant === 'vertical' || variant === 'horizontal' ? 'tonal' : 'color')
	);

	// isChild=true のアイテムでは children を展開しない（無限再帰防止）
	const hasChildren = $derived(!isChild && !!item.children?.length);

	// 親クリック時の遷移先: 自身の href、なければ最初の子の href
	const resolvedParentHref = $derived(
		hrefWithPrefix ?? (hasChildren && item.children![0].href ? item.children![0].href : undefined)
	);

	// =========================================================================
	// States
	// =========================================================================
	let isSubMenuOpen = $state(false);
	let anchorEl: HTMLElement | undefined = $state();
	let popupRef: Popup | undefined = $state();
	let isPopupOpen = $state(false);

	const popupPosition = $derived<PopupPosition>(
		variant === 'vertical' ? 'right-top' :
		variant === 'mobile' ? 'top-center' :
		'bottom-left'
	);

	const isSubMenuVisible = $derived(
		!hasChildren
			? false
			: subMenuMode === 'expanded'
				? true
				: subMenuMode === 'bottom-sheet'
					? isSubMenuOpen
					: subMenuMode === 'popup'
						? isPopupOpen
						: isSubMenuExpanded
	);

	// chevron は accordion / popup / bottom-sheet モードで表示（expanded・bar・mobile+popup は非表示）
	const showChevron = $derived(
		hasChildren &&
		subMenuMode !== 'expanded' &&
		subMenuMode !== 'bar' &&
		!(variant === 'mobile' && (subMenuMode === 'popup' || subMenuMode === 'bottom-sheet'))
	);

	// popup の方向に合わせたアイコン。それ以外は expand_more
	const chevronIcon = $derived(
		subMenuMode === 'popup' && variant === 'vertical'
			? 'arrow_right'
			: subMenuMode === 'popup' && variant === 'horizontal'
				? 'arrow_drop_down'
				: 'expand_more'
	);

	// popup 専用アイコンは方向固定なので展開時も回転しない
	const chevronRotates = $derived(subMenuMode !== 'popup');


	// =========================================================================
	// Methods
	// =========================================================================
	const toggleSubMenu = () => {
		isSubMenuOpen = !isSubMenuOpen;
	};

	const closeSubMenu = () => {
		isSubMenuOpen = false;
	};

	const handleButtonClick = () => {
		if (subMenuMode === 'bottom-sheet') {
			toggleSubMenu();
		} else if (subMenuMode === 'popup') {
			popupRef?.toggle();
		} else {
			onSubMenuToggle?.(item);
		}
	};

	const handleLinkClick = () => {
		if (subMenuMode === 'popup') {
			popupRef?.toggle();
		} else if (subMenuMode === 'bottom-sheet') {
			toggleSubMenu();
		} else {
			onSubMenuToggle?.(item);
		}
	};

	const isChildSelected = (child: MenuItem) =>
		!!child.href &&
		matchPath(resolvedCurrentPath, child.href, child, pathPrefix, customPathMatcher);
</script>

{#if isDisabled}
	<span
		class="nav-item nav-item--{variant} nav-item--disabled"
		class:nav-item--selected={isSelected}
		class:nav-item--style-color={isSelected && resolvedSelectedStyle === 'color'}
		class:nav-item--style-filled={isSelected && resolvedSelectedStyle === 'filled'}
		class:nav-item--style-tonal={isSelected && resolvedSelectedStyle === 'tonal'}
		class:nav-item--style-underline={resolvedSelectedStyle === 'underline'}
		aria-disabled="true"
		tabindex="-1"
		data-nav-item={!isChild ? '' : undefined}
		data-nav-item-child={isChild ? '' : undefined}
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
{:else if hasChildren}
	<!-- ===================================================================
		 親アイテム（子メニューあり）
	=================================================================== -->
	<div
		class="nav-item__group nav-item__group--{variant}"
		class:nav-item__group--open={isSubMenuVisible}
	>
		{#if hasChildren}
			<!-- accordion / expanded: <a> で遷移 + トグル -->
			<a
				href={resolvedParentHref}
				bind:this={anchorEl}
				class="nav-item nav-item--{variant} nav-item--has-children"
				class:nav-item--selected={isSelected}
				class:nav-item--style-color={isSelected && resolvedSelectedStyle === 'color'}
				class:nav-item--style-filled={isSelected && resolvedSelectedStyle === 'filled'}
				class:nav-item--style-tonal={isSelected && resolvedSelectedStyle === 'tonal'}
				class:nav-item--style-underline={resolvedSelectedStyle === 'underline'}
				aria-current={isSelected ? 'page' : undefined}
				aria-expanded={subMenuMode === 'popup' ? isPopupOpen : isSubMenuExpanded}
				tabindex={0}
				data-nav-item
				data-testid="nav-item"
				onclick={handleLinkClick}
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
				{#if showChevron}
					<div class="nav-item__chevron" class:nav-item__chevron--expanded={chevronRotates && isSubMenuVisible}>
						<Icon weight={iconWeight} grade={iconGrade} opticalSize={iconOpticalSize} variant={iconVariant}
							>{chevronIcon}</Icon
						>
					</div>
				{/if}
			</a>
		{:else}
			<!-- popup / bar / bottom-sheet: <button> でサブメニューのみ開く -->
			<button
				bind:this={anchorEl}
				class="nav-item nav-item--{variant} nav-item--has-children"
				class:nav-item--selected={isSelected}
				class:nav-item--style-color={isSelected && resolvedSelectedStyle === 'color'}
				class:nav-item--style-filled={isSelected && resolvedSelectedStyle === 'filled'}
				class:nav-item--style-tonal={isSelected && resolvedSelectedStyle === 'tonal'}
				class:nav-item--style-underline={resolvedSelectedStyle === 'underline'}
				aria-expanded={subMenuMode === 'bottom-sheet' ? isSubMenuOpen : subMenuMode === 'popup' ? isPopupOpen : isSubMenuExpanded}
				aria-haspopup="menu"
				tabindex={0}
				data-nav-item
				data-testid="nav-item"
				onclick={handleButtonClick}
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
				{#if showChevron}
					<div class="nav-item__chevron" class:nav-item__chevron--expanded={chevronRotates && isSubMenuVisible}>
						<Icon weight={iconWeight} grade={iconGrade} opticalSize={iconOpticalSize} variant={iconVariant}
							>{chevronIcon}</Icon
						>
					</div>
				{/if}
			</button>
		{/if}

		<!-- popup サブメニュー -->
		{#if subMenuMode === 'popup'}
			<Popup
				bind:this={popupRef}
				bind:isOpen={isPopupOpen}
				anchorElement={anchorEl}
				position={popupPosition}
				margin={4}
				mobileFullscreen={false}
				role="menu"
			>
				<div class="nav-item__popup-content">
					{#each item.children! as child}
						<NavItem
							item={child}
							{variant}
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
							onClose={() => popupRef?.close()}
						/>
					{/each}
				</div>
			</Popup>
		{/if}

		<!-- accordion / expanded サブメニュー -->
		{#if (subMenuMode === 'accordion' || subMenuMode === 'expanded') && isSubMenuVisible}
			<div class="nav-item__children" transition:slide={{ duration: 200 }}>
				{#each item.children! as child}
					<NavItem
						item={child}
						{variant}
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

		<!-- bottom-sheet オーバーレイ -->
		{#if subMenuMode === 'bottom-sheet' && isSubMenuOpen}
			<div
				class="nav-item__bottom-sheet-backdrop"
				role="presentation"
				onclick={closeSubMenu}
				transition:fade={{ duration: 200 }}
			></div>
			<div
				class="nav-item__bottom-sheet"
				role="menu"
				transition:fly={{ y: 100, duration: 250 }}
			>
				{#each item.children! as child}
					<NavItem
						item={child}
						{variant}
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
						onClose={closeSubMenu}
					/>
				{/each}
			</div>
		{/if}
	</div>
{:else}
	<!-- ===================================================================
		 通常アイテム（子メニューなし）
	=================================================================== -->
	<a
		href={hrefWithPrefix}
		class="nav-item nav-item--{variant}"
		class:nav-item--selected={isSelected}
		class:nav-item--style-color={isSelected && resolvedSelectedStyle === 'color'}
		class:nav-item--style-filled={isSelected && resolvedSelectedStyle === 'filled'}
		class:nav-item--style-tonal={isSelected && resolvedSelectedStyle === 'tonal'}
		class:nav-item--style-underline={resolvedSelectedStyle === 'underline'}
		aria-current={isSelected ? 'page' : undefined}
		tabindex={0}
		data-nav-item={!isChild ? '' : undefined}
		data-nav-item-child={isChild ? '' : undefined}
		data-testid="nav-item"
		onclick={onClose}
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

	// button リセット（<button> を <a> と同じ見た目にする）
	button.nav-item {
		background: none;
		border: none;
		font: inherit;
		text-align: left;
		width: 100%;
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
		white-space: normal;
		word-break: break-word;
		line-height: var(--svelte-ui-nav-item-label-line-height);
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

	// underline モード（tab エイリアス含む）: tab と同じ padding・センタリング・角丸なし
	.nav-item--horizontal.nav-item--style-underline {
		padding: var(--svelte-ui-tab-item-padding);
		justify-content: center;
		border-radius: 0;
		color: var(--svelte-ui-tab-item-text-color);
	}

	.nav-item--horizontal::after {
		border-radius: var(--svelte-ui-nav-item-border-radius);
	}

	.nav-item--horizontal.nav-item--style-underline::after {
		border-radius: 0;
	}

	@media (hover: hover) {
		.nav-item--horizontal:not(.nav-item--style-underline):hover::after {
			opacity: 1;
		}

		.nav-item--horizontal.nav-item--style-underline:hover {
			color: var(--svelte-ui-tab-item-selected-text-color);
		}

		.nav-item--horizontal.nav-item--style-underline:hover::before {
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

	// underline: 選択時のテキストカラー変更
	.nav-item--horizontal.nav-item--style-underline.nav-item--selected {
		color: var(--svelte-ui-tab-item-selected-text-color);
	}

	// underline: 下線バーの基本設定（常時 opacity: 0、選択・hover で表示）
	.nav-item--horizontal.nav-item--style-underline::before {
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		left: calc(var(--svelte-ui-tab-item-padding-x) - var(--svelte-ui-tab-item-selected-bar-offset));
		width: calc(100% - 2 * var(--svelte-ui-tab-item-padding-x) + 2 * var(--svelte-ui-tab-item-selected-bar-offset));
		height: var(--svelte-ui-tab-item-selected-bar-height);
		background-color: var(--svelte-ui-tab-item-selected-bar-color);
		border-radius: var(--svelte-ui-tab-item-selected-bar-radius);
		opacity: 0;
		transition-property: opacity;
		transition-duration: var(--svelte-ui-transition-duration);
	}

	.nav-item--horizontal.nav-item--style-underline.nav-item--selected::before {
		opacity: 1;
	}

	// =========================================================================
	// ラベル・アイコン・シェブロン
	// =========================================================================
	.nav-item__label {
		text-box-trim: trim-both;
		text-box-edge: cap alphabetic;
		line-height: var(--svelte-ui-nav-item-label-line-height);
	}

	.nav-item--mobile .nav-item__label {
		text-align: center;
	}

	.nav-item__chevron {
		display: flex;
		align-items: center;
		margin-left: auto;
		flex-shrink: 0;
		transition: transform var(--svelte-ui-transition-duration);
	}

	.nav-item--horizontal .nav-item__chevron,
	.nav-item--mobile .nav-item__chevron {
		margin-left: 2px;
	}

	.nav-item__chevron--expanded {
		transform: rotate(180deg);
	}

	// =========================================================================
	// 親アイテムラッパー
	// =========================================================================
	.nav-item__group {
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.nav-item__group--vertical {
		width: 100%;
	}

	.nav-item__group--mobile {
		flex: 1;
		flex-direction: column;
	}

	// =========================================================================
	// popup サブメニュー
	// =========================================================================
	// popup 内コンテンツ
	.nav-item__popup-content {
		min-width: var(--svelte-ui-nav-sub-popup-min-width);
		display: flex;
		flex-direction: column;
		padding: 4px 0;
	}

	// =========================================================================
	// accordion / expanded サブメニュー
	// =========================================================================
	.nav-item__children {
		display: flex;
		flex-direction: column;
		padding-top: var(--internal-nav-gap, var(--svelte-ui-nav-vertical-item-gap));
		padding-left: var(--svelte-ui-nav-item-child-indent);
		gap: var(--internal-nav-gap, var(--svelte-ui-nav-vertical-item-gap));
		overflow: hidden;
	}

	// =========================================================================
	// bottom-sheet オーバーレイ（mobile バリアント）
	// =========================================================================
	.nav-item__bottom-sheet-backdrop {
		position: fixed;
		inset: 0;
		z-index: 1000;
		background-color: var(--svelte-ui-nav-bottom-sheet-overlay-bg);
	}

	.nav-item__bottom-sheet {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1001;
		background-color: var(--svelte-ui-surface-color);
		border-radius: var(--svelte-ui-nav-bottom-sheet-border-radius);
		padding: var(--svelte-ui-nav-bottom-sheet-padding);
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
</style>
