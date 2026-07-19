<!-- Switch.svelte -->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type {
		FocusHandler,
		KeyboardHandler,
		MouseHandler,
		TouchHandler,
		PointerHandler,
		BivariantValueHandler
	} from '$lib/types/callbackHandlers';
	import type { ComponentSize } from '$lib/types/propOptions';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type SwitchProps = Omit<
		HTMLInputAttributes,
		// 独自型で再定義する props / イベントは除外して衝突を避ける
		| 'children'
		| 'value'
		| 'size'
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
	> & {
		// Snippet
		children?: Snippet;

		// 基本プロパティ
		/** Supports `bind:value`. */
		value: boolean;

		// HTML属性系
		id?: string;
		// スタイル/レイアウト
		/** @default 'medium' */
		size?: ComponentSize;
		customStyle?: string;
		/** Stretches the switch to fill its container width. @default false */
		fullWidth?: boolean;

		// 状態/動作
		disabled?: boolean;
		required?: boolean;

		// ARIA/アクセシビリティ
		/** Accessible label, used when no visible label (children) is provided. */
		ariaLabel?: string;
		/** Disables animations for accessibility. @default false */
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
		onchange?: BivariantValueHandler<boolean>;
	};

	let {
		// Snippet
		children,

		// 基本プロパティ
		value = $bindable(false),

		// HTML属性系
		id = `switch-${Math.random().toString(36).substring(2, 15)}`,

		// スタイル/レイアウト
		size = 'medium',
		customStyle = '',
		fullWidth = false,

		// 状態/動作
		disabled = false,
		required = false,

		// ARIA/アクセシビリティ
		ariaLabel,
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
	}: SwitchProps = $props();

	let inputRef: HTMLInputElement | undefined = $state();

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

<label
	class="switch"
	class:switch--small={size === 'small'}
	class:switch--medium={size === 'medium'}
	class:switch--large={size === 'large'}
	class:switch--disabled={disabled}
	class:switch--full-width={fullWidth}
	class:switch--checked={value}
	class:switch--reduced-motion={reducedMotion}
	style={customStyle}
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
		aria-label={ariaLabel}
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

	<span class="switch__track">
		<span class="switch-thumb"></span>
	</span>

	<span class="switch__label" class:switch__label--disabled={disabled}>
		{#if children}
			{@render children()}
		{/if}
	</span>
</label>

<style lang="scss">
	/* =============================================
	 * Base Styles
   * ============================================= */

	.switch {
		display: inline-flex;
		vertical-align: top;
		align-items: flex-start;
		width: fit-content;
		min-height: var(--svelte-ui-switch-min-height);
		contain: layout;
		cursor: pointer;
		font-weight: inherit;
	}

	.switch--full-width {
		width: 100%;
	}

	.switch--full-width .switch__label {
		flex: 1;
	}

	.switch--disabled {
		cursor: not-allowed;
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
		line-height: var(--svelte-ui-checkbox-line-height);
		text-box-trim: trim-both;
		text-box-edge: cap alphabetic;
		user-select: none;
		margin-block: calc((var(--svelte-ui-switch-min-height) - 1cap) / 2);
		&--disabled {
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
		margin-block: calc(
			(var(--svelte-ui-switch-min-height) - var(--switch-height, var(--svelte-ui-switch-height))) / 2
		);

		.switch--checked & {
			background-color: var(--switch-active-color, var(--svelte-ui-switch-active-color));
		}

		.switch--disabled & {
			opacity: var(--svelte-ui-switch-disabled-opacity);
			cursor: not-allowed;
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
		min-height: var(--svelte-ui-switch-min-height-sm);
	}

	.switch--small .switch__track {
		margin-block: calc(
			(var(--svelte-ui-switch-min-height-sm) - var(--svelte-ui-switch-height-sm)) / 2
		);
	}

	.switch--small .switch__label {
		margin-block: calc((var(--svelte-ui-switch-min-height-sm) - 1cap) / 2);
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
		min-height: var(--svelte-ui-switch-min-height-lg);
	}

	.switch--large .switch__track {
		margin-block: calc(
			(var(--svelte-ui-switch-min-height-lg) - var(--svelte-ui-switch-height-lg)) / 2
		);
	}

	.switch--large .switch__label {
		margin-block: calc((var(--svelte-ui-switch-min-height-lg) - 1cap) / 2);
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
		.switch {
			min-height: var(--svelte-ui-touch-target);
		}

		.switch__track {
			margin-block: calc(
				(var(--svelte-ui-touch-target) - var(--switch-height, var(--svelte-ui-switch-height))) / 2
			);
		}

		.switch__label {
			margin-block: calc((var(--svelte-ui-touch-target) - 1cap) / 2);
		}

		.switch--small {
			min-height: var(--svelte-ui-touch-target-sm);
		}

		.switch--small .switch__track {
			margin-block: calc(
				(var(--svelte-ui-touch-target-sm) - var(--switch-height, var(--svelte-ui-switch-height-sm))) / 2
			);
		}

		.switch--small .switch__label {
			margin-block: calc((var(--svelte-ui-touch-target-sm) - 1cap) / 2);
		}

		.switch--large {
			min-height: var(--svelte-ui-touch-target-lg);
		}

		.switch--large .switch__track {
			margin-block: calc(
				(var(--svelte-ui-touch-target-lg) - var(--switch-height, var(--svelte-ui-switch-height-lg))) / 2
			);
		}

		.switch--large .switch__label {
			margin-block: calc((var(--svelte-ui-touch-target-lg) - 1cap) / 2);
		}
	}

	.switch--reduced-motion {
		* {
			transition: none !important;
			animation: none !important;
		}
	}
</style>
