<script lang="ts">
	import { getStyleFromNumber } from '../../utils/style';

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
	// Constants
	// =========================================================================

	const DEFAULT_BOX_CONFIG = {
		width: '100%',
		height: '240px',
		radius: 'var(--svelte-ui-skeleton-box-border-radius)'
	};

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
	const finalHeightStyle = $derived(height ? heightStyle : '');
	const finalAspectRatioStyle = $derived(height ? '' : aspectRatioStyle);
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
				position: relative;
				overflow: hidden;

				&::before {
					content: '';
					position: absolute;
					top: 0;
					left: -100%;
					width: 100%;
					height: 100%;
					background: linear-gradient(
						90deg,
						transparent,
						var(--svelte-ui-skeleton-shimmer-color),
						transparent
					);
					animation: skeleton-shimmer 1.5s infinite;
				}
			}
		}
	}

	.skeleton-box__content {
		width: 100%;
		height: 100%;
		background-color: var(--svelte-ui-skeleton-bg-color);
		display: block;
	}

	@keyframes skeleton-shimmer {
		0% {
			left: -100%;
		}
		100% {
			left: 100%;
		}
	}
</style>
