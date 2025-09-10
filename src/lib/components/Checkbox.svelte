<!-- Checkbox.svelte -->

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
		// 基本プロパティ
		name?: string;
		value: boolean;
		indeterminate?: boolean;
		children?: Snippet;

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
		onchange?: (value: boolean) => void;

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

		// その他
		[key: string]: any;
	} = $props();

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
	{#if children}
		<label for={id} class="checkbox-label">
			{@render children()}
		</label>
	{/if}
</div>

<style>
	/* =========================================================================
	   Base Styles
	   ========================================================================= */
	.checkbox {
		display: flex;
		flex-direction: column;
		gap: 4px;
		contain: layout;
	}

	.checkbox input[type='checkbox'] {
		position: absolute;
		width: 16px;
		height: 16px;
		margin: 0;
		line-height: 1px;
		opacity: 0;
		cursor: pointer;
	}

	.checkbox-label {
		position: relative;
		display: flex;
		align-items: center;
		padding: var(--svelte-ui-checkbox-padding);
		white-space: nowrap;
		font-size: inherit;
		color: inherit;
		cursor: pointer;
		min-height: var(--svelte-ui-checkbox-min-height);
	}

	.checkbox-label::before,
	.checkbox-label::after {
		position: absolute;
		content: '';
		display: block;
		top: 50%;
		transform: translateY(-50%);
	}

	/* Checkbox box */
	.checkbox-label::before {
		left: 0;
		width: var(--svelte-ui-checkbox-size);
		height: var(--svelte-ui-checkbox-size);
		border: var(--svelte-ui-checkbox-border-width) solid var(--svelte-ui-checkbox-border-color);
		border-radius: var(--svelte-ui-checkbox-border-radius);
		background-color: transparent;
		transition-property: background-color, border-color, opacity;
		transition-duration: var(--svelte-ui-transition-duration-fast);
	}

	/* Check mark container */
	.checkbox-label::after {
		content: 'check';
		left: 0;
		width: 0;
		overflow: hidden;
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
		transition-property: width, opacity;
		transition-delay: 0s, 0s;
		transition-duration: var(--svelte-ui-transition-duration), var(--svelte-ui-transition-duration);
	}

	/* =========================================================================
	   Size Variants
	   ========================================================================= */
	.checkbox--small {
		font-size: var(--svelte-ui-font-size-sm);
	}

	.checkbox--small .checkbox-label {
		padding: var(--svelte-ui-checkbox-padding-sm);
		min-height: var(--svelte-ui-checkbox-min-height-sm);
	}

	.checkbox--small .checkbox-label::before {
		width: var(--svelte-ui-checkbox-size-sm);
		height: var(--svelte-ui-checkbox-size-sm);
	}

	.checkbox--small .checkbox-label::after {
		font-size: var(--svelte-ui-checkbox-icon-size-sm);
	}

	.checkbox--small input[type='checkbox']:checked + .checkbox-label::after,
	.checkbox--small input[type='checkbox']:indeterminate + .checkbox-label::after {
		width: var(--svelte-ui-checkbox-icon-width-sm);
	}

	.checkbox--large {
		font-size: var(--svelte-ui-font-size-lg);
	}

	.checkbox--large .checkbox-label {
		padding: var(--svelte-ui-checkbox-padding-lg);
		min-height: var(--svelte-ui-checkbox-min-height-lg);
	}

	.checkbox--large .checkbox-label::before {
		width: var(--svelte-ui-checkbox-size-lg);
		height: var(--svelte-ui-checkbox-size-lg);
	}

	.checkbox--large .checkbox-label::after {
		font-size: var(--svelte-ui-checkbox-icon-size-lg);
	}

	.checkbox--large input[type='checkbox']:checked + .checkbox-label::after,
	.checkbox--large input[type='checkbox']:indeterminate + .checkbox-label::after {
		width: var(--svelte-ui-checkbox-icon-width-lg);
	}

	/* =========================================================================
	   State Modifiers
	   ========================================================================= */
	/* Disabled state */
	.checkbox--disabled input[type='checkbox'] {
		cursor: not-allowed;
	}

	.checkbox--disabled .checkbox-label {
		opacity: var(--svelte-ui-button-disabled-opacity);
		cursor: not-allowed;
	}

	/* Checked state */
	input[type='checkbox']:checked + .checkbox-label::after {
		width: var(--svelte-ui-checkbox-icon-width);
		opacity: 1;
		transition-delay:
			var(--svelte-ui-transition-duration-fast), var(--svelte-ui-transition-duration-fast);
	}

	/* Indeterminate state */
	input[type='checkbox']:indeterminate + .checkbox-label::after {
		content: 'remove';
		width: var(--svelte-ui-checkbox-icon-width);
		opacity: 1;
		transition-delay:
			var(--svelte-ui-transition-duration-fast), var(--svelte-ui-transition-duration-fast);
	}

	/* Hover states */
	@media (hover: hover) {
		.checkbox:not(.checkbox--disabled) .checkbox-label:hover::before {
			border-color: var(--svelte-ui-checkbox-hover-color);
		}
	}

	/* Focus states */
	input[type='checkbox']:focus-visible + .checkbox-label::before {
		outline: var(--svelte-ui-focus-outline-outer);
		outline-offset: var(--svelte-ui-focus-outline-offset-outer);
	}

	/* Checked/Indeterminate background */
	input[type='checkbox']:checked + .checkbox-label::before,
	input[type='checkbox']:indeterminate + .checkbox-label::before {
		background-color: var(--svelte-ui-checkbox-bg-checked);
		border-color: transparent;
	}

	/* =========================================================================
	   Motion & Media Queries
	   ========================================================================= */
	/* Mobile touch targets */
	@media (hover: none) and (pointer: coarse) {
		.checkbox-label {
			min-height: var(--svelte-ui-touch-target);
		}

		.checkbox--small .checkbox-label {
			min-height: var(--svelte-ui-touch-target-sm);
		}

		.checkbox--large .checkbox-label {
			min-height: var(--svelte-ui-touch-target-lg);
		}
	}

	/* Reduced motion */
	.checkbox--no-motion .checkbox-label::before,
	.checkbox--no-motion .checkbox-label::after {
		transition-duration: 0.01s;
	}

	/* Prefers reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.checkbox-label::before,
		.checkbox-label::after {
			transition-duration: 0.01s;
		}
	}
</style>
