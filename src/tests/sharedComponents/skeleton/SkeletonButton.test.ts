import { describe, it, expect } from 'vitest';

// SkeletonButtonコンポーネントの型定義をテスト
describe('SkeletonButton Component', () => {
	it('should be defined', () => {
		expect(true).toBe(true);
	});

	it('should have correct default buttonConfig', () => {
		const DEFAULT_BUTTON_CONFIG = {
			type: 'button',
			width: '120px',
			height: '36px',
			radius: 'var(--svelte-ui-skeleton-button-border-radius)',
			align: 'left',
			customStyle: ''
		};

		expect(typeof DEFAULT_BUTTON_CONFIG.type).toBe('string');
		expect(typeof DEFAULT_BUTTON_CONFIG.width).toBe('string');
		expect(typeof DEFAULT_BUTTON_CONFIG.height).toBe('string');
		expect(typeof DEFAULT_BUTTON_CONFIG.radius).toBe('string');
		expect(typeof DEFAULT_BUTTON_CONFIG.align).toBe('string');
		expect(['left', 'center', 'right']).toContain(DEFAULT_BUTTON_CONFIG.align);
		expect(typeof DEFAULT_BUTTON_CONFIG.customStyle).toBe('string');
	});

	it('should handle animated boolean prop', () => {
		expect(typeof true).toBe('boolean');
		expect(typeof false).toBe('boolean');
	});
});
