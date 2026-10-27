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
	import type { CloseReason } from '$lib/types/propOptions';
	import Modal from './Modal.svelte';
	import { getStyleFromNumber } from '$lib/utils/style';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type DialogProps = {
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
		/** Dialog width in px (number) or any CSS unit (string). @default 320 */
		width?: string | number;
		/** Inline style applied to the body area. */
		bodyStyle?: string;
		/** Removes default body padding. @default false */
		noPadding?: boolean;

		// 状態/動作
		/** Use `dialogRef.open()` / `.close()` instead of binding this directly. */
		isOpen?: boolean;
		/** Makes the body area scrollable when content overflows. @default false */
		scrollable?: boolean;
		/** Closes when clicking the backdrop. @default true */
		closeIfClickOutside?: boolean;
		/** Closes when pressing Escape. @default true */
		closeIfEscape?: boolean;
		/** Returns focus to the trigger element on close. @default false */
		restoreFocus?: boolean;
		/** Focuses the first focusable element on open. @default false */
		focusFirstOnOpen?: boolean;

		// ARIA/アクセシビリティ
		ariaLabel?: string;
		ariaDescribedby?: string;

		// イベントハンドラー
		onOpen?: () => void;
		/** Called after the close animation completes, with the reason it was closed. */
		onClose?: (reason: CloseReason) => void;
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
		width = 320,
		bodyStyle = '',
		noPadding = false,

		// 状態/動作
		isOpen = $bindable(false),
		scrollable = false,
		closeIfClickOutside = true,
		closeIfEscape = true,
		restoreFocus = false,
		focusFirstOnOpen = false,

		// ARIA/アクセシビリティ
		ariaLabel,
		ariaDescribedby,

		// イベントハンドラー
		onOpen = () => {}, // No params for type inference
		onClose = () => {}
	}: DialogProps = $props();

	let modalRef: Modal;

	// =========================================================================
	// Methods
	// =========================================================================
	/** Opens the dialog. */
	export const open = (): void => {
		modalRef?.open(title || ariaLabel);
	};

	/** Closes the dialog. */
	export const close = (): void => {
		modalRef?.close(title || ariaLabel);
	};

	/** Toggles between open and closed. */
	export const toggle = (): void => {
		modalRef?.toggle(title || ariaLabel);
	};

	/** @internal Completes the close animation. Called automatically. */
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

	const dialogClasses = $derived('');

	// id 未指定でも aria の参照先が作れるようフォールバックを持つ
	const fallbackId = `dialog-${Math.random().toString(36).substring(2, 15)}`;
	const baseId = $derived(id ?? fallbackId);
	const titleId = $derived(`${baseId}-dialog-title`);
	const descriptionId = $derived(`${baseId}-dialog-description`);

	// 名前は 1 つだけ与える。aria-labelledby は aria-label より優先されるため、両方は付けない。
	// header を差し替えるとタイトル要素が描画されないので、そのときは title を aria-label で渡す
	const hasTitleElement = $derived(!!title && !header);
	const ariaLabelValue = $derived(ariaLabel || (title && !hasTitleElement ? title : undefined));
	const ariaLabelledby = $derived(!ariaLabelValue && hasTitleElement ? titleId : undefined);
	const ariaDescribedbyValue = $derived(
		ariaDescribedby || (description ? descriptionId : undefined)
	);
</script>

<Modal
	bind:this={modalRef}
	bind:isOpen
	{closeIfClickOutside}
	{closeIfEscape}
	{restoreFocus}
	{focusFirstOnOpen}
	{onOpen}
	{onClose}
	componentType="Dialog"
	ariaLabel={ariaLabelValue}
	{ariaLabelledby}
	ariaDescribedby={ariaDescribedbyValue}
	customClass={dialogClasses}
	customStyles={dialogStyles}
	id={id ? `${id}-modal` : undefined}
>
	<div class="dialog {scrollable ? 'dialog--scrollable' : ''}" data-testid="dialog">
		{#if header || title}
			<div class="dialog__header">
				{#if header}
					{@render header()}
				{:else}
					<div class="dialog__title" id={titleId}>
						{title || ''}
					</div>
				{/if}
			</div>
		{/if}
		{#if description}
			<div class="dialog__description" id={descriptionId}>
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
	.dialog {
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		border: var(--svelte-ui-dialog-border);
		border-radius: var(--svelte-ui-dialog-border-radius);
		max-height: calc(100dvh - 2em - 6px);
		overflow: auto;
	}

	.dialog__header {
		display: flex;
		gap: var(--svelte-ui-dialog-gap);
		align-items: center;
		justify-content: stretch;

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
		padding: 0 var(--svelte-ui-dialog-body-padding) var(--svelte-ui-dialog-body-padding);
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

	.dialog:not(.dialog--scrollable) .dialog__header {
		padding: var(--svelte-ui-dialog-non-scrollable-header-padding);
	}

	/* scrollable=true 時: ヘッダー/フッター固定 + bodyのみスクロール */
	.dialog--scrollable {
		overflow: hidden;
	}

	/* scrollable では線で区切られた固定バーになるため、高さは変数で決める。
	   明示した min-height はフレックスアイテムの自動最小サイズを打ち消すので縮小を止める */
	.dialog--scrollable .dialog__header {
		flex-shrink: 0;
		min-height: var(--svelte-ui-dialog-header-height);
		padding: var(--svelte-ui-dialog-scrollable-header-padding);
		border-bottom: solid 1px var(--svelte-ui-border-color);
	}

	.dialog--scrollable .dialog__body {
		flex-shrink: 1;
		padding: var(--svelte-ui-dialog-body-padding);
		overflow: auto;
	}

	.dialog--scrollable .dialog__footer {
		border-top: solid 1px var(--svelte-ui-border-color);
	}
</style>
