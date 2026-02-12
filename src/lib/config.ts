import type { Locale } from './i18n';

// ライブラリ全体の設定
export type SvelteUiConfig = {
	/**
	 * ライブラリ全体で使用するロケール。
	 * 各コンポーネントの props で locale が明示されている場合は、そちらが優先されます。
	 */
	locale?: 'en' | 'ja' | 'fr' | 'de' | 'es' | 'zh-cn';

	/**
	 * グローバル / コンポーネントの locale がどちらも未指定の場合に、
	 * ブラウザの言語設定からロケールを推測するかどうか。
	 * SSR 環境では navigator がないため、このフォールバックは無効になり、'en' になります。
	 */
	useBrowserLocale?: boolean;
};

let config: SvelteUiConfig = {
	useBrowserLocale: true
};

export const setSvelteUiConfig = (newConfig: SvelteUiConfig) => {
	config = { ...config, ...newConfig };
};

export const getSvelteUiConfig = (): SvelteUiConfig => config;

// グローバル設定からロケールを取得
export const getLocale = (): SvelteUiConfig['locale'] => {
	// 1. グローバル設定で明示されていればそれを使う
	if (config.locale) {
		return config.locale;
	}

	// 2. ブラウザの言語設定から推測（SPA / CSR 時のみ有効）
	if (config.useBrowserLocale !== false && typeof navigator !== 'undefined') {
		const languages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
		const primary = (languages[0] || '').toLowerCase();

		if (primary.startsWith('ja')) return 'ja';
		if (primary.startsWith('fr')) return 'fr';
		if (primary.startsWith('de')) return 'de';
		if (primary.startsWith('es')) return 'es';
		if (primary.startsWith('zh')) return 'zh-cn';

		return 'en';
	}

	// 3. それ以外は English をデフォルトとする
	return 'en';
};

