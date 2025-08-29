<!-- Input.svelte -->

<script lang="ts">
	import IconButton from './IconButton.svelte';
	import Icon from './Icon.svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/Icon';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let {
		// 基本プロパティ
		name,
		value = $bindable(),
		placeholder = '',

		// HTML属性系
		id = null,
		type = 'text',
		tabindex = null,
		maxlength = null,
		pattern = null,
		min = null,
		max = null,
		step = null,
		size = null,
		autocomplete = null,
		inputAttributes,

		// スタイル/レイアウト
		inline = false,
		focusStyle = 'background',
		customStyle = '',
		fullWidth = false,
		minWidth = inline ? null : 120,
		maxWidth = null,
		rounded = false,

		// アイコン関連
		hasRightIcon = false,
		rightIcon = undefined,
		leftIcon = undefined,
		iconFilled = false,
		iconWeight = 300,
		iconGrade = 0,
		iconOpticalSize = 24,
		iconVariant = 'outlined',

		// 状態/動作
		disabled = false,
		readonly = false,
		required = false,
		clearable = false,

		// フォーカスイベント
		onfocus = () => {},
		onblur = () => {},

		// キーボードイベント
		onkeydown = () => {},
		onkeyup = () => {},

		// マウスイベント
		onclick = () => {},
		onmousedown = () => {},
		onmouseup = () => {},
		onmouseenter = () => {},
		onmouseleave = () => {},
		onmouseover = () => {},
		onmouseout = () => {},
		oncontextmenu = () => {},
		onauxclick = () => {},

		// タッチイベント
		ontouchstart = () => {},
		ontouchend = () => {},
		ontouchmove = () => {},
		ontouchcancel = () => {},

		// ポインターイベント
		onpointerdown = () => {},
		onpointerup = () => {},
		onpointerenter = () => {},
		onpointerleave = () => {},
		onpointermove = () => {},
		onpointercancel = () => {},

		// 入力イベント
		onchange = () => {},
		oninput = () => {},

		// アイコンイベント
		onRightIconClick = () => {},
		onLeftIconClick = () => {},

		// その他
		...restProps
	}: {
		// 基本プロパティ
		name?: string;
		value: string | number | undefined;

		// HTML属性系
		id?: string | null;
		type?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'number';
		tabindex?: number | null;
		maxlength?: number | null;
		pattern?: string | null;
		min?: number | null;
		max?: number | null;
		step?: number | null;
		size?: number | null;
		autocomplete?: HTMLInputElement['autocomplete'] | null | undefined;
		inputAttributes?: HTMLInputAttributes | undefined;

		// スタイル/レイアウト
		inline?: boolean;
		focusStyle?: 'background' | 'border' | 'none';
		placeholder?: string;
		fullWidth?: boolean;
		minWidth?: number | null;
		maxWidth?: number | null;
		rounded?: boolean;
		customStyle?: string;

		// アイコン関連
		hasRightIcon?: boolean;
		rightIcon?: string;
		leftIcon?: string;
		iconFilled?: boolean;
		iconWeight?: IconWeight;
		iconGrade?: IconGrade;
		iconOpticalSize?: IconOpticalSize;
		iconVariant?: IconVariant;

		// 状態/動作
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		clearable?: boolean;

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

		// 入力イベント
		onchange?: (value: any) => void;
		oninput?: (value: any) => void;

		// アイコンイベント
		onRightIconClick?: (event: MouseEvent) => void;
		onLeftIconClick?: (event: MouseEvent) => void;

		// その他
		[key: string]: any;
	} = $props();

	let ref: HTMLInputElement | undefined = $state();
	let isFocused: boolean = $state(false);

	// =========================================================================
	// Methods
	// =========================================================================
	const clear = (): void => {
		if (disabled || readonly) return;
		value = undefined;
		ref?.focus();
		onchange?.(value);
	};

	export const focus = () => {
		if (ref) {
			ref.focus();
			if (type !== 'number') {
				ref.setSelectionRange?.(0, 0);
			}
			ref.scrollTop = 0;
		}
	};

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		ref?.blur();
		onchange?.(value);
	};

	const handleChange = () => onchange?.(value);
	const handleInput = () => oninput?.(value);
	const handleFocus = (event: FocusEvent) => {
		isFocused = true;
		onfocus?.(event);
	};
	const handleBlur = (event: FocusEvent) => {
		isFocused = false;
		onblur?.(event);
	};
	const handleKeydown = (event: KeyboardEvent) => onkeydown?.(event);
	const handleKeyup = (event: KeyboardEvent) => onkeyup?.(event);

	// マウスイベント
	const handleClick = (event: MouseEvent) => onclick?.(event);
	const handleMouseDown = (event: MouseEvent) => onmousedown?.(event);
	const handleMouseUp = (event: MouseEvent) => onmouseup?.(event);
	const handleMouseEnter = (event: MouseEvent) => onmouseenter?.(event);
	const handleMouseLeave = (event: MouseEvent) => onmouseleave?.(event);
	const handleMouseOver = (event: MouseEvent) => onmouseover?.(event);
	const handleMouseOut = (event: MouseEvent) => onmouseout?.(event);
	const handleContextMenu = (event: MouseEvent) => oncontextmenu?.(event);
	const handleAuxClick = (event: MouseEvent) => onauxclick?.(event);

	// タッチイベント
	const handleTouchStart = (event: TouchEvent) => ontouchstart?.(event);
	const handleTouchEnd = (event: TouchEvent) => ontouchend?.(event);
	const handleTouchMove = (event: TouchEvent) => ontouchmove?.(event);
	const handleTouchCancel = (event: TouchEvent) => ontouchcancel?.(event);

	// ポインターイベント
	const handlePointerDown = (event: PointerEvent) => onpointerdown?.(event);
	const handlePointerUp = (event: PointerEvent) => onpointerup?.(event);
	const handlePointerEnter = (event: PointerEvent) => onpointerenter?.(event);
	const handlePointerLeave = (event: PointerEvent) => onpointerleave?.(event);
	const handlePointerMove = (event: PointerEvent) => onpointermove?.(event);
	const handlePointerCancel = (event: PointerEvent) => onpointercancel?.(event);

	// =========================================================================
	// $derived
	// =========================================================================
	const getDisplayValue = (): string => {
		if (value === undefined) return '';
		if (type === 'number' && typeof value === 'number') {
			return value.toLocaleString();
		}
		return String(value);
	};
