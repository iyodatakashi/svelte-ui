<!-- Slider.svelte -->

<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import { getStyleFromNumber } from '$lib/utils/style';
	import type {
		FocusHandler,
		KeyboardHandler,
		MouseHandler,
		TouchHandler,
		PointerHandler,
		BivariantValueHandler
	} from '$lib/types/eventHandlers';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type SliderProps = {
		// 基本プロパティ
		value: number;
		name?: string;
		id?: string;

		// HTML属性系
		min?: number;
		max?: number;
		step?: number;
		inputAttributes?: HTMLInputAttributes | undefined;

		// スタイル/レイアウト
		width?: string | number | null;
		fullWidth?: boolean;
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

		// その他
		[key: string]: any;
	};

	let {
		// 基本プロパティ
		value = $bindable(0),
		name,
		id = `slider-${Math.random().toString(36).substring(2, 15)}`,

		// HTML属性系
		min = 0,
		max = 100,
		step = 1,
		inputAttributes,

		// スタイル/レイアウト
		width = null,
		fullWidth = false,
		thumbColor = null,
		thumbWidth = null,
		thumbHeight = null,
		customStyle = '',

		// 状態/動作
		disabled = false,

		// フォーカスイベント
		onfocus = () => {}, // No params for type inference
		onblur = () => {}, // No params for type inference

		// キーボードイベント
		onkeydown = () => {}, // No params for type inference
		onkeyup = () => {}, // No params for type inference

		// マウスイベント
		onclick = () => {}, // No params for type inference
		onmousedown = () => {}, // No params for type inference
		onmouseup = () => {}, // No params for type inference
		onmouseenter = () => {}, // No params for type inference
		onmouseleave = () => {}, // No params for type inference
		onmouseover = () => {}, // No params for type inference
		onmouseout = () => {}, // No params for type inference
		oncontextmenu = () => {}, // No params for type inference
		onauxclick = () => {}, // No params for type inference

		// タッチイベント
		ontouchstart = () => {}, // No params for type inference
		ontouchend = () => {}, // No params for type inference
		ontouchmove = () => {}, // No params for type inference
		ontouchcancel = () => {}, // No params for type inference

		// ポインターイベント
		onpointerdown = () => {}, // No params for type inference
		onpointerup = () => {}, // No params for type inference
		onpointerenter = () => {}, // No params for type inference
		onpointerleave = () => {}, // No params for type inference
		onpointermove = () => {}, // No params for type inference
		onpointercancel = () => {}, // No params for type inference

		// 入力イベント
		onchange = () => {}, // No params for type inference
		oninput = () => {}, // No params for type inference

		// その他
		...restProps
	}: SliderProps = $props();

	let ref: HTMLInputElement | undefined = $state();
	let isFocused: boolean = $state(false);

	// =========================================================================
	// Methods
	// =========================================================================
	// フォーカスイベント
	const handleFocus = (event: FocusEvent): void => {
		if (disabled) return;
		isFocused = true;
		onfocus(event);
	};

	const handleBlur = (event: FocusEvent): void => {
		if (disabled) return;
		isFocused = false;
		onblur(event);
	};

	// キーボードイベント
	const handleKeydown = (event: KeyboardEvent): void => {
		if (disabled) return;
		onkeydown(event);
	};

	const handleKeyup = (event: KeyboardEvent): void => {
		if (disabled) return;
		onkeyup(event);
	};

	// マウスイベント
	const handleClick = (event: MouseEvent) => {
		if (disabled) return;
		onclick?.(event);
	};

	const handleMouseDown = (event: MouseEvent) => {
		if (disabled) return;
		onmousedown?.(event);
	};

	const handleMouseUp = (event: MouseEvent) => {
		if (disabled) return;
		onmouseup?.(event);
	};

	const handleMouseEnter = (event: MouseEvent) => {
		if (disabled) return;
		onmouseenter?.(event);
	};

	const handleMouseLeave = (event: MouseEvent) => {
		if (disabled) return;
		onmouseleave?.(event);
	};

	const handleMouseOver = (event: MouseEvent) => {
		if (disabled) return;
		onmouseover?.(event);
	};

	const handleMouseOut = (event: MouseEvent) => {
		if (disabled) return;
		onmouseout?.(event);
	};

	const handleContextMenu = (event: MouseEvent) => {
		if (disabled) return;
		oncontextmenu?.(event);
	};

	const handleAuxClick = (event: MouseEvent) => {
		if (disabled) return;
		onauxclick?.(event);
	};

	// タッチイベント
	const handleTouchStart = (event: TouchEvent) => {
		if (disabled) return;
		ontouchstart?.(event);
	};

	const handleTouchEnd = (event: TouchEvent) => {
		if (disabled) return;
		ontouchend?.(event);
	};

	const handleTouchMove = (event: TouchEvent) => {
		if (disabled) return;
		ontouchmove?.(event);
	};

	const handleTouchCancel = (event: TouchEvent) => {
		if (disabled) return;
		ontouchcancel?.(event);
	};

	// ポインターイベント
	const handlePointerDown = (event: PointerEvent) => {
		if (disabled) return;
		onpointerdown?.(event);
	};

	const handlePointerUp = (event: PointerEvent) => {
		if (disabled) return;
		onpointerup?.(event);
	};

	const handlePointerEnter = (event: PointerEvent) => {
		if (disabled) return;
		onpointerenter?.(event);
	};

	const handlePointerLeave = (event: PointerEvent) => {
		if (disabled) return;
		onpointerleave?.(event);
	};

	const handlePointerMove = (event: PointerEvent) => {
		if (disabled) return;
		onpointermove?.(event);
	};

	const handlePointerCancel = (event: PointerEvent) => {
		if (disabled) return;
		onpointercancel?.(event);
	};

	// 入力イベント
	const handleChange = (event?: Event): void => {
		if (disabled) return;
		onchange?.(value);
	};

	const handleInput = (event?: Event): void => {
		if (disabled) return;
		oninput?.(value);
	};

	// パーセンテージ計算
	const percentage = $derived(((value - min) / (max - min)) * 100);

	// スタイル計算
	const thumbColorStyle = $derived(
		thumbColor ? `--svelte-ui-slider-thumb-background: ${thumbColor};` : ''
	);

	const thumbWidthStyle = $derived(
		thumbWidth ? `--svelte-ui-slider-thumb-width: ${getStyleFromNumber(thumbWidth)};` : ''
	);

	const thumbHeightStyle = $derived(
		thumbHeight ? `--svelte-ui-slider-thumb-height: ${getStyleFromNumber(thumbHeight)};` : ''
	);

	const sliderWidthStyle = $derived(width ? `width: ${getStyleFromNumber(width)};` : '');

	const sliderHeightStyle = $derived(
		thumbHeight
			? `height: ${getStyleFromNumber(thumbHeight)};`
			: 'height: var(--svelte-ui-slider-thumb-height);'
	);
