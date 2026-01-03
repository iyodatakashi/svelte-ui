<!-- SkeletonMedia.svelte -->

<script lang="ts">
	import SkeletonBox from './SkeletonBox.svelte';
	import SkeletonText from './SkeletonText.svelte';
	import { getStyleFromNumber } from '$lib/utils/style';
	import type {
		SkeletonMediaConfig,
		SkeletonThumbnailConfig,
		SkeletonTextConfig
	} from '$lib/types/skeleton';

	let {
		width = '100%',
		mediaConfig = {},
		animated = true
	}: {
		width?: string | number;
		mediaConfig?: Partial<SkeletonMediaConfig>;
		animated?: boolean;
	} = $props();

	// デフォルト設定
	const DEFAULT_MEDIA_CONFIG: Partial<SkeletonMediaConfig> = {
		type: 'media',
		layout: 'horizontal',
		thumbnailConfig: { width: '160px', aspectRatio: '16/9' },
		textConfig: { width: '100%', lines: 2 }
	};

	// マージされた設定
	const mergedMediaConfig = $derived({
		...DEFAULT_MEDIA_CONFIG,
		...mediaConfig
	});

	// レイアウト方向を取得
	const layoutDirection = $derived(mergedMediaConfig.layout || 'horizontal');

	// デフォルト設定
	const DEFAULT_THUMBNAIL_CONFIG: SkeletonThumbnailConfig = {
		type: 'thumbnail',
		width: '120px',
		radius: 'var(--svelte-ui-skeleton-button-border-radius)',
		customStyle: ''
	};
	const DEFAULT_TEXT_CONFIG: SkeletonTextConfig = {
		type: 'text',
		width: '100%',
		lines: 2,
		customStyle: ''
	};

	// マージされた設定
	const mergedThumbnailConfig = $derived({
		...DEFAULT_THUMBNAIL_CONFIG,
		...(mergedMediaConfig.thumbnailConfig || {})
	});

	const mergedTextConfig = $derived({
		...DEFAULT_TEXT_CONFIG,
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
		gap: 16px;
	}

	.skeleton-media--vertical {
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr;
		justify-items: center;
		gap: 8px;
	}
</style>
