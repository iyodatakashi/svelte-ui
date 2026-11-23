import type {
	BivariantValueHandler,
	FocusHandler,
	KeyboardHandler,
	MouseHandler,
	PointerHandler,
	TouchHandler
} from '#lib/models/eventHandler/eventHandler.types';
import type { InputProps } from '#lib/models/field/field.types';

export type ComboboxProps = Omit<
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
	name?: string;
	/** Supports `bind:value`. */
	value: string | number | null | undefined;
	/** Dropdown suggestion list. */
	options: string[];

	// HTML属性系
	id?: string | null;
	tabindex?: number | null;
	maxlength?: number | null;

	// スタイル/レイアウト
	customStyle?: string;
	/** Renders inline (no border/background). @default false */
	inline?: boolean;
	/** @default 'outline' */
	focusStyle?: 'background' | 'outline' | 'none';
	placeholder?: string;
	fullWidth?: boolean;
	width?: string | number | null;
	minWidth?: string | number | null;
	maxWidth?: string | number | null;
	rounded?: boolean;

	// 状態/動作
	disabled?: boolean;
	readonly?: boolean;
	required?: boolean;
	/** Filters options based on typed input. @default true */
	filterable?: boolean;
	/** On mobile, displays the popup as a sheet that slides up from the bottom. @default false */
	mobileFullscreen?: boolean;
	/** Shows a clear button when a value is entered. @default false */
	clearable?: boolean;

	// 入力イベント
	onchange?: BivariantValueHandler<string | number | null | undefined>;
	oninput?: BivariantValueHandler<string | number | null | undefined>;

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
