<!-- SkeletonBox.svelte -->

<script lang="ts">
	import { getStyleFromNumber } from '$lib/utils/style';
	import { DEFAULT_BOX_CONFIG } from '$lib/constants/skeleton';

	// =========================================================================
	// Props
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
	}: {
		width?: string | number;
		height?: string | number;
		aspectRatio?: string | number;
		radius?: string | number;
		animated?: boolean;
		className?: string;
		customStyle?: string;
	} = $props();

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
>
	<div class="skeleton-box__content"></div>
</div>

<style lang="scss">
	.skeleton-box {
		display: block;
		position: relative;
		overflow: hidden;

		&--animated {
			.skeleton-box__content {
				animation: skeleton-pulse 4s infinite;
			}
		}
	}

	.skeleton-box__content {
		width: 100%;
		height: 100%;
		background-color: var(--svelte-ui-skeleton-color);
		display: block;
	}

	@keyframes skeleton-pulse {
		0% {
			opacity: 1;
			animation-timing-function: ease-in-out;
		}
		50% {
			opacity: 0.5;
			animation-timing-function: ease-in-out;
		}
		100% {
			opacity: 1;
		}
	}
</style>
