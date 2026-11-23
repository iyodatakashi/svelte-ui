import type {
	BivariantValueHandler,
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
import type { HTMLInputAttributes, HTMLTextareaAttributes } from 'svelte/elements';

/**
 * Focus style type
 * Used by Input, Textarea, Datepicker components
 */
export type FocusStyle = 'background' | 'outline' | 'none';

export type InputProps = Omit<
	HTMLInputAttributes,
	// 独自の型で再定義するためベースの HTML 属性から除外
	| 'value'
	| 'type'
	| 'id'
	| 'tabindex'
	| 'maxlength'
	| 'pattern'
	| 'min'
	| 'max'
	| 'step'
	| 'autocomplete'
	| 'spellcheck'
	// 独自ハンドラ型（callbackHandlers）で再定義するイベント系
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
	| 'onchange'
	| 'oninput'
> & {
	// 基本プロパティ
	name?: string;
	value: string | number | null | undefined;

	// HTML属性系
	id?: string | null;
	/** @default 'text' */
	type?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'number';
	tabindex?: number | null;
	maxlength?: number | null;
	pattern?: string | null;
	min?: number | null;
	max?: number | null;
	step?: number | null;
	/** Decimal places to round and display. Only for `type="number"`. */
	decimalPlaces?: number | null;
	/** Show thousands separator in the displayed value. Only for `type="number"`. @default false */
	enableThousandsSeparator?: boolean;
	autocomplete?: HTMLInputElement['autocomplete'] | null;
	spellcheck?: boolean | null;
	// スタイル/レイアウト
	/** Renders inline, sized to content. @default false */
	inline?: boolean;
	/** @default 'outline' */
	focusStyle?: FocusStyle;
	placeholder?: string;
	fullWidth?: boolean;
	/** Width as px number or CSS string. */
	width?: string | number | null;
	minWidth?: string | number | null;
	maxWidth?: string | number | null;
	rounded?: boolean;
	customStyle?: string;
	/** Unit label (e.g. `"px"`, `"kg"`) shown next to the value; hidden while focused. */
	unit?: string;

	// アイコン関連
	/** Material Symbols icon name shown on the right. */
	rightIcon?: string;
	/** Material Symbols icon name shown on the left. */
	leftIcon?: string;
	/** Custom content shown instead of `leftIcon`. Reserve text space with `customStyle` when using it. */
	leftContent?: Snippet;
	leftIconAriaLabel?: string;
	rightIconAriaLabel?: string;
	iconFilled?: boolean;
	iconWeight?: IconWeight;
	iconGrade?: IconGrade;
	iconOpticalSize?: IconOpticalSize;
	iconVariant?: IconVariant;

	// 状態/動作
	disabled?: boolean;
	readonly?: boolean;
	required?: boolean;
	/** Shows a clear (×) button when the input has a value. @default false */
	clearable?: boolean;
	clearButtonAriaLabel?: string;
	/** Converts URLs in the value to clickable links. Only for `type="text"` or `type="url"`. @default false */
	linkify?: boolean;
	/** Adds a show/hide password toggle button. Only for `type="password"`. @default false */
	enablePasswordVisibilityToggle?: boolean;
	/** Adds increment/decrement stepper buttons. Only for `type="number"`. @default false */
	enableNumberStepper?: boolean;

	// ARIA/アクセシビリティ
	/** Accessible label for the input, used when no associated visible label exists. */
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

	// 入力イベント
	onchange?: BivariantValueHandler<string | number>;
	oninput?: BivariantValueHandler<string | number>;

	// アイコンイベント
	onRightIconClick?: MouseHandler;
	onLeftIconClick?: MouseHandler;
	onRightIconMouseDown?: MouseHandler;
	onLeftIconMouseDown?: MouseHandler;
	onRightIconMouseUp?: MouseHandler;
	onLeftIconMouseUp?: MouseHandler;
	onRightIconMouseLeave?: MouseHandler;
	onLeftIconMouseLeave?: MouseHandler;
	onRightIconTouchStart?: TouchHandler;
	onLeftIconTouchStart?: TouchHandler;
	onRightIconTouchEnd?: TouchHandler;
	onLeftIconTouchEnd?: TouchHandler;
	onRightIconTouchCancel?: TouchHandler;
	onLeftIconTouchCancel?: TouchHandler;
};

export type TextareaProps = Omit<
	HTMLTextareaAttributes,
	// 独自の型で再定義するためベースの HTML 属性から除外
	| 'value'
	| 'id'
	| 'tabindex'
	| 'maxlength'
	| 'autocomplete'
	| 'wrap'
	| 'spellcheck'
	| 'autocapitalize'
	// 独自ハンドラ型（callbackHandlers）で再定義するイベント系
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
	| 'onchange'
	| 'oninput'
> & {
	// 基本プロパティ
	name?: string;
	value: string | null | undefined;
	placeholder?: string;

	// HTML属性系
	id?: string | null;
	tabindex?: number | null;
	maxlength?: number | null;
	autocomplete?: HTMLTextareaAttributes['autocomplete'];
	wrap?: 'soft' | 'hard' | null;
	spellcheck?: boolean | null;
	autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters' | null;
	// スタイル/レイアウト
	rows?: number;
	/** Min height as px number or CSS string. */
	minHeight?: string | number | null;
	/** Max height as px number or CSS string. Applied when `autoResize` is enabled. */
	maxHeight?: string | number | null;
	/** Renders inline. @default false */
	inline?: boolean;
	/** @default 'outline' */
	focusStyle?: FocusStyle;
	/** Width as px number or CSS string. */
	width?: string | number | null;
	fullWidth?: boolean;
	fullHeight?: boolean;
	rounded?: boolean;
	customStyle?: string;

	// アイコン関連
	clearButtonAriaLabel?: string;
	iconFilled?: boolean;
	iconWeight?: IconWeight;
	iconGrade?: IconGrade;
	iconOpticalSize?: IconOpticalSize;
	iconVariant?: IconVariant;

	// 状態/動作
	disabled?: boolean;
	/** Automatically grows height to fit content. @default true */
	autoResize?: boolean;
	/** Allows manual resize via drag handle. @default false */
	resizable?: boolean;
	/** Shows a clear (×) button when the textarea has a value. @default false */
	clearable?: boolean;
	readonly?: boolean;
	required?: boolean;
	/** Converts URLs in the value to clickable links (non-focused view). @default false */
	linkify?: boolean;

	// ARIA/アクセシビリティ
	/** Accessible label for the textarea, used when no associated visible label exists. */
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

	// 入力イベント
	onchange?: BivariantValueHandler<string>;
	oninput?: BivariantValueHandler<string>;
};
