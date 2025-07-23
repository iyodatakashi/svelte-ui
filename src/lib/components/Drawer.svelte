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

	let {
		isOpen = $bindable(false),
		title = '',
		scrollable = true,
		closeIfClickOutside = true,
		width = 240,
		position = 'left',
		ariaLabel = 'Navigation drawer',
		restoreFocus = false,
		ariaDescribedby,
		description,
		header,
		body,
		children,
		footer
	}: {
		isOpen?: boolean;
		title?: string;
		scrollable?: boolean;
		closeIfClickOutside?: boolean;
		width?: string | number;
		position?: 'left' | 'right';
		ariaLabel?: string;
		restoreFocus?: boolean;
		ariaDescribedby?: string;
		description?: string;
		header?: Snippet;
		body?: Snippet;
		children?: Snippet;
		footer?: Snippet;
	} = $props();

	let modalRef: Modal;

	// Drawer固有のスタイル
	const drawerStyles = $derived(
		`width: ${typeof width === 'number' ? `${width}px` : width}; height: 100%; min-height: 100%; ${position}: 0;`
	);

	// Drawer固有のクラス
	const drawerClasses = $derived(
		['drawer', position, scrollable && 'scrollable'].filter(Boolean).join(' ')
	);

	// aria属性
	const ariaLabelledby = $derived(title ? 'drawer-title' : undefined);
	const ariaDescribedbyValue = $derived(
		ariaDescribedby || (description ? 'drawer-description' : undefined)
	);

	// 外部からのAPI（後方互換性のため）
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
	customStyles={drawerStyles}
>
	<div class="drawer">
		{#if header || title}
			<div class="drawer__header">
				{#if header}
					{@render header()}
				{:else}
					<div class="drawer__title" id="drawer-title">
						{title || ''}
					</div>
				{/if}
			</div>
		{/if}
		{#if description}
			<div class="drawer__description" id="drawer-description">
				{description}
			</div>
		{/if}
		{#if children}
			<div class="drawer__body">
				{@render children()}
			</div>
		{/if}
		{#if body}
			<div class="drawer__body">
				{@render body()}
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
	:global(.drawer) {
		width: var(--svelte-ui-drawer-width);
		height: 100%;
		min-height: 100%;
		padding: 0;
		margin: 0;
		overflow: hidden;
		color: var(--svelte-ui-drawer-title-color);
	}

	:global(.drawer:-internal-dialog-in-top-layer) {
		max-height: none;
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

	:global(.drawer.right.fade-in) {
		animation: fadeInFromRight var(--svelte-ui-transition-duration, 300ms) forwards;
	}

	:global(.drawer.right.fade-in::backdrop) {
		animation: fadeIn var(--svelte-ui-transition-duration, 300ms) forwards;
	}

	:global(.drawer.left.fade-in) {
		animation: fadeInFromLeft var(--svelte-ui-transition-duration, 300ms) forwards;
	}

	:global(.drawer.left.fade-in::backdrop) {
		animation: fadeIn var(--svelte-ui-transition-duration, 300ms) forwards;
	}

	:global(.drawer.left.fade-out) {
		animation: fadeOutToLeft var(--svelte-ui-transition-duration, 300ms) forwards;
	}

	:global(.drawer.right.fade-out) {
		animation: fadeOutToRight var(--svelte-ui-transition-duration, 300ms) forwards;
	}

	:global(.drawer.fade-out::backdrop) {
		animation: fadeOut var(--svelte-ui-transition-duration, 300ms) forwards;
	}

	.drawer {
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		height: 100%;
		overflow: hidden;
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

	:global(.drawer.scrollable) {
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
		:global(.drawer.fade-in),
		:global(.drawer.fade-in::backdrop),
		:global(.drawer.fade-out),
		:global(.drawer.fade-out::backdrop),
		:global(.drawer.left.fade-in),
		:global(.drawer.left.fade-in::backdrop),
		:global(.drawer.left.fade-out),
		:global(.drawer.right.fade-in),
		:global(.drawer.right.fade-in::backdrop),
		:global(.drawer.right.fade-out) {
			animation-duration: 0.01s;
		}
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
