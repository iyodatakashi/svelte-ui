<!-- Fab.svelte -->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/icon';
	import Icon from './Icon.svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let {
		// Snippet
		children,

		// HTML属性系
		type = 'button',
		buttonAttributes,

		// スタイル/レイアウト
		customStyle,
		color,
		variant = 'filled',
		position = 'right',
		shadow = true,

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
		children?: Snippet;
		buttonAttributes?: HTMLButtonAttributes | undefined;
		type?: HTMLButtonAttributes['type'];
		customStyle?: HTMLButtonAttributes['style'];
		disabled?: boolean;
		loading?: boolean;
		icon?: string;
		iconFilled?: boolean;
		iconWeight?: IconWeight;
		iconGrade?: IconGrade;
		iconOpticalSize?: IconOpticalSize;
		iconVariant?: IconVariant;
		color?: string;
		variant?: 'ghost' | 'filled' | 'outlined' | 'glass';
		position?: 'left' | 'center' | 'right';
		shadow?: boolean;
		reducedMotion?: boolean;
		ariaLabel?: string;
		ariaDescribedby?: string;
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
		[key: string]: any;
	} = $props();

	// =========================================================================
	// Methods
	// =========================================================================
	const handleClick = (event: MouseEvent) => {
		if (disabled || loading) return;
		if (onclick) onclick(event);
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
		if (disabled || loading) return;
		onmousedown(event);
	};

	const handleMouseUp = (event: MouseEvent) => {
		if (disabled || loading) return;
		onmouseup(event);
	};

	const handleMouseEnter = (event: MouseEvent) => {
		if (disabled || loading) return;
		onmouseenter(event);
	};

	const handleMouseLeave = (event: MouseEvent) => {
		if (disabled || loading) return;
		onmouseleave(event);
	};

	const handleMouseOver = (event: MouseEvent) => {
		if (disabled || loading) return;
		onmouseover(event);
	};

	const handleMouseOut = (event: MouseEvent) => {
		if (disabled || loading) return;
		onmouseout(event);
	};

	const handleContextMenu = (event: MouseEvent) => {
		if (disabled || loading) return;
		oncontextmenu(event);
	};

	const handleAuxClick = (event: MouseEvent) => {
		if (disabled || loading) return;
		onauxclick(event);
	};

	// タッチイベント
	const handleTouchStart = (event: TouchEvent) => {
		if (disabled || loading) return;
		ontouchstart(event);
	};

	const handleTouchEnd = (event: TouchEvent) => {
		if (disabled || loading) return;
		ontouchend(event);
	};

	const handleTouchMove = (event: TouchEvent) => {
		if (disabled || loading) return;
		ontouchmove(event);
	};

	const handleTouchCancel = (event: TouchEvent) => {
		if (disabled || loading) return;
		ontouchcancel(event);
	};

	// ポインターイベント
	const handlePointerDown = (event: PointerEvent) => {
		if (disabled || loading) return;
		onpointerdown(event);
	};

	const handlePointerUp = (event: PointerEvent) => {
		if (disabled || loading) return;
		onpointerup(event);
	};

	const handlePointerEnter = (event: PointerEvent) => {
		if (disabled || loading) return;
		onpointerenter(event);
	};

	const handlePointerLeave = (event: PointerEvent) => {
		if (disabled || loading) return;
		onpointerleave(event);
	};

	const handlePointerMove = (event: PointerEvent) => {
		if (disabled || loading) return;
		onpointermove(event);
	};

	const handlePointerCancel = (event: PointerEvent) => {
		if (disabled || loading) return;
		onpointercancel(event);
	};

	// =========================================================================
	// $derived
	// =========================================================================

	const backgroundColors = {
		ghost: 'transparent',
		filled: color ?? 'var(--svelte-ui-fab-bg-filled)',
		outlined: 'transparent',
		glass: 'var(--svelte-ui-fab-bg-glass)'
	};

	const textColors = {
		ghost: color ?? 'var(--svelte-ui-fab-text-ghost)',
		filled: 'var(--svelte-ui-fab-text-filled)',
		outlined: color ?? 'var(--svelte-ui-fab-text-outlined)',
		glass: color ?? 'var(--svelte-ui-fab-text-glass)'
	};

	const hasLabel = $derived(children !== undefined);
</script>

<button
	{type}
	disabled={disabled || loading}
	{...buttonAttributes}
	{...restProps}
	class="fab"
	class:fab--outlined={variant === 'outlined'}
	class:fab--filled={variant === 'filled'}
	class:fab--glass={variant === 'glass'}
	class:fab--without-label={!hasLabel}
	class:fab--left={position === 'left'}
	class:fab--center={position === 'center'}
	class:fab--right={position === 'right'}
	class:fab--shadow={shadow}
	class:fab--loading={loading}
	class:fab--no-motion={reducedMotion}
	style="color: {textColors[variant]}; background-color: {backgroundColors[variant]}; 
		{customStyle ?? ''};"
	onclick={handleClick}
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
	aria-label={ariaLabel || (hasLabel ? undefined : 'Floating Action Button')}
	aria-describedby={ariaDescribedby}
	aria-busy={loading ? 'true' : undefined}
