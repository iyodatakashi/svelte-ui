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

	let {
		isOpen = $bindable(false),
		title = '',
		scrollable = false,
		closeIfClickOutside = true,
		width = 320,
		restoreFocus = false,
		ariaDescribedby,
		description,
		header,
		children,
		footer
	}: {
		isOpen?: boolean;
		title?: string;
		scrollable?: boolean;
		closeIfClickOutside?: boolean;
		width?: number;
		restoreFocus?: boolean;
		ariaDescribedby?: string;
		description?: string;
		header?: Snippet;
		children?: Snippet;
		footer?: Snippet;
	} = $props();

	let modalRef: Modal;

	// Dialog固有のスタイル
	const dialogStyles = $derived(
		`width: ${width}px; border-radius: var(--svelte-ui-dialog-border-radius); overflow: hidden;`
	);

	// Dialog固有のクラス
	const dialogClasses = $derived(['dialog', scrollable && 'scrollable'].filter(Boolean).join(' '));

	// aria属性
	const ariaLabelledby = $derived(title ? 'dialog-title' : undefined);
	const ariaDescribedbyValue = $derived(
		ariaDescribedby || (description ? 'dialog-description' : undefined)
	);

	// 外部からのAPI（後方互換性のため）
	export const open = (): void => {
		modalRef?.open(title);
	};

	export const close = (): void => {
		modalRef?.close(title);
	};

	export const toggle = (): void => {
		modalRef?.toggle(title);
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
	componentType="Dialog"
	{ariaLabelledby}
	ariaDescribedby={ariaDescribedbyValue}
	customClass={dialogClasses}
	customStyles={dialogStyles}
>
	<div class="dialog">
		{#if header || title}
			<div class="dialog__header">
				{#if header}
					{@render header()}
				{:else}
					<div class="dialog__title" id="dialog-title">
						{title || ''}
					</div>
				{/if}
			</div>
		{/if}
		{#if description}
			<div class="dialog__description" id="dialog-description">
				{description}
			</div>
		{/if}
		{#if children}
			<div class="dialog__body">
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
