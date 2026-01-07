<!-- Switch.svelte -->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let {
		// Snippet
		children,

		// 基本プロパティ
		value = $bindable(false),

		// HTML属性系
		id = `switch-${Math.random().toString(36).substring(2, 15)}`,
		inputAttributes,

		// スタイル/レイアウト
		size = 'medium',

		// 状態/動作
		disabled = false,
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
		onchange = (value: boolean) => {},

		// その他
		...restProps
	}: {
		// Snippet
		children?: Snippet;

		// 基本プロパティ
		value: boolean;

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
		onchange?: (value: boolean) => void;

		// その他
		[key: string]: any;
	} = $props();

	let inputRef: HTMLInputElement | undefined = $state();
	let errorId = `switch-error-${Math.random().toString(36).substring(2, 15)}`;

	// =========================================================================

	// =========================================================================
	// Methods
	// =========================================================================
	const handleFocus = (event: FocusEvent) => {
		if (disabled) return;
		onfocus?.(event);
	};

	const handleBlur = (event: FocusEvent) => {
		if (disabled) return;
		onblur?.(event);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (disabled) return;
		onkeydown?.(event);
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			value = !value;
			onchange?.(value);
		}
	};

	const handleKeyUp = (event: KeyboardEvent) => {
		if (disabled) return;
		onkeyup?.(event);
	};

	const handleClick = (event: MouseEvent) => {
		if (disabled) return;
		onclick?.(event);
		// スイッチの状態を切り替え
		value = !value;
		onchange?.(value);
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

	const handleChange = (event: Event) => {
		if (disabled) return;
		const target = event.target as HTMLInputElement;
		value = target.checked;
		onchange?.(value);
	};
</script>

<div
	class="switch"
	class:switch--small={size === 'small'}
	class:switch--medium={size === 'medium'}
	class:switch--large={size === 'large'}
	class:switch--disabled={disabled}
	class:switch--checked={value}
	class:switch--reduced-motion={reducedMotion}
	data-testid="switch"
>
	<input
		bind:this={inputRef}
		bind:checked={value}
		type="checkbox"
		class="switch-input"
		{disabled}
		{required}
		{id}
		{...inputAttributes}
		onchange={handleChange}
		onfocus={handleFocus}
		onblur={handleBlur}
		onkeydown={handleKeyDown}
		onkeyup={handleKeyUp}
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
		{...restProps}
	/>

	<label for={id} class="switch__track">
		<span class="switch-thumb"></span>
	</label>

	<label for={id} class="switch__label" class:switch__label--disabled={disabled}>
		{#if children}
			{@render children()}
		{/if}
	</label>
</div>

<style lang="scss">
	/* =============================================
	 * Base Styles
   * ============================================= */

	.switch {
		display: flex;
		align-items: center;
		width: fit-content;
		contain: layout;
	}

	.switch-input {
		position: absolute;
		opacity: 0;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	// ラベル
	.switch__label {
		display: block;
		padding-left: var(--svelte-ui-switch-gap);
		white-space: nowrap;
		line-height: var(--svelte-ui-checkbox-line-height);
		cursor: pointer;
		text-box-trim: trim-both;
		text-box-edge: cap alphabetic;
		user-select: none;
		&--disabled {
			cursor: not-allowed;
			opacity: 0.5;
		}
	}

	// スイッチトラック
	.switch__track {
		position: relative;
		width: var(--switch-width);
		height: var(--switch-height);
		background-color: var(--svelte-ui-switch-inactive-color);
		border-radius: var(--switch-border-radius);
		transition:
			background-color var(--svelte-ui-transition-duration) ease,
			filter var(--svelte-ui-transition-duration) ease;
		flex-shrink: 0;
		cursor: pointer;

		.switch--checked & {
			background-color: var(--switch-active-color, var(--svelte-ui-switch-active-color));
		}

		.switch--disabled & {
			opacity: var(--svelte-ui-switch-disabled-opacity);
		}
	}

	// スイッチサム（丸い部分）
	.switch-thumb {
		position: absolute;
		top: var(--switch-thumb-margin);
		left: var(--switch-thumb-margin);
		width: var(--switch-thumb-size);
		height: var(--switch-thumb-size);
		background-color: var(--svelte-ui-switch-thumb-color);
		border-radius: var(--switch-thumb-border-radius);
		transition: transform var(--svelte-ui-transition-duration) ease;

		.switch--checked & {
			transform: translateX(
				calc(var(--switch-width) - var(--switch-thumb-size) - var(--switch-thumb-margin) * 2)
			);
		}

		.switch--disabled & {
			opacity: var(--svelte-ui-switch-disabled-opacity);
		}
	}

	/* =========================================================================
	 * Size Variants
	 * ========================================================================= */

	.switch--small {
		--switch-width: var(--svelte-ui-switch-width-sm);
		--switch-height: var(--svelte-ui-switch-height-sm);
		--switch-thumb-size: var(--svelte-ui-switch-thumb-size-sm);
		--switch-thumb-margin: var(--svelte-ui-switch-thumb-margin);
		--switch-border-radius: var(--svelte-ui-switch-border-radius);
		--switch-thumb-border-radius: var(--svelte-ui-switch-thumb-border-radius);
	}

	.switch--medium {
		--switch-width: var(--svelte-ui-switch-width);
		--switch-height: var(--svelte-ui-switch-height);
		--switch-thumb-size: var(--svelte-ui-switch-thumb-size);
		--switch-thumb-margin: var(--svelte-ui-switch-thumb-margin);
		--switch-border-radius: var(--svelte-ui-switch-border-radius);
		--switch-thumb-border-radius: var(--svelte-ui-switch-thumb-border-radius);
	}

	.switch--large {
		--switch-width: var(--svelte-ui-switch-width-lg);
		--switch-height: var(--svelte-ui-switch-height-lg);
		--switch-thumb-size: var(--svelte-ui-switch-thumb-size-lg);
		--switch-thumb-margin: var(--svelte-ui-switch-thumb-margin);
		--switch-border-radius: var(--svelte-ui-switch-border-radius);
		--switch-thumb-border-radius: var(--svelte-ui-switch-thumb-border-radius);
	}

	/* =============================================
 * フォーカス状態
 * ============================================= */
	.switch-input:focus-visible + .switch__track {
		outline: 2px solid var(--svelte-ui-focus-color);
		outline-offset: 2px;
	}

	/* =========================================================================
	 * Motion & Media Queries
	 * ========================================================================= */

	/* Mobile touch targets */
	@media (hover: none) and (pointer: coarse) {
		.switch__label {
			min-height: var(--svelte-ui-touch-target);
		}

		.switch--small .switch__label {
			min-height: var(--svelte-ui-touch-target-sm);
		}

		.switch--large .switch__label {
			min-height: var(--svelte-ui-touch-target-lg);
		}
	}

	.switch--reduced-motion {
		* {
			transition: none !important;
			animation: none !important;
		}
	}
</style>
