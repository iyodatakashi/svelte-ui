<!-- Button.svelte -->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/icon';
	import type {
		FocusHandler,
		KeyboardHandler,
		MouseHandler,
		TouchHandler,
		PointerHandler
	} from '$lib/types/eventHandlers';
	import Icon from './Icon.svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import { getStyleFromNumber } from '$lib/utils/style';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let {
		// Snippet
		children,

		// HTML属性系
		buttonAttributes,
		type = 'button',
		tabindex = null,

		// スタイル/レイアウト
		customStyle,
		variant = 'ghost',
		size = 'medium',
		color,
		fullWidth = false,
		minWidth = 0,
		rounded = false,
		popup = false,

		// アイコン関連
		icon = '',
		iconFilled = false,
		iconWeight = 300,
		iconGrade = 0,
		iconOpticalSize = null,
		iconVariant = 'outlined',

		// 状態/動作
		disabled = false,
		loading = false,

		// ARIA/アクセシビリティ
		ariaLabel,
		ariaDescribedby,
		ariaExpanded,
		reducedMotion = false,

		// フォーカスイベント
		onfocus = () => {}, // No params for type inference
		onblur = () => {}, // No params for type inference

		// キーボードイベント
		onkeydown = () => {}, // No params for type inference
		onkeyup = () => {}, // No params for type inference

		// マウスイベント
		onclick,
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
		children: Snippet;

		// HTML属性系
		buttonAttributes?: HTMLButtonAttributes | undefined;
		type?: HTMLButtonAttributes['type'];
		tabindex?: number | null;

		// スタイル/レイアウト
		customStyle?: HTMLButtonAttributes['style'];
		variant?: 'ghost' | 'filled' | 'outlined' | 'glass';
		size?: 'small' | 'medium' | 'large';
		color?: string;
		fullWidth?: boolean;
		minWidth?: string | number;
		rounded?: boolean;
		popup?: boolean;

		// アイコン関連
		icon?: string;
		iconFilled?: boolean;
		iconWeight?: IconWeight;
		iconGrade?: IconGrade;
		iconOpticalSize?: IconOpticalSize;
		iconVariant?: IconVariant;

		// 状態/動作
		disabled?: boolean;
		loading?: boolean;

		// ARIA/アクセシビリティ
		ariaLabel?: string;
		ariaDescribedby?: string;
		ariaExpanded?: boolean;
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

		// その他
		[key: string]: any;
	} = $props();

	const backgroundColors = $derived({
		filled: color ?? 'var(--svelte-ui-button-bg-filled)',
		outlined: 'transparent',
		ghost: 'transparent',
		glass: 'var(--svelte-ui-button-bg-glass)'
	});

	const textColors = $derived({
		filled: 'var(--svelte-ui-button-text-filled)',
		outlined: color ?? 'var(--svelte-ui-button-text-outlined)',
		ghost: color ?? 'var(--svelte-ui-button-text-ghost)',
		glass: color ?? 'var(--svelte-ui-button-text-glass)'
	});

	// =========================================================================
	// Methods
	// =========================================================================
	const handleClick = (event: MouseEvent) => {
		if (isDisabled) return;
		if (onclick) onclick(event);
	};

	const handleAuxClick = (event: MouseEvent) => {
		if (isDisabled) return;
		onauxclick(event);
	};

	const handleFocus = (event: FocusEvent) => {
		onfocus(event);
	};

	const handleBlur = (event: FocusEvent) => {
		onblur(event);
	};

	const handleKeydown = (event: KeyboardEvent) => {
		onkeydown(event);
	};

	const handleKeyup = (event: KeyboardEvent) => {
		onkeyup(event);
	};

	// マウスイベント
	const handleMouseDown = (event: MouseEvent) => {
		if (isDisabled) return;
		onmousedown(event);
	};

	const handleMouseUp = (event: MouseEvent) => {
		if (isDisabled) return;
		onmouseup(event);
	};

	const handleMouseEnter = (event: MouseEvent) => {
		if (isDisabled) return;
		onmouseenter(event);
	};

	const handleMouseLeave = (event: MouseEvent) => {
		if (isDisabled) return;
		onmouseleave(event);
	};

	const handleMouseOver = (event: MouseEvent) => {
		if (isDisabled) return;
		onmouseover(event);
	};

	const handleMouseOut = (event: MouseEvent) => {
		if (isDisabled) return;
		onmouseout(event);
	};

	const handleContextMenu = (event: MouseEvent) => {
		if (isDisabled) return;
		oncontextmenu(event);
	};

	// タッチイベント
	const handleTouchStart = (event: TouchEvent) => {
		if (isDisabled) return;
		ontouchstart(event);
	};

	const handleTouchEnd = (event: TouchEvent) => {
		if (isDisabled) return;
		ontouchend(event);
	};

	const handleTouchMove = (event: TouchEvent) => {
		if (isDisabled) return;
		ontouchmove(event);
	};

	const handleTouchCancel = (event: TouchEvent) => {
		if (isDisabled) return;
		ontouchcancel(event);
	};

	// ポインターイベント
	const handlePointerDown = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointerdown(event);
	};

	const handlePointerUp = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointerup(event);
	};

	const handlePointerEnter = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointerenter(event);
	};

	const handlePointerLeave = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointerleave(event);
	};

	const handlePointerMove = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointermove(event);
	};

	const handlePointerCancel = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointercancel(event);
	};

	// =========================================================================
	// $derived
	// =========================================================================
	const isDisabled = $derived(disabled || loading);

	const buttonClasses = $derived(
		[
			'button',
			`button--${variant}`,
			`button--${size}`,
			popup && 'button--popup',
			rounded && 'button--rounded',
			fullWidth && 'button--full-width',
			loading && 'button--loading',
			reducedMotion && 'button--no-motion'
		]
			.filter(Boolean)
			.join(' ')
	);

	const minWidthStyle = $derived(getStyleFromNumber(minWidth));
