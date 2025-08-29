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

		// フォーカスイベント
		onfocus = (event: FocusEvent) => {},
		onblur = (event: FocusEvent) => {},

		// キーボードイベント
		onkeydown = (event: KeyboardEvent) => {},
		onkeyup = (event: KeyboardEvent) => {},

		// マウスイベント
		onclick = (event: MouseEvent) => {},
		onmousedown = (event: MouseEvent) => {},
		onmouseup = (event: MouseEvent) => {},
		onmouseenter = (event: MouseEvent) => {},
		onmouseleave = (event: MouseEvent) => {},
		onmouseover = (event: MouseEvent) => {},
		onmouseout = (event: MouseEvent) => {},
		oncontextmenu = (event: MouseEvent) => {},
		onauxclick = (event: MouseEvent) => {},

		// タッチイベント
		ontouchstart = (event: TouchEvent) => {},
		ontouchend = (event: TouchEvent) => {},
		ontouchmove = (event: TouchEvent) => {},
		ontouchcancel = (event: TouchEvent) => {},

		// ポインターイベント
		onpointerdown = (event: PointerEvent) => {},
		onpointerup = (event: PointerEvent) => {},
		onpointerenter = (event: PointerEvent) => {},
		onpointerleave = (event: PointerEvent) => {},
		onpointermove = (event: PointerEvent) => {},
		onpointercancel = (event: PointerEvent) => {},

		// 変更イベント
		onchange = () => {},

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

		// フォーカスイベント
		onfocus?: (event: FocusEvent) => void;
		onblur?: (event: FocusEvent) => void;

		// キーボードイベント
		onkeydown?: (event: KeyboardEvent) => void;
		onkeyup?: (event: KeyboardEvent) => void;

		// マウスイベント
		onclick?: (event: MouseEvent) => void;
		onmousedown?: (event: MouseEvent) => void;
		onmouseup?: (event: MouseEvent) => void;
		onmouseenter?: (event: MouseEvent) => void;
		onmouseleave?: (event: MouseEvent) => void;
		onmouseover?: (event: MouseEvent) => void;
		onmouseout?: (event: MouseEvent) => void;
		oncontextmenu?: (event: MouseEvent) => void;
		onauxclick?: (event: MouseEvent) => void;

		// タッチイベント
		ontouchstart?: (event: TouchEvent) => void;
		ontouchend?: (event: TouchEvent) => void;
		ontouchmove?: (event: TouchEvent) => void;
		ontouchcancel?: (event: TouchEvent) => void;

		// ポインターイベント
		onpointerdown?: (event: PointerEvent) => void;
		onpointerup?: (event: PointerEvent) => void;
		onpointerenter?: (event: PointerEvent) => void;
		onpointerleave?: (event: PointerEvent) => void;
		onpointermove?: (event: PointerEvent) => void;
		onpointercancel?: (event: PointerEvent) => void;

		// 変更イベント
		onchange?: (value: any) => void;

		// その他
		[key: string]: any;
	} = $props();

	// =========================================================================
	const isDisabled = $derived(disabled);

	// Methods
	// =========================================================================
	const handleFocus = (event: FocusEvent) => {
		if (isDisabled) return;
		onfocus(event);
	};

	const handleBlur = (event: FocusEvent) => {
		if (isDisabled) return;
		onblur(event);
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (isDisabled) return;

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
		if (isDisabled) return;
		onclick?.(event);
	};

	const handleMouseDown = (event: MouseEvent) => {
		if (isDisabled) return;
		onmousedown?.(event);
	};

	const handleMouseUp = (event: MouseEvent) => {
		if (isDisabled) return;
		onmouseup?.(event);
	};

	const handleMouseEnter = (event: MouseEvent) => {
		if (isDisabled) return;
		onmouseenter?.(event);
	};

	const handleMouseLeave = (event: MouseEvent) => {
		if (isDisabled) return;
		onmouseleave?.(event);
	};

	const handleMouseOver = (event: MouseEvent) => {
		if (isDisabled) return;
		onmouseover?.(event);
	};

	const handleMouseOut = (event: MouseEvent) => {
		if (isDisabled) return;
		onmouseout?.(event);
	};

	const handleContextMenu = (event: MouseEvent) => {
		if (isDisabled) return;
		oncontextmenu?.(event);
	};

	const handleAuxClick = (event: MouseEvent) => {
		if (isDisabled) return;
		onauxclick?.(event);
	};

	// タッチイベント
	const handleTouchStart = (event: TouchEvent) => {
		if (isDisabled) return;
		ontouchstart?.(event);
	};

	const handleTouchEnd = (event: TouchEvent) => {
		if (isDisabled) return;
		ontouchend?.(event);
	};

	const handleTouchMove = (event: TouchEvent) => {
		if (isDisabled) return;
		ontouchmove?.(event);
	};

	const handleTouchCancel = (event: TouchEvent) => {
		if (isDisabled) return;
		ontouchcancel?.(event);
	};

	// ポインターイベント
	const handlePointerDown = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointerdown?.(event);
	};

	const handlePointerUp = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointerup?.(event);
	};

	const handlePointerEnter = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointerenter?.(event);
	};

	const handlePointerLeave = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointerleave?.(event);
	};

	const handlePointerMove = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointermove?.(event);
	};

	const handlePointerCancel = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointercancel?.(event);
	};

	// 変更イベント
	const handleChange = (event: Event) => {
		if (isDisabled) return;

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
		[
			'radio-container',
			`radio-container--${size}`,
			disabled && 'radio-container--disabled',
			reducedMotion && 'radio-container--no-motion'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class={containerClasses} data-testid="radio-container">
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
	<label for={id} class={`radio-label ${!!children ? 'with-label' : 'no-label'}`}>
		{#if children}
			{@render children()}
		{/if}
	</label>
</div>

<style>
	.radio-container {
		display: flex;
		flex-direction: column;
		gap: 4px;
		contain: layout;
	}

	.radio-container input[type='radio'] {
		position: absolute;
		width: 16px;
		height: 16px;
		margin: 0;
		line-height: 1px;
		opacity: 0;
		cursor: pointer;
	}

	.radio-container--disabled input[type='radio'] {
		cursor: not-allowed;
	}

	.radio-label {
		position: relative;
		display: flex;
		align-items: center;
		padding: var(--svelte-ui-radio-padding);
		white-space: nowrap;
		font-size: inherit;
		color: var(--svelte-ui-radio-label-color);
		cursor: pointer;
		min-height: var(--svelte-ui-radio-min-height);
	}

	.radio-label.no-label {
		padding-left: 20px;
		min-height: 16px;
	}

	/* Mobile touch targets */
	@media (hover: none) and (pointer: coarse) {
		.radio-label {
			min-height: var(--svelte-ui-touch-target);
		}
	}

	.radio-container--disabled .radio-label {
		opacity: var(--svelte-ui-button-disabled-opacity);
		cursor: not-allowed;
	}

	.radio-label::before,
	.radio-label::after {
		position: absolute;
		content: '';
		display: block;
		top: 50%;
		transform: translateY(-50%);
	}

	/* Radio button outer circle */
	.radio-label::after {
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
	.radio-label::before {
		left: calc(var(--svelte-ui-radio-size) / 2);
		width: 0;
		height: 0;
		background-color: var(--svelte-ui-radio-bg-checked);
		border-radius: var(--svelte-ui-radio-border-radius);
		transition-property: left, top, width, height;
		transition-duration: var(--svelte-ui-transition-duration);
	}

	/* Checked state */
	input[type='radio']:checked + .radio-label::before {
		left: calc((var(--svelte-ui-radio-size) - var(--svelte-ui-radio-dot-size)) / 2);
		width: var(--svelte-ui-radio-dot-size);
		height: var(--svelte-ui-radio-dot-size);
	}

	/* Hover states */
	@media (hover: hover) {
		.radio-container:not(.radio-container--disabled) .radio-label:hover::after,
		.radio-container:not(.radio-container--disabled) .radio-label:hover::before {
			border-color: var(--svelte-ui-radio-hover-color);
		}
	}

	/* Checked state */
	input[type='radio']:checked + .radio-label::after {
		border-color: var(--svelte-ui-radio-hover-color);
	}

	/* Focus state */
	input[type='radio']:focus-visible + .radio-label::after {
		outline: var(--svelte-ui-focus-outline-outer);
		outline-offset: var(--svelte-ui-focus-outline-offset-outer);
	}

	/* Size variants */
	.radio-container--small {
		font-size: var(--svelte-ui-font-size-sm);
	}

	.radio-container--small .radio-label {
		padding: var(--svelte-ui-radio-padding-sm);
		min-height: var(--svelte-ui-radio-min-height-sm);
	}

	.radio-container--small .radio-label.no-label {
		padding-left: 16px;
		min-height: 12px;
	}

	.radio-container--small .radio-label::after {
		width: var(--svelte-ui-radio-size-sm);
		height: var(--svelte-ui-radio-size-sm);
	}

	.radio-container--small .radio-label::before {
		left: calc(var(--svelte-ui-radio-size-sm) / 2);
	}

	.radio-container--small input[type='radio']:checked + .radio-label::before {
		left: calc((var(--svelte-ui-radio-size-sm) - var(--svelte-ui-radio-dot-size-sm)) / 2);
		width: var(--svelte-ui-radio-dot-size-sm);
		height: var(--svelte-ui-radio-dot-size-sm);
	}

	/* Mobile touch targets for small */
	@media (hover: none) and (pointer: coarse) {
		.radio-container--small .radio-label {
			min-height: var(--svelte-ui-touch-target-sm);
		}
	}

	.radio-container--large {
		font-size: var(--svelte-ui-font-size-lg);
	}

	.radio-container--large .radio-label {
		padding: var(--svelte-ui-radio-padding-lg);
		min-height: var(--svelte-ui-radio-min-height-lg);
	}

	.radio-container--large .radio-label.no-label {
		padding-left: 24px;
		min-height: 20px;
	}

	.radio-container--large .radio-label::after {
		width: var(--svelte-ui-radio-size-lg);
		height: var(--svelte-ui-radio-size-lg);
	}

	.radio-container--large .radio-label::before {
		left: calc(var(--svelte-ui-radio-size-lg) / 2);
	}

	.radio-container--large input[type='radio']:checked + .radio-label::before {
		left: calc((var(--svelte-ui-radio-size-lg) - var(--svelte-ui-radio-dot-size-lg)) / 2);
		width: var(--svelte-ui-radio-dot-size-lg);
		height: var(--svelte-ui-radio-dot-size-lg);
	}

	/* Mobile touch targets for large */
	@media (hover: none) and (pointer: coarse) {
		.radio-container--large .radio-label {
			min-height: var(--svelte-ui-touch-target-lg);
		}
	}

	/* Reduced motion */
	.radio-container--no-motion .radio-label::before,
	.radio-container--no-motion .radio-label::after {
		transition-duration: 0.01s;
	}

	/* Prefers reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.radio-label::before,
		.radio-label::after {
			transition-duration: 0.01s;
		}
	}
</style>