</script>

<div
	class="slider"
	class:slider--full-width={fullWidth}
	class:slider--disabled={disabled}
	class:slider--focused={isFocused}
	data-testid="slider"
	style="{sliderWidthStyle} {sliderHeightStyle} {thumbColorStyle} {thumbWidthStyle} {thumbHeightStyle} {customStyle}"
>
	<input
		{id}
		{name}
		bind:this={ref}
		bind:value
		type="range"
		{min}
		{max}
		{step}
		{disabled}
		class="slider__input"
		onchange={handleChange}
		oninput={handleInput}
		onfocus={handleFocus}
		onblur={handleBlur}
		onclick={handleClick}
		onkeydown={handleKeydown}
		onkeyup={handleKeyup}
		onmousedown={handleMouseDown}
		onmouseup={handleMouseUp}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		onmouseover={handleMouseOver}
		onmouseout={handleMouseOut}
		oncontextmenu={handleContextMenu}
		onauxclick={handleAuxClick}
		ontouchstart={handleTouchStart}
		ontouchend={handleTouchEnd}
		ontouchmove={handleTouchMove}
		ontouchcancel={handleTouchCancel}
		onpointerdown={handlePointerDown}
		onpointerup={handlePointerUp}
		onpointerenter={handlePointerEnter}
		onpointerleave={handlePointerLeave}
		onpointermove={handlePointerMove}
		onpointercancel={handlePointerCancel}
		{...inputAttributes}
		{...restProps}
	/>