</script>

<button
	{type}
	disabled={isDisabled}
	class={buttonClasses}
	style="color: {textColors[variant]}; background-color: {backgroundColors[variant]}; 
		min-width: {minWidthStyle}; 
		{customStyle ?? ''};"
	onclick={handleClick}
	onauxclick={handleAuxClick}
	onfocus={handleFocus}
	onblur={handleBlur}
	onkeydown={handleKeydown}
	onkeyup={handleKeyup}
	onmousedown={handleMouseDown}
	onmouseup={handleMouseUp}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	onmouseover={handleMouseOver}
	onmouseout={handleMouseOut}
	oncontextmenu={handleContextMenu}
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
	{tabindex}
	aria-label={ariaLabel}
	aria-describedby={ariaDescribedby}
	aria-expanded={ariaExpanded}
	aria-busy={loading ? 'true' : undefined}
	data-testid="button"
	{...buttonAttributes}
	{...restProps}
>
	{#if loading}
		<div class="button__loading">
			<LoadingSpinner size={18} strokeWidth={2} color="currentColor" />
		</div>
	{:else if icon}
		<div class="button__icon">
			<Icon
				filled={iconFilled}
				weight={iconWeight}
				grade={iconGrade}
				opticalSize={iconOpticalSize}
				variant={iconVariant}>{icon}</Icon
			>
		</div>
	{/if}

	<div class="button__label" class:button__label--hidden={loading}>
		{@render children()}
	</div>

	{#if popup && !loading}
		<div class="button__popup-icon">
			<Icon>arrow_drop_down</Icon>
		</div>
	{/if}
</button>

<style>
	.button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 4px;
		position: relative;
		max-width: 100%;
		background-color: transparent;
		border: none;
		border-radius: var(--svelte-ui-button-border-radius);
		font-size: inherit;
		font-family: inherit;
		line-height: normal;
		overflow: hidden;
		cursor: pointer;
		transition-property: background-color, box-shadow, color, opacity, transform;
		transition-duration: var(--svelte-ui-transition-duration);
	}

	/* Size variants */
	.button--small {
		min-height: var(--svelte-ui-button-height-sm);
		padding: var(--svelte-ui-button-padding-sm);
		font-size: var(--svelte-ui-button-font-size-sm);
	}

	.button--medium {
		min-height: var(--svelte-ui-button-height);
		padding: var(--svelte-ui-button-padding);
		font-size: var(--svelte-ui-button-font-size);
	}

	.button--large {
		min-height: var(--svelte-ui-button-height-lg);
		padding: var(--svelte-ui-button-padding-lg);
		font-size: var(--svelte-ui-button-font-size-lg);
	}

	/* Mobile touch targets */
	@media (hover: none) and (pointer: coarse) {
		.button--small {
			min-height: var(--svelte-ui-touch-target-sm);
		}
		.button--medium {
			min-height: var(--svelte-ui-touch-target);
		}
		.button--large {
			min-height: var(--svelte-ui-touch-target-lg);
		}
	}

	/* Variant styles */
	.button--outlined {
		box-shadow: inset 0 0 0 var(--svelte-ui-border-width) currentColor;
	}

	.button--glass {
		backdrop-filter: var(--svelte-ui-glass-blur);
		-webkit-backdrop-filter: var(--svelte-ui-glass-blur);
	}

	/* State modifiers */
	.button--full-width {
		width: 100%;
	}

	.button--rounded {
		border-radius: var(--svelte-ui-button-border-radius-rounded);
	}

	/* Hover effects */
	.button:before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--svelte-ui-button-hover-overlay);
		opacity: 0;
		transition-property: opacity;
		transition-duration: var(--svelte-ui-transition-duration);
		z-index: 0;
	}

	@media (hover: hover) {
		.button:hover:before {
			opacity: 1;
		}
	}

	/* Focus styles */
	.button:focus-visible {
		outline: 2px solid var(--svelte-ui-button-focus-color);
		outline-offset: 2px;
	}

	/* Disabled state */
	.button:disabled {
		opacity: var(--svelte-ui-button-disabled-opacity);
		cursor: not-allowed;
		pointer-events: none;
	}

	/* Loading state */
	.button--loading {
		cursor: wait;
	}

	/* Content sections */
	.button > * {
		z-index: 1;
	}

	.button__icon {
		margin: -12px 0 -12px -4px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button__label {
		width: 100%;
		display: block;
		text-align: center;
		line-height: var(--svelte-ui-button-line-height);
		text-box-trim: trim-both;
		text-box-edge: cap alphabetic;
		transition-property: opacity;
		transition-duration: var(--svelte-ui-transition-duration);
	}

	.button__label--hidden {
		opacity: 0;
	}

	.button__popup-icon {
		margin-right: -4px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button__loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Size-specific adjustments */
	.button--small .button__icon {
		margin-left: -2px;
	}

	.button--small .button__popup-icon {
		margin-right: -2px;
	}

	.button--large .button__icon {
		margin-left: -6px;
	}

	.button--large .button__popup-icon {
		margin-right: -6px;
	}

	/* Reduced motion */
	.button--no-motion,
	.button--no-motion:before,
	.button--no-motion .button__label {
		transition-duration: 0.01s;
	}

	/* Prefers reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.button,
		.button:before,
		.button__label {
			transition-duration: 0.01s;
		}
	}

	/* Print styles */
	@media print {
		.button {
			border: var(--svelte-ui-border-width) solid #000;
			background: transparent !important;
			color: #000 !important;
		}
	}
</style>
