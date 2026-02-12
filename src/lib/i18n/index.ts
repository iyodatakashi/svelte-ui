import { en } from './locales/en';
import { ja } from './locales/ja';
import { fr } from './locales/fr';
import { de } from './locales/de';
import { es } from './locales/es';
import { zhCn } from './locales/zh-cn';
import { getLocale } from '$lib/config';

export type Locale = 'en' | 'ja' | 'fr' | 'de' | 'es' | 'zh-cn';

export const TRANSLATIONS = {
	en,
	ja,
	fr,
	de,
	es,
	'zh-cn': zhCn
} as const;

// i18n が実際にサポートしているロケール（翻訳データが存在するもの）
type SupportedLocale = keyof typeof TRANSLATIONS;

// ネストされたオブジェクトから値を取得するヘルパー関数
type NestedKeyOf<T> = T extends object
	? {
			[K in keyof T]: K extends string
				? T[K] extends object
					? `${K}.${NestedKeyOf<T[K]>}`
					: K
				: never;
		}[keyof T]
	: never;

// パラメータ置換のヘルパー関数
const replaceParams = (message: string, params?: Record<string, any>): string => {
	if (!params) return message;

	return message.replace(/\{\{(\w+)\}\}/g, (match, key) => {
		return params[key] !== undefined ? String(params[key]) : match;
	});
};

// 標準的なi18n関数
export const t = (key: NestedKeyOf<typeof TRANSLATIONS.en>, params?: Record<string, any>): string => {
	const globalLocale = getLocale();
	// グローバル設定のロケールが TRANSLATIONS に存在する場合はそれを使い、存在しない場合は 'en' にフォールバック
	const locale: SupportedLocale = (globalLocale && globalLocale in TRANSLATIONS) ? globalLocale : 'en';
	const message = key.split('.').reduce((obj: any, k: string) => obj?.[k], TRANSLATIONS[locale]);

	if (typeof message !== 'string') {
		console.warn(`Translation key "${key}" not found for locale "${locale}"`);
		return key;
	}

	return replaceParams(message, params);
};

// デバッグ用: 現在の言語設定を確認
export const debugLocale = (): Locale => {
	if (typeof navigator !== 'undefined') {
		console.log('navigator.language:', navigator.language);
		console.log('navigator.languages:', navigator.languages);
	}
	const globalResolved = getLocale();
	// グローバル設定のロケールが TRANSLATIONS に存在する場合はそれを使い、存在しない場合は 'en' にフォールバック
	const effective: Locale = (globalResolved && globalResolved in TRANSLATIONS) ? globalResolved : 'en';
	console.log('effective locale (i18n):', effective);
	return effective;
};

