<!-- Radio.svelte -->

<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let {
		// Snippet
		children,

		// 基本プロパティ
		name = '',
		value = '',
		currentValue = $bindable(null),

		// HTML属性系
		id = `radio-${Math.random().toString(36).substring(2, 15)}`,
		inputAttributes,

		// スタイル/レイアウト
		size = 'medium',

		// 状態/動作
		disabled = false,
		required = false,
		reducedMotion = false,

		// 入力イベント
		onchange = () => {}, // No params for type inference

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

		// その他
		...restProps
	}: {
		// Snippet
		children?: Snippet;

		// 基本プロパティ
		name: string;
		value: string | number | boolean;
		currentValue: string | number | boolean | null;

		// HTML属性系
		id?: string;
		inputAttributes?: HTMLInputAttributes | undefined;

		// スタイル/レイアウト
		size?: 'small' | 'medium' | 'large';

		// 状態/動作
		disabled?: boolean;
		required?: boolean;
		reducedMotion?: boolean;

		// 入力イベント
		onchange?: (value: any) => void;

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

		// その他
		[key: string]: any;
	} = $props();

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
		['radio', `radio--${size}`, disabled && 'radio--disabled', reducedMotion && 'radio--no-motion']
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class={containerClasses} data-testid="radio">
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
		{...inputAttributes}
		{...restProps}
	/>
	<label for={id} class="radio__icon"></label>

	{#if children}
		<label for={id} class="radio__label">
			{@render children()}
		</label>
	{/if}
</div>

<style>
	/* =============================================
	 * Base Styles
   * ============================================= */

	.radio {
		display: flex;
		align-items: center;
		width: fit-content;
	}

	.radio input[type='radio'] {
		position: absolute;
		width: 16px;
		height: 16px;
		margin: 0;
		line-height: 1px;
		opacity: 0;
		cursor: pointer;
	}

	/* Label */
	.radio__label {
		display: flex;
		align-items: center;
		white-space: nowrap;
		font-size: inherit;
		color: inherit;
		cursor: pointer;
		min-height: var(--svelte-ui-checkbox-min-height);
	}

	/* Icon */
	.radio__icon {
		position: relative;
		display: flex;
		align-items: center;
		padding: var(--svelte-ui-radio-padding);
		white-space: nowrap;
		font-size: inherit;
		color: inherit;
		cursor: pointer;
		min-height: var(--svelte-ui-radio-min-height);
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
	.radio--disabled input[type='radio'] {
		cursor: not-allowed;
	}

	.radio--disabled .radio__label {
		opacity: var(--svelte-ui-button-disabled-opacity);
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
		padding: var(--svelte-ui-radio-padding-sm);
		min-height: var(--svelte-ui-radio-min-height-sm);
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
		padding: var(--svelte-ui-radio-padding-lg);
		min-height: var(--svelte-ui-radio-min-height-lg);
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
		.radio__label {
			min-height: var(--svelte-ui-touch-target);
		}

		.radio--small .radio__label {
			min-height: var(--svelte-ui-touch-target-sm);
		}

		.radio--large .radio__label {
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
