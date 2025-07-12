/**
 * スクリーンリーダー向けアナウンス機能
 * アクセシビリティを向上させるために、UIの状態変化をスクリーンリーダーに通知する
 */

/**
 * スクリーンリーダーにメッセージをアナウンスする
 * @param message - アナウンスするメッセージ
 * @param priority - アナウンスの優先度（'polite' | 'assertive'）
 * @param delay - 要素を削除するまでの時間（ミリ秒）
 */
export const announceToScreenReader = (
	message: string,
	priority: 'polite' | 'assertive' = 'polite',
	delay: number = 1000
): void => {
	if (!message.trim()) return;

	const announcement = document.createElement('div');
	announcement.setAttribute('aria-live', priority);
	announcement.setAttribute('aria-atomic', 'true');
	announcement.className = 'sr-only';
	announcement.textContent = message;
	document.body.appendChild(announcement);

	// アナウンス後に削除
	setTimeout(() => {
		if (document.body.contains(announcement)) {
			document.body.removeChild(announcement);
		}
	}, delay);
};

/**
 * コンポーネントの開閉状態をアナウンスする
 * @param componentName - コンポーネント名
 * @param isOpen - 開閉状態
 * @param title - タイトル（任意）
 */
export const announceOpenClose = (componentName: string, isOpen: boolean, title?: string): void => {
	const displayName = title || componentName;
	const status = isOpen ? 'opened' : 'closed';
	announceToScreenReader(`${displayName} ${status}`);
};

/**
 * 値の変更をアナウンスする
 * @param field - フィールド名
 * @param value - 新しい値
 * @param unit - 単位（任意）
 */
export const announceValueChange = (field: string, value: string | number, unit?: string): void => {
	const unitText = unit ? ` ${unit}` : '';
	announceToScreenReader(`${field} changed to ${value}${unitText}`);
};

/**
 * エラーメッセージをアナウンスする
 * @param message - エラーメッセージ
 */
export const announceError = (message: string): void => {
	announceToScreenReader(`Error: ${message}`, 'assertive');
};

/**
 * 成功メッセージをアナウンスする
 * @param message - 成功メッセージ
 */
export const announceSuccess = (message: string): void => {
	announceToScreenReader(`Success: ${message}`, 'polite');
};

/**
 * 読み込み状態をアナウンスする
 * @param isLoading - 読み込み状態
 * @param message - カスタムメッセージ（任意）
 */
export const announceLoading = (isLoading: boolean, message?: string): void => {
	if (isLoading) {
		announceToScreenReader(message || 'Loading started', 'polite');
	} else {
		announceToScreenReader(message || 'Loading completed', 'polite');
	}
};

/**
 * 選択状態をアナウンスする
 * @param item - 選択されたアイテム
 * @param total - 全体数（任意）
 * @param index - インデックス（任意）
 */
export const announceSelection = (item: string, total?: number, index?: number): void => {
	let message = `${item} selected`;
	if (typeof index === 'number' && typeof total === 'number') {
		message += `, ${index + 1} of ${total}`;
	}
	announceToScreenReader(message);
};
