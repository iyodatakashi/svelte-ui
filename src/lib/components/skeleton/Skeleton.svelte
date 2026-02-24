<!-- Skeleton.svelte -->

<script lang="ts">
	import SkeletonBox from './SkeletonBox.svelte';
	import SkeletonText from './SkeletonText.svelte';
	import SkeletonMedia from './SkeletonMedia.svelte';
	import SkeletonAvatar from './SkeletonAvatar.svelte';
	import SkeletonButton from './SkeletonButton.svelte';
	import SkeletonHeading from './SkeletonHeading.svelte';
	import { getStyleFromNumber } from '$lib/utils/style';
	import type { SkeletonPatternConfig, SkeletonPresetConfig } from '$lib/types/skeleton';
	import { isPresetPattern, isMediaPattern, isAvatarPattern } from '$lib/types/skeleton';
	import { DEFAULT_PATTERN_CONFIG, PRESET_PATTERNS } from '$lib/constants/skeleton';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type SkeletonProps = {
		patterns?: SkeletonPatternConfig[];
		repeat?: number;
		repeatGap?: string | number;
		patternGap?: string | number;
		className?: string;
		customStyle?: string;
		animated?: boolean;
	};

	let {
		// 基本プロパティ
		patterns = [{ type: 'box' }] as SkeletonPatternConfig[],
		repeat = 1,
		repeatGap = 'var(--svelte-ui-skeleton-repeat-gap)',
		patternGap = 'var(--svelte-ui-skeleton-pattern-gap)',
		className = '',
		customStyle = '',
		animated = true
	}: SkeletonProps = $props();

	// =========================================================================
	// Methods
	// =========================================================================
	// パターン設定をマージ
	const mergedPatterns = $derived.by(() => {
		return patterns
			.map((pattern) => {
				// 型ガードでプリセットパターンかどうかを判定
				if (isPresetPattern(pattern)) {
					const presetPatternsArray = PRESET_PATTERNS[pattern.type] || [];
					// プリセットパターンを展開して、元のパターンの設定で上書き
					const { type: _, ...patternWithoutType } = pattern;
					const typedPatternWithoutType = patternWithoutType as Omit<SkeletonPresetConfig, 'type'>;
					return presetPatternsArray.map((presetPattern) => {
						// プリセットパターン内の各パターンに対して、ユーザー指定のプロパティを適用
						const mergedPattern = {
							...DEFAULT_PATTERN_CONFIG,
							...presetPattern,
							...typedPatternWithoutType
						} as SkeletonPatternConfig;

						// ネストしたオブジェクトのマージ処理（型ガードで型を絞り込む）
						if (isMediaPattern(presetPattern) && 'thumbnailConfig' in typedPatternWithoutType) {
							(mergedPattern as typeof presetPattern).thumbnailConfig = {
								...presetPattern.thumbnailConfig,
								...typedPatternWithoutType.thumbnailConfig
							};
						}

						if (
							(isMediaPattern(presetPattern) || isAvatarPattern(presetPattern)) &&
							'textConfig' in typedPatternWithoutType
						) {
							(mergedPattern as typeof presetPattern).textConfig = {
								...presetPattern.textConfig,
								...typedPatternWithoutType.textConfig
							};
						}

						if (isAvatarPattern(presetPattern) && 'avatarImageConfig' in typedPatternWithoutType) {
							(mergedPattern as typeof presetPattern).avatarImageConfig = {
								...presetPattern.avatarImageConfig,
								...typedPatternWithoutType.avatarImageConfig
							};
						}

						return mergedPattern;
					});
				}

				// 通常のパターン
				return {
					...DEFAULT_PATTERN_CONFIG,
					...pattern
				};
			})
			.flat();
	});

	// =========================================================================
	// $derived
	// =========================================================================
	const containerClasses = $derived(['skeleton', className].filter(Boolean).join(' '));
	const repeatGapStyle = $derived(getStyleFromNumber(repeatGap));
	const patternGapStyle = $derived(getStyleFromNumber(patternGap));
</script>

<div class={containerClasses} style={customStyle} data-testid="skeleton">
	<div class="skeleton__items" style="gap: {repeatGapStyle};">
		{#each Array(repeat) as _, index}
			<div class="skeleton__item" style="gap: {patternGapStyle};">
				{#each mergedPatterns as patternConfig}
					{@const patternRepeat = patternConfig.repeat || 1}
					{@const patternRepeatDirection = patternConfig.repeatDirection || 'vertical'}
					{@const patternRepeatGap =
						getStyleFromNumber(patternConfig.repeatGap) ||
						getStyleFromNumber(DEFAULT_PATTERN_CONFIG.repeatGap)}
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
								{@const { type: _, width, fontSize, customStyle } = patternConfig}
								<SkeletonHeading {width} {fontSize} {customStyle} {animated} />
							{:else if patternConfig.type === 'text'}
								{@const { width, lines, fontSize, customStyle } = patternConfig}
								<SkeletonText {width} {lines} {fontSize} {customStyle} {animated} />
							{:else if patternConfig.type === 'avatar'}
								{@const avatarImageSize = patternConfig.avatarImageConfig?.size}
								{@const avatarImageRadius = patternConfig.avatarImageConfig?.radius}
								{@const textWidth = patternConfig.textConfig?.width}
								{@const lines = patternConfig.textConfig?.lines}
								{@const fontSize = patternConfig.textConfig?.fontSize}
								{@const showName = patternConfig.showName}
								<div class="skeleton__user-list">
									<SkeletonAvatar
										{avatarImageSize}
										{avatarImageRadius}
										{textWidth}
										{lines}
										{fontSize}
										{showName}
										{animated}
									/>
								</div>
							{:else if patternConfig.type === 'media'}
								{@const { width, layout } = patternConfig}
								{@const textWidth = patternConfig.textConfig?.width}
								{@const lines = patternConfig.textConfig?.lines}
								{@const fontSize = patternConfig.textConfig?.fontSize}
								{@const thumbnailWidth = patternConfig.thumbnailConfig?.width}
								{@const thumbnailHeight = patternConfig.thumbnailConfig?.height}
								{@const thumbnailAspectRatio = patternConfig.thumbnailConfig?.aspectRatio}
								{@const thumbnailRadius = patternConfig.thumbnailConfig?.radius}
								<SkeletonMedia
									{width}
									{layout}
									{textWidth}
									{lines}
									{fontSize}
									{thumbnailWidth}
									{thumbnailHeight}
									{thumbnailAspectRatio}
									{thumbnailRadius}
									{animated}
								/>
							{:else if patternConfig.type === 'button'}
								{@const { width, height, radius, align, customStyle } = patternConfig}
								<div class="skeleton__button">
									<SkeletonButton
										{width}
										{height}
										{radius}
										{align}
										{customStyle}
										{animated}
									/>
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

	.skeleton__item {
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
