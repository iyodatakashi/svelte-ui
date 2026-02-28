<script lang="ts">
	import Popup from '../lib/components/Popup.svelte';
	import Button from '../lib/components/Button.svelte';
	import type { Snippet } from 'svelte';
	import type PopupComponent from '../lib/components/Popup.svelte';
	import type { PopupPosition } from '$lib/types/propOptions';

	type PopupExampleProps = {
		position?: PopupPosition;
		children: Snippet;
		role?: string;
		id?: string;
		margin?: number;
		isOpen?: boolean;
		focusTrap?: boolean;
		restoreFocus?: boolean;
		mobileFullscreen?: boolean;
		enableAutoReposition?: boolean;
		ariaLabel?: string;
		ariaLabelledby?: string;
		ariaDescribedby?: string;
		onOpen?: () => void;
		onClose?: () => void;
	};

	let {
		position = 'bottom',
		children,
		role,
		id,
		margin,
		isOpen,
		focusTrap,
		restoreFocus,
		mobileFullscreen,
		enableAutoReposition,
		ariaLabel,
		ariaLabelledby,
		ariaDescribedby,
		onOpen,
		onClose
	}: PopupExampleProps = $props();

	let anchorElement = $state<HTMLDivElement | null>(null);
	let popupRef = $state<PopupComponent | null>(null);

	const togglePopup = () => {
		popupRef?.toggle();
	};
</script>

<div class="button-container" bind:this={anchorElement}>
	<Button variant="filled" onclick={togglePopup}>Toggle Popup</Button>
</div>

<Popup
	bind:this={popupRef}
	{anchorElement}
	{position}
	{children}
	{role}
	{id}
	{margin}
	{isOpen}
	{focusTrap}
	{restoreFocus}
	{mobileFullscreen}
	{enableAutoReposition}
	{ariaLabel}
	{ariaLabelledby}
	{ariaDescribedby}
	{onOpen}
	{onClose}
/>

<style>
	.button-container {
		width: fit-content;
	}
</style>
