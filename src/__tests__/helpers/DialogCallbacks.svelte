<!-- DialogCallbacks.svelte - Dialog driven by ref, recording onOpen/onClose calls -->
<script lang="ts">
	import Dialog from '../../lib/components/Dialog.svelte';
	import type { CloseReason } from '../../lib/types/propOptions';

	let dialogRef: ReturnType<typeof Dialog>;
	let openCount = 0;
	const closeReasons: CloseReason[] = [];

	export const open = (): void => {
		dialogRef.open();
	};

	export const close = (): void => {
		dialogRef.close();
	};

	export const getOpenCount = (): number => openCount;

	export const getCloseReasons = (): CloseReason[] => closeReasons;
</script>

<Dialog
	bind:this={dialogRef}
	id="callbacks"
	title="Callbacks"
	onOpen={() => {
		openCount += 1;
	}}
	onClose={(reason) => {
		closeReasons.push(reason);
	}}
>
	<p>content</p>
</Dialog>
