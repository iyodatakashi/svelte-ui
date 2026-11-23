<!-- SkeletonHeading.svelte -->

<script lang="ts">
	import SkeletonText from './SkeletonText.svelte';
	import { getStyleFromNumber } from '#lib/utils/style';
	import { DEFAULT_HEADING_CONFIG } from '#lib/models/skeleton/skeleton.constants';
	import type { SkeletonHeadingProps } from '#lib/models/skeleton/skeleton.types';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================

	let {
		width = DEFAULT_HEADING_CONFIG.width,
		fontSize = DEFAULT_HEADING_CONFIG.fontSize,
		customStyle = DEFAULT_HEADING_CONFIG.customStyle,
		animated = true
	}: SkeletonHeadingProps = $props();

	// =========================================================================
	// $derived
	// =========================================================================
	const widthStyle = $derived(getStyleFromNumber(width));
	const fontSizeStyle = $derived(
		typeof fontSize === 'string' && fontSize.startsWith('var(')
			? fontSize
			: getStyleFromNumber(fontSize)
	);
</script>

<div class="skeleton-heading" style="font-size: {fontSizeStyle}; {customStyle}">
	<SkeletonText width={widthStyle} {animated} />
</div>

<style lang="scss">
	@use '#lib/assets/styles/component-base' as base;

	@include base.box-sizing;

	.skeleton-heading {
		display: block;
		width: 100%;
	}
</style>
