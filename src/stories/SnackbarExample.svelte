<script lang="ts">
	import { onMount } from 'svelte';
	import Snackbar, { type SnackbarProps } from '../lib/components/Snackbar.svelte';
	import Button from '../lib/components/Button.svelte';
	import { snackbarManager } from '../lib/utils/snackbar.svelte';

	type SnackbarExampleProps = SnackbarProps & {
		closable?: boolean;
		actionLabel?: string;
		color?: string;
		textColor?: string;
		iconVariant?: 'outlined' | 'rounded' | 'sharp';
	};

	let {
		position = 'bottom',
		maxVisible = 5,
		variant = 'filled',
		duration = 3000,
		closable = false,
		actionLabel = '',
		color = '',
		textColor = '',
		iconVariant = 'outlined'
	}: SnackbarExampleProps = $props();

	onMount(() => {
		if (typeof window !== 'undefined') {
			(window as any).snackbar = snackbarManager;
		}
	});

	const showOptions = () => ({
		closable,
		...(actionLabel ? { actionLabel, onAction: () => {} } : {}),
		...(color ? { color } : {}),
		...(textColor ? { textColor } : {}),
		iconVariant
	});

	const showSuccess = () => snackbarManager.success('Success message', showOptions());
	const showError = () => snackbarManager.error('Error message', showOptions());
	const showWarning = () => snackbarManager.warning('Warning message', showOptions());
	const showInfo = () => snackbarManager.info('Info message', showOptions());
	const showDefault = () => snackbarManager.default('Default message', showOptions());
</script>

<div class="container">
	<Button variant="filled" onclick={showSuccess}>Show Success</Button>
	<Button variant="filled" onclick={showError}>Show Error</Button>
	<Button variant="filled" onclick={showWarning}>Show Warning</Button>
	<Button variant="filled" onclick={showInfo}>Show Info</Button>
	<Button variant="filled" onclick={showDefault}>Show Default</Button>
</div>

<Snackbar {position} {maxVisible} {variant} {duration} />

<style>
	.container {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
	}
</style>