</div>

<style>
	/* =============================================
	 * 基本構造・レイアウト
	 * ============================================= */
	.slider {
		display: flex;
		align-items: center;
		position: relative;
		width: auto;
		max-width: 100%;
		box-sizing: border-box;
		line-height: 0;
	}

	.slider--full-width {
		width: 100%;
	}

	/* =============================================
	 * 基本コンポーネント
	 * ============================================= */
	.slider__input {
		width: 100%;
		height: var(--svelte-ui-slider-track-height);
		margin: 0;
		background: var(--svelte-ui-slider-track-background);
		border-radius: var(--svelte-ui-slider-track-border-radius);
		outline: none;
		-webkit-appearance: none;
		appearance: none;
		cursor: pointer;
	}

	/* Track styles */
	.slider__input::-webkit-slider-track {
		width: 100%;
		height: var(--svelte-ui-slider-track-height);
		background: var(--svelte-ui-slider-track-background);
		border-radius: var(--svelte-ui-slider-track-border-radius);
		border: none;
	}

	.slider__input::-moz-range-track {
		width: 100%;
		height: var(--svelte-ui-slider-track-height);
		background: var(--svelte-ui-slider-track-background);
		border-radius: var(--svelte-ui-slider-track-border-radius);
		border: none;
	}

	/* Thumb styles */
	.slider__input::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: var(--svelte-ui-slider-thumb-width);
		height: var(--svelte-ui-slider-thumb-height);
		background: var(--svelte-ui-slider-thumb-background);
		border-radius: var(--svelte-ui-slider-thumb-border-radius);
		border: var(--svelte-ui-slider-thumb-border);
		cursor: pointer;
		box-shadow: var(--svelte-ui-slider-thumb-shadow);
	}

	.slider__input::-moz-range-thumb {
		width: var(--svelte-ui-slider-thumb-width);
		height: var(--svelte-ui-slider-thumb-height);
		background: var(--svelte-ui-slider-thumb-background);
		border-radius: var(--svelte-ui-slider-thumb-border-radius);
		border: var(--svelte-ui-slider-thumb-border);
		cursor: pointer;
		box-shadow: var(--svelte-ui-slider-thumb-shadow);
	}

	/* Focus styles - focus-visibleでキーボードナビゲーション時のみ */
	.slider__input:focus-visible::-webkit-slider-thumb {
		outline: var(--svelte-ui-focus-outline-outer);
		outline-offset: var(--svelte-ui-focus-outline-offset-outer);
	}

	.slider__input:focus-visible::-moz-range-thumb {
		outline: var(--svelte-ui-focus-outline-outer);
		outline-offset: var(--svelte-ui-focus-outline-offset-outer);
	}

	/* =============================================
	 * 状態管理（disabled等）
	 * ============================================= */
	.slider--disabled {
		opacity: var(--svelte-ui-input-disabled-opacity);
		pointer-events: none;
	}

	.slider--disabled .slider__input {
		cursor: not-allowed;
	}

	.slider--disabled .slider__input::-webkit-slider-thumb {
		cursor: not-allowed;
	}

	.slider--disabled .slider__input::-moz-range-thumb {
		cursor: not-allowed;
	}

	/* =============================================
	 * レスポンシブ対応
	 * ============================================= */
	@media (max-width: 768px) {
		.slider__input::-webkit-slider-thumb {
			width: var(--svelte-ui-slider-thumb-width-mobile);
			height: var(--svelte-ui-slider-thumb-height-mobile);
		}

		.slider__input::-moz-range-thumb {
			width: var(--svelte-ui-slider-thumb-width-mobile);
			height: var(--svelte-ui-slider-thumb-height-mobile);
		}
	}
</style>
