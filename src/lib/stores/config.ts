import type { SvelteUiConfig } from '#lib/models/config/config.types';

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
		const languages =
			navigator.languages && navigator.languages.length
				? navigator.languages
				: [navigator.language];
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