>
	{#if loading}
		<div class="fab__loading">
			<LoadingSpinner size={24} strokeWidth={2} color="currentColor" />
		</div>
	{:else if icon}
		<div class="fab__icon">
			<Icon
				filled={iconFilled}
				weight={iconWeight}
				grade={iconGrade}
				opticalSize={iconOpticalSize}
				variant={iconVariant}
				size={24}>{icon}</Icon
			>
		</div>
	{/if}

	{#if children}
		<div class="fab__label" class:fab__label--hidden={loading}>
			{@render children()}
		</div>
	{/if}
</button>

<style lang="scss">
	.fab {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: calc(24px + env(safe-area-inset-bottom));
		height: 56px;
		padding: 0 20px;
		background-color: transparent;
		border: none;
		border-radius: var(--svelte-ui-button-border-radius-rounded);
		font-size: inherit;
		font-family: inherit;
		color: var(--svelte-ui-button-label-color);
		line-height: normal;
		text-align: center;
		overflow: hidden;
		z-index: 1000;
		cursor: pointer;
		transition-property: background-color, box-shadow, color, opacity, transform;
		transition-duration: var(--svelte-ui-transition-duration);

		&.fab--left {
			left: 24px;
		}

		&.fab--center {
			left: 50%;
			transform: translateX(-50%);
		}

		&.fab--right {
			right: 24px;
		}

		& > * {
			z-index: 1;
		}

		&:before {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: var(--svelte-ui-fab-hover-overlay);
			opacity: 0;
			transition-property: opacity;
			transition-duration: var(--svelte-ui-transition-duration);
			z-index: 0;
		}

		@media (hover: hover) {
			&:hover:before {
				opacity: 1;
			}
		}

		&:focus-visible {
			outline: 2px solid var(--svelte-ui-fab-focus-color);
			outline-offset: 2px;
		}

		&:disabled {
			opacity: var(--svelte-ui-button-disabled-opacity);
			cursor: not-allowed;
			pointer-events: none;
		}

		&.fab--outlined {
			box-shadow: inset 0 0 0 var(--svelte-ui-border-width) currentColor;
		}

		&.fab--glass {
			backdrop-filter: var(--svelte-ui-glass-blur);
			-webkit-backdrop-filter: var(--svelte-ui-glass-blur);
		}

		&.fab--shadow {
			box-shadow:
				0px 3px 5px -1px rgba(0, 0, 0, 0.2),
				0px 6px 10px 0px rgba(0, 0, 0, 0.14),
				0px 1px 18px 0px rgba(0, 0, 0, 0.12);
		}

		&.fab--outlined.fab--shadow {
			box-shadow:
				inset 0 0 0 var(--svelte-ui-border-width) currentColor,
				0px 3px 5px -1px rgba(0, 0, 0, 0.2),
				0px 6px 10px 0px rgba(0, 0, 0, 0.14),
				0px 1px 18px 0px rgba(0, 0, 0, 0.12);
		}

		@media (hover: hover) {
			&.fab--shadow:hover {
				box-shadow:
					0px 5px 5px -3px rgba(0, 0, 0, 0.2),
					0px 8px 10px 1px rgba(0, 0, 0, 0.14),
					0px 3px 14px 2px rgba(0, 0, 0, 0.12);
			}

			&.fab--outlined.fab--shadow:hover {
				box-shadow:
					inset 0 0 0 var(--svelte-ui-border-width) currentColor,
					0px 5px 5px -3px rgba(0, 0, 0, 0.2),
					0px 8px 10px 1px rgba(0, 0, 0, 0.14),
					0px 3px 14px 2px rgba(0, 0, 0, 0.12);
			}
		}

		&.fab--shadow:active {
			box-shadow:
				0px 7px 8px -4px rgba(0, 0, 0, 0.2),
				0px 12px 17px 2px rgba(0, 0, 0, 0.14),
				0px 5px 22px 4px rgba(0, 0, 0, 0.12);
		}

		&.fab--outlined.fab--shadow:active {
			box-shadow:
				inset 0 0 0 var(--svelte-ui-border-width) currentColor,
				0px 7px 8px -4px rgba(0, 0, 0, 0.2),
				0px 12px 17px 2px rgba(0, 0, 0, 0.14),
				0px 5px 22px 4px rgba(0, 0, 0, 0.12);
		}

		&.fab--loading {
			cursor: wait;
		}

		&.fab--no-motion,
		&.fab--no-motion:before {
			transition-duration: 0.01s;
		}

		.fab__icon {
			margin: 0 8px 0 -8px;
			user-select: none;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.fab__loading {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.fab__label {
			white-space: nowrap;
			user-select: none;
			transition-property: opacity;
			transition-duration: var(--svelte-ui-transition-duration);
		}

		.fab__label--hidden {
			opacity: 0;
		}
	}

	.fab.fab--without-label {
		width: 56px;
		height: 56px;
		padding: 0;
		border-radius: 28px;

		.fab__icon {
			margin: 0;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.fab,
		.fab:before {
			transition-duration: 0.01s;
		}
	}

	/* Print styles */
	@media print {
		.fab {
			display: none;
		}
	}
</style>
