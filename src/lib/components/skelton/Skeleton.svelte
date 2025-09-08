<script lang="ts">
	import SkeletonText from './SkeletonText.svelte';
	import SkeletonArticle from './SkeletonArticle.svelte';
	import SkeletonAvatar from './SkeletonAvatar.svelte';
	import SkeletonButtons from './SkeletonButtons.svelte';

	// =========================================================================
	// Props
	// =========================================================================

	type SkeletonPatternConfig =
		| SkeletonTextConfig
		| SkeletonAvatarConfig
		| SkeletonArticleConfig
		| SkeletonButtonsConfig;

	type SkeletonPatternCommonConfig = {
		animated?: boolean;
		customStyle?: string;
	};

	export type SkeletonTextConfig = SkeletonPatternCommonConfig & {
		type: 'text';
		width?: string | number;
		lines?: number;
		fontSize?: string | number;
		radius?: string | number;
	};

	export type SkeletonAvatarConfig = SkeletonPatternCommonConfig & {
		type: 'avatar';
		avatarImageConfig?: SkeletonAvatarImageConfig;
		textConfig?: SkeletonTextConfig;
		showName?: boolean;
	};

	export type SkeletonAvatarImageConfig = SkeletonPatternCommonConfig & {
		type: 'avatar-image';
		size?: string | number;
		radius?: string | number;
	};

	export type SkeletonArticleConfig = SkeletonPatternCommonConfig & {
		type: 'article';
		thumbnailConfig: SkeletonThumbnailConfig;
		textConfig: SkeletonTextConfig;
	};

	export type SkeletonThumbnailConfig = SkeletonPatternCommonConfig & {
		type: 'thumbnail';
		width?: string | number;
		height?: string | number;
		radius?: string | number;
	};

	export type SkeletonButtonsConfig = SkeletonPatternCommonConfig & {
		type: 'buttons';
		width?: string | number;
		height?: string | number;
		radius?: string | number;
		count?: number;
		align?: 'left' | 'center' | 'right';
	};

	let {
		// 基本プロパティ
		patterns = [{ type: 'text' }] as SkeletonPatternConfig[],
		repeat = 1,
		gap = '24px',
		itemGap = '16px',
		className = '',
		customStyle = ''
	}: {
		patterns?: SkeletonPatternConfig[];
		repeat?: number;
		gap?: string | number;
		itemGap?: string | number;
		className?: string;
		customStyle?: string;
	} = $props();

	// =========================================================================
	// $derived
	// =========================================================================

	const containerClasses = $derived(['skeleton-container', className].filter(Boolean).join(' '));

	const gapStyle = $derived(typeof gap === 'number' ? `${gap}px` : gap);
	const itemGapStyle = $derived(typeof itemGap === 'number' ? `${itemGap}px` : itemGap);
</script>

<div class={containerClasses} style={customStyle}>
	<div class="skeleton-items-container" style="gap: {gapStyle};">
		{#each Array(repeat) as _, index}
			<div class="item" style="gap: {itemGapStyle};">
				{#each patterns as pattern}
					{#if pattern.type === 'text'}
						<SkeletonText lines={3} />
					{:else if pattern.type === 'avatar'}
						<div class="user-list-container">
							<SkeletonAvatar
								showName
								avatarImageConfig={{ type: 'avatar-image', size: '40px' }}
								textConfig={{ type: 'text', width: '160px' }}
							/>
						</div>
					{:else if pattern.type === 'article'}
						<SkeletonArticle />
					{:else if pattern.type === 'buttons'}
						<div class="buttons-container">
							<SkeletonButtons buttonsConfig={{ count: 2 }} />
						</div>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.skeleton-container {
		display: block;
		width: 100%;
		max-width: 100%;
	}

	.skeleton-items-container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.item {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
