<!-- SkeletonText.svelte -->

<script lang="ts">
	import SkeletonBox from './SkeletonBox.svelte';
	import { getStyleFromNumber } from '$lib/utils/style';
	import type { SkeletonTextConfig } from '$lib/types/skeleton';
	import { DEFAULT_TEXT_CONFIG } from '$lib/constants/skeleton';

	// =========================================================================
	// Props
	// =========================================================================

	let {
		// 基本プロパティ
		textConfig = {},
		animated = true
	}: {
		textConfig?: Partial<SkeletonTextConfig>;
		animated?: boolean;
	} = $props();

	// マージされた設定
	const mergedTextConfig = $derived({
		...DEFAULT_TEXT_CONFIG,
		...textConfig
	});

	// =========================================================================
	// State
	// =========================================================================

	let containerRef: HTMLDivElement;

	// =========================================================================
	// $derived
	// =========================================================================

	const widthStyle = $derived(getStyleFromNumber(mergedTextConfig.width));
	const fontSizeStyle = $derived(getStyleFromNumber(mergedTextConfig.fontSize));
</script>

<div
	bind:this={containerRef}
	class="skeleton-text"
	style="font-size: {fontSizeStyle}; {mergedTextConfig.customStyle}"
>
	{#each Array(mergedTextConfig.lines) as _, index}
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
