<script lang="ts">
	import ConfirmDialog from '../lib/components/ConfirmDialog.svelte';
	import Button from '../lib/components/Button.svelte';

	type ConfirmDialogExampleProps = {
		title?: string;
		description?: string;
		submitLabel?: string;
		cancelLabel?: string;
		danger?: boolean;
		width?: string | number;
		scrollable?: boolean;
		closeIfClickOutside?: boolean;
		onSubmit?: () => void;
		onCancel?: () => void;
	};

	let {
		title = 'Confirm',
		description = 'Are you sure you want to proceed? This action cannot be undone.',
		submitLabel = 'Confirm',
		cancelLabel = 'Cancel',
		danger = false,
		width = 400,
		scrollable = false,
		closeIfClickOutside = true,
		onSubmit = () => {},
		onCancel = () => {}
	}: ConfirmDialogExampleProps = $props();

	let isOpen = $state(false);

	const openDialog = () => {
		isOpen = true;
	};
</script>

<Button variant="filled" onclick={openDialog}>
	Open Confirm Dialog
</Button>

<ConfirmDialog
	bind:isOpen
	{title}
	{description}
	{submitLabel}
	{cancelLabel}
	{danger}
	{width}
	{scrollable}
	{closeIfClickOutside}
	{onSubmit}
	{onCancel}
/>

