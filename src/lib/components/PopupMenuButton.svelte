<script lang="ts">
	import IconButton from './IconButton.svelte';
	import PopupMenu from './PopupMenu.svelte';
	import type { MenuItem } from '$lib/types/MenuItem';
	import type { SvelteComponent, Snippet } from 'svelte';

	let {
		children,
		menuItems,
		ariaLabel = 'Menu',
		disabled = false,
		position = 'bottom'
	}: {
		children?: Snippet;
		menuItems: (MenuItem | 'separator')[];
		ariaLabel?: string;
		disabled?: boolean;
		position?:
			| 'top'
			| 'bottom'
			| 'left'
			| 'right'
			| 'top-left'
			| 'top-center'
			| 'top-right'
			| 'bottom-left'
			| 'bottom-center'
			| 'bottom-right'
			| 'left-top'
			| 'left-center'
			| 'left-bottom'
			| 'right-top'
			| 'right-center'
			| 'right-bottom'
			| 'auto';
	} = $props();

	let anchorRef: HTMLElement | undefined = $state();
	let popupMenuRef: SvelteComponent | undefined = $state();
	let buttonId: string = $state(`menu-button-${Math.random().toString(36).substr(2, 9)}`);

	const handleClick = (event: MouseEvent) => {
		event.stopPropagation();
		toggle();
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		switch (event.key) {
			case 'ArrowDown':
			case 'Enter':
			case ' ':
				event.preventDefault();
				open();
				break;
			case 'Escape':
				event.preventDefault();
				close();
				break;
		}
	};

	const open = (): void => {
		popupMenuRef?.open();
	};

	const close = (): void => {
		popupMenuRef?.close();
	};

	const toggle = (): void => {
		popupMenuRef?.toggle();
	};
</script>

<div class="button-block" bind:this={anchorRef}>
	<IconButton
		{ariaLabel}
		{disabled}
		onclick={handleClick}
		onkeydown={handleKeyDown}
		aria-haspopup="menu"
		aria-expanded="false"
		aria-controls="{buttonId}-menu"
		id={buttonId}
	>
		{#if children}
			{@render children()}
		{:else}
			more_vert
		{/if}
	</IconButton>
</div>

<PopupMenu bind:this={popupMenuRef} {menuItems} anchorElement={anchorRef} {ariaLabel} {position} />

<style lang="scss">
	.button-block {
		width: fit-content;
	}

	/* Screen reader only content */
	:global(.sr-only) {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
