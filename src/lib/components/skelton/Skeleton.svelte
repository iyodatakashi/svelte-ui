<script lang="ts">
	import SkeletonText from './SkeletonText.svelte';
	import SkeletonBox from './SkeletonBox.svelte';
	import SkeletonAvatar from './SkeletonAvatar.svelte';

	// =========================================================================
	// Props
	// =========================================================================

	let {
		// 基本プロパティ
		pattern = 'default' as 'default' | 'card' | 'user-list' | 'item-list',
		repeat = 1,
		gap = '24px',
		animated = true,
		rounded = false,
		className = '',
		customStyle = ''
	}: {
		pattern?: 'default' | 'card' | 'user-list' | 'item-list';
		repeat?: number;
		gap?: string | number;
		animated?: boolean;
		rounded?: boolean;
		className?: string;
		customStyle?: string;
	} = $props();

	// =========================================================================
	// $derived
	// =========================================================================

	const containerClasses = $derived(
		[
			'skeleton-container',
			`skeleton-container--${pattern}`,
			animated && 'skeleton-container--animated',
			rounded && 'skeleton-container--rounded',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	const gapStyle = $derived(typeof gap === 'number' ? `${gap}px` : gap);
</script>

<div class={containerClasses} style="gap: {gapStyle}; {customStyle}">
	{#each Array(repeat) as _, index}
		{#if pattern === 'default'}
			<SkeletonText width="100%" lines={3} />
		{:else if pattern === 'card'}
			<div class="card-container">
				<SkeletonBox width="100%" height="200px" />
				<SkeletonText width="100%" lines={3} />
				<SkeletonBox width="120px" height="36px" />
			</div>
		{:else if pattern === 'user-list'}
			<div class="user-list-container">
				<SkeletonAvatar size="medium" showName={true} />
			</div>
		{:else if pattern === 'item-list'}
			<div class="item-list-container">
				<SkeletonBox width="120px" height="80px" />
				<div style="flex: 1;">
					<SkeletonText lines={2} />
				</div>
			</div>
		{/if}
	{/each}
</div>

<style lang="scss">
	.skeleton-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 100%;
	}

	.card-container {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.item-list-container {
		display: flex;
		gap: 16px;
	}
</style>
