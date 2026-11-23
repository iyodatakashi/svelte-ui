import type {
	BivariantValueHandler,
	FocusHandler,
	KeyboardHandler,
	MouseHandler,
	PointerHandler,
	TouchHandler
} from '#lib/models/eventHandler/eventHandler.types';
import type { FocusStyle, InputProps } from '#lib/models/field/field.types';
import type {
	IconGrade,
	IconOpticalSize,
	IconVariant,
	IconWeight
} from '#lib/models/icon/icon.types';

/**
 * Datepicker mode type
 * Used by Datepicker component
 */
export type DatepickerMode = 'single' | 'range';

export type DatepickerProps = Omit<
	InputProps,
	// 独自ハンドラ型と独自型の value は除外して衝突を避ける（余剰プロパティは Input へ転送）
	| 'value'
	| 'onchange'
	| 'oninput'
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
	// 基本プロパティ
	/** Selected date (single mode) or range (range mode). Supports `bind:value`. */
	value: Date | { start: Date; end: Date } | undefined;
	/** dayjs format string for display (e.g. `"YYYY/MM/DD"`). */
	format?: string;
	placeholder?: string;
	locale?: 'en' | 'ja' | 'fr' | 'de' | 'es' | 'zh-cn';
	/** Separator between start and end dates in range mode. @default ' - ' */
	rangeSeparator?: string;

	// HTML属性系
	id?: string;
	// スタイル/レイアウト
	/** Renders inline (no border/background). @default false */
	inline?: boolean;
	/** @default 'outline' */
	focusStyle?: FocusStyle;
	fullWidth?: boolean;
	/** On mobile, displays the popup as a sheet that slides up from the bottom. @default false */
	mobileFullscreen?: boolean;
	width?: string | number | null;
	minWidth?: string | number | null;
	maxWidth?: string | number | null;
	rounded?: boolean;

	// アイコン関連
	/** Shows a calendar icon. @default false */
	hasIcon?: boolean;
	iconFilled?: boolean;
	iconWeight?: IconWeight;
	iconGrade?: IconGrade;
	iconOpticalSize?: IconOpticalSize;
	iconVariant?: IconVariant;

	// 状態/動作
	disabled?: boolean;
	readonly?: boolean;
	/** `'single'` for one date, `'range'` for start/end selection. @default 'single' */
	mode?: DatepickerMode;
	/** Allows typing a date directly in the input. @default false */
	enableTextInput?: boolean;
	/** Opens the calendar when the input is clicked. @default true */
	enableClickToOpen?: boolean;
	minDate?: Date;
	maxDate?: Date;

	// 入力イベント
	onchange?: BivariantValueHandler<Date | { start: Date; end: Date } | undefined>;
	oninput?: BivariantValueHandler<string>;

	// フォーカスイベント
	onfocus?: FocusHandler;
	onblur?: FocusHandler;
	onkeydown?: KeyboardHandler;
	onkeyup?: KeyboardHandler;
	onclick?: MouseHandler;
	onmousedown?: MouseHandler;
	onmouseup?: MouseHandler;
	onmouseenter?: MouseHandler;
	onmouseleave?: MouseHandler;
	onmouseover?: MouseHandler;
	onmouseout?: MouseHandler;
	oncontextmenu?: MouseHandler;
	onauxclick?: MouseHandler;
	ontouchstart?: TouchHandler;
	ontouchend?: TouchHandler;
	ontouchmove?: TouchHandler;
	ontouchcancel?: TouchHandler;
	onpointerdown?: PointerHandler;
	onpointerup?: PointerHandler;
	onpointerenter?: PointerHandler;
	onpointerleave?: PointerHandler;
	onpointermove?: PointerHandler;
	onpointercancel?: PointerHandler;
};

export type DatepickerCalendarProps = {
	// 基本プロパティ
	value: Date | { start: Date; end: Date } | undefined;
	locale?: 'en' | 'ja' | 'fr' | 'de' | 'es' | 'zh-cn';
	minDate?: Date;
	maxDate?: Date;

	// HTML属性系
	id?: string;

	// 状態/動作
	mode?: 'single' | 'range';

	// 入力イベント
	onchange?: BivariantValueHandler<Date | { start: Date; end: Date } | undefined>;
	onOpen?: () => void;
	onClose?: () => void;
};
