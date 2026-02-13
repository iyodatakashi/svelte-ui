<!-- PopupMenu.svelte -->

<script lang="ts">
	import Popup from './Popup.svelte';
	import Icon from './Icon.svelte';
	import type { MenuItem } from '$lib/types/menuItem';

	import type { SvelteComponent } from 'svelte';
	import { tick } from 'svelte';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/icon';
	import type { PopupPosition } from '$lib/types/propOptions';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type PopupMenuProps = {
		isOpen?: boolean;
		anchorElement: HTMLElement | null | undefined;
		position?: PopupPosition;
		menuItems: (MenuItem | 'separator')[];
		id?: string;
		ariaLabel?: string;
		mobileFullscreen?: boolean;
		iconFilled?: boolean;
		iconWeight?: IconWeight;
		iconGrade?: IconGrade;
		iconOpticalSize?: IconOpticalSize;
		iconVariant?: IconVariant;
	};

	let {
		// DOM参照
		anchorElement,

		// 基本プロパティ
		menuItems,

		// HTML属性
		id,

		// スタイル/レイアウト
		position = 'bottom',

		// 状態/動作
		isOpen = $bindable(false),
		mobileFullscreen = true,

		// アイコン関連
		iconFilled = false,
		iconWeight = 300,
		iconGrade = 0,
		iconOpticalSize = 24,
		iconVariant = 'outlined',

		// ARIA/アクセシビリティ
		ariaLabel = 'Menu'
	}: PopupMenuProps = $props();

	let popupRef: SvelteComponent | undefined = $state();
	let menuContainerRef: HTMLDivElement | undefined = $state();
	let menuItemRefs: HTMLElement[] = $state([]);
	let activeIndex: number = $state(-1);
	let menuId: string = $state(`menu-${Math.random().toString(36).substring(2, 15)}`);

	// =========================================================================
	// Methods
	// =========================================================================
	const getMenuItemId = (index: number): string => `${menuId}-item-${index}`;

	const executeMenuItem = (item: MenuItem, event?: MouseEvent) => {
		event?.stopPropagation();
		event?.preventDefault();
		if (item.callback) {
			item.callback();
		}
		close();
	};

	const handleKeyDown = async (event: KeyboardEvent) => {
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				moveToNextItem();
				break;
			case 'ArrowUp':
				event.preventDefault();
				moveToPreviousItem();
				break;
			case 'Home':
				event.preventDefault();
				moveToFirstItem();
				break;
			case 'End':
				event.preventDefault();
				moveToLastItem();
				break;
			case 'Enter':
			case ' ':
				event.preventDefault();
				if (activeIndex >= 0 && activeIndex < actionableItems.length) {
					executeMenuItem(actionableItems[activeIndex].item);
				}
				break;
			case 'Escape':
				event.preventDefault();
				close();
				break;
			case 'Tab':
				close();
				break;
		}
	};

	const moveToNextItem = () => {
		if (actionableItems.length === 0) return;
		activeIndex = activeIndex < actionableItems.length - 1 ? activeIndex + 1 : 0;
		focusActiveItem();
	};

	const moveToPreviousItem = () => {
		if (actionableItems.length === 0) return;
		activeIndex = activeIndex > 0 ? activeIndex - 1 : actionableItems.length - 1;
		focusActiveItem();
	};

	const moveToFirstItem = () => {
		if (actionableItems.length === 0) return;
		activeIndex = 0;
		focusActiveItem();
	};

	const moveToLastItem = () => {
		if (actionableItems.length === 0) return;
		activeIndex = actionableItems.length - 1;
		focusActiveItem();
	};

	const focusActiveItem = async () => {
		await tick();
		if (activeIndex >= 0 && activeIndex < menuItemRefs.length) {
			menuItemRefs[activeIndex]?.focus();
		}
	};

	const handleMouseEnter = (index: number) => {
		activeIndex = index;
	};

	const handleFocus = (index: number) => {
		activeIndex = index;
	};

	const announceMenuOpened = () => {
		const announcement = document.createElement('div');
		announcement.setAttribute('aria-live', 'polite');
		announcement.setAttribute('aria-atomic', 'true');
		announcement.className = 'sr-only';
		announcement.textContent = `${ariaLabel} opened with ${actionableItems.length} items`;
		document.body.appendChild(announcement);

		setTimeout(() => {
			document.body.removeChild(announcement);
		}, 1000);
	};

	const handlePopupOpen = () => {
		activeIndex = 0;
		tick().then(() => {
			menuContainerRef?.focus();
		});

		document.addEventListener('keydown', handleKeyDown);
		announceMenuOpened();
	};

	const handlePopupClose = () => {
		activeIndex = -1;
		document.removeEventListener('keydown', handleKeyDown);

		if (anchorElement) {
			anchorElement.focus();
		}
	};

	export const open = () => {
		popupRef?.open();
	};

	export const close = () => {
		popupRef?.close();
	};

	export const toggle = () => {
		popupRef?.toggle();
	};

	const cancelParentEvent = (event: Event) => {
		event.stopPropagation();
		if (event.cancelable) {
			event.preventDefault();
		}
	};

	// =========================================================================
	// $derived
	// =========================================================================
	const actionableItems: { item: MenuItem; originalIndex: number }[] = $derived(
		menuItems
			.map((item, index) => ({ item, originalIndex: index }))
			.filter(
				(entry): entry is { item: MenuItem; originalIndex: number } => entry.item !== 'separator'
			)
	);
