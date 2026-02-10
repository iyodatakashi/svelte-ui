<!-- Input.svelte -->

<script lang="ts">
	import IconButton from './IconButton.svelte';
	import Icon from './Icon.svelte';
	import { getStyleFromNumber } from '$lib/utils/style';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/icon';
	import { t } from '$lib/i18n';
	import { convertToHtmlWithLink } from '$lib/utils/formatText';
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
		customStyle = '',
		fullWidth = false,
		width = null,
		minWidth = inline ? null : 120,
		maxWidth = null,
		rounded = false,

		// アイコン関連
		rightIcon = undefined,
		leftIcon = undefined,
		leftIconAriaLabel = '左アイコン',
		rightIconAriaLabel = '右アイコン',
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

		// その他
		...restProps
	}: {
		// 基本プロパティ
		name?: string;
		value: string | number;

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
		focusStyle?: 'background' | 'outline' | 'none';
		placeholder?: string;
		fullWidth?: boolean;
		width?: string | number | null;
		minWidth?: string | number | null;
		maxWidth?: string | number | null;
		rounded?: boolean;
		customStyle?: string;

		// アイコン関連
		rightIcon?: string;
		leftIcon?: string;
		leftIconAriaLabel?: string;
		rightIconAriaLabel?: string;
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

		// その他
		[key: string]: any;
	} = $props();

	let ref: HTMLInputElement | undefined = $state();
	let isFocused: boolean = $state(false);
	let isComposing: boolean = $state(false);

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

	// =========================================================================
	// $derived
	// =========================================================================
	const getDisplayValue = (): string => {
		if (type === 'number' && typeof value === 'number') {
			return value.toLocaleString();
		}
		return String(value);
	};

	const linkHtmlValue = $derived.by(() => {
		if (!linkify) return '';
		const result = convertToHtmlWithLink(getDisplayValue());
		return typeof result === 'string' ? result : String(result ?? '');
	});

	const widthStyle = $derived(getStyleFromNumber(width));
	const maxWidthStyle = $derived(getStyleFromNumber(maxWidth));
	const minWidthStyle = $derived(getStyleFromNumber(minWidth));
</script>

<div
	class="input
	input--focus-{focusStyle}
	input--type-{type}"
	class:input--inline={inline}
	class:input--linkify={linkify}
	class:input--auto-resize={inline}
	class:input--full-width={fullWidth}
	class:input--clearable={clearable}
	class:input--has-right-icon={!!rightIcon}
	class:input--has-left-icon={!!leftIcon}
	class:input--has-left-icon-clickable={!!leftIcon && !!onLeftIconClick}
	class:input--rounded={rounded}
	class:input--disabled={disabled}
	class:input--readonly={readonly}
	class:input--focused={isFocused}
	data-testid="input"
	style="width: {widthStyle}; max-width: {maxWidthStyle}; min-width: {minWidthStyle}"
