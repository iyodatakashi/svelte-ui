<script lang="ts">
	import Tooltip from '../lib/components/Tooltip.svelte';
	import IconButton from '../lib/components/IconButton.svelte';
	import type { TooltipPosition } from '$lib/types/propOptions';

	type TooltipToolbarExampleProps = {
		customStyle?: string;
		margin?: number;
		delay?: number;
	};

	let { customStyle, margin, delay }: TooltipToolbarExampleProps = $props();

	const buttons = [
		{ icon: 'format_bold', label: 'Bold', keys: '⌘B' },
		{ icon: 'format_italic', label: 'Italic', keys: '⌘I' },
		{ icon: 'format_strikethrough', label: 'Strikethrough', keys: '⌘⇧X' },
		{ icon: 'link', label: 'Link', keys: '⌘K' }
	];

	const toolbars: { side: TooltipPosition; orientation: 'horizontal' | 'vertical' }[] = [
		{ side: 'bottom', orientation: 'horizontal' },
		{ side: 'top', orientation: 'horizontal' },
		{ side: 'right', orientation: 'vertical' },
		{ side: 'left', orientation: 'vertical' }
	];
</script>

<div class="toolbars">
	{#each toolbars as toolbar (toolbar.side)}
		<div
			class="toolbar toolbar--{toolbar.orientation}"
			role="toolbar"
			aria-label="Tooltip on {toolbar.side}"
		>
			{#each buttons as button (button.icon)}
				<Tooltip
					text="{button.label} ({button.keys})"
					position={toolbar.side}
					{customStyle}
					{margin}
					{delay}
				>
					<IconButton ariaLabel={button.label}>{button.icon}</IconButton>
				</Tooltip>
			{/each}
		</div>
	{/each}
</div>

<style>
	.toolbars {
		display: flex;
		align-items: flex-start;
		gap: 48px;
		padding: 48px;
	}

	.toolbar {
		display: flex;
		gap: 4px;
		border: 1px solid var(--svelte-ui-border-color);
		border-radius: var(--svelte-ui-border-radius);
		padding: 4px;
	}

	.toolbar--vertical {
		flex-direction: column;
	}
</style>
