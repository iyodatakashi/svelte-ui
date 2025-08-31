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
		rounded = false,
		className = '',
		customStyle = ''
	}: {
		width?: string | number;
		lines?: number;
		fontSize?: string | number;
		animated?: boolean;
		rounded?: boolean;
		className?: string;
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
		[
			'skeleton-text-container',
			animated && 'skeleton-text-container--animated',
			rounded && 'skeleton-text-container--rounded',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	const widthStyle = $derived(typeof width === 'number' ? `${width}px` : width);
	const fontSizeStyle = $derived(typeof fontSize === 'number' ? `${fontSize}px` : fontSize);
</script>

<div
	bind:this={containerRef}
	class={containerClasses}
	style="font-size: {fontSizeStyle}; {customStyle}"
>
	{#each Array(lines) as _, index}
		<div class="skeleton-box-container" style="width: {widthStyle}">
			<SkeletonBox width={index === lines - 1 ? '67%' : '100%'} height="1em" />
		</div>
	{/each}
</div>

<style lang="scss">
	.skeleton-text-container {
		display: block;
		width: 100%;
	}

	.skeleton-box-container {
		display: inline-block;
		position: relative;
		width: 100%;
	}
</style>
