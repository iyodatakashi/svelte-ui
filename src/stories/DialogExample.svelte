<script lang="ts">
	import Dialog from '#lib/sharedComponents/Dialog.svelte';
	import type { DialogProps } from '#lib/models/overlay/overlay.types';
	import Button from '#lib/sharedComponents/Button.svelte';

	type DialogExampleProps = Pick<
		DialogProps,
		| 'title'
		| 'scrollable'
		| 'closeIfClickOutside'
		| 'width'
		| 'restoreFocus'
		| 'ariaDescribedby'
		| 'description'
		| 'header'
		| 'children'
		| 'footer'
		| 'bodyStyle'
		| 'noPadding'
	>;

	let {
		title,
		scrollable,
		closeIfClickOutside = true,
		width,
		restoreFocus,
		ariaDescribedby,
		description,
		header,
		children,
		footer,
		bodyStyle,
		noPadding
	}: DialogExampleProps = $props();

	let isOpen = $state(false);

	const openDialog = () => {
		isOpen = true;
	};
</script>

<Button variant="filled" onclick={openDialog}>Open Dialog</Button>

<Dialog
	bind:isOpen
	{title}
	{scrollable}
	{closeIfClickOutside}
	{width}
	{restoreFocus}
	{ariaDescribedby}
	{description}
	{header}
	{children}
	{footer}
	{bodyStyle}
	{noPadding}
/>
