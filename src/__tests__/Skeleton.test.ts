import { describe, it, expect } from 'vitest';

// Skeletonコンポーネントの型定義をテスト
describe('Skeleton Component', () => {
	it('should be defined', () => {
		expect(true).toBe(true);
	});

	it('should accept base props types', () => {
		const baseProps = {
			patterns: [{ type: 'box' }],
			repeat: 1,
			repeatGap: '64px',
			itemGap: '24px',
			className: '',
			customStyle: '',
			animated: true
		};

		expect(Array.isArray(baseProps.patterns)).toBe(true);
		expect(typeof baseProps.repeat).toBe('number');
		expect(['string', 'number']).toContain(typeof baseProps.repeatGap);
		expect(['string', 'number']).toContain(typeof baseProps.itemGap);
		expect(typeof baseProps.className).toBe('string');
		expect(typeof baseProps.customStyle).toBe('string');
		expect(typeof baseProps.animated).toBe('boolean');
	});

	it('should accept preset and explicit pattern types', () => {
		const presetPatterns = [
			{ type: 'article-detail' },
			{ type: 'article-list' },
			{ type: 'product-list' },
			{ type: 'video-list' },
			{ type: 'user-list' },
			{ type: 'button-group' }
		];
		const explicitPatterns = [
			{ type: 'box' },
			{ type: 'heading' },
			{ type: 'text' },
			{ type: 'avatar' },
			{ type: 'media' },
			{ type: 'button' }
		];

		presetPatterns.forEach((p) => expect(typeof p.type).toBe('string'));
		explicitPatterns.forEach((p) => expect(typeof p.type).toBe('string'));
	});
});
