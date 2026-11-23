import type { Locale } from '#lib/models/i18n/i18n.types';

// ライブラリ全体の設定
export type SvelteUiConfig = {
	/**
	 * ライブラリ全体で使用するロケール。
	 * 各コンポーネントの props で locale が明示されている場合は、そちらが優先されます。
	 */
	locale?: Locale;

	/**
	 * グローバル / コンポーネントの locale がどちらも未指定の場合に、
	 * ブラウザの言語設定からロケールを推測するかどうか。
	 * SSR 環境では navigator がないため、このフォールバックは無効になり、'en' になります。
	 */
	useBrowserLocale?: boolean;
};
