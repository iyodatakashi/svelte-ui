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
		thumbnailConfig?: SkeletonThumbnailConfig;
		textConfig?: SkeletonTextConfig;
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
		customStyle = '',
		animated = true
	}: {
		patterns?: SkeletonPatternConfig[];
		repeat?: number;
		gap?: string | number;
		itemGap?: string | number;
		className?: string;
		customStyle?: string;
		animated?: boolean;
	} = $props();

	// =========================================================================
	// $derived
	// =========================================================================

	const containerClasses = $derived(['skeleton', className].filter(Boolean).join(' '));

	const gapStyle = $derived(typeof gap === 'number' ? `${gap}px` : gap);
	const itemGapStyle = $derived(typeof itemGap === 'number' ? `${itemGap}px` : itemGap);
</script>

<div class={containerClasses} style={customStyle}>
	<div class="skeleton__items" style="gap: {gapStyle};">
		{#each Array(repeat) as _, index}
			<div class="item" style="gap: {itemGapStyle};">
				{#each patterns as patternConfig}
					{#if patternConfig.type === 'text'}
						<SkeletonText textConfig={patternConfig} {animated} />
					{:else if patternConfig.type === 'avatar'}
						<div class="skeleton__user-list">
							<SkeletonAvatar avatarConfig={patternConfig} {animated} />
						</div>
					{:else if patternConfig.type === 'article'}
						<SkeletonArticle articleConfig={patternConfig} {animated} />
					{:else if patternConfig.type === 'buttons'}
						<div class="skeleton__buttons">
							<SkeletonButtons buttonsConfig={patternConfig} {animated} />
						</div>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.skeleton {
		display: block;
		width: 100%;
		max-width: 100%;
	}

	.skeleton__items {
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
