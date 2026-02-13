<!-- SegmentedControl.svelte -->

<script lang="ts">
	import Icon from './Icon.svelte';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/icon';
	import type { SegmentedControlItem } from '$lib/types/segmentedControlItem';
	import type {
		FocusHandler,
		KeyboardHandler,
		MouseHandler,
		TouchHandler,
		PointerHandler
	} from '$lib/types/callbackHandlers';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type SegmentedControlProps = {
		// 基本プロパティ
		items: SegmentedControlItem[];
		value: string;

		// HTML属性系
		id?: string;
		name?: string;

		// スタイル/レイアウト
		size?: 'small' | 'medium' | 'large';
		fullWidth?: boolean;
		color?: string;
		rounded?: boolean;

		// アイコン関連
		iconFilled?: boolean;
		iconWeight?: IconWeight;
		iconGrade?: IconGrade;
		iconOpticalSize?: IconOpticalSize;
		iconVariant?: IconVariant;

		// 状態/動作
		disabled?: boolean;

		// ARIA/アクセシビリティ
		ariaLabel?: string;
		ariaLabelledby?: string;
		reducedMotion?: boolean;

		// 入力イベント
		onchange?: (value: string) => void;

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
		// 基本プロパティ
		items = [],
		value = $bindable(''),

		// HTML属性系
		id,
		name = `segmented-control-${Math.random().toString(36).substring(2, 15)}`,

		// スタイル/レイアウト
		size = 'medium',
		fullWidth = false,
		color,
		rounded = false,

		// アイコン関連
		iconFilled = false,
		iconWeight = 300,
		iconGrade = 0,
		iconOpticalSize,
		iconVariant = 'outlined',

		// 状態/動作
		disabled = false,

		// ARIA/アクセシビリティ
		ariaLabel,
		ariaLabelledby,
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
	}: SegmentedControlProps = $props();

	// =========================================================================
	// Methods
	// =========================================================================
	const handleChange = (item: SegmentedControlItem, event: Event) => {
		if (disabled || item.disabled) return;

		const target = event.target as HTMLInputElement;
		if (target.checked) {
			value = item.value;
			onchange(item.value);
		}
	};

	const handleFocus = (event: FocusEvent) => {
		onfocus(event);
	};

	const handleBlur = (event: FocusEvent) => {
		onblur(event);
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (disabled || items.length === 0) {
			onkeydown(event);
			return;
		}

		// Radioコンポーネントと同じキーボードナビゲーション
		if (
			event.key === 'ArrowUp' ||
			event.key === 'ArrowDown' ||
			event.key === 'ArrowLeft' ||
			event.key === 'ArrowRight'
		) {
			const radioInputs = document.querySelectorAll(
				`input[type="radio"][name="${name}"]`
			) as NodeListOf<HTMLInputElement>;
			const currentIndex = Array.from(radioInputs).findIndex((input) => input === event.target);

			if (currentIndex !== -1) {
				event.preventDefault();
				let nextIndex;

				if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
					// 前の有効なアイテムを探す
					for (let i = currentIndex - 1; i >= 0; i--) {
						if (!items[i]?.disabled && !radioInputs[i].disabled) {
							nextIndex = i;
							break;
						}
					}
					// 見つからなければ最後の有効なアイテムへ
					if (nextIndex === undefined) {
						for (let i = items.length - 1; i > currentIndex; i--) {
							if (!items[i]?.disabled && !radioInputs[i].disabled) {
								nextIndex = i;
								break;
							}
						}
					}
				} else {
					// 次の有効なアイテムを探す
					for (let i = currentIndex + 1; i < items.length; i++) {
						if (!items[i]?.disabled && !radioInputs[i].disabled) {
							nextIndex = i;
							break;
						}
					}
					// 見つからなければ最初の有効なアイテムへ
					if (nextIndex === undefined) {
						for (let i = 0; i < currentIndex; i++) {
							if (!items[i]?.disabled && !radioInputs[i].disabled) {
								nextIndex = i;
								break;
							}
						}
					}
				}

				if (nextIndex !== undefined) {
					const nextInput = radioInputs[nextIndex];
					if (nextInput && !nextInput.disabled) {
						nextInput.focus();
						nextInput.click();
					}
				}
			}
		} else if (event.key === 'Home') {
			event.preventDefault();
			const radioInputs = document.querySelectorAll(
				`input[type="radio"][name="${name}"]`
			) as NodeListOf<HTMLInputElement>;
			for (let i = 0; i < items.length; i++) {
				if (!items[i]?.disabled && !radioInputs[i].disabled) {
					radioInputs[i].focus();
					radioInputs[i].click();
					break;
				}
			}
		} else if (event.key === 'End') {
			event.preventDefault();
			const radioInputs = document.querySelectorAll(
				`input[type="radio"][name="${name}"]`
			) as NodeListOf<HTMLInputElement>;
			for (let i = items.length - 1; i >= 0; i--) {
				if (!items[i]?.disabled && !radioInputs[i].disabled) {
					radioInputs[i].focus();
					radioInputs[i].click();
					break;
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
		onclick(event);
	};

	const handleMouseDown = (event: MouseEvent) => {
		if (disabled) return;
		onmousedown(event);
	};

	const handleMouseUp = (event: MouseEvent) => {
		if (disabled) return;
		onmouseup(event);
	};

	const handleMouseEnter = (event: MouseEvent) => {
		if (disabled) return;
		onmouseenter(event);
	};

	const handleMouseLeave = (event: MouseEvent) => {
		if (disabled) return;
		onmouseleave(event);
	};

	const handleMouseOver = (event: MouseEvent) => {
		if (disabled) return;
		onmouseover(event);
	};

	const handleMouseOut = (event: MouseEvent) => {
		if (disabled) return;
		onmouseout(event);
	};

	const handleContextMenu = (event: MouseEvent) => {
		if (disabled) return;
		oncontextmenu(event);
	};

	const handleAuxClick = (event: MouseEvent) => {
		if (disabled) return;
		onauxclick(event);
	};

	// タッチイベント
	const handleTouchStart = (event: TouchEvent) => {
		if (disabled) return;
		ontouchstart(event);
	};

	const handleTouchEnd = (event: TouchEvent) => {
		if (disabled) return;
		ontouchend(event);
	};

	const handleTouchMove = (event: TouchEvent) => {
		if (disabled) return;
		ontouchmove(event);
	};

	const handleTouchCancel = (event: TouchEvent) => {
		if (disabled) return;
		ontouchcancel(event);
	};

	// ポインターイベント
	const handlePointerDown = (event: PointerEvent) => {
		if (disabled) return;
		onpointerdown(event);
	};

	const handlePointerUp = (event: PointerEvent) => {
		if (disabled) return;
		onpointerup(event);
	};

	const handlePointerEnter = (event: PointerEvent) => {
		if (disabled) return;
		onpointerenter(event);
	};

	const handlePointerLeave = (event: PointerEvent) => {
		if (disabled) return;
		onpointerleave(event);
	};

	const handlePointerMove = (event: PointerEvent) => {
		if (disabled) return;
		onpointermove(event);
	};

	const handlePointerCancel = (event: PointerEvent) => {
		if (disabled) return;
		onpointercancel(event);
	};

	// =========================================================================
	// $derived
	// =========================================================================
	const effectiveIconSize = $derived(
		iconOpticalSize || (size === 'small' ? 16 : size === 'large' ? 24 : 20)
	);

	const containerClasses = $derived(
		[
			'segmented-control',
			`segmented-control--${size}`,
			fullWidth && 'segmented-control--full-width',
			rounded && 'segmented-control--rounded',
			disabled && 'segmented-control--disabled',
			reducedMotion && 'segmented-control--no-motion'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div
	class={containerClasses}
	role="radiogroup"
	aria-label={ariaLabelledby ? undefined : ariaLabel}
	aria-labelledby={ariaLabelledby}
	style="--svelte-ui-segmented-control-selected-bg: {color || 'var(--svelte-ui-primary-color)'};"
	{id}
	data-testid="segmented-control"
	{...restProps}
>
	{#each items as item, index}
		{@const isSelected = value === item.value}
		{@const isDisabled = disabled || item.disabled}
		{@const inputId = `${name}-${index}`}
		<div class="segmented-control__item">
			<input
				type="radio"
				id={inputId}
				{name}
				value={item.value}
				checked={isSelected}
				disabled={isDisabled}
				class="segmented-control__input"
				onchange={(e) => handleChange(item, e)}
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
				data-testid="segmented-control-input"
				data-value={item.value}
			/>
			<label
				for={inputId}
				class="segmented-control__label"
				class:segmented-control__label--selected={isSelected}
				class:segmented-control__label--first={index === 0}
				class:segmented-control__label--last={index === items.length - 1}
				aria-label={item.ariaLabel || item.label || undefined}
			>
				{#if item.icon}
					<span class="segmented-control__icon">
						<Icon
							filled={iconFilled || isSelected}
							weight={iconWeight}
							grade={iconGrade}
							opticalSize={effectiveIconSize}
							variant={iconVariant}
						>
							{item.icon}
						</Icon>
					</span>
				{/if}
				{#if item.label}
					<span class="segmented-control__label-text">{item.label}</span>
				{/if}
			</label>
		</div>
	{/each}
</div>

<style lang="scss">
	.segmented-control {
		display: inline-flex;
		position: relative;
		padding: var(--svelte-ui-segmented-control-base-padding);
		background-color: var(--svelte-ui-segmented-control-base-bg);
		border-radius: var(--svelte-ui-segmented-control-base-border-radius);
		gap: var(--svelte-ui-segmented-control-gap);
		box-sizing: border-box;
		width: fit-content;
		max-width: 100%;
		overflow-x: auto;
		overflow-y: visible;
		-ms-overflow-style: none;
		overscroll-behavior: contain;
	}

	.segmented-control::-webkit-scrollbar {
		display: none;
	}

	.segmented-control--full-width {
		width: 100%;
	}

	.segmented-control--full-width .segmented-control__item {
		flex: 1;
	}

	.segmented-control--rounded {
		border-radius: var(--svelte-ui-border-radius-rounded, 9999px);
	}

	.segmented-control--disabled {
		opacity: var(--svelte-ui-button-disabled-opacity);
		pointer-events: none;
	}

	.segmented-control__item {
		position: relative;
		flex: 0 1 auto;
		display: flex;
		align-items: stretch;
	}

	.segmented-control__input {
		position: absolute;
		width: 0;
		height: 0;
		margin: 0;
		opacity: 0;
		pointer-events: none;
	}

	.segmented-control__label {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		position: relative;
		border: none;
		background-color: transparent;
		color: var(--svelte-ui-text-subtle-color, var(--svelte-ui-text-color));
		white-space: nowrap;
		cursor: pointer;
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		transition-property: background-color, color;
		transition-duration: var(--svelte-ui-transition-duration, 0.2s);
		transition-timing-function: ease;
		outline: none;
		font-family: inherit;
		font-weight: 500;
		line-height: 1;
		box-sizing: border-box;
		width: 100%;
		text-align: center;
		border-radius: var(--svelte-ui-segmented-control-button-radius);
	}

	.segmented-control--small .segmented-control__label {
		height: var(--svelte-ui-segmented-control-button-height-sm);
		font-size: var(--svelte-ui-segmented-control-font-size-sm);
		padding: var(--svelte-ui-segmented-control-button-padding-sm);
	}

	.segmented-control--small .segmented-control__label:not(:has(.segmented-control__label-text)) {
		width: var(--svelte-ui-segmented-control-button-height-sm);
	}

	.segmented-control--medium .segmented-control__label {
		height: var(--svelte-ui-segmented-control-button-height);
		font-size: var(--svelte-ui-segmented-control-font-size);
		padding: var(--svelte-ui-segmented-control-button-padding);
	}

	.segmented-control--medium .segmented-control__label:not(:has(.segmented-control__label-text)) {
		width: var(--svelte-ui-segmented-control-button-height);
	}

	.segmented-control--large .segmented-control__label {
		height: var(--svelte-ui-segmented-control-button-height-lg);
		font-size: var(--svelte-ui-segmented-control-font-size-lg);
		padding: var(--svelte-ui-segmented-control-button-padding-lg);
	}

	.segmented-control--large .segmented-control__label:not(:has(.segmented-control__label-text)) {
		width: var(--svelte-ui-segmented-control-button-height-lg);
	}

	.segmented-control--rounded .segmented-control__label {
		border-radius: calc(var(--svelte-ui-border-radius-rounded, 9999px) - 2px);
	}

	@media (hover: hover) {
		.segmented-control__input:not(:disabled)
			+ .segmented-control__label:hover:not(.segmented-control__label--selected) {
			background-color: var(--svelte-ui-segmented-control-hover-overlay);
			color: var(--svelte-ui-text-color);
		}
	}

	.segmented-control__input:focus-visible + .segmented-control__label {
		outline: var(--svelte-ui-focus-outline-inner, 2px solid currentColor);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner, 2px);
	}

	.segmented-control__input:checked + .segmented-control__label,
	.segmented-control__label--selected {
		background-color: var(--svelte-ui-segmented-control-selected-bg);
		color: var(--svelte-ui-segmented-control-selected-text-color, white);
	}

	.segmented-control:not(.segmented-control--disabled)
		.segmented-control__input:disabled
		+ .segmented-control__label {
		opacity: var(--svelte-ui-button-disabled-opacity);
		cursor: not-allowed;
	}

	.segmented-control__icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.segmented-control__label-text {
		text-box-trim: trim-both;
		text-box-edge: cap alphabetic;
	}

	/* Reduced motion */
	.segmented-control--no-motion,
	.segmented-control--no-motion .segmented-control__label {
		transition-duration: 0.01s;
	}

	@media (prefers-reduced-motion: reduce) {
		.segmented-control,
		.segmented-control__label {
			transition-duration: 0.01s;
		}
	}
</style>
