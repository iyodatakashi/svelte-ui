<script lang="ts">
	import SkeletonBox from './SkeletonBox.svelte';
	import { getStyleFromNumber } from '../../utils/style';
	import type { SkeletonButtonConfig } from './Skeleton.svelte';

	let {
		buttonConfig = {},
		animated = true
	}: {
		buttonConfig?: Partial<SkeletonButtonConfig>;
		animated?: boolean;
	} = $props();

	// デフォルト設定
	const DEFAULT_BUTTON_CONFIG: SkeletonButtonConfig = {
		type: 'button',
		width: '120px',
		height: '36px',
		radius: 'var(--svelte-ui-skeleton-button-border-radius)',
		align: 'left',
		customStyle: ''
	};

	// マージされた設定
	const mergedButtonConfig = $derived({
		...DEFAULT_BUTTON_CONFIG,
		...buttonConfig
	});

	const widthStyle = $derived(getStyleFromNumber(mergedButtonConfig.width));
	const heightStyle = $derived(getStyleFromNumber(mergedButtonConfig.height));
	const radiusStyle = $derived(
		typeof mergedButtonConfig.radius === 'number'
			? `${mergedButtonConfig.radius}px`
			: mergedButtonConfig.radius
	);

	// alignに応じたCSSクラスを生成
	const alignClass = $derived(`skeleton-button--align-${mergedButtonConfig.align}`);
</script>

<div class="skeleton-button {alignClass}">
	<SkeletonBox
		width={widthStyle}
		height={heightStyle}
		radius={radiusStyle}
		{animated}
		customStyle={mergedButtonConfig.customStyle}
	/>
</div>

<style>
	.skeleton-button {
		display: flex;
		width: 100%;
	}

	.skeleton-button--align-left {
		justify-content: flex-start;
	}

	.skeleton-button--align-center {
		justify-content: center;
	}

	.skeleton-button--align-right {
		justify-content: flex-end;
	}
</style>
