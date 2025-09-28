<!-- Slider.svelte -->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let {
		// Snippet
		customThumb,

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
		customStyle = '',
		fullWidth = false,
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
	}: {
		// Snippet
		customThumb?: Snippet;

		// 基本プロパティ
		value?: number;
		name?: string;
		id?: string;

		// HTML属性系
		min?: number;
		max?: number;
		step?: number;
		inputAttributes?: HTMLInputAttributes | undefined;

		// スタイル/レイアウト
		customStyle?: string;
		fullWidth?: boolean;
		disabled?: boolean;

		// フォーカスイベント
		onfocus?: Function; // No params for type inference
		onblur?: Function; // No params for type inference

		// キーボードイベント
		onkeydown?: Function; // No params for type inference
		onkeyup?: Function; // No params for type inference

		// マウスイベント
		onclick?: Function; // No params for type inference
		onmousedown?: Function; // No params for type inference
		onmouseup?: Function; // No params for type inference
		onmouseenter?: Function; // No params for type inference
		onmouseleave?: Function; // No params for type inference
		onmouseover?: Function; // No params for type inference
		onmouseout?: Function; // No params for type inference
		oncontextmenu?: Function; // No params for type inference
		onauxclick?: Function; // No params for type inference

		// タッチイベント
		ontouchstart?: Function; // No params for type inference
		ontouchend?: Function; // No params for type inference
		ontouchmove?: Function; // No params for type inference
		ontouchcancel?: Function; // No params for type inference

		// ポインターイベント
		onpointerdown?: Function; // No params for type inference
		onpointerup?: Function; // No params for type inference
		onpointerenter?: Function; // No params for type inference
		onpointerleave?: Function; // No params for type inference
		onpointermove?: Function; // No params for type inference
		onpointercancel?: Function; // No params for type inference

		// 入力イベント
		onchange?: Function; // No params for type inference
		oninput?: Function; // No params for type inference

		// その他
		[key: string]: any;
	} = $props();

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
</script>

<div
	class="slider"
	class:slider--full-width={fullWidth}
	class:slider--disabled={disabled}
	class:slider--focused={isFocused}
	class:slider--has-custom-thumb={customThumb}
	data-testid="slider"
	style={customStyle}
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

	{#if customThumb}
		<div class="slider__custom-thumb" style="left: {percentage}%">
			{@render customThumb()}
		</div>
	{/if}
</div>

<style>
	/* =============================================
	 * 基本構造・レイアウト
	 * ============================================= */
	.slider {
		display: inline-block;
		position: relative;
		width: 100%;
		max-width: 100%;
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
		background: var(--base-100-transparent);
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
		width: var(--svelte-ui-slider-thumb-size);
		height: var(--svelte-ui-slider-thumb-size);
		background: var(--svelte-ui-slider-thumb-background);
		border-radius: var(--svelte-ui-slider-thumb-border-radius);
		border: var(--svelte-ui-slider-thumb-border);
		cursor: pointer;
		box-shadow: var(--svelte-ui-slider-thumb-shadow);
	}

	.slider__input::-moz-range-thumb {
		width: var(--svelte-ui-slider-thumb-size);
		height: var(--svelte-ui-slider-thumb-size);
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
	 * カスタムthumb
	 * ============================================= */
	.slider__custom-thumb {
		position: absolute;
		top: 50%;
		transform: translate(-50%, -50%);
		pointer-events: none;
	}

	.slider--has-custom-thumb .slider__input::-webkit-slider-thumb {
		opacity: 0;
	}

	.slider--has-custom-thumb .slider__input::-moz-range-thumb {
		opacity: 0;
	}

	.slider__input:focus-visible + .slider__custom-thumb {
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
			width: var(--svelte-ui-slider-thumb-size-mobile);
			height: var(--svelte-ui-slider-thumb-size-mobile);
		}

		.slider__input::-moz-range-thumb {
			width: var(--svelte-ui-slider-thumb-size-mobile);
			height: var(--svelte-ui-slider-thumb-size-mobile);
		}

		.slider__custom-thumb {
			width: var(--svelte-ui-slider-custom-thumb-size-mobile);
			height: var(--svelte-ui-slider-custom-thumb-size-mobile);
		}
	}
</style>
