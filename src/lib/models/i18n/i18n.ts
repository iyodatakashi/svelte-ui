import { TRANSLATIONS } from './i18n.constants';
import type { SupportedLocale, TranslationKey } from './i18n.types';
import { getLocale } from '#lib/stores/config';

// パラメータ置換のヘルパー関数
const replaceParams = (message: string, params?: Record<string, any>): string => {
	if (!params) return message;

	return message.replace(/\{\{(\w+)\}\}/g, (match, key) => {
		return params[key] !== undefined ? String(params[key]) : match;
	});
};

// 標準的なi18n関数
export const t = (key: TranslationKey, params?: Record<string, any>): string => {
	const globalLocale = getLocale();
	// グローバル設定のロケールが TRANSLATIONS に存在する場合はそれを使い、存在しない場合は 'en' にフォールバック
	const locale: SupportedLocale =
		globalLocale && globalLocale in TRANSLATIONS ? globalLocale : 'en';
	const message = key.split('.').reduce((obj: any, k: string) => obj?.[k], TRANSLATIONS[locale]);

	if (typeof message !== 'string') {
		return key;
	}

	return replaceParams(message, params);
};
