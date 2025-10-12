<!-- Dialog.svelte -->

<script lang="ts">
	/**
	 * 🚨 CRITICAL: DO NOT MANAGE DIALOG STATE FROM PARENT COMPONENTS
	 *
	 * This Dialog component manages its own open/closed state internally.
	 * Parent components must NEVER create their own Dialog state variables.
	 *
	 * ❌ WRONG: let isDialogOpen = $state(false)
	 * ✅ RIGHT: Use dialogRef.open(), dialogRef.close(), dialogRef.toggle()
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
		width = 320,
		bodyStyle = '',
		noPadding = false,

		// 状態/動作
		isOpen = $bindable(false),
		scrollable = false,
		closeIfClickOutside = true,
		restoreFocus = false,

		// ARIA/アクセシビリティ
		ariaLabel,
		ariaDescribedby
	}: {
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
	} = $props();

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
	const dialogStyles = $derived(
		`width: ${getStyleFromNumber(width)}; border-radius: var(--svelte-ui-dialog-border-radius); overflow: hidden;`
	);

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

	const dialogClasses = $derived(['dialog', scrollable && 'scrollable'].filter(Boolean).join(' '));

	const ariaLabelledby = $derived(title ? 'dialog-title' : undefined);
	const ariaDescribedbyValue = $derived(
		ariaDescribedby || (description ? 'dialog-description' : undefined)
	);
</script>

<Modal
	bind:this={modalRef}
	bind:isOpen
	{closeIfClickOutside}
	{restoreFocus}
	componentType="Dialog"
	{ariaLabel}
	{ariaLabelledby}
	ariaDescribedby={ariaDescribedbyValue}
	customClass={dialogClasses}
	customStyles={dialogStyles}
	id={id ? `${id}-modal` : undefined}
>
	<div class="dialog">
		{#if header || title}
			<div class="dialog__header">
				{#if header}
					{@render header()}
				{:else}
					<div class="dialog__title" id={id ? `${id}-dialog-title` : undefined}>
						{title || ''}
					</div>
				{/if}
			</div>
		{/if}
		{#if description}
			<div class="dialog__description" id={id ? `${id}-dialog-description` : undefined}>
				{description}
			</div>
		{/if}
		{#if children}
			<div class="dialog__body" style={bodyStyles()}>
				{@render children()}
			</div>
		{/if}
		{#if footer}
			<div class="dialog__footer">
				{@render footer()}
			</div>
		{/if}
	</div>
</Modal>

<style lang="scss">
	:global(.dialog) {
		color: var(--svelte-ui-dialog-title-color);
	}

	.dialog {
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		max-height: calc(100dvh - 2em - 6px);
		border: var(--svelte-ui-dialog-border);
		border-radius: var(--svelte-ui-dialog-border-radius);
		overflow: hidden;
	}

	.dialog__header {
		display: flex;
		gap: var(--svelte-ui-dialog-gap);
		align-items: center;
		justify-content: stretch;
		min-height: var(--svelte-ui-dialog-header-height);
		padding: var(--svelte-ui-dialog-padding);
		margin-bottom: calc(0px - var(--svelte-ui-dialog-body-padding));

		.dialog__title {
			flex-grow: 1;
			font-size: var(--svelte-ui-dialog-title-font-size);
			line-height: normal;
			color: var(--svelte-ui-dialog-title-color);
		}
	}

	.dialog__body {
		flex-shrink: 1;
		position: relative;
		padding: var(--svelte-ui-dialog-body-padding);
	}

	.dialog__footer {
		display: flex;
		gap: var(--svelte-ui-dialog-gap-sm);
		justify-content: end;
		padding: var(--svelte-ui-dialog-footer-padding);
	}

	.dialog__description {
		color: var(--svelte-ui-dialog-description-color);
		font-size: var(--svelte-ui-dialog-description-font-size);
		line-height: 1.4;
		margin: 0;
		padding: var(--svelte-ui-dialog-description-padding);
		border-bottom: 1px solid var(--svelte-ui-border-weak-color);
	}

	:global(.dialog.scrollable) {
		.dialog__header {
			margin-bottom: 0;
			border-bottom: solid var(--svelte-ui-border-width, 1px) var(--svelte-ui-border-weak-color);
		}

		.dialog__body {
			flex-shrink: 1;
			padding: var(--svelte-ui-dialog-body-padding);
			overflow: auto;
		}

		.dialog__footer {
			border-top: solid var(--svelte-ui-border-width, 1px) var(--svelte-ui-border-weak-color);
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
