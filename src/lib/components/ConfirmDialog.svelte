<!-- ConfirmDialog.svelte -->

<script lang="ts">
	import Dialog from './Dialog.svelte';
	import Button from './Button.svelte';
	import { convertToHtml } from '../utils/formatText';
	import type { SvelteComponent } from 'svelte';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let {
		// 基本プロパティ
		title = 'Confirm',
		message = 'Are you sure you want to proceed?',
		confirmText = 'Confirm',
		cancelText = 'Cancel',

		// スタイル/レイアウト
		variant = 'info',
		width = 400,

		// 状態/動作
		isOpen = $bindable(false),

		// イベントハンドラー
		onConfirm = () => {}, // No params for type inference
		onCancel = () => {} // No params for type inference
	}: {
		// 基本プロパティ
		title?: string;
		message?: string;
		confirmText?: string;
		cancelText?: string;

		// スタイル/レイアウト
		variant?: 'info' | 'warning' | 'danger';
		width?: string | number;

		// 状態/動作
		isOpen?: boolean;

		// イベントハンドラー
		onConfirm?: () => void;
		onCancel?: () => void;
	} = $props();

	let dialogRef: SvelteComponent | undefined = $state();

	// =========================================================================
	// Methods
	// =========================================================================
	const handleConfirm = (): void => {
		onConfirm();
		close();
	};

	const handleCancel = (): void => {
		onCancel();
		close();
	};

	export const open = (): void => {
		isOpen = true;
	};

	export const close = (): void => {
		isOpen = false;
	};

	export const toggle = (): void => {
		isOpen = !isOpen;
	};
</script>

<Dialog bind:this={dialogRef} bind:isOpen {title} {width} closeIfClickOutside={false}>
	<div class="confirm-dialog-message">
		{@html convertToHtml(message)}
	</div>

	{#snippet footer()}
		<Button variant="ghost" color="var(--svelte-ui-text-color)" onclick={handleCancel}>
			{cancelText}
		</Button>
		<Button
			variant="filled"
			color={variant === 'danger'
				? 'var(--svelte-ui-danger-color)'
				: variant === 'warning'
					? 'var(--svelte-ui-warning-color)'
					: undefined}
			onclick={handleConfirm}
		>
			{confirmText}
		</Button>
	{/snippet}
</Dialog>

<style lang="scss">
	.confirm-dialog-message {
		padding: 16px 0;
		font-size: 16px;
		line-height: 1.5;
		color: var(--svelte-ui-confirmdialog-text-color);
	}
</style>
