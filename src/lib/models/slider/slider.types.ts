import type {
	BivariantValueHandler,
	FocusHandler,
	KeyboardHandler,
	MouseHandler,
	PointerHandler,
	TouchHandler
} from '#lib/models/eventHandler/eventHandler.types';
import type { HTMLInputAttributes } from 'svelte/elements';

export type SliderProps = Omit<
	HTMLInputAttributes,
	// 独自型で再定義する props / イベントは除外して衝突を避ける
	| 'value'
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
	/** Supports `bind:value`. */
	value: number;
	name?: string;
	id?: string;

	// HTML属性系
	ariaLabel?: string;
	/** @default 0 */
	min?: number;
	/** @default 100 */
	max?: number;
	/** @default 1 */
	step?: number;
	// スタイル/レイアウト
	width?: string | number | null;
	fullWidth?: boolean;
	/** Custom CSS color for the thumb. */
	thumbColor?: string | null;
	thumbWidth?: string | number | null;
	thumbHeight?: string | number | null;
	customStyle?: string;

	// 状態/動作
	disabled?: boolean;

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
	onchange?: BivariantValueHandler<number>;
	oninput?: BivariantValueHandler<number>;
};
