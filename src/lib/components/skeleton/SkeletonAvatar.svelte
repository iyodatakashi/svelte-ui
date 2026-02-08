<!-- SkeletonAvatar.svelte -->

<script lang="ts">
	import SkeletonBox from './SkeletonBox.svelte';
	import SkeletonText from './SkeletonText.svelte';
	import { getStyleFromNumber } from '$lib/utils/style';
	import type { SkeletonAvatarConfig } from '$lib/types/skeleton';
	import {
		DEFAULT_AVATAR_IMAGE_CONFIG,
		DEFAULT_TEXT_CONFIG_AVATAR,
		DEFAULT_AVATAR_CONFIG
	} from '$lib/constants/skeleton';

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

	// マージされた設定
	const mergedAvatarImageConfig = $derived({
		...DEFAULT_AVATAR_IMAGE_CONFIG,
		...(avatarConfig.avatarImageConfig || {})
	});

	const mergedTextConfig = $derived({
		...DEFAULT_TEXT_CONFIG_AVATAR,
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
