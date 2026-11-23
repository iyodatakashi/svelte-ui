<script lang="ts">
	import Tooltip from '#lib/sharedComponents/Tooltip.svelte';
	import IconButton from '#lib/sharedComponents/IconButton.svelte';
	import type { TooltipPosition } from '#lib/models/tooltip/tooltip.types';

	type TooltipExampleProps = {
		text?: string;
		id?: string;
		customStyle?: string;
		position?: TooltipPosition;
		margin?: number;
		delay?: number;
	};

	let {
		text = 'Bold (⌘B)',
		id,
		customStyle,
		position,
		margin,
		delay
	}: TooltipExampleProps = $props();
</script>

<Tooltip {text} {id} {customStyle} {position} {margin} {delay}>
	<IconButton ariaLabel="Bold">format_bold</IconButton>
</Tooltip>
