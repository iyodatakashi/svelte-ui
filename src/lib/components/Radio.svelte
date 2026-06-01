<!-- Radio.svelte -->

<script lang="ts">
	import { type Snippet } from 'svelte';
	import type {
		FocusHandler,
		KeyboardHandler,
		MouseHandler,
		TouchHandler,
		PointerHandler,
		BivariantValueHandler
	} from '$lib/types/callbackHandlers';
	import type { OptionValue } from '$lib/types/options';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type RadioProps = {
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
		size?: 'small' | 'medium' | 'large';

		// 状態/動作
		/** Disables this radio button. @default false */
		disabled?: boolean;
		/** Stretches the radio to fill its container width. @default false */
		fullWidth?: boolean;
		required?: boolean;

		// ARIA/アクセシビリティ
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

		// その他
		[key: string]: any;
	};

	let {
		// Snippet
		children,

		// 基本プロパティ
		name = '',
		value = '',
		currentValue = $bindable(null),

		// HTML属性系
		id = `radio-${Math.random().toString(36).substring(2, 15)}`,

		// スタイル/レイアウト
		size = 'medium',

		// 状態/動作
		disabled = false,
		fullWidth = false,
		required = false,

		// ARIA/アクセシビリティ
		reducedMotion = false,

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

		// その他
		...restProps
	}: RadioProps = $props();

	// =========================================================================
	// Methods
	// =========================================================================
	const handleFocus = (event: FocusEvent) => {
		if (disabled) return;
		onfocus(event);
	};

	const handleBlur = (event: FocusEvent) => {
		if (disabled) return;
		onblur(event);
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (disabled) return;

		if (
			event.key === 'ArrowUp' ||
			event.key === 'ArrowDown' ||
			event.key === 'ArrowLeft' ||
			event.key === 'ArrowRight'
		) {
			const radioInputs = document.querySelectorAll(`input[type="radio"][name="${name}"]`);
			const currentIndex = Array.from(radioInputs).findIndex((input) => input === event.target);

			if (currentIndex !== -1) {
				event.preventDefault();
				let nextIndex;

				if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
					nextIndex = currentIndex > 0 ? currentIndex - 1 : radioInputs.length - 1;
				} else {
					nextIndex = currentIndex < radioInputs.length - 1 ? currentIndex + 1 : 0;
				}

				const nextInput = radioInputs[nextIndex] as HTMLInputElement;
				if (nextInput && !nextInput.disabled) {
					nextInput.focus();
					nextInput.click();
				}
			}
		}

		onkeydown(event);
	};

	const handleKeyup = (event: KeyboardEvent) => {
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

	// 変更イベント
	const handleChange = (event: Event) => {
		if (disabled) return;

		const target = event.target as HTMLInputElement;
		if (target.checked) {
			currentValue = value;
			onchange(value);
		}
	};

	// =========================================================================
	// $derived
	// =========================================================================
	const isChecked: boolean = $derived(currentValue === value);

	const containerClasses = $derived(
		['radio', `radio--${size}`, disabled && 'radio--disabled', fullWidth && 'radio--full-width', reducedMotion && 'radio--no-motion']
			.filter(Boolean)
			.join(' ')
	);
</script>

<label class={containerClasses} data-testid="radio">
	<input
		type="radio"
		checked={isChecked}
		{id}
		{name}
		{value}
		{disabled}
		{required}
		aria-describedby={undefined}
		onfocus={handleFocus}
		onblur={handleBlur}
		onkeydown={handleKeydown}
		onkeyup={handleKeyup}
		onclick={handleClick}
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
		onchange={handleChange}
		{...restProps}
	/>
	<span class="radio__icon"></span>

	{#if children}
		<span class="radio__label">
			{@render children()}
		</span>
	{/if}
</label>

<style>
	/* =============================================
	 * Base Styles
   * ============================================= */

	.radio {
		display: inline-flex;
		align-items: flex-start;
		width: fit-content;
		min-height: var(--svelte-ui-radio-min-height);
		vertical-align: top;
		contain: layout;
		cursor: pointer;
	}

	.radio input[type='radio'] {
		position: absolute;
		width: 16px;
		height: 16px;
		margin: 0;
		line-height: 1px;
		opacity: 0;
	}

	/* Label */
	.radio__label {
		display: block;
		padding-left: var(--svelte-ui-radio-gap);
		font-size: inherit;
		color: inherit;
		line-height: var(--svelte-ui-radio-line-height);
		text-box-trim: trim-both;
		text-box-edge: cap alphabetic;
		margin-block-start: calc((var(--svelte-ui-radio-min-height) - 1cap) / 2);
	}

	/* Icon */
	.radio__icon {
		position: relative;
		display: flex;
		align-items: center;
		width: var(--svelte-ui-radio-size);
		height: var(--svelte-ui-radio-size);
		font-size: inherit;
		color: inherit;
		flex-shrink: 0;
		margin-block-start: calc((var(--svelte-ui-radio-min-height) - var(--svelte-ui-radio-size)) / 2);
	}

	.radio__icon::before,
	.radio__icon::after {
		position: absolute;
		content: '';
		display: block;
		top: 50%;
		transform: translateY(-50%);
	}

	/* Radio button outer circle */
	.radio__icon::after {
		left: 0;
		width: var(--svelte-ui-radio-size);
		height: var(--svelte-ui-radio-size);
		border: var(--svelte-ui-radio-border-width) solid var(--svelte-ui-radio-border-color);
		border-radius: var(--svelte-ui-radio-border-radius);
		background-color: transparent;
		transition-property: border-color, background-color;
		transition-duration: var(--svelte-ui-transition-duration);
	}

	/* Radio button inner dot */
	.radio__icon::before {
		left: calc(var(--svelte-ui-radio-size) / 2);
		width: 0;
		height: 0;
		background-color: var(--svelte-ui-radio-bg-checked);
		border-radius: var(--svelte-ui-radio-border-radius);
		transition-property: left, top, width, height;
		transition-duration: var(--svelte-ui-transition-duration);
	}

	/* Checked state */
	input[type='radio']:checked + .radio__icon::before {
		left: calc((var(--svelte-ui-radio-size) - var(--svelte-ui-radio-dot-size)) / 2);
		width: var(--svelte-ui-radio-dot-size);
		height: var(--svelte-ui-radio-dot-size);
	}

	/* =============================================
   * Status
   * ============================================= */
	.radio--full-width {
		width: 100%;
	}

	.radio--full-width .radio__label {
		flex: 1;
	}

	.radio--disabled {
		opacity: var(--svelte-ui-button-disabled-opacity);
	}

	.radio--disabled {
		cursor: not-allowed;
	}

	/* Hover states */
	@media (hover: hover) {
		.radio:not(.radio--disabled):hover .radio__icon::after,
		.radio:not(.radio--disabled):hover .radio__icon::before {
			border-color: var(--svelte-ui-radio-hover-color);
		}
	}

	/* Checked state */
	input[type='radio']:checked + .radio__icon::after {
		border-color: var(--svelte-ui-radio-hover-color);
	}

	/* Focus state */
	input[type='radio']:focus-visible + .radio__icon::after {
		outline: var(--svelte-ui-focus-outline-outer);
		outline-offset: var(--svelte-ui-focus-outline-offset-outer);
	}

	/* =========================================================================
	 * Size Variants
	 * ========================================================================= */

	/* Size variants */
	.radio--small {
		font-size: inherit;
	}

	.radio--small .radio__icon {
		width: var(--svelte-ui-radio-size-sm);
		height: var(--svelte-ui-radio-size-sm);
		margin-block-start: calc((var(--svelte-ui-radio-min-height-sm) - var(--svelte-ui-radio-size-sm)) / 2);
	}

	.radio--small .radio__label {
		margin-block-start: calc((var(--svelte-ui-radio-min-height-sm) - 1cap) / 2);
	}

	.radio--small .radio__icon::after {
		width: var(--svelte-ui-radio-size-sm);
		height: var(--svelte-ui-radio-size-sm);
	}

	.radio--small .radio__icon::before {
		left: calc(var(--svelte-ui-radio-size-sm) / 2);
	}

	.radio--small input[type='radio']:checked + .radio__icon::before {
		left: calc((var(--svelte-ui-radio-size-sm) - var(--svelte-ui-radio-dot-size-sm)) / 2);
		width: var(--svelte-ui-radio-dot-size-sm);
		height: var(--svelte-ui-radio-dot-size-sm);
	}

	.radio--large {
		font-size: inherit;
	}

	.radio--large .radio__icon {
		width: var(--svelte-ui-radio-size-lg);
		height: var(--svelte-ui-radio-size-lg);
		margin-block-start: calc((var(--svelte-ui-radio-min-height-lg) - var(--svelte-ui-radio-size-lg)) / 2);
	}

	.radio--large .radio__label {
		margin-block-start: calc((var(--svelte-ui-radio-min-height-lg) - 1cap) / 2);
	}

	.radio--large .radio__icon::after {
		width: var(--svelte-ui-radio-size-lg);
		height: var(--svelte-ui-radio-size-lg);
	}

	.radio--large .radio__icon::before {
		left: calc(var(--svelte-ui-radio-size-lg) / 2);
	}

	.radio--large input[type='radio']:checked + .radio__icon::before {
		left: calc((var(--svelte-ui-radio-size-lg) - var(--svelte-ui-radio-dot-size-lg)) / 2);
		width: var(--svelte-ui-radio-dot-size-lg);
		height: var(--svelte-ui-radio-dot-size-lg);
	}

	/* =========================================================================
	 * Motion & Media Queries
	 * ========================================================================= */

	/* Mobile touch targets */
	@media (hover: none) and (pointer: coarse) {
		.radio {
			min-height: var(--svelte-ui-touch-target);
		}

		.radio--small {
			min-height: var(--svelte-ui-touch-target-sm);
		}

		.radio--large {
			min-height: var(--svelte-ui-touch-target-lg);
		}
	}

	/* Reduced motion */
	.radio--no-motion .radio__icon::before,
	.radio--no-motion .radio__icon::after {
		transition-duration: 0.01s;
	}

	/* Prefers reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.radio__icon::before,
		.radio__icon::after {
			transition-duration: 0.01s;
		}
	}
</style>
