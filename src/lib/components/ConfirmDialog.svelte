<!-- ConfirmDialog.svelte -->

<script lang="ts">
	import Dialog from './Dialog.svelte';
	import Button from './Button.svelte';
	import { convertToHtml } from '$lib/utils/formatText';
	import type { SvelteComponent } from 'svelte';

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
		variant = 'info',
		width = 400,

		// 状態/動作
		isOpen = $bindable(false),
		closeIfClickOutside = true,

		// イベントハンドラー
		onSubmit = () => {}, // No params for type inference
		onCancel = () => {} // No params for type inference
	}: {
		// 基本プロパティ
		title?: string;
		description?: string;
		submitLabel?: string;
		cancelLabel?: string;

		// HTML属性
		id?: string;

		// スタイル/レイアウト
		variant?: 'info' | 'warning' | 'danger';
		width?: string | number;

		// 状態/動作
		isOpen?: boolean;
		closeIfClickOutside?: boolean;

		// イベントハンドラー
		onSubmit?: () => void;
		onCancel?: () => void;
	} = $props();

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

<Dialog
	bind:this={dialogRef}
	bind:isOpen
	{title}
	{width}
	{closeIfClickOutside}
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
			color={variant === 'danger'
				? 'var(--svelte-ui-danger-color)'
				: variant === 'warning'
					? 'var(--svelte-ui-warning-color)'
					: undefined}
			onclick={handleSubmit}
		>
			{submitLabel}
		</Button>
	{/snippet}
</Dialog>

<style lang="scss">
	.confirm-dialog-message {
		padding: 16px 0;
	}
</style>
