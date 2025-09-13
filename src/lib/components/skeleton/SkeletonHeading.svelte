<!-- SkeletonHeading.svelte -->

<script lang="ts">
	import SkeletonText from './SkeletonText.svelte';
	import { getStyleFromNumber } from '../../utils/style';
	import type { SkeletonHeadingConfig } from '../../types/Skeleton';

	// =========================================================================
	// Props
	// =========================================================================

	let {
		headingConfig = {},
		animated = true
	}: {
		headingConfig?: Partial<SkeletonHeadingConfig>;
		animated?: boolean;
	} = $props();

	// デフォルト設定
	const DEFAULT_HEADING_CONFIG: SkeletonHeadingConfig = {
		type: 'heading',
		width: '50%',
		fontSize: '2rem',
		customStyle: ''
	};

	// マージされた設定
	const mergedHeadingConfig = $derived({
		...DEFAULT_HEADING_CONFIG,
		...headingConfig
	});

	// =========================================================================
	// $derived
	// =========================================================================

	const widthStyle = $derived(getStyleFromNumber(mergedHeadingConfig.width));
	const fontSizeStyle = $derived(getStyleFromNumber(mergedHeadingConfig.fontSize));
</script>

<div class="skeleton-heading" style="font-size: {fontSizeStyle}; {mergedHeadingConfig.customStyle}">
	<SkeletonText textConfig={{ width: widthStyle, fontSize: fontSizeStyle }} {animated} />
</div>

<style lang="scss">
	.skeleton-heading {
		display: block;
		width: 100%;
	}
</style>
