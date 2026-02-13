<!-- SkeletonButton.svelte -->

<script lang="ts">
	import SkeletonBox from './SkeletonBox.svelte';
	import { getStyleFromNumber } from '$lib/utils/style';
	import { DEFAULT_BUTTON_CONFIG } from '$lib/constants/skeleton';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type SkeletonButtonProps = {
		width?: string | number;
		height?: string | number;
		radius?: string | number;
		align?: 'left' | 'center' | 'right';
		customStyle?: string;
		animated?: boolean;
	};

	let {
		width = DEFAULT_BUTTON_CONFIG.width,
		height = DEFAULT_BUTTON_CONFIG.height,
		radius = DEFAULT_BUTTON_CONFIG.radius,
		align = DEFAULT_BUTTON_CONFIG.align,
		customStyle = DEFAULT_BUTTON_CONFIG.customStyle,
		animated = true
	}: SkeletonButtonProps = $props();

	// =========================================================================
	// $derived
	// =========================================================================
	const widthStyle = $derived(getStyleFromNumber(width));
	const heightStyle = $derived(getStyleFromNumber(height));
	const radiusStyle = $derived(
		typeof radius === 'number' ? `${radius}px` : radius
	);

	// alignに応じたCSSクラスを生成
	const alignClass = $derived(`skeleton-button--align-${align}`);
</script>

<div class="skeleton-button {alignClass}">
	<SkeletonBox
		width={widthStyle}
		height={heightStyle}
		radius={radiusStyle}
		{animated}
		{customStyle}
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
