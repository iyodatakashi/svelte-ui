<script lang="ts">
	import SkeletonBox from './SkeletonBox.svelte';

	// =========================================================================
	// Props
	// =========================================================================

	let {
		// 基本プロパティ
		size = '40px',
		showName = false,
		nameWidth = '180px',
		animated = true,
		customStyle = ''
	}: {
		size?: string | number;
		showName?: boolean;
		nameWidth?: string | number;
		animated?: boolean;
		customStyle?: string;
	} = $props();

	// =========================================================================
	// $derived
	// =========================================================================

	const widthStyle = $derived(typeof size === 'number' ? `${size}px` : size);
	const heightStyle = $derived(typeof size === 'number' ? `${size}px` : size);
	const nameWidthStyle = $derived(typeof nameWidth === 'number' ? `${nameWidth}px` : nameWidth);
</script>

{#if showName}
	<div class="skeleton-avatar-with-name" style={customStyle}>
		<SkeletonBox
			width={widthStyle}
			height={heightStyle}
			radius="var(--svelte-ui-skeleton-avatar-radius)"
			{animated}
		/>
		<SkeletonBox
			width={nameWidthStyle}
			height="1em"
			radius="var(--svelte-ui-skeleton-text-radius)"
			{animated}
		/>
	</div>
{:else}
	<SkeletonBox
		width={widthStyle}
		height={heightStyle}
		radius="var(--svelte-ui-skeleton-avatar-radius)"
		{animated}
	/>
{/if}

<style lang="scss">
	.skeleton-avatar-with-name {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
	}
</style>
