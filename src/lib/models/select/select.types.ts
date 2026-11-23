import type {
	BivariantValueHandler,
	FocusHandler,
	KeyboardHandler,
	MouseHandler,
	PointerHandler,
	TouchHandler
} from '#lib/models/eventHandler/eventHandler.types';
import type { Option, OptionValue } from '#lib/models/option/option.types';
import type { PopupPosition } from '#lib/models/popup/popup.types';

export type MultiSelectProps = {
	// 基本プロパティ
	/** Selected values array. Supports `bind:value`. */
	value: OptionValue[];
	/** `{ label, value, disabled? }[]` or `'separator'` for dividers. */
	options: (Option | 'separator')[];

	// HTML属性系
	id?: string | null;
	ariaLabel?: string;
	tabindex?: number | null;
	placeholder?: string;

	// スタイル/レイアウト
	/** Renders inline. @default false */
	inline?: boolean;
	/** @default 'outline' */
	focusStyle?: 'background' | 'outline' | 'none';
	fullWidth?: boolean;
	rounded?: boolean;
	customStyle?: string;

	// 状態/動作
	disabled?: boolean;
	required?: boolean;

	// ポップアップ
	/** @default 'bottom-left' */
	position?: PopupPosition;
	/** On mobile, displays the popup as a sheet that slides up from the bottom. @default false */
	mobileFullscreen?: boolean;

	// イベントハンドラ
	onfocus?: FocusHandler;
	onblur?: FocusHandler;
	onchange?: BivariantValueHandler<OptionValue[]>;
};

export type SelectProps = {
	// 基本プロパティ
	name?: string;
	/** Supports `bind:value`. */
	value: OptionValue;
	/** `{ label, value, disabled? }[]` or `'separator'` for dividers. */
	options: (Option | 'separator')[];

	// HTML属性系
	id?: string | null;
	ariaLabel?: string;
	tabindex?: number | null;
	placeholder?: string;

	// スタイル/レイアウト
	/** Renders inline. @default false */
	inline?: boolean;
	/** @default 'outline' */
	focusStyle?: 'background' | 'outline' | 'none';
	fullWidth?: boolean;
	rounded?: boolean;
	customStyle?: string;

	// 状態/動作
	disabled?: boolean;
	required?: boolean;

	// ポップアップ
	/** @default 'bottom-left' */
	position?: PopupPosition;
	/** On mobile, displays the popup as a sheet that slides up from the bottom. @default false */
	mobileFullscreen?: boolean;

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
	onchange?: BivariantValueHandler<OptionValue>;
};
