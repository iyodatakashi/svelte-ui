<script lang="ts">
	import SkeletonBox from './SkeletonBox.svelte';

	// =========================================================================
	// Props
	// =========================================================================

	let {
		// 基本プロパティ
		size = 'medium' as 'small' | 'medium' | 'large',
		showName = false,
		nameWidth = '240px',
		width,
		height,
		animated = true,
		rounded = true,
		customStyle = ''
	}: {
		size?: 'small' | 'medium' | 'large';
		showName?: boolean;
		nameWidth?: string | number;
		width?: string | number;
		height?: string | number;
		animated?: boolean;
		rounded?: boolean;
		customStyle?: string;
	} = $props();

	// =========================================================================
	// $derived
	// =========================================================================

	const sizeMap = {
		small: 32,
		medium: 40,
		large: 56
	};

	const widthStyle = $derived(
		width ? (typeof width === 'number' ? `${width}px` : width) : `${sizeMap[size]}px`
	);
	const heightStyle = $derived(
		height ? (typeof height === 'number' ? `${height}px` : height) : `${sizeMap[size]}px`
	);
	const nameWidthStyle = $derived(typeof nameWidth === 'number' ? `${nameWidth}px` : nameWidth);
</script>

{#if showName}
	<div class="skeleton-avatar-with-name" style={customStyle}>
		<SkeletonBox width={widthStyle} height={heightStyle} {animated} {rounded} />
		<SkeletonBox width={nameWidthStyle} height="1em" {animated} />
	</div>
{:else}
	<SkeletonBox width={widthStyle} height={heightStyle} {animated} {rounded} />
{/if}

<style lang="scss">
	.skeleton-avatar-with-name {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
	}
</style>
