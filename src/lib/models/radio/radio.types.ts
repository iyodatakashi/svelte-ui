import type { ComponentSize } from '#lib/models/component/component.types';
import type {
	BivariantValueHandler,
	FocusHandler,
	KeyboardHandler,
	MouseHandler,
	PointerHandler,
	TouchHandler
} from '#lib/models/eventHandler/eventHandler.types';
import type { Option, OptionValue } from '#lib/models/option/option.types';
import type { Snippet } from 'svelte';
import type { HTMLInputAttributes } from 'svelte/elements';

export type RadioProps = Omit<
	HTMLInputAttributes,
	// 独自型で再定義する props / イベントは除外して衝突を避ける
	| 'children'
	| 'value'
	| 'size'
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
> & {
	// Snippet
	/** Label content displayed next to the radio button. */
	children?: Snippet;

	// 基本プロパティ
	/** Radio group name. All radios in a group must share the same name. */
	name: string;
	/** This radio button's value. */
	value: OptionValue;
	/** The currently selected value in the group. Radio is checked when `value === currentValue`. Supports `bind:currentValue`. */
	currentValue: OptionValue;

	// HTML属性系
	id?: string;

	// スタイル/レイアウト
	/** Radio button size. @default 'medium' */
	size?: ComponentSize;
	customStyle?: string;
	/** Stretches the radio to fill its container width. @default false */
	fullWidth?: boolean;

	// 状態/動作
	/** Disables this radio button. @default false */
	disabled?: boolean;
	required?: boolean;

	// ARIA/アクセシビリティ
	/** Accessible label, used when no visible label (children) is provided. */
	ariaLabel?: string;
	/** Disables animations for users who prefer reduced motion. @default false */
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

	// 入力イベント
	onchange?: BivariantValueHandler<OptionValue>;
};

export type RadioGroupProps = {
	// 基本プロパティ
	name?: string;
	/** `{ label, value, disabled? }[]` */
	options: Option[];
	/** Currently selected value. Supports `bind:value`. */
	value: OptionValue;

	// スタイル/レイアウト
	/** @default 'vertical' */
	direction?: 'vertical' | 'horizontal';
	gap?: string | number;
	wrap?: boolean;
	minOptionWidth?: string | number;
	/** @default 'medium' */
	size?: ComponentSize;

	// 状態/動作
	disabled?: boolean;
	required?: boolean;

	// ARIA/アクセシビリティ
	/** Disables animations for accessibility. @default false */
	reducedMotion?: boolean;

	// 入力イベント
	onchange?: BivariantValueHandler<OptionValue>;
};
