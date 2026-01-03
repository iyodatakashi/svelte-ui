<!-- IconButton.svelte -->

<script lang="ts">
	import Icon from './Icon.svelte';
	import { t } from '$lib/i18n';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/icon';

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

		// ARIA/アクセシビリティ
		ariaLabel,
		ariaDescribedby,
		ariaPressed,
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
		type?: 'button' | 'submit' | 'reset' | null | undefined;
		tabindex?: number | null;

		// スタイル/レイアウト
		customStyle?: HTMLButtonAttributes['style'];
		variant?: 'ghost' | 'filled' | 'outlined' | 'glass';
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

		// ARIA/アクセシビリティ
		ariaLabel: string;
		ariaDescribedby?: string;
		ariaPressed?: boolean;
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

	const backgroundColors = $derived({
		filled: color ?? 'var(--svelte-ui-iconbutton-bg-filled)',
		outlined: 'transparent',
		ghost: 'transparent',
		glass: 'var(--svelte-ui-iconbutton-bg-glass)'
	});

	const textColors = $derived({
		filled: 'var(--svelte-ui-iconbutton-text-filled)',
		outlined: color ?? 'var(--svelte-ui-iconbutton-text-outlined)',
		ghost: color ?? 'var(--svelte-ui-iconbutton-text-ghost)',
		glass: color ?? 'var(--svelte-ui-iconbutton-text-glass)'
	});

	const badgeDisplay = $derived(() => {
		if (!hasBadge) return '';
		if (badgeVariant === 'dot') return '';
		if (badgeCount > badgeMax) return `${badgeMax}+`;
		return badgeCount.toString();
	});

	const buttonClasses = $derived(
		[
			'icon-button__button',
			`icon-button__button--${variant}`,
			rounded && 'icon-button__button--rounded',
			pressed && 'icon-button__button--pressed',
			loading && 'icon-button__button--loading',
			reducedMotion && 'icon-button__button--no-motion'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class="icon-button" data-testid="icon-button">
	<button
		{type}
		disabled={isDisabled}
		class={buttonClasses}
		style="color: {textColors[variant]}; background-color: {backgroundColors[variant]}; 
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
		data-testid="icon-button"
		{...buttonAttributes}
		{...restProps}
	>
		{#if loading}
			<div class="icon-button__loading">
				<LoadingSpinner size={size * 0.5} strokeWidth={2} color="currentColor" />
			</div>
		{:else}
			<div class="icon-button__icon" class:icon-button__icon--hidden={loading}>
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
			class="icon-button__badge icon-button__badge--{badgeVariant}"
			style="background-color: {badgeColor || 'var(--svelte-ui-badge-bg)'}"
			aria-label={badgeVariant === 'count' ? `${badgeCount}` : t('iconButton.badgeNew')}
			aria-live="polite"
		>
			{badgeVariant === 'count' ? badgeDisplay() : ''}
		</div>
	{/if}
</div>

<style>
	.icon-button {
		position: relative;
		display: block;
		width: fit-content;
	}

	.icon-button__button {
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

	.icon-button__button--rounded {
		border-radius: var(--svelte-ui-iconbutton-border-radius-rounded);
	}

	.icon-button__button--outlined {
		box-shadow: inset 0 0 0 var(--svelte-ui-border-width) currentColor;
	}

	.icon-button__button--glass {
		backdrop-filter: var(--svelte-ui-glass-blur);
		-webkit-backdrop-filter: var(--svelte-ui-glass-blur);
	}

	.icon-button__button:before {
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
		.icon-button__button:hover:before {
			opacity: 1;
		}
	}

	.icon-button__button:focus-visible {
		outline: var(--svelte-ui-focus-outline-outer);
		outline-offset: var(--svelte-ui-focus-outline-offset-outer);
	}

	.icon-button__button--pressed {
		transform: scale(0.95);
	}

	.icon-button__button--pressed:before {
		opacity: 0.12;
	}

	.icon-button__button:disabled {
		opacity: var(--svelte-ui-button-disabled-opacity);
		cursor: not-allowed;
		pointer-events: none;
	}

	.icon-button__button--loading {
		cursor: wait;
	}

	.icon-button__button > * {
		z-index: 1;
	}

	.icon-button__button__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		transition-property: opacity;
		transition-duration: var(--svelte-ui-transition-duration);
	}

	.icon-button__button__icon--hidden {
		opacity: 0;
	}

	.icon-button__button__loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon-button__badge {
		position: absolute;
		top: -2px;
		right: -2px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--svelte-ui-badge-font-size);
		color: var(--svelte-ui-badge-text-color);
		line-height: 1;
		text-align: center;
		border-radius: var(--svelte-ui-border-radius-rounded);
		z-index: 2;
	}

	.icon-button__badge--dot {
		width: 8px;
		height: 8px;
		min-width: unset;
	}

	.icon-button__badge--count {
		min-width: 16px;
		height: 16px;
		padding: 0 4px;
		border-radius: 8px;
	}

	.icon-button__button--no-motion,
	.icon-button__button--no-motion:before,
	.icon-button__button--no-motion .icon-button__icon {
		transition-duration: 0.01s;
	}

	.icon-button__button--no-motion.icon-button__button--pressed {
		transform: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.icon-button__button,
		.icon-button__button:before,
		.icon-button__icon {
			transition-duration: 0.01s;
		}

		.icon-button__button--pressed {
			transform: none;
		}
	}
</style>
