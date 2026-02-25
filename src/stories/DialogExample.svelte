<script lang="ts">
	import Dialog, { type DialogProps } from '../lib/components/Dialog.svelte';
	import Button from '../lib/components/Button.svelte';
	import type { Snippet } from 'svelte';

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

<Button variant="filled" onclick={openDialog}>
	Open Dialog
</Button>

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

