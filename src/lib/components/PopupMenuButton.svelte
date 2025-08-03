<!-- PopupMenuButton.svelte -->

<script lang="ts">
	import IconButton from './IconButton.svelte';
	import PopupMenu from './PopupMenu.svelte';
	import type { MenuItem } from '../types/MenuItem';
	import type { SvelteComponent, Snippet } from 'svelte';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let {
		// Snippet
		children,

		// 基本プロパティ
		menuItems,

		// スタイル/レイアウト
		position = 'bottom',

		// 状態/動作
		disabled = false,
		mobileFullscreen = true,
		mobileBehavior = 'auto',

		// ARIA/アクセシビリティ
		ariaLabel = 'Menu'
	}: {
		// Snippet
		children?: Snippet;

		// 基本プロパティ
		menuItems: (MenuItem | 'separator')[];

		// スタイル/レイアウト
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

		// 状態/動作
		disabled?: boolean;
		mobileFullscreen?: boolean;
		mobileBehavior?: 'auto' | 'fullscreen' | 'popup';

		// ARIA/アクセシビリティ
		ariaLabel?: string;
	} = $props();

	let anchorRef: HTMLElement | undefined = $state();
	let popupMenuRef: SvelteComponent | undefined = $state();
	let buttonId: string = $state(`menu-button-${Math.random().toString(36).substring(2, 15)}`);

	// =========================================================================
	// Methods
	// =========================================================================
	const handleClick = (event: MouseEvent) => {
		event.stopPropagation();
		toggle();
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		switch (event.key) {
			case 'ArrowDown':
			case 'Enter':
			case ' ':
				event.preventDefault();
				open();
				break;
			case 'Escape':
				event.preventDefault();
				close();
				break;
		}
	};

	const open = (): void => {
		popupMenuRef?.open();
	};

	const close = (): void => {
		popupMenuRef?.close();
	};

	const toggle = (): void => {
		popupMenuRef?.toggle();
	};
</script>

<div class="button-block" bind:this={anchorRef}>
	<IconButton
		{ariaLabel}
		{disabled}
		onclick={handleClick}
		onkeydown={handleKeyDown}
		aria-haspopup="menu"
		aria-expanded="false"
		aria-controls="{buttonId}-menu"
		id={buttonId}
	>
		{#if children}
			{@render children()}
		{:else}
			more_vert
		{/if}
	</IconButton>
</div>

<PopupMenu
	bind:this={popupMenuRef}
	{menuItems}
	anchorElement={anchorRef}
	{ariaLabel}
	{position}
	{mobileFullscreen}
	{mobileBehavior}
/>

<style lang="scss">
	.button-block {
		width: fit-content;
	}

	/* Screen reader only content */
	:global(.sr-only) {
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
</style>
