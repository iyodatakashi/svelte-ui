<!-- ConfirmDialog.svelte -->

<script lang="ts">
	import Dialog from './Dialog.svelte';
	import Button from './Button.svelte';
	import { convertToHtml } from '../utils/formatText';
	import type { SvelteComponent } from 'svelte';

	let {
		isOpen = $bindable(false),
		title = 'Confirm',
		message = 'Are you sure you want to proceed?',
		confirmText = 'Confirm',
		cancelText = 'Cancel',
		variant = 'info',
		width = 400,
		onConfirm = () => {},
		onCancel = () => {}
	}: {
		isOpen?: boolean;
		title?: string;
		message?: string;
		confirmText?: string;
		cancelText?: string;
		variant?: 'info' | 'warning' | 'danger';
		width?: number;
		onConfirm?: () => void;
		onCancel?: () => void;
	} = $props();

	let dialogRef: SvelteComponent | undefined = $state();

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
		<Button variant="outlined" onclick={handleCancel}>
			{cancelText}
		</Button>
		<Button
			variant="filled"
			color={variant === 'danger' ? '#d32f2f' : variant === 'warning' ? '#f57c00' : '#1976d2'}
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
