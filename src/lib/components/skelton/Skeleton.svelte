<script lang="ts">
	import SkeletonBox from './SkeletonBox.svelte';
	import SkeletonText from './SkeletonText.svelte';
	import SkeletonMedia from './SkeletonMedia.svelte';
	import SkeletonAvatar from './SkeletonAvatar.svelte';
	import SkeletonButton from './SkeletonButton.svelte';
	import SkeletonHeading from './SkeletonHeading.svelte';
	import { getStyleFromNumber } from '../../utils/style';
	import type { SkeletonPatternConfig } from '../../types/Skeleton';
	import { isPresetPattern } from '../../types/Skeleton';

	// =========================================================================
	// Props
	// =========================================================================

	let {
		// 基本プロパティ
		patterns = [{ type: 'text' }] as SkeletonPatternConfig[],
		repeat = 1,
		repeatGap = '64px',
		itemGap = '16px',
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

	// プリセットパターンの定義
	const PRESET_PATTERNS: Record<string, SkeletonPatternConfig[]> = {
		'article-list': [
			{
				type: 'media',
				layout: 'horizontal',
				thumbnailConfig: { width: '160px', aspectRatio: '4/3' },
				textConfig: { lines: 3 }
			}
		],
		'product-list': [
			{
				type: 'media',
				layout: 'vertical',
				thumbnailConfig: { width: '100%', aspectRatio: '1' },
				textConfig: { lines: 2 },
				repeat: 4,
				repeatDirection: 'horizontal'
			}
		],
		'video-list': [
			{
				type: 'media',
				layout: 'vertical',
				thumbnailConfig: { width: '100%', aspectRatio: '16/9' },
				textConfig: { lines: 1 },
				repeat: 3,
				repeatDirection: 'horizontal'
			}
		],
		'user-list': [
			{
				type: 'avatar',
				showName: true
			}
		],
		'button-group': [
			{
				type: 'button',
				width: '120px',
				repeat: 2,
				repeatDirection: 'horizontal',
				repeatGap: '16px'
			}
		]
	};

	// =========================================================================
	// $derived
	// =========================================================================

	const containerClasses = $derived(['skeleton', className].filter(Boolean).join(' '));

	// パターン設定をマージ
	const mergedPatterns = $derived.by(() => {
		return patterns
			.map((pattern) => {
				// 型ガードでプリセットパターンかどうかを判定
				if (isPresetPattern(pattern)) {
					const presetPatternsArray = PRESET_PATTERNS[pattern.type] || [];
					// プリセットパターンを展開して、元のパターンの設定で上書き
					const { type: _, ...patternWithoutType } = pattern;
					return presetPatternsArray.map((presetPattern) => ({
						...DEFAULT_PATTERN_CONFIG,
						...presetPattern,
						...patternWithoutType
					}));
				}

				// 通常のパターン
				return {
					...DEFAULT_PATTERN_CONFIG,
					...pattern
				};
			})
			.flat();
	});

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
							{#if patternConfig.type === 'box'}
								{@const { type: _, width, height, radius, customStyle } = patternConfig}
								<SkeletonBox {width} {height} {radius} {customStyle} {animated} />
							{:else if patternConfig.type === 'heading'}
								{@const { type: _, ...headingConfig } = patternConfig}
								<SkeletonHeading {headingConfig} {animated} />
							{:else if patternConfig.type === 'text'}
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
