import type { Snippet } from 'svelte';

/**
 * Reason why an overlay (Modal, Dialog, Drawer, ConfirmDialog, Popup) was closed.
 * Passed to onClose so consumers can differentiate close triggers.
 * - `escape`: closed via Escape key
 * - `outside`: closed by clicking outside the overlay
 * - `explicit`: closed programmatically (e.g. ref.close(), selecting an option)
 */
export type CloseReason = 'escape' | 'outside' | 'explicit';

export type ConfirmDialogProps = {
	// 基本プロパティ
	title?: string;
	description?: string;
	submitLabel?: string;
	cancelLabel?: string;

	// HTML属性
	id?: string;

	// スタイル/レイアウト
	/** Renders the confirm button in a destructive (red) style. @default false */
	danger?: boolean;
	/** @default 400 */
	width?: string | number;
	scrollable?: boolean;

	// 状態/動作
	/** Use `confirmDialogRef.open()` / `.close()` instead of binding this directly. */
	isOpen?: boolean;
	/** Closes when clicking the backdrop. @default true */
	closeIfClickOutside?: boolean;
	/** Closes when pressing Escape. @default true */
	closeIfEscape?: boolean;
	focusFirstOnOpen?: boolean;

	// イベントハンドラー
	onSubmit?: () => void;
	/** Called on cancel, including dismissal via Escape or a backdrop click. */
	onCancel?: () => void;
	onOpen?: () => void;
	/** Called after the close animation completes, with the reason it was closed. */
	onClose?: (reason: CloseReason) => void;
};

export type DialogProps = {
	// Snippet
	header?: Snippet;
	children?: Snippet;
	footer?: Snippet;

	// 基本プロパティ
	title?: string;
	description?: string;

	// HTML属性
	id?: string;

	// スタイル/レイアウト
	/** Dialog width in px (number) or any CSS unit (string). @default 320 */
	width?: string | number;
	/** Inline style applied to the body area. */
	bodyStyle?: string;
	/** Removes default body padding. @default false */
	noPadding?: boolean;

	// 状態/動作
	/** Use `dialogRef.open()` / `.close()` instead of binding this directly. */
	isOpen?: boolean;
	/** Makes the body area scrollable when content overflows. @default false */
	scrollable?: boolean;
	/** Closes when clicking the backdrop. @default true */
	closeIfClickOutside?: boolean;
	/** Closes when pressing Escape. @default true */
	closeIfEscape?: boolean;
	/** Returns focus to the trigger element on close. @default false */
	restoreFocus?: boolean;
	/** Focuses the first focusable element on open. @default false */
	focusFirstOnOpen?: boolean;

	// ARIA/アクセシビリティ
	ariaLabel?: string;
	ariaDescribedby?: string;

	// イベントハンドラー
	onOpen?: () => void;
	/** Called after the close animation completes, with the reason it was closed. */
	onClose?: (reason: CloseReason) => void;
};

export type DrawerProps = {
	// Snippet
	header?: Snippet;
	children?: Snippet;
	footer?: Snippet;

	// 基本プロパティ
	title?: string;
	description?: string;

	// HTML属性
	id?: string;

	// スタイル/レイアウト
	/** Drawer width in px (number) or any CSS unit (string). */
	width?: string | number | undefined;
	/** @default 'left' */
	position?: 'left' | 'right';
	/** Inline style applied to the body area. */
	bodyStyle?: string;
	/** Removes default body padding. @default false */
	noPadding?: boolean;

	// 状態/動作
	/** Use `drawerRef.open()` / `.close()` instead of binding this directly. */
	isOpen?: boolean;
	/** Makes the body area scrollable when content overflows. @default false */
	scrollable?: boolean;
	/** Closes when clicking the backdrop. @default true */
	closeIfClickOutside?: boolean;
	/** Closes when pressing Escape. @default true */
	closeIfEscape?: boolean;
	/** Returns focus to the trigger element on close. @default false */
	restoreFocus?: boolean;
	/** Focuses the first focusable element on open. @default false */
	focusFirstOnOpen?: boolean;

	// ARIA/アクセシビリティ
	ariaLabel?: string;
	ariaDescribedby?: string;

	// イベントハンドラー
	onOpen?: () => void;
	/** Called after the close animation completes, with the reason it was closed. */
	onClose?: (reason: CloseReason) => void;
};

export type ModalProps = {
	// Snippet
	children?: Snippet;

	// 基本プロパティ
	/** Internal label used for accessibility announcements. @default 'Modal' */
	componentType?: string;

	// HTML属性
	id?: string;

	// スタイル/レイアウト
	customClass?: string;
	customStyles?: string;

	// 状態/動作
	/** Use `modalRef.open()` / `.close()` instead of binding this directly. */
	isOpen?: boolean;
	/** Closes when clicking the backdrop. @default true */
	closeIfClickOutside?: boolean;
	/** Closes when pressing Escape. @default true */
	closeIfEscape?: boolean;
	/** Returns focus to the trigger element on close. @default false */
	restoreFocus?: boolean;
	/** Focuses the first focusable element on open. @default false */
	focusFirstOnOpen?: boolean;

	// ARIA/アクセシビリティ
	ariaLabel?: string;
	ariaLabelledby?: string;
	ariaDescribedby?: string;

	// イベントハンドラー
	onOpen?: () => void;
	/** Called after the close animation completes, with the reason it was closed. */
	onClose?: (reason: CloseReason) => void;
};
