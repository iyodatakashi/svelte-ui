<script lang="ts">
	import IconButton from './IconButton.svelte';
	import PopupMenu from './PopupMenu.svelte';
	import type { MenuItem } from '$lib/types/MenuItem';
	import type { SvelteComponent, Snippet } from 'svelte';
	let {
		children,
		menuItems
	}: {
		children?: Snippet;
		menuItems: (MenuItem | 'separator')[];
	} = $props();
	let anchorRef: HTMLElement | undefined = $state();
	let popupMenuRef: SvelteComponent | undefined = $state();
	const handleClick = (event: MouseEvent) => {
		event.stopPropagation();
		toggle();
	};
	const toggle = (): void => {
		popupMenuRef?.toggle();
	};
</script>

<div class="button-block" bind:this={anchorRef}>
	<IconButton ariaLabel="メニューを表示" onclick={handleClick}>
		{#if children}
			{@render children()}
		{/if}
	</IconButton>
</div>
<PopupMenu {menuItems} anchorElement={anchorRef} bind:this={popupMenuRef} />

<style lang="scss">
	.button-block {
		width: fit-content;
	}
</style>