</script>

<Popup
	bind:this={popupRef}
	bind:isOpen
	{anchorElement}
	{position}
	onOpen={handlePopupOpen}
	onClose={handlePopupClose}
	role="menu"
	{mobileFullscreen}
	id={id ? `${id}-popup` : undefined}
>
	<div
		class="popup-menu"
		bind:this={menuContainerRef}
		role="menu"
		aria-label={ariaLabel}
		aria-activedescendant={activeIndex >= 0 ? getMenuItemId(activeIndex) : undefined}
		tabindex="-1"
		{id}
		onclick={cancelParentEvent}
		onkeydown={cancelParentEvent}
	>
		<ul class="popup-menu__list" role="none">
			{#each menuItems as item, index}
				<li class="popup-menu__item" role="none">
					{#if item === 'separator'}
						<div class="popup-menu__separator" role="separator" aria-orientation="horizontal"></div>
					{:else}
						{@const actionableIndex = actionableItems.findIndex((ai) => ai.originalIndex === index)}
						{@const isActive = actionableIndex === activeIndex}
						{#if item.href}
							<a
								bind:this={menuItemRefs[actionableIndex]}
								id={getMenuItemId(actionableIndex)}
								class="popup-menu__button"
								class:popup-menu__button--active={isActive}
								role="menuitem"
								tabindex="-1"
								aria-describedby={item.icon ? `${getMenuItemId(actionableIndex)}-icon` : undefined}
								href={item.href}
								onclick={(e) => executeMenuItem(item, e)}
								onmouseenter={() => handleMouseEnter(actionableIndex)}
								onfocus={() => handleFocus(actionableIndex)}
							>
								{#if item.icon}
									<Icon
										id="{getMenuItemId(actionableIndex)}-icon"
										aria-hidden="true"
										filled={iconFilled}
										weight={iconWeight}
										grade={iconGrade}
										opticalSize={iconOpticalSize}
										variant={iconVariant}
									>
										{item.icon}
									</Icon>
								{/if}
								<span class="popup-menu__text">{item.label}</span>
							</a>
						{:else}
							<button
								bind:this={menuItemRefs[actionableIndex]}
								id={getMenuItemId(actionableIndex)}
								class="popup-menu__button"
								class:popup-menu__button--active={isActive}
								role="menuitem"
								tabindex="-1"
								aria-describedby={item.icon ? `${getMenuItemId(actionableIndex)}-icon` : undefined}
								onclick={(e) => executeMenuItem(item, e)}
								onmouseenter={() => handleMouseEnter(actionableIndex)}
								onfocus={() => handleFocus(actionableIndex)}
							>
								{#if item.icon}
									<Icon
										id="{getMenuItemId(actionableIndex)}-icon"
										aria-hidden="true"
										filled={iconFilled}
										weight={iconWeight}
										grade={iconGrade}
										opticalSize={iconOpticalSize}
										variant={iconVariant}
									>
										{item.icon}
									</Icon>
								{/if}
								<span class="popup-menu__text">{item.label}</span>
							</button>
						{/if}
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</Popup>

<style lang="scss">
	.popup-menu {
		background-color: var(--svelte-ui-surface-color);
		border-radius: 4px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
		outline: none;
		min-width: 160px;
	}

	.popup-menu__list {
		padding: 8px 0;
		margin: 0;
		list-style: none;
	}

	.popup-menu__item {
		margin: 0;
	}

	.popup-menu__button {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 8px 16px;
		background: transparent;
		border: none;
		font-size: 1rem;
		color: var(--svelte-ui-popupmenu-text-color);
		text-align: left;
		white-space: nowrap;
		cursor: pointer;
		transition: background-color 0.2s ease;
		border-radius: 0;
	}

	@media (hover: hover) {
		.popup-menu__button:hover,
		.popup-menu__button--active {
			background-color: var(--svelte-ui-hover-overlay);
			outline: none;
		}
	}

	.popup-menu__button--active {
		background-color: var(--svelte-ui-hover-overlay);
		outline: none;
	}

	.popup-menu__button:focus-visible {
		background-color: var(--svelte-ui-hover-overlay);
		outline: 2px solid var(--svelte-ui-popupmenu-focus-color);
		outline-offset: -2px;
	}

	.popup-menu__text {
		flex: 1;
	}

	.popup-menu__separator {
		height: 0;
		margin: 8px 0;
		border-bottom: solid 1px var(--svelte-ui-border-color);
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.popup-menu__button {
			transition: none;
		}
	}

	/* Mobile touch target optimization */
	@media (max-width: 768px) {
		.popup-menu__button {
			min-height: var(--svelte-ui-touch-target);
			padding: 12px 16px;
		}
	}

	/* Enhanced mobile menu spacing (layoutはPopup側に任せる) */
	:global(.popup--fullscreen) .popup-menu__list {
		padding: 16px 0;
	}

	:global(.popup--fullscreen) .popup-menu__button {
		padding: 16px 24px;
		font-size: 1.1rem;
		min-height: var(--svelte-ui-touch-target-lg);
	}
</style>
