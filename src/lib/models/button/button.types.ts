import type { ComponentSize } from '#lib/models/component/component.types';
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
import type { Snippet } from 'svelte';
import type { HTMLButtonAttributes } from 'svelte/elements';

/**
 * Button variant type
 * Used by Button, IconButton, Fab components
 */
export type ButtonVariant = 'ghost' | 'filled' | 'outlined' | 'glass';

/**
 * Button size type
 * Alias of ComponentSize, kept for backward compatibility
 */
export type ButtonSize = ComponentSize;

/**
 * Icon position type (left/right)
 * Used by Button, Fab components
 */
export type IconPosition = 'left' | 'right';

/**
 * Badge variant type
 * Used by IconButton component
 */
export type BadgeVariant = 'dot' | 'count';

/**
 * Fab position type (left/center/right)
 * Used by Fab component
 */
export type FabPosition = 'left' | 'center' | 'right';

export type ButtonProps = Omit<
	HTMLButtonAttributes,
	// 独自ハンドラ型（callbackHandlers）で再定義するイベント系は除外して衝突を避ける
	| 'children'
	| 'onfocus'
	| 'onblur'
	| 'onkeydown'
	| 'onkeyup'
	| 'onclick'
	| 'onmousedown'
	| 'onmouseup'
	| 'onmouseenter'
	| 'onmouseleave'
	| 'onmouseover'
	| 'onmouseout'
	| 'oncontextmenu'
	| 'onauxclick'
	| 'ontouchstart'
	| 'ontouchend'
	| 'ontouchmove'
	| 'ontouchcancel'
	| 'onpointerdown'
	| 'onpointerup'
	| 'onpointerenter'
	| 'onpointerleave'
	| 'onpointermove'
	| 'onpointercancel'