</script>

<div
	class="input
	input--focus-{focusStyle}
	input--type-{type}"
	class:input--inline={inline}
	class:input--auto-resize={inline}
	class:input--full-width={fullWidth}
	class:input--clearable={clearable}
	class:input--has-icon-right={hasRightIcon || rightIcon}
	class:input--has-icon-left={leftIcon}
	class:input--rounded={rounded}
	class:input--disabled={disabled}
	class:input--readonly={readonly}
	class:input--focused={isFocused}
	style="max-width: {maxWidth}px; min-width: {minWidth}px"
>
	<!-- inline時の表示用要素（text-overflow: ellipsisが効く） -->
	{#if inline}
		<div class="input__display-text" data-placeholder={placeholder} style={customStyle}>
			{getDisplayValue()}
		</div>
	{/if}
	<!-- 入力用フォーム -->
	<form onsubmit={handleSubmit}>
		<input
			{id}
			{name}
			bind:value
			bind:this={ref}
			{type}
			style={customStyle}
			{placeholder}
			{autocomplete}
			{min}
			{max}
			{step}
			{maxlength}
			{pattern}
			{disabled}
			{readonly}
			{required}
			{tabindex}
			{size}
			onchange={handleChange}
			oninput={handleInput}
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
			{...inputAttributes}
			{...restProps}
		/>
	</form>
	<!-- クリアボタン -->
	{#if clearable && !disabled && !readonly}
		<div class="input__clear-button">
			<IconButton
				ariaLabel="クリア"
				color="var(--svelte-ui-input-text-color)"
				onclick={clear}
				tabindex={-1}
				iconFilled={true}
				size={24}>cancel</IconButton
			>
		</div>
	{/if}

	<!-- Left Icon -->
	{#if leftIcon}
		<div class="input__icon-left">
			{#if onLeftIconClick}
				<IconButton
					ariaLabel="左アイコン"
					color="var(--svelte-ui-input-icon-color)"
					variant="text"
					onclick={onLeftIconClick}
					tabindex={-1}
					{iconFilled}
					{iconWeight}
					size={32}
				>
					{leftIcon}
				</IconButton>
			{:else}
				<Icon
					filled={iconFilled}
					weight={iconWeight}
					grade={iconGrade}
					opticalSize={iconOpticalSize}
					variant={iconVariant}
				>
					{leftIcon}
				</Icon>
			{/if}
		</div>
	{/if}

	<!-- Right Icon -->
	{#if rightIcon}
		<div class="input__icon-right">
			{#if onRightIconClick}
				<IconButton
					ariaLabel="右アイコン"
					color="var(--svelte-ui-input-icon-color)"
					variant="text"
					onclick={onRightIconClick}
					tabindex={-1}
					{iconFilled}
					{iconWeight}
					size={32}
				>
					{rightIcon}
				</IconButton>
			{:else}
				<Icon
					filled={iconFilled}
					weight={iconWeight}
					grade={iconGrade}
					opticalSize={iconOpticalSize}
					variant={iconVariant}
				>
					{rightIcon}
				</Icon>
			{/if}
		</div>
	{/if}
</div>

<style>
	/* =============================================
 * 基本構造・レイアウト
 * ============================================= */
	.input {
		display: inline-block;
		position: relative;
		width: auto;
		max-width: 100%;
		height: inherit;
	}

	form {
		padding: inherit;
		border: none;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
		opacity: 0;
	}

	/* =============================================
 * 基本コンポーネント
 * ============================================= */
	input {
		width: 100%;
		min-width: 1em;
		padding: inherit;
		background: transparent;
		border: none;
		border-radius: 0;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;

		&:focus,
		&:focus-visible {
			outline: none;
		}

		&[type='number'] {
			text-align: right;
			&::-webkit-outer-spin-button,
			&::-webkit-inner-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
		}
	}

	.input__display-text {
		display: inline-block;
		vertical-align: top;
		width: 100%;
		min-width: 1em;
		padding: inherit;
		background: inherit;
		border: inherit;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
		white-space: nowrap;
		vertical-align: top;
		overflow: hidden;
		text-overflow: ellipsis;
		opacity: 1;
		transition: none;
		cursor: text !important;

		&::before {
			content: '';
		}

		&:empty::before {
			content: attr(data-placeholder);
		}
	}

	.input__clear-button {
		position: absolute;
		top: 50%;
		right: 0;
		transform: translate(0, -50%);
		opacity: 0;
		transition: var(--svelte-ui-clear-button-transition);
	}

	@media (hover: hover) {
		:hover .input__clear-button {
			opacity: 1;
		}
	}

	.input__icon-left {
		display: flex;
		justify-content: center;
		position: absolute;
		top: 50%;
		left: 0;
		width: 40px;
		transform: translateY(-50%);
		font-size: var(--svelte-ui-select-dropdown-icon-size);
		color: var(--svelte-ui-input-icon-color);
		pointer-events: auto;
		z-index: 1;
	}

	.input__icon-right {
		display: flex;
		justify-content: center;
		position: absolute;
		top: 50%;
		right: 0;
		width: 40px;
		transform: translateY(-50%);
		font-size: var(--svelte-ui-select-dropdown-icon-size);
		color: var(--svelte-ui-input-icon-color);
		pointer-events: auto;
		z-index: 1;
	}

	/* =============================================
 * レイアウトバリエーション
 * ============================================= */
	.input--auto-resize {
		width: fit-content;
	}

	.input--full-width {
		width: 100%;
	}

	/* =============================================
 * 機能バリエーション
 * ============================================= */
	.input--clearable {
		input,
		.input__display-text {
			padding-right: 24px;
		}
	}

	.input--has-icon-right {
		input,
		.input__display-text {
			padding-right: var(--svelte-ui-input-icon-space);
		}
	}

	.input--has-icon-left {
		input,
		.input__display-text {
			padding-left: var(--svelte-ui-input-icon-space);
		}
	}

	/* =============================================
 * プレースホルダー・テキスト表示
 * ============================================= */
	input::placeholder,
	.input__display-text:empty::before {
		color: var(--svelte-ui-input-placeholder-color);
	}

	/* =============================================
 * フォーカス効果バリエーション
 * ============================================= */
	.input--focus-border input:focus {
		outline: var(--svelte-ui-focus-outline-inner);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner);
	}

	.input--focus-background input:focus {
		background: var(--svelte-ui-hover-overlay);
	}

	/* =============================================
 * 状態管理（disabled, readonly等）
 * ============================================= */
	.input--disabled {
		opacity: var(--svelte-ui-input-disabled-opacity);
		pointer-events: none;

		.input__icon-left,
		.input__icon-right {
			opacity: var(--svelte-ui-button-disabled-opacity);
		}
	}

	.input--readonly {
		input {
			cursor: default;
		}
	}

	input:disabled {
		opacity: var(--svelte-ui-button-disabled-opacity);
		cursor: not-allowed;
	}

	input[readonly] {
		background-color: var(--svelte-ui-input-readonly-bg);
		cursor: default;
	}

	/* =============================================
 * デザインバリアント：default
 * ============================================= */
	.input:not(.input--inline) {
		form {
			position: static;
			opacity: 1;
		}

		input {
			min-height: var(--svelte-ui-input-height);
			padding: var(--svelte-ui-input-padding);
			background-color: var(--svelte-ui-input-bg);
			box-shadow: 0 0 0 var(--svelte-ui-border-width) inset var(--svelte-ui-input-border-color);
			border: none;
			border-radius: var(--svelte-ui-input-border-radius);
			color: var(--svelte-ui-input-text-color);
		}

		.input__clear-button {
			right: 8px;
		}

		&.input--clearable {
			input {
				padding-right: var(--svelte-ui-clear-button-right-spacing);
			}
		}

		&.input--has-icon-right {
			input {
				padding-right: var(--svelte-ui-input-icon-space);
			}
		}

		&.input--has-icon-left {
			input {
				padding-left: var(--svelte-ui-input-icon-space);
			}
		}
	}

	/* =============================================
 * デザインバリアント：rounded
 * ============================================= */
	.input--rounded:not(.input--inline) {
		input {
			border-radius: var(--svelte-ui-input-border-radius-rounded);
		}
	}

	/* =============================================
 * デザインバリアント：inline
 * ============================================= */
	.input--inline {
		&.input--type-number .input__display-text {
			text-align: right;
		}

		form {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}

		&.input--has-icon-right {
			input,
			.input__display-text {
				padding-right: var(--svelte-ui-input-icon-space-inline);
			}
		}

		&.input--has-icon-left {
			input,
			.input__display-text {
				padding-left: var(--svelte-ui-input-icon-space-inline);
			}
		}

		&.input--focused {
			.input__display-text {
				opacity: 0;
			}

			form {
				opacity: 1;
			}
		}
	}
</style>
