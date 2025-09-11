<script lang="ts">
	import SkeletonText from './SkeletonText.svelte';
	import SkeletonMedia from './SkeletonMedia.svelte';
	import SkeletonAvatar from './SkeletonAvatar.svelte';
	import SkeletonButton from './SkeletonButton.svelte';
	import { getStyleFromNumber } from '../../utils/style';

	// =========================================================================
	// Props
	// =========================================================================

	type SkeletonPatternConfig =
		| SkeletonTextConfig
		| SkeletonAvatarConfig
		| SkeletonMediaConfig
		| SkeletonButtonConfig;

	type SkeletonPatternCommonConfig = {
		customStyle?: string;
		repeat?: number;
		repeatDirection?: 'horizontal' | 'vertical';
		repeatGap?: string | number;
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

	export type SkeletonMediaConfig = SkeletonPatternCommonConfig & {
		type: 'media';
		width?: string | number;
		layout?: 'horizontal' | 'vertical';
		thumbnailConfig?: Partial<SkeletonThumbnailConfig>;
		textConfig?: Partial<SkeletonTextConfig>;
	};

	export type SkeletonThumbnailConfig = SkeletonPatternCommonConfig & {
		type: 'thumbnail';
		width?: string | number;
		height?: string | number;
		aspectRatio?: string | number;
		radius?: string | number;
	};

	export type SkeletonButtonConfig = SkeletonPatternCommonConfig & {
		type: 'button';
		width?: string | number;
		height?: string | number;
		radius?: string | number;
		align?: 'left' | 'center' | 'right';
	};

	let {
		// 基本プロパティ
		patterns = [{ type: 'text' }] as SkeletonPatternConfig[],
		repeat = 1,
		repeatGap = '24px',
		itemGap = '8px',
		className = '',
		customStyle = '',
		animated = true
	}: {
		patterns?: SkeletonPatternConfig[];
		repeat?: number;
		repeatGap?: string | number;
		itemGap?: string | number;
		className?: string;
		customStyle?: string;
		animated?: boolean;
	} = $props();

	const DEFAULT_PATTERN_CONFIG = {
		repeat: 1,
		repeatDirection: 'vertical' as const,
		repeatGap: '24px'
	};

	// =========================================================================
	// $derived
	// =========================================================================

	const containerClasses = $derived(['skeleton', className].filter(Boolean).join(' '));

	// パターン設定をマージ
	const mergedPatterns = $derived(
		patterns.map((pattern) => ({
			...DEFAULT_PATTERN_CONFIG,
			...pattern
		}))
	);

	const repeatGapStyle = $derived(getStyleFromNumber(repeatGap));
	const itemGapStyle = $derived(getStyleFromNumber(itemGap));
</script>

<div class={containerClasses} style={customStyle}>
	<div class="skeleton__items" style="gap: {repeatGapStyle};">
		{#each Array(repeat) as _, index}
			<div class="item" style="gap: {itemGapStyle};">
				{#each mergedPatterns as patternConfig}
					{@const patternRepeat = patternConfig.repeat || 1}
					{@const patternRepeatDirection = patternConfig.repeatDirection || 'vertical'}
					{@const patternRepeatGap = getStyleFromNumber(patternConfig.repeatGap) || '8px'}
					<div
						class="skeleton__pattern"
						class:skeleton__pattern--horizontal={patternRepeatDirection === 'horizontal'}
						style="gap: {patternRepeatGap};"
					>
						{#each Array(patternRepeat) as _}
							{#if patternConfig.type === 'text'}
								<SkeletonText textConfig={patternConfig} {animated} />
							{:else if patternConfig.type === 'avatar'}
								<div class="skeleton__user-list">
									<SkeletonAvatar avatarConfig={patternConfig} {animated} />
								</div>
							{:else if patternConfig.type === 'media'}
								<SkeletonMedia width={patternConfig.width} mediaConfig={patternConfig} {animated} />
							{:else if patternConfig.type === 'button'}
								<div class="skeleton__button">
									<SkeletonButton buttonConfig={patternConfig} {animated} />
								</div>
							{/if}
						{/each}
					</div>
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
		overflow-x: hidden;
	}

	.skeleton__items {
		display: flex;
		flex-direction: column;
	}

	.item {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.skeleton__pattern {
		display: flex;
		flex-direction: column;
		width: 100%;

		&--horizontal {
			flex-direction: row;
			align-items: center;
		}
	}
</style>
