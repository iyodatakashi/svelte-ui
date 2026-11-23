import type { Option, OptionValue } from '#lib/models/option/option.types';
import type { ComponentSize } from '#lib/models/component/component.types';
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
import type { HTMLAttributes } from 'svelte/elements';

export type SegmentedControlOption =
	| (Option & {
			icon?: string;
			ariaLabel?: string;
	  })
	| (Omit<Option, 'label'> & {
			label?: never; // アイコンのみの場合はlabelを省略
			icon: string; // 必須（アイコンのみの場合）
			ariaLabel: string; // 必須（アイコンのみの場合）
	  });

/** @deprecated Use `SegmentedControlOption` instead. Remove in 0.0.100. */
export type SegmentedControlItem = SegmentedControlOption;

export type SegmentedControlProps = Omit<
	HTMLAttributes<HTMLDivElement>,
	// 独自ハンドラ型（callbackHandlers）で再定義するイベント系は除外して衝突を避ける
	| 'onchange'
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
	/** `{ label, value, icon?, disabled?, ariaLabel? }[]` */
	options?: SegmentedControlOption[];
	/** @deprecated Use `options` instead. Remove in 0.0.100. */
	items?: SegmentedControlOption[];
	/** Currently selected value. Supports `bind:value`. */
	value: OptionValue;

	// HTML属性系
	id?: string;
	name?: string;

	// スタイル/レイアウト
	/** @default 'medium' */
	size?: ComponentSize;
	fullWidth?: boolean;
	/** Custom CSS color value. Overrides the theme color. */
	color?: string;
	rounded?: boolean;

	// アイコン関連
	iconFilled?: boolean;
	iconWeight?: IconWeight;
	iconGrade?: IconGrade;
	iconOpticalSize?: IconOpticalSize;
	iconVariant?: IconVariant;

	// 状態/動作
	disabled?: boolean;

	// ARIA/アクセシビリティ
	ariaLabel?: string;
	ariaLabelledby?: string;
	/** Disables animations for accessibility. @default false */
	reducedMotion?: boolean;

	// 入力イベント
	onchange?: BivariantValueHandler<OptionValue>;

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
