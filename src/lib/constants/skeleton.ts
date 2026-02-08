import type {
	SkeletonPatternConfig,
	SkeletonMediaConfig,
	SkeletonThumbnailConfig,
	SkeletonTextConfig,
	SkeletonHeadingConfig,
	SkeletonButtonConfig,
	SkeletonAvatarConfig,
	SkeletonAvatarImageConfig
} from '$lib/types/skeleton';

// =========================================================================
// Default Pattern Config
// =========================================================================

export const DEFAULT_PATTERN_CONFIG = {
	repeat: 1,
	repeatDirection: 'vertical' as const,
	repeatGap: 'var(--svelte-ui-skeleton-repeat-gap)'
} as const;

// =========================================================================
// Preset Patterns
// =========================================================================

export const PRESET_PATTERNS: Record<string, SkeletonPatternConfig[]> = {
	'article-detail': [
		{
			type: 'box'
		},
		{ type: 'avatar', showName: true },
		{
			type: 'text',
			lines: 5,
			repeat: 1
		}
	],
	'article-list': [
		{
			type: 'media',
			layout: 'horizontal',
			thumbnailConfig: {
				width: 'var(--svelte-ui-skeleton-media-thumbnail-width, 160px)',
				aspectRatio: '4/3'
			},
			textConfig: { lines: 3 },
			repeat: 3
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
			textConfig: { lines: 2 },
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
			width: 'var(--svelte-ui-skeleton-button-width, 120px)',
			repeat: 2,
			repeatDirection: 'horizontal',
			repeatGap: '16px'
		}
	]
};

// =========================================================================
// Default Box Config
// =========================================================================

export const DEFAULT_BOX_CONFIG = {
	width: '100%',
	height: 'var(--svelte-ui-skeleton-box-height, 240px)',
	radius: 'var(--svelte-ui-skeleton-box-border-radius, 8px)'
} as const;

// =========================================================================
// Default Media Config
// =========================================================================

export const DEFAULT_MEDIA_CONFIG: Partial<SkeletonMediaConfig> = {
	type: 'media',
	layout: 'horizontal',
	thumbnailConfig: {
		width: 'var(--svelte-ui-skeleton-media-thumbnail-width, 160px)',
		aspectRatio: '16/9'
	},
	textConfig: { width: '100%', lines: 2 }
};

// =========================================================================
// Default Thumbnail Config
// =========================================================================

export const DEFAULT_THUMBNAIL_CONFIG: SkeletonThumbnailConfig = {
	type: 'thumbnail',
	width: 'var(--svelte-ui-skeleton-media-thumbnail-width, 160px)',
	radius: 'var(--svelte-ui-skeleton-media-thumbnail-border-radius, var(--svelte-ui-border-radius))',
	customStyle: ''
};

// =========================================================================
// Default Text Configs
// =========================================================================

// For SkeletonMedia
export const DEFAULT_TEXT_CONFIG_MEDIA: SkeletonTextConfig = {
	type: 'text',
	width: '100%',
	lines: 2,
	customStyle: ''
};

// For SkeletonText
export const DEFAULT_TEXT_CONFIG: SkeletonTextConfig = {
	type: 'text',
	width: '100%',
	lines: 1,
	customStyle: ''
};

// For SkeletonAvatar
export const DEFAULT_TEXT_CONFIG_AVATAR: SkeletonTextConfig = {
	type: 'text',
	width: 'var(--svelte-ui-skeleton-avatar-text-width, 160px)',
	lines: 1,
	customStyle: ''
};

// =========================================================================
// Default Heading Config
// =========================================================================

export const DEFAULT_HEADING_CONFIG: SkeletonHeadingConfig = {
	type: 'heading',
	width: 'var(--svelte-ui-skeleton-heading-width, 50%)',
	fontSize: 'var(--svelte-ui-skeleton-heading-font-size, 2rem)',
	customStyle: ''
};

// =========================================================================
// Default Button Config
// =========================================================================

export const DEFAULT_BUTTON_CONFIG: SkeletonButtonConfig = {
	type: 'button',
	width: 'var(--svelte-ui-skeleton-button-width, 120px)',
	height: 'var(--svelte-ui-skeleton-button-height, 36px)',
	radius: 'var(--svelte-ui-skeleton-button-border-radius)',
	align: 'left',
	customStyle: ''
};

// =========================================================================
// Default Avatar Configs
// =========================================================================

export const DEFAULT_AVATAR_IMAGE_CONFIG: SkeletonAvatarImageConfig = {
	type: 'avatar-image',
	size: 'var(--svelte-ui-skeleton-avatar-image-size, 48px)',
	radius: 'var(--svelte-ui-skeleton-avatar-image-border-radius)',
	customStyle: ''
};

export const DEFAULT_AVATAR_CONFIG: SkeletonAvatarConfig = {
	type: 'avatar',
	avatarImageConfig: DEFAULT_AVATAR_IMAGE_CONFIG,
	textConfig: DEFAULT_TEXT_CONFIG_AVATAR
};
