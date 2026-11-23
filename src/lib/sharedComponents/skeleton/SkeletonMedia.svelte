<!-- SkeletonMedia.svelte -->

<script lang="ts">
	import SkeletonBox from './SkeletonBox.svelte';
	import SkeletonText from './SkeletonText.svelte';
	import { getStyleFromNumber } from '#lib/utils/style';
	import {
		DEFAULT_MEDIA_CONFIG,
		DEFAULT_THUMBNAIL_CONFIG,
		DEFAULT_TEXT_CONFIG_MEDIA
	} from '#lib/models/skeleton/skeleton.constants';
	import type { SkeletonMediaProps } from '#lib/models/skeleton/skeleton.types';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================

	let {
		width = '100%',
		layout = DEFAULT_MEDIA_CONFIG.layout,
		textWidth = DEFAULT_TEXT_CONFIG_MEDIA.width,
		lines = DEFAULT_TEXT_CONFIG_MEDIA.lines,
		fontSize,
		thumbnailWidth = DEFAULT_THUMBNAIL_CONFIG.width,
		thumbnailHeight,
		thumbnailAspectRatio,
		thumbnailRadius = DEFAULT_THUMBNAIL_CONFIG.radius,
		animated = true
	}: SkeletonMediaProps = $props();

	// =========================================================================
	// $derived
	// =========================================================================
	const layoutDirection = $derived(layout || 'horizontal');

	const widthStyle = $derived(getStyleFromNumber(width));
	const thumbnailWidthStyle = $derived(getStyleFromNumber(thumbnailWidth));
	const thumbnailHeightStyle = $derived(thumbnailHeight ? getStyleFromNumber(thumbnailHeight) : '');
	const textWidthStyle = $derived(getStyleFromNumber(textWidth));

	// heightとaspectRatioの優先順位を制御
	const finalThumbnailHeight = $derived(thumbnailHeight ? thumbnailHeightStyle : '');
	const finalThumbnailAspectRatio = $derived(thumbnailHeight ? undefined : thumbnailAspectRatio);
	const thumbnailRadiusStyle = $derived(thumbnailRadius ? getStyleFromNumber(thumbnailRadius) : '');
</script>

<div
	class="skeleton-media"
	class:skeleton-media--vertical={layoutDirection === 'vertical'}
	style="width: {widthStyle}"
>
	<SkeletonBox
		width={thumbnailWidthStyle}
		{...finalThumbnailHeight && { height: finalThumbnailHeight }}
		aspectRatio={finalThumbnailAspectRatio}
		radius={thumbnailRadiusStyle}
		{animated}
	/>
	<SkeletonText width={textWidthStyle} {lines} {fontSize} {animated} />
</div>

<style lang="scss">
	@use '#lib/assets/styles/component-base' as base;

	@include base.box-sizing;

	.skeleton-media {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: var(--svelte-ui-skeleton-media-gap);
	}

	.skeleton-media--vertical {
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;
		justify-items: center;
		gap: var(--svelte-ui-skeleton-media-vertical-gap);
	}
</style>
