<!-- ConfirmDialog.svelte -->

<script lang="ts">
	import Dialog from './Dialog.svelte';
	import Button from './Button.svelte';
	import { convertToHtml } from '#lib/utils/formatText';
	import type { SvelteComponent } from 'svelte';
	import type { CloseReason } from '#lib/models/overlay/overlay.types';
	import type { ConfirmDialogProps } from '#lib/models/overlay/overlay.types';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================

	let {
		// 基本プロパティ
		title = 'Confirm',
		description = 'Are you sure?',
		submitLabel = 'Confirm',
		cancelLabel = 'Cancel',

		// HTML属性
		id,

		// スタイル/レイアウト
		danger = false,
		width = 400,
		scrollable = false,

		// 状態/動作
		isOpen = $bindable(false),
		closeIfClickOutside = true,
		closeIfEscape = true,
		focusFirstOnOpen = false,

		// イベントハンドラー
		onSubmit = () => {}, // No params for type inference
		onCancel = () => {}, // No params for type inference
		onOpen = () => {},
		onClose = () => {}
	}: ConfirmDialogProps = $props();

	let dialogRef: SvelteComponent | undefined = $state();

	// =========================================================================
	// Methods
	// =========================================================================
	const handleSubmit = (): void => {
		onSubmit();
		close();
	};

	const handleCancel = (): void => {
		onCancel();
		close();
	};

	const handleClose = (reason: CloseReason): void => {
		// Escape / 背景クリックでの離脱もキャンセルとして扱う
		if (reason !== 'explicit') {
			onCancel();
		}
		onClose(reason);
	};

	/** Opens the dialog. */
	export const open = (): void => {
		isOpen = true;
	};

	/** Closes the dialog. */
	export const close = (): void => {
		isOpen = false;
	};

	/** Toggles between open and closed. */
	export const toggle = (): void => {
		isOpen = !isOpen;
	};
</script>

<Dialog
	bind:this={dialogRef}
	bind:isOpen
	{title}
	{width}
	{scrollable}
	{closeIfClickOutside}
	{closeIfEscape}
	{focusFirstOnOpen}
	{onOpen}
	onClose={handleClose}
	id={id ? `${id}-dialog` : undefined}
>
	<div class="confirm-dialog-message">
		{@html convertToHtml(description)}
	</div>

	{#snippet footer()}
		<Button variant="ghost" color="var(--svelte-ui-text-color)" onclick={handleCancel}>
			{cancelLabel}
		</Button>
		<Button
			variant="filled"
			color={danger ? 'var(--svelte-ui-danger-color)' : undefined}
			onclick={handleSubmit}
		>
			{submitLabel}
		</Button>
	{/snippet}
</Dialog>
