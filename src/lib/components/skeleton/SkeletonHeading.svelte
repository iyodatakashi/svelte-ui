<!-- SkeletonHeading.svelte -->

<script lang="ts">
	import SkeletonText from './SkeletonText.svelte';
	import { getStyleFromNumber } from '$lib/utils/style';
	import type { SkeletonHeadingConfig } from '$lib/types/skeleton';
	import { DEFAULT_HEADING_CONFIG } from '$lib/constants/skeleton';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type SkeletonHeadingProps = {
		headingConfig?: Partial<SkeletonHeadingConfig>;
		animated?: boolean;
	};

	let { headingConfig = {}, animated = true }: SkeletonHeadingProps = $props();

	// =========================================================================
	// $derived
	// =========================================================================
	// マージされた設定
	const mergedHeadingConfig = $derived({
		...DEFAULT_HEADING_CONFIG,
		...headingConfig
	});

	const widthStyle = $derived(getStyleFromNumber(mergedHeadingConfig.width));
	const fontSizeStyle = $derived(
		mergedHeadingConfig.fontSize
			? typeof mergedHeadingConfig.fontSize === 'string' &&
				mergedHeadingConfig.fontSize.startsWith('var(')
				? mergedHeadingConfig.fontSize
				: getStyleFromNumber(mergedHeadingConfig.fontSize)
			: DEFAULT_HEADING_CONFIG.fontSize
	);
</script>

<div class="skeleton-heading" style="font-size: {fontSizeStyle}; {mergedHeadingConfig.customStyle}">
	<SkeletonText textConfig={{ width: widthStyle }} {animated} />
</div>

<style lang="scss">
	.skeleton-heading {
		display: block;
		width: 100%;
	}
</style>
