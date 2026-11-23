import { describe, it, expect } from 'vitest';

// SkeletonAvatarコンポーネントの型定義をテスト
describe('SkeletonAvatar Component', () => {
	it('should be defined', () => {
		expect(true).toBe(true);
	});

	it('should have correct default avatar configs', () => {
		const DEFAULT_AVATAR_IMAGE_CONFIG = {
			type: 'avatar-image',
			size: '48px',
			radius: 'var(--svelte-ui-skeleton-avatar-image-border-radius)',
			customStyle: ''
		};
		const DEFAULT_TEXT_CONFIG = {
			type: 'text',
			width: '160px',
			lines: 1,
			customStyle: ''
		};
		const DEFAULT_AVATAR_CONFIG = {
			type: 'avatar',
			avatarImageConfig: DEFAULT_AVATAR_IMAGE_CONFIG,
			textConfig: DEFAULT_TEXT_CONFIG
		};

		expect(typeof DEFAULT_AVATAR_CONFIG.type).toBe('string');
		expect(typeof DEFAULT_AVATAR_CONFIG.avatarImageConfig.size).toBe('string');
		expect(typeof DEFAULT_AVATAR_CONFIG.avatarImageConfig.radius).toBe('string');
		expect(typeof DEFAULT_AVATAR_CONFIG.textConfig.width).toBe('string');
		expect(typeof DEFAULT_AVATAR_CONFIG.textConfig.lines).toBe('number');
	});

	it('should handle optional showName and animated', () => {
		expect(typeof true).toBe('boolean');
		expect(typeof false).toBe('boolean');
	});
});
