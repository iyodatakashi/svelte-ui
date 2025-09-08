<script lang="ts">
	import SkeletonBox from './SkeletonBox.svelte';
	import type { SkeletonTextConfig, SkeletonAvatarImageConfig } from './Skeleton.svelte';

	// =========================================================================
	// Props
	// =========================================================================

	let {
		// 基本プロパティ
		avatarImageConfig = {},
		textConfig = {},
		showName = false,
		animated = true
	}: {
		avatarImageConfig?: Partial<SkeletonAvatarImageConfig>;
		textConfig?: Partial<SkeletonTextConfig>;
		showName?: boolean;
		animated?: boolean;
	} = $props();

	// デフォルト設定
	const DEFAULT_AVATAR_IMAGE_CONFIG: SkeletonAvatarImageConfig = {
		type: 'avatar-image',
		size: '40px',
		radius: 'var(--svelte-ui-skeleton-avatar-image-border-radius)',
		animated,
		customStyle: ''
	};
	const DEFAULT_TEXT_CONFIG: SkeletonTextConfig = {
		type: 'text',
		width: '160px',
		lines: 1,
		animated,
		customStyle: ''
	};

	// マージされた設定
	const mergedAvatarImageConfig = $derived({
		...DEFAULT_AVATAR_IMAGE_CONFIG,
		...avatarImageConfig
	});

	const mergedTextConfig = $derived({
		...DEFAULT_TEXT_CONFIG,
		...textConfig
	});

	const getStyleFromNumber = (value: string | number) => {
		return typeof value === 'number' ? `${value}px` : value;
	};

	const avatarImageSizeStyle = $derived(getStyleFromNumber(mergedAvatarImageConfig.size));
	const nameWidthStyle = $derived(getStyleFromNumber(mergedTextConfig.width));
</script>

<div class="skeleton-avatar">
	<SkeletonBox
		width={avatarImageSizeStyle}
		height={avatarImageSizeStyle}
		radius="var(--svelte-ui-skeleton-avatar-image-border-radius)"
		{animated}
		customStyle={avatarImageConfig.customStyle}
	/>
	{#if showName}
		<SkeletonBox
			width={nameWidthStyle}
			height="1em"
			radius="var(--svelte-ui-skeleton-text-border-radius)"
			{animated}
		/>
	{/if}
</div>

<style lang="scss">
	.skeleton-avatar {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
	}
</style>
