<!-- SkeletonMedia.svelte -->

<script lang="ts">
	import SkeletonBox from './SkeletonBox.svelte';
	import SkeletonText from './SkeletonText.svelte';
	import { getStyleFromNumber } from '$lib/utils/style';
	import type { SkeletonMediaConfig } from '$lib/types/skeleton';
	import {
		DEFAULT_MEDIA_CONFIG,
		DEFAULT_THUMBNAIL_CONFIG,
		DEFAULT_TEXT_CONFIG_MEDIA
	} from '$lib/constants/skeleton';

	let {
		width = '100%',
		mediaConfig = {},
		animated = true
	}: {
		width?: string | number;
		mediaConfig?: Partial<SkeletonMediaConfig>;
		animated?: boolean;
	} = $props();

	// マージされた設定
	const mergedMediaConfig = $derived({
		...DEFAULT_MEDIA_CONFIG,
		...mediaConfig
	});

	// レイアウト方向を取得
	const layoutDirection = $derived(mergedMediaConfig.layout || 'horizontal');

	// マージされた設定
	const mergedThumbnailConfig = $derived({
		...DEFAULT_THUMBNAIL_CONFIG,
		...(mergedMediaConfig.thumbnailConfig || {})
	});

	const mergedTextConfig = $derived({
		...DEFAULT_TEXT_CONFIG_MEDIA,
		...(mergedMediaConfig.textConfig || {})
	});

	const widthStyle = $derived(getStyleFromNumber(width));
	const thumbnailWidthStyle = $derived(getStyleFromNumber(mergedThumbnailConfig.width));
	const thumbnailHeightStyle = $derived(
		mergedThumbnailConfig.height ? getStyleFromNumber(mergedThumbnailConfig.height) : ''
	);
	const textWidthStyle = $derived(getStyleFromNumber(mergedTextConfig.width));

	// heightとaspectRatioの優先順位を制御
	const finalThumbnailHeight = $derived(mergedThumbnailConfig.height ? thumbnailHeightStyle : '');
	const finalThumbnailAspectRatio = $derived(
		mergedThumbnailConfig.height ? undefined : mergedThumbnailConfig.aspectRatio
	);
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
		radius={mergedThumbnailConfig.radius}
		{animated}
		customStyle={mergedThumbnailConfig.customStyle}
	/>
	<SkeletonText
		textConfig={{
			width: textWidthStyle,
			lines: mergedTextConfig.lines,
			fontSize: mergedTextConfig.fontSize
		}}
		{animated}
	/>
</div>

<style>
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
