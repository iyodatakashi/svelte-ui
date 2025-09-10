<script lang="ts">
	import SkeletonBox from './SkeletonBox.svelte';
	import SkeletonText from './SkeletonText.svelte';
	import { getStyleFromNumber } from '../../utils/style';
	import type {
		SkeletonAvatarConfig,
		SkeletonTextConfig,
		SkeletonAvatarImageConfig
	} from './Skeleton.svelte';

	// =========================================================================
	// Props
	// =========================================================================

	let {
		// 基本プロパティ
		avatarConfig = {},
		animated = true
	}: {
		avatarConfig?: Partial<SkeletonAvatarConfig>;
		animated?: boolean;
	} = $props();

	// デフォルト設定
	const DEFAULT_AVATAR_IMAGE_CONFIG: SkeletonAvatarImageConfig = {
		type: 'avatar-image',
		size: '48px',
		radius: 'var(--svelte-ui-skeleton-avatar-image-border-radius)',
		customStyle: ''
	};
	const DEFAULT_TEXT_CONFIG: SkeletonTextConfig = {
		type: 'text',
		width: '160px',
		lines: 1,
		customStyle: ''
	};
	const DEFAULT_AVATAR_CONFIG: SkeletonAvatarConfig = {
		type: 'avatar',
		avatarImageConfig: DEFAULT_AVATAR_IMAGE_CONFIG,
		textConfig: DEFAULT_TEXT_CONFIG
	};

	// マージされた設定
	const mergedAvatarImageConfig = $derived({
		...DEFAULT_AVATAR_IMAGE_CONFIG,
		...(avatarConfig.avatarImageConfig || {})
	});

	const mergedTextConfig = $derived({
		...DEFAULT_TEXT_CONFIG,
		...(avatarConfig.textConfig || {})
	});

	const mergedAvatarConfig = $derived({
		...DEFAULT_AVATAR_CONFIG,
		...avatarConfig
	});

	const avatarImageSizeStyle = $derived(getStyleFromNumber(mergedAvatarImageConfig.size));
	const nameWidthStyle = $derived(getStyleFromNumber(mergedTextConfig.width));
</script>

<div class="skeleton-avatar">
	<div class="skeleton-avatar__avatar-image">
		<SkeletonBox
			width={avatarImageSizeStyle}
			height={avatarImageSizeStyle}
			radius="var(--svelte-ui-skeleton-avatar-image-border-radius)"
			{animated}
			customStyle={mergedAvatarImageConfig.customStyle}
		/>
	</div>
	{#if mergedAvatarConfig.showName}
		<div class="skeleton-avatar__text">
			<SkeletonText
				textConfig={{
					width: nameWidthStyle,
					lines: mergedTextConfig.lines
				}}
				{animated}
			/>
		</div>
	{/if}
</div>

<style lang="scss">
	.skeleton-avatar {
		display: flex;
		align-items: center;
		gap: 12px;
		width: 100%;
	}

	.skeleton-avatar > * {
		flex-shrink: 0;
	}
</style>