> & {
	// Snippet
	children: Snippet;

	// HTML属性系
	/** @default 'button' */
	type?: HTMLButtonAttributes['type'];
	tabindex?: number | null;

	// スタイル/レイアウト
	customStyle?: HTMLButtonAttributes['style'];
	/** @default 'ghost' */
	variant?: ButtonVariant;
	/** @default 'medium' */
	size?: ButtonSize;
	/** Custom CSS color value. Overrides the theme color. */
	color?: string;
	/** Custom CSS color for the label and icons. Takes precedence over `color` for the text. */
	textColor?: string;
	fullWidth?: boolean;
	/** Content alignment. Useful with `fullWidth`. @default 'center' */
	align?: 'left' | 'center' | 'right';
	/** Minimum width. A number is treated as px. @default 0 */
	minWidth?: number;
	rounded?: boolean;
	/** Adds a chevron-down icon. Use when the button opens a popup/dropdown. @default false */
	popup?: boolean;

	// アイコン関連
	/** Material Symbols icon name. */
	icon?: string;
	/** Icon position relative to the label. @default 'left' */
	iconPosition?: IconPosition;
	iconFilled?: boolean;
	iconWeight?: IconWeight;
	iconGrade?: IconGrade;
	iconOpticalSize?: IconOpticalSize;
	iconVariant?: IconVariant;

	// 状態/動作
	disabled?: boolean;
	/** Shows a loading spinner and disables interaction. @default false */
	loading?: boolean;

	// ARIA/アクセシビリティ
	ariaLabel?: string;
	ariaDescribedby?: string;
	ariaExpanded?: boolean;
	reducedMotion?: boolean;

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

export type FabProps = Omit<
	HTMLButtonAttributes,
	// 独自ハンドラ型（callbackHandlers）で再定義するイベント系は除外して衝突を避ける
	| 'children'
	| 'onfocus'
	| 'onblur'
	| 'onkeydown'
	| 'onkeyup'
	| 'onclick'
	| 'onmousedown'
	| 'onmouseup'
	| 'onmouseenter'
	| 'onmouseleave'
	| 'onmouseover'
	| 'onmouseout'
	| 'oncontextmenu'
	| 'onauxclick'
	| 'ontouchstart'
	| 'ontouchend'
	| 'ontouchmove'
	| 'ontouchcancel'
	| 'onpointerdown'
	| 'onpointerup'
	| 'onpointerenter'
	| 'onpointerleave'
	| 'onpointermove'
	| 'onpointercancel'
> & {
	children?: Snippet;
	/** @default 'button' */
	type?: HTMLButtonAttributes['type'];
	customStyle?: HTMLButtonAttributes['style'];
	disabled?: boolean;
	/** Shows a loading spinner and disables interaction. @default false */
	loading?: boolean;
	/** Material Symbols icon name. */
	icon?: string;
	/** Icon position relative to the label. @default 'left' */
	iconPosition?: IconPosition;
	iconFilled?: boolean;
	iconWeight?: IconWeight;
	iconGrade?: IconGrade;
	iconOpticalSize?: IconOpticalSize;
	iconVariant?: IconVariant;
	/** Custom CSS color value. Overrides the theme color. */
	color?: string;
	/** @default 'filled' */
	variant?: ButtonVariant;
	/** Fixed position on screen. When set, the FAB is `position: fixed`. */
	position?: FabPosition;
	/** Distance from the bottom edge when `position` is set. */
	bottomOffset?: string | number;
	/** Distance from the side edge when `position` is set. */
	sideOffset?: string | number;
	/** Adds safe-area inset padding (for notched devices). @default true */
	useSafeArea?: boolean;
	/** @default false */
	shadow?: boolean;
	/** Disables animations for accessibility. @default false */
	reducedMotion?: boolean;
	ariaLabel?: string;
	ariaDescribedby?: string;
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

export type IconButtonProps = Omit<
	HTMLButtonAttributes,
	// 独自ハンドラ型（callbackHandlers）で再定義するイベント系は除外して衝突を避ける
	| 'children'
	| 'onfocus'
	| 'onblur'
	| 'onkeydown'
	| 'onkeyup'
	| 'onclick'
	| 'onmousedown'
	| 'onmouseup'
	| 'onmouseenter'
	| 'onmouseleave'
	| 'onmouseover'
	| 'onmouseout'
	| 'oncontextmenu'
	| 'onauxclick'
	| 'ontouchstart'
	| 'ontouchend'
	| 'ontouchmove'
	| 'ontouchcancel'
	| 'onpointerdown'
	| 'onpointerup'
	| 'onpointerenter'
	| 'onpointerleave'
	| 'onpointermove'
	| 'onpointercancel'
> & {
	// Snippet
	/** Material Symbols icon name (e.g. `"close"`, `"edit"`). */
	children: Snippet;

	// HTML属性系
	/** @default 'button' */
	type?: 'button' | 'submit' | 'reset' | null | undefined;
	tabindex?: number | null;

	// スタイル/レイアウト
	customStyle?: HTMLButtonAttributes['style'];
	/** @default 'ghost' */
	variant?: ButtonVariant;
	/** Button size in px. */
	size?: number;
	/** Icon font size in px. */
	fontSize?: number;
	/** Custom CSS color value. Overrides the theme color. */
	color?: string;
	rounded?: boolean;

	// アイコン関連
	/** Additional Material Symbols icon rendered alongside children. */
	icon?: string;
	iconFilled?: boolean;
	iconWeight?: IconWeight;
	iconGrade?: IconGrade;
	iconOpticalSize?: IconOpticalSize;
	iconVariant?: IconVariant;

	// バッジ関連
	/** Shows a badge indicator on the button. @default false */
	hasBadge?: boolean;
	/** Number shown inside the badge. */
	badgeCount?: number;
	badgeVariant?: BadgeVariant;
	badgeColor?: string;
	/** Caps the badge count display (shows `max+` when exceeded). */
	badgeMax?: number;

	// 状態/動作
	disabled?: boolean;
	/** Shows a loading spinner and disables interaction. @default false */
	loading?: boolean;
	/** Toggleable pressed state (for toggle buttons). @default false */
	pressed?: boolean;

	// ARIA/アクセシビリティ
	ariaLabel: string;
	ariaDescribedby?: string;
	ariaPressed?: boolean;
	/** Disables animations for accessibility. @default false */
	reducedMotion?: boolean;

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
