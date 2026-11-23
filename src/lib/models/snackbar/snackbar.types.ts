import type { Snippet } from 'svelte';
import type { IconVariant } from '#lib/models/icon/icon.types';

/**
 * Snackbar position type (top/bottom)
 * Used by Snackbar, SnackbarItem components
 */
export type SnackbarPosition = 'top' | 'bottom';

/**
 * Snackbar type
 * Used by SnackbarItem component
 */
export type SnackbarType = 'info' | 'success' | 'warning' | 'error' | 'default';

/**
 * Snackbar variant type
 * Used by SnackbarItem component
 */
export type SnackbarVariant = 'filled' | 'outlined';

export type SnackbarItem = {
	id: string;
	message?: string;
	children?: Snippet;
	type: SnackbarType;
	variant?: SnackbarVariant;
	color?: string;
	textColor?: string;
	duration?: number;
	position?: SnackbarPosition;
	closable?: boolean;
	actionLabel?: string;
	iconVariant?: IconVariant;
	onAction?: () => void;
	onClose?: () => void;
	createdAt: number;
};

export type SnackbarConfig = {
	maxVisible?: number;
	defaultDuration?: number;
	defaultVariant?: SnackbarVariant;
	defaultPosition?: SnackbarPosition;
};

export type SnackbarProps = {
	// スタイル/レイアウト
	/** @default 'bottom' */
	position?: SnackbarPosition;
	/** Maximum number of snackbars shown at once. @default 5 */
	maxVisible?: number;
	/** @default 'filled' */
	variant?: SnackbarVariant;

	// 状態/動作
	/** Auto-dismiss duration in milliseconds. @default 3000 */
	duration?: number;
};

export type SnackbarItemProps = {
	// Snippet
	children?: Snippet;

	// 基本プロパティ
	message?: string;
	type?: SnackbarType;
	actionLabel?: string;

	// HTML属性系
	id: string;

	// スタイル/レイアウト
	variant?: SnackbarVariant;
	position?: SnackbarPosition;
	color?: string;
	textColor?: string;

	// 状態/動作
	duration?: number;
	closable?: boolean;
	closeButtonAriaLabel?: string;
	iconVariant?: IconVariant;

	// イベントハンドラー
	onAction?: () => void;
};
