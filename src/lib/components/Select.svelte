<!-- Select.svelte -->

<script lang="ts">
	import Icon from './Icon.svelte';
	import type { HTMLSelectAttributes } from 'svelte/elements';
	import type {
		FocusHandler,
		KeyboardHandler,
		MouseHandler,
		TouchHandler,
		PointerHandler,
		BivariantValueHandler
	} from '$lib/types/callbackHandlers';
	import type { Option } from '$lib/types/options';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type SelectProps = {
		// 基本プロパティ
		name?: string;
		value: string | number | null | undefined;
		options: Option[];

		// HTML属性系
		id?: string | null;
		tabindex?: number | null;
		placeholder?: string;
		selectAttributes?: HTMLSelectAttributes | undefined;

		// スタイル/レイアウト
		size?: number | null;
		inline?: boolean;
		focusStyle?: 'background' | 'outline' | 'none';
		fullWidth?: boolean;
		rounded?: boolean;
		customStyle?: string;

		// 状態/動作
		disabled?: boolean;
		required?: boolean;

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
		onchange?: BivariantValueHandler<string | number | null | undefined>;

		// その他
		[key: string]: any;
	};

	let {
		// 基本プロパティ
		name,
		value = $bindable(),
		options = [],

		// HTML属性系
		id = `select-${Math.random().toString(36).substring(2, 15)}`,
		tabindex = null,
		placeholder = '',
		selectAttributes,

		// スタイル/レイアウト
		size = null,
		inline = false,
		focusStyle = 'outline',
		fullWidth = false,
		rounded = false,
		customStyle = '',

		// 状態/動作
		disabled = false,
		required = false,

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
		onchange = () => {}, // No params for type inference

		// その他
		...restProps
	}: SelectProps = $props();

	let isFocused: boolean = $state(false);
	let selectRef = $state<HTMLSelectElement>();

	// =========================================================================
	// Methods
	// =========================================================================
	const handleFocus = (event: FocusEvent) => {
		if (disabled) return;
		isFocused = true;
		onfocus?.(event);
	};

	const handleBlur = (event: FocusEvent) => {
		if (disabled) return;
		isFocused = false;
		onblur?.(event);
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (disabled) return;
		onkeydown?.(event);
	};

	const handleKeyup = (event: KeyboardEvent) => {
		if (disabled) return;
		onkeyup?.(event);
	};

	// マウスイベント
	const handleClick = (event: MouseEvent) => {
		if (disabled) return;
		onclick?.(event);
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

	// 選択イベント
	const handleChange = () => {
		onchange?.(value);
		// 選択完了後にフォーカスを解除
		if (selectRef) {
			selectRef.blur();
		}
	};
</script>

<div
	class="select
select--focus-{focusStyle}"
	class:select--inline={inline}
	class:select--full-width={fullWidth}
	class:select--disabled={disabled}
	class:select--focused={isFocused}
	class:select--rounded={rounded}
	data-testid="select"
>
	<select
		bind:this={selectRef}
		{id}
		{name}
		bind:value
		{disabled}
		{required}
		{tabindex}
		{size}
		style={customStyle}
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
		onchange={handleChange}
		{...selectAttributes}
		{...restProps}
	>
		<!-- プレースホルダーオプション -->
		{#if placeholder}
			<option value="" disabled selected={value === undefined || value === null}>
				{placeholder}
			</option>
		{/if}
		<!-- 通常のオプション -->
		{#each options as option (option.value)}
			<option value={option.value} disabled={option.disabled}>
				{option.label}
			</option>
		{/each}
	</select>
	<!-- ドロップダウンアイコン -->
	<div class="select__dropdown-icon" aria-hidden="true">
		<Icon>arrow_drop_down</Icon>
	</div>
</div>

<style>
	/* =============================================
 * 基本構造・レイアウト
 * ============================================= */
	.select {
		display: inline-block;
		position: relative;
		width: auto;
		max-width: 100%;
		vertical-align: top;
	}

	/* =============================================
 * 基本コンポーネント
 * ============================================= */
	select {
		width: 100%;
		min-height: var(--svelte-ui-select-height);
		padding: var(--svelte-ui-select-padding);
		padding-right: var(--svelte-ui-select-icon-space);
		background: transparent;
		border: none;
		border-radius: 0;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		&:focus,
		&:focus-visible {
			outline: var(--svelte-ui-focus-outline-inner);
			outline-offset: var(--svelte-ui-focus-outline-offset-inner);
		}
	}

	.select__dropdown-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 50%;
		right: 4px;
		width: 32px;
		height: 32px;
		transform: translateY(-50%);
		font-size: var(--svelte-ui-select-dropdown-icon-size);
		color: var(--svelte-ui-select-dropdown-icon-color);
		pointer-events: none;
	}

	/* =============================================
 * レイアウトバリエーション
 * ============================================= */
	.select--full-width {
		width: 100%;
	}

	/* =============================================
 * プレースホルダー・オプション表示
 * ============================================= */
	option[value=''] {
		color: var(--svelte-ui-select-placeholder-color);
	}

	/* =============================================
 * フォーカス効果バリエーション
 * ============================================= */
	.select--focus-outline select:focus {
		outline: var(--svelte-ui-focus-outline-inner);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner);
	}

	.select--focus-background select:focus {
		background: var(--svelte-ui-hover-overlay);
	}

	/* =============================================
 * 状態管理（disabled, readonly等）
 * ============================================= */
	.select--disabled {
		opacity: var(--svelte-ui-input-disabled-opacity);
		pointer-events: none;

		.select__dropdown-icon {
			opacity: var(--svelte-ui-button-disabled-opacity);
		}
	}

	select:disabled {
		opacity: var(--svelte-ui-button-disabled-opacity);
		cursor: not-allowed;
	}

	/* =============================================
 * デザインバリアント：default
 * ============================================= */
	.select:not(.select--inline) {
		select {
			min-height: var(--svelte-ui-select-height);
			background-color: var(--svelte-ui-select-bg);
			box-shadow: 0 0 0 var(--svelte-ui-border-width) inset var(--svelte-ui-select-border-color);
			border: none;
			border-radius: var(--svelte-ui-select-border-radius);
			font-size: 1rem;
			line-height: var(--svelte-ui-select-height);
		}
	}

	/* =============================================
 * デザインバリアント：inline
 * ============================================= */
	.select.select--inline {
		select {
			padding: inherit;
			padding-right: var(--svelte-ui-input-icon-space-inline);
			background: transparent;
			border: none;
			border-radius: 0;
			color: inherit;
			min-height: auto;
			line-height: inherit;
		}

		.select__dropdown-icon {
			right: 0;
		}
	}

	/* =============================================
 * デザインバリアント：rounded
 * ============================================= */
	.select--rounded:not(.select--inline) select {
		border-radius: var(--svelte-ui-select-border-radius-rounded);
	}
</style>
