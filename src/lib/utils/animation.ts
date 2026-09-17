/**
 * Animation utilities
 */

/**
 * 要素で実行中のアニメーションの完了を待つ。
 *
 * animationend イベントに依存すると、アニメーションが動かない状況
 * （アニメーション無効化・要素が非表示・テスト環境など）でイベントが発火せず、
 * 閉じる処理の後始末が永久に実行されないままになる。実際の Animation を待つことで、
 * アニメーションが無い場合は即座に解決する。
 */
export const waitForAnimations = async (element: Element | null | undefined): Promise<void> => {
	if (!element?.isConnected) return;

	const animations = element.getAnimations();
	if (animations.length === 0) return;

	await Promise.allSettled(animations.map((animation) => animation.finished));
};
