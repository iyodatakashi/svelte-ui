<!-- PopupMenu.svelte -->

<script lang="ts">
	import Popup from './Popup.svelte';
	import Icon from './Icon.svelte';
	import type { MenuItem } from '../types/MenuItem';
	import type { SvelteComponent } from 'svelte';
	import { tick } from 'svelte';

	// ブラウザ標準APIを使用したナビゲーション関数
	const goto = (url: string) => {
		if (typeof window !== 'undefined') {
			window.location.href = url;
		}
	};

	let {
		isOpen = $bindable(false),
		anchorElement,
		position = 'bottom',
		menuItems,
		ariaLabel = 'Menu',
		mobileFullscreen = true,

		mobileBehavior = 'auto',
		iconFilled = false,
		iconWeight = 300,
		iconGrade = 0,
		iconOpticalSize = null,
		iconVariant = 'outlined'
	}: {
		isOpen?: boolean;
		anchorElement: HTMLElement;
		position?:
			| 'top'
			| 'bottom'
			| 'left'
			| 'right'
			| 'top-left'
			| 'top-center'
			| 'top-right'
			| 'bottom-left'
			| 'bottom-center'
			| 'bottom-right'
			| 'left-top'
			| 'left-center'
			| 'left-bottom'
			| 'right-top'
			| 'right-center'
			| 'right-bottom'
			| 'auto';
		menuItems: (MenuItem | 'separator')[];
		ariaLabel?: string;
		mobileFullscreen?: boolean;

		mobileBehavior?: 'auto' | 'fullscreen' | 'popup';
		iconFilled?: boolean;
		iconWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
		iconGrade?: number;
		iconOpticalSize?: number | null;
		iconVariant?: 'outlined' | 'filled' | 'rounded' | 'sharp';
	} = $props();

	// 変数定義
	let popupRef: SvelteComponent | undefined = $state();
	let menuContainerRef: HTMLDivElement | undefined = $state();
	let menuItemRefs: HTMLButtonElement[] = $state([]);
	let activeIndex: number = $state(-1);
	let menuId: string = $state(`menu-${Math.random().toString(36).substring(2, 15)}`);

	// $derived
	// Filter out separators to get only actionable items
	const actionableItems: { item: MenuItem; originalIndex: number }[] = $derived(
		menuItems
			.map((item, index) => ({ item, originalIndex: index }))
			.filter(
				(entry): entry is { item: MenuItem; originalIndex: number } => entry.item !== 'separator'
			)
	);

	// ライフサイクルフック
	// (現在は使用していない)

	// $effect
	// (現在は使用していない)

	// メソッド
	// Generate unique IDs for menu items
	const getMenuItemId = (index: number): string => `${menuId}-item-${index}`;

	const handleClick = (event: MouseEvent, item: MenuItem | 'separator') => {
		event.preventDefault();
		event.stopPropagation();
		if (item === 'separator') return;

		executeMenuItem(item as MenuItem);
	};

	const executeMenuItem = (item: MenuItem) => {
		if (item.href) {
			goto(`${item.href}`);
		}
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
				// Allow tab to close the menu and move focus naturally
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
		// Create a temporary announcement for screen readers
		const announcement = document.createElement('div');
		announcement.setAttribute('aria-live', 'polite');
		announcement.setAttribute('aria-atomic', 'true');
		announcement.className = 'sr-only';
		announcement.textContent = `${ariaLabel} opened with ${actionableItems.length} items`;
		document.body.appendChild(announcement);

		// Remove after announcement
		setTimeout(() => {
			document.body.removeChild(announcement);
		}, 1000);
	};

	const handlePopupOpen = () => {
		// Menu opened
		activeIndex = 0; // Start with first item
		tick().then(() => {
			// Focus the menu container for keyboard navigation
			menuContainerRef?.focus();
		});

		// Add keyboard event listener
		document.addEventListener('keydown', handleKeyDown);

		// Announce to screen readers
		announceMenuOpened();
	};

	const handlePopupClose = () => {
		// Menu closed
		activeIndex = -1;

		// Remove keyboard event listener
		document.removeEventListener('keydown', handleKeyDown);

		// Return focus to anchor element
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
	{mobileBehavior}
>
	<div
		class="popup-menu"
		bind:this={menuContainerRef}
		role="menu"
		aria-label={ariaLabel}
		aria-activedescendant={activeIndex >= 0 ? getMenuItemId(activeIndex) : undefined}
		tabindex="-1"
	>
		<ul class="popup-menu__list" role="none">
			{#each menuItems as item, index}
				<li class="popup-menu__item" role="none">
					{#if item === 'separator'}
						<div class="popup-menu__separator" role="separator" aria-orientation="horizontal"></div>
					{:else}
						{@const actionableIndex = actionableItems.findIndex((ai) => ai.originalIndex === index)}
						{@const isActive = actionableIndex === activeIndex}
						<button
							bind:this={menuItemRefs[actionableIndex]}
							id={getMenuItemId(actionableIndex)}
							class="popup-menu__button"
							class:popup-menu__button--active={isActive}
							role="menuitem"
							tabindex="-1"
							aria-describedby={item.icon ? `${getMenuItemId(actionableIndex)}-icon` : undefined}
							onclick={(event) => handleClick(event, item)}
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
							<span class="popup-menu__text">{item.title}</span>
							{#if item.href}
								<span class="sr-only">link</span>
							{/if}
						</button>
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

	/* Screen reader only content */
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
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

	/* Enhanced mobile menu styles */
	:global(.mobile .popup-menu) {
		border-radius: 0;
		box-shadow: none;
		background: transparent;
		width: 100%;
		max-width: none;
		min-width: auto;
	}

	:global(.mobile.fullscreen .popup-menu) {
		background: var(--svelte-ui-surface-color);
		border-radius: var(--svelte-ui-popup-mobile-border-radius);
		box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 10%);
		margin: 0;
		padding: 0;
	}

	:global(.mobile.fullscreen .popup-menu__list) {
		padding: 16px 0;
	}

	:global(.mobile.fullscreen .popup-menu__button) {
		padding: 16px 24px;
		font-size: 1.1rem;
		min-height: var(--svelte-ui-touch-target-lg);
	}
</style>
