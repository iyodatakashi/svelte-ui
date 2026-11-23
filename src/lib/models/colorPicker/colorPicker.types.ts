import type {
	BivariantValueHandler,
	FocusHandler,
	KeyboardHandler,
	MouseHandler,
	PointerHandler,
	TouchHandler
} from '#lib/models/eventHandler/eventHandler.types';
import type { IconVariant } from '#lib/models/icon/icon.types';
import type { HTMLInputAttributes } from 'svelte/elements';

export type ColorPickerProps = Omit<
	HTMLInputAttributes,
	// Input と生の color input の両方へ転送するため、Input が絞り込むキーと独自ハンドラを除外
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
	/** Hex color string (e.g. `"#ff0000"`). Supports `bind:value`. */
	value: string | null | undefined;

	// HTML属性系
	id?: string;
	ariaLabel?: string;
	// スタイル/レイアウト
	customStyle?: string;
	/** @default 'outline' */
	focusStyle?: 'background' | 'outline' | 'none';
	fullWidth?: boolean;
	width?: string | number | null;
	minWidth?: string | number | null;
	maxWidth?: string | number | null;
	rounded?: boolean;

	// 状態/動作
	disabled?: boolean;
	readonly?: boolean;
	/** Shows a clear button when a value is selected. @default false */
	clearable?: boolean;
	clearButtonAriaLabel?: string;
	iconVariant?: IconVariant;

	// 入力イベント
	onchange?: BivariantValueHandler<string>;
	oninput?: BivariantValueHandler<string>;

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
