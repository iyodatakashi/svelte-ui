<!-- Drawer.svelte -->

<script lang="ts">
	/**
	 * 🚨 CRITICAL: DO NOT MANAGE DRAWER STATE FROM PARENT COMPONENTS
	 *
	 * This Drawer component manages its own open/closed state internally.
	 * Parent components must NEVER create their own Drawer state variables.
	 *
	 * ❌ WRONG: let isDrawerOpen = $state(false)
	 * ✅ RIGHT: Use drawerRef.open(), drawerRef.close(), drawerRef.toggle()
	 * ✅ RIGHT: Use onOpen/onClose callbacks for side effects
	 *
	 * This prevents state synchronization bugs and ensures consistent behavior.
	 */
	import type { Snippet } from 'svelte';
	import Modal from './Modal.svelte';
	import { getStyleFromNumber } from '$lib/utils/style';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type DrawerProps = {
		// Snippet
		header?: Snippet;
		children?: Snippet;
		footer?: Snippet;

		// 基本プロパティ
		title?: string;
		description?: string;

		// HTML属性
		id?: string;

		// スタイル/レイアウト
		width?: string | number;
		position?: 'left' | 'right';
		bodyStyle?: string;
		noPadding?: boolean;

		// 状態/動作
		isOpen?: boolean;
		scrollable?: boolean;
		closeIfClickOutside?: boolean;
		restoreFocus?: boolean;

		// ARIA/アクセシビリティ
		ariaLabel?: string;
		ariaDescribedby?: string;
	};

	let {
		// Snippet
		header,
		children,
		footer,

		// 基本プロパティ
		title = '',
		description,

		// HTML属性
		id,

		// スタイル/レイアウト
		width = 240,
		position = 'left',
		bodyStyle = '',
		noPadding = false,

		// 状態/動作
		isOpen = $bindable(false),
		scrollable = true,
		closeIfClickOutside = true,
		restoreFocus = false,

		// ARIA/アクセシビリティ
		ariaLabel = 'Drawer',
		ariaDescribedby
	}: DrawerProps = $props();

	let modalRef: Modal;

	// =========================================================================
	// Methods
	// =========================================================================
	export const open = (): void => {
		modalRef?.open(title || ariaLabel);
	};

	export const close = (): void => {
		modalRef?.close(title || ariaLabel);
	};

	export const toggle = (): void => {
		modalRef?.toggle(title || ariaLabel);
	};

	export const closeEnd = (): void => {
		modalRef?.closeEnd();
	};

	// =========================================================================
	// $derived
	// =========================================================================
	const drawerStyles = $derived(() => {
		const styles = [];
		styles.push(`width: ${getStyleFromNumber(width)}`);
		styles.push('height: 100%');
		styles.push('min-height: 100%');
		styles.push(`${position}: 0`);
		return styles.join('; ');
	});

	const bodyStyles = $derived(() => {
		const styles = [];
		if (noPadding) {
			styles.push('padding: 0');
		}
		if (bodyStyle) {
			styles.push(bodyStyle);
		}
		return styles.join('; ');
	});

	const drawerClasses = $derived(
		['drawer-wrapper', `drawer-wrapper--${position}`].filter(Boolean).join(' ')
	);

	const ariaLabelledby = $derived(title ? 'drawer-title' : undefined);
	const ariaDescribedbyValue = $derived(
		ariaDescribedby || (description ? 'drawer-description' : undefined)
	);
</script>

<Modal
	bind:this={modalRef}
	bind:isOpen
	{closeIfClickOutside}
	{restoreFocus}
	componentType="Drawer"
	{ariaLabel}
	{ariaLabelledby}
	ariaDescribedby={ariaDescribedbyValue}
	customClass={drawerClasses}
	customStyles={drawerStyles()}
	id={id ? `${id}-modal` : undefined}