>
	<!-- inline時の表示用要素（text-overflow: ellipsisが効く） -->
	{#if inline}
		<div class="input__display-text" data-placeholder={placeholder} style={customStyle}>
			{getDisplayValue()}
		</div>
	{/if}
	<!-- 入力用要素 -->
	<div class="input__wrapper">
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
	{#if linkify}
		<div class="input__link-text" style={customStyle}>
			{@html linkHtmlValue}
		</div>
	{/if}
	<!-- クリアボタン -->
	{#if clearable && !disabled && !readonly}
		<div class="input__clear-button">
			<IconButton
				ariaLabel={t('input.clear')}
				color="var(--svelte-ui-input-text-color)"
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
	{#if leftIcon}
		<div class="input__icon-left">
			{#if onLeftIconClick}
				<IconButton
					ariaLabel={leftIconAriaLabel}
					color="var(--svelte-ui-input-icon-color)"
					onclick={onLeftIconClick}
					tabindex={-1}
					{iconFilled}
					{iconWeight}
				>
					{leftIcon}
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
						{leftIcon}
					</Icon>
				</div>
			{/if}
		</div>
	{/if}

	<!-- Right Icon -->
	{#if rightIcon}
		<div class="input__icon-right">
			{#if onRightIconClick}
				<IconButton
					ariaLabel={rightIconAriaLabel}
					color="var(--svelte-ui-input-icon-color)"
					onclick={onRightIconClick}
					tabindex={-1}
					{iconFilled}
					{iconWeight}
				>
					{rightIcon}
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
						{rightIcon}
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
		width: auto;
		max-width: 100%;
		height: inherit;
	}

	.input__wrapper {
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

	/* リンク表示用オーバーレイ */
	.input__link-text {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		padding: inherit;
		background: transparent;
		border-radius: inherit;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		pointer-events: none;
		z-index: 1;
	}

	.input__link-text :global(a) {
		pointer-events: auto;
		text-decoration: underline;
	}

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

	/* rightIconがある場合はクリアボタンを左にずらす */
	.input--clearable.input--has-right-icon .input__clear-button {
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

	/* 左側アイコンにクリックハンドラーがある場合はクリック可能にする */
	.input--has-left-icon-clickable .input__icon-left {
		pointer-events: auto;
		cursor: pointer;
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
		z-index: 1;
	}

	/* 通常のアイコン（ボタンではない）はクリック不可 */
	.input__normal-icon {
		pointer-events: none;
	}

	/* =============================================
 * デザインバリアント：default
 * ============================================= */
	.input:not(.input--inline) {
		.input__wrapper {
			position: static;
			opacity: 1;
		}

		input {
			min-height: var(--svelte-ui-input-height);
			background-color: var(--svelte-ui-input-bg);
			box-shadow: 0 0 0 var(--svelte-ui-border-width) inset var(--svelte-ui-input-border-color);
			border: none;
			border-radius: var(--svelte-ui-input-border-radius);
			color: var(--svelte-ui-input-text-color);
		}

		input,
		.input__display-text,
		.input__link-text {
			padding: var(--svelte-ui-input-padding);
		}

		&.input--has-left-icon {
			input,
			.input__display-text,
			.input__link-text {
				padding-left: var(--svelte-ui-input-icon-space);
			}
		}

		&.input--has-right-icon {
			input,
			.input__display-text,
			.input__link-text {
				padding-right: var(--svelte-ui-input-icon-space);
			}
		}

		&.input--clearable {
			input,
			.input__display-text,
			.input__link-text {
				padding-right: var(--svelte-ui-input-icon-space);
			}
		}

		&.input--clearable.input--has-right-icon {
			input,
			.input__display-text,
			.input__link-text {
				padding-right: var(--svelte-ui-input-icon-space-double);
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

	/* linkify=true かつフォーカスがないときは、input のテキストカラーだけ透明にして二重描画を防ぐ */
	.input--linkify:not(.input--focused) input {
		color: transparent;
		caret-color: transparent;
		text-shadow: none;
	}

	/* フォーカス時はリンク用オーバーレイも非表示にして（display:none）、リンクが反応しないようにする */
	.input--focused .input__link-text {
		display: none;
	}

	/* =============================================
 * デザインバリアント：inline
 * ============================================= */
	.input--inline {
		&.input--type-number .input__display-text {
			text-align: right;
		}

		.input__wrapper {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
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

		&.input--focused {
			.input__display-text {
				opacity: 0;
			}

			.input__wrapper {
				opacity: 1;
			}
		}
	}

	/* inline + linkify のときは、display-text を常に隠し、wrapper を常に表示 */
	.input--inline.input--linkify .input__display-text {
		opacity: 0;
	}

	.input--inline.input--linkify .input__wrapper {
		opacity: 1;
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
		.input__display-text,
		.input__link-text {
			padding-right: var(--svelte-ui-input-icon-space);
		}
	}

	.input.input--has-right-icon {
		input,
		.input__display-text,
		.input__link-text {
			padding-right: var(--svelte-ui-input-icon-space);
		}
	}

	.input.input--has-left-icon {
		input,
		.input__display-text,
		.input__link-text {
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
</style>
