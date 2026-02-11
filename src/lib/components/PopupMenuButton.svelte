<!-- PopupMenuButton.svelte -->

<script lang="ts">
	import IconButton from './IconButton.svelte';
	import PopupMenu from './PopupMenu.svelte';
	import type { MenuItem } from '$lib/types/menuItem';
	import type { SvelteComponent, Snippet } from 'svelte';
	import type {
		FocusHandler,
		KeyboardHandler,
		MouseHandler,
		TouchHandler,
		PointerHandler
	} from '$lib/types/eventHandlers';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type PopupMenuButtonProps = {
		// Snippet
		children?: Snippet;

		// 基本プロパティ
		menuItems: (MenuItem | 'separator')[];

		// HTML属性
		id?: string;

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
			| 'right-bottom';
		variant?: 'ghost' | 'filled' | 'outlined' | 'glass';
		size?: number;
		color?: string;
		rounded?: boolean;

		// 状態/動作
		disabled?: boolean;
		mobileFullscreen?: boolean;
		mobileBehavior?: 'auto' | 'fullscreen' | 'popup';

		// フォーカスイベント
		onfocus?: FocusHandler;
		onblur?: FocusHandler;

		// キーボードイベント
		onkeydown?: KeyboardHandler;
		onkeyup?: KeyboardHandler;

		// マウスイベント
		onclick?: MouseHandler;
		onmousedown?: MouseHandler;
		onmouseup?: MouseHandler;
		onmouseenter?: MouseHandler;
		onmouseleave?: MouseHandler;
		onmouseover?: MouseHandler;
		onmouseout?: MouseHandler;
		oncontextmenu?: MouseHandler;
		onauxclick?: MouseHandler;

		// タッチイベント
		ontouchstart?: TouchHandler;
		ontouchend?: TouchHandler;
		ontouchmove?: TouchHandler;
		ontouchcancel?: TouchHandler;

		// ポインターイベント
		onpointerdown?: PointerHandler;
		onpointerup?: PointerHandler;
		onpointerenter?: PointerHandler;
		onpointerleave?: PointerHandler;
		onpointermove?: PointerHandler;
		onpointercancel?: PointerHandler;

		// ARIA/アクセシビリティ
		ariaLabel?: string;
	};

	let {
		// Snippet
		children,

		// 基本プロパティ
		menuItems,

		// HTML属性
		id,

		// スタイル/レイアウト
		position = 'bottom',
		variant = 'ghost',
		size = 32,
		color,
		rounded = true,

		// 状態/動作
		disabled = false,
		mobileFullscreen = true,
		mobileBehavior = 'auto',

		// フォーカスイベント
		onfocus = () => {}, // No params for type inference
		onblur = () => {}, // No params for type inference

		// キーボードイベント
		onkeydown = () => {}, // No params for type inference
		onkeyup = () => {}, // No params for type inference

		// マウスイベント
		onclick = () => {}, // No params for type inference
		onmousedown = () => {}, // No params for type inference
		onmouseup = () => {}, // No params for type inference
		onmouseenter = () => {}, // No params for type inference
		onmouseleave = () => {}, // No params for type inference
		onmouseover = () => {}, // No params for type inference
		onmouseout = () => {}, // No params for type inference
		oncontextmenu = () => {}, // No params for type inference
		onauxclick = () => {}, // No params for type inference

		// タッチイベント
		ontouchstart = () => {}, // No params for type inference
		ontouchend = () => {}, // No params for type inference
		ontouchmove = () => {}, // No params for type inference
		ontouchcancel = () => {}, // No params for type inference

		// ポインターイベント
		onpointerdown = () => {}, // No params for type inference
		onpointerup = () => {}, // No params for type inference
		onpointerenter = () => {}, // No params for type inference
		onpointerleave = () => {}, // No params for type inference
		onpointermove = () => {}, // No params for type inference
		onpointercancel = () => {}, // No params for type inference

		// ARIA/アクセシビリティ
		ariaLabel
	}: PopupMenuButtonProps = $props();

	let anchorRef: HTMLElement | undefined = $state();
	let popupMenuRef: SvelteComponent | undefined = $state();
	let buttonId: string = $state(`menu-button-${Math.random().toString(36).substring(2, 15)}`);

	// =========================================================================
	// Methods
	// =========================================================================
	const handleClick = (event: MouseEvent) => {
		if (disabled) return;
		event.stopPropagation();
		onclick?.(event);
		toggle();
	};

	const handleFocus = (event: FocusEvent) => {
		if (disabled) return;
		onfocus?.(event);
	};

	const handleBlur = (event: FocusEvent) => {
		if (disabled) return;
		onblur?.(event);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (disabled) return;
		onkeydown?.(event);
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

	const handleKeyUp = (event: KeyboardEvent) => {
		if (disabled) return;
		onkeyup?.(event);
	};

	const handleMouseDown = (event: MouseEvent) => {
		if (disabled) return;
		onmousedown?.(event);
	};

	const handleMouseUp = (event: MouseEvent) => {
		if (disabled) return;
		onmouseup?.(event);
	};

	const handleMouseEnter = (event: MouseEvent) => {
		if (disabled) return;
		onmouseenter?.(event);
	};

	const handleMouseLeave = (event: MouseEvent) => {
		if (disabled) return;
		onmouseleave?.(event);
	};

	const handleMouseOver = (event: MouseEvent) => {
		if (disabled) return;
		onmouseover?.(event);
	};

	const handleMouseOut = (event: MouseEvent) => {
		if (disabled) return;
		onmouseout?.(event);
	};

	const handleContextMenu = (event: MouseEvent) => {
		if (disabled) return;
		oncontextmenu?.(event);
	};

	const handleAuxClick = (event: MouseEvent) => {
		if (disabled) return;
		onauxclick?.(event);
	};

	const handleTouchStart = (event: TouchEvent) => {
		if (disabled) return;
		ontouchstart?.(event);
	};

	const handleTouchEnd = (event: TouchEvent) => {
		if (disabled) return;
		ontouchend?.(event);
	};

	const handleTouchMove = (event: TouchEvent) => {
		if (disabled) return;
		ontouchmove?.(event);
	};

	const handleTouchCancel = (event: TouchEvent) => {
		if (disabled) return;
		ontouchcancel?.(event);
	};

	const handlePointerDown = (event: PointerEvent) => {
		if (disabled) return;
		onpointerdown?.(event);
	};

	const handlePointerUp = (event: PointerEvent) => {
		if (disabled) return;
		onpointerup?.(event);
	};

	const handlePointerEnter = (event: PointerEvent) => {
		if (disabled) return;
		onpointerenter?.(event);
	};

	const handlePointerLeave = (event: PointerEvent) => {
		if (disabled) return;
		onpointerleave?.(event);
	};

	const handlePointerMove = (event: PointerEvent) => {
		if (disabled) return;
		onpointermove?.(event);
	};

	const handlePointerCancel = (event: PointerEvent) => {
		if (disabled) return;
		onpointercancel?.(event);
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

<div class="button-block" bind:this={anchorRef} {id}>
	<IconButton
		{ariaLabel}
		{disabled}
		{variant}
		{size}
		{color}
		{rounded}
		aria-haspopup="menu"
		aria-expanded={popupMenuRef?.isOpen ? 'true' : 'false'}
		aria-controls={popupMenuRef ? `${id}-menu-popup` : undefined}
		onclick={handleClick}
		onfocus={handleFocus}
		onblur={handleBlur}
		onkeydown={handleKeyDown}
		onkeyup={handleKeyUp}
		onmousedown={handleMouseDown}
		onmouseup={handleMouseUp}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		onmouseover={handleMouseOver}
		onmouseout={handleMouseOut}
		oncontextmenu={handleContextMenu}
		onauxclick={handleAuxClick}
		ontouchstart={handleTouchStart}
		ontouchend={handleTouchEnd}
		ontouchmove={handleTouchMove}
		ontouchcancel={handleTouchCancel}
		onpointerdown={handlePointerDown}
		onpointerup={handlePointerUp}
		onpointerenter={handlePointerEnter}
		onpointerleave={handlePointerLeave}
		onpointermove={handlePointerMove}
		onpointercancel={handlePointerCancel}
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
	id={id ? `${id}-menu` : undefined}
/>

<style lang="scss">
	.button-block {
		width: fit-content;
	}
</style>
