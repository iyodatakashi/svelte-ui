import type { ButtonVariant } from '#lib/models/button/button.types';
import type {
	FocusHandler,
	KeyboardHandler,
	MouseHandler,
	PointerHandler,
	TouchHandler
} from '#lib/models/eventHandler/eventHandler.types';
import type {
	IconGrade,
	IconOpticalSize,
	IconVariant,
	IconWeight
} from '#lib/models/icon/icon.types';
import type { MenuItem } from '#lib/models/menu/menu.types';
import type { CloseReason } from '#lib/models/overlay/overlay.types';
import type { Snippet } from 'svelte';

/**
 * Popup position type
 * Used by Popup, PopupMenu, PopupMenuButton components
 */
export type PopupPosition =
	| 'top'
	| 'bottom'
	| 'left'
	| 'right'
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right'
	| 'left-top'
	| 'left-center'
	| 'left-bottom'
	| 'right-top'
	| 'right-center'
	| 'right-bottom'
	| 'auto';

export type PopupCloseFunction = () => void;

export type PopupProps = {
	// Snippet
	children: Snippet;

	// DOM参照
	/** The element the popup is anchored to. */
	anchorElement: HTMLElement | null | undefined;

	// 基本プロパティ
	/** ARIA role for the popup container. @default 'menu' */
	role?: string;

	// HTML属性
	id?: string;

	// スタイル/レイアウト
	/** @default 'bottom' */
	position?: PopupPosition;
	/** Gap in px between anchor and popup. @default 8 */
	margin?: number;

	// 状態/動作
	/** Use `popupRef.open()` / `.close()` instead of binding this directly. */
	isOpen?: boolean;
	/** Traps keyboard focus inside the popup. @default false */
	focusTrap?: boolean;
	/** Returns focus to the anchor element on close. @default false */
	restoreFocus?: boolean;
	/** On mobile, displays the popup as a sheet that slides up from the bottom. @default false */
	mobileFullscreen?: boolean;
	/** Repositions automatically when near viewport edges. @default true */
	enableAutoReposition?: boolean;

	// ARIA/アクセシビリティ
	ariaLabel?: string;
	ariaLabelledby?: string;
	ariaDescribedby?: string;

	// イベントハンドラー
	onOpen?: () => void;
	onClose?: (reason: CloseReason) => void;
};

export type PopupMenuProps = {
	/** Use `popupMenuRef.open()` / `.close()` instead of binding this directly. */
	isOpen?: boolean;
	/** The element the menu is anchored to. */
	anchorElement: HTMLElement | null | undefined;
	/** @default 'bottom' */
	position?: PopupPosition;
	/** `{ label, icon?, checked?, href?, callback?, disabled? }[]` or `'separator'` for dividers. */
	menuItems: (MenuItem | 'separator')[];
	id?: string;
	ariaLabel?: string;
	/** On mobile, displays the popup as a sheet that slides up from the bottom. @default false */
	mobileFullscreen?: boolean;
	iconFilled?: boolean;
	iconWeight?: IconWeight;
	iconGrade?: IconGrade;
	iconOpticalSize?: IconOpticalSize;
	iconVariant?: IconVariant;
};

export type PopupMenuButtonProps = {
	// Snippet
	children?: Snippet;

	// 基本プロパティ
	/** `{ label, icon?, href?, callback?, disabled? }[]` or `'separator'` for dividers. */
	menuItems: (MenuItem | 'separator')[];

	// HTML属性
	id?: string;

	// スタイル/レイアウト
	/** @default 'bottom' */
	position?: PopupPosition;
	/** @default 'ghost' */
	variant?: ButtonVariant;
	/** Button size in px. */
	size?: number;
	/** Custom CSS color value. Overrides the theme color. */
	color?: string;
	rounded?: boolean;

	// 状態/動作
	disabled?: boolean;
	/** On mobile, displays the popup as a sheet that slides up from the bottom. @default false */
	mobileFullscreen?: boolean;
	/** Stops click event propagation to parent elements. @default false */
	cancelParentClick?: boolean;

	// ARIA/アクセシビリティ
	ariaLabel?: string;

	// フォーカスイベント
	onfocus?: FocusHandler;
	onblur?: FocusHandler;

	// キーボードイベント
	onkeydown?: KeyboardHandler;
	onkeyup?: KeyboardHandler;

	// マウスイベント
	onclick?: MouseHandler;
	onmousedown?: MouseHandler;
	onmouseup?: MouseHandler;
	onmouseenter?: MouseHandler;
	onmouseleave?: MouseHandler;
	onmouseover?: MouseHandler;
	onmouseout?: MouseHandler;
	oncontextmenu?: MouseHandler;
	onauxclick?: MouseHandler;

	// タッチイベント
	ontouchstart?: TouchHandler;
	ontouchend?: TouchHandler;
	ontouchmove?: TouchHandler;
	ontouchcancel?: TouchHandler;

	// ポインターイベント
	onpointerdown?: PointerHandler;
	onpointerup?: PointerHandler;
	onpointerenter?: PointerHandler;
	onpointerleave?: PointerHandler;
	onpointermove?: PointerHandler;
	onpointercancel?: PointerHandler;
};
