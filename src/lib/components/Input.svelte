<!-- Input.svelte -->

<script lang="ts">
	import IconButton from './IconButton.svelte';
	import Icon from './Icon.svelte';
	import { getStyleFromNumber } from '$lib/utils/style';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/icon';
	import { t } from '$lib/i18n';
	import { convertToHtml, convertToHtmlWithLink } from '$lib/utils/formatText';
	import type {
		FocusHandler,
		KeyboardHandler,
		MouseHandler,
		TouchHandler,
		PointerHandler,
		BivariantValueHandler
	} from '$lib/types/callbackHandlers';
	import type { FocusStyle } from '$lib/types/propOptions';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type InputProps = {
		// 基本プロパティ
		name?: string;
		value: string | number | null | undefined;

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
		autocomplete?: HTMLInputElement['autocomplete'] | null;
		spellcheck?: boolean | null;
		inputAttributes?: HTMLInputAttributes | undefined;

		// スタイル/レイアウト
		inline?: boolean;
		focusStyle?: FocusStyle;
		placeholder?: string;
		fullWidth?: boolean;
		width?: string | number | null;
		minWidth?: string | number | null;
		maxWidth?: string | number | null;
		rounded?: boolean;
		customStyle?: string;
		unit?: string;

		// アイコン関連
		rightIcon?: string;
		leftIcon?: string;
		leftIconAriaLabel?: string;
		rightIconAriaLabel?: string;
		enablePasswordVisibilityToggle?: boolean;
		enableNumberStepperButtons?: boolean;
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
		linkify?: boolean;

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
		onchange?: BivariantValueHandler<string | number>;
		oninput?: BivariantValueHandler<string | number>;

		// アイコンイベント
		onRightIconClick?: MouseHandler;
		onLeftIconClick?: MouseHandler;
		onRightIconMouseDown?: MouseHandler;
		onLeftIconMouseDown?: MouseHandler;
		onRightIconMouseUp?: MouseHandler;
		onLeftIconMouseUp?: MouseHandler;
		onRightIconMouseLeave?: MouseHandler;
		onLeftIconMouseLeave?: MouseHandler;
		onRightIconTouchStart?: TouchHandler;
		onLeftIconTouchStart?: TouchHandler;
		onRightIconTouchEnd?: TouchHandler;
		onLeftIconTouchEnd?: TouchHandler;
		onRightIconTouchCancel?: TouchHandler;
		onLeftIconTouchCancel?: TouchHandler;

		// その他
		[key: string]: any;
	};

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
		spellcheck = null,
		inputAttributes,

		// スタイル/レイアウト
		inline = false,
		focusStyle = 'outline',
		fullWidth = false,
		width = null,
		minWidth = inline ? null : 120,
		maxWidth = null,
		rounded = false,
		customStyle = '',
		unit = '',

		// アイコン関連
		rightIcon = undefined,
		leftIcon = undefined,
		leftIconAriaLabel = t('input.left_icon'),
		rightIconAriaLabel = t('input.right_icon'),
		enablePasswordVisibilityToggle = false,
		enableNumberStepperButtons = false,
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
		clearButtonAriaLabel = t('input.clear'),
		linkify = false,

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
		oninput = () => {}, // No params for type inference

		// アイコンイベント
		onRightIconClick,
		onLeftIconClick,
		onRightIconMouseDown,
		onLeftIconMouseDown,
		onRightIconMouseUp,
		onLeftIconMouseUp,
		onRightIconMouseLeave,
		onLeftIconMouseLeave,
		onRightIconTouchStart,
		onLeftIconTouchStart,
		onRightIconTouchEnd,
		onLeftIconTouchEnd,
		onRightIconTouchCancel,
		onLeftIconTouchCancel,

		// その他
		...restProps
	}: InputProps = $props();

	let ref: HTMLInputElement | undefined = $state();
	let isFocused: boolean = $state(false);
	let isComposing: boolean = $state(false);
	let isPasswordVisible: boolean = $state(false);
	let numberStepperTimeoutId: ReturnType<typeof setTimeout> | null = $state(null);
	let numberStepperIntervalId: ReturnType<typeof setInterval> | null = $state(null);

	// =========================================================================
	// Methods
	// =========================================================================
	// ユーティリティ
	const clear = (): void => {
		if (disabled || readonly) return;
		ref?.focus();
		value = '';
		onchange?.('');
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

	// フォーカスイベント
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

	// キーボードイベント
	const handleKeydown = (event: KeyboardEvent) => {
		// Enterキーで入力確定（blur）する（IME変換中は除く）
		if (event.key === 'Enter' && !disabled && !readonly && !isComposing) {
			ref?.blur();
		}
		onkeydown?.(event);
	};

	const handleKeyup = (event: KeyboardEvent) => {
		onkeyup?.(event);
	};

	// 入力イベント
	const handleChange = () => {
		if (disabled || readonly) return;
		onchange?.(value);
	};

	const handleInput = () => {
		if (disabled || readonly) return;
		oninput?.(value);
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

	// IMEイベント
	const handleCompositionStart = () => {
		isComposing = true;
	};

	const handleCompositionEnd = () => {
		isComposing = false;
	};

	// --------------------------------
	// password 表示/非表示切り替え
	// --------------------------------
	const togglePasswordVisibility = () => {
		if (disabled || readonly) return;
		isPasswordVisible = !isPasswordVisible;
		ref?.focus();
	};

	// --------------------------------
	// number stepper (increment/decrement)
	// --------------------------------
	const handleIncrement = () => startNumberStepper(1);
	const handleDecrement = () => startNumberStepper(-1);
	const handleNumberStepperStop = () => stopNumberStepper();

	const clearNumberStepperTimers = () => {
		if (numberStepperTimeoutId !== null) {
			clearTimeout(numberStepperTimeoutId);
			numberStepperTimeoutId = null;
		}
		if (numberStepperIntervalId !== null) {
			clearInterval(numberStepperIntervalId);
			numberStepperIntervalId = null;
		}
	};

	const startNumberStepper = (delta: number) => {
		if (disabled || readonly || type !== 'number') return;
		adjustNumber(delta);
		clearNumberStepperTimers();
		numberStepperTimeoutId = setTimeout(() => {
			numberStepperIntervalId = setInterval(() => adjustNumber(delta), 100);
		}, 400);
	};

	const stopNumberStepper = () => {
		if (disabled || readonly || type !== 'number') return;
		clearNumberStepperTimers();
	};

	const adjustNumber = (delta: number) => {
		const currentValue = typeof value === 'number' ? value : Number(value) || 0;
		const stepValue = step ?? 1;
		let newValue = currentValue + delta * stepValue;
		if (max !== null && newValue > max) newValue = max;
		if (min !== null && newValue < min) newValue = min;
		value = newValue;
		onchange?.(newValue);
	};

	// =========================================================================
	// $derived
	// =========================================================================
	// --------------------------------
	// display & link value
	// --------------------------------
	const hasDisplayValue = $derived(
		value !== null && value !== undefined && !(typeof value === 'string' && value === '')
	);
	const displayValue = $derived.by(() => {
		if (!hasDisplayValue) return inline ? '&nbsp;' : '';
		if (type === 'number' && typeof value === 'number') return value.toLocaleString();
		return convertToHtml(value);
	});

	const linkHtmlValue = $derived.by(() => {
		if (!isLinkifyActive) return '';
		const result = convertToHtmlWithLink(value);
		return typeof result === 'string' ? result : String(result ?? '');
	});

	// --------------------------------
	// type & linkify
	// --------------------------------
	const isLinkifyActive = $derived(linkify && (type === 'text' || type === 'url'));
	const resolvedType = $derived.by(() => {
		if (type === 'password' && enablePasswordVisibilityToggle) {
			return isPasswordVisible ? 'text' : 'password';
		}
		return type;
	});

	// --------------------------------
	// left icon resolution & state
	// --------------------------------
	const isLeftNumberStepper = $derived(
		type === 'number' &&
			enableNumberStepperButtons &&
			!leftIcon &&
			!onLeftIconClick &&
			!disabled &&
			!readonly
	);
	const resolvedLeftIcon = $derived(isLeftNumberStepper ? 'remove' : leftIcon);

	// resolve icon event
	const resolvedLeftIconClick = $derived(isLeftNumberStepper ? undefined : onLeftIconClick);
	const resolvedLeftIconMouseDown = $derived(
		isLeftNumberStepper ? handleDecrement : onLeftIconMouseDown
	);
	const resolvedLeftIconMouseUp = $derived(
		isLeftNumberStepper ? handleNumberStepperStop : onLeftIconMouseUp
	);
	const resolvedLeftIconMouseLeave = $derived(
		isLeftNumberStepper ? handleNumberStepperStop : onLeftIconMouseLeave
	);
	const resolvedLeftIconTouchStart = $derived(
		isLeftNumberStepper ? handleDecrement : onLeftIconTouchStart
	);
	const resolvedLeftIconTouchEnd = $derived(
		isLeftNumberStepper ? handleNumberStepperStop : onLeftIconTouchEnd
	);
	const resolvedLeftIconTouchCancel = $derived(
		isLeftNumberStepper ? handleNumberStepperStop : onLeftIconTouchCancel
	);
	const resolvedLeftIconAriaLabel = $derived(
		isLeftNumberStepper ? t('input.decrement') : leftIconAriaLabel
	);

	// has icon
	const hasLeftIcon = $derived(!!resolvedLeftIcon);
	const hasLeftIconClickable = $derived(
		!!resolvedLeftIcon &&
			(!!resolvedLeftIconClick ||
				!!resolvedLeftIconMouseDown ||
				!!resolvedLeftIconMouseUp ||
				!!resolvedLeftIconMouseLeave ||
				!!resolvedLeftIconTouchStart ||
				!!resolvedLeftIconTouchEnd ||
				!!resolvedLeftIconTouchCancel)
	);

	// --------------------------------
	// right icon resolution & state
	// --------------------------------
	const isPasswordToggleActive = $derived(
		type === 'password' &&
			enablePasswordVisibilityToggle &&
			!rightIcon &&
			!onRightIconClick &&
			!disabled &&
			!readonly
	);
	const passwordToggleIcon = $derived(isPasswordVisible ? 'visibility_off' : 'visibility');
	const passwordToggleAriaLabel = $derived(
		isPasswordVisible ? t('input.hide_password') : t('input.show_password')
	);
	const isRightNumberStepper = $derived(
		!isPasswordToggleActive &&
			type === 'number' &&
			enableNumberStepperButtons &&
			!rightIcon &&
			!onRightIconClick &&
			!disabled &&
			!readonly
	);
	const resolvedRightIcon = $derived(
		isPasswordToggleActive ? passwordToggleIcon : isRightNumberStepper ? 'add' : rightIcon
	);

	// resolve icon event
	const resolvedRightIconClick = $derived(
		isPasswordToggleActive
			? togglePasswordVisibility
			: isRightNumberStepper
				? undefined
				: onRightIconClick
	);
	const resolvedRightIconMouseDown = $derived(
		isRightNumberStepper ? handleIncrement : onRightIconMouseDown
	);
	const resolvedRightIconMouseUp = $derived(
		isRightNumberStepper ? handleNumberStepperStop : onRightIconMouseUp
	);
	const resolvedRightIconMouseLeave = $derived(
		isRightNumberStepper ? handleNumberStepperStop : onRightIconMouseLeave
	);
	const resolvedRightIconTouchStart = $derived(
		isRightNumberStepper ? handleIncrement : onRightIconTouchStart
	);
	const resolvedRightIconTouchEnd = $derived(
		isRightNumberStepper ? handleNumberStepperStop : onRightIconTouchEnd
	);
	const resolvedRightIconTouchCancel = $derived(
		isRightNumberStepper ? handleNumberStepperStop : onRightIconTouchCancel
	);
	const resolvedRightIconAriaLabel = $derived(
		isPasswordToggleActive
			? passwordToggleAriaLabel
			: isRightNumberStepper
				? t('input.increment')
				: rightIconAriaLabel
	);

	// has icon
	const hasRightIcon = $derived(!!resolvedRightIcon);
	const hasRightIconClickable = $derived(
		!!resolvedRightIcon &&
			(!!resolvedRightIconClick ||
				!!resolvedRightIconMouseDown ||
				!!resolvedRightIconMouseUp ||
				!!resolvedRightIconMouseLeave ||
				!!resolvedRightIconTouchStart ||
				!!resolvedRightIconTouchEnd ||
				!!resolvedRightIconTouchCancel)
	);

	// --------------------------------
	// style from number
	// --------------------------------
	const widthStyle = $derived(getStyleFromNumber(width));
	const maxWidthStyle = $derived(getStyleFromNumber(maxWidth));
	const minWidthStyle = $derived(getStyleFromNumber(minWidth));
</script>

<div
	class="input
	input--focus-{focusStyle}
	input--type-{resolvedType}"
	class:input--inline={inline}
	class:input--linkify={isLinkifyActive}
	class:input--auto-resize={inline}
	class:input--full-width={fullWidth}
	class:input--clearable={clearable}
	class:input--has-right-icon={hasRightIcon}
	class:input--has-left-icon={hasLeftIcon}
	class:input--has-left-icon-clickable={hasLeftIconClickable}
	class:input--has-right-icon-clickable={hasRightIconClickable}
	class:input--rounded={rounded}
	class:input--disabled={disabled}
	class:input--readonly={readonly}
	class:input--focused={isFocused}
	data-testid="input"
	style="width: {widthStyle}; max-width: {maxWidthStyle}; min-width: {minWidthStyle}"
>
	<!-- 表示用テキスト -->
	<div class="input__display-text" style={customStyle}>
		<div class="input__display-text-content">
			{@html displayValue}
			{#if type === 'number' && unit !== '' && hasDisplayValue}
				<span class="input__unit-text">
					{unit}
				</span>
			{/if}
		</div>
	</div>
	<!-- 入力用要素 -->
	<div class="input__wrapper">
		<input
			{id}
			{name}
			bind:value
			bind:this={ref}
			type={resolvedType}
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
			{spellcheck}
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
			oncompositionstart={handleCompositionStart}
			oncompositionend={handleCompositionEnd}
			{...inputAttributes}
			{...restProps}
		/>
	</div>
	{#if isLinkifyActive}
		<div class="input__link-text" style={customStyle}>
			<div class="input__link-text-content">
				{@html linkHtmlValue}
			</div>
		</div>
	{/if}
	<!-- クリアボタン -->
	{#if clearable && !disabled && !readonly}
		<div class="input__clear-button">
			<IconButton
				ariaLabel={t('input.clear')}
				color="var(--svelte-ui-text-color)"
				onclick={(event) => {
					event.stopPropagation();
					clear();
				}}
				tabindex={-1}
				iconFilled={true}
				fontSize={18}>cancel</IconButton
			>
		</div>
	{/if}

	<!-- Left Icon -->
	{#if hasLeftIcon}
		<div class="input__icon-left">
			{#if resolvedLeftIconClick || resolvedLeftIconMouseDown || resolvedLeftIconMouseUp || resolvedLeftIconMouseLeave || resolvedLeftIconTouchStart || resolvedLeftIconTouchEnd || resolvedLeftIconTouchCancel}
				<IconButton
					ariaLabel={resolvedLeftIconAriaLabel}
					color="var(--svelte-ui-input-icon-color)"
					onclick={resolvedLeftIconClick}
					onmousedown={resolvedLeftIconMouseDown}
					onmouseup={resolvedLeftIconMouseUp}
					onmouseleave={resolvedLeftIconMouseLeave}
					ontouchstart={resolvedLeftIconTouchStart}
					ontouchend={resolvedLeftIconTouchEnd}
					ontouchcancel={resolvedLeftIconTouchCancel}
					tabindex={-1}
					{iconFilled}
					{iconWeight}
				>
					{resolvedLeftIcon}
				</IconButton>
			{:else}
				<div class="input__normal-icon">
					<Icon
						filled={iconFilled}
						weight={iconWeight}
						grade={iconGrade}
						opticalSize={iconOpticalSize}
						variant={iconVariant}
					>
						{resolvedLeftIcon}
					</Icon>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Right Icon -->
	{#if hasRightIcon}
		<div class="input__icon-right">
			{#if resolvedRightIconClick || resolvedRightIconMouseDown || resolvedRightIconMouseUp || resolvedRightIconMouseLeave || resolvedRightIconTouchStart || resolvedRightIconTouchEnd || resolvedRightIconTouchCancel}
				<IconButton
					ariaLabel={resolvedRightIconAriaLabel}
					color="var(--svelte-ui-input-icon-color)"
					onclick={resolvedRightIconClick}
					onmousedown={resolvedRightIconMouseDown}
					onmouseup={resolvedRightIconMouseUp}
					onmouseleave={resolvedRightIconMouseLeave}
					ontouchstart={resolvedRightIconTouchStart}
					ontouchend={resolvedRightIconTouchEnd}
					ontouchcancel={resolvedRightIconTouchCancel}
					tabindex={-1}
					{iconFilled}
					{iconWeight}
				>
					{resolvedRightIcon}
				</IconButton>
			{:else}
				<div class="input__normal-icon">
					<Icon
						filled={iconFilled}
						weight={iconWeight}
						grade={iconGrade}
						opticalSize={iconOpticalSize}
						variant={iconVariant}
					>
						{resolvedRightIcon}
					</Icon>
				</div>
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
		vertical-align: top;
		width: auto;
		max-width: 100%;
		height: inherit;
	}

	.input__wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: inherit;
		border: none;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
		opacity: 1;
	}

	/* =============================================
 * 基本コンポーネント
 * ============================================= */
	input {
		width: 100%;
		min-width: 1em;
		min-height: var(--svelte-ui-input-height);
		padding: var(--svelte-ui-input-padding);
		background-color: var(--svelte-ui-input-bg);
		box-shadow: 0 0 0 var(--svelte-ui-border-width) inset var(--svelte-ui-input-border-color);
		border: none;
		border-radius: var(--svelte-ui-input-border-radius);
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;

		&[type='number'] {
			text-align: right;
			&::-webkit-outer-spin-button,
			&::-webkit-inner-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
		}
	}

	.input__display-text,
	.input__link-text {
		display: flex;
		align-items: center;
		width: 100%;
		min-width: 1em;
		height: var(--svelte-ui-input-height);
		padding: var(--svelte-ui-input-padding);
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		opacity: 1;
		transition: none;
	}

	.input__link-text {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		pointer-events: none;
		z-index: 1;
	}

	.input__link-text :global(a) {
		pointer-events: auto;
	}

	.input__unit-text {
		font-size: var(--svelte-ui-input-unit-font-size);
	}

	/* =============================================
 * 表示制御
 * ============================================= */
	/* 非フォーカス時: inputを不可視化d */
	.input:not(.input--focused) input {
		color: transparent;
		caret-color: transparent;
		text-shadow: none;
	}

	/* フォーカス時: display-textを非表示 */
	.input--focused .input__display-text {
		opacity: 0;
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
	.input--focus-outline input:focus {
		outline: var(--svelte-ui-focus-outline-inner);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner);
	}

	.input--focus-background input:focus {
		background: var(--svelte-ui-hover-overlay);
		outline: none;
	}

	.input--focus-none input:focus {
		outline: none;
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
		/* Keep cursor behavior but do not add a special background.
		 * In this library, filled backgrounds are used to indicate editable fields,
		 * so readonly inputs intentionally have no extra background color. */
		cursor: default;
	}

	/* =============================================
 * 機能バリエーション
 * ============================================= */
	/* clearable */
	.input__clear-button {
		position: absolute;
		top: 50%;
		right: 4px;
		width: 32px;
		height: 32px;
		transform: translate(0, -50%);
		opacity: 0;
		transition: var(--svelte-ui-transition-duration);
	}

	.input--clearable {
		input,
		.input__display-text,
		.input__link-text {
			padding-right: var(--svelte-ui-input-icon-space);
		}
	}

	.input--clearable.input--has-right-icon {
		input,
		.input__display-text,
		.input__link-text {
			padding-right: var(--svelte-ui-input-icon-space-double);
		}
	}

	.input--has-right-icon .input__clear-button {
		right: var(--svelte-ui-input-icon-space);
	}

	@media (hover: hover) {
		:hover .input__clear-button {
			opacity: 1;
		}
	}

	@media (hover: none) {
		.input__clear-button {
			opacity: 1;
		}
	}

	/* アイコン */
	.input--has-left-icon {
		input,
		.input__display-text,
		.input__link-text {
			padding-left: var(--svelte-ui-input-icon-space);
		}
	}

	.input--has-right-icon {
		input,
		.input__display-text,
		.input__link-text {
			padding-right: var(--svelte-ui-input-icon-space);
		}
	}

	.input__icon-left {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 50%;
		left: 4px;
		width: 32px;
		height: 32px;
		transform: translateY(-50%);
		font-size: var(--svelte-ui-select-dropdown-icon-size);
		color: var(--svelte-ui-input-icon-color);
		pointer-events: none;
		z-index: 1;
	}

	.input__icon-right {
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
		color: var(--svelte-ui-input-icon-color);
		pointer-events: none;
		z-index: 2;
	}

	/* アイコンにクリックハンドラーがある場合はクリック可能にする */
	.input--has-left-icon-clickable .input__icon-left,
	.input--has-right-icon-clickable .input__icon-right {
		pointer-events: auto;
		cursor: pointer;
	}

	/* auto-resize */
	.input--auto-resize {
		width: fit-content;
	}

	/* linkify */
	/* linkifyモード: display-textは常に非表示 */
	.input--linkify .input__display-text {
		opacity: 0;
	}

	/* linkifyモード: フォーカス時はlink-textを非表示 */
	.input--linkify.input--focused .input__link-text {
		display: none;
	}

	/* =============================================
 * タイプ別スタイル
 * ============================================= */
	/* type-number */
	.input--type-number {
		.input__display-text {
			justify-content: flex-end;
		}
	}

	/* type-password: セキュリティのため常にinputを表示（display-textは非表示） */
	.input--type-password {
		/* inputを常に表示（表示制御の非フォーカス時の不可視化を上書き） */
		&:not(.input--focused) input {
			color: inherit;
			caret-color: inherit;
			text-shadow: inherit;
		}

		/* display-textは常に非表示 */
		.input__display-text {
			opacity: 0;
		}
	}

	/* =============================================
 * デザインバリエーション
 * ============================================= */
	/* rounded */
	.input--rounded {
		input {
			border-radius: var(--svelte-ui-input-border-radius-rounded);
		}
	}

	/* inline */
	.input--inline {
		input {
			min-height: inherit;
			background-color: transparent;
			box-shadow: none;
			border: inherit;
			border-radius: 0;
		}

		input,
		.input__display-text,
		.input__link-text {
			height: inherit;
			padding: inherit;
		}

		&.input--has-left-icon {
			input,
			.input__display-text,
			.input__link-text {
				padding-left: var(--svelte-ui-input-icon-space-inline);
			}
		}

		&.input--has-right-icon {
			input,
			.input__display-text,
			.input__link-text {
				padding-right: var(--svelte-ui-input-icon-space-inline);
			}
		}

		&.input--clearable {
			input,
			.input__display-text,
			.input__link-text {
				padding-right: var(--svelte-ui-input-icon-space-inline);
			}
		}

		&.input--clearable.input--has-right-icon {
			input,
			.input__display-text,
			.input__link-text {
				padding-right: var(--svelte-ui-input-icon-space-double-inline);
			}
		}
	}

	/* full-width */
	.input--full-width {
		width: 100%;
	}
</style>
