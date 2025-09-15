<!-- ColorPicker.svelte -->

<script lang="ts">
	import { untrack } from 'svelte';
	import Input from './Input.svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { IconVariant } from '$lib/types/icon';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let {
		// 基本プロパティ
		value = $bindable(''),

		// HTML属性系
		id = `colorpicker-${Math.random().toString(36).substring(2, 15)}`,
		inputAttributes,

		// スタイル/レイアウト
		customStyle = '',
		focusStyle = 'outline',
		fullWidth = false,
		rounded = false,

		// 状態/動作
		disabled = false,
		readonly = false,
		clearable = false,
		clearButtonAriaLabel = 'クリア',
		iconVariant = 'outlined',

		// 入力イベント
		onchange = () => {}, // No params for type inference
		oninput = () => {}, // No params for type inference

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
		value?: string;

		// HTML属性系
		id?: string;
		inputAttributes?: HTMLInputAttributes | undefined;

		// スタイル/レイアウト
		customStyle?: string;
		focusStyle?: 'background' | 'outline' | 'none';
		fullWidth?: boolean;
		rounded?: boolean;

		// 状態/動作
		disabled?: boolean;
		readonly?: boolean;
		clearable?: boolean;
		clearButtonAriaLabel?: string;
		iconVariant?: IconVariant;

		// 入力イベント
		onchange?: (value: any) => void;
		oninput?: (value: any) => void;

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

	let localValue: string = $state(value);
	let prevValue: string = $state('');
	let isFocused: boolean = $state(false);

	// =========================================================================

	// $effect
	// =========================================================================

	$effect(() => {
		value;
		untrack(() => {
			/* value を localValue に反映 */
			localValue = value;

			/* value が更新されたらonchangeを実行 */
			handleChange();
		});
	});

	// =========================================================================
	// Methods
	// =========================================================================

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		handleChange();
	};

	const handleChange = (event?: Event): void => {
		// 空文字列の場合はそのまま処理
		if (localValue && !localValue.startsWith('#')) {
			localValue = '#' + localValue;
		}

		if (value !== prevValue || localValue !== prevValue) {
			value = localValue;
			prevValue = value;
			onchange(value);
		}
	};

	const handleInput = (event?: Event): void => {
		if (disabled) return;
		oninput?.(localValue);
	};

	const handleFocus = (event: FocusEvent): void => {
		if (disabled) return;
		isFocused = true;
		onfocus(event);
	};

	const handleBlur = (event: FocusEvent): void => {
		if (disabled) return;
		isFocused = false;
		onblur(event);
	};

	const clear = (): void => {
		if (disabled) return;
		value = '';
		onchange(value);
	};

	const handleClick = (event: MouseEvent) => {
		if (disabled) return;
		onclick?.(event);
	};
	const handleKeydown = (event: KeyboardEvent) => {
		if (disabled) return;
		onkeydown(event);
	};

	const handleKeyup = (event: KeyboardEvent) => {
		if (disabled) return;
		onkeyup(event);
	};

	// マウスイベント
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
</script>

<div
	class="color-picker
	focus-style-{focusStyle}"
	class:color-picker--full-width={fullWidth}
	class:color-picker--rounded={rounded}
	class:color-picker--clearable={clearable}
	class:color-picker--disabled={disabled}
	class:color-picker--focused={isFocused}
	data-testid="color-picker"
	style={customStyle}
>
	<Input
		id={id ? `${id}-input` : undefined}
		bind:value={localValue}
		type="text"
		placeholder=""
		{disabled}
		{readonly}
		{clearable}
		{clearButtonAriaLabel}
		{focusStyle}
		{fullWidth}
		{rounded}
		customStyle={`padding-left: var(--svelte-ui-colorpicker-text-padding-left); ${customStyle}`}
		{inputAttributes}
		onchange={handleChange}
		oninput={handleInput}
		onfocus={handleFocus}
		onblur={handleBlur}
		onclick={handleClick}
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
		onsubmit={handleSubmit}
		{...restProps}
	/>

	<div class="color-picker__trigger">
		<input
			type="color"
			bind:value
			onchange={handleChange}
			onfocus={handleFocus}
			onblur={handleBlur}
			onclick={handleClick}
			onkeydown={handleKeydown}
			{disabled}
			class="color-picker__color-input"
			{...inputAttributes}
			{...restProps}
		/>
		<div class="color-picker__color-display" style="background-color: {value};"></div>
	</div>
</div>

<style>
	/* =============================================
 * 基本構造・レイアウト
 * ============================================= */
	.color-picker {
		display: inline-flex;
		justify-content: stretch;
		align-items: center;
		position: relative;
		width: auto;
		max-width: 100%;
	}

	/* =============================================
 * 基本コンポーネント
 * ============================================= */

	.color-picker__trigger {
		position: absolute;
		left: var(--svelte-ui-colorpicker-trigger-offset);
		display: inline-block;
		width: var(--svelte-ui-colorpicker-trigger-size);
		height: var(--svelte-ui-colorpicker-trigger-size);
		padding: 0;

		&::before {
			content: '';
			display: block;
			position: absolute;
			width: 100%;
			height: 100%;
			border: var(--svelte-ui-colorpicker-trigger-border-style)
				var(--svelte-ui-colorpicker-trigger-border-width)
				var(--svelte-ui-colorpicker-trigger-border-color);
			border-radius: var(--svelte-ui-colorpicker-trigger-border-radius);
		}
	}

	.color-picker__color-input {
		opacity: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		padding: 0;
		z-index: 2;
		pointer-events: auto;
		cursor: pointer;
	}

	.color-picker__color-display {
		display: block;
		width: 100%;
		height: 100%;
		cursor: pointer;
		position: relative;
		border-radius: var(--svelte-ui-colorpicker-trigger-border-radius);
		z-index: 1;
	}

	.color-picker__clear-button {
		position: absolute;
		top: 50%;
		right: 8px;
		height: fit-content;
		transform: translate(0, -50%);
		opacity: 0;
		transition: var(--svelte-ui-clear-button-transition);
	}

	/* =============================================
 * レイアウトバリエーション
 * ============================================= */
	.color-picker--full-width {
		width: 100%;
	}

	/* =============================================
 * 機能バリエーション：clearable
 * ============================================= */

	@media (hover: hover) {
		.color-picker:hover .color-picker__clear-button {
			opacity: 1;
			pointer-events: all;
		}
	}

	/* =============================================
 * 状態管理（disabled, focused等）
 * ============================================= */
	.color-picker--disabled {
		opacity: var(--svelte-ui-input-disabled-opacity);
		pointer-events: none;

		.color-picker__color-input {
			cursor: not-allowed;
			pointer-events: none;
		}
	}

	/* =============================================
 * 状態管理（readonly等）
 * ============================================= */
	.color-picker:has(.color-picker__input[readonly]) {
		.color-picker__color-input,
		.color-picker__trigger {
			pointer-events: none;
		}
	}

	/* =============================================
 * デザインバリアント：default
 * ============================================= */
	.color-picker {
		.color-picker__trigger::before {
			border-color: var(--svelte-ui-colorpicker-trigger-border-color);
		}
	}

	/* =============================================
 * デザインバリアント：rounded
 * ============================================= */
	.color-picker--rounded {
		.color-picker__color-display {
			border-radius: var(--svelte-ui-border-radius-rounded);
		}

		.color-picker__trigger::before {
			border-radius: var(--svelte-ui-border-radius-rounded);
		}
	}
</style>
