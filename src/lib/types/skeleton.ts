export type SkeletonPatternConfig =
	| SkeletonBoxConfig
	| SkeletonTextConfig
	| SkeletonAvatarConfig
	| SkeletonMediaConfig
	| SkeletonButtonConfig
	| SkeletonHeadingConfig
	| SkeletonPresetConfig;

type SkeletonPatternCommonConfig = {
	customStyle?: string;
	repeat?: number;
	repeatDirection?: 'horizontal' | 'vertical';
	repeatGap?: string | number;
};

export type SkeletonBoxConfig = SkeletonPatternCommonConfig & {
	type: 'box';
	width?: string | number;
	height?: string | number;
	radius?: string | number;
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
	textConfig?: Partial<SkeletonTextConfig>;
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

export type SkeletonHeadingConfig = SkeletonPatternCommonConfig & {
	type: 'heading';
	width?: string | number;
	fontSize?: string | number;
	radius?: string | number;
};

export type SkeletonPresetConfig = SkeletonPatternCommonConfig & {
	type:
		| 'article-detail'
		| 'article-list'
		| 'product-list'
		| 'video-list'
		| 'user-list'
		| 'button-group';
	// プリセットパターンでオーバーライド可能なプロパティ
	layout?: 'horizontal' | 'vertical';
	width?: string | number;
	height?: string | number;
	aspectRatio?: string | number;
	radius?: string | number;
	lines?: number;
	fontSize?: string | number;
	showName?: boolean;
	align?: 'left' | 'center' | 'right';
	thumbnailConfig?: Partial<SkeletonThumbnailConfig>;
	textConfig?: Partial<SkeletonTextConfig>;
	avatarImageConfig?: SkeletonAvatarImageConfig;
};

// =========================================================================
// Type Guards
// =========================================================================

export const isPresetPattern = (
	pattern: SkeletonPatternConfig
): pattern is SkeletonPresetConfig => {
	return [
		'article-detail',
		'article-list',
		'product-list',
		'video-list',
		'user-list',
		'button-group'
	].includes(pattern.type as any);
};
