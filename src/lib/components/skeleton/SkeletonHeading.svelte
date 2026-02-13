<!-- SkeletonHeading.svelte -->

<script lang="ts">
	import SkeletonText from './SkeletonText.svelte';
	import { getStyleFromNumber } from '$lib/utils/style';
	import { DEFAULT_HEADING_CONFIG } from '$lib/constants/skeleton';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type SkeletonHeadingProps = {
		width?: string | number;
		fontSize?: string | number;
		customStyle?: string;
		animated?: boolean;
	};

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
	.skeleton-heading {
		display: block;
		width: 100%;
	}
</style>
