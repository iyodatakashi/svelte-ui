<!-- ColorPicker.svelte -->

<script lang="ts">
	import { untrack } from 'svelte';
	import IconButton from './IconButton.svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { IconVariant } from '$lib/types/Icon';

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
		focusStyle = 'border',
		fullWidth = false,
		rounded = false,

		// 状態/動作
		disabled = false,
		readonly = false,
		clearable = false,
		iconVariant = 'outlined',

		// 入力イベント
		onchange = () => {},
		oninput = () => {},

		// フォーカスイベント
		onfocus = (event: FocusEvent) => {},
		onblur = (event: FocusEvent) => {},

		// キーボードイベント
		onkeydown = (event: KeyboardEvent) => {},
		onkeyup = (event: KeyboardEvent) => {},

		// マウスイベント
		onclick = (event: MouseEvent) => {},
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
		// 基本プロパティ
		value?: string;

		// HTML属性系
		id?: string;
		inputAttributes?: HTMLInputAttributes | undefined;

		// スタイル/レイアウト
		customStyle?: string;
		focusStyle?: 'background' | 'border' | 'none';
		fullWidth?: boolean;
		rounded?: boolean;

		// 状態/動作
		disabled?: boolean;
		readonly?: boolean;
		clearable?: boolean;
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
		if (!localValue.startsWith('#')) {
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
	class:full-width={fullWidth}
	class:rounded
	class:clearable
	class:disabled
	class:is-focused={isFocused}
	style={customStyle}
>
	<form class:full-width={fullWidth} onsubmit={handleSubmit}>
		<input
			bind:value={localValue}
			type="text"
			class="text-input"
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
			{disabled}
			{readonly}
			{...inputAttributes}
			{...restProps}
		/>
		<!-- クリアボタン -->
		{#if clearable && !disabled && !readonly}
			<div class="clear-button-block">
				<IconButton
					ariaLabel="クリア"
					color="var(--svelte-ui-colorpicker-text-color)"
					onclick={clear}
					tabindex={-1}
					iconFilled={true}
					{iconVariant}
					size={24}>cancel</IconButton
				>
			</div>
		{/if}
	</form>

	<div class="color-picker-trigger">
		<input
			type="color"
			bind:value
			onchange={handleChange}
			onfocus={handleFocus}
			onblur={handleBlur}
			onclick={handleClick}
			onkeydown={handleKeydown}
			{disabled}
			class="color-input"
			{...inputAttributes}
			{...restProps}
		/>
		<div class="color-display" style="background-color: {value};"></div>
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

	form {
		padding: inherit;
		border: none;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
		position: relative;
	}

	/* =============================================
 * 基本コンポーネント
 * ============================================= */
	.text-input {
		width: 100%;
		min-width: 1em;
		padding: 0 12px 0 var(--svelte-ui-colorpicker-text-padding-left);
		background: transparent;
		border: none;
		background-color: var(--svelte-ui-colorpicker-bg);
		box-shadow: 0 0 0 var(--svelte-ui-border-width) inset var(--svelte-ui-colorpicker-border-color);
		border-radius: var(--svelte-ui-input-border-radius);
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
		min-height: var(--svelte-ui-input-height);

		&:focus,
		&:focus-visible {
			outline: none;
		}
	}

	.color-picker-trigger {
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

	.color-input {
		opacity: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		padding: 0;
		z-index: 2;
		pointer-events: auto;
		cursor: pointer;
	}

	.color-display {
		display: block;
		width: 100%;
		height: 100%;
		cursor: pointer;
		position: relative;
		border-radius: var(--svelte-ui-colorpicker-trigger-border-radius);
		z-index: 1;
	}

	.clear-button-block {
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
	.color-picker.full-width {
		width: 100%;

		form {
			width: 100%;
		}
	}

	/* =============================================
 * 機能バリエーション：clearable
 * ============================================= */
	.clearable {
		.text-input {
			padding-right: var(--svelte-ui-clear-button-right-spacing);
		}
	}

	@media (hover: hover) {
		.color-picker:hover .clear-button-block {
			opacity: 1;
			pointer-events: all;
		}
	}

	/* =============================================
 * プレースホルダー・テキスト表示
 * ============================================= */
	input::placeholder {
		color: var(--svelte-ui-colorpicker-placeholder-color);
	}

	/* =============================================
 * フォーカス効果バリエーション
 * ============================================= */
	.focus-style-border .text-input:focus-visible {
		outline: var(--svelte-ui-focus-outline-inner);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner);
	}

	.focus-style-background .text-input:focus-visible {
		background: var(--svelte-ui-hover-overlay);
	}

	/* =============================================
 * 状態管理（disabled, focused等）
 * ============================================= */
	.disabled {
		opacity: var(--svelte-ui-input-disabled-opacity);
		pointer-events: none;

		.color-input {
			cursor: not-allowed;
			pointer-events: none;
		}
	}

	.text-input:disabled {
		opacity: var(--svelte-ui-button-disabled-opacity);
		cursor: not-allowed;
	}

	/* =============================================
 * 状態管理（readonly等）
 * ============================================= */
	.color-picker:has(.text-input[readonly]) {
		.color-input,
		.color-picker-trigger {
			pointer-events: none;
		}

		.text-input[readonly] {
			background-color: var(--svelte-ui-input-readonly-bg);
		}
	}

	/* =============================================
 * デザインバリアント：default
 * ============================================= */
	.color-picker {
		.text-input {
			background-color: var(--svelte-ui-colorpicker-bg);
			box-shadow: 0 0 0 var(--svelte-ui-border-width) inset
				var(--svelte-ui-colorpicker-border-color);
			color: var(--svelte-ui-colorpicker-text-color);
		}

		.color-picker-trigger::before {
			border-color: var(--svelte-ui-colorpicker-trigger-border-color);
		}
	}

	/* =============================================
 * デザインバリアント：rounded
 * ============================================= */
	.color-picker.rounded {
		.text-input {
			border-radius: var(--svelte-ui-input-border-radius-rounded);
		}

		.color-display {
			border-radius: var(--svelte-ui-border-radius-rounded);
		}

		.color-picker-trigger::before {
			border-radius: var(--svelte-ui-border-radius-rounded);
		}

		&.clearable .text-input {
			padding-right: var(--svelte-ui-clear-button-right-spacing);
		}
	}
</style>
