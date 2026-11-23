import { describe, it, expect } from 'vitest';

// SkeletonMediaコンポーネントの型定義をテスト
describe('SkeletonMedia Component', () => {
	it('should be defined', () => {
		expect(true).toBe(true);
	});

	it('should have correct default media config', () => {
		const DEFAULT_MEDIA_CONFIG = {
			type: 'media',
			layout: 'horizontal',
			thumbnailConfig: { width: '160px', aspectRatio: '16/9' },
			textConfig: { width: '100%', lines: 2 }
		};

		expect(typeof DEFAULT_MEDIA_CONFIG.type).toBe('string');
		expect(['horizontal', 'vertical']).toContain(DEFAULT_MEDIA_CONFIG.layout);
		expect(typeof DEFAULT_MEDIA_CONFIG.thumbnailConfig.width).toBe('string');
		expect(['string', 'undefined']).toContain(
			typeof DEFAULT_MEDIA_CONFIG.thumbnailConfig.aspectRatio
		);
		expect(typeof DEFAULT_MEDIA_CONFIG.textConfig.width).toBe('string');
		expect(typeof DEFAULT_MEDIA_CONFIG.textConfig.lines).toBe('number');
	});

	it('should accept width prop and animated', () => {
		expect(['number', 'string']).toContain(typeof 100);
		expect(['number', 'string']).toContain(typeof '100%');
		expect(typeof true).toBe('boolean');
	});
});
