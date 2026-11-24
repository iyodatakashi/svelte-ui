<script lang="ts">
	import Drawer from '#lib/sharedComponents/Drawer.svelte';
	import type { DrawerProps } from '#lib/models/overlay/overlay.types';
	import Button from '#lib/sharedComponents/Button.svelte';

	type DrawerExampleProps = Pick<
		DrawerProps,
		| 'title'
		| 'scrollable'
		| 'closeIfClickOutside'
		| 'width'
		| 'position'
		| 'ariaLabel'
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
		position,
		ariaLabel,
		restoreFocus,
		ariaDescribedby,
		description,
		header,
		children,
		footer,
		bodyStyle,
		noPadding
	}: DrawerExampleProps = $props();

	let isOpen = $state(false);

	const openDrawer = () => {
		isOpen = true;
	};
</script>

<Button variant="filled" onclick={openDrawer}>Open Drawer</Button>

<Drawer
	bind:isOpen
	{title}
	{scrollable}
	{closeIfClickOutside}
	{width}
	{position}
	{ariaLabel}
	{restoreFocus}
	{ariaDescribedby}
	{description}
	{header}
	{children}
	{footer}
	{bodyStyle}
	{noPadding}
/>
