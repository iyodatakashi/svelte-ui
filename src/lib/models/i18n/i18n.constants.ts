import { en } from '#lib/models/i18n/locales/en';
import { ja } from '#lib/models/i18n/locales/ja';
import { fr } from '#lib/models/i18n/locales/fr';
import { de } from '#lib/models/i18n/locales/de';
import { es } from '#lib/models/i18n/locales/es';
import { zhCn } from '#lib/models/i18n/locales/zh-cn';

export const TRANSLATIONS = {
	en,
	ja,
	fr,
	de,
	es,
	'zh-cn': zhCn
} as const;
