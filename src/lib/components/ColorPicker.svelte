<!-- ColorPicker.svelte -->

<script lang="ts">
	import { untrack } from 'svelte';
	import Input from './Input.svelte';
	import { t } from '$lib/i18n';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { IconVariant } from '$lib/types/icon';
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
	export type ColorPickerProps = {
		// 基本プロパティ
		value: string;

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
		onchange?: BivariantValueHandler<string>;
		oninput?: BivariantValueHandler<string>;

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
		clearButtonAriaLabel = t('input.clear'),
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
	}: ColorPickerProps = $props();

	let localValue: string | undefined = $state(value);
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
			handleValueChange();
		});
	});

	$effect(() => {
		localValue;
		untrack(() => {
			/* localValue がクリアされた時に value もクリア */
			if (localValue === '' || localValue === undefined) {
				value = '';
				prevValue = '';
			}
		});
	});

	// =========================================================================
	// Methods
	// =========================================================================

	const handleChange = (value: string): void => {
		if (value && !value.startsWith('#')) {
			localValue = '#' + value;
		} else {
			localValue = value;
		}

		if (value !== prevValue || localValue !== prevValue) {
			value = localValue;
			prevValue = value;
			onchange(value);
		}
	};

	const handleValueChange = (): void => {
		handleChange(localValue);
	};

	const handleInput = (inputValue: string | number): void => {
		if (disabled) return;
		oninput?.(String(inputValue));
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

	const handleClick = (event: MouseEvent) => {
		if (disabled) return;
		onclick?.(event);
	};
	const handleKeydown = (event: KeyboardEvent) => {
		// Enterキーで色の変更を確定
		if (event.key === 'Enter' && !disabled && !readonly) {
			event.preventDefault();
			handleValueChange();
		}
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
	class:color-picker--readonly={readonly}
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
		{...restProps}
	/>

	<div class="color-picker__trigger">
		<input
			type="color"
			bind:value
			onchange={handleValueChange}
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

	/* =============================================
 * レイアウトバリエーション
 * ============================================= */
	.color-picker--full-width {
		width: 100%;
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
	.color-picker--readonly {
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
