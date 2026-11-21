<!-- TooltipScene.svelte - Tooltip around a button, with a neutral button to move focus to -->
<script lang="ts">
	import Tooltip from '../../lib/components/Tooltip.svelte';
	import type { TooltipPosition } from '../../lib/types/propOptions';

	let {
		text = 'Bold (⌘B)',
		position,
		delay,
		ariaDescribedby,
		targetStyle = 'margin: 120px;'
	}: {
		text?: string;
		position?: TooltipPosition;
		delay?: number;
		ariaDescribedby?: string;
		targetStyle?: string;
	} = $props();
</script>

<button id="before">before</button>
<Tooltip {text} {position} {delay} id="tooltip-label">
	<button id="target" aria-describedby={ariaDescribedby} style={targetStyle}>B</button>
</Tooltip>
<button id="after">after</button>
