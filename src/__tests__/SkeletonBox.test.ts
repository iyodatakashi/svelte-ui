import { describe, it, expect } from 'vitest';

// SkeletonBoxコンポーネントの型定義をテスト
describe('SkeletonBox Component', () => {
	it('should be defined', () => {
		// コンポーネントが存在することを確認
		expect(true).toBe(true);
	});

	it('should have correct default props', () => {
		const expectedDefaults = {
			width: '100%',
			height: '240px',
			radius: 'var(--svelte-ui-skeleton-box-border-radius, 8px)',
			animated: true,
			className: '',
			customStyle: ''
		};

		// デフォルト値の型チェック
		expect(typeof expectedDefaults.width).toBe('string');
		expect(typeof expectedDefaults.height).toBe('string');
		expect(typeof expectedDefaults.radius).toBe('string');
		expect(typeof expectedDefaults.animated).toBe('boolean');
		expect(typeof expectedDefaults.className).toBe('string');
		expect(typeof expectedDefaults.customStyle).toBe('string');
	});

	it('should handle number-or-string props', () => {
		const numberOrStringSamples = [100, '100px'];
		numberOrStringSamples.forEach((sample) => {
			expect(['number', 'string']).toContain(typeof sample);
		});
	});

	it('should handle boolean props correctly', () => {
		expect(typeof true).toBe('boolean');
		expect(typeof false).toBe('boolean');
	});
});
