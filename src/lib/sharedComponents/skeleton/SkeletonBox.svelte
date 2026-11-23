<!-- SkeletonBox.svelte -->

<script lang="ts">
	import { getStyleFromNumber } from '#lib/utils/style';
	import { DEFAULT_BOX_CONFIG } from '#lib/models/skeleton/skeleton.constants';
	import type { SkeletonBoxProps } from '#lib/models/skeleton/skeleton.types';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================

	let {
		// 基本プロパティ
		width,
		height,
		aspectRatio,
		radius,
		animated = true,
		className = '',
		customStyle = ''
	}: SkeletonBoxProps = $props();

	// =========================================================================
	// $derived
	// =========================================================================
	const containerClasses = $derived(
		['skeleton-box', animated && 'skeleton-box--animated', className].filter(Boolean).join(' ')
	);

	const mergedConfig = $derived({
		...DEFAULT_BOX_CONFIG,
		width: width ?? DEFAULT_BOX_CONFIG.width,
		height: height ?? DEFAULT_BOX_CONFIG.height,
		radius: radius ?? DEFAULT_BOX_CONFIG.radius
	});

	const widthStyle = $derived(getStyleFromNumber(mergedConfig.width));
	const heightStyle = $derived(getStyleFromNumber(mergedConfig.height));
	const aspectRatioStyle = $derived(aspectRatio ? getStyleFromNumber(aspectRatio) : '');
	const radiusStyle = $derived(getStyleFromNumber(mergedConfig.radius));

	// heightとaspectRatioの優先順位を制御
	const finalHeightStyle = $derived(
		height ? heightStyle : aspectRatio ? '' : getStyleFromNumber(mergedConfig.height)
	);
	const finalAspectRatioStyle = $derived(height ? '' : aspectRatio ? aspectRatioStyle : '');
</script>

<div
	class={containerClasses}
	style="width: {widthStyle}; {finalHeightStyle
		? `height: ${finalHeightStyle};`
		: ''} {finalAspectRatioStyle
		? `aspect-ratio: ${finalAspectRatioStyle};`
		: ''} border-radius: {radiusStyle}; {customStyle}"
></div>

<style lang="scss">
	@use '#lib/assets/styles/component-base' as base;

	@include base.box-sizing;

	.skeleton-box {
		display: block;
		background-color: var(--svelte-ui-skeleton-color);

		&--animated {
			animation: skeleton-pulse 3s infinite;
		}
	}

	@keyframes skeleton-pulse {
		0% {
			opacity: 1;
			animation-timing-function: ease-in-out;
		}
		50% {
			opacity: 0.3;
			animation-timing-function: ease-in-out;
		}
		100% {
			opacity: 1;
		}
	}
</style>
