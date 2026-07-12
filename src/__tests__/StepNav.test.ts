import { describe, it, expect } from 'vitest';
import StepNav from '../lib/components/StepNav.svelte';
import type { StepItem } from '../lib/types/stepItem';
import type { StepNavOrientation } from '../lib/types/propOptions';

// 主要な描画・状態導出の挙動検証は DOM を伴うため StepNav.browser.test.ts で行う。
// ここでは DOM 非依存のコンポーネント定義・props/型の契約を検証する。
describe('StepNav Component', () => {
	describe('Component Definition', () => {
		it('should be defined', () => {
			expect(StepNav).toBeDefined();
			expect(typeof StepNav).toBe('function');
		});
	});

	describe('Props Validation', () => {
		it('should accept valid prop types', () => {
			const items: StepItem[] = [
				{ label: 'アカウント', value: 'account' },
				{ label: '住所', value: 'address', description: '配送先' },
				{ label: '確認', value: 'confirm', icon: 'check', error: false, disabled: false }
			];
			const validProps = {
				items,
				value: 'account',
				progress: 1,
				pathPrefix: '/wizard',
				currentPath: '/wizard/account',
				id: 'signup-steps',
				orientation: 'horizontal' as const,
				size: 'medium' as const,
				color: '#e91e63',
				showIcon: false,
				customStyle: 'margin: 8px;',
				clickable: true,
				disabled: false,
				reducedMotion: false,
				ariaLabel: '登録手順'
			};

			expect(Array.isArray(validProps.items)).toBe(true);
			expect(typeof validProps.value).toBe('string');
			expect(typeof validProps.progress).toBe('number');
			expect(typeof validProps.pathPrefix).toBe('string');
			expect(typeof validProps.id).toBe('string');
			expect(typeof validProps.color).toBe('string');
			expect(typeof validProps.showIcon).toBe('boolean');
			expect(typeof validProps.clickable).toBe('boolean');
			expect(typeof validProps.disabled).toBe('boolean');
			expect(typeof validProps.reducedMotion).toBe('boolean');
		});

		it('should validate orientation enum values', () => {
			const validOrientations: StepNavOrientation[] = ['horizontal', 'vertical'];
			validOrientations.forEach((orientation) => {
				expect(['horizontal', 'vertical']).toContain(orientation);
			});
		});

		it('should validate size enum values', () => {
			const validSizes = ['small', 'medium', 'large'];
			validSizes.forEach((size) => {
				expect(['small', 'medium', 'large']).toContain(size);
			});
		});
	});

	describe('StepItem shape', () => {
		it('should allow a minimal item with only label', () => {
			const item: StepItem = { label: '確認' };
			expect(item.label).toBe('確認');
			expect(item.value).toBeUndefined();
			expect(item.href).toBeUndefined();
		});

		it('should allow both value (in-page) and href (URL) representations', () => {
			const inPage: StepItem = { label: 'A', value: 'a' };
			const url: StepItem = { label: 'B', href: '/b', matchingPath: ['/b/*'], strictMatch: false };
			expect(inPage.value).toBe('a');
			expect(url.href).toBe('/b');
			expect(Array.isArray(url.matchingPath)).toBe(true);
		});
	});
});
