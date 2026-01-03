import { en } from './locales/en';
import { ja } from './locales/ja';

export type Locale = 'en' | 'ja';

export const MESSAGES = {
	en,
	ja
} as const;

// ブラウザの言語設定を取得
export const getLocale = (): Locale => {
	if (typeof navigator !== 'undefined') {
		// navigator.languages を使用して言語の優先順位を確認
		const languages = navigator.languages || [navigator.language];

		// 最初の言語（最優先言語）をチェック
		const primaryLanguage = languages[0];

		if (primaryLanguage.startsWith('ja')) {
			return 'ja';
		}
	}
	return 'en';
};

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
export const t = (key: NestedKeyOf<typeof MESSAGES.en>, params?: Record<string, any>): string => {
	const locale = getLocaleWithManual();
	const message = key.split('.').reduce((obj: any, k: string) => obj?.[k], MESSAGES[locale]);

	if (typeof message !== 'string') {
		console.warn(`Translation key "${key}" not found for locale "${locale}"`);
		return key;
	}

	return replaceParams(message, params);
};

// デバッグ用: 現在の言語設定を確認
export const debugLocale = () => {
	if (typeof navigator !== 'undefined') {
		console.log('navigator.language:', navigator.language);
		console.log('navigator.languages:', navigator.languages);
		console.log('detected locale:', getLocale());
	}
	return getLocale();
};

// テスト用: 手動で言語を切り替え
let manualLocale: Locale | null = null;
export const setLocale = (locale: Locale) => {
	manualLocale = locale;
	console.log(`🔧 Manual locale set to: ${locale}`);
};

// 手動設定を優先するgetLocale
const getLocaleWithManual = (): Locale => {
	if (manualLocale) {
		return manualLocale;
	}
	return getLocale();
};
