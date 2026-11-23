export type LoadingSpinnerProps = {
	// スタイル/レイアウト
	/** Size in px. @default 32 */
	size?: number;
	color?: string;
	/** @default 3 */
	strokeWidth?: number;

	// 状態/動作
	/** Animation speed multiplier. @default 1 */
	speed?: number;

	// ARIA/アクセシビリティ
	/** Disables animations for accessibility. @default false */
	reducedMotion?: boolean;
};
