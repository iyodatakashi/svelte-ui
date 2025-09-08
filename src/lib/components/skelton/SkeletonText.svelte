<script lang="ts">
	import SkeletonBox from './SkeletonBox.svelte';

	// =========================================================================
	// Props
	// =========================================================================

	let {
		// 基本プロパティ
		width = '100%',
		lines = 1,
		fontSize = 'inherit',
		animated = true,
		rounded = true,
		customStyle = ''
	}: {
		width?: string | number;
		lines?: number;
		fontSize?: string | number;
		animated?: boolean;
		rounded?: boolean;
		customStyle?: string;
	} = $props();

	// =========================================================================
	// State
	// =========================================================================

	let containerRef: HTMLDivElement;

	// =========================================================================
	// $derived
	// =========================================================================

	const containerClasses = $derived(
		['skeleton-text', animated && 'skeleton-text--animated', rounded && 'skeleton-text--rounded']
			.filter(Boolean)
			.join(' ')
	);

	const getStyleFromNumber = (value: string | number) => {
		return typeof value === 'number' ? `${value}px` : value;
	};

	const widthStyle = $derived(getStyleFromNumber(width));
	const fontSizeStyle = $derived(getStyleFromNumber(fontSize));
</script>

<div
	bind:this={containerRef}
	class="skeleton-text {containerClasses}"
	style="font-size: {fontSizeStyle}; {customStyle}"
>
	{#each Array(lines) as _, index}
		<div class="skeleton-box-container" style="width: {widthStyle}">
			<SkeletonBox
				width={index === lines - 1 ? '67%' : '100%'}
				height="1em"
				customStyle="border-radius: var(--svelte-ui-skeleton-text-radius)"
			/>
		</div>
	{/each}
</div>

<style lang="scss">
	.skeleton-text {
		display: block;
		width: 100%;
		height: 100%;
	}

	.skeleton-box-container {
		display: inline-block;
		position: relative;
		width: 100%;
	}
</style>
