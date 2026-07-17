import { describe, it, expect } from 'vitest';
import { TRANSLATIONS, t, type Locale } from '$lib/i18n';
import { setSvelteUiConfig } from '$lib/config';

const setLocale = (locale: Locale) => setSvelteUiConfig({ locale });
import type { StepItem } from '$lib/types/stepItem';
import type { StepNavOrientation } from '$lib/types/propOptions';

describe('StepNav foundation types', () => {
	it('StepItem を宣言的に記述できる（ラベル・値・リンク先・説明・アイコン・エラー・無効・マッチパス・完全一致・アクセシブルネーム）', () => {
		const item: StepItem = {
			label: '基本情報',
			value: 'basic',
			href: '/wizard/basic',
			description: '氏名と連絡先',
			icon: 'person',
			error: false,
			disabled: false,
			matchingPath: ['/wizard/basic/*'],
			strictMatch: true,
			ariaLabel: '基本情報ステップ'
		};

		expect(item.label).toBe('基本情報');
		expect(item.value).toBe('basic');
		expect(item.href).toBe('/wizard/basic');
	});

	it('label のみでも StepItem を構成できる（他フィールドは任意）', () => {
		const item: StepItem = { label: '確認' };
		expect(item.label).toBe('確認');
	});

	it('StepNavOrientation は horizontal / vertical を取りうる', () => {
		const horizontal: StepNavOrientation = 'horizontal';
		const vertical: StepNavOrientation = 'vertical';
		expect([horizontal, vertical]).toEqual(['horizontal', 'vertical']);
	});
});

describe('StepNav i18n namespace', () => {
	const locales: Locale[] = ['en', 'ja', 'fr', 'de', 'es', 'zh-cn'];

	it('全ロケールに同一キー構成の stepNav 名前空間が存在する', () => {
		const referenceKeys = Object.keys((TRANSLATIONS.en as Record<string, any>).stepNav).sort();
		expect(referenceKeys.length).toBeGreaterThan(0);

		for (const locale of locales) {
			const ns = (TRANSLATIONS[locale] as Record<string, any>).stepNav;
			expect(ns, `${locale} に stepNav がない`).toBeDefined();
			expect(Object.keys(ns).sort(), `${locale} のキー構成が一致しない`).toEqual(referenceKeys);
		}
	});

	it('ステップ番号は number パラメータを差し込める', () => {
		setLocale('en');
		expect(t('stepNav.step', { number: 3 })).toContain('3');
		setLocale('ja');
		expect(t('stepNav.step', { number: 3 })).toContain('3');
	});

	it('状態テキスト（完了・現在・未到達・エラー）が全ロケールで非空文字列で解決する', () => {
		const statusKeys = ['done', 'inProgress', 'upcoming', 'error'] as const;
		for (const locale of locales) {
			setLocale(locale);
			for (const key of statusKeys) {
				const text = t(`stepNav.${key}` as any);
				expect(text, `${locale}.stepNav.${key}`).toBeTruthy();
				expect(text).not.toBe(`stepNav.${key}`);
			}
		}
		setLocale('en');
	});
});
