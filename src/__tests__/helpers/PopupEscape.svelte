<!-- PopupEscape.svelte - Popup on its own and inside a Dialog, for Escape-handling tests -->
<script lang="ts">
	import Dialog from '../../lib/components/Dialog.svelte';
	import Popup from '../../lib/components/Popup.svelte';
	import type { CloseReason } from '../../lib/types/propOptions';

	let { onClose }: { onClose: (reason: CloseReason) => void } = $props();

	let dialog: ReturnType<typeof Dialog>;
	let popupAlone: ReturnType<typeof Popup>;
	let popupInDialog: ReturnType<typeof Popup>;
	let anchorAlone: HTMLButtonElement;
	let anchorInDialog: HTMLButtonElement;
</script>

<p id="neutral">neutral area</p>

<button id="anchor-alone" bind:this={anchorAlone} onclick={() => popupAlone.toggle()}>popup</button>
<Popup bind:this={popupAlone} anchorElement={anchorAlone} id="popup-alone" {onClose}>
	<button>item</button>
</Popup>

<button id="open-dialog" onclick={() => dialog.open()}>dialog</button>
<Dialog bind:this={dialog} id="dialog" title="Dialog">
	<button id="anchor-in-dialog" bind:this={anchorInDialog} onclick={() => popupInDialog.toggle()}>
		popup
	</button>
	<Popup bind:this={popupInDialog} anchorElement={anchorInDialog} id="popup-in-dialog" {onClose}>
		<button>item</button>
	</Popup>
</Dialog>
