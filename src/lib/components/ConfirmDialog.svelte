<!-- ConfirmDialog.svelte -->

<script lang="ts">
	import Dialog from './Dialog.svelte';
	import Button from './Button.svelte';
	import { convertToHtml } from '$lib/utils/formatText';
	import type { SvelteComponent } from 'svelte';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type ConfirmDialogProps = {
		// 基本プロパティ
		title?: string;
		description?: string;
		submitLabel?: string;
		cancelLabel?: string;

		// HTML属性
		id?: string;

		// スタイル/レイアウト
		/** Renders the confirm button in a destructive (red) style. @default false */
		danger?: boolean;
		/** @default 400 */
		width?: string | number;
		scrollable?: boolean;

		// 状態/動作
		/** Use `confirmDialogRef.open()` / `.close()` instead of binding this directly. */
		isOpen?: boolean;
		/** Closes when clicking the backdrop. @default true */
		closeIfClickOutside?: boolean;
		focusFirstOnOpen?: boolean;

		// イベントハンドラー
		onSubmit?: () => void;
		onCancel?: () => void;
	};

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
		focusFirstOnOpen = false,

		// イベントハンドラー
		onSubmit = () => {}, // No params for type inference
		onCancel = () => {} // No params for type inference
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
	{focusFirstOnOpen}
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
