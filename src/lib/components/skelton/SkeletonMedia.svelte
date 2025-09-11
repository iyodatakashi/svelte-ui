<script lang="ts">
	import SkeletonBox from './SkeletonBox.svelte';
	import SkeletonText from './SkeletonText.svelte';
	import { getStyleFromNumber } from '../../utils/style';
	import type {
		SkeletonMediaConfig,
		SkeletonThumbnailConfig,
		SkeletonTextConfig
	} from './Skeleton.svelte';

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
	const DEFAULT_THUMBNAIL_CONFIG: SkeletonThumbnailConfig = {
		type: 'thumbnail',
		width: '120px',
		height: '80px',
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
		...(mediaConfig.thumbnailConfig || {})
	});

	const mergedTextConfig = $derived({
		...DEFAULT_TEXT_CONFIG,
		...(mediaConfig.textConfig || {})
	});

	const widthStyle = $derived(getStyleFromNumber(width));
	const thumbnailWidthStyle = $derived(getStyleFromNumber(mergedThumbnailConfig.width));
	const thumbnailHeightStyle = $derived(getStyleFromNumber(mergedThumbnailConfig.height));
	const textWidthStyle = $derived(getStyleFromNumber(mergedTextConfig.width));
</script>

<div class="skeleton-media" style="width: {widthStyle}">
	<SkeletonBox
		width={thumbnailWidthStyle}
		height={thumbnailHeightStyle}
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
</style>
