<!-- CleanupPopupMenu.svelte - PopupMenu for listener / close cleanup tests -->
<script lang="ts">
	import PopupMenu from '../../lib/components/PopupMenu.svelte';

	let { onSelect = () => {} }: { onSelect?: () => void } = $props();

	let menuRef: ReturnType<typeof PopupMenu>;
	let anchorEl: HTMLButtonElement | undefined = $state();
</script>

<button id="cleanup-anchor" bind:this={anchorEl} onclick={() => menuRef.open()}>open</button>
<PopupMenu
	bind:this={menuRef}
	anchorElement={anchorEl}
	id="cleanup-menu"
	menuItems={[{ label: 'rename', callback: onSelect }]}
/>