>
	<div class="drawer drawer--{position} {scrollable ? 'drawer--scrollable' : ''}">
		{#if header || title}
			<div class="drawer__header">
				{#if header}
					{@render header()}
				{:else}
					<div class="drawer__title" id={id ? `${id}-drawer-title` : undefined}>
						{title || ''}
					</div>
				{/if}
			</div>
		{/if}
		{#if description}
			<div class="drawer__description" id={id ? `${id}-drawer-description` : undefined}>
				{description}
			</div>
		{/if}
		{#if children}
			<div class="drawer__body" style={bodyStyles()}>
				{@render children()}
			</div>
		{/if}
		{#if footer}
			<div class="drawer__footer">
				{@render footer()}
			</div>
		{/if}
	</div>
</Modal>

<style lang="scss">
	:global(.drawer-wrapper) {
		width: 100%;
		height: 100%;
		min-height: 100%;
		padding: 0;
		margin: 0;
		overflow: hidden;
		color: var(--svelte-ui-drawer-title-color);
	}

	:global(.drawer-wrapper:-internal-dialog-in-top-layer) {
		max-height: none;
		max-width: none;
		width: 100%;
	}

	/* 位置固有のアニメーション */
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes fadeInFromLeft {
		from {
			opacity: 0;
			right: 100%;
			transform: translateX(-50%);
		}
		to {
			opacity: 1;
			right: 100%;
			transform: translateX(0);
		}
	}

	@keyframes fadeInFromRight {
		from {
			opacity: 0;
			left: 100%;
			transform: translateX(-50%);
		}
		to {
			opacity: 1;
			left: 100%;
			transform: translateX(-100%);
		}
	}

	@keyframes fadeOutToLeft {
		from {
			opacity: 1;
			right: 100%;
			transform: translateX(0);
		}
		to {
			opacity: 0;
			right: 100%;
			transform: translateX(-50%);
		}
	}

	@keyframes fadeOutToRight {
		from {
			opacity: 1;
			left: 100%;
			transform: translateX(-100%);
		}
		to {
			opacity: 0;
			left: 100%;
			transform: translateX(-50%);
		}
	}

	:global(.drawer-wrapper--right.fade-in) {
		animation: fadeInFromRight var(--svelte-ui-transition-duration, 300ms) forwards;
	}

	:global(.drawer-wrapper--right.fade-in::backdrop) {
		animation: fadeIn var(--svelte-ui-transition-duration, 300ms) forwards;
	}

	:global(.drawer-wrapper--left.fade-in) {
		animation: fadeInFromLeft var(--svelte-ui-transition-duration, 300ms) forwards;
	}

	:global(.drawer-wrapper--left.fade-in::backdrop) {
		animation: fadeIn var(--svelte-ui-transition-duration, 300ms) forwards;
	}

	:global(.drawer-wrapper--left.fade-out) {
		animation: fadeOutToLeft var(--svelte-ui-transition-duration, 300ms) forwards;
	}

	:global(.drawer-wrapper--right.fade-out) {
		animation: fadeOutToRight var(--svelte-ui-transition-duration, 300ms) forwards;
	}

	:global(.drawer-wrapper.fade-out::backdrop) {
		animation: fadeOut var(--svelte-ui-transition-duration, 300ms) forwards;
	}

	.drawer {
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		height: 100%;
		overflow: hidden;
	}

	/* Position-based borders */
	.drawer--left {
		border-right: var(--svelte-ui-drawer-border);
	}

	.drawer--right {
		border-left: var(--svelte-ui-drawer-border);
	}

	.drawer__header {
		display: flex;
		gap: var(--svelte-ui-drawer-gap);
		align-items: center;
		justify-content: stretch;
		min-height: var(--svelte-ui-drawer-header-height);
		padding: var(--svelte-ui-drawer-padding);
		margin-bottom: calc(0px - var(--svelte-ui-drawer-body-padding));

		.drawer__title {
			flex-grow: 1;
			font-size: var(--svelte-ui-drawer-title-font-size);
			line-height: normal;
			color: var(--svelte-ui-drawer-title-color);
		}
	}

	.drawer__body {
		flex-shrink: 1;
		position: relative;
		padding: var(--svelte-ui-drawer-body-padding);
		flex-grow: 1;
	}

	.drawer__footer {
		display: flex;
		gap: var(--svelte-ui-drawer-gap-sm);
		justify-content: end;
		padding: var(--svelte-ui-drawer-footer-padding);
	}

	.drawer__description {
		color: var(--svelte-ui-drawer-description-color);
		font-size: var(--svelte-ui-drawer-description-font-size);
		line-height: 1.4;
		margin: 0;
		padding: var(--svelte-ui-drawer-description-padding);
		border-bottom: 1px solid var(--svelte-ui-border-weak-color);
	}

	.drawer--scrollable {
		.drawer__header {
			margin-bottom: 0;
			border-bottom: solid var(--svelte-ui-border-width, 1px) var(--svelte-ui-border-weak-color);
		}

		.drawer__body {
			flex-shrink: 1;
			padding: var(--svelte-ui-drawer-body-padding);
			overflow: auto;
		}

		.drawer__footer {
			border-top: solid var(--svelte-ui-border-width, 1px) var(--svelte-ui-border-weak-color);
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		:global(.drawer-wrapper.fade-in),
		:global(.drawer-wrapper.fade-in::backdrop),
		:global(.drawer-wrapper.fade-out),
		:global(.drawer-wrapper.fade-out::backdrop),
		:global(.drawer-wrapper--left.fade-in),
		:global(.drawer-wrapper--left.fade-in::backdrop),
		:global(.drawer-wrapper--left.fade-out),
		:global(.drawer-wrapper--right.fade-in),
		:global(.drawer-wrapper--right.fade-in::backdrop),
		:global(.drawer-wrapper--right.fade-out) {
			animation-duration: 0.01s;
		}
	}
</style>
