import type { TRANSLATIONS } from '#lib/models/i18n/i18n.constants';

export type Locale = 'en' | 'ja' | 'fr' | 'de' | 'es' | 'zh-cn';

// i18n が実際にサポートしているロケール（翻訳データが存在するもの）
export type SupportedLocale = keyof typeof TRANSLATIONS;

// ネストされた翻訳オブジェクトのキーを `a.b` 形式で列挙する
type NestedKeyOf<T> = T extends object
	? {
			[K in keyof T]: K extends string
				? T[K] extends object
					? `${K}.${NestedKeyOf<T[K]>}`
					: K
				: never;
		}[keyof T]
	: never;

export type TranslationKey = NestedKeyOf<typeof TRANSLATIONS.en>;
