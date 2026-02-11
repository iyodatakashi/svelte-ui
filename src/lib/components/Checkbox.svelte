<!-- Checkbox.svelte -->

<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
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
	export type CheckboxProps = {
		// Snippet
		children?: Snippet;

		// 基本プロパティ
		name?: string;
		value: boolean;
		indeterminate?: boolean;

		// HTML属性系
		id?: string;
		inputAttributes?: HTMLInputAttributes | undefined;

		// スタイル/レイアウト
		size?: 'small' | 'medium' | 'large';

		// 状態/動作
		disabled?: boolean;
		required?: boolean;

		// ARIA/アクセシビリティ
		reducedMotion?: boolean;

		// 入力イベント
		onchange?: (value: boolean) => void;

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

		// その他
		[key: string]: any;
	};

	let {
		// Snippet
		children,

		// 基本プロパティ
		name = '',
		value = $bindable(false),
		indeterminate = $bindable(false),

		// HTML属性系
		id = `checkbox-${Math.random().toString(36).substring(2, 15)}`,
		inputAttributes,

		// スタイル/レイアウト
		size = 'medium',

		// 状態/動作
		disabled = false,
		required = false,

		// ARIA/アクセシビリティ
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
	}: CheckboxProps = $props();

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
		if (event.key === ' ' || event.key === 'Enter') {
			event.preventDefault();
			value = !value;
			onchange(value);
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
		onchange(value);
	};

	// =========================================================================
	// $derived
	// =========================================================================
	const containerClasses = $derived(
		[
			'checkbox',
			`checkbox--${size}`,
			disabled && 'checkbox--disabled',
			reducedMotion && 'checkbox--no-motion'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class={containerClasses} data-testid="checkbox">
	<input
		type="checkbox"
		bind:checked={value}
		bind:indeterminate
		{id}
		{name}
		{disabled}
		{required}
		aria-invalid={false}
		aria-required={required ? 'true' : 'false'}
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
	<label for={id} class="checkbox__icon"></label>

	{#if children}
		<label for={id} class="checkbox__label">
			{@render children()}
		</label>
	{/if}
</div>

<style>
	/* =========================================================================
	 * Base Styles
	 * ========================================================================= */

	.checkbox {
		display: flex;
		align-items: center;
		width: fit-content;
		min-height: var(--svelte-ui-checkbox-min-height);
		contain: layout;
	}

	.checkbox input[type='checkbox'] {
		position: absolute;
		width: 16px;
		height: 16px;
		margin: 0;
		opacity: 0;
		cursor: pointer;
	}

	/* Label */
	.checkbox__label {
		display: block;
		padding-left: var(--svelte-ui-checkbox-gap);
		white-space: nowrap;
		font-size: inherit;
		color: inherit;
		line-height: var(--svelte-ui-checkbox-line-height);
		cursor: pointer;
		text-box-trim: trim-both;
		text-box-edge: cap alphabetic;
	}

	/* Checkbox box */
	.checkbox__icon {
		position: relative;
		width: var(--svelte-ui-checkbox-size);
		height: var(--svelte-ui-checkbox-size);
		border: var(--svelte-ui-checkbox-border-width) solid var(--svelte-ui-checkbox-border-color);
		border-radius: var(--svelte-ui-checkbox-border-radius);
		background-color: transparent;
		transition-property: background-color, border-color, opacity;
		transition-duration: var(--svelte-ui-transition-duration);
		flex-shrink: 0;
		cursor: pointer;
	}

	/* Check mark */
	.checkbox__icon::after {
		content: 'check';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: fit-content;
		clip-path: inset(0 100% 0 0);
		font-size: var(--svelte-ui-checkbox-icon-size);
		font-family: 'Material Symbols Outlined';
		font-weight: bold;
		font-style: normal;
		color: var(--svelte-ui-checkbox-icon-color);
		text-align: center;
		line-height: 1;
		letter-spacing: normal;
		text-transform: none;
		display: inline-block;
		white-space: nowrap;
		word-wrap: normal;
		direction: ltr;
		font-feature-settings: 'liga';
		-webkit-font-smoothing: antialiased;
		opacity: 0;
		transition-property: clip-path, opacity;
		transition-delay: 0s, 0s;
		transition-duration: var(--svelte-ui-transition-duration), var(--svelte-ui-transition-duration);
	}

	/* =========================================================================
	   State Modifiers
	   ========================================================================= */

	/* Disabled state */
	.checkbox--disabled input[type='checkbox'] {
		cursor: not-allowed;
	}

	.checkbox--disabled .checkbox__label {
		opacity: var(--svelte-ui-button-disabled-opacity);
		cursor: not-allowed;
	}

	/* Checked state */
	input[type='checkbox']:checked + .checkbox__icon::after {
		width: var(--svelte-ui-checkbox-icon-width);
		clip-path: inset(0 0 0 0);
		opacity: 1;
		transition-delay:
			var(--svelte-ui-transition-duration-fast), var(--svelte-ui-transition-duration-fast);
	}

	/* Indeterminate state */
	input[type='checkbox']:indeterminate + .checkbox__icon::after {
		content: 'remove';
		width: var(--svelte-ui-checkbox-icon-width);
		opacity: 1;
		transition-delay:
			var(--svelte-ui-transition-duration-fast), var(--svelte-ui-transition-duration-fast);
	}

	/* Hover states */
	@media (hover: hover) {
		.checkbox:not(.checkbox--disabled):hover .checkbox__icon {
			border-color: var(--svelte-ui-checkbox-hover-color);
		}
	}

	/* Focus states */
	input[type='checkbox']:focus-visible + .checkbox__icon {
		outline: var(--svelte-ui-focus-outline-outer);
		outline-offset: var(--svelte-ui-focus-outline-offset-outer);
	}

	/* Checked/Indeterminate background */
	input[type='checkbox']:checked + .checkbox__icon,
	input[type='checkbox']:indeterminate + .checkbox__icon {
		background-color: var(--svelte-ui-checkbox-bg-checked);
		border-color: transparent;
	}

	/* =========================================================================
	 * Size Variants
	 * ========================================================================= */

	.checkbox--small {
		font-size: inherit;
	}

	.checkbox--small .checkbox__label {
		min-height: var(--svelte-ui-checkbox-min-height-sm);
	}

	.checkbox--small .checkbox__icon {
		width: var(--svelte-ui-checkbox-size-sm);
		height: var(--svelte-ui-checkbox-size-sm);
	}

	.checkbox--small .checkbox__icon::after {
		font-size: var(--svelte-ui-checkbox-icon-size-sm);
	}

	.checkbox--large {
		font-size: inherit;
	}

	.checkbox--large .checkbox__label {
		min-height: var(--svelte-ui-checkbox-min-height-lg);
	}

	.checkbox--large .checkbox__icon {
		width: var(--svelte-ui-checkbox-size-lg);
		height: var(--svelte-ui-checkbox-size-lg);
	}

	.checkbox--large .checkbox__icon::after {
		font-size: var(--svelte-ui-checkbox-icon-size-lg);
	}

	/* =========================================================================
	 * Motion & Media Queries
	 * ========================================================================= */

	/* Mobile touch targets */
	@media (hover: none) and (pointer: coarse) {
		.checkbox__label {
			min-height: var(--svelte-ui-touch-target);
		}

		.checkbox--small .checkbox__label {
			min-height: var(--svelte-ui-touch-target-sm);
		}

		.checkbox--large .checkbox__label {
			min-height: var(--svelte-ui-touch-target-lg);
		}
	}

	/* Reduced motion */
	.checkbox--no-motion .checkbox__icon,
	.checkbox--no-motion .checkbox__icon::after {
		transition-duration: 0.01s;
	}

	/* Prefers reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.checkbox__icon,
		.checkbox__icon::after {
			transition-duration: 0.01s;
		}
	}
</style>
