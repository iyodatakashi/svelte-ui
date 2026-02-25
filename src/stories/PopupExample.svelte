<script lang="ts">
	import Popup from '../lib/components/Popup.svelte';
	import Button from '../lib/components/Button.svelte';
	import type { Snippet } from 'svelte';
	import type PopupComponent from '../lib/components/Popup.svelte';
	import type { PopupPosition } from '$lib/types/propOptions';

	type PopupExampleProps = {
		position?: PopupPosition;
		children: Snippet;
	};

	let { position = 'bottom', children }: PopupExampleProps = $props();

	let anchorElement = $state<HTMLDivElement | null>(null);
	let popupRef = $state<PopupComponent | null>(null);

	const togglePopup = () => {
		popupRef?.toggle();
	};
</script>

<div class="button-container" bind:this={anchorElement}>
	<Button variant="filled" onclick={togglePopup}>Toggle Popup</Button>
</div>

<Popup bind:this={popupRef} {anchorElement} {position} {children} />

<style>
	.button-container {
		width: fit-content;
	}
</style>
