<!-- StackedDialogs.svelte - Two Dialogs stacked for Escape-handling tests -->
<script lang="ts">
	import Dialog from '../../lib/components/Dialog.svelte';

	let outer: ReturnType<typeof Dialog>;
	let inner: ReturnType<typeof Dialog>;

	/** Open the outer dialog first so the inner one ends up on top of the top layer. */
	export const openBoth = (): void => {
		outer.open();
		inner.open();
	};
</script>

<Dialog bind:this={outer} id="outer" title="Outer">
	<p>outer</p>
	<Dialog bind:this={inner} id="inner" title="Inner">
		<p>inner</p>
	</Dialog>
</Dialog>
