<!-- SkeletonAvatar.svelte -->

<script lang="ts">
	import SkeletonBox from './SkeletonBox.svelte';
	import SkeletonText from './SkeletonText.svelte';
	import { getStyleFromNumber } from '$lib/utils/style';
	import {
		DEFAULT_AVATAR_IMAGE_CONFIG,
		DEFAULT_TEXT_CONFIG_AVATAR,
		DEFAULT_AVATAR_CONFIG
	} from '$lib/constants/skeleton';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type SkeletonAvatarProps = {
		avatarImageSize?: string | number;
		avatarImageRadius?: string | number;
		textWidth?: string | number;
		lines?: number;
		fontSize?: string | number;
		showName?: boolean;
		animated?: boolean;
	};

	let {
		avatarImageSize = DEFAULT_AVATAR_IMAGE_CONFIG.size,
		avatarImageRadius = DEFAULT_AVATAR_IMAGE_CONFIG.radius,
		textWidth = DEFAULT_TEXT_CONFIG_AVATAR.width,
		lines = DEFAULT_TEXT_CONFIG_AVATAR.lines,
		fontSize,
		showName = DEFAULT_AVATAR_CONFIG.showName,
		animated = true
	}: SkeletonAvatarProps = $props();

	// =========================================================================
	// $derived
	// =========================================================================
	const avatarImageSizeStyle = $derived(getStyleFromNumber(avatarImageSize));
	const avatarImageRadiusStyle = $derived(
		avatarImageRadius
			? getStyleFromNumber(avatarImageRadius)
			: 'var(--svelte-ui-skeleton-avatar-image-border-radius)'
	);
	const textWidthStyle = $derived(getStyleFromNumber(textWidth));
</script>

<div class="skeleton-avatar">
	<div class="skeleton-avatar__avatar-image">
		<SkeletonBox
			width={avatarImageSizeStyle}
			height={avatarImageSizeStyle}
			radius={avatarImageRadiusStyle}
			{animated}
		/>
	</div>
	{#if showName}
		<div class="skeleton-avatar__text">
			<SkeletonText width={textWidthStyle} {lines} {fontSize} {animated} />
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
