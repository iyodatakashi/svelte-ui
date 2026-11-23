import type { Snippet } from 'svelte';

/**
 * Tooltip position type
 * Used by Tooltip component
 */
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export type TooltipProps = {
	// Snippet
	/** The element the tooltip describes. Wrap a single focusable element. */
	children: Snippet;

	// 基本プロパティ
	text: string;

	// HTML属性
	/** ID of the tooltip element, referenced by the target's `aria-describedby`. */
	id?: string;

	// スタイル/レイアウト
	customStyle?: string;
	/** Side of the target to show on. Flips to the opposite side when there is no room. @default 'bottom' */
	position?: TooltipPosition;
	/** Gap in px between the target and the tooltip. @default 4 */
	margin?: number;

	// 状態/動作
	/** Delay in ms before showing on hover. Keyboard focus shows it immediately. @default 400 */
	delay?: number;
};
