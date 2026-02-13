<!-- SkeletonText.svelte -->

<script lang="ts">
	import SkeletonBox from './SkeletonBox.svelte';
	import { getStyleFromNumber } from '$lib/utils/style';
	import { DEFAULT_TEXT_CONFIG } from '$lib/constants/skeleton';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type SkeletonTextProps = {
		width?: string | number;
		lines?: number;
		fontSize?: string | number;
		customStyle?: string;
		animated?: boolean;
	};

	let {
		width = DEFAULT_TEXT_CONFIG.width,
		lines = DEFAULT_TEXT_CONFIG.lines,
		fontSize,
		customStyle = DEFAULT_TEXT_CONFIG.customStyle,
		animated = true
	}: SkeletonTextProps = $props();

	// =========================================================================
	// $derived
	// =========================================================================
	let containerRef: HTMLDivElement;

	const widthStyle = $derived(getStyleFromNumber(width));
	const fontSizeStyle = $derived(fontSize ? getStyleFromNumber(fontSize) : '');
</script>

<div
	bind:this={containerRef}
	class="skeleton-text"
	style="font-size: {fontSizeStyle}; {customStyle}"
>
	{#each Array(lines) as _, index}
		<div class="skeleton-text__line" style="width: {widthStyle}">
			<SkeletonBox
				width="100%"
				height="var(--svelte-ui-skeleton-text-line-height)"
				radius="var(--svelte-ui-skeleton-text-border-radius)"
				{animated}
			/>
		</div>
	{/each}
</div>

<style lang="scss">
	.skeleton-text {
		display: block;
		width: 100%;
	}

	.skeleton-text__line {
		display: inline-block;
		position: relative;
		width: 100%;
	}
</style>
