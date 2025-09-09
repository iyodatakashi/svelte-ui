<!-- IconButton.svelte -->

<script lang="ts">
	import Icon from './Icon.svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/Icon';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let {
		// 基本プロパティ
		children,

		// HTML属性系
		buttonAttributes,
		type = 'button',
		tabindex = null,

		// スタイル/レイアウト
		customStyle,
		variant = 'ghost',
		size = 32,
		fontSize = size * 0.75,
		color,
		rounded = true,

		// アイコン関連
		icon = '',
		iconFilled = false,
		iconWeight = 300,
		iconGrade = 0,
		iconOpticalSize = fontSize,
		iconVariant = 'outlined',

		// バッジ関連
		hasBadge = false,
		badgeCount = 0,
		badgeVariant = 'count',
		badgeColor,
		badgeMax = 99,

		// 状態/動作
		disabled = false,
		loading = false,
		pressed = false,
		reducedMotion = false,

		// ARIA/アクセシビリティ
		ariaLabel,
		ariaDescribedby,
		ariaPressed,

		// フォーカスイベント
		onfocus = (event: FocusEvent) => {},
		onblur = (event: FocusEvent) => {},

		// キーボードイベント
		onkeydown = (event: KeyboardEvent) => {},
		onkeyup = (event: KeyboardEvent) => {},

		// マウスイベント
		onclick,
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

		// その他
		...restProps
	}: {
		// Snippet
		children: Snippet;

		// HTML属性系
		buttonAttributes?: HTMLButtonAttributes | undefined;
		type?: 'button' | 'submit' | 'reset' | null | undefined;
		tabindex?: number | null;

		// スタイル/レイアウト
		customStyle?: HTMLButtonAttributes['style'];
		variant?: 'filled' | 'outlined' | 'ghost' | 'glass';
		size?: number;
		fontSize?: number;
		color?: string;
		rounded?: boolean;

		// アイコン関連
		icon?: string;
		iconFilled?: boolean;
		iconWeight?: IconWeight;
		iconGrade?: IconGrade;
		iconOpticalSize?: IconOpticalSize;
		iconVariant?: IconVariant;

		// バッジ関連
		hasBadge?: boolean;
		badgeCount?: number;
		badgeVariant?: 'dot' | 'count';
		badgeColor?: string;
		badgeMax?: number;

		// 状態/動作
		disabled?: boolean;
		loading?: boolean;
		pressed?: boolean;
		reducedMotion?: boolean;

		// ARIA/アクセシビリティ
		ariaLabel: string;
		ariaDescribedby?: string;
		ariaPressed?: boolean;

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
	// Methods
	// =========================================================================
	const handleClick = (event: MouseEvent) => {
		if (isDisabled) return;
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

	const handleAuxClick = (event: MouseEvent) => {
		if (isDisabled) return;
		onauxclick(event);
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

	const backgroundColor = $derived(
		{
			filled: color || 'var(--svelte-ui-iconbutton-bg-filled)',
			outlined: 'var(--svelte-ui-iconbutton-bg-outlined)',
			ghost: 'var(--svelte-ui-iconbutton-bg-ghost)',
			glass: 'var(--svelte-ui-iconbutton-bg-glass)'
		}[variant]
	);

	const textColor = $derived(
		{
			filled: 'var(--svelte-ui-iconbutton-text-filled)',
			outlined: color || 'var(--svelte-ui-iconbutton-text-outlined)',
			ghost: color || 'var(--svelte-ui-iconbutton-text-ghost)',
			glass: 'var(--svelte-ui-iconbutton-text-glass)'
		}[variant]
	);

	const badgeDisplay = $derived(() => {
		if (!hasBadge) return '';
		if (badgeVariant === 'dot') return '';
		if (badgeCount > badgeMax) return `${badgeMax}+`;
		return badgeCount.toString();
	});

	const buttonClasses = $derived(
		[
			'iconbutton',
			`iconbutton--${variant}`,
			rounded && 'iconbutton--rounded',
			pressed && 'iconbutton--pressed',
			loading && 'iconbutton--loading',
			reducedMotion && 'iconbutton--no-motion'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class="iconbutton-container" data-testid="iconbutton-container">
	<button
		{type}
		disabled={isDisabled}
		class={buttonClasses}
		style="color: {textColor}; background-color: {backgroundColor}; 
			width: {size}px; height: {size}px; 
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
		{tabindex}
		aria-label={ariaLabel}
		aria-describedby={ariaDescribedby}
		aria-pressed={ariaPressed !== undefined ? ariaPressed : pressed ? 'true' : undefined}
		aria-busy={loading ? 'true' : undefined}
		data-testid="iconbutton"
		{...buttonAttributes}
		{...restProps}
	>
		{#if loading}
			<div class="iconbutton__loading">
				<LoadingSpinner size={size * 0.5} strokeWidth={2} color="currentColor" />
			</div>
		{:else}
			<div class="iconbutton__icon" class:iconbutton__icon--hidden={loading}>
				<Icon
					filled={true}
					size={fontSize}
					weight={iconWeight}
					grade={iconGrade}
					opticalSize={iconOpticalSize}
					variant={iconVariant}
				>
					{@render children()}
				</Icon>
			</div>
		{/if}
	</button>

	{#if hasBadge && (badgeVariant === 'dot' || badgeCount > 0)}
		<div
			class="iconbutton__badge iconbutton__badge--{badgeVariant}"
			style="background-color: {badgeColor || 'var(--badge-color)'}"
			aria-label={badgeVariant === 'count' ? `${badgeCount}件の通知` : '新しい通知があります'}
			aria-live="polite"
		>
			{badgeVariant === 'count' ? badgeDisplay() : ''}
		</div>
	{/if}
</div>

<style>
	.iconbutton-container {
		position: relative;
		display: block;
	}

	.iconbutton {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		padding: 0;
		background-color: transparent;
		border: none;
		border-radius: var(--svelte-ui-iconbutton-border-radius);
		line-height: 1;
		overflow: hidden;
		color: inherit;
		cursor: pointer;
		transition-property: background-color, box-shadow, color, opacity, transform;
		transition-duration: var(--svelte-ui-transition-duration);
	}

	.iconbutton--rounded {
		border-radius: var(--svelte-ui-iconbutton-border-radius-rounded);
	}

	.iconbutton--outlined {
		box-shadow: inset 0 0 0 var(--svelte-ui-border-width) currentColor;
	}

	.iconbutton--glass {
		backdrop-filter: var(--svelte-ui-glass-blur);
		-webkit-backdrop-filter: var(--svelte-ui-glass-blur);
	}

	.iconbutton:before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--svelte-ui-iconbutton-hover-overlay);
		opacity: 0;
		transition-property: opacity;
		transition-duration: var(--svelte-ui-transition-duration);
		z-index: 0;
	}

	@media (hover: hover) {
		.iconbutton:hover:before {
			opacity: 1;
		}
	}

	.iconbutton:focus-visible {
		outline: var(--svelte-ui-focus-outline);
		outline-offset: var(--svelte-ui-focus-outline-offset);
	}

	.iconbutton--pressed {
		transform: scale(0.95);
	}

	.iconbutton--pressed:before {
		opacity: 0.12;
	}

	.iconbutton:disabled {
		opacity: var(--svelte-ui-button-disabled-opacity);
		cursor: not-allowed;
		pointer-events: none;
	}

	.iconbutton--loading {
		cursor: wait;
	}

	.iconbutton > * {
		z-index: 1;
	}

	.iconbutton__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		transition-property: opacity;
		transition-duration: var(--svelte-ui-transition-duration);
	}

	.iconbutton__icon--hidden {
		opacity: 0;
	}

	.iconbutton__loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.iconbutton__badge {
		position: absolute;
		top: -2px;
		right: -2px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--badge-font-size);
		font-weight: 600;
		color: var(--badge-text-color);
		line-height: 1;
		text-align: center;
		border-radius: var(--svelte-ui-border-radius-rounded);
		z-index: 2;
	}

	.iconbutton__badge--dot {
		width: 8px;
		height: 8px;
		min-width: unset;
	}

	.iconbutton__badge--count {
		min-width: 16px;
		height: 16px;
		padding: 0 4px;
		border-radius: 8px;
	}

	.iconbutton--no-motion,
	.iconbutton--no-motion:before,
	.iconbutton--no-motion .iconbutton__icon {
		transition-duration: 0.01s;
	}

	.iconbutton--no-motion.iconbutton--pressed {
		transform: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.iconbutton,
		.iconbutton:before,
		.iconbutton__icon {
			transition-duration: 0.01s;
		}

		.iconbutton--pressed {
			transform: none;
		}
	}
</style>
