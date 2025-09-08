<script lang="ts">
	import SkeletonBox from './SkeletonBox.svelte';
	import SkeletonText from './SkeletonText.svelte';
	import type { SkeletonThumbnailConfig, SkeletonTextConfig } from './Skeleton.svelte';

	let {
		width = '100%',
		thumbnailConfig = {},
		textConfig = {},
		animated = true
	}: {
		width?: string | number;
		thumbnailConfig?: Partial<SkeletonThumbnailConfig>;
		textConfig?: Partial<SkeletonTextConfig>;
		animated?: boolean;
	} = $props();

	// デフォルト設定
	const DEFAULT_THUMBNAIL_CONFIG: SkeletonThumbnailConfig = {
		type: 'thumbnail',
		width: '120px',
		height: '80px',
		radius: 'var(--svelte-ui-skeleton-button-border-radius)',
		animated: true,
		customStyle: ''
	};
	const DEFAULT_TEXT_CONFIG: SkeletonTextConfig = {
		type: 'text',
		width: '100%',
		lines: 2,
		animated: true,
		customStyle: ''
	};

	// マージされた設定
	const mergedThumbnailConfig = $derived({
		...DEFAULT_THUMBNAIL_CONFIG,
		...thumbnailConfig
	});

	const mergedTextConfig = $derived({
		...DEFAULT_TEXT_CONFIG,
		...textConfig
	});

	const getStyleFromNumber = (value: string | number) => {
		return typeof value === 'number' ? `${value}px` : value;
	};

	const widthStyle = $derived(getStyleFromNumber(width));
	const thumbnailWidthStyle = $derived(getStyleFromNumber(mergedThumbnailConfig.width));
	const thumbnailHeightStyle = $derived(getStyleFromNumber(mergedThumbnailConfig.height));
	const textWidthStyle = $derived(getStyleFromNumber(mergedTextConfig.width));
</script>

<div class="skeleton-article" style="width: {widthStyle}">
	<SkeletonBox
		width={thumbnailWidthStyle}
		height={thumbnailHeightStyle}
		radius={mergedThumbnailConfig.radius}
		{animated}
		customStyle={thumbnailConfig.customStyle}
	/>
	<SkeletonText
		width={textWidthStyle}
		lines={mergedTextConfig.lines}
		fontSize={mergedTextConfig.fontSize}
		{animated}
	/>
</div>

<style>
	.skeleton-article {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 16px;
	}
</style>
